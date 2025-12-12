
import React from 'react';

const NeuralMeshLogo = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="neural-logo">
        <path d="M20 5L32.9904 12.5V27.5L20 35L7.00962 27.5V12.5L20 5Z" stroke="url(#paint0_linear)" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/>
        <path d="M20 12L26.9282 16V24L20 28L13.0718 24V16L20 12Z" stroke="url(#paint1_linear)" strokeWidth="2"/>
        <circle cx="20" cy="20" r="3" fill="#3B82F6" className="pulse-dot"/>
        <line x1="20" y1="5" x2="20" y2="12" stroke="rgba(59, 130, 246, 0.5)"/>
        <line x1="32.9904" y1="12.5" x2="26.9282" y2="16" stroke="rgba(59, 130, 246, 0.5)"/>
        <line x1="32.9904" y1="27.5" x2="26.9282" y2="24" stroke="rgba(59, 130, 246, 0.5)"/>
        <line x1="20" y1="35" x2="20" y2="28" stroke="rgba(59, 130, 246, 0.5)"/>
        <line x1="7.00962" y1="27.5" x2="13.0718" y2="24" stroke="rgba(59, 130, 246, 0.5)"/>
        <line x1="7.00962" y1="12.5" x2="13.0718" y2="16" stroke="rgba(59, 130, 246, 0.5)"/>
        <defs>
            <linearGradient id="paint0_linear" x1="20" y1="5" x2="20" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6"/>
                <stop offset="1" stopColor="#8B5CF6"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="20" y1="12" x2="20" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981"/>
                <stop offset="1" stopColor="#3B82F6"/>
            </linearGradient>
        </defs>
    </svg>
);

export const LandingPage = ({ onEnterApp }: { onEnterApp: () => void }) => {
    return (
        <div className="landing-container">
            <div className="aurora-bg"></div>
            
            {/* --- HEADER --- */}
            <header className="landing-header">
                <div className="landing-logo-group">
                    <NeuralMeshLogo />
                    <div className="landing-title">
                        <span>WP Content</span> Optimizer Pro
                    </div>
                </div>
                <div className="creator-badge">
                    <span className="creator-label">From the creators of</span>
                    <a href="https://affiliatemarketingforsuccess.com" target="_blank" rel="noopener noreferrer" className="creator-link">
                        AffiliateMarketingForSuccess.com <span className="arrow">↗</span>
                    </a>
                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <main className="landing-hero">
                <div className="hero-content">
                    <div className="hero-badge">v12.0 SOTA AGENT • GOD MODE ACTIVATED</div>
                    <h1 className="hero-headline">
                        <span className="text-gradient-cyan">SEO DOMINANCE</span><br />
                        ENGINEERED BY AI.
                    </h1>
                    <p className="hero-subhead">
                        The world's first autonomous "God Mode" content engine. Crawl, cluster, research, and publish revenue-generating content with a single command.
                    </p>
                    
                    <div className="hero-cta-group">
                        <a href="https://seo-hub.affiliatemarketingforsuccess.com/" target="_blank" rel="noopener noreferrer" className="btn-mega-cta">
                            <span className="cta-icon">🚀</span>
                            <div className="cta-text">
                                <span className="cta-title">Dominate Your Niche</span>
                                <span className="cta-desc">Unlock Complete AI-Powered SEO Arsenal</span>
                            </div>
                            <div className="cta-glow"></div>
                        </a>
                        
                        <button onClick={onEnterApp} className="btn-app-launch">
                            <span className="icon">⚡</span> Launch NeuralMesh Tool
                        </button>
                    </div>
                </div>
                
                {/* Visual Abstract Decoration */}
                <div className="hero-visuals">
                    <div className="glass-panel panel-1"></div>
                    <div className="glass-panel panel-2"></div>
                    <div className="glass-panel panel-3"></div>
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
                                <h4>Core Pillars</h4>
                                <a href="https://affiliatemarketingforsuccess.com/affiliate-marketing" target="_blank" rel="noopener noreferrer">Affiliate Marketing</a>
                                <a href="https://affiliatemarketingforsuccess.com/ai" target="_blank" rel="noopener noreferrer">Artificial Intelligence</a>
                            </div>
                            <div className="footer-col">
                                <h4>Strategy</h4>
                                <a href="https://affiliatemarketingforsuccess.com/seo" target="_blank" rel="noopener noreferrer">SEO & Traffic</a>
                                <a href="https://affiliatemarketingforsuccess.com/blogging" target="_blank" rel="noopener noreferrer">Blogging Blueprint</a>
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
