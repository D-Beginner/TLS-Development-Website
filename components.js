/**
 * TLS Development — Shared Components
 * =====================================
 * Single source of truth for: Navbar, CTA Banner, Footer, WhatsApp FAB, and all shared JS.
 *
 * HOW TO USE ON EACH PAGE:
 *   1. Set window.TLS_PAGE before this script runs:
 *        'home'    → TLS Development Website Template.html
 *        'about'   → about.html
 *        'project' → taman-rotan-indah.html (or any project page)
 *
 *   2. Place placeholder divs in your HTML:
 *        <div id="tls-navbar"></div>        ← top of <body>
 *        <div id="tls-cta-banner"></div>    ← before footer
 *        <div id="tls-footer"></div>        ← bottom of <body>
 *
 *   3. Include this script at the end of <body>:
 *        <script src="components.js"></script>
 *
 * TO UPDATE NAVBAR / FOOTER / CTA BANNER:
 *   Edit this file only — all pages update automatically.
 */

(function () {

  /* ─────────────────────────────────────────────
     GLOBAL CONFIG — edit these to update site-wide
  ───────────────────────────────────────────── */
  const CFG = {
    whatsapp:       'https://wa.me/60134315114',
    waText:         'Hi saya berminat dengan projek TLS Development',
    phone1:         '+6013-431 5114',
    phone1href:     'tel:+60134315114',
    phone2:         '+604-772 1211',
    phone2href:     'tel:+60472211211',
    phone3:         '+6012-284 8211',
    phone3href:     'tel:+60122848211',
    email:          'tlsdevelopmentsb@gmail.com',
    address:        'No. A34, Tingkat Satu, Susuran Tandop, Kawasan Perusahaan Tandop Baru, 05400 Alor Setar, Kedah',
    hours:          'Mon–Fri 9AM–5:30PM, Sat 9AM–1PM',
    facebook:       'https://www.facebook.com/tlsdevelopment',
    copyright:      '© 2026 TLS Development Sdn Bhd. All Rights Reserved. | Company No. 232807-P',
    ctaBgImage:     'https://img.craiyon.com/2026-03-21/T6Sh2aCKTpCmoZLH6LOaRw.webp',
    logoMain:       'LOGO/TLS LOGO (NO BACKGROUND).png',
    logoKubang:     'LOGO/KUBANG ROTAN LOGO (NO BG).png',
  };

  /* SVG icons (reused across components) */
  const SVG = {
    whatsapp: `<svg class="icon-sm" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path></svg>`,
    phone:    `<svg viewBox="0 0 24 24" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    email:    `<svg viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    facebook: `<svg class="icon-sm" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
    chevron:  `<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`,
  };

  /* Detect current page */
  const PAGE = window.TLS_PAGE || 'home';
  const isHome = PAGE === 'home';

  /* Resolve links that are anchors on homepage, full paths on other pages */
  function href(anchor) {
    return isHome ? anchor : `index.html${anchor}`;
  }

  /* ─────────────────────────────────────────────
     NAVBAR
  ───────────────────────────────────────────── */
  function renderNavbar() {
    return `
    <nav class="navbar" id="navbar">
      <a href="${href('#home')}" class="logo">
        <img src="${CFG.logoMain}" alt="TLS Development" class="logo-img">
      </a>
      <div class="nav-links">
        <a href="${href('#home')}"${isHome ? ' class="active"' : ''}>Home</a>
        <a href="about.html"${PAGE === 'about' ? ' class="active"' : ''}>About Us</a>
        <div class="nav-dropdown">
          <a href="${href('#projects')}" class="nav-dropdown-trigger">
            Projects ${SVG.chevron}
          </a>
          <div class="nav-dropdown-menu">
            <a href="taman-rotan-indah.html" class="nav-dropdown-item">
              <div class="nav-dropdown-item-icon">
                <img src="${CFG.logoKubang}" alt="Taman Rotan Indah">
              </div>
              <div class="nav-dropdown-item-text">
                <span class="nav-dropdown-item-name">Taman Rotan Indah</span>
                <span class="nav-dropdown-item-location">Alor Setar, Kedah</span>
              </div>
            </a>
            <a href="arunika-residency.html" class="nav-dropdown-item">
              <div class="nav-dropdown-item-icon">
                <img src="IMAGES/ARUNIKA RESIDENCY/logo.png" alt="Arunika Residensi">
              </div>
              <div class="nav-dropdown-item-text">
                <span class="nav-dropdown-item-name">Arunika Residensi</span>
                <span class="nav-dropdown-item-location">Changlun, Kedah</span>
              </div>
            </a>
            <div class="nav-dropdown-divider"></div>
            <a href="${href('#projects')}" class="nav-dropdown-footer">View All Projects →</a>
          </div>
        </div>
        <a href="${href('#contact')}">Contact</a>
      </div>
      <div class="nav-actions">
        <div class="lang-toggle" id="langToggle">
          <span data-lang="en" class="active">EN</span> / <span data-lang="bm">BM</span>
        </div>
        <a href="${CFG.whatsapp}" class="btn btn-primary" target="_blank">
          ${SVG.whatsapp} WhatsApp Us
        </a>
      </div>
      <button class="nav-hamburger" id="navHamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
      <a href="${href('#home')}">Home</a>
      <div class="mobile-menu-divider"></div>
      <a href="about.html">About Us</a>
      <div class="mobile-menu-divider"></div>
      <div class="mobile-menu-projects">
        <span class="mobile-menu-section-label">Projects</span>
        <a href="taman-rotan-indah.html" class="mobile-menu-project-item">
          <img src="${CFG.logoKubang}" alt="Taman Rotan Indah">
          <div>
            <div style="color:white;font-size:0.95rem;font-weight:600;">Taman Rotan Indah</div>
            <div style="color:rgba(255,255,255,0.5);font-size:0.8rem;">Alor Setar, Kedah</div>
          </div>
        </a>
        <a href="arunika-residency.html" class="mobile-menu-project-item">
          <img src="IMAGES/ARUNIKA RESIDENCY/logo.png" alt="Arunika Residensi">
          <div>
            <div style="color:white;font-size:0.95rem;font-weight:600;">Arunika Residensi</div>
            <div style="color:rgba(255,255,255,0.5);font-size:0.8rem;">Changlun, Kedah</div>
          </div>
        </a>
      </div>
      <div class="mobile-menu-divider"></div>
      <a href="${href('#contact')}">Contact</a>
      <a href="${CFG.whatsapp}" class="btn btn-whatsapp mobile-wa-btn" target="_blank">WhatsApp Us</a>
      <div class="mobile-menu-divider"></div>
      <div class="lang-toggle mobile-lang-toggle" id="langToggleMobile">
        <span data-lang="en" class="active">EN</span> / <span data-lang="bm">BM</span>
      </div>
    </div>`;
  }

  /* ─────────────────────────────────────────────
     CTA BANNER
  ───────────────────────────────────────────── */
  function renderCTABanner() {
    return `
    <section class="tls-cta-banner">
      <div class="tls-cta-bg" id="ctaParallaxBg"></div>
      <div class="tls-cta-overlay"></div>
      <div class="container">
        <h2>Find Your Dream Home Today</h2>
        <p>Speak to our sales team for a personalised consultation.</p>
        <a href="${CFG.whatsapp}?text=${encodeURIComponent(CFG.waText)}" class="btn btn-whatsapp" target="_blank">
          ${SVG.whatsapp} WhatsApp Us
        </a>
      </div>
    </section>`;
  }

  /* ─────────────────────────────────────────────
     FOOTER
  ───────────────────────────────────────────── */
  function renderFooter() {
    return `
    <footer class="footer" id="contact">
      <div class="container">
        <div class="footer-grid">

          <!-- Col 1: Brand -->
          <div class="footer-col">
            <div style="margin-bottom:24px;">
              <img src="${CFG.logoMain}" alt="TLS Development" class="footer-logo-img">
            </div>
            <p style="font-size:0.9rem;margin-bottom:24px;">Comfortable Living, Made Simple. One of the most established property developers in Kedah and Perlis, building quality homes since 1992.</p>
            <a href="${CFG.facebook}" target="_blank" class="btn btn-outline-white" style="color:var(--color-teal);border-color:var(--color-border);padding:8px 16px;border-radius:8px;">
              ${SVG.facebook} Follow
            </a>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:12px;">
              <li><a href="${href('#home')}" style="color:var(--color-text-muted);transition:color 0.2s;">Home</a></li>
              <li><a href="about.html" style="color:var(--color-text-muted);transition:color 0.2s;">About Us</a></li>
              <li><a href="${href('#projects')}" style="color:var(--color-text-muted);transition:color 0.2s;">Now Selling</a></li>
              <li><a href="${href('#contact')}" style="color:var(--color-text-muted);transition:color 0.2s;">Contact Us</a></li>
            </ul>
          </div>

          <!-- Col 3: Our Projects -->
          <div class="footer-col">
            <h4>Our Projects</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:12px;font-size:0.9rem;">
              <li style="font-weight:600;color:var(--color-text-main);margin-bottom:4px;">Now Selling</li>
              <li><a href="taman-rotan-indah.html" style="color:var(--color-text-muted);transition:color 0.2s;">Taman Rotan Indah (28 Units)</a></li>
              <li><a href="arunika-residency.html" style="color:var(--color-text-muted);transition:color 0.2s;">Arunika Residensi (76 Units)</a></li>
              <li style="font-weight:600;color:var(--color-text-main);margin-top:16px;margin-bottom:4px;">Upcoming</li>
              <li><a href="${href('#projects')}" style="color:var(--color-text-muted);transition:color 0.2s;">Pokok Sena</a></li>
              <li><a href="${href('#projects')}" style="color:var(--color-text-muted);transition:color 0.2s;">Taman Hijirah Jejawi</a></li>
              <li><a href="${href('#projects')}" style="color:var(--color-text-muted);transition:color 0.2s;">Taman Seramak Api III</a></li>
            </ul>
          </div>

          <!-- Col 4: Contact -->
          <div class="footer-col">
            <h4>Contact</h4>
            <ul class="contact-list">
              <li>
                <div class="contact-icon">${SVG.phone}</div>
                <div class="contact-text">
                  <strong>WhatsApp</strong>
                  <a href="${CFG.whatsapp}" target="_blank" style="color:var(--color-teal);font-weight:500;">${CFG.phone1}</a>
                </div>
              </li>
              <li>
                <div class="contact-icon">${SVG.phone}</div>
                <div class="contact-text">
                  <strong>Office</strong>
                  <a href="${CFG.phone2href}" style="color:var(--color-teal);font-weight:500;">${CFG.phone2}</a>
                </div>
              </li>
              <li>
                <div class="contact-icon">${SVG.phone}</div>
                <div class="contact-text">
                  <strong>Mobile</strong>
                  <a href="${CFG.phone3href}" style="color:var(--color-teal);font-weight:500;">${CFG.phone3}</a>
                </div>
              </li>
              <li>
                <div class="contact-icon">${SVG.email}</div>
                <div class="contact-text">
                  <strong>Email</strong>
                  <a href="mailto:${CFG.email}" style="color:var(--color-teal);font-weight:500;word-break:break-all;">${CFG.email}</a>
                </div>
              </li>
            </ul>
            <p style="font-size:0.8rem;color:rgba(92,112,128,0.8);margin-top:24px;line-height:1.5;">${CFG.address}</p>
            <p style="font-size:0.8rem;color:rgba(92,112,128,0.8);margin-top:12px;">${CFG.hours}</p>
          </div>

        </div>
        <div class="footer-bottom">
          <span>${CFG.copyright}</span>
        </div>
      </div>
    </footer>

    <!-- WhatsApp FAB -->
    <a href="${CFG.whatsapp}" class="fab-whatsapp" target="_blank" aria-label="Chat on WhatsApp">
      ${SVG.whatsapp}
    </a>`;
  }

  /* ─────────────────────────────────────────────
     CTA BANNER CSS (injected once into <head>)
  ───────────────────────────────────────────── */
  function injectCTAStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .tls-cta-banner {
        position: relative;
        min-height: 480px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 80px 0;
        overflow: hidden;
      }
      .tls-cta-bg {
        position: absolute;
        inset: -80px 0;
        background: url('${CFG.ctaBgImage}') center 30% / cover no-repeat;
        will-change: transform;
        transform: translateY(0px);
      }
      .tls-cta-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(168,120,48,0.72) 0%, rgba(201,148,62,0.60) 50%, rgba(140,100,30,0.78) 100%);
      }
      .tls-cta-banner .container {
        position: relative;
        z-index: 2;
        padding: 80px 24px;
      }
      .tls-cta-banner h2 {
        font-size: 2.5rem;
        color: var(--color-surface);
        margin-bottom: 16px;
      }
      .tls-cta-banner p {
        font-size: 1.1rem;
        color: rgba(255,255,255,0.9);
        margin-bottom: 32px;
      }
      @media (max-width: 768px) {
        .tls-cta-banner { min-height: 380px; margin: 40px 0; }
        .tls-cta-bg { inset: 0; background-attachment: scroll; background-position: center 20%; }
        .tls-cta-banner .container { padding: 56px 24px; }
        .tls-cta-banner h2 { font-size: 1.7rem !important; }
        .tls-cta-banner p { font-size: 0.95rem; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────────
     SHARED JS BEHAVIOURS
  ───────────────────────────────────────────── */
  function initNavbarScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  function initHamburger() {
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function initParallax() {
    const ctaBg = document.getElementById('ctaParallaxBg');
    if (!ctaBg) return;
    const isMobile = () => window.innerWidth <= 768;
    function update() {
      if (isMobile()) return;
      const section = ctaBg.closest('section');
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      ctaBg.style.transform = `translateY(${(progress - 0.5) * 120}px)`;
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ─────────────────────────────────────────────
     LANGUAGE (EN / BM)
     ---------------------------------------------
     Dictionary is keyed by the EXACT English string
     as it appears in the HTML. Anything not listed
     here stays untouched — that keeps proper nouns,
     prices, emails and addresses safe.

     TO ADD A NEW STRING: add "English": "Bahasa"
     below. No HTML changes needed.
  ───────────────────────────────────────────── */
  const BM = {
    /* ---- Navbar / shared ---- */
    'Home': 'Utama',
    'About Us': 'Tentang Kami',
    'Projects': 'Projek',
    'Contact': 'Hubungi',
    'Contact Us': 'Hubungi Kami',
    'WhatsApp Us': 'WhatsApp Kami',
    'View All Projects →': 'Lihat Semua Projek →',

    /* ---- Homepage hero ---- */
    'Comfortable Living,': 'Kehidupan Selesa,',
    'Made Simple.': 'Dipermudahkan.',
    "One of northern Malaysia's most trusted property developers — delivering quality residential and commercial developments across Kedah and Perlis for over 30 years.":
      'Salah satu pemaju hartanah paling dipercayai di utara Malaysia — menyampaikan pembangunan kediaman dan komersial berkualiti di seluruh Kedah dan Perlis selama lebih 30 tahun.',
    'View Projects': 'Lihat Projek',
    'Years Experience': 'Tahun Pengalaman',
    'Houses Built': 'Rumah Dibina',

    /* ---- Now selling ---- */
    'Now Selling': 'Kini Dijual',
    'Find Your Dream Home': 'Cari Rumah Impian Anda',
    'Explore our residential developments — now selling and recently completed.':
      'Terokai pembangunan kediaman kami — kini dijual dan baru siap.',
    'Sold Out': 'Habis Dijual',
    '28 homes in Kubang Rotan, Kedah — fully sold.': '28 unit rumah di Kubang Rotan, Kedah — habis dijual.',
    '42 homes in Jejawi, Perlis — fully sold, pending CCC.': '42 unit rumah di Jejawi, Perlis — habis dijual, menunggu CCC.',

    /* ---- Upcoming ---- */
    'Coming Soon': 'Akan Datang',
    'Upcoming Developments': 'Pembangunan Akan Datang',
    'New projects in the pipeline — register your interest to be the first to know.':
      'Projek baharu dalam perancangan — daftar minat anda untuk menjadi yang pertama tahu.',
    '42 Units · Freehold': '42 Unit · Pegangan Bebas',
    '76 Units · Freehold': '76 Unit · Pegangan Bebas',
    '39 Units · Freehold': '39 Unit · Pegangan Bebas',
    'Terrace, Semi-D & Bungalow': 'Teres, Berkembar & Banglo',
    'Bungalow & Semi-D': 'Banglo & Berkembar',
    '📩 Register Interest': '📩 Daftar Minat',

    /* ---- Completed projects ---- */
    'Proven Track Record': 'Rekod Prestasi Terbukti',
    'Completed Projects': 'Projek Siap',
    "Neighbourhoods we've designed, built and delivered — homes and commercial spaces now lived in and thriving across Kedah.":
      'Kejiranan yang kami reka, bina dan serahkan — rumah dan ruang komersial yang kini didiami dan berkembang maju di seluruh Kedah.',
    '✓ Completed': '✓ Siap',
    '🏘️ Terrace & Semi-D Township': '🏘️ Perumahan Teres & Berkembar',
    '🏘️ Terrace Homes': '🏘️ Rumah Teres',
    '🏠 Modern Semi-D & Bungalow': '🏠 Berkembar & Banglo Moden',
    '🏘️ Single-Storey Semi-D': '🏘️ Berkembar Setingkat',
    'Tandop Commercial Shoplots': 'Rumah Kedai Komersial Tandop',
    '🏢 Commercial Shoplots': '🏢 Rumah Kedai Komersial',

    /* ---- CTA banner ---- */
    'Find Your Dream Home Today': 'Cari Rumah Impian Anda Hari Ini',
    'Speak to our sales team for a personalised consultation.':
      'Hubungi pasukan jualan kami untuk perundingan peribadi.',

    /* ---- Footer ---- */
    'Comfortable Living, Made Simple. One of the most established property developers in Kedah and Perlis, building quality homes since 1992.':
      'Kehidupan Selesa, Dipermudahkan. Salah satu pemaju hartanah paling mapan di Kedah dan Perlis, membina rumah berkualiti sejak 1992.',
    'Follow': 'Ikuti',
    'Quick Links': 'Pautan Pantas',
    'Our Projects': 'Projek Kami',
    'Upcoming': 'Akan Datang',
    'Office': 'Pejabat',
    'Mobile': 'Telefon Bimbit',
    'Email': 'E-mel',
    'Taman Rotan Indah (28 Units)': 'Taman Rotan Indah (28 Unit)',
    'Arunika Residensi (76 Units)': 'Arunika Residensi (76 Unit)',
    'Mon–Fri 9AM–5:30PM, Sat 9AM–1PM': 'Isnin–Jumaat 9PG–5:30PTG, Sabtu 9PG–1PTG',
    '© 2026 TLS Development Sdn Bhd. All Rights Reserved. | Company No. 232807-P':
      '© 2026 TLS Development Sdn Bhd. Hak Cipta Terpelihara. | No. Syarikat 232807-P',

    /* ---- About page ---- */
    'About TLS Development': 'Tentang TLS Development',
    'Trusted. Established. Committed.': 'Dipercayai. Mapan. Komited.',
    'Who We Are': 'Siapa Kami',
    'Building Trust Since 1992': 'Membina Kepercayaan Sejak 1992',
    'TLS Development Sdn Bhd was incorporated on 15th July 1992 with the vision of becoming a leading property developer in northern Malaysia. Over the past three decades, we have built a strong reputation for delivering quality homes at affordable prices, consistently meeting the aspirations of homebuyers across Kedah and Perlis.':
      'TLS Development Sdn Bhd diperbadankan pada 15 Julai 1992 dengan visi menjadi pemaju hartanah terkemuka di utara Malaysia. Sepanjang tiga dekad yang lalu, kami telah membina reputasi yang kukuh dalam menyampaikan rumah berkualiti pada harga berpatutan, sentiasa memenuhi impian pembeli rumah di seluruh Kedah dan Perlis.',
    'From our very first project — a 40-unit shophouse and light industrial development at Pengkalan Kundur in 1992 — we have steadily expanded our portfolio to include terrace houses, semi-detached homes, bungalows, and mixed-use developments. Each project reflects our unwavering commitment to quality construction, thoughtful design, and timely delivery.':
      'Bermula dari projek pertama kami — pembangunan 40 unit rumah kedai dan industri ringan di Pengkalan Kundur pada tahun 1992 — kami terus mengembangkan portfolio kami merangkumi rumah teres, rumah berkembar, banglo dan pembangunan bercampur. Setiap projek mencerminkan komitmen kami yang tidak berbelah bahagi terhadap pembinaan berkualiti, reka bentuk yang teliti dan penyerahan tepat pada masanya.',
    'Today, TLS Development is recognized as one of the most reliable and established developers in the northern region, with a proven track record of over 2,800 houses built across the northern region.':
      'Hari ini, TLS Development diiktiraf sebagai salah satu pemaju paling dipercayai dan mapan di wilayah utara, dengan rekod prestasi terbukti melebihi 2,800 unit rumah yang telah dibina di seluruh wilayah utara.',
    'Our founder personally visits every construction site to ensure quality standards are met.':
      'Pengasas kami turun sendiri ke setiap tapak pembinaan bagi memastikan piawaian kualiti dipatuhi.',
    'Vision': 'Visi',
    'To be a sustainable and progressive property development company, always exceeding the expectations of our stakeholders and contributing to the growth and transformation of communities across northern Malaysia.':
      'Menjadi syarikat pembangunan hartanah yang lestari dan progresif, sentiasa melangkaui jangkaan pihak berkepentingan kami serta menyumbang kepada pertumbuhan dan transformasi komuniti di seluruh utara Malaysia.',
    'Mission': 'Misi',
    'Quality & Innovation': 'Kualiti & Inovasi',
    'To ensure the satisfaction of our customers by delivering innovative, quality products and services that exceed expectations.':
      'Memastikan kepuasan pelanggan kami dengan menyampaikan produk dan perkhidmatan yang inovatif dan berkualiti melangkaui jangkaan.',
    'People & Growth': 'Sumber Manusia & Pertumbuhan',
    'To generate and develop key enterprise resources with human capital as our focus, nurturing talent and building a team that drives excellence.':
      'Menjana dan membangunkan sumber utama perusahaan dengan modal insan sebagai fokus kami, memupuk bakat dan membina pasukan yang memacu kecemerlangan.',
    'Market Leadership': 'Kepimpinan Pasaran',
    'To be the market leader in every business segment of the Group, setting the benchmark for property development in northern Malaysia.':
      'Menjadi peneraju pasaran dalam setiap segmen perniagaan Kumpulan, menetapkan penanda aras bagi pembangunan hartanah di utara Malaysia.',
    'Our Core Values': 'Nilai Teras Kami',
    'Quality First': 'Kualiti Diutamakan',
    'We use only the highest quality building materials and workmanship in every project.':
      'Kami hanya menggunakan bahan binaan dan mutu kerja berkualiti tinggi dalam setiap projek.',
    'Timely Delivery': 'Penyerahan Tepat Masa',
    'We are committed to completing and delivering all projects on schedule.':
      'Kami komited untuk menyiapkan dan menyerahkan semua projek mengikut jadual.',
    'Customer Satisfaction': 'Kepuasan Pelanggan',
    "Every home is built with the buyer's needs and comfort in mind.":
      'Setiap rumah dibina dengan mengutamakan keperluan dan keselesaan pembeli.',
    'Community Building': 'Pembinaan Komuniti',
    "We don't just build houses — we create thriving communities with well-planned infrastructure and landscaping.":
      'Kami bukan sekadar membina rumah — kami mewujudkan komuniti yang berkembang maju dengan infrastruktur dan landskap yang terancang.',
    'Why TLS': 'Kenapa TLS',
    'Why Choose TLS Development?': 'Mengapa Pilih TLS Development?',
    'Over 30 years in the property development industry with more than 2,800 houses built across Kedah and Perlis.':
      'Lebih 30 tahun dalam industri pembangunan hartanah dengan lebih 2,800 unit rumah dibina di seluruh Kedah dan Perlis.',
    'Quality Construction': 'Pembinaan Berkualiti',
    'High-quality building materials and strict quality control ensure every home meets our exacting standards.':
      'Bahan binaan berkualiti tinggi dan kawalan kualiti yang ketat memastikan setiap rumah memenuhi piawaian kami.',
    'Affordable Pricing': 'Harga Berpatutan',
    'Quality homes at prices that make sense — designed for first-time homebuyers and growing families.':
      'Rumah berkualiti pada harga yang berbaloi — direka untuk pembeli rumah kali pertama dan keluarga yang berkembang.',
    'Freehold Properties': 'Hartanah Pegangan Bebas',
    'The majority of our developments are freehold — full ownership and long-term peace of mind.':
      'Majoriti pembangunan kami adalah pegangan bebas — hak milik penuh dan ketenangan jangka panjang.',
    'Our Track Record': 'Rekod Prestasi Kami',
    'Over 30 years and 2,800+ houses built — our legacy of quality developments.':
      'Lebih 30 tahun dan 2,800+ unit rumah dibina — legasi pembangunan berkualiti kami.',
    'Units Completed': 'Unit Siap',
    'Project Name': 'Nama Projek',
    'Location': 'Lokasi',
    'Period': 'Tempoh',
    'Units': 'Unit',
    'Sales Value': 'Nilai Jualan',
    'Type': 'Jenis',
    'Mix Development': 'Pembangunan Bercampur',
    'Residential': 'Kediaman',
    'Shoplot & Industry': 'Rumah Kedai & Industri',
    'What Our Buyers Say': 'Kata Pembeli Kami',
    '"We bought our first home at Taman Kota Damai and we couldn\'t be happier. The quality of construction and the peaceful neighbourhood made it the perfect choice for our family."':
      '"Kami membeli rumah pertama kami di Taman Kota Damai dan kami amat berpuas hati. Kualiti pembinaan dan kejiranan yang tenang menjadikannya pilihan sempurna untuk keluarga kami."',
    '— Homeowner, Taman Kota Damai': '— Pemilik Rumah, Taman Kota Damai',

    /* ---- Project pages: shared ---- */
    'Freehold': 'Pegangan Bebas',
    'Malay Reserve': 'Rezab Melayu',
    'Malay Reserve Land': 'Tanah Rezab Melayu',
    'Limited Units': 'Unit Terhad',
    'Enquire Now': 'Hubungi Sekarang',
    'View House Types': 'Lihat Jenis Rumah',
    'Modern Design': 'Reka Bentuk Moden',
    'Contemporary Architecture': 'Seni Bina Kontemporari',
    'House Types': 'Jenis Rumah',
    'Building Size': 'Luas Binaan',
    'Land Size': 'Luas Tanah',
    'Bedrooms': 'Bilik Tidur',
    'Bathrooms': 'Bilik Air',
    '3 Rooms': '3 Bilik',
    '2 Baths': '2 Bilik Air',
    'Total Units': 'Jumlah Unit',
    'Tenure': 'Pegangan',
    'Starting from': 'Bermula dari',
    'Priced from': 'Harga dari',
    'Priced at': 'Harga',
    'Price': 'Harga',
    'Land': 'Tanah',
    'Details on request': 'Butiran atas permintaan',
    '*Price subject to confirmation': '*Harga tertakluk kepada pengesahan',
    'Single Storey Terrace': 'Teres Setingkat',
    'Single Storey Semi-D': 'Berkembar Setingkat',
    'Semi-Detached Single Storey': 'Berkembar Setingkat',
    'Town House': 'Rumah Bandar',
    '2-Storey Terrace': 'Teres 2 Tingkat',
    'Terrace & Semi-D': 'Teres & Berkembar',
    'Key Features': 'Ciri Utama',
    'Strategic Location': 'Lokasi Strategik',
    'Find Us': 'Cari Kami',
    'Open in Google Maps': 'Buka dalam Google Maps',
    'Gallery': 'Galeri',
    'Project Progress': 'Perkembangan Projek',
    'Built by TLS Development with over 30 years of experience and 2,800+ houses built across Kedah and Perlis.':
      'Dibina oleh TLS Development dengan lebih 30 tahun pengalaman dan 2,800+ unit rumah dibina di seluruh Kedah dan Perlis.',
    '2 Units': '2 Unit',
    '8 Units': '8 Unit',
    '10 Units': '10 Unit',
    '20 Units': '20 Unit',
    '28 Units': '28 Unit',
    '30 Units': '30 Unit',
    '42 Units': '42 Unit',

    /* ---- Taman Rotan Indah ---- */
    'Free Solar System': 'Sistem Solar Percuma',
    'Worth RM17,000 per unit': 'Bernilai RM17,000 seunit',
    'Choose Your Home': 'Pilih Rumah Anda',
    'Two thoughtfully designed options to match your lifestyle and family needs.':
      'Dua pilihan reka bentuk yang teliti untuk memenuhi gaya hidup dan keperluan keluarga anda.',
    'Spacious living for growing families': 'Ruang luas untuk keluarga yang berkembang',
    'Affordable quality for first-time buyers': 'Kualiti berpatutan untuk pembeli kali pertama',
    'Why Choose Taman Rotan Indah': 'Mengapa Pilih Taman Rotan Indah',
    'Every home is designed with quality, comfort, and value in mind.':
      'Setiap rumah direka dengan mengutamakan kualiti, keselesaan dan nilai.',
    'Every unit comes with a complimentary solar panel system worth RM17,000, helping you save on electricity bills from day one.':
      'Setiap unit dilengkapi sistem panel solar percuma bernilai RM17,000, membantu anda menjimatkan bil elektrik dari hari pertama.',
    'Freehold Title': 'Hak Milik Pegangan Bebas',
    'Full ownership with freehold tenure on Malay Reserve land, providing long-term security for you and your family.':
      'Hak milik penuh dengan pegangan bebas di atas tanah Rezab Melayu, memberikan jaminan jangka panjang untuk anda dan keluarga.',
    'Contemporary architectural design with practical layouts, maximising space and natural lighting throughout every room.':
      'Reka bentuk seni bina kontemporari dengan susun atur praktikal, memaksimumkan ruang dan pencahayaan semula jadi di setiap bilik.',
    'Located in Kubang Rotan with easy access to schools, mosques, markets, and major roads connecting to Alor Setar.':
      'Terletak di Kubang Rotan dengan akses mudah ke sekolah, masjid, pasar dan jalan utama yang menghubungkan ke Alor Setar.',
    'Competitively priced homes with flexible financing options, making homeownership accessible for first-time buyers.':
      'Rumah pada harga kompetitif dengan pilihan pembiayaan fleksibel, menjadikan pemilikan rumah lebih mudah untuk pembeli kali pertama.',
    'Project Showcase': 'Pameran Projek',
    'Watch the Progress': 'Lihat Perkembangan',
    'See the development of Taman Rotan Indah and envision your future home.':
      'Lihat pembangunan Taman Rotan Indah dan bayangkan rumah masa depan anda.',
    'Your browser does not support the video tag.': 'Pelayar anda tidak menyokong tag video.',
    'Strategically located in Kubang Rotan with convenient access to daily essentials.':
      'Terletak secara strategik di Kubang Rotan dengan akses mudah ke keperluan harian.',
    'Near Route K141 — easy access to Alor Setar': 'Berhampiran Laluan K141 — akses mudah ke Alor Setar',
    'Schools and educational institutions nearby': 'Sekolah dan institusi pendidikan berdekatan',
    'Mosques and community facilities within reach': 'Masjid dan kemudahan komuniti dalam jangkauan',
    'Local markets and shops accessible': 'Pasar dan kedai tempatan mudah diakses',
    'Peaceful kampung setting with modern amenities': 'Suasana kampung yang tenang dengan kemudahan moden',
    'See the latest construction updates from our site.': 'Lihat kemas kini pembinaan terkini dari tapak kami.',

    /* ---- Taman Hijirah Jejawi ---- */
    'Pending CCC': 'Menunggu CCC',
    'Enquire Upcoming Projects': 'Tanya Projek Akan Datang',
    'View Site Progress': 'Lihat Perkembangan Tapak',
    'Terrace, Semi-D & Town House': 'Teres, Berkembar & Rumah Bandar',
    'Fully Taken Up · Pending CCC': 'Habis Dijual · Menunggu CCC',
    'Our Homes': 'Rumah Kami',
    'Three single-storey and town-house designs — all 42 units now fully sold out.':
      'Tiga reka bentuk setingkat dan rumah bandar — kesemua 42 unit kini habis dijual.',
    '30 units · Sold Out': '30 unit · Habis Dijual',
    '2 units · Sold Out': '2 unit · Habis Dijual',
    '2-storey terrace · 10 units · Sold Out': 'Teres 2 tingkat · 10 unit · Habis Dijual',
    'RM298,000 – RM389,100 · Sold Out': 'RM298,000 – RM389,100 · Habis Dijual',
    'Why Taman Hijirah Jejawi': 'Mengapa Taman Hijirah Jejawi',
    'A modern, freehold Malay Reserve township in the heart of Kangar, Perlis.':
      'Perumahan Rezab Melayu pegangan bebas yang moden di tengah-tengah Kangar, Perlis.',
    'Rezab Melayu & Freehold': 'Rezab Melayu & Pegangan Bebas',
    'Full ownership on Malay Reserve freehold land in Mukim Jejawi, Perlis — long-term security for your family.':
      'Hak milik penuh di atas tanah Rezab Melayu pegangan bebas di Mukim Jejawi, Perlis — jaminan jangka panjang untuk keluarga anda.',
    'Modern & Latest Design': 'Reka Bentuk Moden & Terkini',
    'Contemporary single-storey and town-house designs with a clean, modern architectural look.':
      'Reka bentuk setingkat dan rumah bandar kontemporari dengan rupa seni bina yang kemas dan moden.',
    'Practical Layout': 'Susun Atur Praktikal',
    'Living hall thoughtfully separated from the bedrooms and kitchen — privacy and comfort for modern family living.':
      'Ruang tamu dipisahkan dengan teliti daripada bilik tidur dan dapur — privasi dan keselesaan untuk kehidupan keluarga moden.',
    'Strategic Location in Kangar': 'Lokasi Strategik di Kangar',
    "Minutes from schools, UTC Kangar, McDonald's, Giant Hypermarket and Pekan Kangar.":
      "Beberapa minit dari sekolah, UTC Kangar, McDonald's, Giant Hypermarket dan Pekan Kangar.",
    'Mature Township': 'Perumahan Matang',
    'An established neighbourhood surrounded by a full range of daily amenities and community facilities.':
      'Kejiranan mapan yang dikelilingi pelbagai kemudahan harian dan fasiliti komuniti.',
    'Located in Taman Hijirah, Jejawi — minutes from Kangar town and its full range of amenities.':
      'Terletak di Taman Hijirah, Jejawi — beberapa minit dari pekan Kangar dan pelbagai kemudahannya.',
    'From paddy field to completed homes — the making of Taman Hijirah Jejawi.':
      'Dari sawah padi ke rumah siap — perjalanan pembinaan Taman Hijirah Jejawi.'
  };

  /* Page <title> per language — keyed by the English <title> */
  const BM_TITLES = {
    'TLS Development | Comfortable Living, Made Simple.': 'TLS Development | Kehidupan Selesa, Dipermudahkan.',
    'About Us | TLS Development Sdn Bhd': 'Tentang Kami | TLS Development Sdn Bhd',
    'Taman Rotan Indah | TLS Development': 'Taman Rotan Indah | TLS Development',
    'Taman Hijirah Jejawi | TLS Development (Sold Out)': 'Taman Hijirah Jejawi | TLS Development (Habis Dijual)'
  };

  const LANG_KEY = 'tls-lang';
  let enTitle = null;

  /* Collect every translatable text node once, remembering its English text */
  let textNodes = null;
  function collectTextNodes() {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.tagName === 'NOSCRIPT') {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.closest('.lang-toggle')) return NodeFilter.FILTER_REJECT;
        const t = n.textContent.trim();
        if (!t || !/[A-Za-z]{2,}/.test(t)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = walker.nextNode())) {
      const key = n.textContent.trim().replace(/\s+/g, ' ');
      if (BM[key]) nodes.push({ node: n, en: n.textContent, key: key });
    }
    return nodes;
  }

  function applyLang(lang) {
    if (textNodes === null) textNodes = collectTextNodes();
    if (enTitle === null) enTitle = document.title;

    const toBM = lang === 'bm';
    textNodes.forEach(function (item) {
      if (toBM) {
        /* preserve the original leading/trailing whitespace */
        const lead = item.en.match(/^\s*/)[0];
        const tail = item.en.match(/\s*$/)[0];
        item.node.textContent = lead + BM[item.key] + tail;
      } else {
        item.node.textContent = item.en;
      }
    });

    document.documentElement.lang = toBM ? 'ms' : 'en';
    document.title = (toBM && BM_TITLES[enTitle]) ? BM_TITLES[enTitle] : enTitle;

    /* Reflect state on both toggles */
    document.querySelectorAll('.lang-toggle span[data-lang]').forEach(function (span) {
      span.classList.toggle('active', span.dataset.lang === lang);
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
  }

  function injectLangStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .lang-toggle span[data-lang] {
        cursor: pointer;
        transition: opacity 0.2s;
        opacity: 0.6;
      }
      .lang-toggle span[data-lang]:hover { opacity: 1; }
      .lang-toggle span[data-lang].active {
        opacity: 1;
        text-decoration: underline;
        text-underline-offset: 4px;
      }
      .mobile-lang-toggle {
        justify-content: center;
        color: #fff;
        font-size: 1rem;
        letter-spacing: 1px;
      }
    `;
    document.head.appendChild(style);
  }

  function initLang() {
    injectLangStyles();

    let saved = 'en';
    try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { /* private mode */ }

    applyLang(saved);

    document.querySelectorAll('.lang-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        const span = e.target.closest('span[data-lang]');
        if (span) applyLang(span.dataset.lang);
      });
    });
  }

  /* ─────────────────────────────────────────────
     INJECT EVERYTHING
  ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    // Inject CTA styles into <head>
    injectCTAStyles();

    // Inject Navbar
    const navRoot = document.getElementById('tls-navbar');
    if (navRoot) navRoot.outerHTML = renderNavbar();

    // Inject CTA Banner
    const ctaRoot = document.getElementById('tls-cta-banner');
    if (ctaRoot) ctaRoot.outerHTML = renderCTABanner();

    // Inject Footer
    const footerRoot = document.getElementById('tls-footer');
    if (footerRoot) footerRoot.outerHTML = renderFooter();

    // Init shared behaviours
    initNavbarScroll();
    initHamburger();
    initParallax();

    // Language must init last — it walks the DOM after navbar/footer exist
    initLang();
  });

})();
