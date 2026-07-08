export interface Product {
  id: number;
  name: string;
  category: string;
  origin: string;
  route: string;
  desc: string;
  image?: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "ZENITH ENA", category: "Chemicals", origin: "India", route: "India → Global Markets", desc: "High-grade Extra Neutral Alcohol (96%) suitable for beverage, pharmaceutical, cosmetic, personal care, perfumery, food processing, and industrial applications.", image: "/ENA.jpeg" },
  { id: 2, name: "OM HARVEST White Refined Sugar (S30)", category: "Agro Commodities", origin: "India", route: "India → Global Markets", desc: "Grade S30 refined white sugar, high purity, essential for food and beverage manufacturing.", image: "/Rsugar.png" },
  { id: 3, name: "OM HARVEST Brown Sugar", category: "Agro Commodities", origin: "India", route: "India → Global Markets", desc: "Rich molasses-infused brown sugar for baking and confectionery.", image: "/Bsugar.png" },
  { id: 4, name: "ZENITH MOLASSES ", category: "Agro Commodities", origin: "India", route: "India → Global Markets", desc: "High-quality sugarcane molasses for distillation and industrial use.", image: "/Molasses.png" },
  { id: 5, name: "SHIVAA E-Rickshaws", category: "Electric Mobility", origin: "India", route: "India → Global Markets", desc: "Certified high-efficiency electric three-wheelers for sustainable urban transport.", image: "/Erickshaw.png" },
  { id: 6, name: "SHIVAA E-Bikes", category: "Electric Mobility", origin: "India", route: "India → Global Markets", desc: "Modern electric bicycles and scooters designed for the African landscape.", image: "/Ebike.png" },
  { id: 7, name: "Shivaa Polymers", category: "Industrial Products", origin: "India", route: "India → Global Markets", desc: "Quality polymer resins for varied industrial and packaging applications.", image: "/Polymer.jpeg" },
  { id: 8, name: "Globichem Citric Acid", category: "Chemicals", origin: "China", route: "Global Market - India", desc: "Food-grade citric acid (Anhydrous/Monohydrate) for food processing.", image: "/Citric_acid.png" },
  { id: 9, name: "Globichem Malic Acid", category: "Chemicals", origin: "China", route: "Global Market - India", desc: "High-purity malic acid used in confectionery and beverage additives.", image: "/Malic_Acid.png" },
  { id: 10, name: "Shoes", category: "Consumer Goods", origin: "Global", route: "Global Markets → India", desc: "Premium-quality footwear sourced from trusted international manufacturers, offering durability, comfort, and contemporary designs for retail and wholesale markets across India.", image: "/shoe.jpeg" },
  { id: 11, name: "Apparels", category: "Consumer Goods", origin: "Global", route: "Global Markets → India", desc: "High-quality garments and fashion apparel imported from leading global manufacturers, designed to meet international quality standards and evolving consumer trends.", image: "/apparels.jpeg" },
  { id: 12, name: "Travel Luggage", category: "Consumer Goods", origin: "Global", route: "Global Markets → India", desc: "Premium travel luggage including suitcases, backpacks, trolley bags, and travel accessories engineered for durability, functionality, and modern travel needs.", image: "/luggage.jpeg" },
  { id: 13, name: "Cosmetics", category: "Consumer Goods", origin: "Global", route: "Global Markets → India", desc: "International cosmetic and personal care products sourced from certified global manufacturers, delivering premium quality, innovation, and trusted formulations.", image: "/cosmetics.jpeg" },
  { id: 14, name: "Perfumes", category: "Consumer Goods", origin: "Global", route: "Global Markets → India", desc: "Luxury fragrances and premium perfumes imported from globally recognized manufacturers, crafted to deliver long-lasting freshness and sophisticated aromas.", image: "/perfume.jpeg" },
  { id: 15, name: "Indian Spices & Masalas", category: "Agro Commodities", origin: "India", route: "India → Global Markets", desc: "Premium export-quality Indian spices and blended masalas sourced from trusted manufacturers across India, delivering authentic flavor, rich aroma, and consistent quality for international food industries, wholesalers, and retail markets.", image: "/Indian_Spices_&_ Masalas.jpeg" }
];

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
};

export const POSTS: BlogPost[] = [
  {
    id: 1,
    title: "International Trade Built on Trust, Quality, and Commitment",
    excerpt: "At Shivaa Om Globe Trade Pvt. Ltd., we believe international trade is built on trust, quality, and commitment. As a dynamic global trading company, we provide reliable import-export solutions that meet international standards.\n\nIn today’s competitive market, businesses expect consistency, timely delivery, transparent communication, and dependable service. Our team works closely with suppliers, logistics partners, and global clients to ensure smooth and efficient trade operations.\n\nWe are committed to building long-term partnerships and connecting global markets through professionalism, integrity, and reliable trade solutions.\n\nExecutive Director\nShivaa Om Globe Trade Pvt. Ltd.",
    category: "Corporate Profile",
    date: "May 18, 2026",
    author: "Executive Director",
  },
  {
    id: 2,
    title: "The Rising Demand for Indian E-Rickshaws in Africa",
    excerpt:
      "Exploring how electric mobility is transforming last-mile transportation across African urban centers and why Indian E-Rickshaw technology is ideally suited to support this transition. ",
    category: "Electric Mobility",
    date: "May 08, 2026",
    author: "Shivaa Om Globe Trade Team",
  },
  {
    id: 3,
    title: "Understanding Extra Neutral Alcohol (ENA) Quality Parameters",
    excerpt:
      "A deep dive into why 96% purity is critical for industrial applications and how sourcing from India ensures consistent quality.",
    category: "Agro Commodities",
    date: "April 29, 2026",
    author: "Ops Team",
  },
  {
    id: 4,
    title: "Shipping Trends: JNPT - Navi Mumbai to East and Central Africa",
    excerpt:
      "Exploring the most efficient shipping routes and how JNPT - Navi Mumbai acts as a critical Hub for International merchant trading.",
    category: "Logistics",
    date: "April 15, 2026",
    author: "Trade News",
  },
];
