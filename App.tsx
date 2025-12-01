import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, Shield, Truck, Phone, 
  BarChart3, BookOpen, ArrowRight, CheckCircle, 
  PlayCircle, FileText, Anchor, ChevronDown, Send, User, Bot,
  Quote, Target, Lock, Globe, Award, Users, ChevronLeft, Info,
  Scale, Zap, History, AlertTriangle, Coins, Building, Eye,
  PieChart as LucidePieChart, Filter, SlidersHorizontal, ArrowLeft, Check, Search,
  ArrowUpRight, Calendar, Video, Briefcase, Mail, Newspaper, Bookmark, GraduationCap
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// --- Types ---

enum Page {
  HOME = 'home',
  ABOUT = 'about',
  PRODUCTS = 'products',
  LEARN = 'learn',
  CONTACT = 'contact'
}

type ProductTier = 'Basic Rounds & Bars' | 'Standard Bullion' | 'Premium Collection';

interface ProductSpecs {
  material: string;
  fineness: string;
  weight: string;
  diameter: string;
  manufacturer: string;
  thickness?: string;
}

interface Product {
  id: number;
  name: string;
  subtitle: string;
  priceIndication: string;
  priceOffset: number; // For sorting
  weight: string;
  purity: string;
  mint: string;
  category: 'bar' | 'coin';
  tier: ProductTier;
  description: string;
  image: string;
  highlights: string[];
  specs: ProductSpecs;
}

type ArticleCategory = 'All' | 'Market Briefing' | 'Expert Insights' | 'Lavi Analysis' | 'Silver 101';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  type: 'Video' | 'White Paper' | 'Article' | 'External';
  category: ArticleCategory;
  readTime: string;
  source?: string; // For 3rd party
  date: string;
}

interface Webinar {
  id: number;
  title: string;
  date: string;
  speaker: string;
  description: string;
  upcoming: boolean;
}

// --- Mock Data ---

const MOCK_PERFORMANCE_DATA = [
  { month: 'Jan', silver: 100, gold: 100, sp500: 100 },
  { month: 'Feb', silver: 105, gold: 101, sp500: 102 },
  { month: 'Mar', silver: 115, gold: 105, sp500: 103 },
  { month: 'Apr', silver: 122, gold: 108, sp500: 101 },
  { month: 'May', silver: 138, gold: 112, sp500: 104 },
  { month: 'Jun', silver: 135, gold: 114, sp500: 106 },
  { month: 'Jul', silver: 148, gold: 118, sp500: 109 },
  { month: 'Aug', silver: 160, gold: 121, sp500: 112 },
];

const ALLOCATION_DATA = [
  { name: 'Equities / Tech Stocks', value: 50, color: '#334155' }, // slate-700
  { name: 'Real Estate', value: 30, color: '#475569' }, // slate-600
  { name: 'Cash / Bonds', value: 10, color: '#64748B' }, // slate-500
  { name: 'Precious Metals', value: 10, color: '#E2E8F0' }, // lavi-silver
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Canadian Silver Maple Leaf",
    subtitle: "The World's Security Standard",
    priceIndication: "Spot + $4.50 / oz",
    priceOffset: 4.50,
    weight: "1 oz",
    purity: ".9999",
    mint: "Royal Canadian Mint",
    category: "coin",
    tier: "Standard Bullion",
    description: "The Royal Canadian Mint’s Silver Maple Leaf is one of the world’s most recognized coins. It features advanced security measures, including radial lines and a micro-engraved maple leaf with the year of issue. This coin offers the perfect blend of collectible beauty and investment-grade security.",
    image: "https://images.unsplash.com/photo-1624623348275-52646241b17d?q=80&w=1000&auto=format&fit=crop", // Abstract silver representation
    highlights: [
      "Contains 1 oz of .9999 fine Silver.",
      "Features RCM's MintShield™ technology to reduce white spots.",
      "Sovereign coin backed by the Canadian government.",
      "Obverse: Effigy of His Majesty King Charles III.",
      "Reverse: Large, distinct maple leaf with micro-engraved security mark."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.99%",
      weight: "31.10 grams",
      diameter: "38 mm",
      manufacturer: "Royal Canadian Mint"
    }
  },
  {
    id: 2,
    name: "American Silver Eagle",
    subtitle: "America's Official Bullion",
    priceIndication: "Spot + $6.00 / oz",
    priceOffset: 6.00,
    weight: "1 oz",
    purity: ".999",
    mint: "United States Mint",
    category: "coin",
    tier: "Standard Bullion",
    description: "The American Silver Eagle is the official silver bullion coin of the United States. It was first released by the United States Mint on November 24, 1986. It is struck only in the one-troy ounce size, which has a nominal face value of one dollar and is guaranteed to contain one troy ounce of 99.9% pure silver.",
    image: "https://images.unsplash.com/photo-1574607383077-47ddc2dc4324?q=80&w=1000&auto=format&fit=crop", // Abstract silver coin
    highlights: [
      "The single most popular silver bullion coin in the world.",
      "Content, weight, and purity guaranteed by the U.S. Government.",
      "Eligible for Precious Metals IRAs.",
      "Obverse: Adolph A. Weinman’s 'Walking Liberty' design.",
      "Reverse: Landing Eagle design by Emily Damstra."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.9%",
      weight: "31.10 grams",
      diameter: "40.6 mm",
      manufacturer: "United States Mint"
    }
  },
  {
    id: 3,
    name: "Britannia Silver Coin",
    subtitle: "A Symbol of Strength",
    priceIndication: "Spot + $4.00 / oz",
    priceOffset: 4.00,
    weight: "1 oz",
    purity: ".999",
    mint: "The Royal Mint",
    category: "coin",
    tier: "Standard Bullion",
    description: "Britannia has been the changing face of Britain for centuries, and this 2024 coin continues that legacy. The coin features four advanced security features, including a latent image that changes from a padlock to a trident, surface animation, tincture lines, and micro-text.",
    image: "https://images.unsplash.com/photo-1610375461246-83648bfb1e25?q=80&w=1000&auto=format&fit=crop",
    highlights: [
      "Contains 1 oz of .999 fine Silver.",
      "Four advanced security features for visual authentication.",
      "Capital Gains Tax exempt in the UK (relevant for dual citizens).",
      "Obverse: Official effigy of King Charles III.",
      "Reverse: The legendary figure of Britannia standing firm."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.9%",
      weight: "31.10 grams",
      diameter: "38.61 mm",
      manufacturer: "The Royal Mint (UK)"
    }
  },
  {
    id: 4,
    name: "Australian Silver Kangaroo",
    subtitle: "Iconic Australian Wildlife",
    priceIndication: "Spot + $3.80 / oz",
    priceOffset: 3.80,
    weight: "1 oz",
    purity: ".9999",
    mint: "Perth Mint",
    category: "coin",
    tier: "Standard Bullion",
    description: "Struck by the Perth Mint from 1 oz of .9999 pure silver, the Australian Kangaroo is a classic. The coin features a micro-laser engraved letter 'A' within the first A of AUSTRALIAN KANGAROO, visible only under magnification, providing superior authentication.",
    image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1000&auto=format&fit=crop",
    highlights: [
      "Contains 1 oz of .9999 fine Silver.",
      "Sovereign coin backed by the Australian government.",
      "Features a new Red Kangaroo design annually.",
      "Includes authentication feature on reverse.",
      "Unlimited mintage with 12-month production cap."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.99%",
      weight: "31.10 grams",
      diameter: "40.6 mm",
      manufacturer: "The Perth Mint"
    }
  },
  {
    id: 5,
    name: "PAMP Suisse Cast Bar",
    subtitle: "Swiss Engineering Excellence",
    priceIndication: "Spot + $2.50 / oz",
    priceOffset: 2.50,
    weight: "1 kg",
    purity: ".999",
    mint: "PAMP Suisse",
    category: "bar",
    tier: "Premium Collection",
    description: "For the serious investor, the 1 kilogram PAMP Suisse cast bar offers lower premiums and high efficiency. These bars are cast, not struck, giving them a unique, rugged appearance while maintaining Swiss precision in weight and purity.",
    image: "https://images.unsplash.com/photo-1521575256220-6385d8525e98?q=80&w=1000&auto=format&fit=crop",
    highlights: [
      "Contains 1 kilo (32.15 oz) of .999 fine Silver.",
      "Cast bar style with a rustic, industrial finish.",
      "Stamped with month and year of production.",
      "Includes Assay card verifying weight and purity.",
      "Produced by PAMP Suisse, a leader in precious metals."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.9%",
      weight: "1000 grams",
      diameter: "N/A (Bar)",
      manufacturer: "PAMP Suisse",
      thickness: "18 mm"
    }
  },
  {
    id: 6,
    name: "Lavi Signature 100oz Bar",
    subtitle: "Ultimate Wealth Storage",
    priceIndication: "Spot + $1.90 / oz",
    priceOffset: 1.90,
    weight: "100 oz",
    purity: ".999",
    mint: "Asahi / RCM",
    category: "bar",
    tier: "Basic Rounds & Bars",
    description: "The 100 oz silver bar is the industrial standard for wealth preservation. It offers the lowest premium over spot price, making it the most efficient vehicle for converting large cash positions into physical assets. Sourced from LBMA-approved refiners.",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1000&auto=format&fit=crop",
    highlights: [
      "Contains 100 oz of .999 fine Silver.",
      "Lowest premium option for bulk investment.",
      "Easy to stack and store.",
      "Recognized globally for liquidity.",
      "Ideal for long-term strategic holding."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.9%",
      weight: "3.11 kg",
      diameter: "N/A (Bar)",
      manufacturer: "Various LBMA Brands"
    }
  },
  {
    id: 7,
    name: "10 oz Silver Bar (Generic)",
    subtitle: "Stackable & Liquid",
    priceIndication: "Spot + $2.10 / oz",
    priceOffset: 2.10,
    weight: "10 oz",
    purity: ".999",
    mint: "Various",
    category: "bar",
    tier: "Basic Rounds & Bars",
    description: "The 10 oz silver bar is a favorite among stackers for its balance of lower premiums and convenient handling size. Sourced from various reputable mints such as Sunshine Minting, Silvertowne, or Asahi.",
    image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=1000&auto=format&fit=crop",
    highlights: [
      "Contains 10 oz of .999 fine Silver.",
      "Lower premium than sovereign coins.",
      "Easily stackable rectangular shape.",
      "Excellent liquidity in secondary markets.",
      "Brand may vary based on inventory."
    ],
    specs: {
      material: "Fine Silver",
      fineness: "99.9%",
      weight: "311 grams",
      diameter: "N/A",
      manufacturer: "Various"
    }
  }
];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Oleh's Guide to Wealth Preservation",
    excerpt: "How to protect your savings from currency volatility during your first years in Israel. Navigating banking bureaucracy and tax structures.",
    type: "Article",
    category: 'Lavi Analysis',
    readTime: "5 min read",
    date: "Oct 10, 2024"
  },
  {
    id: 2,
    title: "Why Israeli Tech Entrepreneurs Are Buying Silver",
    excerpt: "Diversifying equity portfolios with tangible assets: A strategy for hedging market corrections.",
    type: "White Paper",
    category: 'Lavi Analysis',
    readTime: "12 min read",
    date: "Sep 28, 2024"
  },
  {
    id: 3,
    title: "Understanding the Israeli Silver Premium",
    excerpt: "Why the secondary market in Israel offers superior liquidity and buy-back opportunities.",
    type: "Video",
    category: 'Lavi Analysis',
    readTime: "8 min watch",
    date: "Sep 15, 2024"
  },
  {
    id: 4,
    title: "Silver Supply Deficit Hits Record Highs",
    excerpt: "Global industrial demand outpaces mining supply for the 4th consecutive year.",
    type: "External",
    category: 'Expert Insights',
    readTime: "Bloomberg",
    source: "Bloomberg Commodities",
    date: "Oct 12, 2024"
  },
  {
    id: 5,
    title: "The Gold-to-Silver Ratio: A Historical Perspective",
    excerpt: "Analyzing the 80:1 ratio and what mean reversion implies for future silver pricing.",
    type: "Article",
    category: 'Silver 101',
    readTime: "6 min read",
    date: "Aug 20, 2024"
  },
  {
    id: 6,
    title: "October Market Briefing: Fed Pivot Implications",
    excerpt: "Recording of our live monthly session discussing interest rates and precious metals.",
    type: "Video",
    category: 'Market Briefing',
    readTime: "45 min watch",
    date: "Oct 15, 2024"
  },
  {
    id: 7,
    title: "E-Book: The Silver Investor's Handbook",
    excerpt: "A comprehensive guide to physical allocation, storage, and taxation in Israel.",
    type: "White Paper",
    category: 'Silver 101',
    readTime: "PDF Download",
    date: "July 01, 2024"
  }
];

