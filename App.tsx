import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, TrendingUp, Shield, Truck, Phone,
  BarChart3, BookOpen, ArrowRight, CheckCircle,
  PlayCircle, FileText, Anchor, ChevronDown, Send, User, Bot,
  Quote, Target, Lock, Globe, Award, Users, ChevronLeft, Info,
  Scale, Zap, History, AlertTriangle, Coins, Building, Eye,
  PieChart as LucidePieChart, Filter, SlidersHorizontal, ArrowLeft, Check, Search,
  ArrowUpRight, Calendar, Video, Briefcase, Mail, Newspaper, Bookmark, GraduationCap, Package, Languages,
  Home as HomeIcon, Clock, DollarSign, Key, MapPin, CalendarCheck, HelpCircle, FileText as FileTextIcon
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { sanity, getImageUrl, getMetalPrices } from './sanityClient';
import { ProductGallery } from './ProductGallery';

// --- Types ---
type Lang = 'en' | 'he';

enum Page {
  HOME = 'home',
  WHO_WE_SERVE = 'who_we_serve',
  ABOUT = 'about',
  PRODUCTS = 'products',
  LEARN = 'learn',
  CONTACT = 'contact'
}

type ProductTier = 'Basic Rounds & Bars' | 'Standard Bullion' | 'Premium Collection';

interface Product {
  _id: string;
  name: string;
  nameHe: string;
  subtitle: string;
  subtitleHe: string;
  priceIndication: string;
  priceIndicationHe: string;
  priceOffset: number;
  weight: string;
  weightHe: string;
  purity: string;
  mint: string;
  mintHe: string;
  category: 'bar' | 'coin';
  tier: ProductTier;
  description: string;
  descriptionHe: string;
  image?: any;
  gallery?: any[];
  highlights: string[];
  highlightsHe: string[];
}

interface Article {
  _id: string;
  title: string;
  titleHe: string;
  excerpt: string;
  excerptHe: string;
  type: 'Video' | 'White Paper' | 'Article' | 'External';
  category: string;
  categoryHe: string;
  readTime: string;
  readTimeHe: string;
  date: string;
}

interface Testimonial {
  _id: string;
  name: string;
  nameHe: string;
  role: string;
  roleHe: string;
  quote: string;
  quoteHe: string;
  image: string;
}

// --- Static Data ---
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
  { name: 'Equities', value: 50, color: '#334155' },
  { name: 'Real Estate', value: 30, color: '#475569' },
  { name: 'Bonds', value: 10, color: '#64748B' },
  { name: 'Silver/Gold', value: 10, color: '#E2E8F0' },
];

// Placeholder images for products (since Sanity images need different handling)
const PRODUCT_IMAGES: Record<string, string> = {
  'Canadian Silver Maple Leaf': 'https://images.unsplash.com/photo-1624623348275-52646241b17d?q=80&w=1000&auto=format&fit=crop',
  'American Silver Eagle': 'https://images.unsplash.com/photo-1574607383077-47ddc2dc4324?q=80&w=1000&auto=format&fit=crop',
  'Britannia Silver Coin': 'https://images.unsplash.com/photo-1610375461246-83648bfb1e25?q=80&w=1000&auto=format&fit=crop',
  'PAMP Suisse Cast Bar': 'https://images.unsplash.com/photo-1521575256220-6385d8525e98?q=80&w=1000&auto=format&fit=crop',
  'Lavi Signature 100oz Bar': 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1000&auto=format&fit=crop',
  '10 oz Silver Bar (Generic)': 'https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=1000&auto=format&fit=crop',
};

// Local images
import judahImg from './judah_rosen.png';
import cofounderImg from './cofounder.png';
import bookImg from './silver_rising.png';
import heroBg from './hero_bg.png';

// --- UI Components ---
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
    <div className="flex flex-col justify-center">
      <span className="text-2xl font-serif font-bold tracking-wide text-white leading-none">Lavi</span>
      <span className="text-[0.6rem] tracking-[0.25em] text-lavi-silverDark font-medium uppercase mt-1">Silver Group</span>
    </div>
  </div>
);

