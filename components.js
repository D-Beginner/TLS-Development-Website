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
            <div class="nav-dropdown-divider"></div>
            <a href="${href('#projects')}" class="nav-dropdown-footer">View All Projects →</a>
          </div>
        </div>
        <a href="${href('#contact')}">Contact</a>
      </div>
      <div class="nav-actions">
        <div class="lang-toggle">
          <span class="active">EN</span> / <span>BM</span>
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
      </div>
      <div class="mobile-menu-divider"></div>
      <a href="${href('#contact')}">Contact</a>
      <a href="${CFG.whatsapp}" class="btn btn-whatsapp mobile-wa-btn" target="_blank">WhatsApp Us</a>
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
  });

})();