const WEBINARS: Webinar[] = [
  {
    id: 1,
    title: "Monthly Market Outlook: Silver's Next Move",
    date: "November 15, 2024 | 19:00 IST",
    speaker: "Jonathan Lavi, Chief Strategist",
    description: "Join us for our monthly deep dive into the precious metals markets. We'll discuss Fed interest rate implications, the Gold-to-Silver ratio, and specific opportunities in the Israeli local market.",
    upcoming: true
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Olah from New York (2023)",
    quote: "Moving money to Israel was a compliance nightmare. Lavi Silver Group offered a seamless way to secure assets locally without dealing with aggressive bank compliance officers. It was the soft landing I needed.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Yoni B.",
    role: "Fintech Founder, Tel Aviv",
    quote: "My portfolio was 90% tech stocks and options. I needed a counter-balance that was completely outside the digital system. Lavi's advisory on physical allocation was exactly what I needed to sleep better at night.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Michael & Rachel",
    role: "Olim from UK",
    quote: "We wanted to keep some liquidity outside the Israeli banking system. Lavi's English-speaking team explained the market clearly and helped us with secure delivery.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop"
  }
];

// --- Components ---

const Button = ({ children, variant = 'primary', onClick, className = '' }: any) => {
  const baseStyle = "px-6 py-3 rounded-md font-medium transition-all duration-300 tracking-wide flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-lavi-silver text-lavi-dark hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    secondary: "border border-lavi-silver text-lavi-silver hover:bg-lavi-silver/10",
    outline: "border border-slate-600 text-slate-400 hover:border-slate-400 hover:text-current"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center animate-fade-in">
    <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${light ? 'text-lavi-dark' : 'text-white'}`}>{title}</h2>
    {subtitle && <p className={`max-w-2xl mx-auto text-lg font-light ${light ? 'text-slate-600' : 'text-slate-400'}`}>{subtitle}</p>}
    <div className={`w-24 h-1 mx-auto mt-6 rounded-full opacity-50 ${light ? 'bg-lavi-dark' : 'bg-lavi-silver'}`}></div>
  </div>
);

const Logo = () => (
  <div className="flex items-center gap-3 select-none">
    <div className="relative h-10">
       <img 
        src="https://via.placeholder.com/150x150/0B1120/E2E8F0?text=LAVI+LOGO" 
        alt="Lavi Silver Group" 
        className="h-full w-auto object-contain"
       />
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-2xl font-serif font-bold tracking-wide text-white leading-none">Lavi</span>
      <span className="text-[0.6rem] tracking-[0.25em] text-lavi-silverDark font-medium uppercase mt-1">Silver Group</span>
    </div>
  </div>
);

const Ticker = () => {
  const [silverPrice, setSilverPrice] = useState(31.42);
  const [goldPrice, setGoldPrice] = useState(2645.10);

  useEffect(() => {
    // Simulate minor price fluctuations
    const interval = setInterval(() => {
      setSilverPrice(prev => prev + (Math.random() - 0.5) * 0.05);
      setGoldPrice(prev => prev + (Math.random() - 0.5) * 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-lavi-dark border-b border-white/5 text-xs font-bold py-2 px-4 md:px-6 flex justify-between items-center relative z-50 text-white">
       <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-lavi-silver uppercase tracking-widest hidden sm:inline">Live Markets</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-300">
               Silver: <span className="text-white font-mono">${silverPrice.toFixed(2)}</span> 
               <span className="text-green-400 ml-1.5 flex inline-flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" /> 1.25%</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">
               Gold: <span className="text-lavi-gold font-mono">${goldPrice.toFixed(2)}</span> 
               <span className="text-green-400 ml-1.5 flex inline-flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" /> 0.42%</span>
            </span>
          </div>
       </div>
       <div className="hidden md:block text-slate-500 text-[10px] uppercase tracking-wider">
          Prices delayed 15m
       </div>
    </div>
  );
};

const TestimonialsSection = () => (
  <section className="container mx-auto px-6 py-24 bg-lavi-dark relative">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    <SectionHeading title="Investor Stories" subtitle="Helping Olim and Tech Leaders navigate the Israeli financial landscape." />
    <div className="grid md:grid-cols-3 gap-8">
      {TESTIMONIALS.map((t) => (
        <div key={t.id} className="bg-lavi-primary/20 p-8 rounded-xl border border-white/5 relative hover:bg-lavi-primary/40 transition-all duration-300 group">
          <div className="absolute -top-4 -left-2 bg-lavi-dark p-2 rounded-full border border-white/10">
             <Quote className="w-6 h-6 text-lavi-silver" />
          </div>
          <p className="text-slate-300 mb-8 relative z-10 italic leading-relaxed pt-2">"{t.quote}"</p>
          <div className="flex items-center gap-4 mt-auto">
             <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-lavi-silver/30 group-hover:border-lavi-silver transition-colors" />
             <div>
               <h4 className="text-white font-bold font-serif">{t.name}</h4>
               <p className="text-xs text-lavi-silverDark uppercase tracking-wider">{t.role}</p>
             </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const GuideAccordion = ({ title, icon, children, light = false }: { title: string, icon: any, children?: React.ReactNode, light?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden mb-4 ${light ? 'bg-white border-slate-200 shadow-sm' : 'bg-lavi-primary/20 border-white/10'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 text-left transition-colors ${light ? 'hover:bg-slate-50' : 'hover:bg-lavi-primary/40'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg border ${light ? 'bg-slate-100 text-lavi-dark border-slate-200' : 'bg-lavi-dark text-lavi-silver border-white/10'}`}>
             {icon}
          </div>
          <span className={`text-lg md:text-xl font-serif font-bold ${light ? 'text-lavi-dark' : 'text-white'}`}>{title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${light ? 'text-slate-400' : 'text-slate-400'}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`p-6 pt-0 leading-relaxed border-t font-light text-sm md:text-base ${light ? 'text-slate-600 border-slate-100' : 'text-slate-300 border-white/5'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const NewsletterSection = () => (
  <div className="bg-gradient-to-r from-lavi-primary/50 to-lavi-dark border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
          <div className="bg-lavi-silver rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
               {/* Pattern */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
               
               <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-2 mb-3 text-lavi-dark/70 font-bold uppercase tracking-widest text-xs">
                        <Mail className="w-4 h-4" /> Silver Rising Newsletter
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-lavi-dark mb-4">Stay Ahead of the Market</h3>
                    <p className="text-lavi-dark/80 font-medium leading-relaxed">
                        Join 5,000+ investors receiving our weekly analysis on precious metals, Israeli economic updates, and exclusive buy-back opportunities.
                    </p>
               </div>

               <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                    <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="px-6 py-3 rounded-lg bg-white/90 border-0 text-lavi-dark placeholder:text-slate-500 focus:ring-2 focus:ring-lavi-dark/20 outline-none min-w-[300px]"
                        />
                        <button className="px-8 py-3 bg-lavi-dark text-white rounded-lg font-bold hover:bg-lavi-primary transition-colors shadow-lg">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-lavi-dark/60 text-xs mt-3 text-center sm:text-left">
                        No spam. Unsubscribe at any time.
                    </p>
               </div>
          </div>
      </div>
  </div>
);

// --- Pages ---

const Home = ({ navigate }: { navigate: (page: Page) => void }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lavi-dark/80 via-lavi-dark/90 to-lavi-dark z-10"></div>
          {/* Abstract Silver Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624623348275-52646241b17d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-pulse-slow"></div>
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Liquid. Secure.<br />
              <span className="text-silver-gradient">Tangible Wealth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Israel's premier silver brokerage. Whether you are making Aliyah or diversifying a high-tech portfolio, we provide physical asset solutions outside the banking system.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={() => navigate(Page.PRODUCTS)}>View Portfolio</Button>
              <Button variant="secondary" onClick={() => navigate(Page.ABOUT)}>Why Silver?</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Assets for Uncertain Times (Replacing Value Props) */}
      <section className="container mx-auto px-6">
        <SectionHeading 
          title="Real Assets for Uncertain Times" 
          subtitle="In a world of digital currencies and volatile markets, physical silver offers something increasingly rare: genuine, tangible wealth." 
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <History className="w-10 h-10 text-lavi-silver" />, 
              title: "Wealth Preservation", 
              desc: "Silver has maintained purchasing power for millennia, serving as a reliable store of value across civilizations." 
            },
            { 
              icon: <Zap className="w-10 h-10 text-lavi-silver" />, 
              title: "Industrial Demand", 
              desc: "Essential for solar panels, electronics, and EVs. Growing industrial use drives long-term value." 
            },
            { 
              icon: <Lock className="w-10 h-10 text-lavi-silver" />, 
              title: "Liquidity Outside Banks", 
              desc: "Physical silver exists outside the banking system—no counterparty risk, no digital vulnerabilities." 
            },
            { 
              icon: <BarChart3 className="w-10 h-10 text-lavi-silver" />, 
              title: "Portfolio Diversification", 
              desc: "Low correlation to stocks and bonds makes silver an effective hedge against market volatility." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-lavi-primary/50 p-8 rounded-xl border border-white/5 hover:border-lavi-silver/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="mb-6 bg-lavi-dark w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Making Aliyah Feature Section - New Content */}
      <section className="bg-lavi-primary/30 py-24 border-y border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lavi-silver/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="order-2 md:order-1">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                    Making Aliyah?<br/>
                    <span className="text-silver-gradient">Bring Real Assets With You.</span>
                  </h2>
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
                      Whether you're planning your move or already building your life in Israel, physical silver offers a unique opportunity to establish financial security outside the traditional banking system.
                  </p>
                  <ul className="space-y-5">
                      {[
                        "English-speaking advisors",
                        "High Liquidity in Israeli Market",
                        "Secure Insured Delivery",
                        "Guidance on cash-to-asset conversion"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-white text-lg">
                           <div className="bg-lavi-silver/20 p-1 rounded-full">
                             <CheckCircle className="w-5 h-5 text-lavi-silver" />
                           </div>
                           {item}
                        </li>
                      ))}
                  </ul>
                  <div className="mt-10">
                     <Button onClick={() => navigate(Page.CONTACT)}>Start Your Consultation</Button>
                  </div>
              </div>
              <div className="order-1 md:order-2 relative">
                 <div className="absolute inset-0 bg-lavi-dark/20 z-10 rounded-xl"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1574607383077-47ddc2dc4324?q=80&w=1000&auto=format&fit=crop" 
                    alt="Silver Coins Stack" 
                    className="rounded-xl shadow-2xl border border-white/10 w-full object-cover h-[500px] relative z-0 transform md:rotate-3 hover:rotate-0 transition-transform duration-700"
                 />
              </div>
          </div>
      </section>

      {/* Strategic Allocation Section (Pie Chart) */}
      <section className="container mx-auto px-6 py-12">
         <div className="bg-lavi-dark border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lavi-silver/0 via-lavi-silver/50 to-lavi-silver/0"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative h-[350px] w-full flex justify-center items-center">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={ALLOCATION_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                         >
                            {ALLOCATION_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
                            ))}
                         </Pie>
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#E2E8F0' }}
                         />
                      </PieChart>
                   </ResponsiveContainer>
                   {/* Center Text */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                      <p className="text-3xl font-bold text-white">10%</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">Recommended<br/>Allocation</p>
                   </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <PieChart as={LucidePieChart} className="w-5 h-5 text-lavi-silver" />
                     <span className="text-lavi-silver uppercase tracking-widest text-sm font-bold">Strategic Allocation</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Diversify Your Success</h2>
                  <p className="text-lg text-slate-300 mb-6 font-light leading-relaxed">
                     Israeli high-tech portfolios are often heavily weighted in equities and options. Financial experts recommend allocating <strong>5-15% of your net worth</strong> to commodities to hedge against market corrections and currency devaluation.
                  </p>
                  <ul className="space-y-4 mb-8">
                     <li className="flex items-center gap-3 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-lavi-silver"></div>
                        <span><strong>Precious Metals:</strong> Stability & Insurance</span>
                     </li>
                     <li className="flex items-center gap-3 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <span><strong>Equities:</strong> Growth & Risk</span>
                     </li>
                  </ul>
                  <Button variant="outline" onClick={() => navigate(Page.CONTACT)}>Discuss Allocation Strategy</Button>
               </div>
            </div>
         </div>
      </section>

      {/* Market Fundamentals Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <Scale className="w-5 h-5 text-lavi-silver" />
                 <span className="text-lavi-silver uppercase tracking-widest text-sm font-bold">Market Fundamentals</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">The Israeli Silver Premium</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
                <p>
                  The Israeli physical silver market is unique. Unlike other regions, the secondary market here is incredibly robust, with private buyers frequently paying <strong>above global spot prices</strong> for immediate physical delivery.
                </p>
                <p>
                  This dynamic creates exceptional liquidity for Lavi clients. When you hold physical silver in Israel, you aren't just holding a global commodity; you are holding a scarce local asset that is in high demand.
                </p>
                <div className="flex gap-4 pt-4">
                   <div className="border-l-4 border-lavi-silver pl-4">
                      <p className="text-xl font-bold text-white">High Liquidity</p>
                      <p className="text-xs text-slate-500 uppercase">Local Secondary Market</p>
                   </div>
                   <div className="border-l-4 border-slate-600 pl-4">
                      <p className="text-xl font-bold text-white">Demand > Supply</p>
                      <p className="text-xs text-slate-500 uppercase">Import Constraints</p>
                   </div>
                </div>
              </div>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-lavi-silver/20 blur-3xl rounded-full opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1610375461246-83648bfb1e25?q=80&w=2070&auto=format&fit=crop" 
                alt="Silver Coins" 
                className="relative z-10 rounded-xl shadow-2xl border border-white/10"
              />
           </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="container mx-auto px-6">
        <div className="bg-lavi-primary/20 p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lavi-silver/5 rounded-full blur-[100px]"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-12 h-1 bg-lavi-silver rounded-full"></div>
                 <span className="text-lavi-silver uppercase tracking-widest text-sm font-bold">YTD Analysis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Performance Comparison</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Silver is demonstrating exceptional strength in 2024. While Gold reaches all-time highs, Silver's dual nature as a monetary metal and an indispensable industrial component (solar, EVs, medical) drives explosive growth potential.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-lavi-dark/60 p-4 rounded-lg border border-white/5">
                    <p className="text-slate-500 text-xs uppercase mb-1">Silver YTD</p>
                    <p className="text-2xl font-bold text-lavi-silver">+60%</p>
                 </div>
                 <div className="bg-lavi-dark/60 p-4 rounded-lg border border-white/5">
                    <p className="text-slate-500 text-xs uppercase mb-1">S&P 500 YTD</p>
                    <p className="text-2xl font-bold text-slate-400">+12%</p>
                 </div>
              </div>
              <Button variant="outline" onClick={() => navigate(Page.LEARN)}>Read Full Report</Button>
            </div>
            <div className="h-[400px] w-full bg-lavi-dark/80 p-6 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#94A3B8" tick={{fontSize: 12}} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94A3B8" tick={{fontSize: 12}} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} 
                    itemStyle={{ color: '#fff', paddingBottom: '4px' }}
                    labelStyle={{ color: '#94A3B8', marginBottom: '8px' }}
                  />
                  <Legend wrapperStyle={{paddingTop: '20px'}} />
                  <Line type="monotone" dataKey="silver" name="Silver" stroke="#E2E8F0" strokeWidth={3} dot={{r: 4, fill: "#E2E8F0"}} activeDot={{r: 6, fill: "#fff"}} />
                  <Line type="monotone" dataKey="gold" name="Gold" stroke="#F59E0B" strokeWidth={2} dot={false} strokeOpacity={0.7} />
                  <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#64748B" strokeWidth={2} strokeDasharray="5 5" dot={false} strokeOpacity={0.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview (Moved below Analysis) */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-1 bg-lavi-silver rounded-full"></div>
                    <span className="text-lavi-silver uppercase tracking-widest text-sm font-bold">Our Catalog</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Sovereign Mint Bullion</h2>
                <p className="text-slate-400 font-light text-lg">
                    We exclusively stock recognized sovereign coins and LBMA-approved bars to ensure maximum liquidity and security.
                </p>
            </div>
            <Button variant="outline" onClick={() => navigate(Page.PRODUCTS)} className="hidden md:flex">
                View Full Catalog <ArrowRight className="w-4 h-4" />
            </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
                <div 
                    key={product.id} 
                    onClick={() => navigate(Page.PRODUCTS)}
                    className="group bg-lavi-primary/20 border border-white/5 rounded-xl overflow-hidden hover:border-lavi-silver/50 transition-all duration-300 cursor-pointer"
                >
                    <div className="h-48 overflow-hidden relative bg-white/5">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                         <div className="absolute top-3 right-3 bg-lavi-dark/80 backdrop-blur px-2 py-1 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest">
                            {product.category}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-lavi-silver transition-colors">{product.name}</h3>
                        <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">{product.mint}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <span className="text-lavi-silver font-medium text-sm">{product.priceIndication}</span>
                            <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-8 md:hidden">
            <Button variant="outline" onClick={() => navigate(Page.PRODUCTS)} className="w-full">
                View Full Catalog
            </Button>
        </div>
      </section>

      {/* Learn Preview */}
      <section className="container mx-auto px-6 py-12 bg-lavi-primary/10 border-y border-white/5">
         <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Investment Insights</h2>
                <p className="text-slate-400 font-light text-lg max-w-2xl">
                    Navigate the complexities of the Israeli financial system and global precious metals markets.
                </p>
            </div>
            <Button variant="outline" onClick={() => navigate(Page.LEARN)} className="hidden md:flex">
                Read All Articles <ArrowRight className="w-4 h-4" />
            </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.slice(0, 3).map((article) => (
                <div key={article.id} onClick={() => navigate(Page.LEARN)} className="bg-lavi-dark border border-white/5 p-6 rounded-xl hover:border-lavi-silver/30 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-2 mb-3 text-lavi-silverDark text-[10px] uppercase tracking-widest font-bold">
                        {article.type === 'Video' ? <PlayCircle className="w-3 h-3 text-lavi-silver" /> : <FileText className="w-3 h-3 text-lavi-silver" />}
                        {article.readTime}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-lavi-silver transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                    <div className="text-lavi-silver text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Now <ArrowRight className="w-3 h-3" />
                    </div>
                </div>
            ))}
        </div>
         <div className="mt-8 md:hidden">
            <Button variant="outline" onClick={() => navigate(Page.LEARN)} className="w-full">
                Read All Articles
            </Button>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-lavi-silver/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Take Control of Your Wealth</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Don't wait for the next banking crisis or currency dip. Schedule a private consultation to discuss allocating a portion of your portfolio to physical silver.
            </p>
            <Button onClick={() => navigate(Page.CONTACT)}>Enquire Now</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const About = ({ navigate }: { navigate: (page: Page) => void }) => {
  return (
    <div className="pt-0 bg-slate-50">
      
      {/* 1. Benefits for Investors (Now Top, Dark Theme) */}
      <section className="bg-lavi-dark py-24 relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-lavi-silver/5 rounded-full blur-3xl pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <SectionHeading title="Benefits for Investors" subtitle="Tailored strategies for your financial background." light={false} />
            
            <div className="grid lg:grid-cols-2 gap-12">
               {/* Column 1: For Olim */}
               <div>
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-white/10 rounded-full shadow-sm border border-white/10">
                          <Globe className="w-6 h-6 text-lavi-silver" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">For Olim</h3>
                  </div>
                  <div className="space-y-4">
                      <GuideAccordion title="Smarter Diversification" icon={<Briefcase className="w-5 h-5" />} light={false}>
                          <p>Making aliyah is complex financially. Many olim default to keeping funds in US equities or rushing into illiquid Israeli real estate. Physical silver offers a smarter path to diversification—one that doesn't require local expertise, ongoing management, or navigating foreign tax treaties.</p>
                      </GuideAccordion>
                      <GuideAccordion title="Tangible Security" icon={<Anchor className="w-5 h-5" />} light={false}>
                          <p>Unlike digital assets or paper investments, silver is real. You can hold it. It exists independently of any bank, brokerage, or financial institution. In a world of increasing digital complexity, there's profound value in owning something tangible that doesn't depend on passwords or third-party solvency.</p>
                      </GuideAccordion>
                      <GuideAccordion title="Instant Liquidity" icon={<Zap className="w-5 h-5" />} light={false}>
                          <p>One of the greatest anxieties for olim is access to capital. Physical silver provides genuine liquidity outside the banking system. We offer a Buy-Back Program at competitive market rates with no waiting periods and no red tape.</p>
                      </GuideAccordion>
                      <GuideAccordion title="VAT Transparency" icon={<Info className="w-5 h-5" />} light={false}>
                          <p>Silver purchases in Israel are subject to 17% VAT. However, if you are operating through an Israeli business entity (Ltd or Osek Murshe), you may be able to reclaim VAT on your silver purchases as a business expense, significantly reducing your cost basis.</p>
                      </GuideAccordion>
                  </div>
               </div>

               {/* Column 2: Startup Nation Investors */}
               <div>
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-white/10 rounded-full shadow-sm border border-white/10">
                          <TrendingUp className="w-6 h-6 text-lavi-silver" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">For Startup Nation Investors</h3>
                  </div>
                  <div className="space-y-4">
                      <GuideAccordion title="The Concentration Problem" icon={<AlertTriangle className="w-5 h-5" />} light={false}>
                          <p>Your wealth was likely created through tech. However, most post-exit portfolios (S&P 500, Tel Aviv Real Estate, VC Funds) are highly correlated to the same macro factors that drove your exit. You've diversified across vehicles, but not across risk factors.</p>
                      </GuideAccordion>
                      <GuideAccordion title="True Decorrelation" icon={<Scale className="w-5 h-5" />} light={false}>
                          <p>Physical silver is driven by fundamentally different forces: industrial demand (solar, EVs), central bank policy, and supply constraints. When equities decline and risk appetite disappears, silver moves independently.</p>
                      </GuideAccordion>
                      <GuideAccordion title="Asymmetric Upside" icon={<BarChart3 className="w-5 h-5" />} light={false}>
                          <p>The gold-silver ratio currently sits around 80:1. Historically, it averages closer to 50:1. Reversion to historical norms implies 60-150% upside from ratio normalization alone—before any increase in absolute gold prices.</p>
                      </GuideAccordion>
                      <GuideAccordion title="Privacy & Discretion" icon={<Eye className="w-5 h-5" />} light={false}>
                          <p>Physical holdings don't appear on brokerage statements. They aren't tracked in centralized databases. We maintain strict confidentiality for all clients, ensuring your wealth remains private and under your control.</p>
                      </GuideAccordion>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 2. About Lavi (Now Bottom, Split Design, Silver BG) */}
      <section className="">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Text Side - Silver BG */}
          <div className="bg-slate-200 p-12 md:p-20 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-6">
                 <div className="w-12 h-1 bg-lavi-dark rounded-full"></div>
                 <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">Our Philosophy</span>
              </div>
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavi-dark mb-8">About Lavi Silver Group</h2>
             <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
               <p className="font-medium">
                  We are a boutique precious metals brokerage based in Tel Aviv, dedicated to helping investors secure their wealth outside the digital banking system.
               </p>
               <p className="font-light">
                  Founded by Olim for Olim and High-Tech professionals, we understand the unique landscape of the Israeli economy. From navigating bureaucracy to hedging stock options, we provide more than just bullion—we provide financial clarity and peace of mind.
               </p>
             </div>
             
             <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  {icon: Shield, text: "Fully Insured"},
                  {icon: Coins, text: "Buy-Back Program"},
                  {icon: Globe, text: "English Service"},
                  {icon: Lock, text: "Private Vaulting"}
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                         <item.icon className="w-5 h-5 text-lavi-dark" />
                      </div>
                      <span className="text-lavi-dark font-medium text-sm">{item.text}</span>
                   </div>
                ))}
             </div>
          </div>
          
          {/* Image Side */}
          <div className="relative h-full min-h-[400px]">
             <img 
               src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=1000&auto=format&fit=crop" 
               alt="Silver Bars" 
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-lavi-dark/20 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

    </div>
  );
};

const Products = ({ navigate }: { navigate: (page: Page) => void }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filtering & Sorting State
  const [activeTier, setActiveTier] = useState<ProductTier | 'All'>('All');
  const [activeMint, setActiveMint] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Featured' | 'PriceLow' | 'PriceHigh'>('Featured');
  
  // Derive unique mints for filter
  const mints = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.mint)))];

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(p => {
      const matchTier = activeTier === 'All' || p.tier === activeTier;
      const matchMint = activeMint === 'All' || p.mint === activeMint;
      return matchTier && matchMint;
  }).sort((a, b) => {
      if (sortBy === 'PriceLow') return a.priceOffset - b.priceOffset;
      if (sortBy === 'PriceHigh') return b.priceOffset - a.priceOffset;
      return 0; // Featured uses default order
  });

  const SimilarProducts = ({ category, currentId }: { category: string, currentId: number }) => {
      const similar = PRODUCTS
        .filter(p => p.id !== currentId && p.tier === category)
        .slice(0, 3);
      
      if (similar.length === 0) return null;

      return (
        <div className="mt-24 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-serif font-bold text-lavi-dark mb-8">You Might Also Like</h3>
            <div className="grid md:grid-cols-3 gap-8">
                {similar.map(product => (
                    <div key={product.id} onClick={() => { setSelectedProduct(product); window.scrollTo(0,0); }} className="cursor-pointer group">
                        <div className="bg-white rounded-xl overflow-hidden mb-4 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                             <img src={product.image} alt={product.name} className="h-48 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="text-lg font-bold text-lavi-dark group-hover:text-lavi-primary transition-colors">{product.name}</h4>
                        <p className="text-sm text-slate-500">{product.priceIndication}</p>
                    </div>
                ))}
            </div>
        </div>
      );
  };

  const SellToUsSection = () => (
      <div className="mt-32 relative z-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-slate-50 rounded-full blur-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center relative z-20">
              <div className="space-y-6">
                  <div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-lavi-dark mb-2">Sell Your Silver to Lavi</h3>
                      <div className="h-1 w-20 bg-lavi-dark rounded-full"></div>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                      We offer a consistent market for your metals. Enjoy transparent, competitive buy-back rates for all sovereign bullion and LBMA-approved bars.
                  </p>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-slate-700">
                          <div className="p-1 bg-green-100 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
                          <span><strong>Liquidity</strong> for Lavi clients</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-700">
                          <div className="p-1 bg-green-100 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
                          <span>Immediate payment via bank transfer (NIS/USD)</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-700">
                          <div className="p-1 bg-green-100 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
                          <span>Secure drop-off in Tel Aviv or insured courier</span>
                      </li>
                  </ul>
                  <div className="pt-4">
                      <Button variant="outline" onClick={() => navigate(Page.CONTACT)} className="w-full md:w-auto hover:text-white hover:bg-lavi-dark">
                          Request Buy-Back Offer
                      </Button>
                  </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 relative">
                  <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-6">
                       <div className="p-3 bg-white rounded-lg shadow-sm">
                          <Shield className="w-8 h-8 text-lavi-dark" />
                       </div>
                       <div>
                           <h4 className="text-lavi-dark font-bold text-lg">Live Buy-Back Rates</h4>
                           <p className="text-xs text-slate-500 uppercase tracking-wider">Updated Daily</p>
                       </div>
                  </div>
                   <div className="space-y-4">
                       {[
                         { name: "1 oz Silver Eagle", price: "Spot + $2.00" },
                         { name: "1 oz Maple Leaf", price: "Spot + $1.50" },
                         { name: "100 oz Bar", price: "Spot + $0.80" },
                         { name: "Generic Rounds", price: "Spot + $0.50" }
                       ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                               <span className="text-slate-700 text-sm font-medium">{item.name}</span>
                               <span className="text-lavi-dark font-mono font-bold">{item.price}</span>
                           </div>
                       ))}
                       <p className="text-[10px] text-slate-500 mt-4 text-center">*Indicative pricing based on mint condition items.</p>
                   </div>
              </div>
          </div>
      </div>
  );

  // PRODUCT DETAIL VIEW
  if (selectedProduct) {
      return (
          <div className="pt-24 pb-24 container mx-auto px-6 animate-fade-in">
              {/* Breadcrumb / Back */}
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="flex items-center gap-2 text-slate-500 hover:text-lavi-dark transition-colors mb-8 group"
              >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Catalog
              </button>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 relative">
                  {/* Image Column */}
                  <div className="space-y-6">
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-8 shadow-xl relative z-0">
                           {/* Abstract 'Zoom' lens effect hint */}
                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded p-2 border border-slate-200 shadow-sm">
                               <Search className="w-4 h-4 text-slate-700" />
                           </div>
                           <img 
                              src={selectedProduct.image} 
                              alt={selectedProduct.name} 
                              className="w-full h-auto object-cover rounded-lg transform hover:scale-110 transition-transform duration-700 cursor-zoom-in" 
                            />
                      </div>
                      <div className="grid grid-cols-2 gap-4 relative z-0">
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                              <Shield className="w-6 h-6 text-lavi-dark mx-auto mb-2" />
                              <p className="text-xs text-slate-500 uppercase">Authenticated</p>
                              <p className="text-sm font-bold text-lavi-dark">Guaranteed Purity</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                              <Truck className="w-6 h-6 text-lavi-dark mx-auto mb-2" />
                              <p className="text-xs text-slate-500 uppercase">Secure Shipping</p>
                              <p className="text-sm font-bold text-lavi-dark">Insured Delivery</p>
                          </div>
                      </div>
                  </div>

                  {/* Details Column */}
                  <div>
                      <div className="mb-2">
                          <span className="text-lavi-dark text-xs font-bold uppercase tracking-widest bg-slate-200 px-2 py-1 rounded">
                              {selectedProduct.tier}
                          </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-serif font-bold text-lavi-dark mb-2">{selectedProduct.name}</h1>
                      <p className="text-xl text-slate-600 mb-6 font-light">{selectedProduct.subtitle}</p>
                      
                      <div className="flex items-baseline gap-4 mb-8 border-b border-slate-200 pb-8">
                          <span className="text-3xl font-bold text-lavi-dark">{selectedProduct.priceIndication}</span>
                          <span className="text-slate-500 text-sm">*Indicative Pricing</span>
                      </div>

                      <div className="space-y-8">
                          <div>
                              <p className="text-slate-700 leading-relaxed mb-6">
                                  {selectedProduct.description}
                              </p>
                              <Button className="w-full md:w-auto hover:text-white hover:bg-lavi-dark" onClick={() => navigate(Page.CONTACT)}>Enquire Now</Button>
                          </div>

                          {/* Highlights */}
                          <div>
                              <h3 className="text-lavi-dark font-bold mb-4 flex items-center gap-2">
                                  <Award className="w-5 h-5 text-lavi-primary" /> Product Highlights
                              </h3>
                              <ul className="space-y-2">
                                  {selectedProduct.highlights.map((highlight, idx) => (
                                      <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-lavi-dark flex-shrink-0"></div>
                                          {highlight}
                                      </li>
                                  ))}
                              </ul>
                          </div>

                          {/* Specs Table */}
                          <div>
                              <h3 className="text-lavi-dark font-bold mb-4 flex items-center gap-2">
                                  <Scale className="w-5 h-5 text-lavi-primary" /> Specifications
                              </h3>
                              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                                  {Object.entries(selectedProduct.specs).map(([key, value], idx) => (
                                      <div key={key} className={`flex justify-between p-3 text-sm ${idx % 2 === 0 ? 'bg-white' : ''}`}>
                                          <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                          <span className="text-slate-900 font-medium">{value}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="my-20 h-px bg-slate-200 w-full"></div>
              
              <SellToUsSection />
              <SimilarProducts category={selectedProduct.tier} currentId={selectedProduct.id} />
          </div>
      );
  }

  // CATALOG VIEW
  return (
    <div className="pt-24 pb-24 container mx-auto px-6 min-h-screen">
       <SectionHeading title="Our Catalog" subtitle="Investment grade bullion from the world's most trusted mints." light={true} />
       
       <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Filters */}
           <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
               
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex items-center gap-2 mb-4 text-lavi-dark font-bold">
                       <Filter className="w-4 h-4" /> Filters
                   </div>
                   
                   {/* Collections */}
                   <div className="mb-6">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Collection</h4>
                       <div className="space-y-2">
                           {['All', 'Basic Rounds & Bars', 'Standard Bullion', 'Premium Collection'].map(tier => (
                               <label key={tier} className="flex items-center gap-3 cursor-pointer group">
                                   <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${activeTier === tier ? 'bg-lavi-dark border-lavi-dark' : 'border-slate-300 group-hover:border-slate-500'}`}>
                                       {activeTier === tier && <Check className="w-3 h-3 text-white" />}
                                   </div>
                                   <span className={`text-sm ${activeTier === tier ? 'text-lavi-dark font-medium' : 'text-slate-500 group-hover:text-slate-800'}`}>
                                       {tier}
                                   </span>
                                   <input 
                                      type="radio" 
                                      name="tier" 
                                      className="hidden" 
                                      checked={activeTier === tier} 
                                      onChange={() => setActiveTier(tier as any)} 
                                   />
                               </label>
                           ))}
                       </div>
                   </div>

                   {/* Mints */}
                   <div>
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mint</h4>
                       <div className="space-y-2">
                           {mints.map(mint => (
                               <label key={mint} className="flex items-center gap-3 cursor-pointer group">
                                   <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${activeMint === mint ? 'bg-lavi-dark border-lavi-dark' : 'border-slate-300 group-hover:border-slate-500'}`}>
                                       {activeMint === mint && <Check className="w-3 h-3 text-white" />}
                                   </div>
                                   <span className={`text-sm ${activeMint === mint ? 'text-lavi-dark font-medium' : 'text-slate-500 group-hover:text-slate-800'}`}>
                                       {mint}
                                   </span>
                                   <input 
                                      type="radio" 
                                      name="mint" 
                                      className="hidden" 
                                      checked={activeMint === mint} 
                                      onChange={() => setActiveMint(mint)} 
                                   />
                               </label>
                           ))}
                       </div>
                   </div>
               </div>

               {/* Banner */}
               <div className="bg-lavi-dark p-6 rounded-xl text-white shadow-lg">
                   <h4 className="font-bold text-lg mb-2 leading-tight">New to Silver?</h4>
                   <p className="text-sm mb-4 text-slate-300">Download our free investor guide.</p>
                   <button onClick={() => navigate(Page.LEARN)} className="text-xs font-bold uppercase tracking-wider border-b border-lavi-silver pb-0.5 text-lavi-silver">Learn More</button>
               </div>
           </div>

           {/* Product Grid Area */}
           <div className="flex-1">
               {/* Top Bar */}
               <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                   <span className="text-slate-500 text-sm mb-4 sm:mb-0">Showing <strong>{filteredProducts.length}</strong> results</span>
                   
                   <div className="flex items-center gap-3">
                       <span className="text-slate-500 text-sm">Sort by:</span>
                       <div className="relative group">
                           <select 
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 rounded-md py-1.5 px-3 text-sm text-slate-700 outline-none focus:border-lavi-dark cursor-pointer appearance-none pr-8"
                           >
                               <option value="Featured">Featured</option>
                               <option value="PriceLow">Price: Low to High</option>
                               <option value="PriceHigh">Price: High to Low</option>
                           </select>
                           <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                       </div>
                   </div>
               </div>

               {/* Grid */}
               {filteredProducts.length > 0 ? (
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                         <div 
                            key={product.id} 
                            onClick={() => { setSelectedProduct(product); window.scrollTo(0,0); }}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col hover:-translate-y-1"
                         >
                            <div className="h-56 overflow-hidden relative bg-slate-100">
                               <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                               
                               {/* Badges */}
                               <div className="absolute top-3 left-3 flex flex-col gap-2">
                                  {product.tier === 'Premium Collection' && (
                                     <span className="bg-lavi-dark text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-md">Premium</span>
                                  )}
                               </div>
                               
                               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                   <p className="text-white text-xs font-bold text-center">View Details</p>
                               </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                               <div className="mb-auto">
                                   <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{product.category} • {product.weight}</p>
                                   <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-lavi-primary transition-colors leading-snug">{product.name}</h3>
                                   <p className="text-slate-500 text-xs">{product.mint}</p>
                               </div>
                               
                               <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                  <div className="flex flex-col">
                                      <span className="text-[10px] text-slate-500 uppercase">Indicative</span>
                                      <span className="text-lavi-dark font-bold">{product.priceIndication}</span>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-lavi-dark group-hover:text-white transition-colors">
                                      <ArrowRight className="w-4 h-4" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
               ) : (
                   <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
                       <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                       <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
                       <p className="text-slate-500 mb-6">Try adjusting your filters to see more results.</p>
                       <Button variant="secondary" onClick={() => { setActiveTier('All'); setActiveMint('All'); }} className="text-slate-600 hover:text-lavi-dark">Clear Filters</Button>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};

const Learn = ({ navigate }: { navigate: (page: Page) => void }) => {
   const [activeCategory, setActiveCategory] = useState<ArticleCategory>('All');

   // Filter articles
   const filteredArticles = ARTICLES.filter(article => 
       activeCategory === 'All' ? true : article.category === activeCategory
   );

   const categories: ArticleCategory[] = ['All', 'Market Briefing', 'Expert Insights', 'Lavi Analysis', 'Silver 101'];

   return (
      <div className="pt-24 pb-24 container mx-auto px-6">
         <SectionHeading title="Knowledge Hub" subtitle="Navigate the complexities of the Israeli financial system and global precious metals markets." light={true} />
         
         {/* Category Navigation */}
         <div className="flex flex-wrap justify-center gap-4 mb-16">
             {categories.map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                        activeCategory === cat 
                        ? 'bg-lavi-dark text-white shadow-lg scale-105' 
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                 >
                    {cat}
                 </button>
             ))}
         </div>

         {/* Featured Content: Next Webinar (Always Visible unless filtering specifically for others) */}
         {(activeCategory === 'All' || activeCategory === 'Market Briefing') && (
            <div className="mb-20 animate-fade-in">
                <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-2xl"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="bg-lavi-dark border border-white/10 p-6 rounded-xl text-center min-w-[200px] shadow-lg">
                             <div className="text-lavi-silver mb-2">
                                <Calendar className="w-8 h-8 mx-auto" />
                             </div>
                             <p className="text-slate-300 text-xs uppercase tracking-widest mb-1">Next Session</p>
                             <p className="text-white font-bold text-2xl">Nov 15</p>
                             <p className="text-lavi-silver text-sm">19:00 IST</p>
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="inline-block px-3 py-1 rounded bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold uppercase tracking-wider mb-2">
                                Monthly Market Briefing
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-lavi-dark leading-tight">Silver's Next Move: Monthly Outlook</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                Join Jonathan Lavi for a live analysis of Fed interest rate implications, the Gold-to-Silver ratio, and specific opportunities in the Israeli local market.
                            </p>
                            <div className="pt-2">
                                <Button className="hover:text-white hover:bg-lavi-dark">Register for Webinar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )}

         {/* Content Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
               <div key={article.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full animate-slide-up hover:-translate-y-1">
                  <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                         <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            article.category === 'Expert Insights' ? 'bg-indigo-50 text-indigo-700' :
                            article.category === 'Silver 101' ? 'bg-emerald-50 text-emerald-700' :
                            'bg-slate-100 text-slate-700'
                         }`}>
                            {article.category}
                         </span>
                         {article.type === 'Video' ? <PlayCircle className="w-5 h-5 text-slate-400" /> : 
                          article.type === 'External' ? <Newspaper className="w-5 h-5 text-slate-400" /> :
                          <FileText className="w-5 h-5 text-slate-400" />}
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-lavi-dark mb-3 group-hover:text-lavi-primary transition-colors leading-snug">
                          {article.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                          {article.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                          <span className="text-xs text-slate-500 font-medium">
                              {article.date} • {article.readTime}
                          </span>
                          {article.type === 'External' && article.source && (
                              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{article.source}</span>
                          )}
                      </div>
                  </div>
                  <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
                      <span className="text-xs text-lavi-dark font-bold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                          {article.type === 'Video' ? 'Watch Now' : 'Read Article'} <ArrowRight className="w-3 h-3" />
                      </span>
                  </div>
               </div>
            ))}
         </div>

         {/* E-Books Section (Visible on 'All' or 'Silver 101') */}
         {(activeCategory === 'All' || activeCategory === 'Silver 101') && (
            <div className="mt-24 bg-lavi-dark border border-white/5 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lavi-silver/50 to-transparent"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <GraduationCap className="w-12 h-12 text-lavi-silver mx-auto mb-6" />
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">The Silver Investor's Handbook</h2>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                        Download our comprehensive guide to physical allocation, storage, and taxation in Israel.
                    </p>
                    <Button variant="primary" className="mx-auto">Download Free E-Book</Button>
                </div>
            </div>
         )}
      </div>
   );
};