const Ticker = ({ lang, content }: { lang: Lang; content: any }) => {
  const [silverPrice, setSilverPrice] = useState<number | null>(null);
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [silverChange, setSilverChange] = useState<number>(0);
  const [goldChange, setGoldChange] = useState<number>(0);

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getMetalPrices();
      if (prices) {
        setSilverPrice(prices.silver);
        setGoldPrice(prices.gold);
        setSilverChange(prices.silverChange);
        setGoldChange(prices.goldChange);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-lavi-dark border-b border-white/5 text-xs font-bold py-2 px-4 md:px-6 flex justify-between items-center relative z-50 text-white">
      <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="text-lavi-silver uppercase tracking-widest hidden sm:inline">
            {lang === 'en' ? 'Live Markets' : 'שווקים בזמן אמת'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-300">
            Ag: <span className="text-white font-mono">{silverPrice ? '$' + silverPrice.toFixed(2) : '...'}</span>
            <span className={silverChange >= 0 ? "ms-1.5 inline-flex items-center text-green-400" : "ms-1.5 inline-flex items-center text-red-400"}>
              <ArrowUpRight className={silverChange >= 0 ? "w-3 h-3 me-0.5" : "w-3 h-3 me-0.5 rotate-90"} />
              {Math.abs(silverChange).toFixed(2)}%
            </span>
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">
            Au: <span className="text-lavi-gold font-mono">{goldPrice ? '$' + goldPrice.toFixed(2) : '...'}</span>
            <span className={goldChange >= 0 ? "ms-1.5 inline-flex items-center text-green-400" : "ms-1.5 inline-flex items-center text-red-400"}>
              <ArrowUpRight className={goldChange >= 0 ? "w-3 h-3 me-0.5" : "w-3 h-3 me-0.5 rotate-90"} />
              {Math.abs(goldChange).toFixed(2)}%
            </span>
          </span>
        </div>
      </div>
      <div className="hidden md:block text-slate-500 text-[10px] uppercase tracking-wider">
        {lang === 'en' ? 'Live Spot Prices' : 'מחירי ספוט בזמן אמת'}
      </div>
    </div>
  );
};

const TestimonialsSection = ({ lang, testimonials }: { lang: Lang; testimonials: Testimonial[] }) => {
  return (
    <section className="container mx-auto px-6 py-24 bg-lavi-dark relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="relative">

        <SectionHeading
          title={lang === 'en' ? "Investor Stories" : "סיפורי משקיעים"}
          subtitle={lang === 'en' ? "Helping Olim and Tech Leaders navigate the Israeli financial landscape." : "עוזרים לעולים ומובילי הייטק לנווט בנוף הפיננסי הישראלי."}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-lavi-primary/20 p-8 rounded-xl border border-white/5 relative hover:bg-lavi-primary/40 transition-all duration-300 group">

            <div className="absolute -top-4 -left-2 rtl:left-auto rtl:-right-2 bg-lavi-dark p-2 rounded-full border border-white/10">
              <Quote className="w-6 h-6 text-lavi-silver" />
            </div>
            <p className="text-slate-300 mb-8 relative z-10 italic leading-relaxed pt-2">
              "{lang === 'en' ? t.quote : t.quoteHe}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-lavi-silver/30 group-hover:border-lavi-silver transition-colors" />
              <div>
                <h4 className="text-white font-bold font-serif">{lang === 'en' ? t.name : t.nameHe}</h4>
                <p className="text-xs text-lavi-silverDark uppercase tracking-wider">{lang === 'en' ? t.role : t.roleHe}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ComparisonTable = ({ data, lang }: { data: any; lang: Lang }) => (
  <div className="w-full overflow-hidden border border-slate-200 rounded-xl shadow-lg bg-white my-8">
    <div className="grid grid-cols-3 bg-lavi-primary text-white p-4 font-bold text-sm md:text-base border-b border-lavi-dark">
      <div className="col-span-1"></div>
      <div className="col-span-1 text-center flex items-center justify-center gap-2">
        <HomeIcon className="w-4 h-4 text-lavi-silver" />
        {lang === 'en' ? data.tableHeader1 : data.tableHeader1He}
      </div>
      <div className="col-span-1 text-center flex items-center justify-center gap-2 text-lavi-silver">
        <Coins className="w-4 h-4" />
        {lang === 'en' ? data.tableHeader2 : data.tableHeader2He}
      </div>
    </div>
    <div className="divide-y divide-slate-100">
      {data.tableRows?.map((row: any, idx: number) => (
        <div key={idx} className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
          <div className="col-span-1 font-bold text-lavi-dark text-xs md:text-sm flex items-center">
            {lang === 'en' ? row.label : row.labelHe}
          </div>
          <div className="col-span-1 text-center text-slate-600 text-xs md:text-sm flex items-center justify-center border-l border-r border-slate-100 px-2">
            {lang === 'en' ? row.re : row.reHe}
          </div>
          <div className="col-span-1 text-center text-lavi-dark font-medium text-xs md:text-sm flex items-center justify-center bg-blue-50/50">
            {lang === 'en' ? row.ag : row.agHe}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const NewsletterSection = ({ lang, content }: { lang: Lang; content: any }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section id="newsletter-section" className="bg-lavi-silver py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-lavi-dark" />
            <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">
              {lang === 'en' ? content?.badge || 'Newsletter' : content?.badgeHe || 'ניוזלטר'}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-lavi-dark mb-4">
            {lang === 'en' ? content?.title || 'Market Insights Delivered' : content?.titleHe || 'תובנות שוק ישירות אליך'}
          </h2>

          <p className="text-lg text-lavi-dark/80 mb-8 font-medium leading-relaxed max-w-2xl mx-auto">
            {lang === 'en'
              ? content?.desc || 'Join our exclusive community of investors. Get weekly analysis, precious metals updates, and strategic reports.'
              : content?.descHe || 'הצטרף לקהילה האקסקלוסיבית של המשקיעים שלנו. קבל ניתוח שבועי, עדכונים על מתכות יקרות ודוחות אסטרטגיים.'}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'en' ? content?.placeholder || 'Enter your email address' : content?.placeholderHe || 'הכנס את כתובת האימייל שלך'}
                className="w-full bg-white border border-lavi-dark/10 rounded-full py-3 px-6 text-lavi-dark placeholder:text-slate-400 focus:border-lavi-dark focus:ring-1 focus:ring-lavi-dark outline-none transition-all pr-36 rtl:pr-6 rtl:pl-36 shadow-sm"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute top-1 right-1 rtl:right-auto rtl:left-1 bottom-1 bg-lavi-dark text-white font-bold rounded-full px-6 hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <>
                    {lang === 'en' ? content?.btn || 'Subscribe' : content?.btnHe || 'הרשמה'}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </div>
            {status === 'success' && (
              <p className="text-lavi-dark font-bold text-sm mt-4 animate-fade-in">
                {lang === 'en' ? content?.success || 'Thank you for subscribing!' : content?.successHe || 'תודה שנרשמת!'}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>

  );
};

const FoundersSection = ({ lang, content }: { lang: Lang; content: any }) => {
  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="container mx-auto px-6">
        <SectionHeading
          title={lang === 'en' ? content?.foundersTitle || 'Meet the Founders' : content?.foundersTitleHe || 'הכירו את המייסדים'}
          subtitle={lang === 'en' ? content?.foundersDesc || '30 years of combined experience in Jerusalem and Tel Aviv.' : content?.foundersDescHe || '30 שנות ניסיון משולב בירושלים ותל אביב.'}
          light={true}
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Founder 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-lavi-silver shadow-lg">
              <img
                src={getImageUrl(content?.founder1Image) || judahImg}
                alt={lang === 'en' ? content?.founder1Name || 'Judah Rosen' : content?.founder1NameHe || 'יהודה רוזן'}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-lavi-dark mb-2">
              {lang === 'en' ? content?.founder1Name || 'Judah Rosen' : content?.founder1NameHe || 'יהודה רוזן'}
            </h3>
            <p className="text-lavi-primary font-medium uppercase tracking-wider text-sm mb-4">
              {lang === 'en' ? content?.founder1Role || 'Co-Founder & CEO' : content?.founder1RoleHe || 'מייסד שותף ומנכ"ל'}
            </p>
            <p className="text-slate-600 leading-relaxed max-w-md">
              {lang === 'en'
                ? content?.founder1Bio || 'Personally investing for 8 years. Author of "Silver Rising". Deeply connected to the local market.'
                : content?.founder1BioHe || 'משקיע באופן אישי מזה 8 שנים. מחבר הספר "Silver Rising". מחובר עמוקות לשוק המקומי.'}
            </p>
          </div>

          {/* Founder 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-lavi-silver shadow-lg">
              <img
                src={getImageUrl(content?.founder2Image) || cofounderImg}
                alt={lang === 'en' ? content?.founder2Name || 'Co-Founder' : content?.founder2NameHe || 'מייסד שותף'}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-lavi-dark mb-2">
              {lang === 'en' ? content?.founder2Name || 'David Cohen' : content?.founder2NameHe || 'דוד כהן'}
            </h3>
            <p className="text-lavi-primary font-medium uppercase tracking-wider text-sm mb-4">
              {lang === 'en' ? content?.founder2Role || 'Co-Founder & CTO' : content?.founder2RoleHe || 'מייסד שותף וסמנכ"ל טכנולוגיות'}
            </p>
            <p className="text-slate-600 leading-relaxed max-w-md">
              {lang === 'en'
                ? content?.founder2Bio || 'Expert in financial technology and secure logistics. Ensuring your assets are safe and accessible.'
                : content?.founder2BioHe || 'מומחה בטכנולוגיה פיננסית ולוגיסטיקה מאובטחת. מבטיח שהנכסים שלך בטוחים ונגישים.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const BookSection = ({ lang, content }: { lang: Lang; content: any }) => {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="w-full md:w-1/3 flex justify-center relative">
            <div className="absolute inset-0 bg-lavi-silver/20 blur-3xl rounded-full transform scale-150"></div>
            <img
              src={getImageUrl(content?.bookImage) || bookImg}
              alt="Silver Rising Book"
              className="relative z-10 rounded-lg shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500 w-48 md:w-64"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-start">
            <div className="inline-block bg-lavi-dark text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              {lang === 'en' ? 'Best Seller' : 'רב מכר'}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavi-dark mb-6">
              {lang === 'en' ? content?.bookTitle || 'Silver Rising' : content?.bookTitleHe || 'עליית הכסף'}
            </h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed font-light">
              {lang === 'en'
                ? content?.bookDesc || 'The definitive guide to precious metals investing in Israel. Learn how to protect your wealth in uncertain times.'
                : content?.bookDescHe || 'המדריך המקיף להשקעה במתכות יקרות בישראל. למד כיצד להגן על העושר שלך בתקופות של אי ודאות.'}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button onClick={() => window.open(content?.bookLink || 'https://amazon.com', '_blank')}>
                {lang === 'en' ? content?.bookCta || 'Get it on Amazon' : content?.bookCtaHe || 'השג באמזון'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ParlourSection = ({ lang, content, navigate }: { lang: Lang; content: any; navigate: (page: Page) => void }) => {
  return (
    <section className="py-24 bg-lavi-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="w-16 h-16 bg-lavi-silver rounded-full flex items-center justify-center mx-auto mb-8 text-lavi-dark">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          {lang === 'en' ? content?.parlourTitle || 'Join Our Parlour Meetings' : content?.parlourTitleHe || 'הצטרף לחוגי הבית שלנו'}
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {lang === 'en'
            ? content?.parlourDesc || 'Intimate gatherings in Jerusalem and Tel Aviv. Meet the founders, ask questions, and learn about wealth preservation in a relaxed atmosphere.'
            : content?.parlourDescHe || 'מפגשים אינטימיים בירושלים ותל אביב. פגוש את המייסדים, שאל שאלות ולמד על שימור עושר באווירה רגועה.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <div className="flex items-center gap-2 text-lavi-silver justify-center">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">Jerusalem</span>
          </div>
          <div className="hidden sm:block text-slate-600">|</div>
          <div className="flex items-center gap-2 text-lavi-silver justify-center">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">Tel Aviv</span>
          </div>
        </div>
        <Button onClick={() => navigate(Page.CONTACT)} className="bg-white text-lavi-dark hover:bg-lavi-silver border-0">
          {lang === 'en' ? content?.parlourCta || 'Reserve Your Spot' : content?.parlourCtaHe || 'שריין את מקומך'}
        </Button>
      </div>
    </section>
  );
};

// --- Page Components ---

const Home = ({
  navigate,
  lang,
  content,
  products,
  articles,
  testimonials
}: {
  navigate: (page: Page) => void;
  lang: Lang;
  content: any;
  products: Product[];
  articles: Article[];
  testimonials: Testimonial[];
}) => {
  const displayProducts = products.slice(0, 3);
  const displayArticles = articles.slice(0, 3);

  return (
    <div className="space-y-0 pb-24">


      {/* Minimalist Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-lavi-dark/20 z-10"></div>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}></div>
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <div className="animate-slide-up bg-lavi-dark/30 backdrop-blur-sm p-8 rounded-2xl border border-white/5 inline-block max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-xl">
              {lang === 'en' ? content?.heroH1 : content?.heroH1He}
            </h1>
            <p className="text-xl text-slate-200 mb-8 font-light leading-relaxed drop-shadow-md">
              {lang === 'en' ? content?.heroSub : content?.heroSubHe}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate(Page.ABOUT)} className="text-lg px-8">
                {lang === 'en' ? 'Our Story' : 'הסיפור שלנו'}
              </Button>
              <Button variant="outline" onClick={() => navigate(Page.LEARN)} className="text-white border-white hover:bg-white hover:text-lavi-dark text-lg px-8">
                {lang === 'en' ? 'Start Learning' : 'התחל ללמוד'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* YTD Analysis - Restored */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-1 bg-lavi-dark rounded-full"></div>
                  <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">
                    {lang === 'en' ? content?.ytdBadge : content?.ytdBadgeHe}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-lavi-dark mb-6">
                  {lang === 'en' ? content?.ytdTitle : content?.ytdTitleHe}
                </h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  {lang === 'en' ? content?.ytdDesc : content?.ytdDescHe}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                    <p className="text-slate-500 text-xs uppercase mb-1">
                      {lang === 'en' ? content?.ytdSilverLabel : content?.ytdSilverLabelHe}
                    </p>
                    <p className="text-2xl font-bold text-lavi-dark">{content?.ytdSilverValue || '+60%'}</p>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                    <p className="text-slate-500 text-xs uppercase mb-1">
                      {lang === 'en' ? content?.ytdSp500Label : content?.ytdSp500LabelHe}
                    </p>
                    <p className="text-2xl font-bold text-slate-400">{content?.ytdSp500Value || '+12%'}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => navigate(Page.LEARN)} className="hover:text-lavi-dark hover:bg-slate-100">
                  {lang === 'en' ? content?.ytdReadReport : content?.ytdReadReportHe}
                </Button>
              </div>
              <div className="h-[400px] w-full bg-white p-6 rounded-xl border border-slate-200 shadow-xl" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_PERFORMANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748B" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0B1120', borderRadius: '8px' }}
                      itemStyle={{ color: '#0B1120', paddingBottom: '4px' }}
                      labelStyle={{ color: '#64748B', marginBottom: '8px' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="silver" name="Silver" stroke="#0B1120" strokeWidth={3} dot={{ r: 4, fill: "#0B1120" }} activeDot={{ r: 6, fill: "#0B1120" }} />
                    <Line type="monotone" dataKey="gold" name="Gold" stroke="#F59E0B" strokeWidth={2} dot={false} strokeOpacity={0.7} />
                    <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} strokeOpacity={0.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. About / Founders (Trust) - Priority 1 */}
      <FoundersSection lang={lang} content={content} />

      {/* 2. Educational Highlights (Education) - Priority 2 */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-lavi-dark text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              {lang === 'en' ? 'Education First' : 'חינוך קודם לכל'}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-lavi-dark mb-6">
              {lang === 'en' ? content?.insightsTitle || 'Knowledge is Wealth' : content?.insightsTitleHe || 'ידע הוא כוח'}
            </h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              {lang === 'en'
                ? 'We believe an educated investor is a successful investor. Explore our library of articles, videos, and guides designed to help you understand the market.'
                : 'אנו מאמינים שמשקיע משכיל הוא משקיע מצליח. חקור את ספריית המאמרים, הסרטונים והמדריכים שלנו שנועדו לעזור לך להבין את השוק.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <div key={article._id} onClick={() => navigate(Page.LEARN)} className="bg-white border border-slate-200 p-8 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-lavi-primary text-xs uppercase tracking-widest font-bold">
                  {article.type === 'Video' ? <PlayCircle className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  {lang === 'en' ? article.readTime : article.readTimeHe}
                </div>
                <h3 className="text-xl font-serif font-bold text-lavi-dark mb-3 group-hover:text-lavi-primary transition-colors">
                  {lang === 'en' ? article.title : article.titleHe}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                  {lang === 'en' ? article.excerpt : article.excerptHe}
                </p>
                <div className="text-lavi-dark font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                  {lang === 'en' ? 'Read More' : 'קרא עוד'} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" onClick={() => navigate(Page.LEARN)} className="border-lavi-dark text-lavi-dark hover:bg-lavi-dark hover:text-white">
              {lang === 'en' ? 'Visit Knowledge Hub' : 'בקר במרכז הידע'}
            </Button>
          </div>
        </div>
      </section>

      {/* Book Information (Restored) */}
      <BookSection lang={lang} content={content} />

      {/* 3. Consolidated Services (Subtle) */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={lang === 'en' ? 'Our Services' : 'השירותים שלנו'}
            subtitle={lang === 'en' ? 'Everything else we offer to support your journey.' : 'כל מה שאנו מציעים כדי לתמוך במסע שלך.'}
            light={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Catalog Link */}
            <div onClick={() => navigate(Page.PRODUCTS)} className="p-8 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-lavi-silver/50 transition-all cursor-pointer group text-center">
              <div className="w-12 h-12 bg-lavi-dark text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-lavi-dark mb-2">{lang === 'en' ? 'Product Catalog' : 'קטלוג מוצרים'}</h3>
              <p className="text-sm text-slate-500">{lang === 'en' ? 'Browse our silver & gold' : 'עיין במוצרי הכסף והזהב שלנו'}</p>
            </div>

            {/* Parlour Meetings Link */}
            <div onClick={() => navigate(Page.CONTACT)} className="p-8 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-lavi-silver/50 transition-all cursor-pointer group text-center">
              <div className="w-12 h-12 bg-lavi-dark text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-lavi-dark mb-2">{lang === 'en' ? 'Parlour Meetings' : 'חוגי בית'}</h3>
              <p className="text-sm text-slate-500">{lang === 'en' ? 'Meet us in Jerusalem/TLV' : 'פגוש אותנו בירושלים/ת"א'}</p>
            </div>

            {/* Newsletter Link */}
            <div onClick={() => document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' })} className="p-8 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-lavi-silver/50 transition-all cursor-pointer group text-center">
              <div className="w-12 h-12 bg-lavi-dark text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-lavi-dark mb-2">{lang === 'en' ? 'Weekly Insights' : 'תובנות שבועיות'}</h3>
              <p className="text-sm text-slate-500">{lang === 'en' ? 'Subscribe to newsletter' : 'הירשם לניוזלטר'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Keep this as social proof) */}
      <TestimonialsSection lang={lang} testimonials={testimonials} />



      {/* CTA */}

    </div>
  );
};

const WhoWeServe = ({ navigate, lang, content }: { navigate: (page: Page) => void; lang: Lang; content: any }) => {
  if (!content) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="pt-0 bg-slate-50">


      <div className="bg-lavi-dark pt-24 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {lang === 'en' ? content.title : content.titleHe}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            {lang === 'en' ? content.sub : content.subHe}
          </p>
        </div>
      </div>

      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-lavi-dark mb-6 leading-tight">
              {lang === 'en' ? content.aliyahTitle : content.aliyahTitleHe}<br />
              <span className="text-silver-gradient bg-clip-text text-transparent bg-gradient-to-r from-lavi-dark to-slate-500">
                {lang === 'en' ? content.aliyahGradient : content.aliyahGradientHe}
              </span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              {(lang === 'en' ? content.aliyahIntro : content.aliyahIntroHe)?.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10">
              <Button onClick={() => navigate(Page.CONTACT)} className="bg-lavi-dark text-white hover:bg-lavi-primary">
                {lang === 'en' ? content.aliyahCta : content.aliyahCtaHe}
              </Button>
            </div>
          </div>
          <div className="relative">
            <ComparisonTable data={content} lang={lang} />
          </div>
        </div>
      </section>

      <section className="bg-lavi-dark py-24 relative overflow-hidden border-t border-white/5 text-slate-300">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading
            title={lang === 'en' ? content.benefitsTitle : content.benefitsTitleHe}
            subtitle={lang === 'en' ? content.benefitsSub : content.benefitsSubHe}
            light={false}
          />

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <Globe className="w-6 h-6 text-lavi-silver" />
                <h3 className="text-2xl font-serif font-bold text-white">
                  {lang === 'en' ? content.olimTitle : content.olimTitleHe}
                </h3>
              </div>
              <div className="space-y-6 text-lg font-light leading-relaxed">
                {(lang === 'en' ? content.olimContent : content.olimContentHe)?.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <TrendingUp className="w-6 h-6 text-lavi-silver" />
                <h3 className="text-2xl font-serif font-bold text-white">
                  {lang === 'en' ? content.techTitle : content.techTitleHe}
                </h3>
              </div>
              <div className="space-y-6 text-lg font-light leading-relaxed">
                {(lang === 'en' ? content.techContent : content.techContentHe)?.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const About = ({ navigate, lang, content }: { navigate: (page: Page) => void; lang: Lang; content: any }) => {
  if (!content) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="pt-0 bg-slate-50">


      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop"
              alt="Advisory Meeting"
              className="rounded-xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-lavi-dark rounded-full"></div>
              <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">
                {lang === 'en' ? content.badge : content.badgeHe}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-lavi-dark mb-6">
              {lang === 'en' ? content.title : content.titleHe}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
              {lang === 'en' ? content.sub : content.subHe}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              {lang === 'en' ? content.desc : content.descHe}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {(lang === 'en' ? content.points : content.pointsHe)?.map((point: string, idx: number) => {
                const icons = [Award, Users, Shield, Globe];
                const Icon = icons[idx] || Shield;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-lavi-dark" />
                    <span className="font-bold text-slate-800">{point}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={lang === 'en' ? content.whyTitle : content.whyTitleHe}
            subtitle={lang === 'en' ? content.whySub : content.whySubHe}
            light={true}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {content.features?.map((feature: any, idx: number) => {
              const icons = [Phone, Scale, Package];
              const Icon = icons[idx] || Phone;
              return (
                <div key={idx} className="p-8 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-lavi-dark text-white rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-lavi-dark mb-4">
                    {lang === 'en' ? feature.title : feature.titleHe}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'en' ? feature.desc : feature.descHe}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-lavi-dark py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">
            {lang === 'en' ? content.ctaTitle : content.ctaTitleHe}
          </h2>
          <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
            {lang === 'en' ? content.ctaDesc : content.ctaDescHe}
          </p>
          <Button onClick={() => navigate(Page.CONTACT)}>
            {lang === 'en' ? content.ctaBtn : content.ctaBtnHe}
          </Button>
        </div>
      </section>
    </div>
  );
};

const Products = ({ navigate, lang, products, content }: { navigate: (page: Page) => void; lang: Lang; products: Product[]; content: any }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTier, setActiveTier] = useState<ProductTier | 'All'>('All');
  const [activeMint, setActiveMint] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Featured' | 'PriceLow' | 'PriceHigh'>('Featured');

  const mints = ['All', ...Array.from(new Set(products.map(p => p.mint)))];

  const filteredProducts = products.filter(p => {
    const matchTier = activeTier === 'All' || p.tier === activeTier;
    const matchMint = activeMint === 'All' || p.mint === activeMint;
    return matchTier && matchMint;
  }).sort((a, b) => {
    if (sortBy === 'PriceLow') return a.priceOffset - b.priceOffset;
    if (sortBy === 'PriceHigh') return b.priceOffset - a.priceOffset;
    return 0;
  });

  if (selectedProduct) {
    return (
      <div className="pt-24 pb-24 container mx-auto px-6 animate-fade-in">


        <button
          onClick={() => setSelectedProduct(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-lavi-dark transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {lang === 'en' ? 'Back to Catalog' : 'חזרה לקטלוג'}
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <ProductGallery
              mainImage={selectedProduct.image}
              gallery={selectedProduct.gallery}
              productName={lang === 'en' ? selectedProduct.name : selectedProduct.nameHe}
              fallbackImage={PRODUCT_IMAGES[selectedProduct.name] || 'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000'}
            />
          </div>

          <div>
            <span className="text-lavi-dark text-xs font-bold uppercase tracking-widest bg-slate-200 px-2 py-1 rounded">
              {selectedProduct.tier}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-lavi-dark mb-2 mt-4">
              {lang === 'en' ? selectedProduct.name : selectedProduct.nameHe}
            </h1>
            <p className="text-xl text-slate-600 mb-6 font-light">
              {lang === 'en' ? selectedProduct.subtitle : selectedProduct.subtitleHe}
            </p>

            <div className="flex items-baseline gap-4 mb-8 border-b border-slate-200 pb-8">
              <span className="text-3xl font-bold text-lavi-dark">
                {lang === 'en' ? selectedProduct.priceIndication : selectedProduct.priceIndicationHe}
              </span>
              <span className="text-slate-500 text-sm">*{lang === 'en' ? 'Indicative' : 'אינדיקטיבי'}</span>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {lang === 'en' ? selectedProduct.description : selectedProduct.descriptionHe}
                </p>
                <Button onClick={() => navigate(Page.CONTACT)}>
                  {lang === 'en' ? 'Enquire Now' : 'שאל עכשיו'}
                </Button>
              </div>

              <div>
                <h3 className="text-lavi-dark font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" /> {lang === 'en' ? 'Product Highlights' : 'דגשים למוצר'}
                </h3>
                <ul className="space-y-2">
                  {(lang === 'en' ? selectedProduct.highlights : selectedProduct.highlightsHe)?.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-lavi-dark flex-shrink-0"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 container mx-auto px-6 min-h-screen">

      {/* Trust Banner (APMEX Style) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-slate-200 pb-8">
        {[
          { icon: Truck, title: 'Free Shipping', sub: 'On orders over $500' },
          { icon: Shield, title: 'Secure Storage', sub: 'In Jerusalem & TLV' },
          { icon: Lock, title: 'Guaranteed', sub: 'Authenticity verified' },
          { icon: Phone, title: 'Expert Support', sub: 'Talk to real advisors' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
            <div className="bg-lavi-silver/20 p-2 rounded-full text-lavi-dark">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="text-sm">
              <div className="font-bold text-lavi-dark">{item.title}</div>
              <div className="text-slate-500 text-xs hidden sm:block">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading
        title={lang === 'en' ? content?.heroTitle || 'Buy Silver & Gold' : content?.heroTitleHe || 'קנה כסף וזהב'}
        subtitle={lang === 'en' ? content?.heroDesc : content?.heroDescHe}
        light={true}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-lavi-dark font-bold">
              <Filter className="w-4 h-4" /> {lang === 'en' ? 'Filters' : 'סינון'}
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                {lang === 'en' ? 'Collection' : 'קולקציה'}
              </h4>
              <div className="space-y-2">
                {['All', 'Basic Rounds & Bars', 'Standard Bullion', 'Premium Collection'].map(tier => (
                  <label key={tier} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${activeTier === tier ? 'bg-lavi-dark border-lavi-dark' : 'border-slate-300'}`}>
                      {activeTier === tier && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${activeTier === tier ? 'text-lavi-dark font-medium' : 'text-slate-500'}`}>
                      {tier}
                    </span>
                    <input type="radio" name="tier" className="hidden" checked={activeTier === tier} onChange={() => setActiveTier(tier as any)} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                {lang === 'en' ? 'Mint' : 'מטבעה'}
              </h4>
              <div className="space-y-2">
                {mints.map(mint => (
                  <label key={mint} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${activeMint === mint ? 'bg-lavi-dark border-lavi-dark' : 'border-slate-300'}`}>
                      {activeMint === mint && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${activeMint === mint ? 'text-lavi-dark font-medium' : 'text-slate-500'}`}>
                      {mint}
                    </span>
                    <input type="radio" name="mint" className="hidden" checked={activeMint === mint} onChange={() => setActiveMint(mint)} />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-slate-100 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-600 text-sm font-medium px-2">
              <strong>{filteredProducts.length}</strong> {lang === 'en' ? 'Items Found' : 'מוצרים נמצאו'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-md py-1.5 px-3 text-sm text-slate-700 outline-none hover:border-lavi-dark transition-colors cursor-pointer"
            >
              <option value="Featured">{lang === 'en' ? 'Featured' : 'מומלץ'}</option>
              <option value="PriceLow">{lang === 'en' ? 'Price: Low to High' : 'מחיר: מהנמוך לגבוה'}</option>
              <option value="PriceHigh">{lang === 'en' ? 'Price: High to Low' : 'מחיר: מהגבוה לנמוך'}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <div
                key={product._id}
                onClick={() => { setSelectedProduct(product); window.scrollTo(0, 0); }}
                className="bg-white border border-slate-200 hover:border-lavi-primary/50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
              >
                {product.tier === 'Premium Collection' && (
                  <span className="absolute top-2 left-2 z-10 bg-lavi-dark text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">PREMIUM</span>
                )}

                <div className="h-48 md:h-56 p-4 bg-white flex items-center justify-center relative overflow-hidden">
                  <img
                    src={getImageUrl(product.image) || PRODUCT_IMAGES[product.name] || 'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000'}
                    alt={lang === 'en' ? product.name : product.nameHe}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow border-t border-slate-100">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight mb-2 group-hover:text-lavi-primary transition-colors line-clamp-2 min-h-[2.5em]">
                    {lang === 'en' ? product.name : product.nameHe}
                  </h3>

                  <div className="mt-auto pt-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">As Low As</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg md:text-xl font-bold text-lavi-dark">
                        {lang === 'en' ? product.priceIndication : product.priceIndicationHe}
                      </span>
                    </div>

                    <button className="w-full mt-3 py-2 bg-lavi-silver/20 text-lavi-dark font-bold text-xs rounded hover:bg-lavi-dark hover:text-white transition-colors uppercase tracking-wide">
                      {lang === 'en' ? 'View Details' : 'פרטים נוספים'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Learn = ({ navigate, lang, articles, learnPage, webinars }: { navigate: (page: Page) => void; lang: Lang; articles: Article[]; learnPage: any; webinars: any[] }) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'webinars' | 'youtube'>('resources');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = lang === 'en'
    ? ['All', 'Market Briefing', 'Expert Insights', 'Lavi Analysis', 'Silver 101']
    : ['הכל', 'סקירת שוק', 'תובנות מומחים', 'ניתוח לביא', 'כסף 101'];

  const filteredArticles = articles.filter(article =>
    activeCategory === 'All' || activeCategory === 'הכל' ? true :
      (lang === 'en' ? article.category === activeCategory : article.categoryHe === activeCategory)
  );

  const upcomingWebinars = webinars.filter(w => w.isUpcoming);
  const pastWebinars = webinars.filter(w => !w.isUpcoming);
  const nextWebinar = upcomingWebinars[0];

  return (
    <div className="pt-0 pb-24 bg-slate-50">
      {/* Hero */}
      <div className="bg-lavi-dark pt-24 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {lang === 'en' ? learnPage?.heroTitle || 'Knowledge Hub' : learnPage?.heroTitleHe || 'מרכז ידע'}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
            {lang === 'en' ? learnPage?.heroSubtitle : learnPage?.heroSubtitleHe}
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-20 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-8">
            {[
              { id: 'resources', label: lang === 'en' ? 'All Resources' : 'כל המשאבים', icon: BookOpen },
              { id: 'webinars', label: lang === 'en' ? 'Webinars' : 'וובינרים', icon: Calendar },
              { id: 'youtube', label: lang === 'en' ? 'YouTube Channel' : 'ערוץ יוטיוב', icon: Video }, // Using Video icon as Youtube might not be imported or standard
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors font-medium ${activeTab === tab.id
                  ? 'border-lavi-dark text-lavi-dark'
                  : 'border-transparent text-slate-500 hover:text-lavi-dark'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                    ? 'bg-lavi-dark text-white shadow-lg'
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <div key={article._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {lang === 'en' ? article.category : article.categoryHe}
                      </span>
                      {article.type === 'Video' ? <PlayCircle className="w-5 h-5 text-slate-400" /> : <FileText className="w-5 h-5 text-slate-400" />}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-lavi-dark mb-3 group-hover:text-lavi-primary transition-colors">
                      {lang === 'en' ? article.title : article.titleHe}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      {lang === 'en' ? article.excerpt : article.excerptHe}
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs text-slate-500">
                        {article.date} • {lang === 'en' ? article.readTime : article.readTimeHe}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEBINARS TAB */}
        {activeTab === 'webinars' && (
          <div className="animate-fade-in max-w-5xl mx-auto">
            {nextWebinar ? (
              <div className="bg-gradient-to-br from-lavi-dark to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-lavi-silver/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-lavi-silver text-sm font-bold uppercase tracking-wider">
                      {lang === 'en' ? 'Next Live Session' : 'המפגש החי הבא'}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                    {lang === 'en' ? nextWebinar.title : nextWebinar.titleHe}
                  </h2>
                  <p className="text-slate-300 text-lg mb-8 max-w-2xl leading-relaxed">
                    {lang === 'en' ? nextWebinar.description : nextWebinar.descriptionHe}
                  </p>
                  <div className="flex flex-wrap gap-6 mb-8 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-lavi-silver" />
                      {new Date(nextWebinar.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-lavi-silver" />
                      {new Date(nextWebinar.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <Button onClick={() => window.open(nextWebinar.registrationLink, '_blank')}>
                    {lang === 'en' ? 'Register Now' : 'הירשם עכשיו'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 mb-12">
                <p className="text-slate-500">{lang === 'en' ? 'No upcoming webinars scheduled.' : 'אין וובינרים מתוכננים בקרוב.'}</p>
              </div>
            )}

            {pastWebinars.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-lavi-dark mb-8">
                  {lang === 'en' ? 'Past Webinars' : 'וובינרים קודמים'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {pastWebinars.map(w => (
                    <div key={w._id} className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lavi-dark mb-1">{lang === 'en' ? w.title : w.titleHe}</h4>
                        <p className="text-sm text-slate-500 mb-2">{new Date(w.date).toLocaleDateString()}</p>
                        <button className="text-lavi-primary text-sm font-bold hover:underline">
                          {lang === 'en' ? 'Watch Recording' : 'צפה בהקלטה'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* YOUTUBE TAB */}
        {activeTab === 'youtube' && (
          <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg mb-12">
              <div className="bg-red-600 p-8 md:p-12 text-center text-white">
                <Video className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Lavi Silver YouTube Channel</h2>
                <p className="text-red-100 max-w-2xl mx-auto mb-8">
                  {lang === 'en'
                    ? 'Subscribe for weekly market updates, expert interviews, and educational content about the precious metals market.'
                    : 'הירשם לעדכוני שוק שבועיים, ראיונות מומחים ותוכן חינוכי על שוק המתכות היקרות.'}
                </p>
                <div className="flex justify-center gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-bold">{learnPage?.youtubeSubscribers || '10K+'}</div>
                    <div className="text-red-200 text-sm">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{learnPage?.youtubeVideos || '150+'}</div>
                    <div className="text-red-200 text-sm">Videos</div>
                  </div>
                </div>
                <a
                  href={learnPage?.youtubeChannelUrl || 'https://youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors"
                >
                  {lang === 'en' ? 'Subscribe Now' : 'הירשם עכשיו'}
                </a>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-lavi-dark mb-8">
              {lang === 'en' ? 'Latest Videos' : 'סרטונים אחרונים'}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.filter(a => a.type === 'Video').map(video => (
                <div key={video._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-slate-200 relative">
                    {/* Placeholder for video thumbnail if not available */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="w-12 h-12 text-slate-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lavi-dark mb-2 line-clamp-2">
                      {lang === 'en' ? video.title : video.titleHe}
                    </h4>
                    <p className="text-xs text-slate-500">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Contact = ({ lang, content }: { lang: Lang; content: any }) => {
  return (
    <div className="pt-24 pb-24 container mx-auto px-6">
      <SectionHeading
        title={lang === 'en' ? 'Start Your Journey' : 'התחל את המסע שלך'}
        subtitle={lang === 'en' ? 'Schedule a consultation with our wealth preservation experts.' : 'קבע פגישת ייעוץ עם מומחי שימור העושר שלנו.'}
        light={true}
      />
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-lavi-dark mb-6">
              {lang === 'en' ? 'Contact Information' : 'פרטי קשר'}
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-600">
                <Phone className="w-6 h-6 text-lavi-dark" />
                <span dir="ltr">{content?.phone || '+972 (0) 3-555-0123'}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <Mail className="w-6 h-6 text-lavi-dark" />
                <span>{content?.email || 'info@lavisilver.com'}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <Building className="w-6 h-6 text-lavi-dark" />
                <span>{lang === 'en' ? content?.address : content?.addressHe}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-lavi-dark mb-4">
              {lang === 'en' ? 'Office Hours' : 'שעות פעילות'}
            </h3>
            <div className="flex justify-between text-slate-600 border-b border-slate-100 py-2">
              <span>{lang === 'en' ? 'Sunday - Thursday' : 'ראשון - חמישי'}</span>
              <span>09:00 - 18:00</span>
            </div>
            <div className="flex justify-between text-slate-600 py-2">
              <span>{lang === 'en' ? 'Friday' : 'שישי'}</span>
              <span>09:00 - 13:00</span>
            </div>
          </div>
        </div>

        <form className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'en' ? 'First Name' : 'שם פרטי'}
              </label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'en' ? 'Last Name' : 'שם משפחה'}
              </label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'en' ? 'Email Address' : 'כתובת אימייל'}
            </label>
            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'en' ? 'Message' : 'הודעה'}
            </label>
            <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none"></textarea>
          </div>
          <Button className="w-full">{lang === 'en' ? 'Send Message' : 'שלח הודעה'}</Button>
        </form>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [lang, setLang] = useState<Lang>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sanity Data
  const [siteContent, setSiteContent] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [whoWeServeContent, setWhoWeServeContent] = useState<any>(null);
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [buySilverContent, setBuySilverContent] = useState<any>(null);
  const [learnPage, setLearnPage] = useState<any>(null);
  const [webinars, setWebinars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        const [site, prods, arts, tests, wws, about, buy, learn, webs] = await Promise.all([
          sanity.getSiteContent(),
          sanity.getProducts(),
          sanity.getArticles(),
          sanity.getTestimonials(),
          sanity.getWhoWeServePage(),
          sanity.getAboutPage(),
          sanity.getBuySilverPage(),
          sanity.getLearnPage(),
          sanity.getWebinars(),
        ]);

        console.log('Sanity data loaded:', { site, prods, arts, tests, wws, about, buy, learn, webs });
        setSiteContent(site);
        setProducts(prods || []);
        setArticles(arts || []);
        setTestimonials(tests || []);
        setWhoWeServeContent(wws);
        setAboutContent(about);
        setBuySilverContent(buy);
        setLearnPage(learn);
        setWebinars(webs || []);
      } catch (error) {
        console.error('Error fetching Sanity data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const navigate = (p: Page) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleLang = () => setLang(l => l === 'en' ? 'he' : 'en');

  if (loading) {
    return (
      <div className="min-h-screen bg-lavi-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lavi-silver border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lavi-silver">Loading...</p>
        </div>
      </div>
    );
  }

  const navLinks = [
    { id: Page.HOME, label: lang === 'en' ? siteContent?.navHome || 'Home' : siteContent?.navHomeHe || 'בית' },
    { id: Page.WHO_WE_SERVE, label: lang === 'en' ? siteContent?.navWhoWeServe || 'Who We Serve' : siteContent?.navWhoWeServeHe || 'את מי אנו משרתים' },
    { id: Page.PRODUCTS, label: lang === 'en' ? 'Buy Silver' : 'קנה כסף' },
    { id: Page.ABOUT, label: lang === 'en' ? siteContent?.navAbout || 'About' : siteContent?.navAboutHe || 'אודות' },
    { id: Page.LEARN, label: lang === 'en' ? siteContent?.navLearn || 'Learn' : siteContent?.navLearnHe || 'למד' },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-lavi-silver selection:text-lavi-dark ${page === Page.HOME || page === Page.WHO_WE_SERVE ? 'bg-lavi-dark text-slate-200' : 'bg-slate-50 text-slate-700'}`}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <Ticker lang={lang} content={siteContent} />
        <div className={`w-full transition-all duration-300 border-b ${scrolled || (page !== Page.HOME && page !== Page.WHO_WE_SERVE) ? 'bg-lavi-dark/95 backdrop-blur-md border-white/10 py-2 shadow-lg' : 'bg-transparent border-transparent py-4'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="cursor-pointer" onClick={() => navigate(Page.HOME)}>
              <Logo />
            </div>

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

              <button onClick={toggleLang} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">{lang === 'en' ? 'HE' : 'EN'}</span>
              </button>

              <div className="flex items-center gap-2 text-white border-s border-white/10 ps-6 ms-2">
                <Phone className="w-4 h-4 text-lavi-silver" />
                <div className="flex flex-col text-start">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                    {lang === 'en' ? siteContent?.navDesk : siteContent?.navDeskHe}
                  </span>
                  <span className="text-sm font-bold leading-none" dir="ltr">{siteContent?.phone || '+972 (0) 3-555-0123'}</span>
                </div>
              </div>

              <Button variant="primary" className="px-6 py-2 text-sm" onClick={() => navigate(Page.CONTACT)}>
                {lang === 'en' ? siteContent?.navContact : siteContent?.navContactHe}
              </Button>
            </div>

            <div className="flex items-center gap-4 md:hidden">
              <button onClick={toggleLang} className="text-white flex items-center gap-1">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{lang === 'en' ? 'HE' : 'EN'}</span>
              </button>
              <button className="text-white" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-lavi-dark transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : (lang === 'he' ? '-translate-x-full' : 'translate-x-full')}`}>
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
              className={`text-2xl font-serif font-bold text-start ${page === link.id ? 'text-lavi-silver' : 'text-white'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-white/10 pt-6 mt-4">
            <Button className="w-full" onClick={() => navigate(Page.CONTACT)}>
              {lang === 'en' ? siteContent?.navContact : siteContent?.navContactHe}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 min-h-screen">
        {page === Page.HOME && <Home navigate={navigate} lang={lang} content={siteContent} products={products} articles={articles} testimonials={testimonials} />}
        {page === Page.WHO_WE_SERVE && <WhoWeServe navigate={navigate} lang={lang} content={whoWeServeContent} />}
        {page === Page.ABOUT && <About navigate={navigate} lang={lang} content={aboutContent} />}
        {page === Page.PRODUCTS && <Products navigate={navigate} lang={lang} products={products} content={buySilverContent} />}
        {page === Page.LEARN && <Learn navigate={navigate} lang={lang} articles={articles} learnPage={learnPage} webinars={webinars} />}
        {page === Page.CONTACT && <Contact lang={lang} content={siteContent} />}
      </main>

      {/* Newsletter */}
      <NewsletterSection lang={lang} content={siteContent?.newsletter} />

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10 text-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12 text-start">
            <div>
              <Logo />
              <p className="mt-6 text-slate-500 text-sm leading-relaxed">
                {lang === 'en' ? siteContent?.footerDesc : siteContent?.footerDescHe}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
                {lang === 'en' ? siteContent?.footerQuickLinks || 'Quick Links' : siteContent?.footerQuickLinksHe || 'קישורים מהירים'}
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                {navLinks.map(link => (
                  <li key={link.id}><button onClick={() => navigate(link.id)} className="hover:text-lavi-silver transition-colors text-start">{link.label}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
                {lang === 'en' ? siteContent?.footerLegal || 'Legal' : siteContent?.footerLegalHe || 'משפטי'}
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-lavi-silver transition-colors">{lang === 'en' ? siteContent?.footerPrivacy : siteContent?.footerPrivacyHe}</a></li>
                <li><a href="#" className="hover:text-lavi-silver transition-colors">{lang === 'en' ? siteContent?.footerTerms : siteContent?.footerTermsHe}</a></li>
                <li><a href="#" className="hover:text-lavi-silver transition-colors">{lang === 'en' ? siteContent?.footerAml : siteContent?.footerAmlHe}</a></li>
                <li><a href="#" className="hover:text-lavi-silver transition-colors">{lang === 'en' ? siteContent?.footerShipping : siteContent?.footerShippingHe}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
                {lang === 'en' ? 'Contact' : 'צור קשר'}
              </h4>
              <p className="text-slate-400 text-sm mb-2">{lang === 'en' ? siteContent?.address : siteContent?.addressHe}</p>
              <p className="text-slate-400 text-sm mb-2" dir="ltr">{siteContent?.phone}</p>
              <p className="text-slate-400 text-sm">{siteContent?.email}</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs">{lang === 'en' ? siteContent?.footerRights : siteContent?.footerRightsHe}</p>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              <Shield className="w-3 h-3" /> {lang === 'en' ? siteContent?.footerSecure : siteContent?.footerSecureHe}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
