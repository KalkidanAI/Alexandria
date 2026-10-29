/**
 * ALEXANDRIA LUXURY HOTEL APARTMENT - CORE LOGIC
 * High-end interactive features, form validation, dynamic currency rates,
 * lightbox gallery, room details modal, and bespoke enquiry handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Currency Exchange Data & State ---
  const currencyData = {
    USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
    EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
    GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
    EGP: { symbol: 'E£', rate: 48.5, label: 'EGP (E£)' }
  };
  let currentCurrency = 'USD';

  // --- Suite Data Dictionary for Modals & Estimation ---
  const suitesData = {
    deluxe: {
      id: 'deluxe',
      name: 'Deluxe 1-Bedroom Suite',
      basePriceUSD: 1200,
      area: '75 m² / 807 sq.ft',
      bedding: '1 King Bed with Egyptian Cotton 800-TC Linens',
      occupancy: 'Up to 2 Adults + 1 Infant',
      view: 'Mediterranean Promenade View',
      image: 'images/suite-bedroom-comfort.jpg',
      description: 'The Deluxe 1-Bedroom Suite harmonizes intimate residential calm with 5-star hotel bespoke amenities. Complete with a sunlit salon, custom-fitted kitchenette, and a private balcony welcoming the sea breeze.',
      amenities: [
        'Dedicated Private Kitchenette with Nespresso Bar',
        'Italian Carrera Marble En-Suite Rain Shower',
        '65-inch 4K OLED Smart TV with Soundbar',
        'Gigabit Fiber Wi-Fi with Private Suite VPN',
        '24/7 Royal Concierge & In-Suite Dining Delivery',
        'Twice-Daily Housekeeping & Evening Turn-Down Service'
      ]
    },
    executive: {
      id: 'executive',
      name: 'Executive 2-Bedroom Suite',
      basePriceUSD: 2000,
      area: '135 m² / 1,453 sq.ft',
      bedding: '1 Master King Bed + 2 Queen Beds',
      occupancy: 'Up to 4 Adults (or 2 Adults & 2 Children)',
      view: 'Corner Panoramic Mediterranean Bay View',
      image: 'images/suite-luxury-kitchen-dining.jpg',
      description: 'Conceived for prolonged retreats and distinguished business leaders. Showcases a designer walnut chef kitchen, dining salon for six, bespoke executive study nook, and two dual-aspect waterfront balconies.',
      amenities: [
        'Full Gourmet Induction Kitchen with Granite/Marble Islands',
        'Freestanding Deep Soaking Jacuzzi Bath & Rain Pavilion',
        'Private Executive Study Desk & High-Speed Workstation',
        'In-Suite Washer & Dryer with Eco Dry-Cleaning Service',
        'Dedicated Butler On-Call 24 Hours',
        'Complimentary Subterranean Valet Parking Spot'
      ]
    },
    family: {
      id: 'family',
      name: 'Presidential Family Penthouse',
      basePriceUSD: 3500,
      area: '240 m² / 2,583 sq.ft',
      bedding: '2 Master King Beds + 2 Twin Beds + Daybed',
      occupancy: 'Up to 6-7 Guests (Families or Dignitaries)',
      view: '360° Wrap-Around Panoramic Sea & City Horizon',
      image: 'images/suite-living-salon.jpg',
      description: 'Our crown jewel on Alexandria’s skyline. Spans the penthouse level featuring three grand en-suite bedrooms, private dining salon, expansive wrap-around sun deck, and discreet chef prep quarters.',
      amenities: [
        'Private 60 m² Wrap-Around Rooftop Terrace & Dining Cabana',
        'Full Sized Italian Chef Kitchen & Private Dining for 8',
        'Private In-Suite Finnish Steam Sauna & Marble Hammam',
        'Dedicated Royal Butler & On-Demand Sommelier Service',
        'Complimentary VIP Luxury Airport Limousine Transfer',
        'Priority Access to Rooftop Azure Infinity Pool'
      ]
    }
  };

  // =========================================================================
  // 1. HEADER SCROLL & MOBILE MENU
  // =========================================================================
  const siteHeader = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNavLink();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile navigation toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Scrollspy navigation highlight
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // =========================================================================
  // 2. HERO SLIDER AUTO-ROTATION & DOTS
  // =========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(idx);
      resetSlideTimer();
    });
  });

  function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 7000);
  }
  function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
  }
  startSlideTimer();

  // =========================================================================
  // 3. CURRENCY SWITCHER & LIVE RATE UPDATES
  // =========================================================================
  const currencySelect = document.getElementById('currency-select');
  function formatPrice(usdAmount) {
    const cur = currencyData[currentCurrency] || currencyData.USD;
    const converted = Math.round(usdAmount * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  }

  function updateAllDisplayedPrices() {
    // Update suite card price tags
    document.querySelectorAll('.price-val').forEach(el => {
      const usd = parseFloat(el.getAttribute('data-usd'));
      if (!isNaN(usd)) {
        el.textContent = formatPrice(usd);
      }
    });

    // Update select options text in booking bars
    const suiteSelectHero = document.getElementById('suite-type');
    if (suiteSelectHero) {
      suiteSelectHero.options[1].text = `Deluxe 1-Bedroom Suite (From ${formatPrice(1200)}/mo)`;
      suiteSelectHero.options[2].text = `Executive 2-Bedroom Suite (From ${formatPrice(2000)}/mo)`;
      suiteSelectHero.options[3].text = `Presidential Family Penthouse (From ${formatPrice(3500)}/mo)`;
    }

    const suiteSelectDetailed = document.getElementById('enquiry-residence-type');
    if (suiteSelectDetailed) {
      suiteSelectDetailed.options[0].text = `Deluxe 1-Bedroom Suite (From ${formatPrice(1200)}/mo)`;
      suiteSelectDetailed.options[1].text = `Executive 2-Bedroom Suite (From ${formatPrice(2000)}/mo)`;
      suiteSelectDetailed.options[2].text = `Presidential Family Penthouse (From ${formatPrice(3500)}/mo)`;
    }

    // Refresh estimate if visible
    calculateHeroEstimate();
  }

  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      updateAllDisplayedPrices();
      showToast(`Display currency changed to ${currencyData[currentCurrency].label}`);
    });
  }

  // =========================================================================
  // 4. DATE VALIDATION & DYNAMIC INQUIRY ESTIMATE
  // =========================================================================
  const checkInInput = document.getElementById('check-in-date');
  const checkOutInput = document.getElementById('check-out-date');
  const suiteTypeInput = document.getElementById('suite-type');
  const estimateBanner = document.getElementById('booking-estimate-banner');
  const estimateNightsText = document.getElementById('estimate-nights-text');
  const estimateTotalAmount = document.getElementById('estimate-total-amount');

  // Initialize dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 4);

  const formatDateVal = (d) => d.toISOString().split('T')[0];

  if (checkInInput && checkOutInput) {
    checkInInput.min = formatDateVal(today);
    checkInInput.value = formatDateVal(tomorrow);

    checkOutInput.min = formatDateVal(tomorrow);
    checkOutInput.value = formatDateVal(dayAfterTomorrow);

    // Sync detailed form dates too
    const detailedIn = document.getElementById('enquiry-checkin');
    const detailedOut = document.getElementById('enquiry-checkout');
    if (detailedIn && detailedOut) {
      detailedIn.min = formatDateVal(today);
      detailedIn.value = formatDateVal(tomorrow);
      detailedOut.min = formatDateVal(tomorrow);
      detailedOut.value = formatDateVal(dayAfterTomorrow);
    }

    checkInInput.addEventListener('change', () => {
      const inVal = new Date(checkInInput.value);
      if (isNaN(inVal.getTime())) return;

      const nextDay = new Date(inVal);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutInput.min = formatDateVal(nextDay);

      if (new Date(checkOutInput.value) <= inVal) {
        checkOutInput.value = formatDateVal(nextDay);
      }
      calculateHeroEstimate();
    });

    checkOutInput.addEventListener('change', () => {
      calculateHeroEstimate();
    });

    suiteTypeInput.addEventListener('change', () => {
      calculateHeroEstimate();
    });

    // Run initial calculation
    setTimeout(calculateHeroEstimate, 300);
  }

  function calculateHeroEstimate() {
    if (!checkInInput || !checkOutInput || !estimateBanner) return;

    const inDate = new Date(checkInInput.value);
    const outDate = new Date(checkOutInput.value);

    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime()) || outDate <= inDate) {
      estimateBanner.classList.add('hidden');
      return;
    }

    const diffMs = outDate.getTime() - inDate.getTime();
    const days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
    const months = Math.max(1, Math.ceil(days / 30));

    const selectedType = suiteTypeInput.value;
    let rate = 1200;
    let suiteName = 'Deluxe 1-Bedroom Suite';

    if (selectedType === 'executive') {
      rate = 2000;
      suiteName = 'Executive 2-Bedroom Suite';
    } else if (selectedType === 'family') {
      rate = 3500;
      suiteName = 'Presidential Family Penthouse';
    } else if (selectedType === 'any') {
      rate = 1200;
      suiteName = 'Starting from Deluxe Suite';
    }

    const totalUSD = months * rate;
    estimateNightsText.textContent = `${months} Month${months > 1 ? 's' : ''} • ${suiteName}`;
    estimateTotalAmount.textContent = `${formatPrice(totalUSD)} ${currentCurrency}`;
    estimateBanner.classList.remove('hidden');
  }

  // Quick hero form submit handler -> pre-fills full booking form & scrolls down
  const heroBookingForm = document.getElementById('hero-booking-form');
  if (heroBookingForm) {
    heroBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inVal = checkInInput.value;
      const outVal = checkOutInput.value;
      const suiteVal = suiteTypeInput.value;
      const guestsVal = document.getElementById('guests-count').value;

      // Transfer values to detailed form
      const detailedIn = document.getElementById('enquiry-checkin');
      const detailedOut = document.getElementById('enquiry-checkout');
      const detailedSuite = document.getElementById('enquiry-residence-type');
      const detailedGuests = document.getElementById('enquiry-guests');

      if (detailedIn) detailedIn.value = inVal;
      if (detailedOut) detailedOut.value = outVal;
      if (detailedSuite && suiteVal !== 'any') detailedSuite.value = suiteVal;
      if (detailedGuests) detailedGuests.value = guestsVal;

      // Smooth scroll to full booking section
      const fullBookingSec = document.getElementById('full-booking');
      if (fullBookingSec) {
        fullBookingSec.scrollIntoView({ behavior: 'smooth' });
        // Highlight form momentarily
        const formCol = document.querySelector('.reservation-card__form-col');
        if (formCol) {
          formCol.style.boxShadow = '0 0 0 3px var(--color-gold)';
          setTimeout(() => { formCol.style.boxShadow = ''; }, 2000);
        }
      }

      showToast(`Selected ${guestsVal} guest(s) for ${suiteVal === 'any' ? 'Deluxe' : suiteVal} Suite. Please finalize your details below.`);
    });
  }

  // =========================================================================
  // 5. APARTMENTS FILTER TABS & PRE-FILL BUTTONS
  // =========================================================================
  const catTabs = document.querySelectorAll('.cat-tab');
  const suiteCards = document.querySelectorAll('.suite-card');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      suiteCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Pre-fill enquiry buttons on suite cards
  document.querySelectorAll('.btn-prefill-booking').forEach(btn => {
    btn.addEventListener('click', () => {
      const suiteVal = btn.getAttribute('data-suite-val');
      const suiteName = btn.getAttribute('data-suite-name');

      const detailedSuite = document.getElementById('enquiry-residence-type');
      if (detailedSuite && suiteVal) {
        detailedSuite.value = suiteVal;
      }

      const fullBookingSec = document.getElementById('full-booking');
      if (fullBookingSec) {
        fullBookingSec.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Pre-selected: ${suiteName}. Ready for dates & contact information.`);
    });
  });

  // =========================================================================
  // 6. SUITE INSPECTION MODAL (VIEW DETAILS)
  // =========================================================================
  const suiteModal = document.getElementById('suite-modal');
  const suiteModalBody = document.getElementById('suite-modal-body');
  const suiteModalClose = document.getElementById('suite-modal-close');
  const suiteModalBackdrop = document.getElementById('suite-modal-backdrop');

  function openSuiteModal(suiteId) {
    const data = suitesData[suiteId];
    if (!data || !suiteModal || !suiteModalBody) return;

    suiteModalBody.innerHTML = `
      <div class="modal-suite-header">
        <span class="gold-tag">${data.occupancy}</span>
        <h3 class="modal-suite-title">${data.name}</h3>
        <div class="modal-suite-price">From ${formatPrice(data.basePriceUSD)} <span class="per text-sm">/ month</span></div>
      </div>
      <img src="${data.image}" alt="${data.name}" class="modal-suite-img">
      <p class="modal-suite-desc">${data.description}</p>
      
      <div class="suite-specs-grid">
        <div class="spec-item">
          <strong>Area:</strong> <span>${data.area}</span>
        </div>
        <div class="spec-item">
          <strong>Bedding:</strong> <span>${data.bedding}</span>
        </div>
        <div class="spec-item">
          <strong>View:</strong> <span>${data.view}</span>
        </div>
        <div class="spec-item">
          <strong>Service:</strong> <span>Twice-Daily Housekeeping</span>
        </div>
      </div>

      <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-emerald-deep); margin-top: 10px;">Signature Included Privileges</h4>
      <ul class="modal-features-list">
        ${data.amenities.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: flex-end;">
        <button type="button" class="btn btn--outline-dark btn--sm modal-close-btn-inner">Close</button>
        <button type="button" class="btn btn--gold btn--sm modal-book-cta" data-suite-val="${data.id}">
          <span>Book Enquiry for ${data.name}</span>
        </button>
      </div>
    `;

    suiteModal.classList.add('active');
    suiteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook up internal buttons
    const closeBtnInner = suiteModalBody.querySelector('.modal-close-btn-inner');
    if (closeBtnInner) closeBtnInner.addEventListener('click', closeSuiteModal);

    const bookCta = suiteModalBody.querySelector('.modal-book-cta');
    if (bookCta) {
      bookCta.addEventListener('click', () => {
        closeSuiteModal();
        const detailedSuite = document.getElementById('enquiry-residence-type');
        if (detailedSuite) detailedSuite.value = data.id;
        document.getElementById('full-booking')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Pre-filled ${data.name} in your enquiry request.`);
      });
    }
  }

  function closeSuiteModal() {
    if (!suiteModal) return;
    suiteModal.classList.remove('active');
    suiteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-inspect-suite, .btn-inspect-suite-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const suiteId = btn.getAttribute('data-suite-id');
      openSuiteModal(suiteId);
    });
  });

  if (suiteModalClose) suiteModalClose.addEventListener('click', closeSuiteModal);
  if (suiteModalBackdrop) suiteModalBackdrop.addEventListener('click', closeSuiteModal);

  // =========================================================================
  // 7. GALLERY FILTER & LIGHTBOX MODAL
  // =========================================================================
  const galleryFilterBtns = document.querySelectorAll('.gallery-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let activeGalleryList = [];
  let currentLightboxIndex = 0;

  // Filter gallery items
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
      rebuildActiveGalleryList();
    });
  });

  function rebuildActiveGalleryList() {
    activeGalleryList = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
  }
  rebuildActiveGalleryList();

  function openLightbox(index) {
    rebuildActiveGalleryList();
    if (!activeGalleryList.length || !lightboxModal) return;

    currentLightboxIndex = (index + activeGalleryList.length) % activeGalleryList.length;
    const targetItem = activeGalleryList[currentLightboxIndex];
    const imgEl = targetItem.querySelector('img');

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxTitle.textContent = targetItem.getAttribute('data-title') || 'Alexandria Gallery';
    lightboxDesc.textContent = targetItem.getAttribute('data-caption') || '';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = activeGalleryList.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => openLightbox(currentLightboxIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => openLightbox(currentLightboxIndex + 1));

  // Keyboard navigation for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeSuiteModal();
      closeSuccessModal();
    }
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') openLightbox(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentLightboxIndex + 1);
    }
  });

  // =========================================================================
  // 8. DETAILED ENQUIRY FORM VALIDATION & SUCCESS MODAL
  // =========================================================================
  const detailedForm = document.getElementById('detailed-enquiry-form');
  const successModal = document.getElementById('enquiry-success-modal');
  const successModalBackdrop = document.getElementById('success-modal-backdrop');
  const btnCloseSuccessModal = document.getElementById('btn-close-success-modal');
  const bookingRefNumber = document.getElementById('booking-ref-number');
  const inquirySummaryPreview = document.getElementById('inquiry-summary-preview');

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnCloseSuccessModal) btnCloseSuccessModal.addEventListener('click', closeSuccessModal);
  if (successModalBackdrop) successModalBackdrop.addEventListener('click', closeSuccessModal);

  if (detailedForm) {
    detailedForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Fields
      const fullName = document.getElementById('enquiry-fullname');
      const email = document.getElementById('enquiry-email');
      const phone = document.getElementById('enquiry-phone');
      const checkIn = document.getElementById('enquiry-checkin');
      const checkOut = document.getElementById('enquiry-checkout');
      const agreement = document.getElementById('enquiry-agreement');
      const suiteSelect = document.getElementById('enquiry-residence-type');
      const guestsSelect = document.getElementById('enquiry-guests');

      // Clear errors
      document.querySelectorAll('.field-error-msg').forEach(el => el.textContent = '');

      // Name
      if (!fullName.value.trim() || fullName.value.trim().length < 3) {
        document.getElementById('err-fullname').textContent = 'Please provide your full legal name.';
        isValid = false;
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        document.getElementById('err-email').textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Phone
      if (!phone.value.trim() || phone.value.trim().length < 7) {
        document.getElementById('err-phone').textContent = 'Please enter a reachable contact number.';
        isValid = false;
      }

      // Dates
      const inDate = new Date(checkIn.value);
      const outDate = new Date(checkOut.value);
      if (isNaN(inDate.getTime())) {
        document.getElementById('err-checkin').textContent = 'Select check-in date.';
        isValid = false;
      }
      if (isNaN(outDate.getTime()) || outDate <= inDate) {
        document.getElementById('err-checkout').textContent = 'Departure must be after check-in.';
        isValid = false;
      }

      // Agreement Checkbox
      if (!agreement.checked) {
        document.getElementById('err-agreement').textContent = 'Please acknowledge that this is an enquiry request.';
        isValid = false;
      }

      if (!isValid) {
        showToast('Please correct highlighted fields before submitting.');
        return;
      }

      // Generate Random VIP Reference Number
      const randomRef = 'ALX-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      if (bookingRefNumber) bookingRefNumber.textContent = randomRef;

      // Populate summary preview
      const suiteKey = suiteSelect.value;
      const suiteObj = suitesData[suiteKey] || suitesData.deluxe;
      const nights = Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
      const totalEstimated = formatPrice(nights * suiteObj.basePriceUSD);

      if (inquirySummaryPreview) {
        inquirySummaryPreview.innerHTML = `
          <div style="margin-bottom: 8px;"><strong>Guest Name:</strong> ${escapeHtml(fullName.value)}</div>
          <div style="margin-bottom: 8px;"><strong>Residence Category:</strong> ${suiteObj.name}</div>
          <div style="margin-bottom: 8px;"><strong>Dates:</strong> ${checkIn.value} to ${checkOut.value} (${nights} night${nights > 1 ? 's' : ''})</div>
          <div style="margin-bottom: 8px;"><strong>Guests:</strong> ${guestsSelect.options[guestsSelect.selectedIndex].text}</div>
          <div><strong>Estimated Tariff:</strong> <span style="color: var(--color-emerald-deep); font-weight: bold;">${totalEstimated} ${currentCurrency}</span></div>
        `;
      }

      // Open Success Modal
      if (successModal) {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      // Reset form fields
      detailedForm.reset();
      detailedForm.querySelector('#enquiry-checkin').value = formatDateVal(tomorrow);
      detailedForm.querySelector('#enquiry-checkout').value = formatDateVal(dayAfterTomorrow);

      showToast(`Enquiry ${randomRef} logged. Reservations concierge notified!`);
    });
  }

  // =========================================================================
  // 9. GENERAL CONTACT & QUESTION FORM
  // =========================================================================
  const generalContactForm = document.getElementById('contact-general-form');
  if (generalContactForm) {
    generalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');

      document.querySelectorAll('#contact-general-form .field-error-msg').forEach(el => el.textContent = '');
      let valid = true;

      if (!name.value.trim()) {
        document.getElementById('err-contact-name').textContent = 'Please enter your name.';
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('err-contact-email').textContent = 'Please enter a valid email.';
        valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        document.getElementById('err-contact-message').textContent = 'Please enter a message (at least 10 characters).';
        valid = false;
      }

      if (!valid) return;

      generalContactForm.reset();
      showToast('Thank you! Your message was delivered to Alexandria General Management.');
    });
  }

  // =========================================================================
  // 10. NEWSLETTER SUBSCRIPTION
  // =========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email');
      const msg = document.getElementById('newsletter-msg');
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        if (msg) msg.textContent = 'Please enter a valid email address.';
        return;
      }
      if (msg) msg.textContent = '';
      newsletterForm.reset();
      showToast('Welcome to The Alexandria Gazette. Privileged dispatches will arrive in your inbox.');
    });
  }

  // =========================================================================
  // 11. TOAST SYSTEM
  // =========================================================================
  function showToast(message, duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 20 20" fill="#D6B779" width="20" height="20" style="flex-shrink:0;">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Informative alert for terms/privacy/faq demo modals
  document.querySelectorAll('.modal-open-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const type = link.getAttribute('data-modal');
      let title = 'Information Bulletin';
      let info = '';

      if (type === 'terms') {
        info = 'Terms of Residence: Guests enjoy private apartment sovereignty under 24/7 hospitality care. Check-in is 3 PM, check-out is 12 PM. Quiet hours observed after 11 PM.';
      } else if (type === 'privacy') {
        info = 'Privacy & Data Ethics: Guest correspondence and reservation enquiries are held under strict confidentiality. Data is never shared with commercial advertising partners.';
      } else if (type === 'faq') {
        info = 'FAQ: Airport limousines, daily housekeeping, private chef bookings, and high-speed fiber Wi-Fi are fully supported for all registered suites.';
      }

      showToast(info, 6000);
    });
  });

});
