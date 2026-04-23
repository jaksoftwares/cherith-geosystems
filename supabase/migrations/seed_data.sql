-- ==========================================================
-- CHERITH GEOSYSTEMS - ULTIMATE COMPREHENSIVE SEED DATA
-- ==========================================================

-- 1. HERO SLIDES
INSERT INTO hero_slides (image_url, alt_text, title, subtitle, position) VALUES
('/images/panoramic-landmapping.png', 'Aerial view mapping', 'Mapping Possibilities.', 'Defining Precision.', 1),
('/images/drone-mapping.jpg', 'Advanced drone surveys', 'High-Fidelity Remote Sensing', 'Centimeter-level accuracy from the sky.', 2),
('/images/infrastructureproject.png', 'Infrastructure development', 'Powering Infrastructure', 'Accurate data for the continent''s biggest projects.', 3),
('/images/urban-engineering-survey.jpg', 'Urban engineering precision', 'Urban Excellence', 'Navigating complex city layouts with ease.', 4),
('/images/roadconstructionsurveys.jpg', 'Road construction surveying', 'Built on Data', 'Supporting road and rail construction across Kenya.', 5);

-- 2. CORE FEATURES
INSERT INTO features (title, description, icon_name, position) VALUES
('Proven Expertise', 'Over 19 years of delivering high-quality geospatial solutions across East Africa.', 'ShieldCheck', 1),
('Advanced Technology', 'We utilize industry-leading tools including RTK GPS, Total Stations, and GIS platforms.', 'Crosshair', 2),
('Trusted Partners', 'We’ve worked with organizations such as UN agencies, IGAD, and leading private sector clients.', 'Users', 3),
('Nationwide Coverage', 'Serving clients across all 47 counties in Kenya with rapid deployment.', 'Map', 4);

-- 3. PARTNERS
INSERT INTO partners (name, subtitle, position) VALUES
('United Nations', 'Global Strategic Partner', 1),
('UNHCR', 'Regional GIS Support Operations', 2),
('IGAD', 'Intergovernmental Authority on Development', 3),
('Kenya Airports Authority', 'Aviation Infrastructure Mapping', 4),
('Maasai Mara', 'Conservation & Land Use Planning', 5),
('Equity Bank', 'Asset & Land Verification', 6),
('KCB Bank', 'Financial Due Diligence', 7),
('Nairobi City County', 'Urban Planning & Cadastral Support', 8),
('Isiolo County', 'Regional Land Administration', 9);

-- 4. TESTIMONIALS
INSERT INTO testimonials (name, role, content, avatar_url, rating, position) VALUES
('Eng. Samuel Kojo', 'Senior Project Manager, BuildRight Construction', 'Cherith GeoSystems provided exceptional accuracy in our latest infrastructure project. Their topographic surveys and underground mapping were critical for our foundation planning.', '/images/testimonial_1.png', 5, 1),
('Sarah Mwangi', 'Lead Architect, Urban Design Studio', 'The level of detail in their GIS analysis and 3D terrain models has transformed our site planning phase. They are truly professional and always deliver on time.', '/images/testimonial_2.png', 5, 2),
('James Odhiambo', 'CEO, Eastlands Real Estate Developers', 'Working with Cherith for our large-scale land subdivision was seamless. Their cadastral survey expertise and handling of government documentation save us months of delays.', '/images/testimonial_3.png', 5, 3),
('Dr. Linda Amenya', 'Environmental Consultant, GreenEarth Africa', 'Their remote sensing and drone mapping capabilities are top-tier. We''ve used their insights for several environmental impact assessments with great success.', '/images/testimonial_4.png', 5, 4);

