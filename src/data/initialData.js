export const INITIAL_BRANDS = [
  {
    id: 'the-hindu',
    brandName: 'The Hindu',
    tagline: 'National Newspaper & Editorial Analysis',
    badgeColor: 'bg-brown-900 text-gold-200 border-brown-700',
    headerBg: 'from-brown-900 via-brown-800 to-brown-950',
    thumbnail: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    date: new Date().toISOString().split('T')[0],
    pageCount: 14,
    readPage: 4,
    completed: false,
    editorialSnippet: 'Monetary Policy & Inflation Dynamics: Structural Reforms in Agriculture & Energy Markets.'
  },
  {
    id: 'indian-express',
    brandName: 'The Indian Express',
    tagline: 'Editorial, Explained & National Affairs',
    badgeColor: 'bg-forest-800 text-cream-100 border-forest-700',
    headerBg: 'from-forest-900 via-forest-800 to-forest-950',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: new Date().toISOString().split('T')[0],
    pageCount: 12,
    readPage: 12,
    completed: true,
    editorialSnippet: 'Digital Evidence Framework & Judicial Delivery: Criminal Law Amendments Explained.'
  },
  {
    id: 'toi',
    brandName: 'The Times of India',
    tagline: 'National News, Governance & Economy',
    badgeColor: 'bg-amber-900 text-amber-100 border-amber-800',
    headerBg: 'from-amber-950 via-amber-900 to-amber-950',
    thumbnail: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80',
    pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    date: new Date().toISOString().split('T')[0],
    pageCount: 16,
    readPage: 0,
    completed: false,
    editorialSnippet: 'Urban Resilience & Infrastructure Development in Coastal Metropolitan Regions.'
  }
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Food Inflation & MSP Calculation Formula (GS-3)',
    gs_category: 'GS3',
    source: 'The Hindu',
    date: new Date().toISOString().split('T')[0],
    content: `## GS-3: Indian Economy & Agriculture

* **CFPI Weightage**: Food items constitute nearly 39% of CPI inflation basket.
* **CACP Formulas**:
  * **A2+FL**: Direct cash expenses + unpaid family labor value.
  * **C2**: Comprehensive cost including rental value of land.

> Swaminathan Commission recommended MSP at C2 + 50%.`,
    created_at: new Date().toISOString()
  },
  {
    id: 'note-2',
    title: 'Digital Evidence & Criminal Law Reforms (GS-2)',
    gs_category: 'GS2',
    source: 'The Indian Express',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    content: `## GS-2: Governance & Justice Delivery

* Mandatory forensic investigation for offenses punishable by 7+ years.
* Digital evidence validation framework under Sec 63 of BSAS.
* Zero FIR registration mandated across all police stations.`,
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const INITIAL_STREAK = {
  streak_count: 14,
  today_completed: false,
  total_read: 42
};
