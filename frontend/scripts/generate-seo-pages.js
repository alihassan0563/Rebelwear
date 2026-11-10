import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://rebelwearstore.netlify.app';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg';

// Metadata and Schema Registry for All Indexable Routes
const ROUTES_SEO = {
  '/': {
    title: 'REBELWEAR | Premium Streetwear & Custom Team Uniforms Manufacturer',
    description: 'International manufacturer of premium heavyweight streetwear, oversized hoodies, graphic tees, and custom athletic sports team uniforms. Worldwide delivery with bespoke customization.',
    keywords: 'streetwear manufacturer, custom streetwear, team uniforms manufacturer, custom sports uniforms, custom hoodies, graphic tees wholesale',
    image: DEFAULT_IMAGE,
    heading: 'REBELWEAR - Premium Streetwear & Athletic Uniform Atelier',
    summary: 'Crafting authentic heavyweight streetwear and championship athletic uniforms for international brands, teams, and individuals. From cut-and-sew fleece hoodies to pro sublimated sportswear.',
  },
  '/streetwear': {
    title: 'Custom Streetwear Clothing Collection | REBELWEAR',
    description: 'Explore REBELWEAR custom streetwear apparel. Heavyweight 450 GSM hoodies, oversized graphic tees, fleece tracksuits, and urban outerwear. Bespoke manufacturing and worldwide delivery.',
    keywords: 'streetwear collection, custom streetwear manufacturer, oversized hoodies, graphic tees wholesale, streetwear brand factory',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105377/rebelwear/streetwear.avif',
    heading: 'Streetwear Collection - Bold Urban Aesthetics',
    summary: 'Discover custom heavyweight hoodies, graphic t-shirts, vintage acid wash tees, fleece crewneck sweatshirts, and streetwear tracksuits manufactured from premium combed cotton.',
  },
  '/uniforms': {
    title: 'Custom Team Uniforms & Sportswear Manufacturer | REBELWEAR',
    description: 'High-performance custom team sports uniforms for basketball, baseball, football, soccer, hockey, and boxing. All-over sublimation, pro-fit fabrics, and fast international delivery.',
    keywords: 'custom team uniforms, custom sportswear manufacturer, sublimated jerseys, custom basketball uniforms, baseball jerseys wholesale, soccer kits',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif',
    heading: 'Team Uniforms - Championship Athletic Sportswear',
    summary: 'Factory-direct team uniforms engineered with moisture-wicking DryTech mesh, anti-fade heat-set dye sublimation, and custom team roster printing.',
  },
  '/about': {
    title: 'About REBELWEAR | Premium Streetwear & Sportswear Manufacturer',
    description: 'Discover REBELWEAR\'s story, craftsmanship, and manufacturing capabilities. We craft custom streetwear and championship sports team uniforms shipped worldwide.',
    keywords: 'about REBELWEAR, apparel manufacturer, streetwear factory, custom uniform supplier, sportswear production',
    image: DEFAULT_IMAGE,
    heading: 'About REBELWEAR - Born from Rebellion, Built with Passion',
    summary: 'From an agile custom manufacturing atelier to a globally trusted supplier of heavyweight streetwear and pro-grade team athletic uniforms.',
  },
  '/hoodies': {
    title: 'Custom Streetwear Hoodies & Oversized Hoodies | REBELWEAR',
    description: 'Shop custom streetwear hoodies by REBELWEAR. Heavyweight 450 GSM fleece, oversized drop-shoulder hoodies, pullovers, and custom zip hoodies with global shipping.',
    keywords: 'custom hoodies, streetwear hoodies, oversized hoodies, heavyweight hoodie manufacturer, custom pullover hoodie, wholesale hoodies',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg',
    heading: 'Custom Streetwear Hoodies - Heavyweight Combed Cotton',
    summary: 'Explore our catalog of classic pullovers, oversized boxy drop-shoulder hoodies, and heavy metal zip hoodies built for street style and custom private labeling.',
  },
  '/tshirts': {
    title: 'Custom Graphic T-Shirts & Heavyweight Street Tees | REBELWEAR',
    description: 'Shop custom graphic t-shirts and heavyweight streetwear tees by REBELWEAR. 240 GSM organic cotton, vintage acid washes, oversized boxy fits, and custom wholesale manufacturing.',
    keywords: 'graphic t-shirts, streetwear tees, custom t-shirt manufacturer, heavyweight blank t-shirts, vintage wash tees, wholesale t-shirts',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg',
    heading: 'Custom Graphic & Blank T-Shirts',
    summary: 'Milled from 240 GSM organic ringspun cotton with high-density collars and pre-shrunk construction for zero shrinkage and maximum comfort.',
  },
  '/tracksuits': {
    title: 'Custom Streetwear Tracksuits & Sweatsuits | REBELWEAR',
    description: 'Shop custom streetwear tracksuits and heavyweight fleece sweatsuits by REBELWEAR. Tailored joggers, full-zip track jackets, and custom colorways for teams and urban brands.',
    keywords: 'custom tracksuits, streetwear sweatsuits, custom jogger set, athletic warmup suit, tracksuit manufacturer wholesale',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/hoodiecol.jpg',
    heading: 'Custom Streetwear Tracksuits & Sweatsuits',
    summary: 'Two-piece matching sets featuring tailored joggers and full-zip jackets engineered from plush fleece and performance tricot.',
  },
  '/jackets': {
    title: 'Custom Streetwear Jackets, Puffers & Varsity Outerwear | REBELWEAR',
    description: 'Shop custom streetwear jackets by REBELWEAR. Biker jackets, thermal winter puffers, classic varsity jackets, and lightweight windbreakers. Premium outerwear with custom embroidery.',
    keywords: 'streetwear jackets, custom puffer jacket, varsity jackets manufacturer, streetwear outerwear, biker jackets, wholesale outerwear',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif',
    heading: 'Custom Streetwear Jackets & Outerwear',
    summary: 'Rugged weather-resistant jackets, insulated puffers, wool varsity letterman outerwear, and windbreakers tailored with attitude.',
  },
  '/sweatshirts': {
    title: 'Custom Crewneck Sweatshirts & Pullovers | REBELWEAR',
    description: 'Shop custom crewneck sweatshirts and half-zip fleece pullovers by REBELWEAR. 420 GSM brushed cotton fleece, minimal street-ready aesthetic, and bulk wholesale options.',
    keywords: 'crewneck sweatshirts, custom sweatshirts, half zip sweatshirt, fleece pullovers manufacturer, wholesale sweatshirts, streetwear fleece',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg',
    heading: 'Custom Crewneck Sweatshirts & Fleece Pullovers',
    summary: 'Heavyweight brushed fleece crewnecks and quarter-zip sweaters for casual layering and custom embroidery.',
  },
  '/accessories': {
    title: 'Streetwear Accessories, Custom Hats & Beanies | REBELWEAR',
    description: 'Shop custom streetwear accessories by REBELWEAR. Embroidered snapbacks, dad hats, winter beanies, tactical belts, and urban sunglasses with custom private labeling.',
    keywords: 'streetwear accessories, custom hats, embroidered beanies, tactical streetwear belt, sunglasses wholesale',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105170/rebelwear/streetwear-images/accessories.jpg',
    heading: 'Streetwear Accessories & Headwear',
    summary: 'Complete your streetwear aesthetic with 3D embroidered caps, ribbed knit beanies, tactical nylon belts, and statement eyewear.',
  },
  '/basketball-uniforms': {
    title: 'Custom Basketball Uniforms & Team Reversible Jerseys | REBELWEAR',
    description: 'Shop custom basketball uniforms and sublimated team jerseys by REBELWEAR. Breathable DryTech mesh, reversible jerseys, custom numbers and roster printing with worldwide delivery.',
    keywords: 'custom basketball uniforms, basketball jerseys, sublimated basketball kit, custom basketball shorts, youth basketball uniforms',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg',
    heading: 'Custom Basketball Uniforms & Game Jerseys',
    summary: 'Tournament-grade basketball uniforms, sublimated player jerseys, and matching dry-mesh athletic shorts.',
  },
  '/baseball-uniforms': {
    title: 'Custom Baseball Uniforms & Button-Down Jerseys | REBELWEAR',
    description: 'Shop custom baseball uniforms and button-down jerseys by REBELWEAR. Heavy-duty breathable warp knit, reinforced sliding pants, custom team crests, and youth/adult sizing.',
    keywords: 'custom baseball uniforms, baseball jerseys, button down baseball jerseys, custom baseball pants, team baseball apparel',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-2.jpg',
    heading: 'Custom Baseball Uniforms & Sliding Pants',
    summary: 'Pro-weight button-down baseball jerseys and double-knee reinforced pants with tackle-twill script typography.',
  },
  '/football-uniforms': {
    title: 'Custom American Football Uniforms & Jerseys | REBELWEAR',
    description: 'Shop custom American football uniforms and game jerseys by REBELWEAR. Heavyweight spandex mesh, double-ply dazzle shoulders, pad-ready pants, and full team roster customization.',
    keywords: 'custom football uniforms, football jerseys, sublimated football kit, youth football uniforms, custom gridiron jerseys',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105274/rebelwear/streetwear-images/sportswear-images/american-football-uniform-7.jpg',
    heading: 'Custom American Football Uniforms & Gridiron Gear',
    summary: 'Heavyweight 4-way stretch spandex game jerseys and integrated pad pants built for high impact collisions.',
  },
  '/soccer-uniforms': {
    title: 'Custom Soccer Uniforms & Sublimated Football Kits | REBELWEAR',
    description: 'Shop custom soccer uniforms and match kits by REBELWEAR. Ultra-lightweight aeromesh, anti-fade dye sublimation, player numbers, club crests, and worldwide team delivery.',
    keywords: 'custom soccer uniforms, soccer jerseys, sublimated football kit, team soccer kits, youth soccer jerseys',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg',
    heading: 'Custom Soccer Uniforms & Match Kits',
    summary: 'Aerodynamic soccer jerseys and athletic shorts built for speed, heat ventilation, and full roster club branding.',
  },
  '/hockey-uniforms': {
    title: 'Custom Hockey Jerseys & Ice Hockey Uniforms | REBELWEAR',
    description: 'Shop custom ice hockey jerseys and team sweaters by REBELWEAR. Heavy-duty pro-weight air-knit polyester, reinforced elbows, fight straps, and full dye sublimation.',
    keywords: 'custom hockey jerseys, ice hockey uniforms, sublimated hockey sweaters, hockey team apparel, roller hockey jerseys',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif',
    heading: 'Custom Ice Hockey Sweaters & Uniforms',
    summary: 'Pro-weight air-knit polyester hockey sweaters with double-reinforced elbows and authentic fight straps.',
  },
  '/boxing-uniforms': {
    title: 'Custom Boxing Uniforms, Fight Robes & Trunks | REBELWEAR',
    description: 'Shop custom boxing apparel by REBELWEAR. Luxury satin fight robes, custom embroidered competition trunks, and corner team apparel for amateur and professional fighters.',
    keywords: 'custom boxing uniforms, boxing trunks, custom boxing robe, fight shorts, cornerman jackets, boxing gear manufacturer',
    image: DEFAULT_IMAGE,
    heading: 'Custom Boxing Uniforms & Fight Apparel',
    summary: 'Professional satin fight walkout robes, multi-channel elastic competition trunks, and corner team track jackets.',
  },
  '/uniform-accessories': {
    title: 'Custom Team Uniform Accessories, Bags & Headwear | REBELWEAR',
    description: 'Shop custom athletic team accessories by REBELWEAR. High-performance compression socks, team duffel gear bags, protective sports eyewear, and embroidered team caps.',
    keywords: 'team uniform accessories, athletic team socks, custom sports bags, team caps embroidered, sports gear wholesale',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp',
    heading: 'Team Uniform Accessories & Sideline Gear',
    summary: 'Athletic compression socks, durable equipment duffel bags, protective eyewear, and custom embroidered sideline headwear.',
  },
  '/product/classic-hoodie': {
    title: 'Classic Streetwear Hoodie - Custom Apparel | REBELWEAR',
    description: 'Classic 450 GSM combed cotton streetwear hoodie by REBELWEAR. Double-needle reinforced seams, pre-shrunk fleece, and custom batch printing.',
    keywords: 'classic hoodie, streetwear hoodie, 450 gsm hoodie, custom hoodie manufacturer',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105192/rebelwear/streetwear-images/classichoodie1.jpg',
    heading: 'Classic Streetwear Hoodie (450 GSM)',
    summary: 'Timeless comfort and heavy fleece drape for discerning fashion brands and individual rebels.',
  },
  '/product/oversize-hoodie': {
    title: 'Oversized Streetwear Hoodie - Drop Shoulder | REBELWEAR',
    description: 'Oversized drop-shoulder streetwear hoodie by REBELWEAR. Relaxed boxy silhouette, seamless kangaroo pocket, and wholesale customization.',
    keywords: 'oversized hoodie, drop shoulder hoodie, boxy hoodie, wholesale oversized hoodie',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105231/rebelwear/streetwear-images/oversizehoodie1.jpg',
    heading: 'Oversized Streetwear Hoodie',
    summary: 'Contemporary boxy drop-shoulder cut engineered with heavy French terry and custom colorways.',
  },
  '/product/custom-team-uniforms': {
    title: 'Custom Pro Team Basketball Uniform Kit | REBELWEAR',
    description: 'Custom professional team basketball uniform kit by REBELWEAR. Sublimated dry-mesh jersey, athletic shorts, and full roster customization.',
    keywords: 'custom basketball kit, sublimated basketball jersey, team basketball uniform, pro basketball gear',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg',
    heading: 'Custom Pro Team Basketball Uniform Kit',
    summary: 'Championship-ready tournament kit featuring aerodynamic micro-mesh jersey and performance court shorts.',
  },
  '/product/graphic-tee': {
    title: 'Graphic Streetwear T-Shirt - 240 GSM | REBELWEAR',
    description: 'Graphic streetwear t-shirt by REBELWEAR. Heavyweight 240 GSM ringspun cotton, high-density screen print, and anti-sag collar.',
    keywords: 'graphic tee, streetwear t-shirt, 240 gsm tee, custom printed t-shirts',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105216/rebelwear/streetwear-images/graphictee1.jpg',
    heading: 'Graphic Streetwear T-Shirt',
    summary: 'High-density urban graphic screen-printed on durable ringspun organic cotton.',
  },
  '/product/classic-track': {
    title: 'Classic Streetwear Tracksuit Set | REBELWEAR',
    description: 'Classic two-piece streetwear tracksuit set by REBELWEAR. Full-zip track jacket with tapered jogger pants and zippered pockets.',
    keywords: 'classic tracksuit, streetwear sweatsuit, jogger set, athletic track jacket',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105197/rebelwear/streetwear-images/classictrack1.jpg',
    heading: 'Classic Streetwear Tracksuit Set',
    summary: 'Full-zip jacket and matching tapered joggers tailored for clean movement and street aesthetics.',
  },
  '/product/bike-jacket': {
    title: 'Streetwear Bike Jacket - Weatherproof Outerwear | REBELWEAR',
    description: 'Streetwear biker jacket by REBELWEAR. Weather-resistant shell, heavy metal zipper hardware, and urban motorcycle styling.',
    keywords: 'bike jacket, streetwear jacket, motorcycle jacket, weatherproof outerwear',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105180/rebelwear/streetwear-images/bikejacket.jpg',
    heading: 'Streetwear Biker Jacket',
    summary: 'Weatherproof motorcycle jacket featuring quilted accents, metal hardware, and tailored cut.',
  },
  '/product/crewneck-sweatshirt': {
    title: 'Classic Crewneck Sweatshirt - 420 GSM | REBELWEAR',
    description: 'Classic crewneck sweatshirt by REBELWEAR. 420 GSM brushed fleece interior, coverstitched seams, and preshrunk cotton blend.',
    keywords: 'crewneck sweatshirt, fleece pullover, 420 gsm sweatshirt, custom blank sweatshirt',
    image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105333/rebelwear/streetwear-images/sweatshirt2.jpg',
    heading: 'Classic Crewneck Sweatshirt',
    summary: 'Plush brushed fleece interior with double-stitched ribbing for everyday comfort and custom prints.',
  },
};