-- 5. LEADERSHIP
INSERT INTO leadership (name, role, qualifications, memberships, image_url, position) VALUES
('Okusimba George Omusotsi', 'Director', ARRAY['BSc (Surveying)', 'MSc (GIS)', 'PhD (Environmental Planning)'], 'Full Member, Institution of Surveyors of Kenya (ISK)', 'https://ui-avatars.com/api/?name=Okusimba+George+Omusotsi&background=263678&color=fff&size=512', 1),
('Ilavonga Amos Shibutse', 'Lead Consultant', ARRAY['BSc (Surveying)', 'MSc (GIS)'], 'Associate Member, Institution of Surveyors of Kenya (ISK)', 'https://ui-avatars.com/api/?name=Ilavonga+Amos+Shibutse&background=E31B23&color=fff&size=512', 2);

-- 6. REGIONAL EXPERIENCE
INSERT INTO regional_experience (country, projects_count, details, expertise, position) VALUES
('Kenya', '400+', 'Nationwide coverage including major infrastructure like JKIA Airport and UN complexes.', ARRAY['Cadastral Surveying', 'Engineering Surveys', 'GPR', 'Web GIS'], 1),
('Rwanda', 'GIS Support', 'Regional spatial data integration and urban planning advisory services.', ARRAY['GIS Data Integration', 'Remote Sensing'], 2),
('Uganda', 'Cross-border Mapping', 'Supporting infrastructure development and topographic mapping for regional projects.', ARRAY['Topographic Surveys', 'GIS Modeling'], 3),
('Ethiopia', 'Regional Operations', 'Geospatial support for international agencies and regional infrastructure planning.', ARRAY['GIS Support', 'Asset Mapping'], 4),
('Eritrea', 'Specialized Surveys', 'Technical geospatial services for specialized regional development initiatives.', ARRAY['Environmental Monitoring', 'GIS'], 5),
('Burundi', 'Territorial Data Support', 'Contributing to regional GIS hubs and multi-lateral donor-funded projects.', ARRAY['Spatial Analysis', 'Mapping'], 6),
('South Africa', 'Technical Consultancy', 'High-level geospatial advisory and data verification for specialized industries.', ARRAY['Consultancy', 'Data Verification'], 7);

-- 7. INDUSTRIES
INSERT INTO industries (name, description, icon_name, position) VALUES
('Real Estate Development', 'Accurate land data for planning and development. We provide the foundation for residential and commercial growth.', 'Home', 1),
('Government & Public Sector', 'Supporting land administration and infrastructure projects at local and national levels.', 'Building', 2),
('Environmental & Conservation', 'Monitoring and managing natural resources using remote sensing and GIS.', 'Leaf', 3),
('Engineering & Construction', 'Providing critical survey data for project execution and structural integrity.', 'HardHat', 4),
('Financial Institutions', 'Due diligence and land verification services to mitigate risk in lending and investment.', 'Banknote', 5);

-- 8. ASSETS (Equipment & Software)
INSERT INTO assets_inventory (name, type, description) VALUES
('RTK GPS', 'equipment', 'High-precision Real-Time Kinematic Global Positioning System for centimeter-level accuracy.'),
('Total Stations', 'equipment', 'Electronic/optical instruments used for surveying and building construction.'),
('Ground Penetrating Radar (GPR)', 'equipment', 'High-tech detection for subsurface utility mapping.'),
('ArcGIS', 'software', 'Professional geographic information system for working with maps and geographic information.'),
('QGIS', 'software', 'Open-source desktop geographic information system application.'),
('AutoCAD Civil 3D', 'software', 'Civil engineering design and documentation software.'),
('ERDAS Imagine', 'software', 'Remote sensing application with raster graphics processing capabilities.');

-- 9. SERVICE CATEGORIES
INSERT INTO service_categories (id, name, slug, description, icon_name, position) VALUES
('b1a1a1a1-1111-1111-1111-111111111111', 'Land & Engineering', 'surveying', 'Accurate surveying solutions for land and infrastructure.', 'Map', 1),
('b2b2b2b2-2222-2222-2222-222222222222', 'Geospatial & Analysis', 'gis', 'Advanced GIS and spatial data integration services.', 'Database', 2),
('b3b3b3b3-3333-3333-3333-333333333333', 'Tech & Planning', 'tech', 'Digital mapping platforms and project reporting.', 'Cpu', 3);

