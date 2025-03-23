
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  imageUrl: string;
  date: string;
  category: string;
  url: string;
}

// Get category query for API
export const getCategoryQuery = (category: string) => {
  switch(category) {
    case "tech": return "technology";
    case "finance": return "business";
    case "arts": return "entertainment";
    case "sports": return "sports";
    case "top": return "";
    default: return "general";
  }
};

// Backup news data in case API fails
export const getBackupNewsData = (category: string): NewsItem[] => {
  const techNews = [
    {
      id: '1',
      title: "Meta Maneuvers to Block Tell-All Document Release",
      description: "According to reports, Meta has launched aggressive legal measures to block former employee Sarah Wynn-Williams from promoting her memoir 'Careless People.'",
      source: "Tech News Daily",
      imageUrl: "https://placehold.co/400x200/3a1c71/ffffff?text=Meta",
      date: "2 hours ago",
      category: "tech",
      url: "https://example.com/article1"
    },
    {
      id: '2',
      title: "AI Scientist Generates First Peer-Reviewed Research Paper",
      description: "An AI system called ResearchGPT has authored a scientific paper that passed peer review without human intervention, raising questions about the future of academic publishing.",
      source: "Science Today",
      imageUrl: "https://placehold.co/400x200/662d8c/ffffff?text=AI",
      date: "5 hours ago",
      category: "tech",
      url: "https://example.com/article2"
    },
    {
      id: '3',
      title: "New Quantum Computing Breakthrough Challenges Encryption",
      description: "Scientists at MIT have demonstrated a quantum algorithm that could potentially break widely used cryptographic protocols, increasing calls for quantum-resistant security.",
      source: "Future Tech",
      imageUrl: "https://placehold.co/400x200/862d9c/ffffff?text=Quantum",
      date: "Yesterday",
      category: "tech",
      url: "https://example.com/article3"
    }
  ];

  const financeNews = [
    {
      id: '4',
      title: "Fed Maintains Interest Rates Despite Inflation Concerns",
      description: "The Federal Reserve has decided to maintain current interest rates despite growing inflation concerns, citing steady economic growth and employment figures.",
      source: "Economic Times",
      imageUrl: "https://placehold.co/400x200/403d65/ffffff?text=Finance",
      date: "3 hours ago",
      category: "finance",
      url: "https://example.com/article4"
    },
    {
      id: '5',
      title: "Cryptocurrency Market Sees $100B Surge After Regulatory Clarity",
      description: "Major cryptocurrencies experienced a significant price rally following new regulatory guidelines that provided clearer frameworks for institutional investors.",
      source: "Crypto News",
      imageUrl: "https://placehold.co/400x200/5d3a9c/ffffff?text=Crypto",
      date: "1 day ago",
      category: "finance",
      url: "https://example.com/article5"
    },
    {
      id: '6',
      title: "Tech Giant Announces Record-Breaking Quarterly Earnings",
      description: "Apple has reported its highest quarterly revenue ever, exceeding analyst expectations with $97.3 billion in revenue driven by strong iPhone and Services growth.",
      source: "Market Watch",
      imageUrl: "https://placehold.co/400x200/2e1c51/ffffff?text=Tech",
      date: "Yesterday",
      category: "finance",
      url: "https://example.com/article6"
    }
  ];

  if (category === 'tech') return techNews;
  if (category === 'finance') return financeNews;
  return [...techNews, ...financeNews];
};

// Add a relative time formatter method to Date prototype
declare global {
  interface Date {
    toRelativeTime(): string;
  }
}

if (!Date.prototype.toRelativeTime) {
  Date.prototype.toRelativeTime = function() {
    const now = new Date();
    const diffMs = now.getTime() - this.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return this.toLocaleDateString();
  };
}
