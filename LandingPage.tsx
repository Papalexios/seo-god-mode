
import React from 'react';

const NeuralMeshLogo = () => (
    <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="neural-logo">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="url(#logoGradient)" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.05)" filter="url(#glow)"/>
        <path d="M20 12L27 16V24L20 28L13 24V16L20 12Z" stroke="#10B981" strokeWidth="1.5" className="inner-hex"/>
        <circle cx="20" cy="20" r="3" fill="#ffffff" className="pulse-dot"/>
        <line x1="20" y1="4" x2="20" y2="12" stroke="rgba(59, 130, 246, 0.3)"/>
        <line x1="34" y1="12" x2="27" y2="16" stroke="rgba(59, 130, 246, 0.3)"/>
        <line x1="34" y1="28" x2="27" y2="24" stroke="rgba(59, 130, 246, 0.3)"/>
        <line x1="20" y1="36" x2="20" y2="28" stroke="rgba(59, 130, 246, 0.3)"/>
        <line x1="6" y1="28" x2="13" y2="24" stroke="rgba(59, 130, 246, 0.3)"/>
        <line x1="6" y1="12" x2="13" y2="16" stroke="rgba(59, 130, 246, 0.3)"/>
    </svg>
);

export const LandingPage = ({ onEnterApp }: { onEnterApp: () => void }) => {
    return (
        <div className="landing-container">
            <div className="aurora-bg"></div>
            <div className="grid-overlay"></div>
            
            {/* --- HEADER --- */}
            <header className="landing-header">
                <div className="landing-logo-group">
                    <NeuralMeshLogo />
                    <div className="landing-title-stack">
                        <div className="landing-title">
                            WP Content <span className="text-gradient-blue">Optimizer Pro</span>
                        </div>
                        <div className="creator-badge">
                            <span className="creator-label">From the creators of</span>
                            <a href="https://affiliatemarketingforsuccess.com" target="_blank" rel="noopener noreferrer" className="creator-link">
                                AffiliateMarketingForSuccess.com <span className="arrow">↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <main className="landing-hero">
                <div className="hero-content">
                    <div className="hero-badge-container">
                        <div className="hero-badge">
                            <span className="badge-dot"></span> v12.0 SOTA AGENT • GOD MODE ACTIVATED
                        </div>
                    </div>
                    
                    <h1 className="hero-headline">
                        <span className="hero-text-glitch" data-text="SEO DOMINANCE">SEO DOMINANCE</span><br />
                        <span className="text-gradient-cyan">ENGINEERED BY AI.</span>
                    </h1>
                    
                    <p className="hero-subhead">
                        The world's first autonomous "God Mode" content engine. Crawl, cluster, research, and publish revenue-generating content with a single command.
                    </p>
                    
                    <div className="hero-cta-group">
                        <a href="https://seo-hub.affiliatemarketingforsuccess.com/" target="_blank" rel="noopener noreferrer" className="btn-mega-cta">
                            <div className="cta-icon-wrapper">
                                <span className="cta-icon">🚀</span>
                            </div>
                            <div className="cta-text">
                                <span className="cta-title">Dominate Your Niche</span>
                                <span className="cta-desc">Unlock Complete AI-Powered SEO Arsenal</span>
                            </div>
                            <div className="cta-glow"></div>
                        </a>
                        
                        <button onClick={onEnterApp} className="btn-app-launch">
                            <span className="icon">⚡</span> <span className="btn-text">Launch Tool</span>
                        </button>
                    </div>
                </div>
                
                {/* Visual Abstract Decoration */}
                <div className="hero-visuals">
                    <div className="glass-panel panel-1"></div>
                    <div className="glass-panel panel-2"></div>
                    <div className="floating-orb orb-1"></div>
                    <div className="floating-orb orb-2"></div>
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="landing-footer">
                <div className="footer-glass-pane">
                    <div className="footer-top">
                        <div className="footer-brand-section">
                            <img 
                                src="https://affiliatemarketingforsuccess.com/wp-content/uploads/2023/03/cropped-Affiliate-Marketing-for-Success-Logo-Edited.png?lm=6666FEE0" 
                                alt="Affiliate Marketing For Success" 
                                className="footer-logo-main"
                            />
                            <p className="footer-credits">
                                Engineered by <span className="author-name">Alexios Papaioannou</span>
                                <br/>Owner of affiliatemarketingforsuccess.com
                            </p>
                        </div>
                        
                        <div className="footer-links-grid">
                            <div className="footer-col">
                                <h4>Strategy</h4>
                                <a href="https://affiliatemarketingforsuccess.com/seo" target="_blank" rel="noopener noreferrer">SEO & Traffic</a>
                                <a href="https://affiliatemarketingforsuccess.com/blogging" target="_blank" rel="noopener noreferrer">Blogging Blueprint</a>
                            </div>
                            <div className="footer-col">
                                <h4>Learn</h4>
                                <a href="https://affiliatemarketingforsuccess.com/affiliate-marketing" target="_blank" rel="noopener noreferrer">Affiliate Marketing</a>
                                <a href="https://affiliatemarketingforsuccess.com/ai" target="_blank" rel="noopener noreferrer">Artificial Intelligence</a>
                            </div>
                            <div className="footer-col">
                                <h4>Insights</h4>
                                <a href="https://affiliatemarketingforsuccess.com/review" target="_blank" rel="noopener noreferrer">Expert Reviews</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-bottom-bar">
                        <p>&copy; {new Date().getFullYear()} WP Content Optimizer Pro. All Rights Reserved.</p>
                        <div className="status-dot-group">
                            <span className="status-dot"></span> System Operational
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
