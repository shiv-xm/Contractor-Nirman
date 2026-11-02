'use client';

import * as React from 'react';
import { Box, Container, Typography, Grid, Paper, Rating, Chip } from '@mui/material';
import { Quote, CheckCircle2 } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/mockData';

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: 9, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="overline" sx={{ color: '#D9531E', fontWeight: 800, letterSpacing: '0.1em' }}>
              HOMEOWNER STORIES
            </Typography>
            <Chip
              label="Demonstration Content"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.68rem',
                bgcolor: '#FEF3C7',
                color: '#92400E',
                fontWeight: 700,
              }}
            />
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, color: '#0F172A' }}>
            What Homeowners Say About Our Verified Thekedars
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 620, mx: 'auto', mt: 0.5 }}>
            Demonstration feedback reflecting real construction scenarios across Bengaluru, Noida, and Pune.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {MOCK_REVIEWS.map((rev) => (
            <Grid size={{ xs: 12, md: 4 }} key={rev.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 3,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <Quote size={32} color="#FDBA74" style={{ marginBottom: 12, opacity: 0.8 }} />

                <Rating value={rev.overallRating} readOnly size="small" sx={{ mb: 2 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: '#334155',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    mb: 3,
                    flexGrow: 1,
                  }}
                >
                  &ldquo;{rev.feedbackText}&rdquo;
                </Typography>

                <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: '#0F172A',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                    }}
                  >
                    {rev.customerName[0]}
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {rev.customerName}
                      </Typography>
                      {rev.isVerifiedHomeowner && <CheckCircle2 size={14} color="#059669" />}
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      {rev.customerLocation}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