-- 10. SERVICES (Detailed)
INSERT INTO services (category_id, title, slug, short_description, sub_services, image_url, position) VALUES
('b1a1a1a1-1111-1111-1111-111111111111', 'Land (Cadastral) Surveys', 'land-cadastral-surveys', 'Accurate and legally compliant land surveys ensuring definitive boundary resolutions and proper land administration.', 
'[
  {"name": "Subdivision & Amalgamation", "image": "/images/services/land-cadastral/subdivision&amalgamation.png"},
  {"name": "Boundary Verification", "image": "/images/services/land-cadastral/boundary-verification.png"},
  {"name": "Land Demarcation", "image": "/images/services/land-cadastral/land-demarcation1.png"},
  {"name": "Forensic & Dispute Surveys", "image": "/images/services/land-cadastral/forensics&dispute.png"}
]', '/images/services/land-cadastral/land-demarcation2.png', 1),

('b1a1a1a1-1111-1111-1111-111111111111', 'Engineering & Topo Surveys', 'engineering-topographical-surveys', 'Supporting complex infrastructure through precise terrain mapping and dimensional alignments.', 
'[
  {"name": "Topographical Mapping", "image": "/images/services/engineering%26topographical/topographicalmapping1.png"},
  {"name": "Setting-Out Services", "image": "/images/services/engineering%26topographical/settingoutservices.png"},
  {"name": "Control Surveys", "image": "/images/services/engineering%26topographical/controlsurveys.png"},
  {"name": "Leveling & Verticality", "image": "/images/services/engineering%26topographical/leveling%26verticality.png"}
]', '/images/services/engineering%26topographical/engineering%26topographicalsurvey.png', 2),

('b1a1a1a1-1111-1111-1111-111111111111', 'Underground Utility (GPR)', 'underground-utility-mapping', 'Detect, map, and secure critical hidden infrastructures using high-tech Ground Penetrating Radar technology.', 
'[
  {"name": "Pipeline Detection", "image": "/images/services/underground-utility-gpr/pipeline-detection%201.png"},
  {"name": "Underground Cables", "image": "/images/services/underground-utility-gpr/underground-cables.png"},
  {"name": "Hidden Infrastructure", "image": "/images/services/underground-utility-gpr/hidden-infrastructure.png"},
  {"name": "Pre-construction Safety", "image": "/images/services/underground-utility-gpr/preconstruction-safety.png"},
  {"name": "Data Interpretation", "image": "/images/services/underground-utility-gpr/data-interpretation.png"}
]', '/images/services/underground-utility-gpr/undeground-detection-hero.png', 3),

('b2b2b2b2-2222-2222-2222-222222222222', 'GIS & Spatial Analysis', 'gis-data-integration', 'Transforming raw geospatial data into powerful, interactive insights designed to fuel confident regional planning.', 
'[
  {"name": "GIS Database Development", "image": "/images/services/gis%26spatial-analysis/gis-database-development1.png"},
  {"name": "Spatial Modeling", "image": "/images/services/gis%26spatial-analysis/spatial-modelling.png"},
  {"name": "Decision-Support Systems", "image": "/images/services/gis%26spatial-analysis/decision-support1.png"},
  {"name": "Interactive Dashboards", "image": "/images/services/gis%26spatial-analysis/interactive-gis-dashboard.png"}
]', '/images/services/gis%26spatial-analysis/gid-hero.png', 4),

('b2b2b2b2-2222-2222-2222-222222222222', 'Remote Sensing & Monitoring', 'remote-sensing', 'Advanced satellite and drone analytics enabling vast-scale environmental surveillance and conservation efforts.', 
'[
  {"name": "Environmental Monitoring", "image": "/images/services/remote-sensing%26enviroment/enviromental-monitoring1.png"},
  {"name": "Conservation Planning", "image": "/images/services/remote-sensing%26enviroment/conservation-planning2.png"},
  {"name": "Large-Scale Mapping", "image": "/images/services/remote-sensing%26enviroment/large-scale-mapping.png"},
  {"name": "Land & Climate Analysis", "image": "/images/services/remote-sensing%26enviroment/land%26climate.png"},
  {"name": "Multi-terrain Modeling", "image": "/images/services/remote-sensing%26enviroment/multiterrain.png"}
]', '/images/services/remote-sensing%26enviroment/remote-sensing-enviroment-hero.png', 5),

