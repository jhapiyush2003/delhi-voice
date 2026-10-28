import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Bookmark, Clock3, MapPin, Menu, Search, X } from 'lucide-react';
import './styles.css';
import { ASOF, events, guides, places } from './data.js';

// Photos come from each place's Wikipedia article (Wikimedia Commons), so the picture always matches the place.
const wikiCache = {};
const loadWiki = (title) => (wikiCache[title] ||= fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
  .then(r => (r.ok ? r.json() : Promise.reject())).then(j => j.thumbnail?.source || null).catch(() => null));
function WikiImg({ title, alt, size = 960, credit = true }) {
  const [src, setSrc] = useState(null); const [failed, setFailed] = useState(false);
  useEffect(() => { let off = false; setSrc(null); setFailed(false); if (!title) { setFailed(true); return; }
    loadWiki(title).then(s => { if (off) return; s ? setSrc(s.replace(/\/\d+px-/, `/${size}px-`)) : setFailed(true); }); return () => { off = true; }; }, [title, size]);
  return <>{src && !failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="img-fallback" role="img" aria-label={alt}>{failed ? alt : '…'}</div>}
    {credit && src && !failed && <a className="photo-credit" href={`https://en.wikipedia.org/wiki/${title}`} target="_blank" rel="noreferrer">Photo: Wikimedia Commons</a>}</>;
}

const today = () => new Date().toISOString().slice(0, 10);
const mapLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const byId = Object.fromEntries(places.map(p => [p.id, p]));

