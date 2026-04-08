export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: "Cadastral Surveying" | "Spatial Analysis" | "Legal Context" | "Technology" | "Field Activity" | "Industry Event" | "Workshops";
  date: string;
  readingTime: string;
  author: string;
  featured?: boolean;
}

export const blogsData: BlogPost[] = [
  {
    slug: "accurate-land-surveys-property-investment",
    title: "Why Accurate Land Surveys Matter in Property Investment",
    excerpt: "Discover how rigorous cadastral surveys drastically reduce legal disputes over boundaries and protect significant real estate capital investments in East Africa.",
    content: "When significant real estate capital shifts hands, assuming boundary assumptions is a massive liability. Cadastral surveys definitively establish borders. In East Africa, rapid urbanization constantly pushes infrastructure boundaries against existing real estate limits. A meticulously precise survey prevents legal overlaps, defines zoning limitations rigorously, and secures the raw physical value of uncompromised development tracts.\n\nAt Cherith GeoSystems, our methodology eliminates these ambiguities. Every corner mapped is backed by legally defensible data.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    category: "Cadastral Surveying",
    date: "Oct 12, 2026",
    readingTime: "4 min read",
    author: "Amos Shibutse",
    featured: true
  },
  {
    slug: "role-of-gis-in-infrastructure",
    title: "The Role of GIS in Modern Infrastructure Development",
    excerpt: "Exploring the integration of Geographic Information Systems in urban planning to ensure structural resilience and streamlined stakeholder engineering efforts.",
    content: "Geographic Information Systems (GIS) go far beyond just cartography—they are absolute lifelines for modern architectural and structural planning. Using multi-layered spatial data, ministries and private contractors can visualize environmental constraints, structural histories, and hidden utilities prior to ground-breaking.\n\nA unified geospatial strategy drastically mitigates unforeseen engineering costs. The future of African infrastructure lies directly in the capacity to interact with land data well before cement is poured.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80",
    category: "Spatial Analysis",
    date: "Sep 28, 2026",
    readingTime: "6 min read",
    author: "George Omusotsi"
  },
  {
    slug: "understanding-boundary-disputes",
    title: "Understanding Boundary Disputes and How to Resolve Them",
    excerpt: "A technical breakdown on utilizing forensic geospatial tools to re-establish property demarcations and settle complex legal land boundary conflicts.",
    content: "Boundary disputes are expensive, emotionally exhaustive, and extremely detrimental to ongoing development schedules. Over 40% of civil property clashes originate from outdated or poorly executed survey maps inherited from preceding generations.\n\nThe initial step to resolution is forensic geospatial evaluation. Modern RTK alignment combined with historical map digitization can definitively reconstruct exact, uncontestable boundaries. Do not rely on physical markers—trust the unchangeable geographic coordinates.",
    image: "https://images.unsplash.com/photo-1541888126131-ab7bb7fb54ac?auto=format&fit=crop&q=80",
    category: "Legal Context",
    date: "Sep 15, 2026",
    readingTime: "5 min read",
    author: "Amos Shibutse"
  },
  {
    slug: "drone-mapping-transforming-surveying",
    title: "How Drone Mapping is Transforming Surveying",
    excerpt: "RTK-enabled drone technology is rewriting the rulebook for large-scale topographical mapping, delivering superior orthomosaics with rapid turnaround times.",
    content: "The introduction of autonomous aerial technology armed with high-fidelity LiDAR and photogrammetry has completely shifted the engineering landscape. A survey that previously took a 5-man crew three weeks through treacherous terrain can now be completed autonomously in under 48 hours.\n\nDrone mapping is not merely an alternative; it is the new standard for topographic rendering, delivering thousands of measurable points per square meter as opposed to localized traditional stakes.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80",
    category: "Technology",
    date: "Aug 30, 2026",
    readingTime: "3 min read",
    author: "George Omusotsi"
  },
  {
    slug: "gpr-precision-survey",
    title: "GPR Precision Survey in Nairobi",
    excerpt: "Our team recently completed a high-precision Ground Penetrating Radar survey for a major urban utility project, ensuring zero damage to existing infrastructure.",
    content: "Detecting underground utilities is critical for urban development. Using Ground Penetrating Radar (GPR), we mapped historical pipelines and electrical conduits in Nairobi's Central Business District. This activity protected millions of shillings in existing infrastructure and allowed the contractor to proceed with confidence.",
    image: "/images/ground-penetrating-radar.png",
    category: "Field Activity",
    date: "Mar 20, 2026",
    readingTime: "2 min read",
    author: "Field Operations Team"
  },
  {
    slug: "national-surveyors-conference",
    title: "National Surveyor's Conference 2026",
    excerpt: "Cherith GeoSystems led the discussion on drone mapping ethics and standards during the annual national surveyors' gathering in Kisumu.",
    content: "Innovation in surveying must be balanced with ethics. At the National Surveyor's Conference 2026, we presented a white paper on the responsible use of high-resolution drone data and the imperative for cross-county standards in cadastral digitization.",
    image: "/images/corporate-office and consultation.jpg",
    category: "Industry Event",
    date: "Mar 15, 2026",
    readingTime: "3 min read",
    author: "Cherith Executives"
  },
  {
    slug: "gis-web-portal-masterclass",
    title: "GIS Web Portal Masterclass",
    excerpt: "Training our partners on the new features of the Cherith GIS Web Portal, enabling real-time spatial data analysis for infrastructure planning.",
    content: "Data is useless if it's not accessible. In our recent masterclass, we onboarded 15 infrastructure developers to our proprietary GIS Web Portal, demonstrating how real-time spatial layers can revolutionize project timelines and stakeholder coordination.",
    image: "/images/large-team field coordination.png",
    category: "Workshops",
    date: "Mar 10, 2026",
    readingTime: "5 min read",
    author: "GIS Department"
  }
];
