'use client';

import * as React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryPills from '@/components/home/CategoryPills';
import FeaturedContractors from '@/components/home/FeaturedContractors';
import QuickEstimatorWidget from '@/components/home/QuickEstimatorWidget';
import RecentProjectsSection from '@/components/home/RecentProjectsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with Multi-Parameter Search */}
      <HeroSection />

      {/* 2. Popular Construction Packages & Categories */}
      <CategoryPills />

      {/* 3. Top-Rated Verified Thekedars & Contractors */}
      <FeaturedContractors />

      {/* 4. Instant House Construction Cost Estimator */}
      <QuickEstimatorWidget />

      {/* 5. Recently Completed Projects Gallery */}
      <RecentProjectsSection />

      {/* 6. How It Works (Trust & Escrow Protocol) */}
      <HowItWorksSection />

      {/* 7. Customer Testimonials (Clearly Labelled Demo Data) */}
      <TestimonialsSection />

      {/* 8. Call To Action */}
      <CTASection />
    </>
  );
}