('b3b3b3b3-3333-3333-3333-333333333333', 'Geoportal & Web GIS', 'geoportal-development', 'Enterprise interactive mapping platforms and dynamic GIS dashboards designed for real-time spatial data access.', 
'[
  {"name": "Interactive Mapping Platforms", "image": "/images/services/geo-portal%26gis/interactive-mapping1.png"},
  {"name": "Dynamic GIS Dashboards", "image": "/images/services/geo-portal%26gis/gis-dashboard1.png"},
  {"name": "Custom Geoportals", "image": "/images/services/geo-portal%26gis/custom-geoportal.png"},
  {"name": "Enterprise Mapping Solutions", "image": "/images/services/geo-portal%26gis/enterprise-mapping.png"},
  {"name": "Real-time Monitoring", "image": "/images/services/geo-portal%26gis/real-time-mapping.png"}
]', '/images/services/geo-portal%26gis/geoportal-main.png', 6),

('b3b3b3b3-3333-3333-3333-333333333333', 'Planning & Reporting', 'project-planning', 'Comprehensive survey data structuring and highly detailed engineering reporting tailored for stakeholders.', 
'[
  {"name": "Survey Planning", "image": "/images/services/planning%26technicalreporting/survey-planning.png"},
  {"name": "Data Processing", "image": "/images/services/planning%26technicalreporting/data-processing.png"},
  {"name": "Technical Reporting", "image": "/images/services/planning%26technicalreporting/technical-reporting.png"},
  {"name": "Documentation Review", "image": "/images/services/planning%26technicalreporting/documentation-review.png"},
  {"name": "End-to-End Workflow", "image": "/images/services/planning%26technicalreporting/end-to-end-workflow.png"}
]', '/images/services/planning%26technicalreporting/planning%26reporting-hero.png', 7);

