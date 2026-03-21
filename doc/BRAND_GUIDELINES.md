# Cherith Informatics & Mapping Brand Guidelines

Welcome to the official digital brand guidelines for Cherith Informatics & Mapping Ltd. This documentation dictates the baseline aesthetic, visual hierarchy, exact colors, and stylistic implementations that assert professionalism and uniformity across the application.

## 1. Brand Concept & Aesthetic
The Cherith brand embodies **precision, modern technology, and clarity**. Driven by advanced mappings, drone analytics, and geographical insights, the brand relies on high-contrast colors (Navy and Red) paired with generous white space and distinct geometric typography to communicate trust and authority.

---

## 2. Color Palette
The color definitions below serve as the foundational palette used for backgrounds, foregrounds, text weighting, branding elements, and interactive components.

### Primary Colors
These are the foundational structural colors extracted directly from the corporate logo.
- **Cherith Navy Blue**: `#263678` 
  - *Usage*: Main headers, brand icons, primary text contrasts, dark background bases.
  - *Tailwind variable*: `text-brand-blue` | `bg-brand-blue`
- **Cherith Red**: `#E31B23`
  - *Usage*: Calls to action, active states, geographical pin elements, RTK highlights.
  - *Tailwind variable*: `text-brand-red` | `bg-brand-red`

### Accent & Neutral Colors
- **Cherith Grey**: `#D3D3D3`
  - *Usage*: Hexagonal mesh backgrounds, borders, dividers, subtle states. 
- **Absolute White**: `#FFFFFF`
  - *Usage*: Light mode backgrounds, negative text spaces.
- **Dark Mode Variants**: 
  - To maintain equal contrast on black themes without harsh vibration:
  - *Digital Dark Red*: `#F01A24`
  - *Digital Dark Blue*: `#4E6EEF`

---

## 3. Typography
Our primary and sole operating typeface is **Montserrat**. With its clean, wide geometric curves and excellent digital legibility, it perfectly reflects structural engineering and high-end mapping outputs.

- **Primary Font**: `Montserrat`, sans-serif
- **Secondary Safe Fallback**: `Century Gothic`, Arial, sans-serif

### Weight Guidelines
- **ExtraBold/Bold (700)**: Used exclusively for main brand headers (e.g., "CHERITH").
- **SemiBold (600)**: Used for section headers, sub-labels (e.g., "RTK").
- **Regular (400)**: Standard body copy, paragraphs, subtitling (e.g., "Informatics & Mapping Ltd").

---

## 4. Logo Usage Guidelines
All digital implementation of the newly digitized SVGs (`cherith-logo/` deliverables) must follow spatial awareness rules.

**1. Sizing and Readability:**
   - The master logo must never be constrained below 150px in width where the 'Informatics & Mapping Ltd' text becomes unreadable.
   - For tiny elements (favicon, table headers, small navbars), always use the `2_cherith_icon_only.svg` version.

**2. Breathing Space:**
   - Always allow spacing equivalent to the height of the "C" in "CHERITH" on all sides of the logo.

**3. Background Contrasts:**
   - On white/light gray backgrounds: Use `1_cherith_master.svg`.
   - On dark themes/black bases: Use `6_cherith_bg_dark.svg` or `4_cherith_monochrome_white.svg` to maintain absolute fidelity.

---

## 5. CSS & Tailwind Implementations
To enforce strictness across the development stack, the codebase root styling has been hard-coded with the aforementioned colors using CSS variables injected into Tailwind v4 configuration via `app/globals.css`.

When styling elements, simply use base standard classes:
```html
<h1 className="text-brand-blue font-bold font-sans font-cherith">CHERITH</h1>
<button className="bg-brand-red text-white hover:opacity-90">Get started</button>
```

Consistent establishment of this styling guarantees a professional foundation built solidly around the core values of Cherith Informatics & Mapping Ltd.
