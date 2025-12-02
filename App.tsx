
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, Shield, Truck, Phone, 
  BarChart3, BookOpen, ArrowRight, CheckCircle, 
  PlayCircle, FileText, Anchor, ChevronDown, Send, User, Bot,
  Quote, Target, Lock, Globe, Award, Users, ChevronLeft, Info,
  Scale, Zap, History, AlertTriangle, Coins, Building, Eye,
  PieChart as LucidePieChart, Filter, SlidersHorizontal, ArrowLeft, Check, Search,
  ArrowUpRight, Calendar, Video, Briefcase, Mail, Newspaper, Bookmark, GraduationCap, Package, Languages,
  Home as HomeIcon, Clock, DollarSign, Key
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

// --- Types & Constants ---

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
  priceOffset: number;
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

interface Article {
  id: number;
  title: string;
  excerpt: string;
  type: 'Video' | 'White Paper' | 'Article' | 'External';
  category: string;
  readTime: string;
  source?: string;
  date: string;
}

// --- Content Dictionary ---

const CONTENT = {
  en: {
    nav: {
      home: 'Home',
      whoWeServe: 'Who We Serve',
      products: 'Catalog',
      about: 'About',
      learn: 'Learn',
      contact: 'Contact Us',
      desk: 'Investor Desk'
    },
    footer: {
      desc: 'Premium silver brokerage for the modern investor. Secure, liquid, and compliant wealth preservation solutions for Olim and Israeli residents.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      aml: 'AML Compliance',
      shipping: 'Shipping & Delivery',
      contact: 'Contact',
      rights: '© 2024 Lavi Silver Group. All rights reserved.',
      secure: 'Secure SSL Encryption'
    },
    address: 'Beit Lechem Road, Jerusalem',
    ticker: {
      live: 'Live Markets',
      delayed: 'Prices delayed 15m'
    },
    hero: {
      h1: 'Safeguard Your Wealth.',
      h1_gradient: 'Diversify with Confidence.',
      sub: 'Investors have trusted silver for generations to grow and diversify their wealth.',
      cta1: 'Silver Catalog',
      cta2: 'Who We Serve'
    },
    ytd: {
      badge: 'YTD Analysis',
      title: 'Investing is About Time',
      desc: 'With exceptional returns this year, silver has explosive growth potential as it\'s both a monetary metal, and the backbone of the world’s industrial sector - powering solar energy systems, electric vehicles, and medical equipment.',
      silverYtd: 'Silver YTD',
      sp500Ytd: 'S&P 500 YTD',
      readReport: 'Read Full Report'
    },
    allocation: {
      badge: 'Strategic Allocation',
      title: 'Diversify Your Success',
      desc: 'Israeli high-tech portfolios are often heavily weighted in equities and options. Financial experts recommend allocating 5-15% of your net worth to commodities to hedge against market corrections and currency devaluation.',
      label1: 'Precious Metals: Stability & Insurance',
      label2: 'Equities: Growth & Risk',
      cta: 'Discuss Allocation Strategy',
      chartLabel: 'Recommended Allocation'
    },
    catalog: {
      badge: 'Our Catalog',
      title: 'Sovereign Mint Bullion',
      desc: 'We exclusively stock recognized sovereign coins and LBMA-approved bars to ensure maximum liquidity and security.',
      cta: 'View Full Catalog'
    },
    insights: {
      title: 'Investment Insights',
      desc: 'Navigate the complexities of the Israeli financial system and global precious metals markets.',
      cta: 'Read All Articles'
    },
    ctaSection: {
      title: 'Take Command of Your Financial Future',
      desc: 'Don\'t wait for the next banking disaster or currency fall, arrange a private meeting with us to discuss the allocation of a part of your portfolio into physical silver.',
      btn1: 'Silver Catalog',
      btn2: 'Book Consultation'
    },
    whoWeServe: {
      title: 'Who We Serve',
      sub: 'Tailored strategies for Olim, High-Tech Professionals, and Long-Term Investors.',
      aliyahTitle: 'Making Aliyah?',
      aliyahGradient: 'Bring Real Assets With You.',
      aliyahIntro: [
        "Assessing a move to Israel, building a financial foundation is key to a successful life, and physical silver offers a unique opportunity to secure that base and separate it from the traditional banking system. Coming from the often-recommended advice to invest in real estate, physical silver is a breath of fresh air and a smart alternative. Decades of experience show that traditional property investment is high-risk for default.",
        "When buying a property in Israel, real estate investment in Israel exposes new immigrants like never before. It doesn't matter what kind of properties they choose, labyrinthine fees pile up and comprise Purchase Tax (Mas Rechisha), Legal Fees, Agent Commissions, Ongoing Property Tax (Arnona), Building Committee Fees (Va’ad Bayit) and unforeseen maintenance and repairs. Rental management has the additional complications of disputes with tenants, empty periods, and contract renewals and comes with Capital Gains Tax of up to twenty-five percent when the property is sold and, let’s not forget the time you spend on viewings, negotiations, and fix-ups.",
        "On the other hand, physical silver gives you the chance to really enjoy passive ownership, requiring virtually no ongoing expenses, financial, time or stress.",
        "Built especially for Olim, our service is given in English, taking away the need to Google Translate, and in the high Israeli market, physical silver won't sit idle for months, it's bought and sold, sent to your door and fully insured and secure. Expert money management is also something we do, moving money and changing your savings into real assets with total confidence and precision.",
        "When pitted against the problems of real estate investment in Israel, physical silver starts to sound like a very attractive option."
      ],
      aliyahCta: 'Start Your Consultation',
      benefitsTitle: 'Benefits for Investors',
      benefitsSub: 'Tailored strategies for your financial background.',
      olimTitle: 'For Olim',
      olimContent: [
        "Coming from the States, the financial obstacles that come with making aliyah often cause olim to default to the stability of US equities or plunge into illiquid Israeli real estate, but tangible physical silver provides an easier and truly passive way to diversify and grow your wealth.",
        "Physical assets don't take much to manage, and since it is independent of any bank, you can see what you have in your hand. It also represents your ticket to instant liquidity out of the banking system, we'll buy it back from you at a competitive market rate and advise on secondary market options as well.",
        "VAT in Israel, is a heavy burden on companies, 18% for silver, but businesses may be able to reclaim this, giving them back a substantial sum."
      ],
      techTitle: 'For Startup Nation Investors',
      techContent: [
        "When it comes to startup investing, concentration is usually difficult to navigate, especially when the market after an exit can be rough and unpredictable and you need to spread out your bets. Physical silver has stable long-term growth, and backs real economic activities such as electronics, solar panels and batteries.",
        "One way to be certain you're getting a profit with silver, is watching the reversion of the gold to silver ratio, huge price rises are predicted in this situation, even before the absolute price of gold goes up and you see the real profit.",
        "Another benefit of silver physical investments is the guaranteed privacy and discretion it gives. Your holdings won’t show up on your statement, we will keep your data 100% confidential."
      ],
      comparisonTable: {
        headers: ['Real Estate', 'Physical Silver'],
        rows: [
          { label: 'Entry Cost', re: '₪3M - ₪5M', ag: 'Start with ₪5,000' },
          { label: 'Ongoing Fees', re: 'Taxes, maintenance, management', ag: 'None' },
          { label: 'Liquidity', re: 'Months to sell', ag: 'Same-day sale' },
          { label: 'Time Investment', re: 'Significant', ag: 'Zero' },
          { label: 'Storage', re: 'Fixed location', ag: 'Portable, private' },
          { label: 'Tenant Headaches', re: 'Guaranteed', ag: 'None' }
        ]
      }
    },
    about: {
      badge: 'Who We Are',
      title: 'Lavi Silver Group',
      sub: 'Israel\'s premier silver brokerage specializing in liquidity, security, and white-glove advisory for investors.',
      desc: 'Founded by Olim for Olim and High-Tech professionals, we act as your personal gateway to the physical precious metals market.',
      points: ['Licensed Brokerage', 'Personal Advisory', 'Secure Transactions', 'Global Sourcing'],
      whyTitle: 'Why Choose Lavi Silver Group',
      whySub: 'We offer more than just a transaction.',
      features: [
        { title: 'Personal Consultation', desc: 'Every client starts with a conversation. We assess your portfolio and liquidity needs to recommend the right mix.' },
        { title: 'Navigate the Market', desc: 'Expert advisory for navigating the unique aspects of the Israeli silver market, including VAT and import logistics.' },
        { title: 'White-Glove Service', desc: 'From inquiry to delivery, we manage every step. Shipped directly to your door with insured secure delivery.' }
      ],
      ctaTitle: 'Ready to secure your future?',
      ctaDesc: 'Speak with an advisor today and discover how simple it is to add physical silver to your investment strategy.',
      ctaBtn: 'Schedule Advisory Call'
    },
    products: {
      badge: 'Our Catalog',
      desc: 'We exclusively stock recognized sovereign coins and LBMA-approved bars to ensure maximum liquidity and security.',
      filters: 'Filters',
      collection: 'Collection',
      mint: 'Mint',
      clear: 'Clear Filters',
      bannerTitle: 'New to Silver?',
      bannerDesc: 'Download our free investor guide.',
      bannerLink: 'Learn More',
      showing: 'Showing',
      results: 'results',
      sortBy: 'Sort by:',
      sortOptions: { featured: 'Featured', low: 'Price: Low to High', high: 'Price: High to Low' },
      indicative: 'Indicative',
      viewDetails: 'View Details',
      back: 'Back to Catalog',
      specs: 'Specifications',
      highlights: 'Product Highlights',
      enquire: 'Enquire Now',
      youMightLike: 'You Might Also Like',
      buyBackTitle: 'Sell Your Silver to Lavi',
      buyBackDesc: 'We offer a consistent market for your metals. Enjoy transparent, competitive buy-back rates for all sovereign bullion and LBMA-approved bars.',
      buyBackPoints: [
        'Liquidity for Lavi clients',
        'Immediate payment via bank transfer (NIS/USD)',
        'Free pickup and transfer in Jerusalem'
      ],
      buyBackBtn: 'Request Buy-Back Offer'
    },
    learn: {
      title: 'Knowledge Hub',
      sub: 'Navigate the complexities of the Israeli financial system and global precious metals markets.',
      categories: ['All', 'Market Briefing', 'Expert Insights', 'Lavi Analysis', 'Silver 101'],
      nextSession: 'Next Session',
      monthlyBriefing: 'Monthly Market Briefing',
      webinarTitle: 'Silver\'s Next Move: Monthly Outlook',
      webinarDesc: 'Join Jonathan Lavi for a live analysis of Fed interest rate implications, the Gold-to-Silver ratio, and specific opportunities in the Israeli local market.',
      register: 'Register for Webinar',
      watch: 'Watch Now',
      read: 'Read Article',
      ebookTitle: 'The Silver Investor\'s Handbook',
      ebookDesc: 'Download our comprehensive guide to physical allocation, storage, and taxation in Israel.',
      download: 'Download Free E-Book'
    },
    contact: {
      title: 'Start Your Journey',
      sub: 'Schedule a consultation with our wealth preservation experts.',
      infoTitle: 'Contact Information',
      officeHours: 'Office Hours',
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        message: 'Message',
        send: 'Send Message'
      }
    }
  },
  he: {
    nav: {
      home: 'בית',
      whoWeServe: 'את מי אנו משרתים',
      products: 'קטלוג',
      about: 'אודות',
      learn: 'למד',
      contact: 'צור קשר',
      desk: 'דסק משקיעים'
    },
    footer: {
      desc: 'ברוקראז\' כסף מוביל למשקיע המודרני. פתרונות שימור עושר מאובטחים, נזילים ותואמי רגולציה לעולים ולתושבי ישראל.',
      quickLinks: 'קישורים מהירים',
      legal: 'משפטי',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
      aml: 'ציות AML',
      shipping: 'משלוח ואספקה',
      contact: 'צור קשר',
      rights: '© 2024 קבוצת לביא כסף. כל הזכויות שמורות.',
      secure: 'הצפנת SSL מאובטחת'
    },
    address: 'דרך בית לחם, ירושלים',
    ticker: {
      live: 'שווקים בזמן אמת',
      delayed: 'עיכוב של 15 דקות'
    },
    hero: {
      h1: 'שמור על העושר שלך.',
      h1_gradient: 'גוון בביטחון.',
      sub: 'משקיעים סומכים על כסף (Silver) במשך דורות כדי להגדיל ולגוון את הונם.',
      cta1: 'קטלוג כסף',
      cta2: 'את מי אנו משרתים'
    },
    ytd: {
      badge: 'ניתוח שנתי',
      title: 'השקעה היא עניין של זמן',
      desc: 'עם תשואות יוצאות דופן השנה, לכסף יש פוטנציאל צמיחה אדיר כיוון שהוא גם מתכת מונטרית וגם עמוד השדרה של המגזר התעשייתי העולמי - מניע מערכות אנרגיה סולארית, רכבים חשמליים וציוד רפואי.',
      silverYtd: 'כסף מתחילת שנה',
      sp500Ytd: 'S&P 500 מתחילת שנה',
      readReport: 'קרא דוח מלא'
    },
    allocation: {
      badge: 'הקצאה אסטרטגית',
      title: 'גוון את ההצלחה שלך',
      desc: 'תיקי השקעות בהייטק הישראלי מוטים לעתים קרובות בכבדות למניות ואופציות. מומחים פיננסיים ממליצים להקצות 5-15% מהשווי הנקי לסחורות כדי לגדר מפני תיקוני שוק ופיחות מטבע.',
      label1: 'מתכות יקרות: יציבות וביטוח',
      label2: 'מניות: צמיחה וסיכון',
      cta: 'דון באסטרטגיית הקצאה',
      chartLabel: 'הקצאה מומלצת'
    },
    catalog: {
      badge: 'הקטלוג שלנו',
      title: 'מטבעות ריבוניים',
      desc: 'אנו מחזיקים אך ורק מטבעות ריבוניים מוכרים ומטילים המאושרים על ידי LBMA כדי להבטיח נזילות וביטחון מקסימליים.',
      cta: 'צפה בקטלוג המלא'
    },
    insights: {
      title: 'תובנות השקעה',
      desc: 'נווט במורכבות המערכת הפיננסית הישראלית ושוקי המתכות היקרות העולמיים.',
      cta: 'קרא את כל המאמרים'
    },
    ctaSection: {
      title: 'קח פיקוד על העתיד הפיננסי שלך',
      desc: 'אל תחכה לאסון הבנקאי הבא או לנפילת המטבע, קבע פגישה פרטית איתנו כדי לדון בהקצאת חלק מהתיק שלך לכסף פיזי.',
      btn1: 'קטלוג כסף',
      btn2: 'קבע פגישת ייעוץ'
    },
    whoWeServe: {
      title: 'את מי אנו משרתים',
      sub: 'אסטרטגיות מותאמות לעולים, אנשי הייטק ומשקיעים לטווח ארוך.',
      aliyahTitle: 'עושים עלייה?',
      aliyahGradient: 'הביאו נכסים ריאליים איתכם.',
      aliyahIntro: [
        "בהערכת מעבר לישראל, בניית יסודות פיננסיים היא המפתח לחיים מוצלחים, וכסף פיזי מציע הזדמנות ייחודית להבטיח את הבסיס הזה ולהפריד אותו מהמערכת הבנקאית המסורתית. בניגוד לעצה הנפוצה להשקיע בנדל\"ן, כסף פיזי הוא משב רוח רענן ואלטרנטיבה חכמה. עשורים של ניסיון מראים שהשקעה מסורתית בנכסים היא בסיכון גבוה לחדלות פירעון.",
        "בעת רכישת נכס בישראל, השקעה בנדל\"ן חושפת עולים חדשים לסיכונים כמו שלא היו מעולם. לא משנה באילו נכסים הם בוחרים, עמלות מורכבות נערמות וכוללות מס רכישה, שכר טרחת עורך דין, עמלות תיווך, ארנונה, ועד בית ותחזוקה ותיקונים בלתי צפויים. ניהול שכירות מגיע עם סיבוכים נוספים של סכסוכים עם דיירים, תקופות ריקות וחידושי חוזים, ומגיע עם מס שבח של עד עשרים וחמישה אחוזים בעת מכירת הנכס, ושלא נשכח את הזמן שאתה מבלה בצפיות, משא ומתן ותיקונים.",
        "מצד שני, כסף פיזי נותן לך את ההזדמנות ליהנות באמת מבעלות פסיבית, הדורשת כמעט אפס הוצאות שוטפות, פיננסיות, זמן או לחץ.",
        "נבנה במיוחד עבור עולים, השירות שלנו ניתן באנגלית, חוסך את הצורך בגוגל טרנסלייט, ובשוק הישראלי הגבוה, כסף פיזי לא יושב בחיבוק ידיים במשך חודשים, הוא נקנה ונמכר, נשלח לדלתך ומבוטח ומאובטח לחלוטין. ניהול כספים מומחה הוא גם משהו שאנחנו עושים, העברת כסף והמרת החסכונות שלך לנכסים ריאליים בביטחון ודיוק מלאים.",
        "כאשר משווים אותו לבעיות של השקעה בנדל\"ן בישראל, כסף פיזי מתחיל להישמע כאופציה אטרקטיבית מאוד."
      ],
      aliyahCta: 'התחל ייעוץ',
      benefitsTitle: 'יתרונות למשקיעים',
      benefitsSub: 'אסטרטגיות מותאמות לרקע הפיננסי שלך.',
      olimTitle: 'לעולים',
      olimContent: [
        "בהגיעם מארה\"ב, המכשולים הפיננסיים הכרוכים בעשיית עלייה גורמים לעתים קרובות לעולים ברירת מחדל ליציבות של מניות ארה\"ב או לצלול לנדל\"ן ישראלי לא נזיל, אך כסף פיזי מוחשי מספק דרך קלה יותר ופסיבית באמת לגוון ולהגדיל את העושר שלך.",
        "נכסים פיזיים לא דורשים הרבה ניהול, ומכיוון שהוא עצמאי מכל בנק, אתה יכול לראות מה יש לך ביד. זה גם מייצג את הכרטיס שלך לנזילות מיידית מחוץ למערכת הבנקאית, אנו נקנה אותו ממך בחזרה במחיר שוק תחרותי ונייעץ גם על אפשרויות שוק משני.",
        "מע\"מ בישראל הוא נטל כבד על חברות, 18% לכסף, אך עסקים עשויים לקבל החזר על כך, מה שמחזיר להם סכום נכבד."
      ],
      techTitle: 'למשקיעי אומת הסטארט-אפ',
      techContent: [
        "כשמדובר בהשקעות סטארט-אפ, ריכוזיות היא בדרך כלל קשה לניווט, במיוחד כשהשוק לאחר אקזיט יכול להיות קשה ובלתי צפוי ואתה צריך לפזר את ההימורים שלך. לכסף פיזי יש צמיחה יציבה לטווח ארוך, והוא מגבה פעילויות כלכליות אמיתיות כמו אלקטרוניקה, פאנלים סולאריים וסוללות.",
        "דרך אחת להיות בטוחים שאתם מקבלים רווח עם כסף, היא לצפות בחזרה לממוצע של יחס הזהב לכסף, עליות מחירים ענקיות צפויות במצב זה, עוד לפני שמחיר הזהב המוחלט עולה ואתם רואים את הרווח האמיתי.",
        "יתרון נוסף של השקעות פיזיות בכסף הוא הפרטיות והדיסקרטיות המובטחת שהוא נותן. האחזקות שלך לא יופיעו בהצהרה שלך, אנו נשמור על הנתונים שלך ב-100% סודיות."
      ],
      comparisonTable: {
        headers: ['נדל"ן', 'כסף פיזי'],
        rows: [
          { label: 'עלות כניסה', re: '₪3M - ₪5M', ag: 'התחל ב-₪5,000' },
          { label: 'עמלות שוטפות', re: 'מסים, תחזוקה, ניהול', ag: 'ללא' },
          { label: 'נזילות', re: 'חודשים למכירה', ag: 'מכירה באותו יום' },
          { label: 'השקעת זמן', re: 'משמעותית', ag: 'אפס' },
          { label: 'אחסון', re: 'מיקום קבוע', ag: 'נייד, פרטי' },
          { label: 'כאבי ראש מדיירים', re: 'מובטח', ag: 'ללא' }
        ]
      }
    },
    about: {
      badge: 'מי אנחנו',
      title: 'קבוצת לביא כסף',
      sub: 'ברוקראז\' הכסף המוביל בישראל המתמחה בנזילות, ביטחון וייעוץ אישי למשקיעים.',
      desc: 'נוסד על ידי עולים למען עולים ואנשי הייטק, אנו משמשים כשער האישי שלך לשוק המתכות היקרות הפיזיות.',
      points: ['ברוקראז\' מורשה', 'ייעוץ אישי', 'עסקאות מאובטחות', 'רכש גלובלי'],
      whyTitle: 'למה לבחור בקבוצת לביא',
      whySub: 'אנו מציעים יותר מסתם עסקה.',
      features: [
        { title: 'ייעוץ אישי', desc: 'כל לקוח מתחיל בשיחה. אנו מעריכים את התיק וצרכי הנזילות שלך כדי להמליץ על התמהיל הנכון.' },
        { title: 'נווט בשוק', desc: 'ייעוץ מומחה לניווט בהיבטים הייחודיים של שוק הכסף הישראלי, כולל מע"מ ולוגיסטיקת יבוא.' },
        { title: 'שירות כפפות לבנות', desc: 'מהפנייה ועד המסירה, אנו מנהלים כל שלב. נשלח ישירות לדלתך עם משלוח מאובטח ומבוטח.' }
      ],
      ctaTitle: 'מוכן להבטיח את עתידך?',
      ctaDesc: 'דבר עם יועץ היום וגלה כמה פשוט להוסיף כסף פיזי לאסטרטגיית ההשקעה שלך.',
      ctaBtn: 'קבע שיחת ייעוץ'
    },
    products: {
      badge: 'הקטלוג שלנו',
      desc: 'אנו מחזיקים אך ורק מטבעות ריבוניים מוכרים ומטילים המאושרים על ידי LBMA כדי להבטיח נזילות וביטחון מקסימליים.',
      filters: 'סינון',
      collection: 'קולקציה',
      mint: 'מטבעה',
      clear: 'נקה סינון',
      bannerTitle: 'חדש בתחום?',
      bannerDesc: 'הורד את המדריך למשקיע.',
      bannerLink: 'למד עוד',
      showing: 'מציג',
      results: 'תוצאות',
      sortBy: 'מיין לפי:',
      sortOptions: { featured: 'מומלץ', low: 'מחיר: מהנמוך לגבוה', high: 'מחיר: מהגבוה לנמוך' },
      indicative: 'אינדיקטיבי',
      viewDetails: 'צפה בפרטים',
      back: 'חזרה לקטלוג',
      specs: 'מפרט טכני',
      highlights: 'דגשים למוצר',
      enquire: 'שאל עכשיו',
      youMightLike: 'אולי תאהב גם',
      buyBackTitle: 'מכור את הכסף שלך ללביא',
      buyBackDesc: 'אנו מציעים שוק עקבי למתכות שלך. תיהנה ממחירי רכישה חוזרת שקופים ותחרותיים לכל המטבעות הריבוניים והמטילים המאושרים.',
      buyBackPoints: [
        'נזילות ללקוחות לביא',
        'תשלום מיידי בהעברה בנקאית (ש"ח/דולר)',
        'איסוף והעברה חינם בירושלים'
      ],
      buyBackBtn: 'בקש הצעת רכש'
    },
    learn: {
      title: 'מרכז ידע',
      sub: 'נווט במורכבות המערכת הפיננסית הישראלית ושוקי המתכות היקרות העולמיים.',
      categories: ['הכל', 'סקירת שוק', 'תובנות מומחים', 'ניתוח לביא', 'כסף 101'],
      nextSession: 'מפגש הבא',
      monthlyBriefing: 'סקירת שוק חודשית',
      webinarTitle: 'המהלך הבא של הכסף: תחזית חודשית',
      webinarDesc: 'הצטרף ליונתן לביא לניתוח חי של השלכות ריבית הפד, יחס הזהב-כסף והזדמנויות ספציפיות בשוק המקומי.',
      register: 'הירשם לוובינר',
      watch: 'צפה עכשיו',
      read: 'קרא מאמר',
      ebookTitle: 'המדריך למשקיע בכסף',
      ebookDesc: 'הורד את המדריך המקיף שלנו להקצאה פיזית, אחסון ומיסוי בישראל.',
      download: 'הורד ספר אלקטרוני חינם'
    },
    contact: {
      title: 'התחל את המסע שלך',
      sub: 'קבע פגישת ייעוץ עם מומחי שימור העושר שלנו.',
      infoTitle: 'פרטי קשר',
      officeHours: 'שעות פעילות',
      form: {
        firstName: 'שם פרטי',
        lastName: 'שם משפחה',
        email: 'כתובת אימייל',
        message: 'הודעה',
        send: 'שלח הודעה'
      }
    }
  }
};

