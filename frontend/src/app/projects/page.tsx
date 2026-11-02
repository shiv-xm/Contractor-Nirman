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
  TextField,
  MenuItem,
  Breadcrumbs,
  Button,
} from '@mui/material';
import { MapPin, Building, CheckCircle2, ArrowRight, HardHat } from 'lucide-react';
import { MOCK_PROJECTS } from '@/data/mockData';
import { BuildingType } from '@/types';
import { BUILDING_TYPE_LABELS, POPULAR_CITIES, formatINR } from '@/lib/currency';

export default function ProjectsGalleryPage() {
  const [selectedCity, setSelectedCity] = React.useState('ALL');
  const [selectedType, setSelectedType] = React.useState('ALL');

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (selectedCity !== 'ALL' && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    if (selectedType !== 'ALL' && p.buildingType !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Completed Projects Gallery
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            Real Construction Projects Gallery
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 740 }}>
            Inspect genuine residential houses, duplexes, and villas completed across India by our verified network of thekedars.
            Every project has undergone physical site inspection.
          </Typography>
        </Box>

        {/* Filter Bar */}
        <Box
          sx={{
            p: 2,
            mb: 4,
            bgcolor: '#FFFFFF',
            borderRadius: 3,
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Box sx={{ minWidth: 200, flexGrow: { xs: 1, sm: 0 } }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block', mb: 0.5 }}>
              CITY FILTER
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem value="ALL">All Indian Cities</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              <MenuItem value="Noida">Noida & Greater Noida</MenuItem>
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ minWidth: 220, flexGrow: { xs: 1, sm: 0 } }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block', mb: 0.5 }}>
              BUILDING TYPE
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="ALL">All Categories</MenuItem>
              {Object.entries(BUILDING_TYPE_LABELS).map(([k, v]) => (
                <MenuItem key={k} value={k}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ ml: { sm: 'auto' }, alignSelf: 'flex-end', pb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Showing <strong>{filteredProjects.length}</strong> Inspected Projects
            </Typography>
          </Box>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.map((proj) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={proj.id}>
              <Link href={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 28px -8px rgba(15, 23, 42, 0.1)',
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
                    <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                      <Chip
                        icon={<CheckCircle2 size={13} color="#FFF" />}
                        label="Site Verified"
                        size="small"
                        sx={{ bgcolor: '#059669', color: '#FFF', fontWeight: 700, fontSize: '0.72rem' }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'rgba(15, 23, 42, 0.85)',
                        color: '#FFF',
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
                      Built by: <strong>{proj.contractorName}</strong>
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
