-- =========================================================================================
-- PROJECTS SEED DATA (UPSERT)
-- =========================================================================================
-- This script safely upserts the flagship projects into the Supabase database.
-- It avoids hardcoded UUIDs and handles conflicts via the unique 'slug' field.
-- It also avoids naïve string parser errors by not using restricted SQL keywords inside literals.

DO $$
BEGIN

  -- 1. JKIA Airport Topographical Survey
  INSERT INTO projects (
    title, slug, description, full_description, location, client, year, image_url, featured, technical_specs, category
  ) VALUES (
    'JKIA Airport Topographical Survey',
    'jkia-airport-survey',
    'Extensive and highly detailed mapping executing precision leveling and contouring to support major air-side infrastructure planning and rapid terminal development.',
    'Cherith GeoSystems was commissioned to provide high-precision topographical data for the expansion of Jomo Kenyatta International Airport. Our team deployed multiple RTK-enabled GPS units and advanced Total Stations to map the complex air-side terrain, including runways, taxiways, and utility corridors.

The resulting digital terrain models were critical for the engineering design phase, ensuring structural alignment and drainage efficiency for new terminal structures. Working within the airport environment required strict safety protocols and coordination with aviation authorities.',
    'Nairobi, Kenya',
    'Kenya Airports Authority',
    '2026',
    '/images/infrastructureproject.png',
    true,
    '[{"label": "Area Covered", "value": "450 Hectares"}, {"label": "Vertical Accuracy", "value": "±5mm"}, {"label": "Methodology", "value": "RTK GPS & Total Station"}, {"label": "Output", "value": "3D CAD & Digital Terrain Model"}]'::jsonb,
    'Infrastructure'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    full_description = EXCLUDED.full_description,
    location = EXCLUDED.location,
    client = EXCLUDED.client,
    year = EXCLUDED.year,
    image_url = EXCLUDED.image_url,
    featured = EXCLUDED.featured,
    technical_specs = EXCLUDED.technical_specs,
    category = EXCLUDED.category;

  -- 2. UNHCR GIS Regional Support Operations
  INSERT INTO projects (
    title, slug, description, full_description, location, client, year, image_url, featured, technical_specs, category
  ) VALUES (
    'UNHCR GIS Regional Support Operations',
    'unhcr-gis-support',
    'Advanced Geographic Information Systems (GIS) deployed to optimize regional humanitarian operations.',
    'Our regional GIS support for UNHCR involved the creation of a unified spatial framework for managing refugee settlement operations. We integrated diverse data sources, including satellite imagery and field surveys, to provide real-time mapping of resources, infrastructure, and population movements across East and Central Africa.

This digital transformation enabled faster decision-making and more efficient resource allocation for global humanitarian efforts. Our team provided ongoing technical support and training for UNHCR field staff to ensure data continuity.',
    'East & Central Africa',
    'UN Refugee Agency (UNHCR)',
    '2025',
    '/images/GIS-data-presentation.png',
    true,
    '[{"label": "Data Layers", "value": "50+ Complex Spatial Layers"}, {"label": "Platforms", "value": "ArcGIS & Custom Web Portals"}, {"label": "Reach", "value": "East & Central Africa Region"}, {"label": "Analysis", "value": "Predictive Resource Modeling"}]'::jsonb,
    'GIS'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    full_description = EXCLUDED.full_description,
    location = EXCLUDED.location,
    client = EXCLUDED.client,
    year = EXCLUDED.year,
    image_url = EXCLUDED.image_url,
    featured = EXCLUDED.featured,
    technical_specs = EXCLUDED.technical_specs,
    category = EXCLUDED.category;

  -- 3. Maasai Mara Drone Mapping
  INSERT INTO projects (
    title, slug, description, full_description, location, client, year, image_url, featured, technical_specs, category
  ) VALUES (
    'Maasai Mara Drone Mapping',
    'maasai-mara-drone-mapping',
    'Large-scale remote sensing leveraging RTK-enabled drone technology.',
    'This project utilized advanced fixed-wing and multi-rotor drones to capture ultra-high-resolution imagery of 800 acres in the Maasai Mara ecosystem. By leveraging RTK technology, we achieved centimeter-level accuracy without the need for extensive ground control in difficult terrain.

The output included high-fidelity orthomosaics and precise contour maps, which are now being used for sustainable land-use planning and environmental conservation audits. This high-resolution data set allows for meticulous tracking of land changes and habitat health.',
    'Maasai Mara',
    'Conservation Partner',
    '2026',
    '/images/drone-mapping2.jpg',
    true,
    '[{"label": "Flight Altitude", "value": "120 Meters"}, {"label": "Resolution", "value": "2.5 cm/pixel"}, {"label": "Data Size", "value": "45 GB Raw Data"}, {"label": "Timeframe", "value": "48 Hours Deployment"}]'::jsonb,
    'Remote Sensing'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    full_description = EXCLUDED.full_description,
    location = EXCLUDED.location,
    client = EXCLUDED.client,
    year = EXCLUDED.year,
    image_url = EXCLUDED.image_url,
    featured = EXCLUDED.featured,
    technical_specs = EXCLUDED.technical_specs,
    category = EXCLUDED.category;

  -- 4. UN Gigiri Infrastructure Project
  INSERT INTO projects (
    title, slug, description, full_description, location, client, year, image_url, featured, technical_specs, category
  ) VALUES (
    'UN Gigiri Infrastructure Project',
    'un-gigiri-infrastructure',
    'High-stakes cadastral setting-out works and precise infrastructure leveling at the vast United Nations complex.',
    'We provided comprehensive engineering survey services for major infrastructure upgrades within the UN Gigiri Complex. Our responsibilities included precise setting-out for building foundations, underground utility verification, and high-precision leveling for new drainage systems.

Working within a high-security environment and sensitive ecological zones, our team maintained strict data integrity and site standards throughout the projects multi-phase execution. The project ensured that all new structures were perfectly aligned with the existing master plan.',
    'Nairobi, Kenya',
    'United Nations (UNON)',
    '2025',
    '/images/Highrisebuildingcheck.png',
    true,
    '[{"label": "Precision Range", "value": "Millimeter Scale"}, {"label": "Deliverables", "value": "As-Built Survey Reports"}, {"label": "Staffing", "value": "Senior Engineering Surveyors"}, {"label": "Status", "value": "Ongoing Support"}]'::jsonb,
    'Engineering'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    full_description = EXCLUDED.full_description,
    location = EXCLUDED.location,
    client = EXCLUDED.client,
    year = EXCLUDED.year,
    image_url = EXCLUDED.image_url,
    featured = EXCLUDED.featured,
    technical_specs = EXCLUDED.technical_specs,
    category = EXCLUDED.category;

  -- 5. GPR Utility Mapping
  INSERT INTO projects (
    title, slug, description, full_description, location, client, year, image_url, featured, technical_specs, category
  ) VALUES (
    'GPR Utility Mapping',
    'gpr-nairobi-utility',
    'Subsurface utility mapping using Ground Penetrating Radar to locate high-voltage cables and fiber optic lines prior to road expansion.',
    'To prevent accidental damage during road construction in Nairobi Central Business District, Cherith GeoSystems deployed Ground Penetrating Radar (GPR) to map critical underground utilities. We successfully identified high-voltage electricity lines, fiber cables, and water mains that were not accounted for in outdated records.

This proactive mapping prevented millions of shillings in potential damage and service disruptions. The detailed utility maps were integrated into the road contractors construction plans for safe excavation.',
    'Nairobi CBD',
    'Urban Infrastructure Contractor',
    '2026',
    '/images/ground-penetrating-radar.png',
    false,
    '[{"label": "GPR Frequency", "value": "400MHz / 900MHz Dual Band"}, {"label": "Max Depth", "value": "5.0 Meters"}, {"label": "Data Quality", "value": "High-Res Subsurface Profile"}, {"label": "Turnaround", "value": "Real-time Field Marking"}]'::jsonb,
    'GPR'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    full_description = EXCLUDED.full_description,
    location = EXCLUDED.location,
    client = EXCLUDED.client,
    year = EXCLUDED.year,
    image_url = EXCLUDED.image_url,
    featured = EXCLUDED.featured,
    technical_specs = EXCLUDED.technical_specs,
    category = EXCLUDED.category;

END $$;
