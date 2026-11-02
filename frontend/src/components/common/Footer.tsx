'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Container, Grid, Typography, Divider, Chip } from '@mui/material';
import { HardHat, ShieldCheck, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0B132B', color: '#94A3B8', pt: 8, pb: 4, mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand & Purpose */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: '#D9531E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <HardHat size={22} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  Nirman<span style={{ color: '#D9531E' }}>Setu</span>
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                  भरोसेमंद ठेकेदार • मजबूत निर्माण
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2.5, lineHeight: 1.6 }}>
              India&apos;s dedicated contractor discovery, construction portfolio, and pricing comparison platform.
              Empowering homeowners to build with verified civil thekedars, transparent ₹/sq.ft rate cards, and
              stage-wise escrow security.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#CBD5E1', fontSize: '0.85rem' }}>
                <Phone size={14} color="#D9531E" />
                <span>+91 80000 99888 (Toll-Free Helpline)</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#CBD5E1', fontSize: '0.85rem' }}>
                <Mail size={14} color="#D9531E" />
                <span>support@nirmansetu.in</span>
              </Box>
            </Box>
          </Grid>

          {/* Construction Services */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.875rem' }}>
              <Link href="/contractors?package=TURNKEY" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Turnkey House Construction
              </Link>
              <Link href="/contractors?package=LABOUR_PLUS_MATERIAL" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Labour + Material Package
              </Link>
              <Link href="/contractors?package=LABOUR_ONLY" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Civil Thekedar (Labour Only)
              </Link>
              <Link href="/contractors?package=STRUCTURE_ONLY" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Grey Structure Construction
              </Link>
              <Link href="/contractors?category=RENOVATION" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Home Renovation & Repair
              </Link>
            </Box>
          </Grid>

          {/* Key Tools & Portals */}
          <Grid size={{ xs: 6, sm: 3, md: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Platform Tools
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.875rem' }}>
              <Link href="/cost-estimator" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                House Construction Cost Calculator
              </Link>
              <Link href="/contractors" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Find Thekedars Near Me
              </Link>
              <Link href="/projects" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Completed Construction Gallery
              </Link>
              <Link href="/compare" style={{ color: '#94A3B8', textDecoration: 'none' }}>
                Compare Contractor Rates
              </Link>
              <Link href="/admin/dashboard" style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 600 }}>
                Admin & Verification Console →
              </Link>
            </Box>
          </Grid>

          {/* Operating Cities & Verification Guarantee */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Verification Guarantee
            </Typography>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ShieldCheck size={18} color="#10B981" />
                <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 700 }}>
                  3-Tier Contractor KYC
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ display: 'block', color: '#94A3B8', lineHeight: 1.5, mb: 1.5 }}>
                Every contractor profile displays verified Govt ID (Aadhaar/PAN), GST registration, and physical site verification badges.
              </Typography>
              <Chip
                label="Sample Demo Records Included"
                size="small"
                sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D', fontSize: '0.7rem', fontWeight: 600 }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            fontSize: '0.8rem',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            © 2026 NirmanSetu Technologies Pvt Ltd. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <span style={{ color: '#64748B' }}>Indian Construction Market Platform</span>
            <span style={{ color: '#64748B' }}>ISO 9001:2015 Benchmark</span>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
