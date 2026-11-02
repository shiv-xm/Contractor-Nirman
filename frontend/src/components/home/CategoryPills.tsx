'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import {
  Home,
  Hammer,
  Layers,
  Wrench,
  Store,
  Paintbrush,
  ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Complete Turnkey Construction',
    sub: 'Architectural designs, civil structure, premium finishes & handover.',
    rate: 'From ₹2,400 / sq.ft',
    package: 'TURNKEY',
    category: 'VILLA',
    icon: Home,
    color: '#D9531E',
    bgColor: '#FFF7ED',
  },
  {
    title: 'Labour + Material Package',
    sub: 'Branded materials (Tata Tiscon, UltraTech) + skilled thekedar execution.',
    rate: 'From ₹1,650 / sq.ft',
    package: 'LABOUR_PLUS_MATERIAL',
    category: 'INDEPENDENT_HOUSE',
    icon: Layers,
    color: '#0284C7',
    bgColor: '#F0F9FF',
  },
  {
    title: 'Civil Structure / Grey Frame',
    sub: 'RCC columns, beams, roof slab casting & red clay brick masonry.',
    rate: 'From ₹1,150 / sq.ft',
    package: 'STRUCTURE_ONLY',
    category: 'INDEPENDENT_HOUSE',
    icon: Hammer,
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
  {
    title: 'Civil Thekedar (Labour Only)',
    sub: 'Skilled masons with shuttering, steel cutting, binding & plastering.',
    rate: 'From ₹280 / sq.ft',
    package: 'LABOUR_ONLY',
    category: 'INDEPENDENT_HOUSE',
    icon: Wrench,
    color: '#059669',
    bgColor: '#ECFDF5',
  },
  {
    title: 'Home Renovation & Addition',
    sub: 'Extra floor addition, waterproofing, structural repairs & facade makeover.',
    rate: 'From ₹450 / sq.ft',
    package: 'RENOVATION',
    category: 'RENOVATION',
    icon: Paintbrush,
    color: '#D97706',
    bgColor: '#FFFBEB',
  },
  {
    title: 'Commercial Showrooms & Floors',
    sub: 'Retail shops, builder floors, clinics and commercial RCC developments.',
    rate: 'From ₹1,850 / sq.ft',
    package: 'TURNKEY',
    category: 'COMMERCIAL',
    icon: Store,
    color: '#E11D48',
    bgColor: '#FFF1F2',
  },
];

export default function CategoryPills() {
  return (
    <Box sx={{ py: 8, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" sx={{ color: '#D9531E', fontWeight: 800, letterSpacing: '0.1em' }}>
            POPULAR PACKAGES & SERVICES
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, fontWeight: 800, mt: 0.5 }}>
            Tailored for Every Stage of Construction
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 600, mx: 'auto', mt: 1 }}>
            Select your preferred engagement model — from hiring an experienced labour thekedar to complete turnkey luxury execution.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Link
                  href={`/contractors?package=${cat.package}&category=${cat.category}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: 3,
                      border: '1px solid #E2E8F0',
                      bgcolor: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.08)',
                        borderColor: cat.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: cat.bgColor,
                          color: cat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Icon size={24} />
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: '1.05rem' }}>
                        {cat.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.5, mb: 2.5, flexGrow: 1 }}>
                        {cat.sub}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          pt: 2,
                          borderTop: '1px solid #F1F5F9',
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: cat.color }}>
                          {cat.rate}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748B', fontSize: '0.8rem', fontWeight: 600 }}>
                          <span>Explore</span>
                          <ArrowRight size={14} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
