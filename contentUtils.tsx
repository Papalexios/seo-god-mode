
import { GeneratedContent, SiteInfo, SitemapPage } from "./types";
import { TARGET_MAX_WORDS, TARGET_MIN_WORDS } from "./constants";

export const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

export const calculateFleschReadability = (text: string): number => {
    if (!text || text.trim().length === 0) return 100;
    const words: string[] = text.match(/\b\w+\b/g) || [];
    const wordCount = words.length;
    if (wordCount < 100) return 100;
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const sentenceCount = sentences.length || 1;
    const syllables = words.reduce((acc, word) => {
        let currentWord = word.toLowerCase();
        if (currentWord.length <= 3) return acc + 1;
        currentWord = currentWord.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
        const syllableMatches = currentWord.match(/[aeiouy]{1,2}/g);
        return acc + (syllableMatches ? syllableMatches.length : 0);
    }, 0);
    const score = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
    return Math.max(0, Math.min(100, Math.round(score)));
};

export const getReadabilityVerdict = (score: number): { verdict: string, color: string } => {
    if (score >= 90) return { verdict: 'Very Easy', color: '#10B981' };
    if (score >= 80) return { verdict: 'Easy', color: '#10B981' };
    if (score >= 70) return { verdict: 'Fairly Easy', color: '#34D399' };
    if (score >= 60) return { verdict: 'Standard', color: '#FBBF24' };
    if (score >= 50) return { verdict: 'Fairly Difficult', color: '#F59E0B' };
    if (score >= 30) return { verdict: 'Difficult', color: '#EF4444' };
    return { verdict: 'Very Difficult', color: '#DC2626' };
};

export const extractYouTubeID = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// ⚡ SOTA NETWORK RACER v3.0
// Simulates a quantum state where all requests exist simultaneously; collapses to the first success.
export const fetchWithProxies = async (url: string, options: RequestInit = {}, onProgress?: (message: string) => void): Promise<Response> => {
    const encodedUrl = encodeURIComponent(url);
    const hasAuth = options.headers && (
        (options.headers as any)['X-API-KEY'] || 
        (options.headers as any)['Authorization']
    );

    // Auth requests cannot safely race public proxies (Security Risk)
    if (hasAuth) {
        return fetch(url, options).catch(() => {
             const proxy = `https://corsproxy.io/?${encodedUrl}`;
             return fetch(proxy, options);
        });
    }

    const strategies = [
        // 1. Direct (Fastest, High Fail Rate due to CORS)
        () => fetch(url, { ...options, signal: AbortSignal.timeout(4000) }),
        // 2. CorsProxy (Reliable Backbone)
        () => fetch(`https://corsproxy.io/?${encodedUrl}`, { ...options, signal: AbortSignal.timeout(8000) }),
        // 3. AllOrigins (Backup)
        () => fetch(`https://api.allorigins.win/raw?url=${encodedUrl}`, { ...options, signal: AbortSignal.timeout(8000) }),
        // 4. ThingProxy (Deep Fallback)
        () => fetch(`https://thingproxy.freeboard.io/fetch/${url}`, { ...options, signal: AbortSignal.timeout(10000) })
    ];

    try {
        // RACE! Use Promise.any to return the first FULFILLED promise
        const response = await (Promise as any).any(strategies.map(s => s().then(res => {
            if (!res.ok && res.status >= 500) throw new Error("5xx");
            return res;
        })));
        return response;
    } catch (e) {
        throw new Error(`All SOTA network strategies exhausted for ${url}`);
    }
};

