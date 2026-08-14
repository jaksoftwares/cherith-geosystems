# Services Module - Senior Engineer Implementation Plan

## 1. Deep Technical Audit & Current State Analysis
After reviewing the existing codebase, database schemas, and components, here is the exhaustive senior engineer audit of the current Services module:

### 1.1 Architecture & Schema Deviations
*   **Storefront Hardcoding**: The current storefront UI (`components/sections/services/services-list.tsx`) statically maps 7 services. It is disconnected from the Supabase backend.
*   **JSONB Sub-Services Discrepancy**: The database `services` table expects `sub_services` to be a `jsonb` array of objects: `[{ "name": "...", "image": "..." }]`. However, the hardcoded frontend uses a flat array of strings `["...", "..."]`. This causes a mismatch. We will standardize on the `jsonb` array of objects to unlock rich sub-service imagery.
*   **Relational Integrity**: The `services` table uses a `category_id` UUID mapping to the `service_categories` table. The frontend currently uses a hardcoded slug (`category: "surveying"`). The backend join must resolve this cleanly.
*   **Admin Disconnect**: The current `app/admin/services/page.tsx` uses a completely static `mockServices` array. The CRUD pipeline does not exist.

### 1.2 Identified Requirements for "End-to-End" Professional Grade Implementation
To make this module "engineer grade" and fully dynamic (including image manipulations):
1.  **Form State Management**: We must build a complex React state manager capable of handling a dynamic array of sub-services, where each sub-service can independently trigger a Cloudinary image upload and store its specific URL.
2.  **API Abstraction Layer**: We need typed API wrappers (`lib/api/services.ts`) that handle the `Category <-> Service` relational join.
3.  **Media Upload Pipeline**: Both the "Core Service Cover Image" and the "Sub-Service Images" must be hooked into the Cloudinary upload widget. The returned URLs must immediately pass through our new `optimizeImage()` utility.
4.  **Database Seeding**: An exact 1-to-1 mapping of the current frontend data must be seeded into Supabase so the Admin can manipulate existing data rather than starting from scratch.

---

## 2. Proposed System Architecture (End-to-End Execution)

### 2.1 Database Setup (Seed Execution)
I have already generated a precise SQL artifact: `seed_all_services.sql`.
*   This script safely upserts the 3 core categories (Land & Engineering, Geospatial & Analysis, Tech & Planning).
*   It perfectly inserts all 7 services exactly as they exist on the storefront, properly formatting the `sub_services` as a JSONB array of objects `{name, image}`.
*   **Action**: Once this plan is approved, I will run this SQL script against your local Supabase database.

### 2.2 API Layer (`lib/api/services.ts`)
We will create robust, strictly typed data-fetching functions:
*   `getCategories()`: Fetches all `service_categories` for the Admin form dropdown.
*   `getServices()`: Fetches all services with an inner join to fetch `category_name` and `icon_name`.
*   `getServiceById(id)`: Fetches a single service for the Edit form.

### 2.3 Server Actions (`app/admin/services/actions.ts`)
*   `saveService(formData)`: A Next.js server action that parses the FormData. It will decode the JSON payload representing the `sub_services` array, execute a Supabase `upsert`, and trigger `revalidatePath('/services')` and `revalidatePath('/admin/services')` to ensure cache invalidation.
*   `deleteService(id)`: Removes the service and triggers revalidation.

### 2.4 Admin Form Architecture (`components/admin/service-form.tsx`)
We will build a state-of-the-art interactive form:
*   **Core Fields**: Title, Slug (auto-generating based on title), Category Dropdown, Short Description.
*   **Rich Text**: MD Editor integration for the deep content page.
*   **Media**: Main Cover Image using Cloudinary upload.
*   **Dynamic Sub-Services Engine**: 
    *   A functional UI component where the user clicks "+ Add Sub-Service".
    *   It generates a new row with a text input for the "Name" and a dedicated "Upload Image" button for that specific sub-service.
    *   This state array will be serialized into a JSON string `[{name, image}]` on form submission.

### 2.5 Storefront Integration
*   **`services-list.tsx`**: We will rip out the hardcoded array and replace it with a Server Component fetch: `const services = await getServices()`. The grid will dynamically group and filter them based on the live database.
*   **Images**: All images rendered on the storefront will be wrapped in our `optimizeImage(url, 800)` utility to ensure the massive Cloudinary payloads are compressed to WebP formats.

---

## 3. Feedback Required
> [!IMPORTANT]
> The plan is now structurally exhaustive and ready for execution. The custom `seed_all_services.sql` is prepared.
> 
> Please review this updated architectural plan. If this level of detail meets your expectations for a "senior engineer audit", please **approve it**, and I will immediately begin wiring the database and building the dynamic Admin modules.
