'use client';

import * as React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import {
  FileText,
  Search,
  ClipboardCheck,
  ShieldAlert,
  Coins,
  CheckCircle,
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Calculate or Post Requirements',
    desc: 'Enter your plot dimensions, locality, and preferred package (Turnkey, Labour+Material, or Labour Only). Get an instant indicative budget.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Compare Verified Thekedars',
    desc: 'Review verified civil contractors with physical site inspection badges, past completed house portfolios, and genuine customer feedback.',
    icon: Search,
  },
  {
    step: '03',
    title: 'Plot Visit & Binding BOQ',
    desc: 'The contractor conducts a soil and site inspection, provides structural recommendations, and delivers a transparent Bill of Quantities (BOQ).',
    icon: ClipboardCheck,
  },
  {
    step: '04',
    title: 'Milestone-Linked Payments',
    desc: 'Pay safely in 5 progressive stages (Foundation, RCC Slab, Brickwork, Plaster, Finishing). Zero upfront bulk risk.',
    icon: Coins,
  },
];

export default function HowItWorksSection() {
  return (
    <Box sx={{ py: 9, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#D9531E', fontWeight: 800, letterSpacing: '0.1em' }}>
            TRANSPARENT PROCESS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
            How NirmanSetu Protects Homeowners
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1 }}>
            Traditional thekedar hiring often leads to surprise price escalations and unverified quality.
            NirmanSetu establishes a standard protocol for transparency.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        bgcolor: '#FFF7ED',
                        color: '#D9531E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={22} />
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: '#CBD5E1',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {item.step}
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: '1rem', lineHeight: 1.3 }}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6, fontSize: '0.85rem' }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