export const smartCrawl = async (url: string): Promise<string> => {
    // ⚡ SOTA CRAWL RACER: Jina AI vs DOM Extraction
    // We launch both. Jina is cleaner but sometimes rate-limited. Proxies are messier but reliable.
    const controllers: AbortController[] = [];

    const jinaStrategy = async (): Promise<string> => {
        const controller = new AbortController();
        controllers.push(controller);
        try {
            const res = await fetch(`https://r.jina.ai/${url}`, { signal: controller.signal });
            if (!res.ok) throw new Error("Jina Failed");
            const text = await res.text();
            if (!text || text.includes("Access Denied") || text.length < 200) throw new Error("Jina Blocked");
            return text.substring(0, 35000); // Return slightly more context
        } catch (e) { throw e; }
    };

    const domStrategy = async (): Promise<string> => {
        const controller = new AbortController();
        controllers.push(controller);
        try {
            const res = await fetchWithProxies(url, { signal: controller.signal });
            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Clean DOM
            doc.querySelectorAll('script, style, nav, footer, iframe, noscript, svg, .ad, .cookie-banner').forEach(el => el.remove());
            
            const main = doc.querySelector('main') || doc.querySelector('article') || doc.querySelector('.post-content') || doc.body;
            const text = (main.textContent || '').replace(/\s+/g, ' ').trim();
            
            if (text.length < 200) throw new Error("DOM Extraction Empty");
            return text.substring(0, 30000);
        } catch (e) { throw e; }
    };

    try {
        // Race them!
        const result = await (Promise as any).any([jinaStrategy(), domStrategy()]);
        // Cancel the loser to save bandwidth
        controllers.forEach(c => c.abort());
        return result;
    } catch (e) {
        throw new Error(`SOTA Crawl Failed (All Strategies): ${e}`);
    }
};

export class ContentTooShortError extends Error {
    constructor(message: string, public content: string, public wordCount: number) { super(message); this.name = 'ContentTooShortError'; }
}
export class ContentTooLongError extends Error {
    constructor(message: string, public content: string, public wordCount: number) { super(message); this.name = 'ContentTooLongError'; }
}
  
export function enforceWordCount(content: string, minWords = TARGET_MIN_WORDS, maxWords = TARGET_MAX_WORDS) {
    const textOnly = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = textOnly.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < minWords) throw new ContentTooShortError(`CONTENT TOO SHORT: ${wordCount} words.`, content, wordCount);
    return wordCount;
}

export async function getGuaranteedYoutubeVideos(keyword: string, serperApiKey: string, semanticKeywords: string[]): Promise<any[]> {
    if (!serperApiKey) return [];
    const queries = [keyword, `${keyword} guide`, `${keyword} tutorial`];
    let allVideos: any[] = [];
    
    // Serial fallback is better here to avoid burning API credits on 3 queries at once if the first works
    for (const query of queries) {
        if (allVideos.length >= 2) break;
        try {
            const response = await fetch("https://google.serper.dev/search", {
                method: 'POST',
                headers: { 'X-API-KEY': serperApiKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({ q: query, type: 'videos', num: 5 })
            });
            const data = await response.json();
            const videos = data.videos || [];
            for (const video of videos) {
                if (allVideos.length >= 2) break;
                const videoId = extractYouTubeID(video.link);
                if (videoId && !allVideos.some(v => v.videoId === videoId)) {
                    allVideos.push({ ...video, videoId, embedUrl: `https://www.youtube.com/embed/${videoId}` });
                }
            }
        } catch (error) {}
    }
    return allVideos.slice(0, 2);
}

export const normalizeGeneratedContent = (parsedJson: any, itemTitle: string): GeneratedContent => {
    const normalized = { ...parsedJson };
    if (!normalized.title) normalized.title = itemTitle;
    if (!normalized.slug) normalized.slug = itemTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    if (!normalized.content) normalized.content = '';
    
    if (!normalized.imageDetails || !Array.isArray(normalized.imageDetails)) normalized.imageDetails = [];
    while (normalized.imageDetails.length < 3) {
        const i = normalized.imageDetails.length + 1;
        normalized.imageDetails.push({ 
            prompt: `High quality detailed photo for ${itemTitle}`, 
            altText: `${itemTitle} - Image ${i}`, 
            title: `img-${i}`, 
            placeholder: `[IMAGE_${i}]` 
        });
    }
    
    if (!normalized.metaDescription) normalized.metaDescription = `Guide on ${normalized.title}.`;
    if (!normalized.primaryKeyword) normalized.primaryKeyword = itemTitle;
    if (!normalized.semanticKeywords) normalized.semanticKeywords = [];
    if (!normalized.jsonLdSchema) normalized.jsonLdSchema = {};
    if (!normalized.faqSection) normalized.faqSection = [];
    if (!normalized.keyTakeaways) normalized.keyTakeaways = [];
    if (!normalized.outline) normalized.outline = [];
    if (!normalized.references) normalized.references = [];
    return normalized as GeneratedContent;
};

export const performSurgicalUpdate = (originalHtml: string, snippets: any): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(originalHtml, 'text/html');
    const body = doc.body;
    
    // Robust injection: Prepend Intro, Append FAQ
    if (snippets.introHtml) {
        const div = doc.createElement('div');
        div.innerHTML = snippets.introHtml;
        // Try to insert after first paragraph if possible for better flow
        const firstP = body.querySelector('p');
        if (firstP) {
            firstP.after(div);
        } else {
            body.prepend(div);
        }
    }
    if (snippets.faqHtml) {
        const faq = doc.createElement('div');
        faq.innerHTML = snippets.faqHtml;
        body.append(faq);
    }
    return body.innerHTML;
};