const Contact = () => {
   return (
      <div className="pt-24 pb-24 container mx-auto px-6">
         <SectionHeading title="Start Your Journey" subtitle="Schedule a consultation with our wealth preservation experts." light={true} />
         <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
               <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-lavi-dark mb-6">Contact Information</h3>
                  <div className="space-y-6">
                     <div className="flex items-center gap-4 text-slate-600">
                        <Phone className="w-6 h-6 text-lavi-dark" />
                        <span>+972 (0) 3-555-0123</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-600">
                        <User className="w-6 h-6 text-lavi-dark" />
                        <span>info@lavisilver.com</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-600">
                        <Building className="w-6 h-6 text-lavi-dark" />
                        <span>Rothschild Blvd 22, Tel Aviv, Israel</span>
                     </div>
                  </div>
               </div>
               
               <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-bold text-lavi-dark mb-4">Office Hours</h3>
                   <div className="flex justify-between text-slate-600 border-b border-slate-100 py-2">
                      <span>Sunday - Thursday</span>
                      <span>09:00 - 18:00</span>
                   </div>
                   <div className="flex justify-between text-slate-600 py-2">
                      <span>Friday</span>
                      <span>09:00 - 13:00</span>
                   </div>
               </div>
            </div>

            <form className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Message</label>
                  <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors"></textarea>
               </div>
               <Button className="w-full hover:bg-lavi-dark hover:text-white">Send Message</Button>
            </form>
         </div>
      </div>
   );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Ref to hold the chat session
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = async () => {
     if (!chatSessionRef.current) {
        try {
           const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
           chatSessionRef.current = ai.chats.create({
             model: 'gemini-2.5-flash',
             config: {
               systemInstruction: "You are a helpful, professional AI assistant for Lavi Silver Group. Your goal is to assist users with questions about investing in silver, benefits for Olim (immigrants to Israel), and company services. Be concise, polite, and knowledgeable about precious metals.",
             }
           });
        } catch (error) {
           console.error("Failed to initialize chat", error);
        }
     }
  };

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen) {
        initChat();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
          await initChat();
      }
      
      if (chatSessionRef.current) {
          const result = await chatSessionRef.current.sendMessage({ message: userMsg });
          setMessages(prev => [...prev, { role: 'model', text: result.text || "I didn't catch that." }]);
      } else {
          throw new Error("Chat session not initialized");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-lavi-silver text-lavi-dark rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[350px] md:w-[400px] h-[500px] bg-lavi-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
           <div className="p-4 bg-lavi-primary/50 border-b border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-lavi-silver flex items-center justify-center">
                 <Bot className="w-5 h-5 text-lavi-dark" />
              </div>
              <div>
                 <h4 className="text-white font-bold">Lavi Assistant</h4>
                 <p className="text-[10px] text-lavi-silver uppercase tracking-wider">Online</p>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                 <div className="text-center text-slate-500 text-sm mt-10">
                    <p>Hello! How can I help you with silver investment today?</p>
                 </div>
              )}
              {messages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                       msg.role === 'user' 
                       ? 'bg-lavi-silver text-lavi-dark rounded-tr-none' 
                       : 'bg-white/10 text-slate-200 rounded-tl-none'
                    }`}>
                       {msg.text}
                    </div>
                 </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-xl rounded-tl-none flex gap-1">
                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
           </div>

           <div className="p-4 border-t border-white/10 bg-lavi-primary/30">
              <div className="flex gap-2">
                 <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about silver..."
                    className="flex-1 bg-lavi-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-lavi-silver outline-none"
                 />
                 <button onClick={handleSend} disabled={isLoading} className="p-2 bg-lavi-silver rounded-lg text-lavi-dark hover:bg-white transition-colors disabled:opacity-50">
                    <Send className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (p: Page) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { id: Page.HOME, label: 'Home' },
    { id: Page.PRODUCTS, label: 'Catalog' },
    { id: Page.ABOUT, label: 'About' },
    { id: Page.LEARN, label: 'Learn' },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-lavi-silver selection:text-lavi-dark ${page === Page.HOME ? 'bg-lavi-dark text-slate-200' : 'bg-slate-50 text-slate-700'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <Ticker />
        <div className={`w-full transition-all duration-300 border-b ${scrolled || page !== Page.HOME ? 'bg-lavi-dark/95 backdrop-blur-md border-white/10 py-2 shadow-lg' : 'bg-transparent border-transparent py-4'}`}>
           <div className="container mx-auto px-6 flex justify-between items-center">
             <div className="cursor-pointer" onClick={() => navigate(Page.HOME)}>
                <Logo />
             </div>

             {/* Desktop Nav */}
             <div className="hidden md:flex items-center gap-8">
               {navLinks.map(link => (
                 <button 
                   key={link.id}
                   onClick={() => navigate(link.id)}
                   className={`text-sm uppercase tracking-widest font-medium hover:text-lavi-silver transition-colors ${page === link.id ? 'text-lavi-silver' : 'text-slate-400'}`}
                 >
                   {link.label}
                 </button>
               ))}
               
               {/* Investor Desk Item */}
               <div className="flex items-center gap-2 text-white border-l border-white/10 pl-6 ml-2">
                   <Phone className="w-4 h-4 text-lavi-silver" />
                   <div className="flex flex-col">
                       <span className="text-[10px] text-slate-400 uppercase tracking-widest">Investor Desk</span>
                       <span className="text-sm font-bold leading-none">+972 (0) 3-555-0123</span>
                   </div>
               </div>

               <Button variant="primary" className="px-6 py-2 text-sm" onClick={() => navigate(Page.CONTACT)}>
                  Contact Us
               </Button>
             </div>

             {/* Mobile Menu Button */}
             <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
               <Menu className="w-8 h-8" />
             </button>
           </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-lavi-dark transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="p-6 flex justify-between items-center border-b border-white/10">
            <Logo />
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
               <X className="w-8 h-8" />
            </button>
         </div>
         <div className="p-8 flex flex-col gap-6">
            {navLinks.map(link => (
               <button 
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`text-2xl font-serif font-bold text-left ${page === link.id ? 'text-lavi-silver' : 'text-white'}`}
               >
                  {link.label}
               </button>
            ))}
            
            <div className="border-t border-white/10 pt-6 mt-4">
               <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-lavi-silver/10 rounded-full">
                       <Phone className="w-5 h-5 text-lavi-silver" />
                   </div>
                   <div>
                       <p className="text-xs text-slate-400 uppercase tracking-widest">Investor Desk</p>
                       <p className="text-lg font-bold text-white">+972 (0) 3-555-0123</p>
                   </div>
               </div>
               <Button className="w-full" onClick={() => navigate(Page.CONTACT)}>Contact Us</Button>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 min-h-screen">
        {page === Page.HOME && <Home navigate={navigate} />}
        {page === Page.ABOUT && <About navigate={navigate} />}
        {page === Page.PRODUCTS && <Products navigate={navigate} />}
        {page === Page.LEARN && <Learn navigate={navigate} />}
        {page === Page.CONTACT && <Contact />}
      </main>

      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10 text-slate-200">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                 <Logo />
                 <p className="mt-6 text-slate-500 text-sm leading-relaxed">
                    Premium silver brokerage for the modern investor. Secure, liquid, and compliant wealth preservation solutions for Olim and Israeli residents.
                 </p>
              </div>
              
              <div>
                 <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
                 <ul className="space-y-3 text-slate-400 text-sm">
                    {navLinks.map(link => (
                       <li key={link.id}><button onClick={() => navigate(link.id)} className="hover:text-lavi-silver transition-colors">{link.label}</button></li>
                    ))}
                    <li><button onClick={() => navigate(Page.CONTACT)} className="hover:text-lavi-silver transition-colors">Contact</button></li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Legal</h4>
                 <ul className="space-y-3 text-slate-400 text-sm">
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">AML Compliance</a></li>
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">Shipping & Delivery</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact</h4>
                 <p className="text-slate-400 text-sm mb-2">Rothschild Blvd 22, Tel Aviv</p>
                 <p className="text-slate-400 text-sm mb-2">+972 (0) 3-555-0123</p>
                 <p className="text-slate-400 text-sm">info@lavisilver.com</p>
                 <div className="flex gap-4 mt-6">
                    <Globe className="w-5 h-5 text-slate-600 hover:text-lavi-silver cursor-pointer transition-colors" />
                    <History className="w-5 h-5 text-slate-600 hover:text-lavi-silver cursor-pointer transition-colors" />
                 </div>
              </div>
           </div>
           <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-xs">© 2024 Lavi Silver Group. All rights reserved.</p>
              <p className="text-slate-600 text-xs flex items-center gap-1">
                 <Shield className="w-3 h-3" /> Secure SSL Encryption
              </p>
           </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;