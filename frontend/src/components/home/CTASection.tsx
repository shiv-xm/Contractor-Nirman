'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Sparkles, ArrowRight, PhoneCall } from 'lucide-react';

export default function CTASection() {
  return (
    <Box sx={{ py: 9, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: '#D9531E',
            color: '#FFFFFF',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage:
              'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(15, 23, 42, 0.25) 0%, transparent 45%)',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              px: 2,
              py: 0.6,
              borderRadius: '20px',
              mb: 2.5,
            }}
          >
            <Sparkles size={16} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              ZERO BROKERAGE • DIRECT CONTRACTOR PRICING
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 900,
              color: '#FFFFFF',
              mb: 2,
              letterSpacing: '-0.02em',
              maxWidth: 720,
              mx: 'auto',
            }}
          >
            Ready to Build Your Home with Complete Peace of Mind?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            Explore verified contractor profiles, inspect high-resolution site construction photographs, and receive itemized quotations.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
            <Link href="/contractors" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#0F172A',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#1E293B' },
                }}
                endIcon={<ArrowRight size={18} />}
              >
                Find Thekedars Now
              </Button>
            </Link>

            <Link href="/cost-estimator" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 3.5,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#FFFFFF' },
                }}
              >
                Calculate House Budget
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
