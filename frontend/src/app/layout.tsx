import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'NirmanSetu — Verified Thekedars & Turnkey House Construction in India',
  description:
    'Discover trustworthy civil contractors and thekedars based on verified completed buildings, transparent ₹/sq.ft rates, client reviews, and milestone-linked payments.',
  keywords: [
    'thekedar',
    'civil contractor',
    'house construction India',
    'turnkey contractor',
    'construction cost calculator',
    'building contractor Delhi NCR Bengaluru Pune',
  ],
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <React.Suspense fallback={<div style={{ minHeight: 74 }} />}>
              <Navbar />
            </React.Suspense>
            <main style={{ flexGrow: 1 }}>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
