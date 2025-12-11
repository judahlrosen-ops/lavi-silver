console.log('Sanity Schema: siteContent.js loaded');
export default {
  name: 'siteContent',
  title: 'Site Content (Updated)',
  type: 'document',
  groups: [
    { name: 'navigation', title: 'Navigation' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'ytd', title: 'YTD Section' },
    { name: 'allocation', title: 'Allocation Section' },
    { name: 'insights', title: 'Insights Section' },
    { name: 'cta', title: 'CTA Section' },
    { name: 'newsletter', title: 'Newsletter' },
    { name: 'founders', title: 'Founders Section' },
    { name: 'book', title: 'Book Section' },
    { name: 'parlour', title: 'Parlour Meetings' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact Info' },
  ],
  fields: [
    // NAVIGATION
    { name: 'navHome', title: 'Nav: Home', type: 'string', group: 'navigation' },
    { name: 'navHomeHe', title: 'Nav: Home (Hebrew)', type: 'string', group: 'navigation' },
    { name: 'navWhoWeServe', title: 'Nav: Who We Serve', type: 'string', group: 'navigation' },
    { name: 'navWhoWeServeHe', title: 'Nav: Who We Serve (Hebrew)', type: 'string', group: 'navigation' },
    { name: 'navProducts', title: 'Nav: Buy Silver', type: 'string', group: 'navigation' },
    { name: 'navProductsHe', title: 'Nav: Buy Silver (Hebrew)', type: 'string', group: 'navigation' },
    { name: 'navAbout', title: 'Nav: About', type: 'string', group: 'navigation' },
    { name: 'navAboutHe', title: 'Nav: About (Hebrew)', type: 'string', group: 'navigation' },
    { name: 'navLearn', title: 'Nav: Learn', type: 'string', group: 'navigation' },
    { name: 'navLearnHe', title: 'Nav: Learn (Hebrew)', type: 'string', group: 'navigation' },
    { name: 'navContact', title: 'Nav: Contact', type: 'string', group: 'navigation' },
    { name: 'navContactHe', title: 'Nav: Contact (Hebrew)', type: 'string', group: 'navigation' },
    { name: 'navDesk', title: 'Nav: Investor Desk', type: 'string', group: 'navigation' },
    { name: 'navDeskHe', title: 'Nav: Investor Desk (Hebrew)', type: 'string', group: 'navigation' },

    // HERO
    { name: 'heroH1', title: 'Hero: Headline', type: 'string', group: 'hero' },
    { name: 'heroH1He', title: 'Hero: Headline (Hebrew)', type: 'string', group: 'hero' },
    { name: 'heroH1Gradient', title: 'Hero: Headline Gradient', type: 'string', group: 'hero' },
    { name: 'heroH1GradientHe', title: 'Hero: Headline Gradient (Hebrew)', type: 'string', group: 'hero' },
    { name: 'heroSub', title: 'Hero: Subheadline', type: 'text', group: 'hero' },
    { name: 'heroSubHe', title: 'Hero: Subheadline (Hebrew)', type: 'text', group: 'hero' },
    { name: 'heroCta1', title: 'Hero: CTA Button 1', type: 'string', group: 'hero' },
    { name: 'heroCta1He', title: 'Hero: CTA Button 1 (Hebrew)', type: 'string', group: 'hero' },
    { name: 'heroCta2', title: 'Hero: CTA Button 2', type: 'string', group: 'hero' },
    { name: 'heroCta2He', title: 'Hero: CTA Button 2 (Hebrew)', type: 'string', group: 'hero' },

    // YTD
    { name: 'ytdBadge', title: 'YTD: Badge', type: 'string', group: 'ytd' },
    { name: 'ytdBadgeHe', title: 'YTD: Badge (Hebrew)', type: 'string', group: 'ytd' },
    { name: 'ytdTitle', title: 'YTD: Title', type: 'string', group: 'ytd' },
    { name: 'ytdTitleHe', title: 'YTD: Title (Hebrew)', type: 'string', group: 'ytd' },
    { name: 'ytdDesc', title: 'YTD: Description', type: 'text', group: 'ytd' },
    { name: 'ytdDescHe', title: 'YTD: Description (Hebrew)', type: 'text', group: 'ytd' },
    { name: 'ytdSilverLabel', title: 'YTD: Silver Label', type: 'string', group: 'ytd' },
    { name: 'ytdSilverLabelHe', title: 'YTD: Silver Label (Hebrew)', type: 'string', group: 'ytd' },
    { name: 'ytdSilverValue', title: 'YTD: Silver Value', type: 'string', group: 'ytd' },
    { name: 'ytdSp500Label', title: 'YTD: S&P 500 Label', type: 'string', group: 'ytd' },
    { name: 'ytdSp500LabelHe', title: 'YTD: S&P 500 Label (Hebrew)', type: 'string', group: 'ytd' },
    { name: 'ytdSp500Value', title: 'YTD: S&P 500 Value', type: 'string', group: 'ytd' },
    { name: 'ytdReadReport', title: 'YTD: Read Report Button', type: 'string', group: 'ytd' },
    { name: 'ytdReadReportHe', title: 'YTD: Read Report Button (Hebrew)', type: 'string', group: 'ytd' },

    // ALLOCATION
    { name: 'allocBadge', title: 'Allocation: Badge', type: 'string', group: 'allocation' },
    { name: 'allocBadgeHe', title: 'Allocation: Badge (Hebrew)', type: 'string', group: 'allocation' },
    { name: 'allocTitle', title: 'Allocation: Title', type: 'string', group: 'allocation' },
    { name: 'allocTitleHe', title: 'Allocation: Title (Hebrew)', type: 'string', group: 'allocation' },
    { name: 'allocDesc', title: 'Allocation: Description', type: 'text', group: 'allocation' },
    { name: 'allocDescHe', title: 'Allocation: Description (Hebrew)', type: 'text', group: 'allocation' },
    { name: 'allocLabel1', title: 'Allocation: Label 1', type: 'string', group: 'allocation' },
    { name: 'allocLabel1He', title: 'Allocation: Label 1 (Hebrew)', type: 'string', group: 'allocation' },
    { name: 'allocLabel2', title: 'Allocation: Label 2', type: 'string', group: 'allocation' },
    { name: 'allocLabel2He', title: 'Allocation: Label 2 (Hebrew)', type: 'string', group: 'allocation' },
    { name: 'allocCta', title: 'Allocation: CTA Button', type: 'string', group: 'allocation' },
    { name: 'allocCtaHe', title: 'Allocation: CTA Button (Hebrew)', type: 'string', group: 'allocation' },

    // INSIGHTS
    { name: 'insightsTitle', title: 'Insights: Title', type: 'string', group: 'insights' },
    { name: 'insightsTitleHe', title: 'Insights: Title (Hebrew)', type: 'string', group: 'insights' },
    { name: 'insightsDesc', title: 'Insights: Description', type: 'text', group: 'insights' },
    { name: 'insightsDescHe', title: 'Insights: Description (Hebrew)', type: 'text', group: 'insights' },
    { name: 'insightsCta', title: 'Insights: CTA Button', type: 'string', group: 'insights' },
    { name: 'insightsCtaHe', title: 'Insights: CTA Button (Hebrew)', type: 'string', group: 'insights' },

    // CTA SECTION
    { name: 'ctaTitle', title: 'CTA: Title', type: 'string', group: 'cta' },
    { name: 'ctaTitleHe', title: 'CTA: Title (Hebrew)', type: 'string', group: 'cta' },
    { name: 'ctaDesc', title: 'CTA: Description', type: 'text', group: 'cta' },
    { name: 'ctaDescHe', title: 'CTA: Description (Hebrew)', type: 'text', group: 'cta' },
    { name: 'ctaBtn1', title: 'CTA: Button 1', type: 'string', group: 'cta' },
    { name: 'ctaBtn1He', title: 'CTA: Button 1 (Hebrew)', type: 'string', group: 'cta' },
    { name: 'ctaBtn2', title: 'CTA: Button 2', type: 'string', group: 'cta' },
    { name: 'ctaBtn2He', title: 'CTA: Button 2 (Hebrew)', type: 'string', group: 'cta' },

    // NEWSLETTER
    {
      name: 'newsletterBadge',
      title: 'Newsletter: Badge',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Newsletter'
    },
    {
      name: 'newsletterBadgeHe',
      title: 'Newsletter: Badge (Hebrew)',
      type: 'string',
      group: 'newsletter',
      initialValue: 'ניוזלטר'
    },
    {
      name: 'newsletterTitle',
      title: 'Newsletter: Title',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Market Insights Delivered'
    },
    {
      name: 'newsletterTitleHe',
      title: 'Newsletter: Title (Hebrew)',
      type: 'string',
      group: 'newsletter',
      initialValue: 'תובנות שוק ישירות אליך'
    },
    {
      name: 'newsletterDesc',
      title: 'Newsletter: Description',
      type: 'text',
      group: 'newsletter',
      initialValue: 'Join our exclusive community of investors. Get weekly analysis, precious metals updates, and strategic reports.'
    },
    {
      name: 'newsletterDescHe',
      title: 'Newsletter: Description (Hebrew)',
      type: 'text',
      group: 'newsletter',
      initialValue: 'הצטרף לקהילה האקסקלוסיבית של המשקיעים שלנו. קבל ניתוח שבועי, עדכונים על מתכות יקרות ודוחות אסטרטגיים.'
    },
    {
      name: 'newsletterBtn',
      title: 'Newsletter: Button Text',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Subscribe'
    },
    {
      name: 'newsletterBtnHe',
      title: 'Newsletter: Button Text (Hebrew)',
      type: 'string',
      group: 'newsletter',
      initialValue: 'הרשמה'
    },
    {
      name: 'newsletterPlaceholder',
      title: 'Newsletter: Email Placeholder',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Enter your email address'
    },
    {
      name: 'newsletterPlaceholderHe',
      title: 'Newsletter: Email Placeholder (Hebrew)',
      type: 'string',
      group: 'newsletter',
      initialValue: 'הכנס את כתובת האימייל שלך'
    },
    {
      name: 'newsletterSuccess',
      title: 'Newsletter: Success Message',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Thank you for subscribing!'
    },
    {
      name: 'newsletterSuccessHe',
      title: 'Newsletter: Success Message (Hebrew)',
      type: 'string',
      group: 'newsletter',
      initialValue: 'תודה שנרשמת!'
    },

    // FOUNDERS
    { name: 'foundersTitle', title: 'Founders: Title', type: 'string', group: 'founders' },
    { name: 'foundersTitleHe', title: 'Founders: Title (Hebrew)', type: 'string', group: 'founders' },
    { name: 'foundersDesc', title: 'Founders: Description', type: 'text', group: 'founders' },
    { name: 'foundersDescHe', title: 'Founders: Description (Hebrew)', type: 'text', group: 'founders' },
    { name: 'founder1Name', title: 'Founder 1: Name', type: 'string', group: 'founders' },
    { name: 'founder1NameHe', title: 'Founder 1: Name (Hebrew)', type: 'string', group: 'founders' },
    { name: 'founder1Role', title: 'Founder 1: Role', type: 'string', group: 'founders' },
    { name: 'founder1RoleHe', title: 'Founder 1: Role (Hebrew)', type: 'string', group: 'founders' },
    { name: 'founder1Bio', title: 'Founder 1: Bio', type: 'text', group: 'founders' },
    { name: 'founder1BioHe', title: 'Founder 1: Bio (Hebrew)', type: 'text', group: 'founders' },
    { name: 'founder1Image', title: 'Founder 1: Image', type: 'image', group: 'founders' },
    { name: 'founder2Name', title: 'Founder 2: Name', type: 'string', group: 'founders' },
    { name: 'founder2NameHe', title: 'Founder 2: Name (Hebrew)', type: 'string', group: 'founders' },
    { name: 'founder2Role', title: 'Founder 2: Role', type: 'string', group: 'founders' },
    { name: 'founder2RoleHe', title: 'Founder 2: Role (Hebrew)', type: 'string', group: 'founders' },
    { name: 'founder2Bio', title: 'Founder 2: Bio', type: 'text', group: 'founders' },
    { name: 'founder2BioHe', title: 'Founder 2: Bio (Hebrew)', type: 'text', group: 'founders' },
    { name: 'founder2Image', title: 'Founder 2: Image', type: 'image', group: 'founders' },

    // BOOK
    { name: 'bookTitle', title: 'Book: Title', type: 'string', group: 'book' },
    { name: 'bookTitleHe', title: 'Book: Title (Hebrew)', type: 'string', group: 'book' },
    { name: 'bookDesc', title: 'Book: Description', type: 'text', group: 'book' },
    { name: 'bookDescHe', title: 'Book: Description (Hebrew)', type: 'text', group: 'book' },
    { name: 'bookImage', title: 'Book: Image', type: 'image', group: 'book' },
    { name: 'bookLink', title: 'Book: Link', type: 'url', group: 'book' },
    { name: 'bookCta', title: 'Book: CTA Text', type: 'string', group: 'book' },
    { name: 'bookCtaHe', title: 'Book: CTA Text (Hebrew)', type: 'string', group: 'book' },

    // PARLOUR MEETINGS
    { name: 'parlourTitle', title: 'Parlour: Title', type: 'string', group: 'parlour' },
    { name: 'parlourTitleHe', title: 'Parlour: Title (Hebrew)', type: 'string', group: 'parlour' },
    { name: 'parlourDesc', title: 'Parlour: Description', type: 'text', group: 'parlour' },
    { name: 'parlourDescHe', title: 'Parlour: Description (Hebrew)', type: 'text', group: 'parlour' },
    { name: 'parlourCta', title: 'Parlour: CTA Text', type: 'string', group: 'parlour' },
    { name: 'parlourCtaHe', title: 'Parlour: CTA Text (Hebrew)', type: 'string', group: 'parlour' },

    // FOOTER
    { name: 'footerDesc', title: 'Footer: Description', type: 'text', group: 'footer' },
    { name: 'footerDescHe', title: 'Footer: Description (Hebrew)', type: 'text', group: 'footer' },
    { name: 'footerQuickLinks', title: 'Footer: Quick Links Title', type: 'string', group: 'footer' },
    { name: 'footerQuickLinksHe', title: 'Footer: Quick Links Title (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerLegal', title: 'Footer: Legal Title', type: 'string', group: 'footer' },
    { name: 'footerLegalHe', title: 'Footer: Legal Title (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerPrivacy', title: 'Footer: Privacy Policy', type: 'string', group: 'footer' },
    { name: 'footerPrivacyHe', title: 'Footer: Privacy Policy (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerTerms', title: 'Footer: Terms of Service', type: 'string', group: 'footer' },
    { name: 'footerTermsHe', title: 'Footer: Terms of Service (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerAml', title: 'Footer: AML Compliance', type: 'string', group: 'footer' },
    { name: 'footerAmlHe', title: 'Footer: AML Compliance (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerShipping', title: 'Footer: Shipping', type: 'string', group: 'footer' },
    { name: 'footerShippingHe', title: 'Footer: Shipping (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerRights', title: 'Footer: Rights', type: 'string', group: 'footer' },
    { name: 'footerRightsHe', title: 'Footer: Rights (Hebrew)', type: 'string', group: 'footer' },
    { name: 'footerSecure', title: 'Footer: Secure Text', type: 'string', group: 'footer' },
    { name: 'footerSecureHe', title: 'Footer: Secure Text (Hebrew)', type: 'string', group: 'footer' },

    // CONTACT INFO
    { name: 'phone', title: 'Phone', type: 'string', group: 'contact' },
    { name: 'email', title: 'Email', type: 'string', group: 'contact' },
    { name: 'address', title: 'Address', type: 'string', group: 'contact' },
    { name: 'addressHe', title: 'Address (Hebrew)', type: 'string', group: 'contact' },
  ]
}
