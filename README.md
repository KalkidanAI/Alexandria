# Alexandria Luxury Hotel Apartment — Website Documentation

A modern, production-grade luxury website for **Alexandria Luxury Hotel Apartment**.

---

## 🏛️ Brand & Aesthetic Direction
- **Primary Deep Emerald**: `#153B35` (Atmospheric, aristocratic Mediterranean depth)
- **Champagne Gold**: `#D6B779` (Metallic accents, button glows, borders, and badges)
- **Warm Ivory & Cream**: `#F7F3EA` & `#EFE9DB` (Warm, welcoming, high-contrast backgrounds)
- **Typography**:
  - Headings: *Cormorant Garamond* & *Cinzel* (High-fashion serif)
  - Body: *Plus Jakarta Sans* (Sleek, modern legibility)
- **Authentic Property Assets**: Integrated real property photography including:
  - Illuminated twin towers at dusk with rooftop `"ALEXANDRIA"` signage
  - Bespoke walnut & marble dining salon and chef kitchen
  - Deluxe king bedroom suites, living parlor, and galley kitchens

---

## ✨ Features & Architecture

1. **Top Announcement Bar**:
   - Currency switcher (**USD ($)**, **EUR (€)**, **GBP (£)**, **EGP (E£)**) dynamically updating prices in real-time across all suite cards and booking estimates.
   - Concierge direct contact and demo showcase label.

2. **Glassmorphism Navigation**:
   - Sticky header with blur backdrop (`backdrop-filter: blur(12px)`).
   - Responsive mobile drawer menu with accessible keyboard and tap control.
   - Smooth scrollspy navigation highlighting the active section.

3. **Cinematic Hero Section**:
   - Required headline: **'Stay in Comfort. Live Beautifully.'**
   - High-definition crossfade carousel showcasing the property facade and interiors.
   - Luxury action CTAs and feature badges (5-star private butler, sea view balconies, gated security).

4. **Interactive Quick Booking Inquiry Bar**:
   - Check-in and check-out date selectors with automatic minimum date validation.
   - Guest count selector and room category choice.
   - **Live rate estimation banner**: Calculates nights and estimated price on the fly before submission.

5. **About Us ("The Alexandria Legacy")**:
   - Residential philosophy honoring five-star boutique hospitality principles.
   - Quantitative distinction badges (48 Bespoke Suites, 24/7 Royal Concierge, 100% Verified Amenities, 4.9★ Preview Rating).
   - High-end layered imagery composition.

6. **Distinguished Residences (Suites & Apartments)**:
   - **Deluxe 1-Bedroom Suite** (From $240/night)
   - **Executive 2-Bedroom Suite** (From $380/night)
   - **Presidential Family Penthouse** (From $620/night)
   - Category filter tabs (**All**, **Deluxe**, **Executive**, **Family**).
   - Detailed floor plan specifications (area in m²/sq.ft, bedding, max occupancy, balcony views).
   - **Interactive "View Details" Modal**: Opens modal with full amenities checklist, photography, and pre-filled booking CTA.

7. **Verified Hotel Amenities**:
   - Gigabit Fiber Wi-Fi with suite VPN
   - 24/7 Royal Concierge & Doorman
   - Rooftop Infinity Azure Pool & Solarium
   - Private Chef & Gourmet In-Suite Dining
   - Secure Valet & Underground Parking
   - Daily Housekeeping & Laundry

8. **Filterable Lightbox Visual Gallery**:
   - Categories: *All Perspectives*, *Suites & Interiors*, *Dining & Lounges*, *Wellness & Pool*, *Architecture & Sea*.
   - Click-to-enlarge Lightbox Modal with Next/Previous navigation and keyboard controls (`Esc`, `←`, `→`).

9. **Curated Guest Impressions (Testimonials)**:
   - Transparently labeled soft-opening patron review cards.

10. **Bespoke Reservation Request Form**:
    - Complete guest enquiry submission (Name, Email, WhatsApp, Dates, Guests, Suite, Special Requests).
    - Clear mandatory transparency checkbox noting:
      > *"I understand this is an availability enquiry request and does not constitute a guaranteed instant booking or payment charge."*
    - **Enquiry Received Modal**: Generates a VIP reference code (e.g. `ALX-2026-XXXX`) and confirms no immediate card charge was processed.

11. **Contact & Location**:
    - Clearly labeled placeholder address (*77 Al-Corniche Waterfront Promenade, Alexandria, Egypt*).
    - Front desk phone, VIP Concierge, email, and live WhatsApp concierge link.
    - General Manager contact inquiry form with toast feedback.

12. **Footer**:
    - Brand signature, site map, residence links, newsletter subscription with inline feedback, and official legal disclaimers.

---

## 🚀 Running Locally

The site is built with vanilla HTML5, CSS3, and ES6 JavaScript (no heavy build tooling required).

### Option 1: Quick Python HTTP Server
```bash
python -m http.server 8080
```
Open your browser at [http://localhost:8080](http://localhost:8080).

### Option 2: Direct File Access
Simply double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
