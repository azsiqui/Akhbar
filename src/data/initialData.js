export const INITIAL_BRANDS = [
  {
    id: 'the-hindu',
    brandName: 'The Hindu',
    tagline: 'National Edition & Editorial Analysis',
    badgeColor: 'bg-brown-900 text-gold-200 border-brown-700',
    headerBg: 'from-brown-900 via-brown-800 to-brown-950',
    thumbnail: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
    pdfUrl: null, // Set to null so no dummy paper is downloaded
    date: new Date().toISOString().split('T')[0],
    pageCount: 14,
    readPage: 0,
    completed: false,
    editorialSnippet: 'Upload today\'s edition of The Hindu using the button below.'
  },
  {
    id: 'indian-express',
    brandName: 'The Indian Express',
    tagline: 'Editorial, Explained & National Affairs',
    badgeColor: 'bg-forest-800 text-cream-100 border-forest-700',
    headerBg: 'from-forest-900 via-forest-800 to-forest-950',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    pdfUrl: null,
    date: new Date().toISOString().split('T')[0],
    pageCount: 12,
    readPage: 0,
    completed: false,
    editorialSnippet: 'Upload today\'s edition of The Indian Express using the button below.'
  },
  {
    id: 'toi',
    brandName: 'The Times of India',
    tagline: 'National News, Governance & Economy',
    badgeColor: 'bg-amber-900 text-amber-100 border-amber-800',
    headerBg: 'from-amber-950 via-amber-900 to-amber-950',
    thumbnail: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80',
    pdfUrl: null,
    date: new Date().toISOString().split('T')[0],
    pageCount: 16,
    readPage: 0,
    completed: false,
    editorialSnippet: 'Upload today\'s edition of The Times of India using the button below.'
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
  }
];

export const INITIAL_STREAK = {
  streak_count: 14,
  today_completed: false,
  total_read: 42
};

export const INITIAL_RESOURCE_REQUESTS = [
  {
    id: 'req-1',
    resource_name: 'Vision IAS Monthly Current Affairs (August 2026)',
    category: 'Monthly Magazine',
    note: 'Need PDF for Economy & IR revision.',
    status: 'Pending',
    created_at: new Date().toISOString()
  }
];
