export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: "Infrastructure" | "GIS" | "Remote Sensing" | "Engineering" | "Cadastral" | "GPR";
  location: string;
  year: string;
  client: string;
  featured?: boolean;
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
}

export const projectsData: Project[] = [
  {
    slug: "jkia-airport-survey",
    title: "JKIA Airport Topographical Survey",
    description: "Extensive and highly detailed mapping executing precision leveling and contouring to support major air-side infrastructure planning and rapid terminal development at Kenya's primary international aviation hub.",
    fullDescription: "Cherith GeoSystems was commissioned to provide high-precision topographical data for the expansion of Jomo Kenyatta International Airport. Our team deployed multiple RTK-enabled GPS units and advanced Total Stations to map the complex air-side terrain, including runways, taxiways, and utility corridors. The resulting digital terrain models were critical for the engineering design phase, ensuring structural alignment and drainage efficiency for new terminal structures.",
    image: "/images/infrastructureproject.png",
    category: "Infrastructure",
    location: "Nairobi, Kenya",
    year: "2026",
    client: "Kenya Airports Authority",
    featured: true,
    technicalSpecs: [
      { label: "Area Covered", value: "450 Hectares" },
      { label: "Vertical Accuracy", value: "±5mm" },
      { label: "Methodology", value: "RTK GPS & Total Station" },
      { label: "Output", value: "3D CAD & Digital Terrain Model" }
    ]
  },
  {
    slug: "unhcr-gis-support",
    title: "UNHCR GIS Regional Support Operations",
    description: "Advanced Geographic Information Systems (GIS) deployed to optimize regional humanitarian operations. Provided meticulous data layering across East and Central Africa to support mass displaced population planning.",
    fullDescription: "Our regional GIS support for UNHCR involved the creation of a unified spatial framework for managing refugee settlement operations. We integrated diverse data sources, including satellite imagery and field surveys, to provide real-time mapping of resources, infrastructure, and population movements across East and Central Africa. This digital transformation enabled faster decision-making and more efficient resource allocation for global humanitarian efforts.",
    image: "/images/GIS-data-presentation.png",
    category: "GIS",
    location: "East & Central Africa",
    year: "2025",
    client: "UN Refugee Agency (UNHCR)",
    featured: true,
    technicalSpecs: [
      { label: "Data Layers", value: "50+ Complex Spatial Layers" },
      { label: "Platforms", value: "ArcGIS & Custom Web Portals" },
      { label: "Reach", value: "East & Central Africa Region" },
      { label: "Analysis", value: "Predictive Resource Modeling" }
    ]
  },
  {
    slug: "maasai-mara-drone-mapping",
    title: "800-Acre Drone Mapping",
    description: "Large-scale remote sensing leveraging RTK-enabled drone technology. Captured high-resolution true orthomosaics and digital elevation maps enabling strict land-use planning and ecological conservation mapping.",
    fullDescription: "This project utilized advanced fixed-wing and multi-rotor drones to capture ultra-high-resolution imagery of 800 acres in the Maasai Mara ecosystem. By leveraging RTK technology, we achieved centimeter-level accuracy without the need for extensive ground control in difficult terrain. The output included high-fidelity orthomosaics and precise contour maps, which are now being used for sustainable land-use planning and environmental conservation audits.",
    image: "/images/drone-mapping2.jpg",
    category: "Remote Sensing",
    location: "Maasai Mara",
    year: "2026",
    client: "Conservation Partner",
    featured: true,
    technicalSpecs: [
      { label: "Flight Altitude", value: "120 Meters" },
      { label: "Resolution", value: "2.5 cm/pixel" },
      { label: "Data Size", value: "45 GB Raw Data" },
      { label: "Timeframe", value: "48 Hours Deployment" }
    ]
  },
  {
    slug: "un-gigiri-infrastructure",
    title: "UN Gigiri Infrastructure Project",
    description: "High-stakes cadastral setting-out works and precise infrastructure leveling at the vast United Nations complex, ensuring structural alignment and strict compliance within an environmentally sensitive perimeter.",
    fullDescription: "We provided comprehensive engineering survey services for major infrastructure upgrades within the UN Gigiri Complex. Our responsibilities included precise setting-out for building foundations, underground utility verification, and high-precision leveling for new drainage systems. Working within a high-security environment and sensitive ecological zones, our team maintained strict data integrity and site standards throughout the project's multi-phase execution.",
    image: "/images/Highrisebuildingcheck.png",
    category: "Engineering",
    location: "Nairobi, Kenya",
    year: "2025",
    client: "United Nations (UNON)",
    featured: true,
    technicalSpecs: [
      { label: "Precision Range", value: "Millimeter Scale" },
      { label: "Deliverables", value: "As-Built Survey Reports" },
      { label: "Staffing", value: "Senior Engineering Surveyors" },
      { label: "Status", value: "Ongoing Support" }
    ]
  },
  {
    slug: "gpr-nairobi-utility",
    title: "GPR Utility Mapping",
    description: "Subsurface utility mapping using Ground Penetrating Radar to locate high-voltage cables and fiber optic lines prior to road expansion.",
    fullDescription: "To prevent accidental damage during road construction in Nairobi's Central Business District, Cherith GeoSystems deployed Ground Penetrating Radar (GPR) to map critical underground utilities. We successfully identified high-voltage electricity lines, fiber cables, and water mains that were not accounted for in outdated records. This proactive mapping prevented millions of shillings in potential damage and service disruptions.",
    image: "/images/ground-penetrating-radar.png",
    category: "GPR",
    location: "Nairobi CBD",
    year: "2026",
    client: "Urban Infrastructure Contractor",
    technicalSpecs: [
      { label: "GPR Frequency", value: "400MHz / 900MHz Dual Band" },
      { label: "Max Depth", value: "5.0 Meters" },
      { label: "Data Quality", value: "High-Res Subsurface Profile" },
      { label: "Turnaround", value: "Real-time Field Marking" }
    ]
  }
];