-- 11. PROJECTS (Detailed)
INSERT INTO projects (title, slug, description, full_description, location, client, year, image_url, featured, technical_specs, category) VALUES
('JKIA Airport Topographical Survey', 'jkia-airport-survey', 'Extensive and highly detailed mapping executing precision leveling and contouring to support major air-side infrastructure planning and rapid terminal development.', 'Cherith GeoSystems was commissioned to provide high-precision topographical data for the expansion of Jomo Kenyatta International Airport. Our team deployed multiple RTK-enabled GPS units and advanced Total Stations to map the complex air-side terrain, including runways, taxiways, and utility corridors.\n\nThe resulting digital terrain models were critical for the engineering design phase, ensuring structural alignment and drainage efficiency for new terminal structures. Working within the airport environment required strict safety protocols and coordination with aviation authorities.', 'Nairobi, Kenya', 'Kenya Airports Authority', '2026', '/images/infrastructureproject.png', true, '[{"label": "Area Covered", "value": "450 Hectares"}, {"label": "Vertical Accuracy", "value": "±5mm"}, {"label": "Methodology", "value": "RTK GPS & Total Station"}, {"label": "Output", "value": "3D CAD & Digital Terrain Model"}]', 'Infrastructure'),
('UNHCR GIS Regional Support Operations', 'unhcr-gis-support', 'Advanced Geographic Information Systems (GIS) deployed to optimize regional humanitarian operations.', 'Our regional GIS support for UNHCR involved the creation of a unified spatial framework for managing refugee settlement operations. We integrated diverse data sources, including satellite imagery and field surveys, to provide real-time mapping of resources, infrastructure, and population movements across East and Central Africa.\n\nThis digital transformation enabled faster decision-making and more efficient resource allocation for global humanitarian efforts. Our team provided ongoing technical support and training for UNHCR field staff to ensure data continuity.', 'East & Central Africa', 'UN Refugee Agency (UNHCR)', '2025', '/images/GIS-data-presentation.png', true, '[{"label": "Data Layers", "value": "50+ Complex Spatial Layers"}, {"label": "Platforms", "value": "ArcGIS & Custom Web Portals"}, {"label": "Reach", "value": "East & Central Africa Region"}, {"label": "Analysis", "value": "Predictive Resource Modeling"}]', 'GIS'),
('Maasai Mara Drone Mapping', 'maasai-mara-drone-mapping', 'Large-scale remote sensing leveraging RTK-enabled drone technology.', 'This project utilized advanced fixed-wing and multi-rotor drones to capture ultra-high-resolution imagery of 800 acres in the Maasai Mara ecosystem. By leveraging RTK technology, we achieved centimeter-level accuracy without the need for extensive ground control in difficult terrain.\n\nThe output included high-fidelity orthomosaics and precise contour maps, which are now being used for sustainable land-use planning and environmental conservation audits. This high-resolution data set allows for meticulous tracking of land changes and habitat health.', 'Maasai Mara', 'Conservation Partner', '2026', '/images/drone-mapping2.jpg', true, '[{"label": "Flight Altitude", "value": "120 Meters"}, {"label": "Resolution", "value": "2.5 cm/pixel"}, {"label": "Data Size", "value": "45 GB Raw Data"}, {"label": "Timeframe", "value": "48 Hours Deployment"}]', 'Remote Sensing'),
('UN Gigiri Infrastructure Project', 'un-gigiri-infrastructure', 'High-stakes cadastral setting-out works and precise infrastructure leveling at the vast United Nations complex.', 'We provided comprehensive engineering survey services for major infrastructure upgrades within the UN Gigiri Complex. Our responsibilities included precise setting-out for building foundations, underground utility verification, and high-precision leveling for new drainage systems.\n\nWorking within a high-security environment and sensitive ecological zones, our team maintained strict data integrity and site standards throughout the project''s multi-phase execution. The project ensured that all new structures were perfectly aligned with the existing master plan.', 'Nairobi, Kenya', 'United Nations (UNON)', '2025', '/images/Highrisebuildingcheck.png', true, '[{"label": "Precision Range", "value": "Millimeter Scale"}, {"label": "Deliverables", "value": "As-Built Survey Reports"}, {"label": "Staffing", "value": "Senior Engineering Surveyors"}, {"label": "Status", "value": "Ongoing Support"}]', 'Engineering'),
('GPR Utility Mapping', 'gpr-nairobi-utility', 'Subsurface utility mapping using Ground Penetrating Radar to locate high-voltage cables and fiber optic lines prior to road expansion.', 'To prevent accidental damage during road construction in Nairobi''s Central Business District, Cherith GeoSystems deployed Ground Penetrating Radar (GPR) to map critical underground utilities. We successfully identified high-voltage electricity lines, fiber cables, and water mains that were not accounted for in outdated records.\n\nThis proactive mapping prevented millions of shillings in potential damage and service disruptions. The detailed utility maps were integrated into the road contractor''s construction plans for safe excavation.', 'Nairobi CBD', 'Urban Infrastructure Contractor', '2026', '/images/ground-penetrating-radar.png', false, '[{"label": "GPR Frequency", "value": "400MHz / 900MHz Dual Band"}, {"label": "Max Depth", "value": "5.0 Meters"}, {"label": "Data Quality", "value": "High-Res Subsurface Profile"}, {"label": "Turnaround", "value": "Real-time Field Marking"}]', 'GPR');