function App() {
  const [menuOpen, setMenuOpen] = useState(false); const [query, setQuery] = useState(''); const [activeFilter, setActiveFilter] = useState('All places');
  const [saved, setSaved] = useState([]); const [detail, setDetail] = useState(null); const [eventDetail, setEventDetail] = useState(null);
  const types = ['All places', ...new Set(places.map(p => p.type))];
  const upcoming = useMemo(() => events.filter(e => e.end >= today()), []);
  const filteredPlaces = useMemo(() => places.filter(p => (activeFilter === 'All places' || p.type === activeFilter) && `${p.name} ${p.area} ${p.type}`.toLowerCase().includes(query.toLowerCase())), [activeFilter, query]);
  const nav = [['Heritage', 'heritage'], ['Stories', 'culture'], ['Places', 'places'], ['Events', 'events']];
  const jump = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  useEffect(() => { const k = (e) => e.key === 'Escape' && (setDetail(null), setEventDetail(null)); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return <>
    <div className="topline"><span>INDEPENDENT STORIES FROM INDIA’S CAPITAL</span><span className="top-right">LISTINGS CHECKED {ASOF.toUpperCase()}</span></div>
    <header className="header"><a className="brand" href="#home" onClick={e => { e.preventDefault(); jump('home'); }}><span className="brand-mark">D<span>V</span></span><span className="brand-name">DELHI VOICE<small>THE CITY. THE CULTURE. THE STORIES.</small></span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>{nav.map(([l, id]) => <a key={id} href={'#' + id} onClick={e => { e.preventDefault(); jump(id); }}>{l}</a>)}</nav>
      <div className="header-actions"><button className="icon-btn" aria-label="Search places" onClick={() => { jump('places'); document.getElementById('place-search')?.focus(); }}><Search size={19} /></button><button className="menu-btn" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <main id="home">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="sun">✳</span> A LOVE LETTER TO DELHI</div><h1>A city of a<br /><em>thousand</em><br />stories.</h1><p>Monuments, markets, gardens and gatherings: a fact-checked guide to Delhi’s heritage, culture and what’s on this month.</p><button className="primary-btn" onClick={() => jump('places')}>Explore the city <ArrowUpRight size={17} /></button><div className="hero-foot"><span>28° 36′ N &nbsp; 77° 12′ E</span><span>MADE WITH LOVE IN DELHI</span></div></div>
        <div className="hero-image"><WikiImg title="Red_Fort" alt="The Red Fort, Delhi" size={1280} /><div className="image-caption"><span>01 / THE RED FORT</span><span>Old Delhi, built 1639–1648 <ArrowUpRight size={14} /></span></div><div className="hero-stamp">DILLI<br /><span>MERI JAAN</span><b>✳</b></div></div></section>
      <div className="ticker"><span>THE CITY NEVER STOPS TELLING STORIES</span><b>✳</b><span>LOOK CLOSER, FIND MORE</span><b>✳</b><span>YOUR DELHI, YOUR WAY</span><b>✳</b></div>

      <section className="section stories-section" id="culture"><div className="section-heading"><div><div className="eyebrow">THE EDITOR’S NOTE <span className="sun">✳</span></div><h2>Worth your <em>while.</em></h2></div><p>Three landmarks, the facts that matter. Each links to its sources.</p></div>
        <div className="story-grid">{guides.map((g, i) => { const p = byId[g.place]; return <article className={'story-card story-' + i} key={g.place}><div className="story-image"><WikiImg title={p.wiki} alt={p.name} /><button className={'save-btn ' + (saved.includes(g.place) ? 'saved' : '')} aria-label="Save story" onClick={() => toggleSave(g.place)}><Bookmark size={17} fill={saved.includes(g.place) ? 'currentColor' : 'none'} /></button><span className="category-pill">{g.tag}</span></div>
          <div className="story-meta"><span>{p.area}</span><span><MapPin size={13} /> {p.badge}</span></div><h3>{g.title}</h3><p>{g.excerpt}</p><button className="text-link" onClick={() => setDetail(p)}>Read the facts <ArrowUpRight size={15} /></button></article>; })}</div>
        <div className="section-bottom"><span>THOUGHTFULLY TOLD. LOCALLY ROOTED.</span><button className="underlined" onClick={() => jump('places')}>All places <ArrowRight size={16} /></button></div></section>

      <section className="heritage-band" id="heritage"><div className="heritage-photo"><WikiImg title="Humayun%27s_Tomb" alt="Humayun’s Tomb, Delhi" size={1280} /><div className="photo-note">A LITTLE HISTORY<br />GOES A LONG WAY.</div></div>
        <div className="heritage-copy"><div className="eyebrow">BUILT TO LAST <span className="sun">✳</span></div><h2>Old stones.<br /><em>New eyes.</em></h2><p>Delhi has three UNESCO World Heritage Sites: Humayun’s Tomb and Qutb Minar (both inscribed 1993) and the Red Fort Complex (2007). Start with these three, then follow the lanes outward.</p><button className="primary-btn light-btn" onClick={() => jump('places')}>See the places <ArrowUpRight size={17} /></button><div className="heritage-index"><span>01 — MONUMENTS</span><span>02 — OLD NEIGHBOURHOODS</span><span>03 — LIVING HISTORY</span></div></div></section>

      <section className="section places-section" id="places"><div className="section-heading"><div><div className="eyebrow">YOUR CITY, YOUR DISCOVERY <span className="sun">✳</span></div><h2>Go a little <em>further.</em></h2></div><p>Tap a place for verified facts, its address, a map link and sources.</p></div>
        <div className="place-tools"><div className="filter-tabs">{types.map(f => <button className={activeFilter === f ? 'active' : ''} key={f} onClick={() => setActiveFilter(f)}>{f}</button>)}</div><label className="search-field"><Search size={17} /><input id="place-search" placeholder="Search a place or area..." value={query} onChange={e => setQuery(e.target.value)} /></label></div>
        <div className="places-grid">{filteredPlaces.map((p, i) => <article className="place-card" key={p.id}><div className="place-image"><WikiImg title={p.wiki} alt={p.name} size={500} /><span className="place-number">0{i + 1}</span><button aria-label={`Details: ${p.name}`} onClick={() => setDetail(p)}><ArrowUpRight size={18} /></button></div><div className="place-info"><span>{p.type} <i>·</i> {p.area}</span><h3>{p.name}</h3><p>{p.note}</p></div></article>)}</div>
        {filteredPlaces.length === 0 && <div className="empty-state">No places found. Try another search or category.</div>}</section>

      <section className="events-section" id="events"><div className="events-intro"><div className="eyebrow">PUT IT IN YOUR DIARY <span className="sun">✳</span></div><h2>Out & about<br /><em>in Delhi.</em></h2><p>Upcoming exhibitions, festivals and fairs, checked on {ASOF}. Past events drop off automatically.</p><div className="event-doodle">✳</div></div>
        <div className="event-list">{upcoming.length === 0 && <div className="empty-state">No upcoming listings right now. Check back soon.</div>}{upcoming.map(ev => <article className="event-row" key={ev.title}><div className="event-date"><b>{ev.day}</b><span>{ev.month}</span></div><div className="event-detail"><span className="event-kind">{ev.kind}</span><h3>{ev.title}</h3><p>{ev.where}</p><span className="event-time"><Clock3 size={13} /> {ev.time}</span><span className={'src-tag ' + ev.source}>{ev.source === 'official' ? 'Official source' : 'Verify with organiser'}</span></div><button aria-label={`More about ${ev.title}`} onClick={() => setEventDetail(ev)}><ArrowUpRight size={18} /></button></article>)}</div></section>

      <section className="verify-note"><div className="eyebrow">BEFORE YOU GO <span className="sun">✳</span></div><h2>Always <em>double-check.</em></h2><p>Opening hours, ticket prices and event dates change, and public websites often disagree. That is why we link the official source on every card instead of printing numbers that may be out of date.</p></section>
    </main>
    <footer className="footer"><div className="footer-top"><a className="brand footer-brand" href="#home"><span className="brand-mark">D<span>V</span></span><span className="brand-name">DELHI VOICE<small>THE CITY. THE CULTURE. THE STORIES.</small></span></a><p>A city this full of life deserves to be heard.</p><button className="back-top" onClick={() => jump('home')}>BACK TO TOP <ArrowUpRight size={15} /></button></div><div className="footer-bottom"><span>© 2026 DELHI VOICE. PHOTOS: WIKIMEDIA COMMONS CONTRIBUTORS.</span><span>DESIGNED FOR THE CURIOUS.</span></div></footer>

    {detail && <div className="modal-back" onClick={() => setDetail(null)}><div className="modal" role="dialog" aria-modal="true" aria-label={detail.name} onClick={e => e.stopPropagation()}><button className="modal-x" aria-label="Close" onClick={() => setDetail(null)}><X size={18} /></button>
      <div className="modal-img"><WikiImg title={detail.wiki} alt={detail.name} /></div><div className="modal-body"><span className="modal-badge">{detail.badge}</span><h3>{detail.name}</h3>
      <ul>{detail.facts.map(f => <li key={f}>{f}</li>)}</ul><p><b>Address:</b> {detail.address}</p><p><b>Visiting:</b> {detail.visit}</p>
      <p className="modal-links"><a href={mapLink(detail.map)} target="_blank" rel="noreferrer"><MapPin size={14} /> Open in Maps</a>{detail.sources.map(([t, u]) => <a key={u} href={u} target="_blank" rel="noreferrer">{t} ↗</a>)}</p></div></div></div>}
    {eventDetail && <div className="modal-back" onClick={() => setEventDetail(null)}><div className="modal" role="dialog" aria-modal="true" aria-label={eventDetail.title} onClick={e => e.stopPropagation()}><button className="modal-x" aria-label="Close" onClick={() => setEventDetail(null)}><X size={18} /></button>
      <div className="modal-body"><span className="modal-badge">{eventDetail.kind}</span><h3>{eventDetail.title}</h3><p><b>Where:</b> {eventDetail.where}</p><p><b>When:</b> {eventDetail.time}</p><p>{eventDetail.note}</p><p className="modal-links"><a href={eventDetail.link} target="_blank" rel="noreferrer">{eventDetail.source === 'official' ? 'Official page' : 'Listing / organiser'} ↗</a></p></div></div></div>}
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