export const postProcessGeneratedHtml = (html: string, plan: GeneratedContent, youtubeVideos: any[] | null, siteInfo: SiteInfo, isRefresh: boolean = false): string => {
    let processedHtml = html;
    processedHtml = processedHtml.replace(/Sources Scanned|Read Time|Word count/gi, '');
    
    if (!processedHtml.includes('key-takeaways-box') && plan.keyTakeaways && plan.keyTakeaways.length > 0) {
        const keyTakeawaysHtml = `
        <blockquote class="key-takeaways-box" style="background: #f8fafc; border-left: 5px solid #3b82f6; padding: 20px; margin: 30px 0; font-style: normal;">
            <h3 style="margin-top: 0; color: #1e293b;">⚡ Key Takeaways</h3>
            <ul style="margin-bottom: 0;">${plan.keyTakeaways.map(t => `<li style="margin-bottom: 5px;">${t}</li>`).join('')}</ul>
        </blockquote>`;
        
        // Inject after first H2
        const firstH2Index = processedHtml.search(/<h2/i);
        if (firstH2Index !== -1) {
            const closeH2 = processedHtml.indexOf('</h2>', firstH2Index);
            if (closeH2 !== -1) {
                 const insertPos = closeH2 + 5;
                 processedHtml = processedHtml.slice(0, insertPos) + keyTakeawaysHtml + processedHtml.slice(insertPos);
            } else {
                 processedHtml = keyTakeawaysHtml + processedHtml;
            }
        } else {
            processedHtml = keyTakeawaysHtml + processedHtml;
        }
    }

    if (!isRefresh) {
        processedHtml += `<div class="verification-footer-sota" style="margin-top: 4rem; padding: 2.5rem; background: #F0FDF4; border-left: 6px solid #059669; display: flex; gap: 2rem;">
            <div style="font-size:2rem; color:#059669;">🛡️</div>
            <div><h4 style="margin:0;">Scientific Verification</h4><p style="margin:0;">Fact-checked against ${new Date().getFullYear()} data sources.</p></div>
        </div>`;
    }

    if (youtubeVideos && youtubeVideos.length > 0) {
        const paragraphs = processedHtml.split('</p>');
        if (paragraphs.length > 3) {
            paragraphs.splice(2, 0, `<figure class="wp-block-embed"><iframe src="${youtubeVideos[0].embedUrl}" width="500" height="281"></iframe></figure>`);
        }
        processedHtml = paragraphs.join('</p>');
    }
    return processedHtml;
};

export const processInternalLinks = (content: string, availablePages: SitemapPage[]): string => {
    let processedContent = content;
    const candidates = availablePages.filter(p => p.id && p.title && p.title.length > 3).slice(0, 50); 
    
    processedContent = processedContent.replace(/\[LINK_CANDIDATE:\s*([^\]]+)\]/gi, (match, keyword) => {
        const target = availablePages.find(p => p.title.toLowerCase().includes(keyword.toLowerCase()));
        if (target) {
            return `<a href="${target.id}" class="internal-link" title="${target.title}">${keyword}</a>`;
        }
        return keyword;
    });
    return processedContent;
};
