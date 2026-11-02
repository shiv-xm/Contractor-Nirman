'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Chip,
} from '@mui/material';
import {
  Search,
  MapPin,
  Building2,
  Package,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { BuildingType, ServicePackage } from '@/types';
import { BUILDING_TYPE_LABELS, PACKAGE_LABELS, POPULAR_CITIES } from '@/lib/currency';

export default function HeroSection() {
  const router = useRouter();
  const [city, setCity] = React.useState('Bengaluru');
  const [buildingType, setBuildingType] = React.useState<BuildingType | ''>('INDEPENDENT_HOUSE');
  const [packageType, setPackageType] = React.useState<ServicePackage | ''>('LABOUR_PLUS_MATERIAL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (buildingType) params.set('category', buildingType);
    if (packageType) params.set('package', packageType);
    router.push(`/contractors?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#0F172A',
        color: '#FFFFFF',
        pt: { xs: 6, md: 9 },
        pb: { xs: 8, md: 11 },
        overflow: 'hidden',
        backgroundImage:
          'radial-gradient(circle at 10% 20%, rgba(217, 83, 30, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(5, 150, 105, 0.12) 0%, transparent 45%)',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Top Trust Pill */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              px: 2,
              py: 0.7,
              borderRadius: '30px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ShieldCheck size={16} color="#10B981" />
            <Typography variant="caption" sx={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.8rem' }}>
              India&apos;s Verified Construction & Thekedar Discovery Platform
            </Typography>
          </Box>
        </Box>

        {/* Main Headline & Supporting Text */}
        <Box sx={{ textAlign: 'center', maxWidth: 880, mx: 'auto', mb: 5 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.4rem' },
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              mb: 2,
              letterSpacing: '-0.03em',
            }}
          >
            Find the Right Contractor for Your{' '}
            <span style={{ color: '#F97316', position: 'relative' }}>
              Construction Project
            </span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: '#94A3B8',
              lineHeight: 1.6,
              maxWidth: 720,
              mx: 'auto',
            }}
          >
            Discover trusted civil thekedars, turnkey house builders, and renovation specialists.
            Compare itemized ₹/sq.ft rates, inspect verified completed site photos, and hire with confidence.
          </Typography>
        </Box>

        {/* Multi-Parameter Search Card */}
        <Paper
          elevation={4}
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            bgcolor: '#FFFFFF',
            maxWidth: 960,
            mx: 'auto',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4)',
          }}
        >
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            {/* City / Locality Input */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, mb: 0.5, display: 'block' }}>
                PROJECT LOCATION
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <MapPin size={18} color="#D9531E" style={{ marginRight: 8 }} />,
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: '#F8FAFC',
                    fontWeight: 600,
                  },
                }}
              >
                {POPULAR_CITIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Building Category */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, mb: 0.5, display: 'block' }}>
                BUILDING TYPE
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                slotProps={{
                  input: {
                    startAdornment: <Building2 size={18} color="#D9531E" style={{ marginRight: 8 }} />,
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: '#F8FAFC',
                    fontWeight: 600,
                  },
                }}
              >
                {Object.entries(BUILDING_TYPE_LABELS).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Service Package */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, mb: 0.5, display: 'block' }}>
                CONSTRUCTION PACKAGE
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value as ServicePackage)}
                slotProps={{
                  input: {
                    startAdornment: <Package size={18} color="#D9531E" style={{ marginRight: 8 }} />,
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: '#F8FAFC',
                    fontWeight: 600,
                  },
                }}
              >
                {Object.entries(PACKAGE_LABELS).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Search Button & Secondary Action */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Search size={20} />}
                  sx={{
                    flexGrow: 1,
                    py: 1.4,
                    fontSize: '1rem',
                    fontWeight: 800,
                    borderRadius: 2,
                  }}
                >
                  Search Verified Contractors
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/cost-estimator')}
                  startIcon={<Calculator size={18} color="#D9531E" />}
                  sx={{
                    borderColor: '#E2E8F0',
                    color: '#0F172A',
                    fontWeight: 700,
                    borderRadius: 2,
                    py: 1.4,
                    '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' },
                  }}
                >
                  Estimate House Cost
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Live Market Trust Metrics */}
        <Grid container spacing={3} sx={{ mt: 5, maxWidth: 960, mx: 'auto' }}>
          {[
            { value: '1,450+', label: 'Verified Houses Built', desc: 'Across 8 Indian Cities' },
            { value: '420+', label: 'Inspected Thekedars', desc: 'Govt KYC & GST Verified' },
            { value: '₹1,650', label: 'Starting Rate / sq.ft', desc: 'Labour + Standard Material' },
            { value: '₹0', label: 'Brokerage / Commission', desc: 'Direct Homeowner Quotations' },
          ].map((stat, idx) => (
            <Grid size={{ xs: 6, md: 3 }} key={idx}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#F97316', mb: 0.3 }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.85rem' }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.2 }}>
                  {stat.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
