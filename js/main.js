/* ==========================================================================
   NEST WATER TECHNOLOGIES LLP - Main JavaScript Mechanics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const contactForm = document.getElementById('enquiryForm');
  const backToTopBtn = document.getElementById('backToTop');
  const productModal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCategory = document.getElementById('modalCategory');

  // 2. Sticky Navbar Glass Effect on Scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial state check

  // Interactive Filter Image Hotspots
  const filterHotspots = document.querySelectorAll('.filter-hotspot');
  filterHotspots.forEach(spot => {
    const trigger = spot.querySelector('.hotspot-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = spot.classList.contains('active');
        filterHotspots.forEach(s => s.classList.remove('active'));
        if (!wasActive) {
          spot.classList.add('active');
        }
      });
    }
  });

  document.addEventListener('click', () => {
    filterHotspots.forEach(s => s.classList.remove('active'));
  });



  // 3. Mobile Navigation Menu Toggle
  const toggleMobileNav = () => {
    const isActive = mobileToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
    mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
  }

  // Close mobile nav when clicking any nav item
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNavOverlay.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  });

  // 4. Smooth Anchor Link Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Product Interactive Modal Logic
  const productDetailsData = {
    'ro-purifiers': {
      category: 'Pure Drinking Water Solution',
      title: 'RO Water Purifiers',
      desc: 'Our advanced Multi-Stage Reverse Osmosis (RO) systems combine RO, UV, UF, and Mineralizer technology to remove TDS, heavy metals, pesticides, and bacterial contaminants while retaining essential natural minerals. Available in wall-mounted, countertop, and under-sink configurations with customized capacity options for any household or office requirement.'
    },
    'water-filters': {
      category: 'Filtration Systems',
      title: 'High-Efficiency Water Filters',
      desc: 'Heavy-duty whole-house and point-of-use filtration systems designed to eliminate sediment, iron, turbidity, bad odor, and chlorine. Engineered with multi-layer media beds and quick-replace cartridge technology for crystal clear water across all your household water outlets.'
    },
    'industrial-solutions': {
      category: 'Commercial & Industrial',
      title: 'Industrial Water Treatment Plants',
      desc: 'Custom engineered high-capacity RO plants, commercial water softeners, sand & carbon filters, and UV disinfection skids for manufacturing units, hotels, schools, hospitals, and apartment complexes. Tailored to match your raw water test specifications and capacity demands.'
    }
  };

  window.openProductModal = (productId) => {
    const data = productDetailsData[productId];
    if (data && productModal) {
      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      productModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (productModal) {
      productModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        closeModal();
      }
    });
  }

  // 6. Keyboard Accessibility (ESC closes modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModal && productModal.classList.contains('active')) {
        closeModal();
      }
      if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
        toggleMobileNav();
      }
    }
  });

  // 7. Contact Form Handling & Basic Validation
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const requirement = document.getElementById('requirement').value;

      if (!name || !phone) {
        alert('Please provide your Name and Phone Number so our technical team can reach you.');
        return;
      }

      // Simple phone number check
      const phoneRegex = /^[0-9+\s-]{8,15}$/;
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
      }

      // Display submission success message without fake backend promises
      alert(`Thank you, ${name}! Your enquiry for "${requirement || 'Water Treatment'}" has been sent. Our team will contact you at ${phone} within 24 hours.`);
      contactForm.reset();
    });
  }

  // 8. Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 9. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

      // If clicked item was not active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 10. Dynamic Navigation Active State based on Current URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  allNavLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    link.classList.remove('active');

    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html') || (currentPath === 'index.html' && linkHref.startsWith('#'))) {
      if (linkHref === currentPath || (currentPath === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('active');
      }
    } else if (linkHref.includes(currentPath) && currentPath !== 'index.html') {
      link.classList.add('active');
    }
  });

  // 11. Interactive TDS Monitor Logic (Products Hero)
  const tdsSlider = document.getElementById('tdsSlider');
  const tdsValueDisplay = document.getElementById('tdsValueDisplay');
  const sliderValReadout = document.getElementById('sliderValReadout');
  const tdsStatusBadge = document.getElementById('tdsStatusBadge');
  const tdsStatusText = document.getElementById('tdsStatusText');
  const purityScoreVal = document.getElementById('purityScoreVal');
  const tdsMeterFill = document.getElementById('tdsMeterFill');
  const recSystemName = document.getElementById('recSystemName');
  const recSystemDesc = document.getElementById('recSystemDesc');
  const tdsCtaBtn = document.getElementById('tdsCtaBtn');
  const presetBtns = document.querySelectorAll('.tds-preset-btn');

  if (tdsSlider) {
    const updateTDS = (val) => {
      const numericVal = parseInt(val, 10);
      if (tdsValueDisplay) tdsValueDisplay.textContent = numericVal;
      if (sliderValReadout) sliderValReadout.textContent = `${numericVal} PPM`;
      tdsSlider.value = numericVal;

      // Update preset buttons active state
      presetBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.tds, 10) === numericVal);
      });

      let statusText = '';
      let badgeClass = '';
      let purityScore = '';
      let fillGradient = '';
      let fillPercentage = Math.max(5, 100 - Math.min(Math.round((numericVal / 1200) * 100), 95));
      let systemName = '';
      let systemDesc = '';
      let ctaLink = '#ro-purifiers';

      if (numericVal <= 50) {
        statusText = 'Ultra Pure Water';
        badgeClass = 'badge-ideal';
        purityScore = '99%';
        fillGradient = 'linear-gradient(90deg, #00f0ff, #00e6b4)';
        systemName = 'NEST 9-Stage Domestic RO + Mineralizer';
        systemDesc = 'Maintains ideal mineral balance while removing 99.9% of dissolved solids.';
        ctaLink = '#ro-purifiers';
      } else if (numericVal <= 150) {
        statusText = 'Good Drinking Water';
        badgeClass = 'badge-ideal';
        purityScore = '95%';
        fillGradient = 'linear-gradient(90deg, #00e6b4, #0096ff)';
        systemName = 'NEST Wall-Mounted RO+UV+UF Purifier';
        systemDesc = 'Perfect for municipal and low TDS water sources with active mineral retention.';
        ctaLink = '#ro-purifiers';
      } else if (numericVal <= 350) {
        statusText = 'Acceptable Tap Water';
        badgeClass = 'badge-good';
        purityScore = '85%';
        fillGradient = 'linear-gradient(90deg, #0096ff, #00f0ff)';
        systemName = 'NEST High-Flow Compact RO System';
        systemDesc = 'Multi-stage filtration engineered for open well & municipal tap water.';
        ctaLink = '#ro-purifiers';
      } else if (numericVal <= 650) {
        statusText = 'High Hardness / Well Water';
        badgeClass = 'badge-moderate';
        purityScore = '68%';
        fillGradient = 'linear-gradient(90deg, #ffb400, #ffa000)';
        systemName = 'NEST Whole-House Water Filter + RO';
        systemDesc = 'Comprehensive RO & media filter system designed for tough well water in Kerala.';
        ctaLink = '#water-filters';
      } else {
        statusText = 'High TDS Borewell Water';
        badgeClass = 'badge-high';
        purityScore = '45%';
        fillGradient = 'linear-gradient(90deg, #ff4d4d, #ff1a1a)';
        systemName = 'NEST Commercial / Industrial RO Plant';
        systemDesc = 'Heavy-duty high-rejection RO membrane plant built for salty brackish water.';
        ctaLink = '#industrial';
      }

      // Update DOM elements
      if (tdsStatusText) tdsStatusText.textContent = statusText;
      if (tdsStatusBadge) tdsStatusBadge.className = `tds-badge ${badgeClass}`;
      if (purityScoreVal) purityScoreVal.textContent = purityScore;
      if (tdsMeterFill) {
        tdsMeterFill.style.width = `${fillPercentage}%`;
        tdsMeterFill.style.background = fillGradient;
      }
      if (recSystemName) recSystemName.textContent = systemName;
      if (recSystemDesc) recSystemDesc.textContent = systemDesc;
      if (tdsCtaBtn) tdsCtaBtn.setAttribute('href', ctaLink);
    };

    tdsSlider.addEventListener('input', (e) => {
      updateTDS(e.target.value);
    });

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        updateTDS(btn.dataset.tds);
      });
    });

    // Initialize with default 35 PPM
    updateTDS(35);
  }

  // 12. E-Commerce Store Mechanics (Search, Category Tabs, Variant Selectors)
  const storeSearchInput = document.getElementById('storeSearchInput');
  const storeCategoryTabs = document.querySelectorAll('.store-category-tab');
  const storeProductCards = document.querySelectorAll('.store-product-card');
  const noStoreResults = document.getElementById('noStoreResults');
  const resetStoreFilterBtn = document.getElementById('resetStoreFilterBtn');

  if (storeProductCards.length > 0) {
    let currentCategory = 'all';
    let currentSearchTerm = '';

    const filterProducts = () => {
      let visibleCount = 0;

      storeProductCards.forEach(card => {
        const category = card.dataset.category || '';
        const searchKeywords = (card.dataset.search || '' + ' ' + card.dataset.title || '').toLowerCase();

        const matchesCategory = (currentCategory === 'all' || category === currentCategory);
        const matchesSearch = !currentSearchTerm || searchKeywords.includes(currentSearchTerm);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noStoreResults) {
        noStoreResults.style.display = (visibleCount === 0) ? 'block' : 'none';
      }
    };

    // Category Tabs Click Listener
    storeCategoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        storeCategoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category || 'all';
        filterProducts();
      });
    });

    // Real-Time Search Input Listener
    if (storeSearchInput) {
      storeSearchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim().toLowerCase();
        filterProducts();
      });
    }

    // Reset Filters Listener
    if (resetStoreFilterBtn) {
      resetStoreFilterBtn.addEventListener('click', () => {
        if (storeSearchInput) storeSearchInput.value = '';
        currentSearchTerm = '';
        currentCategory = 'all';

        storeCategoryTabs.forEach(t => t.classList.remove('active'));
        const allTab = document.querySelector('.store-category-tab[data-category="all"]');
        if (allTab) allTab.classList.add('active');

        filterProducts();
      });
    }

    // Variant Option Button Selection Logic (Store Grid)
    document.querySelectorAll('.variant-group').forEach(group => {
      const optBtns = group.querySelectorAll('.variant-opt-btn');
      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          optBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });
  }

  // 13. Dynamic Product Detail Page Logic (product-detail.html)
  const fullProductsData = {
    'nest-9-stage-ro': {
      title: 'NEST 9-STAGE RO+UV+UF+MINERALIZER',
      category: 'Domestic RO Purifier',
      badge: 'Best Seller',
      mainImg: 'assets/hero-purifier-clean.png',
      thumbs: ['assets/hero-purifier-clean.png', 'assets/purifier-card.png', 'assets/hero-purifier.png'],
      desc: 'Smart wall-mounted Reverse Osmosis purifier with automated LED status display, active copper mineral balancer, high-flow booster pump, and zero-leak quick connect fittings engineered specifically for Kerala well and tap water conditions.',
      highlights: ['99.9% TDS Rejection Membrane', 'Active Copper & Mineralizer', 'UV Disinfection Chamber', '1 Year On-Site Service SLA'],
      varLabel1: 'Select Capacity / Storage Tank:',
      varGroup1: ['8 Liters Tank', '12 Liters Tank', '15 Liters Heavy Tank'],
      varLabel2: 'Select Technology Variant:',
      varGroup2: ['Standard RO + Mineralizer', 'Alkaline + Active Copper Boost'],
      specs: [
        ['Purification Technology', 'Reverse Osmosis (RO) + Ultra Violet (UV) + Ultra Filtration (UF) + Active Mineralizer'],
        ['Purification Capacity', 'Up to 15 Liters per Hour'],
        ['Feed Water TDS Range', 'Up to 2,000 PPM (Borewell, Well, Municipal Water)'],
        ['TDS Rejection Rate', '95% to 99.9% Heavy Contaminant Removal'],
        ['Membrane Type', 'High-Rejection Thin Film Composite (TFC) 80 GPD Element'],
        ['Power Consumption', '230V AC, 50Hz (Consumes < 35W operation)'],
        ['Warranty & SLA', '1 Year On-Site Comprehensive Warranty']
      ]
    },
    'under-sink-ro': {
      title: 'UNDER-SINK HIGH-FLOW COMPACT RO SYSTEM',
      category: 'Compact Under-Sink',
      badge: 'Modular Kitchen',
      mainImg: 'assets/purifier-card.png',
      thumbs: ['assets/purifier-card.png', 'assets/hero-purifier-clean.png', 'assets/hero-purifier.png'],
      desc: 'Space-saving hidden under-counter RO purifier designed for modern modular kitchens. Features a high-flow 100 GPD membrane, heavy hydro-pneumatic storage tank, and premium stainless steel gooseneck faucet.',
      highlights: ['Hidden Countertop Setup', 'SS 304 Gooseneck Faucet', 'Hydro-Pneumatic Storage Tank', 'High-Flow Output'],
      varLabel1: 'Hydro-Pneumatic Tank Size:',
      varGroup1: ['8 Liters Tank', '12 Liters Heavy Tank'],
      varLabel2: 'Faucet Finish:',
      varGroup2: ['Chrome Stainless', 'Matte Black Brass'],
      specs: [
        ['Placement', 'Under-Counter Kitchen Cabinet'],
        ['Faucet', 'Food-Grade Stainless Steel Gooseneck Faucet'],
        ['Purification Stages', 'Sediment + Pre-Carbon + RO Membrane + Post-Carbon + TDS Controller'],
        ['Flow Output', '18 to 22 Liters per Hour'],
        ['Tank Type', 'Pressurized Hydro-Pneumatic Steel Tank'],
        ['Warranty', '1 Year On-Site Service Warranty']
      ]
    },
    'smart-ro': {
      title: 'NEST SMART DIGITAL WALL-MOUNTED RO PURIFIER',
      category: 'Smart Domestic RO',
      badge: 'Smart LED Display',
      mainImg: 'assets/hero-purifier.png',
      thumbs: ['assets/hero-purifier.png', 'assets/hero-purifier-clean.png', 'assets/purifier-card.png'],
      desc: 'Advanced digital RO water purifier equipped with automated micro-processor controls, live filter life monitoring, auto-flush membrane cleaning, and transparent mineral water tank.',
      highlights: ['Live Filter Life Indicator', 'Auto-Flush Membrane Clean', 'Transparent Storage Tank', 'Auto-Cut Off Sensor'],
      varLabel1: 'Storage Capacity:',
      varGroup1: ['10 Liters Tank', '14 Liters Tank'],
      varLabel2: 'Cabinet Color Shade:',
      varGroup2: ['Crystal White', 'Obsidian Gloss Black'],
      specs: [
        ['Display Panel', 'Digital Smart LED Screen'],
        ['Control System', 'Micro-Processor Auto Flush Controller'],
        ['Purification Tech', 'RO + UV + UF + Mineral Controller'],
        ['Capacity', '15 Liters/Hour'],
        ['Warranty', '1 Year Full On-Site Warranty']
      ]
    },
    'iron-removal-filter': {
      title: 'AUTOMATIC IRON REMOVAL FILTER (FRP VESSEL)',
      category: 'Whole-House Filter',
      badge: 'Borewell Specialist',
      mainImg: 'assets/filter-card.png',
      thumbs: ['assets/filter-card.png', 'assets/water-filter.png', 'assets/industrial.png'],
      desc: 'Heavy-duty whole-house FRP vessel media filter engineered to eliminate high concentrations of reddish iron stains, metallic odor, yellow tint, and suspended sand particles from raw well water.',
      highlights: ['Heavy FRP Vessel Shell', 'Manganese Greensand & KDF Bed', 'Eliminates Reddish Stains', 'Manual / Auto Backwash'],
      varLabel1: 'Treatment Flow Capacity:',
      varGroup1: ['1000 LPH (Vessel 1054)', '2000 LPH (Vessel 1354)', '3000 LPH (Vessel 1465)'],
      varLabel2: 'Multi-Port Control Valve:',
      varGroup2: ['Manual Multiport Valve', 'Automatic Backwash Timer Valve'],
      specs: [
        ['Target Contaminants', 'Dissolved Iron (Fe), Rust Stains, Odor, Mud'],
        ['Vessel Material', 'Fiber Reinforced Plastic (FRP)'],
        ['Filtration Media', 'Birm Media / Manganese Greensand / Fine Silica Sand'],
        ['Backwash Frequency', 'Every 3 to 7 Days (Depending on raw iron PPM)'],
        ['Warranty', '1 Year Structural & Valve Warranty']
      ]
    },
    'water-softener': {
      title: 'WHOLE-HOUSE WATER SOFTENER SYSTEM',
      category: 'Hard Water Softening',
      badge: 'Hard Water Solution',
      mainImg: 'assets/water-filter.png',
      thumbs: ['assets/water-filter.png', 'assets/filter-card.png', 'assets/hero-purifier-clean.png'],
      desc: 'High-capacity ion-exchange resin softener system that neutralizes hardness minerals (Calcium & Magnesium), protecting your bathroom tiles, fixtures, solar water heaters, and washing machines.',
      highlights: ['Food-Grade Cation Resin', 'Prevents Pipe Scale & Corrosion', 'Soft Hair & Smooth Skin', 'Compact Brine Tank'],
      varLabel1: 'Resin Volume Capacity:',
      varGroup1: ['25 Liters Resin (1-2 Baths)', '50 Liters Resin (3-4 Baths)', '100 Liters Heavy (Commercial)'],
      varLabel2: 'Recharge Mechanism:',
      varGroup2: ['Manual Salt Recharge', 'Automatic Volumetric Auto-Recharge'],
      specs: [
        ['Hardness Reduction', 'Up to 98% Hardness Rejection'],
        ['Resin Type', 'Food Grade High Exchange Cation Resin'],
        ['Salt Tank', 'Heavy-Duty HDPE Brine Tank Included'],
        ['Warranty', '1 Year Warranty']
      ]
    },
    'ss-dispenser': {
      title: 'HOT, COLD & NORMAL SS 304 WATER DISPENSER',
      category: 'SS Water Dispenser',
      badge: 'Office & Catering',
      mainImg: 'assets/hero-purifier.png',
      thumbs: ['assets/hero-purifier.png', 'assets/hero-purifier-clean.png', 'assets/industrial.png'],
      desc: 'Commercial-grade SS 304 stainless steel water dispenser equipped with heavy cooling compressor and instant heating elements. Built for heavy daily footfall in schools, offices, colleges, and hospitals.',
      highlights: ['Food-Grade SS 304 Frame', 'Instant Hot & Chilled Water', 'Heavy Compressor Cooling', '2 to 5 Tap Options'],
      varLabel1: 'Number of Taps:',
      varGroup1: ['2 Taps (Normal & Cold)', '3 Taps (Hot, Cold, Normal)', '5 Taps Heavy Dispenser'],
      varLabel2: 'Integrated Purification:',
      varGroup2: ['Inline UV Disinfection', 'Built-in RO Membrane Skid'],
      specs: [
        ['Body Construction', 'Stainless Steel (SS 304 Heavy Gauge)'],
        ['Cooling Capacity', '20 to 40 Liters per Hour'],
        ['Heating Capacity', '5 to 10 Liters per Hour (at 85°C - 90°C)'],
        ['Warranty', '1 Year Compressor & Systems Warranty']
      ]
    },
    'commercial-ro-plant': {
      title: 'COMMERCIAL RO TREATMENT PLANT (250 TO 10,000 LPH)',
      category: 'Commercial & Industrial',
      badge: 'Industrial Grade',
      mainImg: 'assets/industrial.png',
      thumbs: ['assets/industrial.png', 'assets/filter-card.png', 'assets/hero-purifier.png'],
      desc: 'Custom engineered stainless steel skid mounted commercial RO plants featuring multi-stage high-pressure pumps, digital flow rotameters, pressure switches, and automated flushing cycles.',
      highlights: ['SS 304 Skid Mounted', 'Digital Flow & Pressure Meters', '250 to 10,000 LPH Custom Builds', 'Automated Flush Cycle'],
      varLabel1: 'Plant Output Capacity:',
      varGroup1: ['250 LPH Plant', '500 LPH Plant', '1000 LPH Plant', '2000 LPH Plant'],
      varLabel2: 'Skid Frame Finish:',
      varGroup2: ['Stainless Steel 304 Skid', 'Heavy MS Powder Coated Skid'],
      specs: [
        ['Flow Capacity', '250 LPH up to 10,000 LPH Custom Units'],
        ['Membranes', '4040 / 8040 High Rejection Industrial RO Elements'],
        ['High Pressure Pump', 'Vertical Multistage SS Pump (CNP / Lubi / Shakti)'],
        ['Instruments', 'Flow Rotameters, Pressure Gauges, Auto Flush Controller'],
        ['Warranty & AMC', '1 Year Warranty + Customized AMC Options']
      ]
    },
    'ro-membrane': {
      title: 'ORIGINAL HIGH-REJECTION 80 GPD RO MEMBRANE',
      category: 'Filter Component',
      badge: 'Genuine Spare',
      mainImg: 'assets/purifier-card.png',
      thumbs: ['assets/purifier-card.png', 'assets/hero-purifier-clean.png', 'assets/filter-card.png'],
      desc: 'Sealed authentic high-rejection polyamide thin-film composite (TFC) RO membrane. Removes up to 99% of dissolved solids, heavy metals, fluoride, and salts from drinking water.',
      highlights: ['99% Salt Rejection', 'Polyamide Thin Film Composite', 'Universal Fit for domestic ROs', 'Factory Sealed Unit'],
      varLabel1: 'Gallons Per Day (GPD) Rating:',
      varGroup1: ['75 GPD Membrane', '80 GPD Membrane', '100 GPD Heavy Membrane'],
      varLabel2: 'Brand Series:',
      varGroup2: ['NEST Hydro-Pro Series', 'Filmtec USA Genuine'],
      specs: [
        ['Membrane Type', 'Thin-Film Composite (TFC) Polyamide'],
        ['Active Area', 'Universal 1812 / 2012 Standard Housing Fit'],
        ['Salt Rejection', '98.5% Minimum Rejection'],
        ['TDS Tolerance', 'Works effectively up to 2500 PPM Feed Water']
      ]
    },
    'pre-filter-kit': {
      title: 'NEST MULTI-STAGE PRE-FILTER HOUSING & SPUN SET',
      category: 'Pre-Filter Kit',
      badge: 'Maintenance Kit',
      mainImg: 'assets/filter-card.png',
      thumbs: ['assets/filter-card.png', 'assets/purifier-card.png', 'assets/water-filter.png'],
      desc: 'Heavy-duty food grade transparent pre-filter housing bowl with 5-micron spun polypropylene sediment filter cartridge. Protects your main RO membrane from mud, sand, rust, and algae.',
      highlights: ['Food-Grade Heavy Housing', '5-Micron Spun PP Filter', 'Leak-Proof Double O-Ring', 'Extends Main Membrane Life'],
      varLabel1: 'Housing Size:',
      varGroup1: ['10-Inch Standard Housing', '20-Inch Jumbo Commercial'],
      varLabel2: 'Included Cartridges:',
      varGroup1: ['1 Spun PP Cartridge', '3 Spun PP Value Pack'],
      specs: [
        ['Housing Material', 'Food Grade Polypropylene & Polycarbonate'],
        ['Sediment Rating', '5 Micron Filtration'],
        ['Thread Connection', '1/4 Inch or 3/8 Inch Push-Fit Connections'],
        ['Features', 'Double O-Ring Leak Proof Seal']
      ]
    }
  };

  // --- Dynamic Store Integration (StoreDB Persistence) ---
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'nest-9-stage-ro';

  // 1. Dynamic Products Grid Loader for products.html
  const storeGrid = document.getElementById('storeProductsGrid');
  if (storeGrid && window.storeDB) {
    const activeProducts = window.storeDB.getProducts().filter(p => p.status === 'active');
    if (activeProducts.length > 0) {
      storeGrid.innerHTML = activeProducts.map(p => {
        const mainImg = (p.images && p.images[0]) ? p.images[0] : 'assets/hero-purifier-clean.png';
        const badgeHTML = p.badge ? `<div class="product-badge-pill">${p.badge}</div>` : '';
        const cats = window.storeDB.getCategories();
        const catObj = cats.find(c => c.id === p.category) || { name: p.category };
        
        const variantCount = Array.isArray(p.variants) ? p.variants.length : 0;
        const optionsTag = variantCount > 0 ? `<span style="font-size: 0.72rem; color: var(--accent-cyan); background: rgba(0,210,255,0.1); padding: 0.18rem 0.5rem; border-radius: 4px; font-weight: 600;">${variantCount} Options Available</span>` : '';

        return `
          <a href="product-detail.html?id=${p.id}" class="glass-card product-card store-product-card" data-category="${p.category}" data-title="${p.title}" data-search="${p.title.toLowerCase()} ${p.description.toLowerCase()}">
            ${badgeHTML}
            <div class="product-image-box">
              <img src="${mainImg}" alt="${p.title}">
            </div>
            <h3 class="product-title">${p.title}</h3>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              ${optionsTag}
              <span style="font-size: 0.72rem; color: var(--accent-emerald); background: rgba(0,230,180,0.1); padding: 0.18rem 0.5rem; border-radius: 4px; font-weight: 600;">In Stock</span>
            </div>

            <div class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: auto; padding: 0.5rem 1rem; font-size: 0.82rem;">
              <span>View Details & Options</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </a>
        `;
      }).join('');
    }
  }

  // 2. Dynamic Product Detail Page Loader for product-detail.html
  if (document.getElementById('detailTitle')) {
    let dbProduct = window.storeDB ? window.storeDB.getProductById(productId) : null;
    
    // Fallback to initial static structure if missing in DB
    if (!dbProduct && fullProductsData[productId]) {
      const legacy = fullProductsData[productId];
      dbProduct = {
        id: productId,
        title: legacy.title,
        category: legacy.category,
        badge: legacy.badge,
        description: legacy.desc,
        images: legacy.thumbs || [legacy.mainImg],
        variants: (legacy.varGroup1 || []).map((v, i) => ({
          capacity: v,
          technology: (legacy.varGroup2 && legacy.varGroup2[i]) || '',
          price: 14999
        })),
        highlights: legacy.highlights || [],
        specs: (legacy.specs || []).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
      };
    }

    if (dbProduct) {
      document.title = `${dbProduct.title} | NEST Water Technologies`;
      
      const pageTitle = document.getElementById('pageTitle');
      if (pageTitle) pageTitle.textContent = `${dbProduct.title} | NEST Water Technologies`;

      const detailBreadcrumbTitle = document.getElementById('detailBreadcrumbTitle');
      if (detailBreadcrumbTitle) detailBreadcrumbTitle.textContent = dbProduct.title;

      const detailCategory = document.getElementById('detailCategory');
      if (detailCategory) {
        const cats = window.storeDB ? window.storeDB.getCategories() : [];
        const catObj = cats.find(c => c.id === dbProduct.category);
        detailCategory.textContent = catObj ? catObj.name : dbProduct.category;
      }

      const detailBadge = document.getElementById('detailBadge');
      if (detailBadge) detailBadge.textContent = dbProduct.badge || 'Official Solution';

      const detailTitle = document.getElementById('detailTitle');
      if (detailTitle) detailTitle.textContent = dbProduct.title;

      const detailDesc = document.getElementById('detailDesc');
      if (detailDesc) detailDesc.textContent = dbProduct.description;

      // Collect all gallery images including variant custom images
      const allGalleryImages = [...(dbProduct.images || [])];
      if (Array.isArray(dbProduct.variants)) {
        dbProduct.variants.forEach(v => {
          if (v.image && !allGalleryImages.includes(v.image)) {
            allGalleryImages.push(v.image);
          }
        });
      }

      // Gallery Images
      const mainImg = (allGalleryImages[0]) ? allGalleryImages[0] : 'assets/hero-purifier-clean.png';
      const detailMainImg = document.getElementById('detailMainImg');
      if (detailMainImg) detailMainImg.src = mainImg;

      const detailThumbs = document.getElementById('detailThumbs');
      if (detailThumbs && allGalleryImages.length > 0) {
        detailThumbs.innerHTML = allGalleryImages.map((img, idx) => `
          <button type="button" class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" data-img="${img}" onclick="switchGalleryImg('${img}', this)">
            <img src="${img}" alt="Thumbnail ${idx + 1}">
          </button>
        `).join('');
      }

      // Highlights
      const detailHighlights = document.getElementById('detailHighlights');
      if (detailHighlights && Array.isArray(dbProduct.highlights)) {
        detailHighlights.innerHTML = dbProduct.highlights.map(item => `
          <div class="highlight-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>${item}</span>
          </div>
        `).join('');
      }

      // Strict Admin-Data-Driven Variant Picker Rendering
      const productVariantSection = document.getElementById('productVariantSection');
      const productVariantList = document.getElementById('productVariantList');
      const configSummaryBox = document.getElementById('configSummaryBox');

      if (productVariantSection && productVariantList && Array.isArray(dbProduct.variants) && dbProduct.variants.length > 0) {
        productVariantSection.style.display = 'block';
        if (configSummaryBox) configSummaryBox.style.display = 'block';

        productVariantList.innerHTML = dbProduct.variants.map((v, idx) => {
          const capText = (v.capacity || '').trim();
          const techText = (v.technology || '').trim();
          const label = `${capText}${capText && techText ? ' • ' : ''}${techText}` || `Option ${idx + 1}`;
          const varImg = (v.image) ? v.image : '';
          const isStock = (v.inStock !== false);

          return `
            <button type="button" class="variant-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-image="${varImg}" onclick="selectProductVariant(this, ${idx})">
              ${varImg ? `<img src="${varImg}" class="var-mini-thumb" alt="${label}">` : ''}
              <span>${label}${!isStock ? ' (Out of Stock)' : ''}</span>
            </button>
          `;
        }).join('');
      } else {
        if (productVariantSection) productVariantSection.style.display = 'none';
        if (configSummaryBox) configSummaryBox.style.display = 'none';
      }

      // Technical Specs Body
      const detailSpecsBody = document.getElementById('detailSpecsBody');
      if (detailSpecsBody && dbProduct.specs && typeof dbProduct.specs === 'object') {
        const specEntries = Object.entries(dbProduct.specs);
        if (specEntries.length > 0) {
          detailSpecsBody.innerHTML = specEntries.map(([label, val]) => `
            <tr>
              <td><strong>${label}</strong></td>
              <td>${val}</td>
            </tr>
          `).join('');
        }
      }

      // Actions & Links summary updater
      window.updateDetailSummary = () => {
        const activeBtn = document.querySelector('#productVariantList .variant-btn.active');
        const activeLabel = activeBtn ? (activeBtn.querySelector('span') ? activeBtn.querySelector('span').textContent : activeBtn.textContent).trim() : '';

        const summaryText = document.getElementById('summaryText');
        if (summaryText) {
          summaryText.textContent = activeLabel || 'Standard Edition';
        }

        const detailEnquireLink = document.getElementById('detailEnquireLink');
        if (detailEnquireLink) {
          const variantParam = activeLabel ? ` (${activeLabel})` : '';
          detailEnquireLink.href = `contact.html?product=${encodeURIComponent(dbProduct.title + variantParam)}`;
        }

        const detailWhatsappLink = document.getElementById('detailWhatsappLink');
        if (detailWhatsappLink) {
          const variantMsg = activeLabel ? ` (${activeLabel})` : '';
          const msg = `Hi NEST Water, I would like information and enquiry for ${dbProduct.title}${variantMsg}.`;
          detailWhatsappLink.href = `https://wa.me/919496653866?text=${encodeURIComponent(msg)}`;
        }
      };

      window.selectProductVariant = (btn, varIdx) => {
        const parent = btn.parentElement;
        if (parent) {
          parent.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const varImg = btn.getAttribute('data-image');
          if (varImg) {
            const mainImg = document.getElementById('detailMainImg');
            if (mainImg) mainImg.src = varImg;

            // Highlight matching thumbnail in detailThumbs
            const detailThumbs = document.getElementById('detailThumbs');
            if (detailThumbs) {
              detailThumbs.querySelectorAll('.gallery-thumb-btn').forEach(tBtn => {
                if (tBtn.getAttribute('data-img') === varImg) {
                  tBtn.classList.add('active');
                } else {
                  tBtn.classList.remove('active');
                }
              });
            }
          }

          window.updateDetailSummary();
        }
      };

      window.switchGalleryImg = (imgSrc, btn) => {
        const mainImg = document.getElementById('detailMainImg');
        if (mainImg) mainImg.src = imgSrc;

        const parent = btn.parentElement;
        if (parent) {
          parent.querySelectorAll('.gallery-thumb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }

        // Check if clicked image belongs to a specific variant and activate that variant button!
        if (Array.isArray(dbProduct.variants)) {
          const matchedIdx = dbProduct.variants.findIndex(v => v.image === imgSrc);
          if (matchedIdx !== -1) {
            const vBtn = document.querySelector(`#productVariantList .variant-btn[data-index="${matchedIdx}"]`);
            if (vBtn) {
              document.querySelectorAll('#productVariantList .variant-btn').forEach(b => b.classList.remove('active'));
              vBtn.classList.add('active');
              window.updateDetailSummary();
            }
          }
        }
      };

      window.updateDetailSummary();
    }
  }
});