// --- Mock Data Functions (To support localization) ---

const getProducts = (lang: Lang): Product[] => {
  const isEn = lang === 'en';
  return [
    {
      id: 1,
      name: isEn ? "Canadian Silver Maple Leaf" : "מטבע מייפל ליף קנדי",
      subtitle: isEn ? "The World's Security Standard" : "סטנדרט הביטחון העולמי",
      priceIndication: isEn ? "Spot + $4.50 / oz" : "ספוט + $4.50 / אונקיה",
      priceOffset: 4.50,
      weight: isEn ? "1 oz" : "1 אונקיה",
      purity: ".9999",
      mint: isEn ? "Royal Canadian Mint" : "המטבעה המלכותית הקנדית",
      category: "coin",
      tier: "Standard Bullion",
      description: isEn ? 
        "The Royal Canadian Mint’s Silver Maple Leaf is one of the world’s most recognized coins. It features advanced security measures, including radial lines and a micro-engraved maple leaf with the year of issue." :
        "מטבע המייפל ליף של המטבעה המלכותית הקנדית הוא אחד המטבעות המוכרים בעולם. הוא כולל אמצעי אבטחה מתקדמים, כולל קווים רדיאליים ועלה מייפל בחריטה מיקרוסקופית.",
      image: "https://images.unsplash.com/photo-1624623348275-52646241b17d?q=80&w=1000&auto=format&fit=crop",
      highlights: isEn ? [
        "Contains 1 oz of .9999 fine Silver.",
        "Features RCM's MintShield™ technology.",
        "Sovereign coin backed by Canadian government."
      ] : [
        "מכיל 1 אונקיה של כסף טהור .9999.",
        "כולל טכנולוגיית MintShield™ למניעת כתמים.",
        "מטבע ריבוני בגיבוי ממשלת קנדה."
      ],
      specs: {
        material: isEn ? "Fine Silver" : "כסף טהור",
        fineness: "99.99%",
        weight: isEn ? "31.10 grams" : "31.10 גרם",
        diameter: "38 mm",
        manufacturer: isEn ? "Royal Canadian Mint" : "Royal Canadian Mint"
      }
    },
    {
      id: 2,
      name: isEn ? "American Silver Eagle" : "אמריקן סילבר איגל",
      subtitle: isEn ? "America's Official Bullion" : "מטבע הבוליון הרשמי של אמריקה",
      priceIndication: isEn ? "Spot + $6.00 / oz" : "ספוט + $6.00 / אונקיה",
      priceOffset: 6.00,
      weight: isEn ? "1 oz" : "1 אונקיה",
      purity: ".999",
      mint: isEn ? "United States Mint" : "המטבעה האמריקאית",
      category: "coin",
      tier: "Standard Bullion",
      description: isEn ? 
        "The American Silver Eagle is the official silver bullion coin of the United States. It is struck only in the one-troy ounce size and is guaranteed to contain one troy ounce of 99.9% pure silver." :
        "האמריקן סילבר איגל הוא מטבע הכסף הרשמי של ארצות הברית. הוא מוטבע רק בגודל אונקיה אחת ומובטח להכיל אונקיה אחת של כסף טהור 99.9%.",
      image: "https://images.unsplash.com/photo-1574607383077-47ddc2dc4324?q=80&w=1000&auto=format&fit=crop",
      highlights: isEn ? [
        "The single most popular silver bullion coin.",
        "Guaranteed by the U.S. Government.",
        "Eligible for Precious Metals IRAs."
      ] : [
        "מטבע הכסף הפופולרי ביותר בעולם.",
        "מובטח על ידי ממשלת ארה\"ב.",
        "מוכר לצרכי IRA (בארה\"ב)."
      ],
      specs: {
        material: isEn ? "Fine Silver" : "כסף טהור",
        fineness: "99.9%",
        weight: isEn ? "31.10 grams" : "31.10 גרם",
        diameter: "40.6 mm",
        manufacturer: isEn ? "United States Mint" : "United States Mint"
      }
    },
    {
      id: 3,
      name: isEn ? "Britannia Silver Coin" : "מטבע בריטניה",
      subtitle: isEn ? "A Symbol of Strength" : "סמל של עוצמה",
      priceIndication: isEn ? "Spot + $4.00 / oz" : "ספוט + $4.00 / אונקיה",
      priceOffset: 4.00,
      weight: isEn ? "1 oz" : "1 אונקיה",
      purity: ".999",
      mint: isEn ? "The Royal Mint" : "המטבעה המלכותית",
      category: "coin",
      tier: "Standard Bullion",
      description: isEn ? 
        "Britannia has been the changing face of Britain for centuries. This coin features four advanced security features, including a latent image that changes from a padlock to a trident." :
        "בריטניה היא הפנים המשתנות של בריטניה מזה מאות שנים. המטבע כולל ארבעה מאפייני אבטחה מתקדמים, כולל תמונה סמויה המשתנה ממנעול לקלשון.",
      image: "https://images.unsplash.com/photo-1610375461246-83648bfb1e25?q=80&w=1000&auto=format&fit=crop",
      highlights: isEn ? [
        "Contains 1 oz of .999 fine Silver.",
        "Four advanced security features.",
        "Capital Gains Tax exempt in the UK."
      ] : [
        "מכיל 1 אונקיה של כסף טהור .999.",
        "ארבעה מאפייני אבטחה מתקדמים.",
        "פטור ממס רווחי הון בבריטניה."
      ],
      specs: {
        material: isEn ? "Fine Silver" : "כסף טהור",
        fineness: "99.9%",
        weight: isEn ? "31.10 grams" : "31.10 גרם",
        diameter: "38.61 mm",
        manufacturer: isEn ? "The Royal Mint" : "The Royal Mint"
      }
    },
    {
      id: 5,
      name: isEn ? "PAMP Suisse Cast Bar" : "מטיל יצוק PAMP Suisse",
      subtitle: isEn ? "Swiss Engineering Excellence" : "מצוינות הנדסית שוויצרית",
      priceIndication: isEn ? "Spot + $2.50 / oz" : "ספוט + $2.50 / אונקיה",
      priceOffset: 2.50,
      weight: isEn ? "1 kg" : "1 ק\"ג",
      purity: ".999",
      mint: "PAMP Suisse",
      category: "bar",
      tier: "Premium Collection",
      description: isEn ? 
        "For the serious investor, the 1 kilogram PAMP Suisse cast bar offers lower premiums and high efficiency. These bars are cast, not struck, giving them a unique, rugged appearance." :
        "למשקיע הרציני, מטיל 1 ק\"ג PAMP Suisse מציע פרמיות נמוכות ויעילות גבוהה. מטילים אלו יצוקים, לא מוטבעים, מה שמעניק להם מראה ייחודי ומחוספס.",
      image: "https://images.unsplash.com/photo-1521575256220-6385d8525e98?q=80&w=1000&auto=format&fit=crop",
      highlights: isEn ? [
        "Contains 1 kilo (32.15 oz) of .999 fine Silver.",
        "Cast bar style with a rustic finish.",
        "Produced by PAMP Suisse."
      ] : [
        "מכיל 1 ק\"ג (32.15 אונקיות) כסף טהור .999.",
        "סגנון יצוק עם גימור כפרי.",
        "מיוצר על ידי PAMP Suisse."
      ],
      specs: {
        material: isEn ? "Fine Silver" : "כסף טהור",
        fineness: "99.9%",
        weight: "1000 g",
        diameter: "N/A",
        manufacturer: "PAMP Suisse"
      }
    },
    {
      id: 6,
      name: isEn ? "Lavi Signature 100oz Bar" : "מטיל 100 אונקיות",
      subtitle: isEn ? "Ultimate Wealth Preservation" : "שימור עושר אולטימטיבי",
      priceIndication: isEn ? "Spot + $1.90 / oz" : "ספוט + $1.90 / אונקיה",
      priceOffset: 1.90,
      weight: isEn ? "100 oz" : "100 אונקיות",
      purity: ".999",
      mint: "Asahi / RCM",
      category: "bar",
      tier: "Basic Rounds & Bars",
      description: isEn ? 
        "The 100 oz silver bar is the industrial standard for wealth preservation. It offers the lowest premium over spot price, making it the most efficient vehicle for large positions." :
        "מטיל הכסף של 100 אונקיות הוא הסטנדרט התעשייתי לשימור עושר. הוא מציע את הפרמיה הנמוכה ביותר מעל מחיר הספוט, מה שהופך אותו לכלי היעיל ביותר לפוזיציות גדולות.",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1000&auto=format&fit=crop",
      highlights: isEn ? [
        "Contains 100 oz of .999 fine Silver.",
        "Lowest premium option for bulk investment.",
        "Recognized globally for liquidity."
      ] : [
        "מכיל 100 אונקיות כסף טהור .999.",
        "האופציה בעלת הפרמיה הנמוכה ביותר.",
        "מוכר גלובלית לנזילות."
      ],
      specs: {
        material: isEn ? "Fine Silver" : "כסף טהור",
        fineness: "99.9%",
        weight: "3.11 kg",
        diameter: "N/A",
        manufacturer: "Various"
      }
    },
     {
      id: 7,
      name: isEn ? "10 oz Silver Bar (Generic)" : "מטיל כסף 10 אונקיות",
      subtitle: isEn ? "Stackable & Liquid" : "נזיל ונוח לאחסון",
      priceIndication: isEn ? "Spot + $2.10 / oz" : "ספוט + $2.10 / אונקיה",
      priceOffset: 2.10,
      weight: isEn ? "10 oz" : "10 אונקיות",
      purity: ".999",
      mint: "Various",
      category: "bar",
      tier: "Basic Rounds & Bars",
      description: isEn ? 
        "The 10 oz silver bar is a favorite among stackers for its balance of lower premiums and convenient handling size. Sourced from various reputable mints." :
        "מטיל ה-10 אונקיות הוא מועדף בקרב אספנים בזכות האיזון בין פרמיות נמוכות לגודל נוח. מקורו במטבעות נחשבות שונות.",
      image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=1000&auto=format&fit=crop",
      highlights: isEn ? [
        "Contains 10 oz of .999 fine Silver.",
        "Lower premium than sovereign coins.",
        "Easily stackable rectangular shape."
      ] : [
        "מכיל 10 אונקיות כסף טהור .999.",
        "פרמיה נמוכה יותר ממטבעות ריבוניים.",
        "צורה מלבנית נוחה לערימה."
      ],
      specs: {
        material: isEn ? "Fine Silver" : "כסף טהור",
        fineness: "99.9%",
        weight: "311 g",
        diameter: "N/A",
        manufacturer: "Various"
      }
    }
  ];
};

