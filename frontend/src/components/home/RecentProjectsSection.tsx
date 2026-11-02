'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import { MapPin, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_PROJECTS } from '@/data/mockData';
import { formatINR } from '@/lib/currency';

export default function RecentProjectsSection() {
  const projects = MOCK_PROJECTS.slice(0, 3);

  return (
    <Box sx={{ py: 9, bgcolor: '#F8FAFC' }}>
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
            <Typography variant="overline" sx={{ color: '#D9531E', fontWeight: 800, letterSpacing: '0.08em' }}>
              REAL SITE DELIVERIES
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, color: '#0F172A' }}>
              Recently Completed Buildings
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 620, mt: 0.5 }}>
              Explore real residential duplexes, independent villas, and builder floors completed by our network contractors.
            </Typography>
          </Box>

          <Link href="/projects" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<ArrowRight size={16} />}
              sx={{ fontWeight: 700, borderRadius: 2, px: 2.5, py: 1 }}
            >
              View Full Gallery
            </Button>
          </Link>
        </Box>

        <Grid container spacing={3}>
          {projects.map((proj) => (
            <Grid size={{ xs: 12, md: 4 }} key={proj.id}>
              <Link href={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 16px 30px -10px rgba(15, 23, 42, 0.12)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="230"
                      image={proj.coverImage}
                      alt={proj.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      <Chip
                        icon={<CheckCircle2 size={13} color="#FFFFFF" />}
                        label="Verified Completed"
                        size="small"
                        sx={{
                          bgcolor: '#059669',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: '#FFFFFF',
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {proj.media.length} Site Photos
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748B', mb: 0.5 }}>
                      <MapPin size={14} color="#D9531E" />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {proj.locality}, {proj.city}
                      </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: '1.05rem', lineHeight: 1.3 }}>
                      {proj.title}
                    </Typography>

                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                      By: <strong>{proj.contractorName}</strong>
                    </Typography>

                    <Box
                      sx={{
                        mt: 'auto',
                        pt: 2,
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>
                          Built-up Area
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          {proj.builtUpAreaSqft.toLocaleString('en-IN')} sq.ft ({proj.floors} Floors)
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>
                          Approx Total Cost
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#D9531E' }}>
                          {formatINR(proj.approxCostInr, true)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
