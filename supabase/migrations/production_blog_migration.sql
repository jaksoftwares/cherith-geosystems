-- ==============================================================================
-- CHERITH GEOSYSTEMS: ENTERPRISE CMS PRODUCTION MIGRATION
-- ==============================================================================
-- Description: 
-- This script safely upgrades the production database for the new Enterprise 
-- Blog CMS. It is fully idempotent (safe to run multiple times). It will:
-- 1. Safely add the required SEO and Scheduling columns if they don't exist.
-- 2. Upgrade the 4 default seed articles to the new Rich Markdown format.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PART 1: SCHEMA UPGRADE
-- Safely adding the new columns to the blog_posts table.
-- ------------------------------------------------------------------------------
DO $$
BEGIN
    -- Add seo_title
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'seo_title') THEN
        ALTER TABLE blog_posts ADD COLUMN seo_title text;
    END IF;

    -- Add meta_description
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_description') THEN
        ALTER TABLE blog_posts ADD COLUMN meta_description text;
    END IF;

    -- Add tags
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'tags') THEN
        ALTER TABLE blog_posts ADD COLUMN tags jsonb DEFAULT '[]'::jsonb;
    END IF;

    -- Add scheduled_for
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'scheduled_for') THEN
        ALTER TABLE blog_posts ADD COLUMN scheduled_for timestamp with time zone;
    END IF;
END $$;


-- ------------------------------------------------------------------------------
-- PART 2: CONTENT UPGRADE
-- Upgrading existing plain-text articles to the new Markdown architecture.
-- ------------------------------------------------------------------------------

-- Update Article 1: Accurate Land Surveys
UPDATE blog_posts 
SET content = '## The Cost of Assumptions

When significant real estate capital shifts hands, assuming boundary assumptions is a massive liability. Cadastral surveys definitively establish borders. In East Africa, rapid urbanization constantly pushes infrastructure boundaries against existing real estate limits.

### Why Precision is Non-Negotiable

A meticulously precise survey prevents legal overlaps, defines zoning limitations rigorously, and secures the raw physical value of uncompromised development tracts. Property investors who skip this step often find themselves in years of litigation. 

* **Prevent Disputes:** Define exact borders.
* **Secure Value:** Map out usable terrain.

At Cherith GeoSystems, our methodology eliminates these ambiguities. Every corner mapped is backed by legally defensensible data that stands up in any court of law.'
WHERE slug = 'accurate-land-surveys-property-investment';


-- Update Article 2: Role of GIS
UPDATE blog_posts 
SET content = '## Beyond Cartography

Geographic Information Systems (GIS) go far beyond just cartography—they are absolute lifelines for modern architectural and structural planning. Using multi-layered spatial data, ministries and private contractors can visualize environmental constraints, structural histories, and hidden utilities prior to ground-breaking.

### The Future of African Infrastructure

A unified geospatial strategy drastically mitigates unforeseen engineering costs. The future of African infrastructure lies directly in the capacity to interact with land data well before cement is poured. 

> "By integrating population density, traffic patterns, and geological data, planners can create resilient systems that serve communities for decades."

Contact Cherith to integrate GIS into your next project.'
WHERE slug = 'role-of-gis-in-infrastructure';


-- Update Article 3: Boundary Disputes
UPDATE blog_posts 
SET content = '## The True Cost of Conflict

Boundary disputes are expensive, emotionally exhaustive, and extremely detrimental to ongoing development schedules. Over **40%** of civil property clashes originate from outdated or poorly executed survey maps inherited from preceding generations.

### Forensic Geospatial Evaluation

The initial step to resolution is forensic geospatial evaluation. Modern RTK alignment combined with historical map digitization can definitively reconstruct exact, uncontestable boundaries. 

1. Digitize historical maps.
2. Apply modern RTK alignment.
3. Establish unchangeable coordinates.

Do not rely on physical markers—trust the unchangeable geographic coordinates. At Cherith, we provide the technical expertise to mediate and resolve these conflicts with high-precision data that provides absolute clarity.'
WHERE slug = 'understanding-boundary-disputes';


-- Update Article 4: Drone Mapping
UPDATE blog_posts 
SET content = '## Autonomous Aerial Technology

The introduction of autonomous aerial technology armed with high-fidelity LiDAR and photogrammetry has completely shifted the engineering landscape. A survey that previously took a 5-man crew three weeks through treacherous terrain can now be completed autonomously in under **48 hours**.

### The New Standard

Drone mapping is not merely an alternative; it is the new standard for topographic rendering, delivering thousands of measurable points per square meter as opposed to localized traditional stakes. 

![Drone in flight](https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80)

This level of detail provides an unmatched digital twin of the landscape for engineering and environmental analysis.'
WHERE slug = 'drone-mapping-transforming-surveying';