-- 12. BLOG POSTS (Full Content)
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, reading_time, cover_image_url, featured, published, published_at) VALUES
('Why Accurate Land Surveys Matter in Property Investment', 'accurate-land-surveys-property-investment', 'Discover how rigorous cadastral surveys drastically reduce legal disputes over boundaries and protect significant real estate capital investments in East Africa.', 'When significant real estate capital shifts hands, assuming boundary assumptions is a massive liability. Cadastral surveys definitively establish borders. In East Africa, rapid urbanization constantly pushes infrastructure boundaries against existing real estate limits.\n\nA meticulously precise survey prevents legal overlaps, defines zoning limitations rigorously, and secures the raw physical value of uncompromised development tracts. Property investors who skip this step often find themselves in years of litigation. At Cherith GeoSystems, our methodology eliminates these ambiguities. Every corner mapped is backed by legally defensible data that stands up in any court of law.', 'Ilavonga Amos Shibutse', 'Cadastral Surveying', '4 min read', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80', true, true, now()),
('The Role of GIS in Modern Infrastructure Development', 'role-of-gis-in-infrastructure', 'Exploring the integration of Geographic Information Systems in urban planning to ensure structural resilience and streamlined stakeholder engineering efforts.', 'Geographic Information Systems (GIS) go far beyond just cartography—they are absolute lifelines for modern architectural and structural planning. Using multi-layered spatial data, ministries and private contractors can visualize environmental constraints, structural histories, and hidden utilities prior to ground-breaking.\n\nA unified geospatial strategy drastically mitigates unforeseen engineering costs. The future of African infrastructure lies directly in the capacity to interact with land data well before cement is poured. By integrating population density, traffic patterns, and geological data, planners can create resilient systems that serve communities for decades.', 'Okusimba George Omusotsi', 'Spatial Analysis', '6 min read', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80', false, true, now()),
('Understanding Boundary Disputes and How to Resolve Them', 'understanding-boundary-disputes', 'A technical breakdown on utilizing forensic geospatial tools to re-establish property demarcations and settle complex legal land boundary conflicts.', 'Boundary disputes are expensive, emotionally exhaustive, and extremely detrimental to ongoing development schedules. Over 40% of civil property clashes originate from outdated or poorly executed survey maps inherited from preceding generations.\n\nThe initial step to resolution is forensic geospatial evaluation. Modern RTK alignment combined with historical map digitization can definitively reconstruct exact, uncontestable boundaries. Do not rely on physical markers—trust the unchangeable geographic coordinates. At Cherith, we provide the technical expertise to mediate and resolve these conflicts with high-precision data that provides absolute clarity.', 'Ilavonga Amos Shibutse', 'Legal Context', '5 min read', 'https://images.unsplash.com/photo-1541888126131-ab7bb7fb54ac?auto=format&fit=crop&q=80', false, true, now()),
('How Drone Mapping is Transforming Surveying', 'drone-mapping-transforming-surveying', 'RTK-enabled drone technology is rewriting the rulebook for large-scale topographical mapping, delivering superior orthomosaics with rapid turnaround times.', 'The introduction of autonomous aerial technology armed with high-fidelity LiDAR and photogrammetry has completely shifted the engineering landscape. A survey that previously took a 5-man crew three weeks through treacherous terrain can now be completed autonomously in under 48 hours.\n\nDrone mapping is not merely an alternative; it is the new standard for topographic rendering, delivering thousands of measurable points per square meter as opposed to localized traditional stakes. This level of detail provides an unmatched digital twin of the landscape for engineering and environmental analysis.', 'Okusimba George Omusotsi', 'Technology', '3 min read', 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80', false, true, now());

-- 13. SITE SETTINGS (Dynamic)
INSERT INTO site_settings (key, value) VALUES
('company_name', '"Cherith GeoSystems"'),
('company_full_name', '"Cherith Informatics & Mapping Ltd."'),
('tagline', '"Mapping Possibilities. Defining Precision."'),
('experience_years', '19'),
('combined_leadership_years', '38'),
('projects_completed', '400'),
('countries_reached', '8'),
('office_address', '"Olympic House, 1st Floor, Room 104, Nairobi, Kenya"'),
('office_phone', '"0722 300 565 / 0721 448 913"'),
('office_email', '"info@cherith.co.ke"'),
('contact_emails', '["amoshibutse@gmail.com", "gokusimba@gmail.com"]');