function generateSeoPages() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Please run vite build first.');
    process.exit(1);
  }

  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  console.log('🚀 Generating SEO-Prerendered static entry points for search engines and social bots...');

  let count = 0;

  for (const [route, meta] of Object.entries(ROUTES_SEO)) {
    const canonicalUrl = `${BASE_URL}${route === '/' ? '' : route}`;
    
    // Replace meta tags in base HTML
    let modifiedHtml = baseHtml;

    // Replace Title
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${meta.title}</title>`
    );

    // Replace or Insert Description
    if (modifiedHtml.includes('<meta name="description"')) {
      modifiedHtml = modifiedHtml.replace(
        /<meta name="description" content=".*?"\s*\/?>/i,
        `<meta name="description" content="${meta.description}" />`
      );
    }

    // Replace or Insert Canonical
    if (modifiedHtml.includes('<link rel="canonical"')) {
      modifiedHtml = modifiedHtml.replace(
        /<link rel="canonical" href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );
    }

    // Replace Open Graph Tags
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:title" content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${meta.title}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:description" content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${meta.description}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:url" content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:image" content=".*?"\s*\/?>/i,
      `<meta property="og:image" content="${meta.image || DEFAULT_IMAGE}" />`
    );

    // Replace Twitter Tags
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:title" content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${meta.title}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:description" content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${meta.description}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:image" content=".*?"\s*\/?>/i,
      `<meta name="twitter:image" content="${meta.image || DEFAULT_IMAGE}" />`
    );

    // Inject Search Engine Crawler Fallback Block inside #root (non-destructive; React replaces on mount)
    const crawlerBlock = `
      <div id="seo-crawler-content" style="opacity: 0; pointer-events: none; position: absolute; left: -9999px;">
        <h1>${meta.heading}</h1>
        <p>${meta.summary}</p>
        <p>${meta.description}</p>
        <a href="/">Home</a> | <a href="/streetwear">Streetwear</a> | <a href="/uniforms">Uniforms</a> | <a href="/about">About</a>
      </div>
    `;

    modifiedHtml = modifiedHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${crawlerBlock}</div>`
    );

    // Write file to target destination
    if (route === '/') {
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), modifiedHtml, 'utf8');
    } else {
      const targetDir = path.join(DIST_DIR, route.replace(/^\//, ''));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(targetDir, 'index.html'), modifiedHtml, 'utf8');
    }

    count++;
  }

  console.log(`✅ Successfully generated ${count} SEO-optimized static entry points!`);
}

generateSeoPages();
