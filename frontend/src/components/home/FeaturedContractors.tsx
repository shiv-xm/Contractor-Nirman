'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import ContractorCard from '@/components/contractor/ContractorCard';
import { MOCK_CONTRACTORS } from '@/data/mockData';

export default function FeaturedContractors() {
  const featured = MOCK_CONTRACTORS.slice(0, 3);

  return (
    <Box sx={{ py: 9, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mb: 5,
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, color: '#059669', mb: 0.8 }}>
              <ShieldCheck size={18} />
              <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.08em' }}>
                PHYSICALLY VERIFIED THEKEDARS
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, color: '#0F172A' }}>
              Top-Rated Construction Contractors
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 620, mt: 0.5 }}>
              All contractors pass mandatory 3-point KYC (Govt ID, GST, and on-site inspection of active construction projects).
            </Typography>
          </Box>

          <Link href="/contractors" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<ArrowRight size={16} />}
              sx={{ fontWeight: 700, borderRadius: 2, px: 2.5, py: 1 }}
            >
              Browse All Contractors ({MOCK_CONTRACTORS.length}+)
            </Button>
          </Link>
        </Box>

        <Grid container spacing={3}>
          {featured.map((contractor) => (
            <Grid size={{ xs: 12, md: 4 }} key={contractor.id}>
              <ContractorCard contractor={contractor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
