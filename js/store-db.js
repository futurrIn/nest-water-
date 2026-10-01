/**
 * NEST Water Technologies - Store Database Manager
 * Handles data persistence, CRUD operations for Products, Categories & Variants.
 */

const INITIAL_CATEGORIES = [
  { id: 'ro-purifiers', name: 'RO Water Purifiers', icon: 'droplet' },
  { id: 'water-filters', name: 'Iron & Sand Filters', icon: 'filter' },
  { id: 'commercial-plants', name: 'Commercial & Industrial Plants', icon: 'factory' },
  { id: 'accessories', name: 'Spare Parts & Filters', icon: 'settings' }
];

const INITIAL_PRODUCTS = [
  {
    id: "nest-9-stage-ro",
    title: "NEST 9-STAGE RO+UV+UF+MINERALIZER",
    category: "ro-purifiers",
    badge: "Best Seller",
    description: "Smart wall-mounted Reverse Osmosis purifier with automated LED status display, active copper mineral balancer, high-flow booster pump, and leak-proof quick connect fittings engineered specifically for Kerala well and tap water conditions.",
    status: "active",
    images: [
      "assets/hero-purifier-clean.png",
      "assets/purifier-card.png",
      "assets/hero-purifier.png"
    ],
    variants: [
      {
        id: "var-1",
        capacity: "8 Liters Tank",
        technology: "Standard RO + Mineralizer",
        image: "assets/hero-purifier-clean.png",
        mrp: 18500,
        price: 14999,
        inStock: true
      },
      {
        id: "var-2",
        capacity: "12 Liters Tank",
        technology: "Standard RO + Mineralizer",
        image: "assets/purifier-card.png",
        mrp: 20500,
        price: 16499,
        inStock: true
      },
      {
        id: "var-3",
        capacity: "12 Liters Tank",
        technology: "Alkaline + Active Copper Boost",
        image: "assets/hero-purifier.png",
        mrp: 22500,
        price: 17999,
        inStock: true
      }
    ],
    highlights: [
      "9-Stage Advanced Purification Process",
      "Reverse Osmosis (RO) Rejection Membrane",
      "Active Copper & Essential Mineralizer",
      "UV Disinfection & UF Micro Filtration",
      "1 Year Complete Warranty & Free On-Site Fitting"
    ],
    specs: {
      "Filtration Capacity": "15 Liters per Hour",
      "Purification Stages": "9 Stages (Pre-Filter, Sediment, Carbon, RO, UV, UF, Copper, Mineral, Post-Carbon)",
      "TDS Rejection Rate": "Up to 99.9%",
      "Storage Tank": "12L Food-Grade ABS Tank",
      "Body Material": "Scratch-Resistant ABS Body",
      "Power Consumption": "36W (24V DC Booster Pump)",
      "Mounting Type": "Wall Mounted / Countertop"
    }
  },
  {
    id: "iron-removal-filter",
    title: "AUTOMATIC DUAL-MEDIA IRON & TURBIDITY FILTER",
    category: "water-filters",
    badge: "Heavy Duty",
    description: "FRP vessel iron removal filter loaded with high-grade manganese greensand and activated carbon to eliminate heavy iron reddish stain, bad odor, and suspended particles from borewell and open well water.",
    status: "active",
    images: [
      "assets/water-filter.png"
    ],
    variants: [
      {
        id: "var-iron-1",
        capacity: "1044 Vessel (Up to 1500 LPH)",
        technology: "Manual Multiport Valve",
        mrp: 22000,
        price: 18500,
        inStock: true
      },
      {
        id: "var-iron-2",
        capacity: "1252 Vessel (Up to 2500 LPH)",
        technology: "Automatic Autobackwash Digital Head",
        mrp: 32000,
        price: 26999,
        inStock: true
      }
    ],
    highlights: [
      "High Rejection Manganese Greensand Media",
      "Eliminates Reddish Stains & Foul Iron Smell",
      "Automatic / Manual Backwash Options",
      "Corrosion-Proof Heavy FRP Pressure Vessel",
      "Zero Water Wastage Chemical-Free Process"
    ],
    specs: {
      "Flow Rate": "1,500 to 2,500 LPH",
      "Vessel Material": "FRP Structural Vessel",
      "Media Composition": "Manganese Greensand, Birm, Gravel, Quartz, Carbon",
      "Backwash Frequency": "Weekly Auto / Manual Flush",
      "Pipe Size": "1 Inch Quick Coupling",
      "Operating Pressure": "1.5 - 4.5 Bar"
    }
  },
  {
    id: "commercial-ro-plant",
    title: "COMMERCIAL RO WATER TREATMENT PLANT",
    category: "commercial-plants",
    badge: "Industrial Grade",
    description: "High-capacity commercial Reverse Osmosis system with stainless steel skid structure, high-pressure vertical pump, digital rotameters, and automated conductivity controller for schools, hotels, hospitals, and bottling units.",
    status: "active",
    images: [
      "assets/industrial.png"
    ],
    variants: [
      {
        id: "var-comm-1",
        capacity: "250 Liters Per Hour (250 LPH)",
        technology: "SS Skid + Dual RO Membranes",
        mrp: 85000,
        price: 72000,
        inStock: true
      },
      {
        id: "var-comm-2",
        capacity: "500 Liters Per Hour (500 LPH)",
        technology: "Automated Control Panel + SS Pump",
        mrp: 140000,
        price: 118000,
        inStock: true
      },
      {
        id: "var-comm-3",
        capacity: "1000 Liters Per Hour (1000 LPH)",
        technology: "Industrial FRP/SS Dual Train Plant",
        mrp: 240000,
        price: 210000,
        inStock: true
      }
    ],
    highlights: [
      "Food-Grade Stainless Steel 304 Skid",
      "Vertical High Pressure Booster Pump",
      "Online TDS & Flow Rotameters",
      "Auto Low/High Pressure Cutoff Protection",
      "Customized Turnkey Installation Across Kerala"
    ],
    specs: {
      "Plant Capacity": "250 LPH / 500 LPH / 1000 LPH",
      "Membrane Specs": "4040 Dow / Hydranautics High Flow",
      "Skid Frame": "Stainless Steel 304 Polished",
      "Pre-Treatment": "Sand & Carbon Media Vessels",
      "Control Panel": "Microprocessor Controlled Panel with Indicators",
      "Warranty": "1 Year On-Site Commercial Warranty"
    }
  },
  {
    id: "water-softener",
    title: "WHOLE-HOUSE AUTOMATIC WATER SOFTENER",
    category: "water-filters",
    badge: "Hard Water Solution",
    description: "Cation ion-exchange resin water softening system that converts hard well water into soft water, protecting luxury bathroom fittings, solar water heaters, washing machines, and hair/skin health.",
    status: "active",
    images: [
      "assets/water-filter.png"
    ],
    variants: [
      {
        id: "var-soft-1",
        capacity: "50 Liters Resin Volume",
        technology: "Manual Multiport Valve",
        mrp: 28000,
        price: 23500,
        inStock: true
      },
      {
        id: "var-soft-2",
        capacity: "100 Liters Resin Volume",
        technology: "Automatic Volumetric Regeneration",
        mrp: 45000,
        price: 38999,
        inStock: true
      }
    ],
    highlights: [
      "Food Grade Cationic Exchange Resin",
      "Prevents Limescale Scaling on Pipes & Heaters",
      "Brine Tank Salt Auto-Regeneration",
      "Protects Hair, Skin & Laundry Quality",
      "Compact Space-Saving FRP Design"
    ],
    specs: {
      "Resin Capacity": "50L / 100L High Capacity Resin",
      "Regenerant Salt": "Commercial Tablet Salt",
      "Vessel Rating": "Tested to 10 Bar Pressure",
      "Flow Rate": "2,000 to 4,000 LPH",
      "Installation": "Main Overhead Tank Inlet"
    }
  },
  {
    id: "ss-water-dispenser",
    title: "HOT, COLD & NORMAL STAINLESS STEEL DISPENSER",
    category: "commercial-plants",
    badge: "Commercial Heavy Duty",
    description: "Heavy-duty 3-tap stainless steel water cooler & dispenser with built-in multi-stage purification, eco-friendly R134a compressor, and stainless steel storage tanks for offices, auditoriums, and commercial spaces.",
    status: "active",
    images: [
      "assets/purifier-card.png"
    ],
    variants: [
      {
        id: "var-disp-1",
        capacity: "40 Liters Cooling / 80L Storage",
        technology: "Normal + Cold 2-Tap Dispenser",
        mrp: 34000,
        price: 28500,
        inStock: true
      },
      {
        id: "var-disp-2",
        capacity: "80 Liters Cooling / 120L Storage",
        technology: "Hot + Normal + Cold 3-Tap Dispenser",
        mrp: 48000,
        price: 41000,
        inStock: true
      }
    ],
    highlights: [
      "Full Stainless Steel 304 Outer & Inner Body",
      "High Efficiency Energy-Saving Compressor",
      "Built-in UV Disinfection Chamber",
      "Instant Hot & Cold Water Taps",
      "Sturdy Anti-Tip Floor Standing Unit"
    ],
    specs: {
      "Cooling Capacity": "40 L/hr to 80 L/hr",
      "Heating Capacity": "15 L/hr (up to 85°C)",
      "Refrigerant Gas": "Eco-Friendly R134a",
      "Taps": "3 Heavy Duty Brass Chrome Taps",
      "Power Supply": "220V / 50Hz Standard AC"
    }
  }
];

