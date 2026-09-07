export const SAMPLE_NEWSPAPERS = [
  {
    id: 'np-today-hindu',
    date: new Date().toISOString().split('T')[0],
    title: 'The Hindu - National Edition',
    source: 'The Hindu',
    pdf_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
    page_count: 14,
    read_page: 4,
    completed: false,
    editorial_highlight: 'Monetary Policy Committee Signals Rate Stability Amid Inflation Outlook & Food Prices Shift'
  },
  {
    id: 'np-today-ie',
    date: new Date().toISOString().split('T')[0],
    title: 'The Indian Express - Editorial & Explained',
    source: 'Indian Express',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    page_count: 12,
    read_page: 12,
    completed: true,
    editorial_highlight: 'Reforming the Criminal Justice System: Key Amendments and Digital Evidence Framework'
  },
  {
    id: 'np-today-toi',
    date: new Date().toISOString().split('T')[0],
    title: 'The Times of India - National Affairs',
    source: 'The Times of India',
    pdf_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80',
    page_count: 16,
    read_page: 0,
    completed: false,
    editorial_highlight: 'Urban Resilience & Flood Infrastructure Management in Coastal Metros'
  },
  {
    id: 'np-yesterday-hindu',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    title: 'The Hindu - Sunday Edition',
    source: 'The Hindu',
    pdf_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
    page_count: 16,
    read_page: 16,
    completed: true,
    editorial_highlight: 'Biodiversity Conservation & Critical Tiger Habitats Governance'
  },
  {
    id: 'np-prev-ie',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    title: 'The Indian Express - World & Economy',
    source: 'Indian Express',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    page_count: 14,
    read_page: 14,
    completed: true,
    editorial_highlight: 'Global Supply Chains & Strategic Rare Earth Minerals Partnerships'
  }
];

export const SAMPLE_EDITORIAL_SUMMARY = {
  newspaper_id: 'np-today-hindu',
  date: new Date().toISOString().split('T')[0],
  title: 'Managing Food Inflation & Climate Resilient Agriculture',
  lead_editorial: 'Navigating Volatility in Agricultural Commodities: Structural Reforms vs Fiscal Interventions',
  gs_paper: 'GS2 & GS3',
  gs_category: 'GS3',
  syllabus_topic: 'Indian Economy, Agriculture & Climate Resilience',
  prelims_facts: [
    'Consumer Food Price Index (CFPI) weights 39.06% in CPI Combined.',
    'Minimum Support Price (MSP) recommended by CACP based on A2+FL & C2 costs.',
    'PM-PRANAM scheme aims to reduce reliance on chemical fertilizers.',
    'El Niño Southern Oscillation (ENSO) impact on Southwest Monsoon distribution.'
  ],
  mains_points: [
    '**Structural Challenge**: Seasonal spikes in perishable commodities (tomatoes, onions, potatoes - TOP) highlight cold-storage deficit.',
    '**Policy Dilemma**: Frequent export bans and stock limits protect domestic consumers short-term but disincentivize long-term farm investment.',
    '**Way Forward**: Scale Micro-Irrigation, promote Climate-Smart Agriculture (CSA), and leverage Farmer Producer Organizations (FPOs).'
  ],
  keywords: ['CFPI Inflation', 'CACP', 'A2+FL Cost', 'Climate Resilience', 'Cold Chain Infrastructure', 'FPO Aggregation'],
  vocabulary: [
    { word: 'Volatile', meaning: 'Liable to change rapidly and unpredictably, especially for the worse.' },
    { word: 'Indigenization', meaning: 'The action or process of bringing something under local control or influence.' },
    { word: 'Fiscal Drag', meaning: 'Deflationary effect of progressive taxation when inflation shifts income into higher brackets.' }
  ]
};

export const SAMPLE_NOTES = [
  {
    id: 'note-1',
    newspaper_id: 'np-today-hindu',
    title: 'Food Inflation & MSP Calculation Formula Breakdown',
    gs_category: 'GS3',
    source: 'The Hindu',
    date: new Date().toISOString().split('T')[0],
    content: `## GS-3: Indian Economy & Agriculture

### 1. Key Concepts
* **CFPI Weightage**: Food items constitute nearly 39% of CPI inflation basket.
* **CACP Formulas**:
  * **A2**: Direct cash expenditures (seeds, fertilizers, labor, diesel).
  * **A2 + FL**: A2 plus imputed value of unpaid family labor.
  * **C2**: Comprehensive cost including rental value of land & interest on fixed capital.

> **Mains Value Addition**: Swaminathan Commission recommended MSP at C2 + 50%. Current government policy sets MSP at 1.5x of A2+FL.

### 2. Solutions for Mains
1. Modernize cold storage infrastructure under **Agri-Infrastructure Fund (AIF)**.
2. Direct Benefit Transfer (DBT) to farmers rather than market distortions.
3. Promote millet cultivation (Shree Anna) for climate resilience.`,
    created_at: new Date().toISOString()
  },
  {
    id: 'note-2',
    newspaper_id: 'np-today-ie',
    title: 'Digital Evidence & Criminal Justice Reforms (GS-2)',
    gs_category: 'GS2',
    source: 'Indian Express',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    content: `## GS-2: Governance & Justice Delivery

### Key Takeaways from Bharatiya Nagarik Suraksha Sanhita (BNSS)
* Mandatory forensic investigation for offenses punishable by 7 years or more.
* Electronic / Digital evidence validation framework under Sec 63 of BSAS.
* Zero FIR registration mandated across all police stations regardless of jurisdiction.

> **Quote for Essay/Ethics**: *"Justice delayed is justice denied, but hasty justice is justice buried."*`,
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const SAMPLE_BOOKMARKS = [
  {
    id: 'bm-1',
    newspaper_id: 'np-today-hindu',
    page: 6,
    title: 'Editorial Page: Climate Resilience & Agri Policy',
    note: 'Important for GS-3 Economy & Environment Mains answer.',
    created_at: new Date().toISOString()
  },
  {
    id: 'bm-2',
    newspaper_id: 'np-today-hindu',
    page: 10,
    title: 'International Relations: India-ASEAN Maritime Dialogue',
    note: 'Good points for GS-2 IR Act East Policy.',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_PROGRESS = {
  streak_count: 14,
  last_read_date: new Date().toISOString().split('T')[0],
  today_completed: false,
  total_papers_read: 48,
  total_notes_created: 32,
  weekly_goal_days: 6,
  weekly_completed_days: 5
};
