# SpiderCursor Technical Changelog (Internal)

All internal technical modifications, architectural decisions, file paths, code snippets, and structural updates are documented here.

---

## [v0.1.1] - 2026-10-29

### Summary
Enhanced search discovery (SEO, GEO, AEO), implemented structured data graph, created custom 404 error experience with reactive inverse kinematics controls, and added public changelog routing and RSS feed.

### Technical Details & Code Paths

#### 1. Search Engine, Generative Engine, and Answer Engine Optimization (SEO / GEO / AEO)
- **Path**: `index.html`
- **Domain**: Configured canonical origin `https://spidercursor.techhive.net/`
- **Meta Description**: Optimized to 150 characters (satisfies standard 70-160 character threshold):
  ```html
  <meta name="description" content="Embeddable Three.js procedural spider with realistic inverse kinematics, cursor tracking, light/dark mode adaptation, and customizable configurations." />
  ```
- **Social Metadata (Open Graph & Twitter Cards)**:
  - Linked `public/og.jpg` (3196x1790 JPEG) via `og:image` and `twitter:image`.
  - Added `twitter:site` (`@spidercursor`) and `twitter:creator` (`@ajbatac`).
  - Added `og:url` (`https://spidercursor.techhive.net/`), `og:type` (`website`), and `og:site_name`.
- **Favicon & Web App Manifest Suite**:
  - Registered SVG (`/favicon.svg`), multi-size ICO (`/favicon.ico`), and PNGs (`16x16`, `32x32`, `48x48`, `128x128`, `192x192`, `512x512`).
  - Added Apple Touch Icon (`/apple-touch-icon.png`, 180x180).
  - Configured `public/site.webmanifest` with PWA settings, dark colors (`#0a0a0c`, `#f97316`), and `maskable` icon definitions.
- **Structured Data (JSON-LD)**:
  - Injected `@graph` schema combining `WebSite`, `SoftwareApplication`, `FAQPage`, and `HowTo`:
  ```json
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://spidercursor.techhive.net/#software",
        "name": "SpiderCursor",
        "operatingSystem": "Any (Modern Web Browsers)",
        "applicationCategory": "DeveloperApplication",
        "license": "https://opensource.org/licenses/Apache-2.0"
      },
      {
        "@type": "FAQPage",
        "@id": "https://spidercursor.techhive.net/#faq"
      },
      {
        "@type": "HowTo",
        "@id": "https://spidercursor.techhive.net/#howto"
      }
    ]
  }
  ```
- **Static Semantic Fallback**:
  - Inserted semantic `<header>`, `<main>`, `<h1>`, and `<ul>` tags inside `<div id="root">` so non-JS web crawlers parse textual context prior to React hydration.

#### 2. AI Crawling & Discovery Assets
- **Path**: `public/llms.txt`
  - Authored standard Markdown summary for Generative Engine Optimization (ChatGPT Search, Perplexity, Claude, Gemini).
- **Path**: `public/robots.txt`
  - Set `User-agent: *`, `Allow: /`, and `Sitemap: https://spidercursor.techhive.net/sitemap.xml`.
- **Path**: `public/sitemap.xml`
  - Published XML sitemap indexing root `/` and `/changelog`.

#### 3. 404 Route & Interactive Spider Error Den
- **Path**: `src/components/NotFound.tsx`
  - Created a stylized 404 error screen featuring:
    - Glowing multi-gradient 404 font with overlaid SVG silk line strings.
    - Blinking 8-eye arachnid ocelli indicator.
    - Terminal incident log (`server_incident_report_404.log`).
    - Interactive action triggers: `onDropBait()` (tosses pumpkin bait), `onScareSpider()` (triggers `spider.scare(1.4)`), and `onSwarm()` (boosts speed to 2.2 and spawns 6 spiderlings).
    - Basic accessible anchor link back to `/`:
      ```tsx
      <a href="/" onClick={handleLinkClick}>Back to home</a>
      ```

#### 4. Client-Side Routing & Popstate Handling
- **Path**: `src/App.tsx`
  - Implemented popstate event listeners for history-aware URL navigation without external heavy routing dependencies:
  ```tsx
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  ```

#### 5. Public Changelog Page & RSS Feed
- **Path**: `src/pages/Changelog.tsx`
  - High-level, security-safe, non-technical public changelog interface with version milestones.
  - Features an active "Subscribe to this feed" pill linking to `/changelog/rss`.
- **Path**: `public/rss.xml` & `public/changelog/rss`
  - Standard RSS 2.0 XML document formatted with full bulleted descriptions under `<description>` tags.

---

## [v0.1.0] - 2026-10-29

### Summary
Initial release of SpiderCursor procedural 3D cursor overlay.

### Technical Details & Code Paths
- **Path**: `src/spider-cursor/SpiderCursor.ts`
  - Main coordinator class orchestrating Three.js scene, camera, renderer, mouse listeners, tab visibility handler (`document.hidden`), and procedural loop.
- **Path**: `src/spider-cursor/SpiderModel.ts`
  - Procedural mesh generation for cephalothorax, abdomen, 8 multi-jointed legs, eye ocelli, drop shadow projection, and dynamic silk spline.
  - Analytical inverse kinematics limb calculation:
  ```ts
  // 2-segment limb IK solver calculating coxa, femur, and tibia elevation/flexion angles
  const reach = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  ```
- **Path**: `src/spider-cursor/audio.ts`
  - Procedural Web Audio API chitin footstep synthesis using filtered noise bursts (0 audio file dependencies).
- **Path**: `src/components/PlaygroundDock.tsx`
  - Collapsible bottom UI controls for live tuning of scale, speed, behavior mode, theme, and species presets.

