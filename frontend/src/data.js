// Delhi Voice — verified content. Every item carries a source link.
// Facts were checked against UNESCO / Wikipedia / official sites on 28 Oct 2026.
// Fees and timings are deliberately NOT hard-coded: public sources disagree, so we point to the official source.
export const ASOF = '28 Oct 2026';
const ASI = ['Archaeological Survey of India', 'https://asi.nic.in'];
const UNESCO = ['UNESCO World Heritage List', 'https://whc.unesco.org/en/list/'];
const wp = (t, title) => [`${t} — Wikipedia`, `https://en.wikipedia.org/wiki/${title}`];

export const places = [
  { id: 'red-fort', name: 'Red Fort (Lal Qila)', type: 'Monuments', area: 'Old Delhi', wiki: 'Red_Fort',
    badge: 'UNESCO World Heritage Site · 2007', note: 'Shah Jahan’s palace-fort, built 1639–1648',
    facts: ['Commissioned by Mughal emperor Shah Jahan and built between 12 May 1639 and 6 April 1648.',
      'Shah Jahan’s chief architect, Ustad Ahmad Lahori, designed the fort’s gates, including the main Lahori Gate.',
      'On 15 August 1947, Jawaharlal Nehru hoisted the Indian flag above the Lahori Gate.'],
    address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi 110006',
    visit: 'Ticketed ASI monument, usually closed on Mondays. Confirm current timings and fees before you go.',
    sources: [wp('Red Fort', 'Red_Fort'), UNESCO, ASI], map: 'Red Fort Delhi' },
  { id: 'humayuns-tomb', name: 'Humayun’s Tomb', type: 'Monuments', area: 'Nizamuddin', wiki: 'Humayun%27s_Tomb',
    badge: 'UNESCO World Heritage Site · 1993', note: 'The first garden-tomb on the Indian subcontinent',
    facts: ['Commissioned by Humayun’s chief consort, Bega Begum (Hamida Banu), and built around 1570.',
      'Designed by the Persian architect Mirak Mirza Ghiyas.',
      'UNESCO calls it the first garden-tomb on the subcontinent; it inspired innovations that culminated in the Taj Mahal.'],
    address: 'Mathura Road, Nizamuddin East, New Delhi (opposite Nizamuddin Dargah)',
    visit: 'Ticketed ASI monument, open daily. Published fees differ between websites, so check the official ASI ticketing page.',
    sources: [wp('Humayun’s Tomb', 'Humayun%27s_Tomb'), UNESCO, ASI], map: 'Humayun\'s Tomb Delhi' },
  { id: 'qutb-minar', name: 'Qutb Minar', type: 'Monuments', area: 'Mehrauli', wiki: 'Qutb_Minar',
    badge: 'UNESCO World Heritage Site · 1993', note: 'A 72.5 m red-sandstone victory tower',
    facts: ['Per UNESCO, the tower is 72.5 m high, tapering from 14.32 m wide at the base to 2.75 m at the top, with alternating angular and rounded flutings.',
      'Construction was begun by Qutb-ud-din Aibak; UNESCO dates the tower to the early 13th century.',
      'Part of “Qutb Minar and its Monuments”, which also includes funerary and religious structures. Entry inside the tower is restricted.'],
    address: 'Seth Sarai, Mehrauli, New Delhi 110030',
    visit: 'Ticketed ASI monument. Confirm current timings and fees on the official ASI portal.',
    sources: [wp('Qutb Minar', 'Qutb_Minar'), UNESCO, ASI], map: 'Qutub Minar Delhi' },
  { id: 'jama-masjid', name: 'Jama Masjid', type: 'Monuments', area: 'Old Delhi', wiki: 'Jama_Masjid,_Delhi',
    badge: 'Active place of worship', note: 'Shah Jahan’s great mosque, completed 1656',
    facts: ['Commissioned by Shah Jahan and completed in 1656; one of the largest mosques in India.',
      'Stands close to the Red Fort in the old walled city of Shahjahanabad.'],
    address: 'Jama Masjid Road, Old Delhi 110006',
    visit: 'It is a working mosque: dress modestly and check visiting rules for non-worshippers around prayer times.',
    sources: [wp('Jama Masjid, Delhi', 'Jama_Masjid,_Delhi')], map: 'Jama Masjid Delhi' },
  { id: 'chandni-chowk', name: 'Chandni Chowk', type: 'Markets', area: 'Old Delhi', wiki: 'Chandni_Chowk',
    badge: 'Historic market street', note: 'The main avenue of Shahjahanabad',
    facts: ['Laid out in the 17th century as the principal street of Shah Jahan’s walled city, Shahjahanabad.',
      'Runs west from the Red Fort; the fort’s Lahori Gate opens onto the covered Chhatta Chowk bazaar.'],
    address: 'Chandni Chowk, Old Delhi 110006',
    visit: 'Public street market, no ticket. Busiest in the daytime; many shops close on Sundays, so check before planning a shopping visit.',
    sources: [wp('Chandni Chowk', 'Chandni_Chowk')], map: 'Chandni Chowk Delhi' },
  { id: 'lodhi-gardens', name: 'Lodhi Gardens', type: 'Gardens', area: 'Lodhi Road', wiki: 'Lodhi_Gardens',
    badge: 'City park with 15th-century tombs', note: 'Sayyid and Lodi-era tombs in a public garden',
    facts: ['The gardens contain 15th-century tombs of the Sayyid and Lodi dynasties.',
      'A public park in central Delhi, popular for morning walks.'],
    address: 'Lodhi Road, New Delhi 110003',
    visit: 'Public park; most listings report no entry fee. Check opening hours locally.',
    sources: [wp('Lodhi Gardens', 'Lodhi_Gardens')], map: 'Lodhi Gardens Delhi' },
  { id: 'purana-qila', name: 'Purana Qila (Old Fort)', type: 'Monuments', area: 'Mathura Road', wiki: 'Purana_Qila',
    badge: 'ASI-protected fort · 16th century', note: 'Delhi’s Old Fort, from Humayun to Sher Shah Suri',
    facts: ['Humayun founded the city of Dinpanah here in 1533. Sher Shah Suri took over after defeating him in 1540, renamed the fort Shergarh and rebuilt it; accounts differ on exactly which parts each ruler built.',
      'Inside are Sher Shah’s Qila-i-Kuhna mosque and the octagonal red-sandstone Sher Mandal, later used by Humayun as a library.',
      'ASI excavations have found traces going back to the 3rd century BC, and many believe the site to be ancient Indraprastha.'],
    address: 'Mathura Road, near Pragati Maidan and the Delhi Zoo, New Delhi',
    visit: 'Ticketed ASI monument. Confirm current timings and fees on the official ASI portal.',
    sources: [wp('Purana Qila', 'Purana_Qila'), ASI], map: 'Purana Qila Delhi' },
  { id: 'jantar-mantar', name: 'Jantar Mantar', type: 'Monuments', area: 'Connaught Place', wiki: 'Jantar_Mantar,_New_Delhi',
    badge: 'Astronomical observatory · 1724', note: 'Jai Singh II’s naked-eye observatory',
    facts: ['Built in 1724 by Maharaja Jai Singh II of Jaipur, it was the first of the five Jantar Mantar observatories he built.',
      'It has 13 architectural instruments, including the Samrat Yantra, Jai Prakash, Ram Yantra and Misra Yantra, designed for observation with the naked eye.',
      'The Misra Yantra was the only structure in the observatory not invented by Jai Singh II.'],
    address: 'Sansad Marg (Parliament Street), near Connaught Place, New Delhi 110001',
    visit: 'Ticketed monument. Confirm current timings and fees locally or on the official ASI portal.',
    sources: [wp('Jantar Mantar, New Delhi', 'Jantar_Mantar,_New_Delhi'), ASI], map: 'Jantar Mantar Delhi' },
];

