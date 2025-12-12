
import React, { useState, useMemo, useEffect, memo } from 'react';
import { ContentItem, SeoCheck, ExpandedGeoTargeting, WpConfig, SitemapPage, ApiClients, NeuronConfig } from './types';
import { calculateFleschReadability, getReadabilityVerdict, escapeRegExp } from './contentUtils';
import { extractSlugFromUrl, parseJsonWithAiRepair, processConcurrently } from './utils';
import ReactQuill from 'react-quill';

// ... Icons and Basic Components ...
export const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>);
export const XIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>);

export const SidebarNav = memo(({ activeView, onNavClick }: any) => {
    const navItems = [
        { id: 'setup', name: 'Configuration' },
        { id: 'strategy', name: 'Content Strategy' },
        { id: 'review', name: 'Review & Export' }
    ];
    return (
        <nav className="sidebar-nav">
            {navItems.map((item) => (
                <button key={item.id} className={`nav-item ${activeView === item.id ? 'active' : ''}`} onClick={() => onNavClick(item.id)}>
                    {item.name}
                </button>
            ))}
        </nav>
    );
});

export const ApiKeyInput = memo(({ provider, value, onChange, status, type="password" }: any) => (
    <div className="api-key-group">
        <input type={type} name={`${provider}ApiKey`} value={value} onChange={onChange} placeholder={`Enter ${provider} key`} />
        <div className="key-status-icon">{status === 'valid' ? <CheckIcon /> : (status === 'invalid' ? <XIcon /> : null)}</div>
    </div>
));

// --- MONEY PANEL: SOTA REVENUE DASHBOARD ---
export const MoneyPanel = ({ pages, onExecute }: { pages: SitemapPage[], onExecute: (p: SitemapPage) => void }) => {
    const opportunities = useMemo(() => {
        return [...pages]
            .filter(p => (p.opportunityScore || 0) > 20)
            .sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0))
            .slice(0, 10);
    }, [pages]);

    return (
        <div className="guardian-card full-width" style={{marginTop: '2rem', border: '1px solid #10B981', background: 'rgba(6, 78, 59, 0.1)'}}>
            <h3 style={{color: '#10B981', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                <span style={{fontSize:'1.5rem'}}>💰</span> MONEY PANEL: High Leverage Opportunities
            </h3>
            <p style={{fontSize: '0.9rem', color: '#94A3B8', marginTop: '-1rem', marginBottom: '1.5rem'}}>
                These pages have high "striking distance" potential (Pos 4-10) or high commercial intent.
            </p>
            {opportunities.length === 0 ? (
                <div style={{padding: '2rem', textAlign: 'center', color: '#64748B'}}>No high-opportunity pages detected yet. Crawl sitemap to analyze potential.</div>
            ) : (
                <table className="content-hub-table">
                    <thead>
                        <tr>
                            <th>Target Page</th>
                            <th>Potential</th>
                            <th>Simulated GSC Data</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opportunities.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div style={{fontWeight: 700, color: 'white'}}>{p.title}</div>
                                    <div style={{fontSize: '0.75rem', color: '#64748B'}}>{p.slug}</div>
                                </td>
                                <td>
                                    <span className="badge" style={{
                                        background: p.opportunityScore! > 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                        color: p.opportunityScore! > 80 ? '#10B981' : '#F59E0B'
                                    }}>
                                        {p.opportunityScore}/100
                                    </span>
                                </td>
                                <td>
                                    <div style={{fontSize: '0.8rem', color: '#94A3B8'}}>
                                        <div>Pos: <strong style={{color: p.gscSimulated!.position <= 10 ? '#10B981' : 'white'}}>{p.gscSimulated?.position}</strong></div>
                                        <div>Impr: {p.gscSimulated?.impressions}</div>
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-small" onClick={() => onExecute(p)} style={{background: '#10B981', color: '#064E3B'}}>
                                        ⚡ Execute God Mode
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export const SkeletonLoader = () => <div>Loading...</div>;

export const AppFooter = memo(() => (
    <footer className="app-footer">
        <div className="footer-content">
            <p className="footer-desc">SOTA Content Orchestration Suite v11.0</p>
        </div>
    </footer>
));

// Basic Modal Stubs to ensure compilation if complex ones aren't needed for this step
export const AnalysisModal = ({ page, onClose, onPlanRewrite }: any) => (
    <div className="modal-overlay" onClick={onClose}><div className="modal-content"><button onClick={onClose}>Close</button></div></div>
);
export const BulkPublishModal = ({ onClose }: any) => (
    <div className="modal-overlay" onClick={onClose}><div className="modal-content"><button onClick={onClose}>Close</button></div></div>
);
export const ReviewModal = ({ item, onClose, onSaveChanges }: any) => {
    const [content, setContent] = useState(item.generatedContent?.content || "");
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{padding: '2rem'}}>
                <h2>{item.title}</h2>
                <ReactQuill value={content} onChange={setContent} />
                <div className="modal-footer">
                    <button className="btn" onClick={() => onSaveChanges(item.id, {}, content)}>Save</button>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
export const WordPressEndpointInstructions = ({ onClose }: any) => null;