const getArticles = (lang: Lang): Article[] => {
  const isEn = lang === 'en';
  return [
    {
      id: 1,
      title: isEn ? "The Oleh's Guide to Wealth Preservation" : "המדריך לעולה לשימור עושר",
      excerpt: isEn ? "How to protect your savings from currency volatility during your first years in Israel." : "איך להגן על החסכונות שלך מתנודתיות מטבע בשנים הראשונות בישראל.",
      type: "Article",
      category: isEn ? 'Lavi Analysis' : 'ניתוח לביא',
      readTime: isEn ? "5 min read" : "5 דק' קריאה",
      date: "Oct 10, 2024"
    },
    {
      id: 2,
      title: isEn ? "Why Israeli Tech Entrepreneurs Are Buying Silver" : "למה יזמי הייטק ישראלים קונים כסף",
      excerpt: isEn ? "Diversifying equity portfolios with tangible assets: A strategy for hedging market corrections." : "גיוון תיקי מניות עם נכסים מוחשיים: אסטרטגיה לגידור תיקוני שוק.",
      type: "White Paper",
      category: isEn ? 'Lavi Analysis' : 'ניתוח לביא',
      readTime: isEn ? "12 min read" : "12 דק' קריאה",
      date: "Sep 28, 2024"
    },
    {
      id: 3,
      title: isEn ? "Understanding the Israeli Silver Premium" : "הבנת פרמיית הכסף הישראלית",
      excerpt: isEn ? "Why the secondary market in Israel offers superior liquidity and buy-back opportunities." : "מדוע השוק המשני בישראל מציע נזילות והזדמנויות רכישה חוזרת עדיפות.",
      type: "Video",
      category: isEn ? 'Lavi Analysis' : 'ניתוח לביא',
      readTime: isEn ? "8 min watch" : "8 דק' צפייה",
      date: "Sep 15, 2024"
    },
    {
      id: 5,
      title: isEn ? "The Gold-to-Silver Ratio: A Historical Perspective" : "יחס הזהב-כסף: פרספקטיבה היסטורית",
      excerpt: isEn ? "Analyzing the 80:1 ratio and what mean reversion implies for future silver pricing." : "ניתוח יחס ה-80:1 ומה המשמעות של חזרה לממוצע עבור מחיר הכסף העתידי.",
      type: "Article",
      category: isEn ? 'Silver 101' : 'כסף 101',
      readTime: isEn ? "6 min read" : "6 דק' קריאה",
      date: "Aug 20, 2024"
    }
  ];
};

