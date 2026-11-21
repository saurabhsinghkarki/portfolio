(function () {
  'use strict';

  const PAGE = document.body.getAttribute('data-page') || 'home';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     DATA
     ============================================================ */
  const SKILL_GROUPS = [
    {
      name: 'Core & Frameworks', color: '#0d99ff',
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'jQuery', 'GSAP', 'Django', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'Redux']
    },
    {
      name: 'Design', color: '#9747ff',
      skills: ['UI/UX Design', 'Figma', 'Adobe Photoshop', 'Wireframing', 'Prototyping', 'Design Systems', 'AI-Assisted Design']
    },
    {
      name: 'Practices & Architecture', color: '#14ae5c',
      skills: ['Responsive Web Design', 'Cross-Browser Compatibility', 'Accessibility (ADA/WCAG)', 'ADA/WCAG Testing & Remediation', 'SEO Optimization', 'Performance Optimization', 'PageSpeed & Core Web Vitals', 'Lazy Loading', 'Component-Based Development', 'Frontend Architecture']
    },
    {
      name: 'Tools', color: '#ff8a00',
      skills: ['Git', 'GitHub', 'Chrome DevTools', 'Postman', 'npm']
    },
    {
      name: 'AI Engineering & Mentorship', color: '#ff5b8a',
      skills: ['Prompt Engineering', 'AI Skill Development', 'AI Workflow Automation', 'Claude', 'Claude Code', 'Lovable', 'ChatGPT', 'Cursor AI', 'GitHub Copilot', 'Technical Mentorship']
    }
  ];

  const HIGHLIGHTS = [
    { icon: 'sparkle', html: 'Built an AI <b>website-build skill</b> for Simplotel hotel sites — from just a hotel\'s MoM, a single skill builds the complete website, with everything it needs, in a single day.' },
    { icon: 'migrate', html: 'Built a <b>CMS-to-AI migration skill</b> that rebuilds existing Simplotel CMS websites as AI-built websites.' },
    { icon: 'gauge', html: 'Built a <b>PageSpeed optimization skill</b> that improves the page speed and Core Web Vitals of any website.' },
    { icon: 'shield', html: 'Built an <b>ADA accessibility skill</b> that automates ADA/WCAG testing and fixes for websites.' },
    { icon: 'bolt', html: 'Designed &amp; built an internal <b>Popup Generator</b>, cutting deployment time from 1+ hour to under 10 minutes.' },
    { icon: 'plug', html: 'Built a <b>Chrome Extension</b> for developers to save &amp; manage CSS snippets during debugging, preventing lost work on refresh.' },
    { icon: 'menu', html: 'Resolved recurring <b>Mega Menu</b> navigation issues at the product level, improving stability across multiple websites.' },
    { icon: 'check', html: 'Performed <b>ADA testing</b> and remediation for <b>all US websites</b> at Simplotel, fixing heading hierarchy and semantic structure to improve accessibility and SEO.' },
    { icon: 'people', html: 'Mentor for <b>5 developers</b> — technical guidance, code reviews, troubleshooting and career support.' },
    { icon: 'pen', html: 'Owned <b>UI/UX design</b> — wireframing, visual design and prototyping in Figma — across multiple client projects.' }
  ];

  const PROJECTS = [
    { id: 'earthitects', name: 'Earthitects', url: 'https://www.earthitects.com/our-brands/private-residences', industry: 'Luxury Residences', role: 'Design + Build', tag: 'Luxury Residences · Wayanad', c: ['#33302b', '#181613'], logo: 'assets/logos/earthitects.png', logoCls: 'lg-earth', panelCls: 'panel-dark' },
    { id: 'ramoji', name: 'Ramoji Film City', url: 'https://www.ramojifilmcity.com/', industry: 'Entertainment', role: 'Design + Build', tag: "World's largest film city", c: ['#e23636', '#8f1414'], logo: 'assets/logos/ramojifilmcity.png', logoCls: 'lg-ramoji', panelCls: 'panel-light' },
    { id: 'evolveback', name: 'Evolve Back', url: 'https://www.evolveback.com/', industry: 'Luxury Resorts', role: 'Design + Build', tag: 'Luxury Resorts · Karnataka', c: ['#705e5a', '#443a37'], logo: 'assets/logos/evolveback.svg', logoCls: 'lg-evolve', panelCls: 'panel-cream' },
    { id: 'polo', name: 'Polo Hotels & Resorts', url: 'https://www.polohotelsandresorts.com/', industry: 'Hotels & Resorts', role: 'Design + Build', c: ['#11998e', '#2f9e44'] },
    { id: 'grt', name: 'GRT Hotels', url: 'https://grthotels.com/', industry: 'Hotels', role: 'Design + Build', c: ['#f7971e', '#e67e22'] },
    { id: 'essentia', name: 'Essentia Hotels', url: 'https://www.essentiahotels.in/', industry: 'Hotels', role: 'Design + Build', c: ['#8e2de2', '#4a00e0'] },
    { id: 'merlis', name: 'Merlis Hotels', url: 'https://www.merlishotels.com/', industry: 'Hotels', role: 'Design + Build', c: ['#ee0979', '#ff6a00'] },
    { id: 'tamarind', name: 'Tamarind Hills', url: 'https://www.tamarindhills.com/', industry: 'Luxury Villas', role: 'Design + Build', c: ['#00b09b', '#2f9e44'] },
    { id: 'claridges', name: 'The Claridges', url: 'https://www.claridges.com/', industry: 'Luxury Hotels', role: 'Design + Build', c: ['#2c3e50', '#4ca1af'] },
    { id: 'districtgravity', name: 'District Gravity', url: 'https://www.districtgravity.com/', industry: 'Hospitality', role: 'Design + Build', c: ['#c31432', '#5a1a3a'] },
    { id: 'sajjanbagh', name: 'Sajjanbagh', url: 'https://www.sajjanbagh.in/', industry: 'Heritage Hotel', role: 'Design + Build', c: ['#f2994a', '#c98a1f'] },
    { id: 'raintree', name: 'Raintree Hotels', url: 'https://www.raintreehotels.com/', industry: 'Hotels', role: 'Design + Build', c: ['#134e5e', '#5fa87c'] }
  ];
  const FEATURED_IDS = ['earthitects', 'ramoji', 'evolveback'];
  const FEATURED = PROJECTS.filter(function (p) { return FEATURED_IDS.indexOf(p.id) !== -1; });

  const CASE_STUDIES = [
    {
      tag: 'Product Design', title: 'Hotel Booking Search', metric: '7→2 steps', c: ['#0d99ff', '#6a5cff'],
      blurb: 'How I removed a major UX friction point by redesigning the booking widget to stay persistent on Hotel Listing Pages.',
      url: 'caseStudyBookingForm.html'
    },
    {
      tag: 'UI/UX & Web Design', title: 'Earthitects: Rolls-Royce Vibe', metric: 'RR Vibe', c: ['#33302b', '#181613'],
      blurb: 'Fusing the uncompromising craftsmanship of Rolls-Royce with organic architecture for an ultra-luxury eco-estate web experience.',
      url: 'caseStudyEarthitects.html'
    },
    {
      tag: 'Frontend Automation', title: 'Popup Automation', metric: '1h→5mins', c: ['#6366f1', '#0f172a'],
      blurb: 'Designed and built an automated popup generator, bringing down custom property popup deployment time from over 1 hour to just 5 minutes with full accessibility (ADA) compliance.',
      url: 'caseStudyPopups.html'
    }
  ];

  const ICONS = {
    frame: '<path d="M5 1v12M9 1v12M1 5h12M1 9h12" stroke="currentColor" stroke-width="1.1"/>',
    bolt: '<path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" fill="none"/>',
    plug: '<path d="M6 2v3M10 2v3M4 5h8v3a4 4 0 01-4 4 4 4 0 01-4-4V5z" stroke="currentColor" stroke-width="1.1" fill="none"/><path d="M8 12v3" stroke="currentColor" stroke-width="1.1"/>',
    menu: '<path d="M2 4.5h12M2 8h12M2 11.5h8" stroke="currentColor" stroke-width="1.2"/>',
    shield: '<path d="M8 1.2l5.5 2v4.3c0 3.6-2.3 5.9-5.5 6.3-3.2-.4-5.5-2.7-5.5-6.3V3.2l5.5-2z" stroke="currentColor" stroke-width="1.1" fill="none"/>',
    people: '<circle cx="5.5" cy="5.5" r="2" stroke="currentColor" stroke-width="1.1"/><circle cx="11" cy="6" r="1.6" stroke="currentColor" stroke-width="1.1"/><path d="M1.5 14c0-2.3 1.8-4 4-4s4 1.7 4 4M9.8 10.3c1.6.2 2.7 1.6 2.7 3.4" stroke="currentColor" stroke-width="1.1" fill="none"/>',
    pen: '<path d="M2 14l1-4 8-8 3 3-8 8-4 1z" stroke="currentColor" stroke-width="1.1" fill="none"/>',
    sparkle: '<path d="M8 1.5l1.6 4.9L14.5 8l-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6L8 1.5z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" fill="none"/>',
    migrate: '<rect x="1.5" y="3" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.1" fill="none"/><rect x="9.5" y="3" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.1" fill="none"/><path d="M5 8h6M9.5 6l1.8 2-1.8 2" stroke="currentColor" stroke-width="1.1" fill="none"/>',
    gauge: '<path d="M2 11.5a6 6 0 1112 0" stroke="currentColor" stroke-width="1.1" fill="none"/><path d="M8 11.5l3-4" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="11.5" r="1" fill="currentColor"/>',
    diamond: '<path d="M7 1l6 6-6 6-6-6 6-6z" fill="currentColor"/>',
    copy: '<rect x="5" y="5" width="7" height="8" rx="1" stroke="currentColor" stroke-width="1.1" fill="none"/><path d="M3.5 10.5V3.5a1 1 0 011-1H10" stroke="currentColor" stroke-width="1.1" fill="none"/>',
    check: '<path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="1.4" fill="none"/>',
    download: '<path d="M8 1.5v7M5 6l3 3 3-3M2.5 11.5v1.5a1 1 0 001 1h9a1 1 0 001-1v-1.5" stroke="currentColor" stroke-width="1.2" fill="none"/>',
    external: '<path d="M6 3H3.5A1.5 1.5 0 002 4.5v8A1.5 1.5 0 003.5 14h8a1.5 1.5 0 001.5-1.5V10M9.5 2H14v4.5M13.5 2.5L7.5 8.5" stroke="currentColor" stroke-width="1.2" fill="none"/>',
    lock: '<rect x="3" y="7" width="10" height="6.5" rx="1.2" stroke="currentColor" stroke-width="1.1" fill="none"/><path d="M5.5 7V5.2a2.5 2.5 0 015 0V7" stroke="currentColor" stroke-width="1.1" fill="none"/>',
    arrow: '<path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" fill="none"/>'
  };
  function svg(name, size) {
    size = size || 14;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16" fill="none">' + ICONS[name] + '</svg>';
  }
  function host(url) { return url.replace(/^https?:\/\//, '').split('/')[0]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ============================================================
     BUILD CONTENT (page-specific)
     ============================================================ */
  const $ = function (id) { return document.getElementById(id); };

  // ---- Home: skills ----
  const skillsGrid = $('skillsGrid');
  if (skillsGrid) {
    SKILL_GROUPS.forEach(function (g, i) {
      const block = document.createElement('div');
      block.className = 'reveal';
      block.style.setProperty('--d', (i * 70) + 'ms');
      const chips = g.skills.map(function (s) { return '<span class="chip">' + s + '</span>'; }).join('');
      block.innerHTML =
        '<div class="skill-cat-title"><span class="skill-cat-dot" style="background:' + g.color + '"></span>' + g.name + '</div>' +
        '<div class="chip-row">' + chips + '</div>';
      skillsGrid.appendChild(block);
    });
  }

  // ---- Home: highlights ----
  const highlightGrid = $('highlightGrid');
  if (highlightGrid) {
    HIGHLIGHTS.forEach(function (h, i) {
      const card = document.createElement('div');
      card.className = 'highlight-card reveal';
      card.style.setProperty('--d', (i * 60) + 'ms');
      card.innerHTML =
        '<div class="highlight-icon">' + svg(h.icon, 18) + '</div>' +
        '<div class="highlight-text">' + h.html + '</div>';
      highlightGrid.appendChild(card);
    });
  }

  // ---- Home: featured projects (with logos) ----
  const featuredGrid = $('featuredGrid');
  if (featuredGrid) {
    FEATURED.forEach(function (p, i) {
      const a = document.createElement('a');
      a.className = 'project-card reveal';
      a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
      a.style.setProperty('--d', (i * 80) + 'ms');
      a.innerHTML =
        '<div class="project-logo ' + p.panelCls + '"><img src="' + p.logo + '" alt="' + esc(p.name) + ' logo" class="' + p.logoCls + '" loading="lazy"></div>' +
        '<div class="project-info"><div class="pi-text"><div class="project-name">' + esc(p.name) + '</div><div class="project-tag">' + esc(p.tag) + '</div></div>' +
        '<span class="pi-link">' + svg('external', 15) + '</span></div>';
      featuredGrid.appendChild(a);
    });
  }

  // ---- Home: case studies ----
  const caseGrid = $('caseGrid');
  if (caseGrid) {
    CASE_STUDIES.forEach(function (cs, i) {
      var wrapper;
      if (cs.url) {
        wrapper = document.createElement('a');
        wrapper.href = cs.url;
      } else {
        wrapper = document.createElement('article');
      }
      wrapper.className = 'case-card reveal';
      wrapper.style.setProperty('--d', (i * 80) + 'ms');
      wrapper.innerHTML =
        '<div class="case-cover" style="background:linear-gradient(135deg,' + cs.c[0] + ',' + cs.c[1] + ')">' +
        '<div class="case-mock"><span></span><span></span><span></span></div>' +
        '<span class="case-metric">' + cs.metric + '</span>' +
        '</div>' +
        '<div class="case-body">' +
        '<div class="case-tagrow"><span class="case-tag">' + cs.tag + '</span>' + (cs.url ? '<span class="case-draft" style="color:var(--green);background:rgba(20,174,92,.08)">Live</span>' : '<span class="case-draft">Draft</span>') + '</div>' +
        '<div class="case-title">' + cs.title + '</div>' +
        '<div class="case-blurb">' + cs.blurb + '</div>' +
        '<span class="case-cta">Read case study ' + svg('arrow', 13) + '</span>' +
        '</div>';
      caseGrid.appendChild(wrapper);
    });
  }

  // ---- Projects page: build a live-preview frame per project ----
  const projectFrames = $('projectFrames');
  if (projectFrames) {
    PROJECTS.forEach(function (p) {
      const sec = document.createElement('section');
      sec.className = 'frame proj-frame reveal';
      sec.id = 'p-' + p.id;
      sec.setAttribute('data-layer', p.name);
      sec.setAttribute('data-sub', 'live');
      sec.innerHTML =
        '<div class="frame-label">' + esc(p.name) + ' <span class="frame-dim">live preview</span></div>' +
        '<div class="frame-body">' +
        '<div class="browser-bar">' +
        '<div class="browser-dots"><span class="bd-r"></span><span class="bd-y"></span><span class="bd-g"></span></div>' +
        '<div class="url-pill">' + svg('lock', 12) + '<span>' + esc(host(p.url)) + '</span></div>' +
        '<a class="open-btn" href="' + p.url + '" target="_blank" rel="noopener">Open ' + svg('external', 12) + '</a>' +
        '</div>' +
        '<div class="browser-viewport" data-src="' + p.url + '" data-name="' + esc(p.name) + '">' +
        '<button type="button" class="iframe-fallback load-preview" style="background:linear-gradient(135deg,' + p.c[0] + ',' + p.c[1] + ')">' +
        '<span class="if-monitor"><svg width="34" height="34" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.4"/><path d="M10 8.5l4 2.5-4 2.5z" fill="currentColor"/></svg></span>' +
        '<span class="if-name">' + esc(p.name) + '</span>' +
        '<span class="if-note">Click to load the live site inside this frame &amp; scroll it here. Some sites block embedding — use Open&nbsp;↗ if it stays blank.</span>' +
        '<span class="load-btn">Load live preview ' + svg('arrow', 13) + '</span>' +
        '</button>' +
        '</div>' +
        '</div>';
      projectFrames.appendChild(sec);
    });

    // Click-to-load: inject the iframe on demand (avoids loading 12 heavy,
    // often frame-blocking cross-origin sites up front).
    document.addEventListener('click', function (e) {
      const btn = e.target.closest ? e.target.closest('.load-preview') : null;
      if (!btn) return;
      const vp = btn.closest('.browser-viewport');
      if (!vp || vp.classList.contains('loaded')) return;
      const ifr = document.createElement('iframe');
      ifr.src = vp.getAttribute('data-src');
      ifr.title = vp.getAttribute('data-name') + ' — live preview';
      ifr.setAttribute('loading', 'lazy');
      ifr.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      vp.appendChild(ifr);
      vp.classList.add('loaded');
    });
  }

  /* ============================================================
     FRAME HANDLES + NAVIGATION (generic, driven by DOM frames)
     ============================================================ */
  const frameEls = Array.prototype.slice.call(document.querySelectorAll('.frame'));

  frameEls.forEach(function (f) {
    const body = f.querySelector('.frame-body');
    if (!body) return;
    ['tl', 'tr', 'bl', 'br'].forEach(function (pos) {
      const h = document.createElement('span');
      h.className = 'handle ' + pos;
      body.appendChild(h);
    });
  });

  const navLinksEl = $('navLinks');
  frameEls.forEach(function (f) {
    const label = f.getAttribute('data-layer') || f.id;
    const sub = f.getAttribute('data-sub');
    const a = document.createElement('a');
    a.className = 'nav-link';
    a.href = '#' + f.id;
    a.setAttribute('data-target', f.id);
    a.innerHTML =
      '<span class="frame-icon">' + svg('frame', 13) + '</span>' +
      '<span class="nav-label">' + esc(label) + '</span>' +
      (sub ? '<span class="sub-count">' + esc(sub) + '</span>' : '');
    navLinksEl.appendChild(a);
  });

  /* ============================================================
     RIGHT PANEL — dynamic "Design" properties per active frame
     ============================================================ */
  const propsScroll = $('propsScroll');

  function propRow(key, val, copyable, copyVal) {
    return '<div class="prop-row"><span class="prop-key">' + key + '</span><span class="prop-val">' + val + '</span>' +
      (copyable ? '<button class="prop-copy" data-copy="' + String(copyVal || val).replace(/"/g, '&quot;') + '" title="Copy">' + svg('copy', 13) + '</button>' : '') +
      '</div>';
  }
  function block(title, inner) {
    return '<div class="prop-block"><div class="prop-block-title"><span>' + title + '</span></div>' + inner + '</div>';
  }
  function chipMini(arr) {
    return '<div class="chip-row" style="gap:6px">' + arr.map(function (s) { return '<span class="chip" style="padding:4px 9px;font-size:11.5px">' + s + '</span>'; }).join('') + '</div>';
  }
  function miniLink(name, url) {
    return '<div class="mini-list-row"><span class="diamond">' + svg('diamond', 10) + '</span><a href="' + url + '" target="_blank" rel="noopener">' + esc(name) + '</a><span class="ext-link">' + svg('external', 12) + '</span></div>';
  }
  function miniText(name) {
    return '<div class="mini-list-row"><span class="diamond">' + svg('diamond', 10) + '</span><span class="ml-name">' + esc(name) + '</span></div>';
  }
  function exportBlock() {
    return block('Export', '<div class="export-row"><span class="export-row-label">Resume.pdf</span><a class="export-btn" href="assets/Saurabh_Karki_Resume.pdf" download>' + svg('download', 12) + ' Download</a></div>');
  }

  const HOME_PANELS = {
    hero: function () {
      return block('Layer', propRow('Name', 'Saurabh Karki') + propRow('Role', 'Dev + Designer') + propRow('Location', 'Bengaluru, IN')) +
        block('Status', '<div class="swatch-row"><span class="swatch" style="background:#14ae5c"></span> Open to opportunities</div>') +
        block('Fill', '<div class="swatch-row"><span class="swatch" style="background:#0d99ff"></span> Accent / Blue <span class="swatch-count">#0D99FF</span></div><div class="swatch-row"><span class="swatch" style="background:#9747ff"></span> Accent / Purple <span class="swatch-count">#9747FF</span></div><div class="swatch-row"><span class="swatch" style="background:#181818"></span> Ink / Dark <span class="swatch-count">#181818</span></div>');
    },
    about: function () {
      return block('Properties', propRow('Experience', '3+ years') + propRow('Focus', 'Hospitality') + propRow('Approach', 'Design + Perf')) +
        block('Stats', propRow('Years', '3+') + propRow('Websites', '12+') + propRow('Mentees', '5') + propRow('Deploy', '6× faster'));
    },
    skills: function () {
      const rows = SKILL_GROUPS.map(function (g) {
        return '<div class="swatch-row"><span class="swatch" style="background:' + g.color + '"></span>' + g.name + '<span class="swatch-count">' + g.skills.length + '</span></div>';
      }).join('');
      const total = SKILL_GROUPS.reduce(function (n, g) { return n + g.skills.length; }, 0);
      return block('Fill', rows) + block('Summary', propRow('Total', total + ' skills') + propRow('Groups', SKILL_GROUPS.length));
    },
    experience: function () {
      return block('Properties', propRow('Company', 'Simplotel') + propRow('Role', 'Dev + Designer') + propRow('Duration', '2023–Present') + propRow('Type', 'Full-time')) +
        block('Design tools', chipMini(['Figma', 'Photoshop', 'Claude', 'Lovable', 'AI Design'])) +
        block('Dev stack', chipMini(['HTML', 'CSS', 'JS', 'React', 'GSAP']));
    },
    highlights: function () {
      const rows = HIGHLIGHTS.map(function (h) {
        const text = h.html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
        return miniText(text.slice(0, 34) + (text.length > 34 ? '…' : ''));
      }).join('');
      return block('Components', '<div class="mini-list">' + rows + '</div>') + block('Impact', propRow('Contributions', HIGHLIGHTS.length));
    },
    projects: function () {
      const rows = FEATURED.map(function (p) { return miniLink(p.name, p.url); }).join('');
      return block('Featured', '<div class="mini-list">' + rows + '</div>') +
        block('Summary', propRow('Featured', '3 shown') + propRow('Total', '12 sites') + propRow('By', 'Saurabh Karki')) +
        block('More', '<div class="export-row"><span class="export-row-label">All 12 projects</span><a class="export-btn" href="projects.html">' + svg('arrow', 12) + ' View</a></div>');
    },
    casestudies: function () {
      const rows = CASE_STUDIES.map(function (c) { return miniText(c.title); }).join('');
      return block('Components', '<div class="mini-list">' + rows + '</div>') +
        block('Status', propRow('Count', CASE_STUDIES.length) + propRow('Live', '3') + propRow('Draft', '0'));
    },
    contact: function () {
      return block('Contact', propRow('Email', 'sskmas2058@gmail.com', true) + propRow('Phone', '+91 8006601623', true) + propRow('LinkedIn', '/saurabh-karki', true, 'https://www.linkedin.com/in/saurabh-karki-271838140/') + propRow('Location', 'Bengaluru, IN'));
    }
  };

  function projectsPanel(id) {
    if (id === 'overview') {
      return block('Layer', propRow('Name', 'All Projects') + propRow('Frames', PROJECTS.length) + propRow('Type', 'Index')) +
        block('Meta', propRow('Designed by', 'Saurabh Karki') + propRow('Flow', 'Figma → Prod')) +
        block('Back', '<div class="export-row"><span class="export-row-label">Portfolio</span><a class="export-btn" href="index.html">' + svg('arrow', 12) + ' Home</a></div>');
    }
    const p = PROJECTS.filter(function (x) { return 'p-' + x.id === id; })[0];
    if (!p) return HOME_PANELS.hero();
    return block('Layer', propRow('Name', p.name) + propRow('Type', 'Frame') + propRow('Fill', 'iframe')) +
      block('Link', propRow('Domain', esc(host(p.url)), true, p.url) +
        '<div class="export-row" style="margin-top:8px"><span class="export-row-label">Live site</span><a class="export-btn" href="' + p.url + '" target="_blank" rel="noopener">' + svg('external', 12) + ' Open</a></div>') +
      block('Meta', propRow('Industry', p.industry) + propRow('Role', p.role) + propRow('By', 'Saurabh Karki'));
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* unavailable */ }
    document.body.removeChild(ta);
  }

  const CS_PANELS = {
    'cs-overview': function () { return block('Layer', propRow('Name', 'Overview') + propRow('Type', 'Hero Frame')) + block('Case Study', propRow('Company', 'Polo Hotels') + propRow('Role', 'Designer + Dev') + propRow('Duration', '2 Weeks') + propRow('Platform', 'Responsive Web')); },
    'cs-background': function () { return block('Layer', propRow('Name', 'Background') + propRow('Section', '01 · Context')); },
    'cs-research': function () { return block('Layer', propRow('Name', 'Research') + propRow('Section', '02 · Research')) + block('Audit', propRow('Platforms', '5') + propRow('Best', 'Booking.com') + propRow('Worst', 'Hilton')); },
    'cs-persona': function () { return block('Layer', propRow('Name', 'Persona') + propRow('Section', '03 · Persona')) + block('User', propRow('Name', 'Meera Anand') + propRow('Role', 'Mktg Director') + propRow('City', 'Bengaluru')); },
    'cs-journey': function () { return block('Layer', propRow('Name', 'Journey') + propRow('Section', '04 · Journey')) + block('Steps', propRow('Total', '7') + propRow('Pain Point', 'Step 05')); },
    'cs-solution': function () { return block('Layer', propRow('Name', 'Solution') + propRow('Section', '05 · Solution')) + block('Impact', propRow('Before', '7 steps') + propRow('After', '2 steps')); },
    'cs-decisions': function () { return block('Layer', propRow('Name', 'Design Decisions') + propRow('Section', '06 · Decisions')) + block('Summary', propRow('Decisions', '7')); },
    'cs-wireframes': function () { return block('Layer', propRow('Name', 'Wireframes') + propRow('Section', '07 · Wireframes')) + block('Breakpoints', propRow('Desktop', '1440px') + propRow('Tablet', '834px') + propRow('Mobile', '390px')); },
    'cs-comparison': function () { return block('Layer', propRow('Name', 'Before / After') + propRow('Section', '08 · Comparison')); },
    'cs-metrics': function () { return block('Layer', propRow('Name', 'Impact') + propRow('Section', '09 · Metrics')) + block('KPIs', propRow('Clicks ↓', '70%') + propRow('Back-nav ↓', '100%') + propRow('Speed ↑', '2×')); },
    'cs-learnings': function () { return block('Layer', propRow('Name', 'Learnings') + propRow('Section', '10 · Learnings')); }
  };

  const CS_EARTHITECTS_PANELS = {
    'cs-overview': function () { return block('Layer', propRow('Name', 'Overview') + propRow('Type', 'Hero Frame')) + block('Case Study', propRow('Company', 'Earthitects') + propRow('Role', 'Designer + Dev') + propRow('Duration', '3 Weeks') + propRow('Vibe', 'Rolls-Royce')); },
    'cs-background': function () { return block('Layer', propRow('Name', 'Background') + propRow('Section', '01 · Context')) + block('Goal', propRow('Brand', 'Earthitects') + propRow('Inspiration', 'Rolls-Royce')); },
    'cs-vibe': function () { return block('Layer', propRow('Name', 'The Vibe') + propRow('Section', '02 · RR Vibe')) + block('Aesthetics', propRow('Concept', 'Precision meets Raw') + propRow('Theme', 'Luxury Organic')); },
    'cs-audit': function () { return block('Layer', propRow('Name', 'RR Spirit') + propRow('Section', '03 · Audit')) + block('RR DNA', propRow('Craftsmanship', 'Zero compromise') + propRow('Materiality', 'Wood, Stone, Metal')); },
    'cs-decisions': function () { return block('Layer', propRow('Name', 'Design Decisions') + propRow('Section', '04 · Decisions')) + block('Tokens', propRow('Primary font', 'Outfit') + propRow('Accent font', 'Playfair Display') + propRow('Bg color', '#181613')); },
    'cs-comparison': function () { return block('Layer', propRow('Name', 'Before / After') + propRow('Section', '05 · Comparison')) + block('Contrast', propRow('RR Precision', 'Polished/Sleek') + propRow('Eco Touch', 'Raw/Organic')); },
    'cs-learnings': function () { return block('Layer', propRow('Name', 'Learnings') + propRow('Section', '06 · Learnings')); }
  };

  const CS_POPUPS_PANELS = {
    'cs-overview': function () { return block('Layer', propRow('Name', 'Overview') + propRow('Type', 'Hero Frame')) + block('Case Study', propRow('Company', 'Simplotel') + propRow('Role', 'Developer + Designer') + propRow('Duration', '1 Week') + propRow('Theme', 'Automation & A11y')); },
    'cs-background': function () { return block('Layer', propRow('Name', 'Background') + propRow('Section', '01 · Context')) + block('Goal', propRow('Constraint', 'ADA/WCAG') + propRow('Efficiency', '60m to 5m')); },
    'cs-combinations': function () { return block('Layer', propRow('Name', 'Combinations') + propRow('Section', '02 · Matrix')) + block('Scope', propRow('Layout Motifs', '4 styles') + propRow('Application', 'Distinct/Shared')); },
    'cs-automation': function () { return block('Layer', propRow('Name', 'Automation') + propRow('Section', '03 · Engine')) + block('Engine', propRow('Frequency Caps', 'Session-level') + propRow('Parsing', 'JSON metadata')); },
    'cs-decisions': function () { return block('Layer', propRow('Name', 'A11y Decisions') + propRow('Section', '04 · Compliance')) + block('A11y Tokens', propRow('Focus Trapping', 'Tab intercept') + propRow('Dismissal', 'Escape hooks')); },
    'cs-comparison': function () { return block('Layer', propRow('Name', 'Before / After') + propRow('Section', '05 · Comparison')); },
    'cs-metrics': function () { return block('Layer', propRow('Name', 'Impact') + propRow('Section', '06 · Impact')) + block('Tally', propRow('Time Saving', '90%') + propRow('Bugs Count', '0 reported')); },
    'cs-learnings': function () { return block('Layer', propRow('Name', 'Learnings') + propRow('Section', '07 · Reflections')); }
  };

  function renderPanel(id) {
    if (!propsScroll) return;
    let inner;
    if (PAGE === 'projects') inner = projectsPanel(id);
    else if (PAGE === 'casestudy') {
      const csType = document.body.getAttribute('data-cs');
      if (csType === 'earthitects') {
        inner = (CS_EARTHITECTS_PANELS[id] || CS_EARTHITECTS_PANELS['cs-overview'])();
      } else if (csType === 'popups') {
        inner = (CS_POPUPS_PANELS[id] || CS_POPUPS_PANELS['cs-overview'])();
      } else {
        inner = (CS_PANELS[id] || CS_PANELS['cs-overview'])();
      }
    }
    else inner = (HOME_PANELS[id] || HOME_PANELS.hero)();
    propsScroll.innerHTML = inner + exportBlock();
    Array.prototype.forEach.call(propsScroll.querySelectorAll('[data-copy]'), function (btn) {
      btn.addEventListener('click', function () {
        copyText(btn.getAttribute('data-copy'));
        const original = btn.innerHTML;
        btn.innerHTML = svg('check', 13);
        setTimeout(function () { btn.innerHTML = original; }, 1200);
      });
    });
  }

  /* ============================================================
     SCROLL-SPY
     ============================================================ */
  const navLinkEls = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  const activeCrumbSection = $('activeCrumbSection');
  const statusLayer = $('statusLayer');
  const canvas = $('canvas');
  let currentActive = null;

  function labelFor(id) {
    const f = document.getElementById(id);
    return (f && f.getAttribute('data-layer')) || id;
  }
  function setActive(id) {
    if (id === currentActive) return;
    currentActive = id;
    frameEls.forEach(function (f) { f.classList.toggle('active', f.id === id); });
    navLinkEls.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-target') === id); });
    const label = labelFor(id);
    if (activeCrumbSection) activeCrumbSection.textContent = label;
    if (statusLayer) statusLayer.textContent = label;
    renderPanel(id);
  }

  if (frameEls.length) renderPanel(frameEls[0].id);

  if (canvas && 'IntersectionObserver' in window) {
    const ratios = new Map();
    frameEls.forEach(function (f) { ratios.set(f.id, 0); });
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      let bestId = null, bestRatio = 0;
      ratios.forEach(function (ratio, id) { if (ratio > bestRatio) { bestRatio = ratio; bestId = id; } });
      if (bestId) setActive(bestId);
    }, { root: canvas, threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] });
    frameEls.forEach(function (f) { io.observe(f); });
  }

  /* iOS Safari: scrollIntoView() scrolls every scrollable ancestor including the
     document. Because body is overflow:hidden and .app used to exceed the visible
     viewport, that left the page shifted with the topbar (and its panel toggles)
     stranded off-screen and no way to scroll back. Scroll the #canvas container
     directly instead, so the document scroll offset is never involved. */
  function scrollFrameIntoCanvas(target, smooth) {
    if (!target) return;
    if (!canvas || !canvas.contains(target)) {
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    } else {
      const dest = canvas.scrollTop +
        (target.getBoundingClientRect().top - canvas.getBoundingClientRect().top) - 12;
      if (typeof canvas.scrollTo === 'function') {
        canvas.scrollTo({ top: dest, behavior: smooth ? 'smooth' : 'auto' });
      } else {
        canvas.scrollTop = dest;
      }
    }
    resetDocScroll();
  }

  // Belt-and-braces: if anything did shift the document, pin it back to the origin.
  function resetDocScroll() {
    if (window.pageYOffset || window.pageXOffset) window.scrollTo(0, 0);
    const de = document.documentElement;
    if (de.scrollTop) de.scrollTop = 0;
    if (de.scrollLeft) de.scrollLeft = 0;
    if (document.body.scrollTop) document.body.scrollTop = 0;
    if (document.body.scrollLeft) document.body.scrollLeft = 0;
  }

  navLinkEls.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobilePanels();
      scrollFrameIntoCanvas(document.getElementById(link.getAttribute('data-target')), !reduceMotion);
    });
  });

  /* ============================================================
     ZOOM CONTROLS
     ============================================================ */
  const canvasInner = $('canvasInner');
  const zoomLevelEl = $('zoomLevel');
  const topZoomEl = $('topZoom');
  let zoom = 1;
  function applyZoom() {
    if (canvasInner) canvasInner.style.transform = 'scale(' + zoom + ')';
    const pct = Math.round(zoom * 100) + '%';
    if (zoomLevelEl) zoomLevelEl.textContent = pct;
    if (topZoomEl) topZoomEl.textContent = pct;
    syncRulers();
  }
  const zoomInBtn = $('zoomIn'), zoomOutBtn = $('zoomOut'), zoomResetBtn = $('zoomReset');
  if (zoomInBtn) zoomInBtn.addEventListener('click', function () { zoom = Math.min(1.5, +(zoom + 0.1).toFixed(2)); applyZoom(); });
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', function () { zoom = Math.max(0.5, +(zoom - 0.1).toFixed(2)); applyZoom(); });
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', function () { zoom = 1; applyZoom(); });

  /* ============================================================
     RULERS
     ============================================================ */
  const rulerTop = $('rulerTop');
  const rulerLeft = $('rulerLeft');
  function buildRulerTicks() {
    if (!rulerTop || !rulerLeft) return;
    const span = 6000;
    let th = '', lh = '';
    for (let x = 0; x <= span; x += 100) {
      th += '<span style="position:absolute;left:' + x + 'px;top:0;font-size:8px;color:#6b6b6b;font-family:var(--mono);white-space:nowrap;">' + x + '</span>';
    }
    for (let y = 0; y <= span; y += 100) {
      lh += '<span style="position:absolute;top:' + y + 'px;left:2px;font-size:8px;color:#6b6b6b;font-family:var(--mono);writing-mode:vertical-rl;">' + y + '</span>';
    }
    rulerTop.innerHTML = th; rulerLeft.innerHTML = lh;
  }
  buildRulerTicks();
  function syncRulers() {
    if (!canvas || !rulerTop || !rulerLeft) return;
    rulerTop.style.transformOrigin = 'left top';
    rulerLeft.style.transformOrigin = 'top left';
    rulerTop.style.transform = 'translateX(' + (-canvas.scrollLeft) + 'px) scaleX(' + zoom + ')';
    rulerLeft.style.transform = 'translateY(' + (-canvas.scrollTop) + 'px) scaleY(' + zoom + ')';
  }
  if (canvas) { canvas.addEventListener('scroll', syncRulers, { passive: true }); syncRulers(); }

  /* ============================================================
     TOOLBAR (decorative)
     ============================================================ */
  Array.prototype.forEach.call(document.querySelectorAll('.tool-btn'), function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('.tool-btn'), function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  /* ============================================================
     MOBILE SIDEBAR TOGGLES
     ============================================================ */
  const leftPanel = $('leftPanel');
  const rightPanel = $('rightPanel');
  const scrim = document.createElement('div');
  scrim.className = 'scrim';
  document.body.appendChild(scrim);

  const menuToggle = $('menuToggle'), rightToggle = $('rightToggle');

  function syncExpanded() {
    if (menuToggle) menuToggle.setAttribute('aria-expanded',
      leftPanel && leftPanel.classList.contains('open') ? 'true' : 'false');
    if (rightToggle) rightToggle.setAttribute('aria-expanded',
      rightPanel && rightPanel.classList.contains('open') ? 'true' : 'false');
  }

  function closeMobilePanels() {
    if (leftPanel) leftPanel.classList.remove('open');
    if (rightPanel) rightPanel.classList.remove('open');
    scrim.classList.remove('show');
    syncExpanded();
  }

  function togglePanel(panel) {
    if (!panel) return;
    const willOpen = !panel.classList.contains('open');
    closeMobilePanels();
    if (willOpen) { panel.classList.add('open'); scrim.classList.add('show'); }
    syncExpanded();
  }

  if (menuToggle) menuToggle.addEventListener('click', function () { togglePanel(leftPanel); });
  if (rightToggle) rightToggle.addEventListener('click', function () { togglePanel(rightPanel); });

  /* iOS Safari does not reliably dispatch `click` on a bare <div>, which left the
     scrim un-tappable on iPhone. pointerdown/touchstart cover it; closeMobilePanels
     is idempotent so firing more than once is harmless. */
  scrim.addEventListener('click', closeMobilePanels);
  scrim.addEventListener('pointerdown', closeMobilePanels);
  scrim.addEventListener('touchstart', closeMobilePanels, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') closeMobilePanels();
  });

  // The panels are an overlay only below the breakpoint; never leave them stuck open.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1320) closeMobilePanels();
  });

  syncExpanded();

  /* ============================================================
     SCROLL-REVEAL + STAT COUNT-UP
     ============================================================ */
  function countUp(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 900; const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  const revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (canvas && 'IntersectionObserver' in window && !reduceMotion) {
    const ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          const nums = e.target.querySelectorAll ? e.target.querySelectorAll('.stat-num[data-count]') : [];
          Array.prototype.forEach.call(nums, countUp);
          ro.unobserve(e.target);
        }
      });
    }, { root: canvas, threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ============================================================
     HERO ROLE ROTATOR
     ============================================================ */
  const rotWords = $('rotWords');
  if (rotWords && !reduceMotion) {
    const words = rotWords.children.length;
    let idx = 0;
    setInterval(function () {
      idx = (idx + 1) % words;
      rotWords.style.transform = 'translateY(-' + (idx * 1.5) + 'em)';
    }, 2300);
  }

  /* ============================================================
     CUSTOM GLASS CURSOR (fine pointers only)
     ============================================================ */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reduceMotion) {
    document.documentElement.classList.add('has-cursor');
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    document.body.appendChild(ring); document.body.appendChild(dot);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const HOVER_SEL = 'a,button,.nav-link,.tool-btn,.panel-tab,.chip,.project-card,.case-card,.contact-card,.open-btn,.prop-copy,.stat-card,.highlight-card,input,[data-cursor]';

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      const hov = e.target.closest && e.target.closest(HOVER_SEL);
      document.body.classList.toggle('cursor--hover', !!hov);
    }, { passive: true });
    document.addEventListener('mousedown', function () { document.body.classList.add('cursor--down'); });
    document.addEventListener('mouseup', function () { document.body.classList.remove('cursor--down'); });
    document.addEventListener('mouseleave', function () { ring.style.opacity = '0'; dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { ring.style.opacity = ''; dot.style.opacity = ''; });

    function raf() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hide custom cursor over live-preview iframes (mouse events stop there)
    Array.prototype.forEach.call(document.querySelectorAll('.browser-viewport'), function (vp) {
      vp.addEventListener('mouseenter', function () { if (vp.classList.contains('loaded')) document.body.classList.add('iframe-hover'); });
      vp.addEventListener('mouseleave', function () { document.body.classList.remove('iframe-hover'); });
    });
  }

  /* ============================================================
     CASE STUDY — INTERACTIVE DEMO WIDGET
     ============================================================ */
  if (PAGE === 'casestudy') {
    var stepperToggle = $('stepperToggle');
    var stepperPop = $('stepperPop');
    var guestCountEl = $('guestCount');
    var roomCountEl = $('roomCount');
    var demoSearchBtn = $('demoSearchBtn');
    var demoToast = $('demoToast');
    var counts = { guests: 2, rooms: 1 };

    function updateStepperLabel() {
      if (stepperToggle) stepperToggle.textContent = counts.guests + ' guest' + (counts.guests !== 1 ? 's' : '') + ' · ' + counts.rooms + ' room' + (counts.rooms !== 1 ? 's' : '');
    }

    if (stepperToggle && stepperPop) {
      stepperToggle.addEventListener('click', function () {
        var isOpen = !stepperPop.hasAttribute('hidden');
        if (isOpen) { stepperPop.hidden = true; stepperToggle.setAttribute('aria-expanded', 'false'); }
        else { stepperPop.hidden = false; stepperToggle.setAttribute('aria-expanded', 'true'); }
      });
      document.addEventListener('click', function (e) {
        var gf = $('guestField');
        if (gf && !gf.contains(e.target)) { stepperPop.hidden = true; stepperToggle.setAttribute('aria-expanded', 'false'); }
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-target][data-dir]') : null;
      if (!btn) return;
      var target = btn.getAttribute('data-target');
      var dir = parseInt(btn.getAttribute('data-dir'), 10);
      counts[target] = Math.max(1, (counts[target] || 1) + dir);
      if (target === 'guests' && guestCountEl) guestCountEl.textContent = counts.guests;
      if (target === 'rooms' && roomCountEl) roomCountEl.textContent = counts.rooms;
      updateStepperLabel();
    });

    if (demoSearchBtn && demoToast) {
      demoSearchBtn.addEventListener('click', function () {
        demoToast.textContent = '✓ Results updated for ' + counts.guests + ' guest' + (counts.guests !== 1 ? 's' : '') + ', ' + counts.rooms + ' room' + (counts.rooms !== 1 ? 's' : '') + ' — no page reload needed.';
        demoToast.classList.add('show');
        setTimeout(function () { demoToast.classList.remove('show'); }, 3500);
      });
    }

    /* Count-up for case study metrics */
    var csMetricNums = Array.prototype.slice.call(document.querySelectorAll('.cs-metric-num[data-count]'));
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); mio.unobserve(e.target); }
        });
      }, { root: canvas, threshold: 0.1 });
      csMetricNums.forEach(function (el) { mio.observe(el); });
    } else {
      csMetricNums.forEach(countUp);
    }

    /* Earthitects customizer widget */
    var veneerSelect = $('veneerSelect');
    var accentSelect = $('accentSelect');
    var hardwareSelect = $('hardwareSelect');
    var veneerApplyBtn = $('veneerApplyBtn');
    var earthPreview = $('earthPreview');
    var previewStatus = $('previewStatus');
    var previewVisual = $('previewVisual');
    var previewBlurb = $('previewBlurb');

    if (veneerApplyBtn && veneerSelect && accentSelect && hardwareSelect && earthPreview) {
      veneerApplyBtn.addEventListener('click', function () {
        var veneer = veneerSelect.value;
        var accent = accentSelect.value;
        var hardware = hardwareSelect.value;

        var name = '';
        var bg = '';
        var border = '';
        var blurbText = '';

        if (veneer === 'polished' && accent === 'spirit' && hardware === 'chrome') {
          name = 'The Pure Rolls-Royce';
          bg = 'linear-gradient(135deg, #1f242e, #0d0f14)';
          border = '1px solid #2f3647';
          blurbText = 'Sleek royal walnut, mirror-finished chrome, and starlight headliner. The absolute pinnacle of classical luxury.';
        } else if (veneer === 'raw' && accent === 'organic' && hardware === 'bronze') {
          name = 'The Pure Earthitects';
          bg = 'linear-gradient(135deg, #2c2824, #141210)';
          border = '1px solid #3c3731';
          blurbText = 'Stone Lodges design: rustic raw timber, hand-carved granite textures, and antique bronze. Deep organic connection.';
        } else {
          name = 'Earthitects Bespoke (RR Vibe)';
          bg = 'linear-gradient(135deg, #2b2721, #0f0f0e)';
          border = '1px solid #c5a880';
          blurbText = 'A rare hybrid: ' + (veneer === 'polished' ? 'Polished Walnut' : 'Raw Timber') + ' veneer with ' + (accent === 'spirit' ? 'Starlight detailing' : 'Granite accents') + ', finished in ' + (hardware === 'chrome' ? 'Mirror Chrome.' : 'Antique Bronze.');
        }

        earthPreview.style.background = bg;
        earthPreview.style.border = border;
        if (previewStatus) previewStatus.textContent = 'Bespoke combination assembled';
        if (previewVisual) previewVisual.textContent = name;
        if (previewBlurb) previewBlurb.textContent = blurbText;

        if (demoToast) {
          demoToast.textContent = '✓ Bespoke design assembled successfully — showing inline combination.';
          demoToast.classList.add('show');
          setTimeout(function () { demoToast.classList.remove('show'); }, 3000);
        }
      });
    }

    /* Popup customizer widget */
    var layoutSelect = $('layoutSelect');
    var triggerSelect = $('triggerSelect');
    var capSelect = $('capSelect');
    var simulateBtn = $('simulateBtn');
    var automationPreview = $('automationPreview');
    var simStatus = $('simStatus');
    var simVisual = $('simVisual');
    var simBlurb = $('simBlurb');

    if (simulateBtn && layoutSelect && triggerSelect && capSelect && automationPreview) {
      simulateBtn.addEventListener('click', function () {
        var layout = layoutSelect.value;
        var trigger = triggerSelect.value;
        var cap = capSelect.value;

        var name = '';
        var bg = '';
        var border = '';
        var blurbText = '';

        if (layout === 'image') {
          name = 'Banner Image Only (wt1img)';
          bg = '#0f172a';
          border = '1px dashed var(--indigo)';
          blurbText = 'Banner display initialized. Exit-intent bounds locked. ' + (cap === 'once' ? 'Lock key: sessionStorage.popup_shown_default = true.' : 'Cap disabled.');
        } else if (layout === 'text') {
          name = 'Editorial Header & Link (custom-text)';
          bg = '#1e293b';
          border = '1px solid var(--indigo)';
          blurbText = 'Header text & CTA button markup parsed. ADA compliance wrappers applied. ' + (trigger === 'exit' ? 'Listener active on exit-intent.' : 'Delay set to 4000ms.');
        } else {
          name = 'Promotional Video (wt1video)';
          bg = '#020617';
          border = '2px solid var(--indigo)';
          blurbText = 'Autoplay muted trigger parsed. Keyboard focus trapped within video overlay controls.';
        }

        automationPreview.style.background = bg;
        automationPreview.style.borderColor = '#6366f1';
        if (simStatus) simStatus.textContent = 'Configuration Loaded & Checked (ADA Compliant)';
        if (simVisual) simVisual.textContent = name;
        if (simBlurb) simBlurb.textContent = blurbText;

        if (demoToast) {
          demoToast.textContent = '✓ Configuration injected successfully — rendering ' + name;
          demoToast.classList.add('show');
          setTimeout(function () { demoToast.classList.remove('show'); }, 3000);
        }
      });
    }
  }

  /* ============================================================
     MISC
     ============================================================ */
  const yearEl = $('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  resetDocScroll();
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(function () { scrollFrameIntoCanvas(target, false); }, 40);
  }
})();