class StoreDB {
  constructor() {
    this.STORAGE_KEY_PRODUCTS = 'nest_store_products_v1';
    this.STORAGE_KEY_CATEGORIES = 'nest_store_categories_v1';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY_CATEGORIES)) {
      localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_PRODUCTS)) {
      localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
  }

  // --- Products CRUD ---
  getProducts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error('StoreDB Error parsing products:', e);
      return INITIAL_PRODUCTS;
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  getProductsByCategory(catId) {
    const products = this.getProducts();
    if (!catId || catId === 'all') return products;
    return products.filter(p => p.category === catId);
  }

  saveProduct(productData) {
    const products = this.getProducts();
    
    // Auto-generate ID if missing
    if (!productData.id) {
      productData.id = 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    }

    // Sanitize and ensure array structures
    productData.images = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : ['assets/hero-purifier-clean.png'];
      
    productData.variants = Array.isArray(productData.variants)
      ? productData.variants
      : [];

    productData.highlights = Array.isArray(productData.highlights)
      ? productData.highlights
      : [];

    productData.specs = typeof productData.specs === 'object' && productData.specs !== null
      ? productData.specs
      : {};

    const existingIndex = products.findIndex(p => p.id === productData.id);
    if (existingIndex >= 0) {
      products[existingIndex] = productData;
    } else {
      products.unshift(productData);
    }

    localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    return productData;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    return true;
  }

  duplicateProduct(id) {
    const original = this.getProductById(id);
    if (!original) return null;

    const copy = JSON.parse(JSON.stringify(original));
    copy.id = 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    copy.title = original.title + ' (Copy)';
    
    return this.saveProduct(copy);
  }

  // --- Categories CRUD ---
  getCategories() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_CATEGORIES);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    } catch (e) {
      console.error('StoreDB Error parsing categories:', e);
      return INITIAL_CATEGORIES;
    }
  }

  saveCategory(catData) {
    const categories = this.getCategories();
    if (!catData.id) {
      catData.id = 'cat-' + Date.now();
    }
    const existingIndex = categories.findIndex(c => c.id === catData.id);
    if (existingIndex >= 0) {
      categories[existingIndex] = catData;
    } else {
      categories.push(catData);
    }
    localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    return catData;
  }

  deleteCategory(id) {
    let categories = this.getCategories();
    categories = categories.filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    return true;
  }

  // --- Backup & Restore Engine ---
  exportCatalogJSON() {
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      categories: this.getCategories(),
      products: this.getProducts()
    };
    return JSON.stringify(backup, null, 2);
  }

  importCatalogJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.products) && Array.isArray(data.categories)) {
        localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(data.categories));
        localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(data.products));
        return { success: true, message: `Successfully restored ${data.products.length} products and ${data.categories.length} categories.` };
      } else {
        return { success: false, message: 'Invalid JSON format: missing products or categories array.' };
      }
    } catch (e) {
      return { success: false, message: 'Failed to parse JSON file: ' + e.message };
    }
  }

  resetToDefaults() {
    localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return true;
  }
}

// Global Store Instance
window.storeDB = new StoreDB();