const getTestimonials = (lang: Lang) => {
  const isEn = lang === 'en';
  return [
    {
      id: 1,
      name: isEn ? "Sarah Jenkins" : "שרה ג'נקינס",
      role: isEn ? "Olah from New York (2023)" : "עולה מניו יורק (2023)",
      quote: isEn ? "Moving money to Israel was a compliance nightmare. Lavi Silver Group offered a seamless way to secure assets locally without dealing with aggressive bank compliance officers." : "העברת כסף לישראל הייתה סיוט בירוקרטי. קבוצת לביא הציעה דרך חלקה להבטיח נכסים מקומית ללא התמודדות עם קציני ציות אגרסיביים.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: isEn ? "Yoni B." : "יוני ב.",
      role: isEn ? "Fintech Founder, Tel Aviv" : "מייסד פינטק, תל אביב",
      quote: isEn ? "My portfolio was 90% tech stocks. I needed a counter-balance outside the digital system. Lavi's advisory on physical allocation was exactly what I needed." : "התיק שלי היה 90% מניות טכנולוגיה. הייתי צריך איזון נגדי מחוץ למערכת הדיגיטלית. הייעוץ של לביא על הקצאה פיזית היה בדיוק מה שהייתי צריך.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  ];
};

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

const Ticker = ({ lang }: { lang: Lang }) => {
  const [silverPrice, setSilverPrice] = useState(31.42);
  const [goldPrice, setGoldPrice] = useState(2645.10);
  const t = CONTENT[lang].ticker;

  useEffect(() => {
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
            <span className="text-lavi-silver uppercase tracking-widest hidden sm:inline">{t.live}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-300">
               Ag: <span className="text-white font-mono">${silverPrice.toFixed(2)}</span> 
               <span className="text-green-400 ms-1.5 flex inline-flex items-center"><ArrowUpRight className="w-3 h-3 me-0.5 rtl:rotate-180" /> 1.25%</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">
               Au: <span className="text-lavi-gold font-mono">${goldPrice.toFixed(2)}</span> 
               <span className="text-green-400 ms-1.5 flex inline-flex items-center"><ArrowUpRight className="w-3 h-3 me-0.5 rtl:rotate-180" /> 0.42%</span>
            </span>
          </div>
       </div>
       <div className="hidden md:block text-slate-500 text-[10px] uppercase tracking-wider">
          {t.delayed}
       </div>
    </div>
  );
};

const TestimonialsSection = ({ lang }: { lang: Lang }) => {
  const testimonials = getTestimonials(lang);
  return (
    <section className="container mx-auto px-6 py-24 bg-lavi-dark relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <SectionHeading title={lang === 'en' ? "Investor Stories" : "סיפורי משקיעים"} subtitle={lang === 'en' ? "Helping Olim and Tech Leaders navigate the Israeli financial landscape." : "עוזרים לעולים ומובילי הייטק לנווט בנוף הפיננסי הישראלי."} />
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-lavi-primary/20 p-8 rounded-xl border border-white/5 relative hover:bg-lavi-primary/40 transition-all duration-300 group">
            <div className="absolute -top-4 -left-2 rtl:left-auto rtl:-right-2 bg-lavi-dark p-2 rounded-full border border-white/10">
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
};

const ComparisonTable = ({ data }: { data: any }) => (
  <div className="w-full overflow-hidden border border-slate-200 rounded-xl shadow-lg bg-white my-8">
     <div className="grid grid-cols-3 bg-lavi-primary text-white p-4 font-bold text-sm md:text-base border-b border-lavi-dark">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center flex items-center justify-center gap-2">
           <HomeIcon className="w-4 h-4 text-lavi-silver" />
           {data.headers[0]}
        </div>
        <div className="col-span-1 text-center flex items-center justify-center gap-2 text-lavi-silver">
           <Coins className="w-4 h-4" />
           {data.headers[1]}
        </div>
     </div>
     <div className="divide-y divide-slate-100">
        {data.rows.map((row: any, idx: number) => (
           <div key={idx} className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
              <div className="col-span-1 font-bold text-lavi-dark text-xs md:text-sm flex items-center">
                 {row.label}
              </div>
              <div className="col-span-1 text-center text-slate-600 text-xs md:text-sm flex items-center justify-center border-l border-r border-slate-100 px-2">
                 {row.re}
              </div>
              <div className="col-span-1 text-center text-lavi-dark font-medium text-xs md:text-sm flex items-center justify-center bg-blue-50/50">
                 {row.ag}
              </div>
           </div>
        ))}
     </div>
  </div>
);

// --- Pages ---

const Home = ({ navigate, lang }: { navigate: (page: Page) => void, lang: Lang }) => {
  const t = CONTENT[lang];
  const products = getProducts(lang);
  const articles = getArticles(lang);

  return (
    <div className="space-y-0 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lavi-dark/70 via-lavi-dark/80 to-lavi-dark z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {t.hero.h1}<br />
              <span className="text-silver-gradient">{t.hero.h1_gradient}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={() => navigate(Page.PRODUCTS)}>{t.hero.cta1}</Button>
              <Button variant="secondary" onClick={() => navigate(Page.WHO_WE_SERVE)}>{t.hero.cta2}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. YTD Analysis */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-12 h-1 bg-lavi-dark rounded-full"></div>
                   <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">{t.ytd.badge}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-lavi-dark mb-6">{t.ytd.title}</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  {t.ytd.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                      <p className="text-slate-500 text-xs uppercase mb-1">{t.ytd.silverYtd}</p>
                      <p className="text-2xl font-bold text-lavi-dark">+60%</p>
                   </div>
                   <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                      <p className="text-slate-500 text-xs uppercase mb-1">{t.ytd.sp500Ytd}</p>
                      <p className="text-2xl font-bold text-slate-400">+12%</p>
                   </div>
                </div>
                <Button variant="outline" onClick={() => navigate(Page.LEARN)} className="hover:text-lavi-dark hover:bg-slate-100">{t.ytd.readReport}</Button>
              </div>
              <div className="h-[400px] w-full bg-white p-6 rounded-xl border border-slate-200 shadow-xl" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_PERFORMANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748B" tick={{fontSize: 12}} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748B" tick={{fontSize: 12}} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0B1120', borderRadius: '8px' }} 
                      itemStyle={{ color: '#0B1120', paddingBottom: '4px' }}
                      labelStyle={{ color: '#64748B', marginBottom: '8px' }}
                    />
                    <Legend wrapperStyle={{paddingTop: '20px'}} />
                    <Line type="monotone" dataKey="silver" name="Silver" stroke="#0B1120" strokeWidth={3} dot={{r: 4, fill: "#0B1120"}} activeDot={{r: 6, fill: "#0B1120"}} />
                    <Line type="monotone" dataKey="gold" name="Gold" stroke="#F59E0B" strokeWidth={2} dot={false} strokeOpacity={0.7} />
                    <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} strokeOpacity={0.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Allocation Section (Pie Chart) - Dark */}
      <section className="container mx-auto px-6 py-24">
         <div className="bg-lavi-dark border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lavi-silver/0 via-lavi-silver/50 to-lavi-silver/0"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative h-[350px] w-full flex justify-center items-center" dir="ltr">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={ALLOCATION_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            label={(props) => {
                                // Simple customization for RTL support if needed, but numbers are universal
                                const { cx, cy, midAngle, outerRadius, percent, name } = props;
                                const RADIAN = Math.PI / 180;
                                const radius = outerRadius + 20;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                const textAnchor = x > cx ? 'start' : 'end';
                                return (
                                    <text x={x} y={y} fill="#CBD5E1" textAnchor={textAnchor} dominantBaseline="central" fontSize={12} fontWeight="500" fontFamily="Inter, sans-serif">
                                        {`${name} ${(percent * 100).toFixed(0)}%`}
                                    </text>
                                );
                            }}
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
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                      <p className="text-3xl font-bold text-white">10%</p>
                      <p className="text--[10px] text-slate-400 uppercase tracking-widest leading-tight">{lang === 'en' ? 'Recommended Allocation' : 'הקצאה מומלצת'}</p>
                   </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <LucidePieChart className="w-5 h-5 text-lavi-silver" />
                     <span className="text-lavi-silver uppercase tracking-widest text-sm font-bold">{t.allocation.badge}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">{t.allocation.title}</h2>
                  <p className="text-lg text-slate-300 mb-6 font-light leading-relaxed">
                     {t.allocation.desc}
                  </p>
                  <ul className="space-y-4 mb-8">
                     <li className="flex items-center gap-3 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-lavi-silver"></div>
                        <span>{t.allocation.label1}</span>
                     </li>
                     <li className="flex items-center gap-3 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <span>{t.allocation.label2}</span>
                     </li>
                  </ul>
                  <Button variant="outline" onClick={() => navigate(Page.CONTACT)}>{t.allocation.cta}</Button>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Products Preview */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-1 bg-lavi-dark rounded-full"></div>
                        <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">{t.catalog.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-lavi-dark mb-4">{t.catalog.title}</h2>
                    <p className="text-slate-600 font-light text-lg">
                        {t.catalog.desc}
                    </p>
                </div>
                <Button variant="outline" onClick={() => navigate(Page.PRODUCTS)} className="hidden md:flex text-lavi-dark border-lavi-dark hover:bg-lavi-dark hover:text-white">
                    {t.catalog.cta} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product) => (
                    <div 
                        key={product.id} 
                        onClick={() => navigate(Page.PRODUCTS)}
                        className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                    >
                        <div className="h-48 overflow-hidden relative bg-slate-100">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                             <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] text-lavi-dark border border-slate-200 font-bold uppercase tracking-widest shadow-sm">
                                {product.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-lavi-dark mb-1 group-hover:text-lavi-primary transition-colors">{product.name}</h3>
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">{product.mint}</p>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                <span className="text-lavi-dark font-medium text-sm">{product.priceIndication}</span>
                                <span className="text-slate-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 md:hidden">
                <Button variant="outline" onClick={() => navigate(Page.PRODUCTS)} className="w-full text-lavi-dark border-lavi-dark">
                    {t.catalog.cta}
                </Button>
            </div>
        </div>
      </section>

      {/* Learn Preview */}
      <section className="bg-lavi-dark py-24 border-y border-white/5">
         <div className="container mx-auto px-6">
           <div className="flex justify-between items-end mb-12">
              <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{t.insights.title}</h2>
                  <p className="text-slate-300 font-light text-lg max-w-2xl">
                      {t.insights.desc}
                  </p>
              </div>
              <Button onClick={() => navigate(Page.LEARN)} className="hidden md:flex bg-white text-lavi-dark hover:bg-lavi-silver border-0">
                  {t.insights.cta} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article) => (
                  <div key={article.id} onClick={() => navigate(Page.LEARN)} className="bg-lavi-primary/30 border border-white/10 p-6 rounded-xl hover:bg-lavi-primary/50 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-2 mb-3 text-lavi-silver text-[10px] uppercase tracking-widest font-bold">
                          {article.type === 'Video' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {article.readTime}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-lavi-silver transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                      <div className="text-white text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          {lang === 'en' ? 'Read Now' : 'קרא עכשיו'} <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </div>
                  </div>
              ))}
          </div>
           <div className="mt-8 md:hidden">
              <Button onClick={() => navigate(Page.LEARN)} className="w-full bg-white text-lavi-dark hover:bg-lavi-silver">
                  {t.insights.cta}
              </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection lang={lang} />

      {/* CTA */}
      <section className="container mx-auto px-6 text-center py-24">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-lavi-silver/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">{t.ctaSection.title}</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t.ctaSection.desc}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={() => navigate(Page.PRODUCTS)}>{t.ctaSection.btn1}</Button>
              <Button variant="outline" onClick={() => navigate(Page.CONTACT)}>{t.ctaSection.btn2}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const WhoWeServe = ({ navigate, lang }: { navigate: (page: Page) => void, lang: Lang }) => {
  const t = CONTENT[lang].whoWeServe;
  return (
    <div className="pt-0 bg-slate-50">
       <div className="bg-lavi-dark pt-24 pb-12">
          <div className="container mx-auto px-6 text-center">
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t.title}</h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
                {t.sub}
             </p>
          </div>
       </div>

      {/* Making Aliyah Narrative & Comparison Section */}
      <section className="bg-white py-24 border-y border-slate-200">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
              <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-lavi-dark mb-6 leading-tight">
                    {t.aliyahTitle}<br/>
                    <span className="text-silver-gradient bg-clip-text text-transparent bg-gradient-to-r from-lavi-dark to-slate-500">{t.aliyahGradient}</span>
                  </h2>
                  <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                      {t.aliyahIntro.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                  <div className="mt-10">
                     <Button onClick={() => navigate(Page.CONTACT)} className="bg-lavi-dark text-white hover:bg-lavi-primary">{t.aliyahCta}</Button>
                  </div>
              </div>
              <div className="relative">
                 {/* Real Estate vs Silver Table */}
                 <ComparisonTable data={t.comparisonTable} />
                 
                 <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                     <div className="flex gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 h-fit">
                           <Quote className="w-6 h-6 text-lavi-dark" />
                        </div>
                        <div>
                           <p className="text-slate-700 italic mb-4">
                              "{lang === 'en' ? "Coming from the States, I was pushed towards real estate. The hidden fees alone would have killed my returns. Physical silver was the clean, liquid alternative I needed." : "בהגיעי מארה\"ב, דחפו אותי לנדל\"ן. העמלות הנסתרות לבדן היו הורגות את התשואה שלי. כסף פיזי היה האלטרנטיבה הנקייה והנזילה שהייתי צריך."}"
                           </p>
                           <p className="font-bold text-lavi-dark">- David S., Ra'anana</p>
                        </div>
                     </div>
                 </div>
              </div>
          </div>
      </section>

      {/* Benefits for Investors (Olim vs Startup Nation) */}
      <section className="bg-lavi-dark py-24 relative overflow-hidden border-t border-white/5 text-slate-300">
         <div className="absolute top-0 right-0 w-96 h-96 bg-lavi-silver/5 rounded-full blur-3xl pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <SectionHeading title={t.benefitsTitle} subtitle={t.benefitsSub} light={false} />
            
            <div className="grid lg:grid-cols-2 gap-16">
               {/* Column 1: For Olim */}
               <div>
                  <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                      <div className="p-3 bg-white/10 rounded-full shadow-sm border border-white/10">
                          <Globe className="w-6 h-6 text-lavi-silver" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">{t.olimTitle}</h3>
                  </div>
                  <div className="space-y-6 text-lg font-light leading-relaxed">
                      {t.olimContent.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                  </div>
               </div>

               {/* Column 2: Startup Nation Investors */}
               <div>
                  <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                      <div className="p-3 bg-white/10 rounded-full shadow-sm border border-white/10">
                          <TrendingUp className="w-6 h-6 text-lavi-silver" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">{t.techTitle}</h3>
                  </div>
                   <div className="space-y-6 text-lg font-light leading-relaxed">
                      {t.techContent.map((paragraph, idx) => (
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

const About = ({ navigate, lang }: { navigate: (page: Page) => void, lang: Lang }) => {
  const t = CONTENT[lang].about;
  return (
    <div className="pt-0 bg-slate-50">
      
      {/* 1. Who We Are */}
      <section className="py-24 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
                <img 
                   src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop" 
                   alt="Advisory Meeting" 
                   className="rounded-xl shadow-2xl w-full object-cover h-[500px]"
                />
                <div className="absolute -bottom-6 -right-6 rtl:right-auto rtl:-left-6 bg-lavi-dark p-8 rounded-xl shadow-xl max-w-xs hidden md:block">
                   <p className="text-white font-serif text-lg leading-relaxed">"{lang === 'en' ? "We don't just sell bullion. We build strategies for wealth preservation." : "אנו לא רק מוכרים מתכות. אנו בונים אסטרטגיות לשימור עושר."}"</p>
                </div>
            </div>
            <div className="order-1 md:order-2">
               <div className="flex items-center gap-2 mb-4">
                   <div className="w-12 h-1 bg-lavi-dark rounded-full"></div>
                   <span className="text-lavi-dark uppercase tracking-widest text-sm font-bold">{t.badge}</span>
                </div>
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-lavi-dark mb-6">{t.title}</h1>
               <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
                  {t.sub}
               </p>
               <p className="text-slate-600 leading-relaxed mb-8">
                  {t.desc}
               </p>
               <div className="grid grid-cols-2 gap-6">
                  {t.points.map((point, idx) => {
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

      {/* 2. Why Choose Lavi */}
      <section className="bg-white py-24 border-y border-slate-200">
         <div className="container mx-auto px-6">
            <SectionHeading title={t.whyTitle} subtitle={t.whySub} light={true} />
            
            <div className="grid md:grid-cols-3 gap-8">
               {t.features.map((feature, idx) => {
                 const icons = [Phone, Scale, Package]; // Scale instead of Map as placeholder or custom
                 const Icon = icons[idx] || Phone;
                 return (
                  <div key={idx} className="p-8 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                      <div className="w-14 h-14 bg-lavi-dark text-white rounded-lg flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-lavi-dark mb-4">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.desc}
                      </p>
                  </div>
                 )
               })}
            </div>
         </div>
      </section>

      {/* 3. CTA */}
      <section className="bg-lavi-dark py-20 text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">{t.ctaTitle}</h2>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
               {t.ctaDesc}
            </p>
            <div className="flex justify-center">
                <Button onClick={() => navigate(Page.CONTACT)}>{t.ctaBtn}</Button>
            </div>
         </div>
      </section>

    </div>
  );
};

const Products = ({ navigate, lang }: { navigate: (page: Page) => void, lang: Lang }) => {
  const t = CONTENT[lang].products;
  const products = getProducts(lang);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filtering & Sorting State
  const [activeTier, setActiveTier] = useState<ProductTier | 'All'>('All');
  const [activeMint, setActiveMint] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Featured' | 'PriceLow' | 'PriceHigh'>('Featured');
  
  // Derive unique mints for filter
  const mints = ['All', ...Array.from(new Set(products.map(p => p.mint)))];

  // Filter Logic
  const filteredProducts = products.filter(p => {
      const matchTier = activeTier === 'All' || p.tier === activeTier;
      const matchMint = activeMint === 'All' || p.mint === activeMint;
      return matchTier && matchMint;
  }).sort((a, b) => {
      if (sortBy === 'PriceLow') return a.priceOffset - b.priceOffset;
      if (sortBy === 'PriceHigh') return b.priceOffset - a.priceOffset;
      return 0; // Featured uses default order
  });

  const SimilarProducts = ({ category, currentId }: { category: string, currentId: number }) => {
      const similar = products
        .filter(p => p.id !== currentId && p.tier === category)
        .slice(0, 3);
      
      if (similar.length === 0) return null;

      return (
        <div className="mt-24 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-serif font-bold text-lavi-dark mb-8">{t.youMightLike}</h3>
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
          <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 -mt-16 -mr-16 rtl:-ml-16 w-64 h-64 bg-slate-50 rounded-full blur-3xl"></div>
          
          <div className="grid gap-12 p-8 md:p-12 items-center relative z-20">
              <div className="space-y-6 text-center md:text-start">
                  <div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-lavi-dark mb-2">{t.buyBackTitle}</h3>
                      <div className="h-1 w-20 bg-lavi-dark rounded-full mx-auto md:mx-0"></div>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
                      {t.buyBackDesc}
                  </p>
                  <ul className="space-y-4 inline-block text-start">
                      {t.buyBackPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700">
                            <div className="p-1 bg-green-100 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
                            <span>{point}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="pt-4 flex justify-center md:justify-start">
                      <Button variant="outline" onClick={() => navigate(Page.CONTACT)} className="w-full md:w-auto hover:text-white hover:bg-lavi-dark">
                          {t.buyBackBtn}
                      </Button>
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
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
                  {t.back}
              </button>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 relative">
                  {/* Image Column */}
                  <div className="space-y-6">
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-8 shadow-xl relative z-0">
                           {/* Abstract 'Zoom' lens effect hint */}
                           <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-white/90 backdrop-blur rounded p-2 border border-slate-200 shadow-sm">
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
                          <span className="text-slate-500 text-sm">*{t.indicative}</span>
                      </div>

                      <div className="space-y-8">
                          <div>
                              <p className="text-slate-700 leading-relaxed mb-6">
                                  {selectedProduct.description}
                              </p>
                              <Button className="w-full md:w-auto hover:text-white hover:bg-lavi-dark" onClick={() => navigate(Page.CONTACT)}>{t.enquire}</Button>
                          </div>

                          {/* Highlights */}
                          <div>
                              <h3 className="text-lavi-dark font-bold mb-4 flex items-center gap-2">
                                  <Award className="w-5 h-5 text-lavi-primary" /> {t.highlights}
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
                                  <Scale className="w-5 h-5 text-lavi-primary" /> {t.specs}
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
       <SectionHeading title={t.badge} subtitle={t.desc} light={true} />
       
       <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Filters */}
           <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
               
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex items-center gap-2 mb-4 text-lavi-dark font-bold">
                       <Filter className="w-4 h-4" /> {t.filters}
                   </div>
                   
                   {/* Collections */}
                   <div className="mb-6">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{t.collection}</h4>
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
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{t.mint}</h4>
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
                   <h4 className="font-bold text-lg mb-2 leading-tight">{t.bannerTitle}</h4>
                   <p className="text-sm mb-4 text-slate-300">{t.bannerDesc}</p>
                   <button onClick={() => navigate(Page.LEARN)} className="text-xs font-bold uppercase tracking-wider border-b border-lavi-silver pb-0.5 text-lavi-silver">{t.bannerLink}</button>
               </div>
           </div>

           {/* Product Grid Area */}
           <div className="flex-1">
               {/* Top Bar */}
               <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                   <span className="text-slate-500 text-sm mb-4 sm:mb-0">{t.showing} <strong>{filteredProducts.length}</strong> {t.results}</span>
                   
                   <div className="flex items-center gap-3">
                       <span className="text-slate-500 text-sm">{t.sortBy}</span>
                       <div className="relative group">
                           <select 
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 rounded-md py-1.5 px-3 text-sm text-slate-700 outline-none focus:border-lavi-dark cursor-pointer appearance-none pe-8"
                           >
                               <option value="Featured">{t.sortOptions.featured}</option>
                               <option value="PriceLow">{t.sortOptions.low}</option>
                               <option value="PriceHigh">{t.sortOptions.high}</option>
                           </select>
                           <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                                   <p className="text-white text-xs font-bold text-center">{t.viewDetails}</p>
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
                                      <span className="text-[10px] text-slate-500 uppercase">{t.indicative}</span>
                                      <span className="text-lavi-dark font-bold">{product.priceIndication}</span>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-lavi-dark group-hover:text-white transition-colors">
                                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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
                       <Button variant="secondary" onClick={() => { setActiveTier('All'); setActiveMint('All'); }} className="text-slate-600 hover:text-lavi-dark">{t.clear}</Button>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};

const Learn = ({ navigate, lang }: { navigate: (page: Page) => void, lang: Lang }) => {
   const [activeCategory, setActiveCategory] = useState<string>('All');
   const t = CONTENT[lang].learn;
   const articles = getArticles(lang);

   // Filter articles
   const filteredArticles = articles.filter(article => 
       activeCategory === 'All' ? true : article.category === activeCategory
   );

   const categories = t.categories;

   return (
      <div className="pt-24 pb-24 container mx-auto px-6">
         <SectionHeading title={t.title} subtitle={t.sub} light={true} />
         
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

         {/* Featured Content: Next Webinar */}
         {(activeCategory === 'All' || activeCategory === t.categories[1]) && (
            <div className="mb-20 animate-fade-in">
                <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-slate-100 rounded-full blur-2xl"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="bg-lavi-dark border border-white/10 p-6 rounded-xl text-center min-w-[200px] shadow-lg">
                             <div className="text-lavi-silver mb-2">
                                <Calendar className="w-8 h-8 mx-auto" />
                             </div>
                             <p className="text-slate-300 text-xs uppercase tracking-widest mb-1">{t.nextSession}</p>
                             <p className="text-white font-bold text-2xl">Nov 15</p>
                             <p className="text-lavi-silver text-sm">19:00 IST</p>
                        </div>
                        <div className="flex-1 text-center md:text-start space-y-4">
                            <div className="inline-block px-3 py-1 rounded bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold uppercase tracking-wider mb-2">
                                {t.monthlyBriefing}
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-lavi-dark leading-tight">{t.webinarTitle}</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                {t.webinarDesc}
                            </p>
                            <div className="pt-2">
                                <Button className="hover:text-white hover:bg-lavi-dark">{t.register}</Button>
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
                      </div>
                  </div>
                  <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
                      <span className="text-xs text-lavi-dark font-bold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                          {article.type === 'Video' ? t.watch : t.read} <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </span>
                  </div>
               </div>
            ))}
         </div>

         {/* E-Books Section */}
         {(activeCategory === 'All' || activeCategory === t.categories[4]) && (
            <div className="mt-24 bg-lavi-dark border border-white/5 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lavi-silver/50 to-transparent"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <GraduationCap className="w-12 h-12 text-lavi-silver mx-auto mb-6" />
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">{t.ebookTitle}</h2>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                        {t.ebookDesc}
                    </p>
                    <Button variant="primary" className="mx-auto">{t.download}</Button>
                </div>
            </div>
         )}
      </div>
   );
};

const Contact = ({ lang }: { lang: Lang }) => {
   const t = CONTENT[lang].contact;
   const address = CONTENT[lang].address;
   return (
      <div className="pt-24 pb-24 container mx-auto px-6">
         <SectionHeading title={t.title} subtitle={t.sub} light={true} />
         <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
               <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-lavi-dark mb-6">{t.infoTitle}</h3>
                  <div className="space-y-6">
                     <div className="flex items-center gap-4 text-slate-600">
                        <Phone className="w-6 h-6 text-lavi-dark" />
                        <span dir="ltr">+972 (0) 3-555-0123</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-600">
                        <User className="w-6 h-6 text-lavi-dark" />
                        <span>info@lavisilver.com</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-600">
                        <Building className="w-6 h-6 text-lavi-dark" />
                        <span>{address}</span>
                     </div>
                  </div>
               </div>
               
               <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-bold text-lavi-dark mb-4">{t.officeHours}</h3>
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
                     <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.form.firstName}</label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.form.lastName}</label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.form.email}</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.form.message}</label>
                  <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-lavi-dark outline-none transition-colors"></textarea>
               </div>
               <Button className="w-full hover:bg-lavi-dark hover:text-white">{t.form.send}</Button>
            </form>
         </div>
      </div>
   );
};

const ChatWidget = ({ lang }: { lang: Lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = CONTENT[lang].nav;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Simulate connecting to a desk agent
    setTimeout(() => {
        const reply = lang === 'en' 
          ? "Thank you for your message. An advisor from the Investor Desk will be with you shortly."
          : "תודה על הודעתך. יועץ מדסק המשקיעים יהיה איתך בקרוב.";
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 p-4 bg-lavi-silver text-lavi-dark rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 rtl:right-auto rtl:left-6 z-40 w-[350px] md:w-[400px] h-[500px] bg-lavi-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
           <div className="p-4 bg-lavi-primary/50 border-b border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-lavi-silver flex items-center justify-center">
                 <User className="w-5 h-5 text-lavi-dark" />
              </div>
              <div>
                 <h4 className="text-white font-bold">{t.desk}</h4>
                 <p className="text-[10px] text-lavi-silver uppercase tracking-wider">Online</p>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                 <div className="text-center text-slate-500 text-sm mt-10">
                    <p>{lang === 'en' ? 'Welcome to the Investor Desk. How can we help you today?' : 'ברוכים הבאים לדסק המשקיעים. איך נוכל לעזור היום?'}</p>
                 </div>
              )}
              {messages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                       msg.role === 'user' 
                       ? 'bg-lavi-silver text-lavi-dark rounded-tr-none rtl:rounded-tr-xl rtl:rounded-tl-none' 
                       : 'bg-white/10 text-slate-200 rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none'
                    }`}>
                       {msg.text}
                    </div>
                 </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-xl rounded-tl-none rtl:rounded-tr-none flex gap-1">
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
                    placeholder="..."
                    className="flex-1 bg-lavi-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-lavi-silver outline-none"
                 />
                 <button onClick={handleSend} disabled={isLoading} className="p-2 bg-lavi-silver rounded-lg text-lavi-dark hover:bg-white transition-colors disabled:opacity-50">
                    <Send className="w-4 h-4 rtl:rotate-180" />
                 </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

const NewsletterSection = ({ lang }: { lang: Lang }) => {
  const isEn = lang === 'en';
  return (
    <div className="bg-gradient-to-r from-lavi-primary/50 to-lavi-dark border-t border-white/10 py-16">
        <div className="container mx-auto px-6">
            <div className="bg-lavi-silver rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                 <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-12 -mt-12 rtl:-ml-12 pointer-events-none"></div>
                 
                 <div className="relative z-10 max-w-xl text-center md:text-start">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-3 text-lavi-dark/70 font-bold uppercase tracking-widest text-xs">
                          <Mail className="w-4 h-4" /> {isEn ? 'Silver Rising Newsletter' : 'ניוזלטר הכסף'}
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-lavi-dark mb-4">{isEn ? 'Stay Ahead of the Market' : 'הישאר לפני השוק'}</h3>
                      <p className="text-lavi-dark/80 font-medium leading-relaxed">
                          {isEn 
                            ? 'Join 5,000+ investors receiving our weekly analysis on precious metals, Israeli economic updates, and exclusive buy-back opportunities.' 
                            : 'הצטרף ל-5,000+ משקיעים המקבלים את הניתוח השבועי שלנו על מתכות יקרות, עדכונים כלכליים בישראל והזדמנויות רכישה בלעדיות.'}
                      </p>
                 </div>

                 <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                      <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                          <input 
                              type="email" 
                              placeholder={isEn ? "Enter your email" : "הכנס אימייל"} 
                              className="px-6 py-3 rounded-lg bg-white/90 border-0 text-lavi-dark placeholder:text-slate-500 focus:ring-2 focus:ring-lavi-dark/20 outline-none min-w-[300px]"
                          />
                          <button className="px-8 py-3 bg-lavi-dark text-white rounded-lg font-bold hover:bg-lavi-primary transition-colors shadow-lg">
                              {isEn ? 'Subscribe' : 'הירשם'}
                          </button>
                      </form>
                      <p className="text-lavi-dark/60 text-xs mt-3 text-center sm:text-start">
                          {isEn ? 'No spam. Unsubscribe at any time.' : 'ללא ספאם. הסר הרשמה בכל עת.'}
                      </p>
                 </div>
            </div>
        </div>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [lang, setLang] = useState<Lang>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleLang = () => {
    setLang(l => l === 'en' ? 'he' : 'en');
  };

  const t = CONTENT[lang];
  const navLinks = [
    { id: Page.HOME, label: t.nav.home },
    { id: Page.WHO_WE_SERVE, label: t.nav.whoWeServe },
    { id: Page.PRODUCTS, label: t.nav.products },
    { id: Page.ABOUT, label: t.nav.about },
    { id: Page.LEARN, label: t.nav.learn },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-lavi-silver selection:text-lavi-dark ${page === Page.HOME || page === Page.WHO_WE_SERVE ? 'bg-lavi-dark text-slate-200' : 'bg-slate-50 text-slate-700'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <Ticker lang={lang} />
        <div className={`w-full transition-all duration-300 border-b ${scrolled || (page !== Page.HOME && page !== Page.WHO_WE_SERVE) ? 'bg-lavi-dark/95 backdrop-blur-md border-white/10 py-2 shadow-lg' : 'bg-transparent border-transparent py-4'}`}>
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
               
               {/* Language Toggle */}
               <button 
                  onClick={toggleLang}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-2"
                  title="Switch Language"
               >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">{lang === 'en' ? 'HE' : 'EN'}</span>
               </button>

               {/* Investor Desk Item */}
               <div className="flex items-center gap-2 text-white border-s border-white/10 ps-6 ms-2">
                   <Phone className="w-4 h-4 text-lavi-silver" />
                   <div className="flex flex-col text-start">
                       <span className="text-[10px] text-slate-400 uppercase tracking-widest">{t.nav.desk}</span>
                       <span className="text-sm font-bold leading-none" dir="ltr">+972 (0) 3-555-0123</span>
                   </div>
               </div>

               <Button variant="primary" className="px-6 py-2 text-sm" onClick={() => navigate(Page.CONTACT)}>
                  {t.nav.contact}
               </Button>
             </div>

             {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
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
               <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-lavi-silver/10 rounded-full">
                       <Phone className="w-5 h-5 text-lavi-silver" />
                   </div>
                   <div>
                       <p className="text-xs text-slate-400 uppercase tracking-widest">{t.nav.desk}</p>
                       <p className="text-lg font-bold text-white" dir="ltr">+972 (0) 3-555-0123</p>
                   </div>
               </div>
               <Button className="w-full" onClick={() => navigate(Page.CONTACT)}>{t.nav.contact}</Button>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 min-h-screen">
        {page === Page.HOME && <Home navigate={navigate} lang={lang} />}
        {page === Page.WHO_WE_SERVE && <WhoWeServe navigate={navigate} lang={lang} />}
        {page === Page.ABOUT && <About navigate={navigate} lang={lang} />}
        {page === Page.PRODUCTS && <Products navigate={navigate} lang={lang} />}
        {page === Page.LEARN && <Learn navigate={navigate} lang={lang} />}
        {page === Page.CONTACT && <Contact lang={lang} />}
      </main>

      <NewsletterSection lang={lang} />

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10 text-slate-200">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-12 mb-12 text-start">
              <div className="col-span-1 md:col-span-1">
                 <Logo />
                 <p className="mt-6 text-slate-500 text-sm leading-relaxed">
                    {t.footer.desc}
                 </p>
              </div>
              
              <div>
                 <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.quickLinks}</h4>
                 <ul className="space-y-3 text-slate-400 text-sm">
                    {navLinks.map(link => (
                       <li key={link.id}><button onClick={() => navigate(link.id)} className="hover:text-lavi-silver transition-colors">{link.label}</button></li>
                    ))}
                    <li><button onClick={() => navigate(Page.CONTACT)} className="hover:text-lavi-silver transition-colors">{t.footer.contact}</button></li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.legal}</h4>
                 <ul className="space-y-3 text-slate-400 text-sm">
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">{t.footer.privacy}</a></li>
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">{t.footer.terms}</a></li>
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">{t.footer.aml}</a></li>
                    <li><a href="#" className="hover:text-lavi-silver transition-colors">{t.footer.shipping}</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.contact}</h4>
                 <p className="text-slate-400 text-sm mb-2">{t.address}</p>
                 <p className="text-slate-400 text-sm mb-2" dir="ltr">+972 (0) 3-555-0123</p>
                 <p className="text-slate-400 text-sm">info@lavisilver.com</p>
                 <div className="flex gap-4 mt-6">
                    <Globe className="w-5 h-5 text-slate-600 hover:text-lavi-silver cursor-pointer transition-colors" />
                    <History className="w-5 h-5 text-slate-600 hover:text-lavi-silver cursor-pointer transition-colors" />
                 </div>
              </div>
           </div>
           <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-xs">{t.footer.rights}</p>
              <p className="text-slate-600 text-xs flex items-center gap-1">
                 <Shield className="w-3 h-3" /> {t.footer.secure}
              </p>
           </div>
        </div>
      </footer>

      <ChatWidget lang={lang} />
    </div>
  );
};

export default App;
