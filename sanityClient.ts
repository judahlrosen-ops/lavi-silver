const PROJECT_ID = '6d6qll1w';
const DATASET = 'production';
const STUDIO_URL = 'https://lavi-silver.sanity.studio';

export async function fetchSanity(query: string) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

export const sanity = {
  getSiteContent: () => fetchSanity('*[_type == "siteContent"][0]'),
  getProducts: () => fetchSanity('*[_type == "product"]'),
  getArticles: () => fetchSanity('*[_type == "article"]'),
  getTestimonials: () => fetchSanity('*[_type == "testimonial"]'),
  getWhoWeServePage: () => fetchSanity('*[_type == "whoWeServePage"][0]'),
  getAboutPage: () => fetchSanity('*[_type == "aboutPage"][0]'),
  getBuySilverPage: () => fetchSanity('*[_type == "buySilverPage"][0]'),
  getLearnPage: () => fetchSanity('*[_type == "learnPage"][0]'),
  getWebinars: () => fetchSanity('*[_type == "webinar"] | order(date asc)'),
};

export function getEditUrl(type: string, id?: string) {
  if (id) {
    return `${STUDIO_URL}/structure/${type};${id}`;
  }
  return `${STUDIO_URL}/structure/${type}`;
}

export const STUDIO_BASE_URL = STUDIO_URL;

// Build image URL from Sanity image reference
export function getImageUrl(image: any, width = 800): string {
  if (!image?.asset?._ref) return '';

  // Parse the image reference: image-{id}-{dimensions}-{format}
  const ref = image.asset._ref;
  const [, id, dimensions, format] = ref.split('-');

  return `https://cdn.sanity.io/images/6d6qll1w/production/${id}-${dimensions}.${format}?w=${width}&auto=format`;
}

// Free live gold/silver prices from goldprice.org (no API key needed)
export async function getMetalPrices(): Promise<{
  silver: number;
  gold: number;
  silverChange: number;
  goldChange: number;
} | null> {
  try {
    const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const data = await response.json();

    if (data.items && data.items[0]) {
      return {
        silver: data.items[0].xagPrice,
        gold: data.items[0].xauPrice,
        silverChange: data.items[0].pcXag,
        goldChange: data.items[0].pcXau
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching metal prices:', error);
    return null;
  }
}