// Featured explainers (facts only, no invented bylines/dates)
export const guides = [
  { place: 'humayuns-tomb', tag: 'HERITAGE', title: 'Humayun’s Tomb, the garden tomb that came before the Taj',
    excerpt: 'Commissioned by Bega Begum and designed by Mirak Mirza Ghiyas, it set the template Mughal tomb builders would follow all the way to Agra.' },
  { place: 'red-fort', tag: 'HISTORY', title: 'Inside the Red Fort, Shah Jahan’s palace-fort',
    excerpt: 'Built in nine years, it is also where India’s flag was raised on 15 August 1947 above the Lahori Gate.' },
  { place: 'qutb-minar', tag: 'ARCHITECTURE', title: 'Qutb Minar: 72.5 metres of early Delhi',
    excerpt: 'A fluted red-sandstone tower, wide at the base and slim at the top, at the heart of Mehrauli’s archaeological area.' },
];

// end = last day of the event (ISO); events past this date are hidden automatically.
// source 'official' = taken from the organiser’s own site; 'listing' = third-party calendar, verify first.
export const events = [
  { start: '2026-10-29', end: '2026-11-03', day: '29', month: 'OCT', kind: 'FESTIVAL OF THE ARTS',
    title: 'The IIC Experience: A Festival of the Arts',
    where: 'India International Centre, 40 Max Mueller Marg', time: '29 Oct – 3 Nov · exhibitions, talks, performances, films',
    source: 'official', link: 'https://iicdelhi.in/programmes/current', note: 'Includes the exhibition “Birds of India: Company Paintings c.1800 and 1835” and evening performances on the Fountain Lawns. Check IIC’s page for entry rules per event.' },
  { start: '2026-11-08', end: '2026-11-08', day: '08', month: 'NOV', kind: 'FESTIVAL',
    title: 'Diwali (Lakshmi Puja)', where: 'Across Delhi', time: 'Sunday 8 Nov · puja timings vary, check a panchang',
    source: 'listing', link: 'https://www.vedantu.com/blog/diwali-2026', note: 'Date is consistent across panchang sources (Sunday, 8 November 2026).' },
  { start: '2026-11-14', end: '2026-11-27', day: '14', month: 'NOV', kind: 'CRAFTS & TRADE FAIR',
    title: 'India International Trade Fair (IITF)', where: 'Bharat Mandapam, Pragati Maidan', time: '14 – 27 Nov (per most listings)',
    source: 'listing', link: 'https://www.itpo.gov.in', note: 'Organised by ITPO. Most listings say 14–27 Nov but one calendar differs, so confirm dates and tickets on itpo.gov.in.' },
  { start: '2026-11-20', end: '2026-11-22', day: '20', month: 'NOV', kind: 'ART FAIR',
    title: 'India Art Festival, New Delhi', where: 'Constitution Club of India', time: '20 – 22 Nov · 10 AM – 6 PM',
    source: 'listing', link: 'https://www.tradeindia.com/tradeshows/142469/india-art-festival-new-delhi-2026.html', note: 'From a trade-show listing, not the organiser. Verify before attending.' },
];
