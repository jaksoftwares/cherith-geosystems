-- ==========================================================
-- CHERITH GEOSYSTEMS - BLOG POSTS SEED DATA
-- ==========================================================
-- This script safely inserts 4 professional blog posts.
-- If a post with the same slug already exists, it updates it.

INSERT INTO blog_posts (title, slug, excerpt, content, author, category, reading_time, cover_image_url, featured, published, published_at)
VALUES
(
  'The Future of Drone Surveying in Kenya', 
  'future-of-drone-surveying',
  'How UAV technology is revolutionizing topographical mapping and reducing project timelines in East Africa.',
  '# The Drone Revolution in Surveying

Traditional surveying methods in Kenya have long relied on terrestrial techniques. However, the advent of Unmanned Aerial Vehicles (UAVs) is rapidly changing the landscape. 

## Key Benefits of Drone Surveying
1. **Speed and Efficiency:** Drones can cover hundreds of acres in a fraction of the time it takes ground teams.
2. **Enhanced Safety:** Surveying hazardous or hard-to-reach terrain is no longer a risk.
3. **High-Resolution Data:** Modern LiDAR and photogrammetry payloads provide millimeter-level accuracy.

At Cherith GeoSystems, we are fully licensed by the KCAA to conduct commercial drone operations, ensuring your projects are executed legally, safely, and efficiently.',
  'Dr. James Ochieng', 
  'Drone', 
  '5 min read',
  'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1920&auto=format&fit=crop',
  true, 
  true, 
  NOW() - INTERVAL '2 days'
),
(
  'Understanding Cadastral Boundaries', 
  'understanding-cadastral-boundaries',
  'A comprehensive guide to property boundaries, land disputes, and the importance of accurate cadastral surveying.',
  '# Securing Your Land with Cadastral Surveys

Land ownership in Kenya is a critical asset, yet boundary disputes remain a common challenge. A cadastral survey is the only legally recognized method to establish property lines.

## Why You Need a Cadastral Survey
- **Buying or Selling Land:** Ensure you are purchasing the exact acreage stated on the title deed.
- **Subdivisions:** Legally divide a larger parcel into smaller, titled plots.
- **Dispute Resolution:** Settle boundary arguments with neighbors using irrefutable geographical data.

Cherith GeoSystems employs licensed surveyors recognized by the Institution of Surveyors of Kenya (ISK), guaranteeing that all boundary data holds up in legal proceedings.',
  'Sarah Wanjiku', 
  'Surveying', 
  '4 min read',
  'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1920&auto=format&fit=crop',
  false, 
  true, 
  NOW() - INTERVAL '5 days'
),
(
  'Integrating GIS for Urban Planning', 
  'gis-for-urban-planning',
  'How Geographic Information Systems are helping county governments plan sustainable smart cities.',
  '# Smart Cities Powered by GIS

As urbanization accelerates across Kenyan counties, city planners are turning to Geographic Information Systems (GIS) to design sustainable infrastructure.

## The Role of Spatial Data
GIS allows planners to layer multiple data sets—such as population density, water networks, and topography—onto a single digital map. 

By analyzing these spatial relationships, governments can:
- Optimize waste management routes.
- Identify flood-prone zones for better drainage planning.
- Plan road networks that minimize traffic congestion.

At Cherith GeoSystems, we provide end-to-end GIS consulting, helping municipalities transform raw data into actionable urban strategies.',
  'David Kiprono', 
  'Geospatial', 
  '6 min read',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
  false, 
  true, 
  NOW() - INTERVAL '10 days'
),
(
  'Case Study: Mombasa Port Expansion', 
  'case-study-mombasa-port',
  'A deep dive into how Cherith GeoSystems provided bathymetric and topographical data for the port expansion project.',
  '# Engineering the Future of Mombasa Port

The expansion of the Mombasa Port required highly accurate spatial data, spanning both land and underwater terrain. 

## The Challenge
The engineering contractors needed precise bathymetric (underwater) surveys combined with terrestrial topography to model the dredging requirements and design the new berths.

## Our Solution
Cherith GeoSystems deployed a hybrid approach:
1. **Bathymetric Drones:** Unmanned Surface Vehicles (USVs) mapped the sea floor.
2. **Terrestrial LiDAR:** High-density laser scanners modeled the existing port infrastructure.

**Result:** The integrated 3D model was delivered 2 weeks ahead of schedule, allowing the engineering team to optimize their dredging volumes and save millions in construction costs.',
  'Cherith Engineering Team', 
  'Case Study', 
  '8 min read',
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920&auto=format&fit=crop',
  true, 
  true, 
  NOW() - INTERVAL '15 days'
)
ON CONFLICT (slug) 
DO UPDATE SET 
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  cover_image_url = EXCLUDED.cover_image_url,
  featured = EXCLUDED.featured,
  published = EXCLUDED.published;
