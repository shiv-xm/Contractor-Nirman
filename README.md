# NirmanSetu (निर्माण सेतु) 🏗️

> **भरोसेमंद ठेकेदार • मजबूत निर्माण**  
> A production-oriented contractor discovery, construction portfolio, pricing comparison, and customer engagement platform for the Indian construction market.

Inspired by industry benchmarks including [Griffy.in](https://griffy.in/), [UrbanBids](https://business.urbanbids.com/), [Kontraq](https://www.kontraq.com/), and [ContractorBook.in](https://contractorbook.in/).

---

## 🌟 Key Platform Features (Implemented Prototype)

### 1. High-Conversion Home Page
- **Hero Section with Multi-Parameter Search**: Instant search by City (Bengaluru, Noida, Pune, Hyderabad, Jaipur, Gurugram), Building Type (Villa, Independent House, Apartment, Commercial, Renovation), and Service Package.
- **Popular Construction Packages**: Complete Turnkey (from ₹2,400/sq.ft), Labour + Material (from ₹1,650/sq.ft), Grey Structure Only (from ₹1,150/sq.ft), and Civil Thekedar Labour Only (from ₹280/sq.ft).
- **Featured Verified Thekedars**: Top-rated contractors with 3-tier KYC verification badges.
- **Quick Cost Estimator Widget**: Live built-up area slider (500 to 5,000 sq.ft) with quality tier toggles and instant budget calculation in ₹ Lakhs / Crores.
- **Recent Completed Buildings Gallery**: High-resolution photographs with location, built-up sq.ft, and cost tags.
- **4-Stage Escrow & Trust Process**: How NirmanSetu eliminates thekedar abandonment risks through milestone-linked payments.

### 2. Contractor Discovery & Search (`/contractors`)
- Multi-faceted filter sidebar: Operating City, Building Category, Service Package, Rate per sq.ft slider, Experience filter (10+, 15+ years), and Physical Site Inspection filter.
- Dynamic sorting by: Recommended, Highest Rating, Experience, Completed Sites, and Price per sq.ft (Low to High / High to Low).
- Contractor cards with contact actions: Direct Call, WhatsApp integration, and "View Portfolio & Rates".

### 3. Comprehensive Contractor Profile (`/contractors/[id]`)
- **Rate Cards & Scope of Work**: Detailed breakdown of Labour Only vs Turnkey, with itemized scope inclusions (Tata Tiscon Fe550D, UltraTech Cement, Kajaria tiles, Jaquar fittings) and exclusions.
- **Completed Projects Gallery**: Verified houses built by the contractor with construction stage photographs.
- **Homeowner Reviews**: Authentic feedback from verified homeowners with sub-ratings for Work Quality, Timeliness, Communication, and Budget Transparency.
- **KYC & Legal Credentials**: Aadhaar/PAN verification details and GST registration records.
- **Sticky Quotation Form**: Instant lead submission form for homeowners.

### 4. Completed Construction Gallery & Detail Pages (`/projects` & `/projects/[id]`)
- Project showcase categorized by city and building type.
- Stage-by-stage construction photo viewer: Foundation, Brickwork, Plastering, Finishing, and Handover.
- Verified Material Specifications Table (Cement grade, TMT steel brand, tile dimensions, sanitaryware).
- Executing contractor profile card with direct contact button.

### 5. House Construction Budget Estimator (`/cost-estimator`)
- Full interactive calculation engine: Built-up area, floors (G to G+3), quality tier (Standard, Premium, Luxury).
- Approximate Raw Material Quantities: Cement bags needed, TMT steel tonnes needed, bricks/blocks count, sand/aggregate volume.
- Stage-wise payment schedule: Booking (10%), Foundation (15%), Structure (30%), Plaster (15%), Flooring/Plumbing (20%), Finishing (10%).

### 6. Side-by-Side Thekedar Comparison Matrix (`/compare`)
- Select up to 3 contractors to compare side-by-side.
- Compares: Experience, Completed Houses, Rating, Labour+Material rate, Turnkey rate, and Verification badges.

### 7. Administrator Back-Office (`/admin/dashboard`)
- Real-time platform metrics: Published contractors, pending KYC verification queue, delivered sites, and moderated reviews.
- Searchable Contractor Table with quick actions.
- **KYC Verification & Site Audit Modal**: Review Aadhaar/PAN/GST evidence and approve/reject with administrative remarks.
- **Create New Contractor Form**: Rapid onboarding of civil thekedars and pricing setup.
- **Review Moderation Queue**: Moderate feedback before affecting public ratings.
- **Audit Trail Log**: Chronological record of administrative operations.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Material UI (MUI v6), Lucide Icons.
- **Styling**: Indian Construction Palette (Terracotta `#D9531E`, Deep Slate `#0F172A`, Forest Emerald `#059669`).
- **Data Layer**: Strongly-typed DTO models aligned with Spring Boot REST API specifications.
- **Database & Containerization**: PostgreSQL 16 Alpine, Docker Compose.

---

## 🚀 Running Locally

### 1. Start the Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Verify Production Build
```bash
cd frontend
npm run build
```

### 3. Start Local PostgreSQL Database
```bash
docker compose up -d
```
