export const DUAS_COLLECTION = [
  {
    id: 1,
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "For my sister Arshi. May Allah put barakah in every page you read and every effort you make.",
    category: "Knowledge & Barakah"
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي",
    transliteration: "Allahumm-anfa'ni bima 'allamtani wa 'allimni ma yanfa'uni",
    translation: "O Allah, make useful for Arshi what You have taught her, teach her what will benefit her, and increase her in knowledge.",
    category: "Understanding"
  },
  {
    id: 3,
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbish rahli sadri wa yassir li amri",
    translation: "My Lord, expand for Arshi her breast and ease for her her task. May your UPSC journey be filled with clarity and ease.",
    category: "Calm & Peace"
  },
  {
    id: 4,
    arabic: "اللَّهُمَّ لا سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla",
    translation: "O Allah, nothing is easy except what You make easy. May You make every complex editorial and GS topic effortless for Arshi.",
    category: "Ease in Exams"
  },
  {
    id: 5,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Fa inna ma'al 'usri yusra",
    translation: "Verily, with hardship comes ease. Keep persevering Arshi, your hard work will bear beautiful fruits inshaAllah.",
    category: "Perseverance"
  }
];

export function getRandomDua() {
  const randomIndex = Math.floor(Math.random() * DUAS_COLLECTION.length);
  return DUAS_COLLECTION[randomIndex];
}
