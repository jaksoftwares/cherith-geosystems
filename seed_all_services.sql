-- ==========================================================
-- CHERITH GEOSYSTEMS - COMPLETE SERVICES SEED SCRIPT
-- This script ensures all 7 core services are perfectly seeded
-- using dynamic subqueries to avoid hardcoding Category UUIDs.
-- ==========================================================

-- 1. Ensure Categories exist (Safe upsert based on unique slug)
INSERT INTO service_categories (name, slug, description, icon_name, position) 
VALUES
  ('Land & Engineering', 'surveying', 'Accurate surveying solutions for land and infrastructure.', 'Map', 1),
  ('Geospatial & Analysis', 'gis', 'Advanced GIS and spatial data integration services.', 'Database', 2),
  ('Tech & Planning', 'tech', 'Digital mapping platforms and project reporting.', 'Cpu', 3)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name;

-- 2. Clear existing services to prevent duplicates during re-seeding
DELETE FROM services;

-- 3. Insert All 7 Services with Rich JSONB Sub-Services using Subqueries for category_id
INSERT INTO services (category_id, title, slug, short_description, content, image_url, sub_services, position) 
VALUES
  (
    (SELECT id FROM service_categories WHERE slug = 'surveying'), 
    'Land (Cadastral) Surveys', 
    'land-cadastral-surveys', 
    'Legally compliant boundary resolutions and land administrations.',
    'Detailed content regarding cadastral surveys...',
    '/images/services/land-cadastral/land-demarcation2.png',
    '[
      {"name": "Subdivision & Amalgamation", "image": "/images/services/land-cadastral/subdivision&amalgamation.png"},
      {"name": "Boundary Verification", "image": "/images/services/land-cadastral/boundary-verification.png"},
      {"name": "Land Demarcation", "image": "/images/services/land-cadastral/land-demarcation1.png"},
      {"name": "Forensic & Dispute Surveys", "image": "/images/services/land-cadastral/forensics&dispute.png"}
    ]'::jsonb,
    1
  ),
  (
    (SELECT id FROM service_categories WHERE slug = 'surveying'), 
    'Engineering & Topographical Surveys', 
    'engineering-topographical-surveys', 
    'Terrain mapping and alignments for infrastructure projects.',
    'Detailed content regarding engineering surveys...',
    '/images/services/engineering%26topographical/engineering%26topographicalsurvey.png',
    '[
      {"name": "Topographical Mapping", "image": "/images/services/engineering%26topographical/topographicalmapping1.png"},
      {"name": "Setting-Out Services", "image": "/images/services/engineering%26topographical/settingoutservices.png"},
      {"name": "Control Surveys", "image": "/images/services/engineering%26topographical/controlsurveys.png"},
      {"name": "Leveling & Verticality", "image": "/images/services/engineering%26topographical/leveling%26verticality.png"}
    ]'::jsonb,
    2
  ),
  (
    (SELECT id FROM service_categories WHERE slug = 'gis'), 
    'GIS Data & Spatial Analysis', 
    'gis-data-integration', 
    'Transforming raw geospatial data to advanced interactive insights designed to fuel confident regional planning.',
    'Detailed content regarding GIS Analysis...',
    '/images/services/gis%26spatial-analysis/gid-hero.png',
    '[
      {"name": "GIS Database Development", "image": "/images/services/gis%26spatial-analysis/gis-database-development1.png"},
      {"name": "Spatial Modeling", "image": "/images/services/gis%26spatial-analysis/spatial-modelling.png"},
      {"name": "Decision-Support Systems", "image": "/images/services/gis%26spatial-analysis/decision-support1.png"},
      {"name": "Interactive Dashboards", "image": "/images/services/gis%26spatial-analysis/interactive-gis-dashboard.png"}
    ]'::jsonb,
    3
  ),
  (
    (SELECT id FROM service_categories WHERE slug = 'gis'), 
    'Remote Sensing & Environment', 
    'remote-sensing', 
    'Advanced satellite and drone analytics enabling vast-scale environmental surveillance and conservation efforts.',
    'Detailed content regarding Remote Sensing...',
    '/images/services/remote-sensing%26enviroment/remote-sensing-enviroment-hero.png',
    '[
      {"name": "Environmental Monitoring", "image": "/images/services/remote-sensing%26enviroment/enviromental-monitoring1.png"},
      {"name": "Conservation Planning", "image": "/images/services/remote-sensing%26enviroment/conservation-planning2.png"},
      {"name": "Large-Scale Mapping", "image": "/images/services/remote-sensing%26enviroment/large-scale-mapping.png"},
      {"name": "Land & Climate Analysis", "image": "/images/services/remote-sensing%26enviroment/land%26climate.png"},
      {"name": "Multi-terrain Modeling", "image": "/images/services/remote-sensing%26enviroment/multiterrain.png"}
    ]'::jsonb,
    4
  ),
  (
    (SELECT id FROM service_categories WHERE slug = 'surveying'), 
    'Underground Utility Mapping (GPR)', 
    'underground-utility-mapping', 
    'Detect map and secure critical hidden infrastructures using high-tech Ground Penetrating Radar technology.',
    'Detailed content regarding GPR...',
    '/images/services/underground-utility-gpr/undeground-detection-hero.png',
    '[
      {"name": "Pipeline Detection", "image": "/images/services/underground-utility-gpr/pipeline-detection%201.png"},
      {"name": "Underground Cables", "image": "/images/services/underground-utility-gpr/underground-cables.png"},
      {"name": "Hidden Infrastructure", "image": "/images/services/underground-utility-gpr/hidden-infrastructure.png"},
      {"name": "Pre-construction Safety", "image": "/images/services/underground-utility-gpr/preconstruction-safety.png"},
      {"name": "Data Interpretation", "image": "/images/services/underground-utility-gpr/data-interpretation.png"}
    ]'::jsonb,
    5
  ),
  (
    (SELECT id FROM service_categories WHERE slug = 'tech'), 
    'Geoportal & Web GIS Development', 
    'geoportal-development', 
    'Enterprise interactive mapping platforms and dynamic GIS dashboards designed for real-time spatial data access and visualization.',
    'Detailed content regarding Web GIS...',
    '/images/services/geo-portal%26gis/geoportal-main.png',
    '[
      {"name": "Interactive Mapping Platforms", "image": "/images/services/geo-portal%26gis/interactive-mapping1.png"},
      {"name": "Dynamic GIS Dashboards", "image": "/images/services/geo-portal%26gis/gis-dashboard1.png"},
      {"name": "Custom Geoportals", "image": "/images/services/geo-portal%26gis/custom-geoportal.png"},
      {"name": "Enterprise Mapping Solutions", "image": "/images/services/geo-portal%26gis/enterprise-mapping.png"},
      {"name": "Real-time Monitoring", "image": "/images/services/geo-portal%26gis/real-time-mapping.png"}
    ]'::jsonb,
    6
  ),
  (
    (SELECT id FROM service_categories WHERE slug = 'tech'), 
    'Planning & Technical Reporting', 
    'project-planning', 
    'Comprehensive survey data structuring and highly detailed engineering reporting tailored for stakeholders.',
    'Detailed content regarding planning...',
    '/images/services/planning%26technicalreporting/planning%26reporting-hero.png',
    '[
      {"name": "Survey Planning", "image": "/images/services/planning%26technicalreporting/survey-planning.png"},
      {"name": "Data Processing", "image": "/images/services/planning%26technicalreporting/data-processing.png"},
      {"name": "Technical Reporting", "image": "/images/services/planning%26technicalreporting/technical-reporting.png"},
      {"name": "Documentation Review", "image": "/images/services/planning%26technicalreporting/documentation-review.png"},
      {"name": "End-to-End Workflow", "image": "/images/services/planning%26technicalreporting/end-to-end-workflow.png"}
    ]'::jsonb,
    7
  );
