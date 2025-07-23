document.addEventListener('DOMContentLoaded', function() {
  // --- Dropdown Logic ---
  var dropdownBtn = document.getElementById('solutions-btn');
  var dropdownMenu = dropdownBtn && dropdownBtn.nextElementSibling;

  if(dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      dropdownMenu.classList.toggle('show');
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  // --- Client Logo Carousel Logic ---
  const clientLogoFolders = [
    '../assets/HTML Photos/home-images/Client logo/Education',
    '../assets/HTML Photos/home-images/Client logo/Enterprise',
    '../assets/HTML Photos/home-images/Client logo/Hospitals',
    '../assets/HTML Photos/home-images/Client logo/Hotel',
    '../assets/HTML Photos/home-images/Client logo/ISP',
    '../assets/HTML Photos/home-images/Client logo/Public wifi',


    
    
   
    // Add more folders as needed
  ];

  const clientLogoImages = [
    ['image 2312.png', 'image 2313.png','image 2314.png','image 2315.png','image 2316.png','image 2317.png'], // folder1
   ['image 2323.png','image 2324.png','image 2325.png','image 2326.png','image 2327.png'],              // folder2
    ['image 2318.png', 'image 2319.png','image 2320.png','image 2321.png','image 2322.png'],
    ['image 2304.png', 'image 2305.png','image 2306.png','image 2307.png','image 2308.png','image 2309.png'],
    ['image 2296.png', 'image 2297.png','image 2298.png','image 2299.png','image 2301.png','image 2303.png'],
    ['image 2310.png', 'image 2311.png'],
    // Add more arrays as needed
  ];

  const logoFiles = [];
  clientLogoFolders.forEach((folder, idx) => {
    clientLogoImages[idx].forEach(filename => {
      logoFiles.push(`${folder}/${filename}`);
    });
  });

  const carousel = document.getElementById('client-carousel');
  let startIdx = 0;
  const visibleCount = 4; // Number of logos visible at once

  function renderCarousel() {
    if (!carousel) return;
    carousel.innerHTML = '';
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIdx + i) % logoFiles.length;
      const img = document.createElement('img');
      img.src = logoFiles[idx];
      img.alt = 'Client Logo';
      carousel.appendChild(img);
    }
  }

  function startAutoCarousel() {
    setInterval(() => {
      startIdx = (startIdx + 1) % logoFiles.length;
      renderCarousel();
    }, 500);
  }

  renderCarousel();
  startAutoCarousel();

  // --- 3rd Party Logo Carousel Logic ---
  const thirdPartyLogoFolder = '../assets/HTML Photos/home-images/3rd party logo/compresspng (1)/';

  const thirdPartyLogoImages = [
    'Frame 48096573.png',
    'Frame 48096574.png',
    'Frame 48096575.png',
    'Frame 48096576.png',
    'Frame 48096577-min.png',
    'Frame 48096578-min.png',
    'Frame 48096579.png',
    'Frame 48096581-min.png',
    'Frame 48096582-min.png',
    'Frame 48096583.png',
    'Frame 48096584.png',
    'Frame 48096585-min.png',
    'Frame 48096586-min.png',
    'Frame 48096587.png',
    'Frame 48096588-min.png',
    'Frame 48096589-min.png',
    'Frame 48096590.png',
    'Frame 48096592-min.png',
    'Frame 48096593.png',
    'Frame 48096594-min.png',
    'Frame 48096594.png',
    'Frame 48096595.png',
    // Add all your 3rd party logo filenames here
  ];

  const thirdPartyLogoFiles = thirdPartyLogoImages.map(filename => `${thirdPartyLogoFolder}${filename}`);

  const thirdPartyCarousel = document.getElementById('third-party-carousel');
  let thirdPartyStartIdx = 0;
  const thirdPartyVisibleCount = 6; // Number of logos visible at once

  function renderThirdPartyCarousel() {
    if (!thirdPartyCarousel) return;
    thirdPartyCarousel.innerHTML = '';
    for (let i = 0; i < thirdPartyVisibleCount; i++) {
      const idx = (thirdPartyStartIdx + i) % thirdPartyLogoFiles.length;
      const img = document.createElement('img');
      img.src = thirdPartyLogoFiles[idx];
      img.alt = '3rd Party Logo';
      thirdPartyCarousel.appendChild(img);
    }
  }

  function startThirdPartyAutoCarousel() {
    setInterval(() => {
      thirdPartyStartIdx = (thirdPartyStartIdx + 1) % thirdPartyLogoFiles.length;
      renderThirdPartyCarousel();
    }, 500);
  }

  renderThirdPartyCarousel();
  startThirdPartyAutoCarousel();

  // --- Accordion Logic ---
  document.querySelectorAll('.benefit-accordion-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const panel = btn.nextElementSibling;
      const isActive = btn.classList.contains('active');
      // Close all
      document.querySelectorAll('.benefit-accordion-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.benefit-accordion-panel').forEach(p => p.style.display = 'none');
      // Open if not already open
      if (!isActive) {
        btn.classList.add('active');
        panel.style.display = 'block';
      }
    });
  });

  // --- Telcos Accordion Logic ---
  document.querySelectorAll('.problems-accordion .accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.problems-accordion .accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-header').classList.remove('active');
        i.querySelector('.accordion-toggle').textContent = '+';
        if (i.querySelector('.accordion-body')) i.querySelector('.accordion-body').style.display = 'none';
      });
      // Open if not already active
      if (!isActive) {
        item.classList.add('active');
        this.classList.add('active');
        this.querySelector('.accordion-toggle').textContent = '−';
        if (item.querySelector('.accordion-body')) item.querySelector('.accordion-body').style.display = 'block';
      }
    });
  });

  // --- Testimonial slider logic for 2 cards visible, 3 slides as described ---
  const cardsContainer = document.querySelector('.testimonial-cards');
  const cards = cardsContainer ? cardsContainer.querySelectorAll('.testimonial-card') : [];
  const dots = document.querySelectorAll('.testimonial-dot-btn');
  let currentSlide = 0;

  // Clone the first card and append it to the end for wrap-around effect
  if (cardsContainer && cards.length > 0 && !cardsContainer.querySelector('.testimonial-card.clone')) {
    const firstClone = cards[0].cloneNode(true);
    firstClone.classList.add('clone');
    cardsContainer.appendChild(firstClone);
  }

  function showSlide(idx) {
    currentSlide = idx;
    if (!cards[0] || !cardsContainer) return;
    const cardStyle = getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(cardStyle.marginRight || 0) || 24;

    // For the last slide, move to the last card (which is the clone of the first)
    if (idx === 2) {
      cardsContainer.style.transform = `translateX(-${(cardWidth + gap) * 2}px)`;
    } else {
      cardsContainer.style.transform = `translateX(-${idx * (cardWidth + gap)}px)`;
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  if (cards.length && cardsContainer && dots.length) {
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => showSlide(idx));
    });

    // Initialize
    showSlide(0);
  }

  // FAQ dropdown logic
  const faqDropdowns = document.querySelectorAll('.faq-dropdown');
  faqDropdowns.forEach(drop => {
    drop.querySelector('.faq-question').addEventListener('click', function() {
      console.log('FAQ clicked');
      const isActive = drop.classList.contains('active');
      faqDropdowns.forEach(d => d.classList.remove('active'));
      if (!isActive) {
        drop.classList.add('active');
      }
    });
  });
});