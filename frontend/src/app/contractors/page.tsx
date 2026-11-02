'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Breadcrumbs,
} from '@mui/material';
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  ShieldCheck,
  Star,
  HardHat,
  Scale,
  Sparkles,
} from 'lucide-react';
import ContractorCard from '@/components/contractor/ContractorCard';
import { MOCK_CONTRACTORS } from '@/data/mockData';
import { BuildingType, ServicePackage, Contractor } from '@/types';
import { BUILDING_TYPE_LABELS, PACKAGE_LABELS, POPULAR_CITIES, formatRatePerSqft } from '@/lib/currency';

function ContractorsDirectoryContent() {
  const searchParams = useSearchParams();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState<string>(searchParams.get('city') || 'ALL');
  const [selectedCategory, setSelectedCategory] = React.useState<string>(searchParams.get('category') || 'ALL');
  const [selectedPackage, setSelectedPackage] = React.useState<string>(searchParams.get('package') || 'ALL');
  const [minRating, setMinRating] = React.useState<number>(0);
  const [minExp, setMinExp] = React.useState<number>(0);
  const [maxRate, setMaxRate] = React.useState<number>(4000);
  const [onlyVerified, setOnlyVerified] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>('recommended');

  // Comparison selection
  const [compareList, setCompareList] = React.useState<string[]>([]);

  // Filter logic
  const filteredContractors = React.useMemo(() => {
    return MOCK_CONTRACTORS.filter((c) => {
      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.businessName.toLowerCase().includes(q) || c.proprietorName.toLowerCase().includes(q);
        const matchesLoc = c.primaryLocality.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc) return false;
      }

      // City filter
      if (selectedCity !== 'ALL' && !c.operatingCities.some((city) => city.toLowerCase().includes(selectedCity.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && !c.supportedCategories.includes(selectedCategory as BuildingType)) {
        return false;
      }

      // Package filter
      if (selectedPackage !== 'ALL' && !c.supportedPackages.includes(selectedPackage as ServicePackage)) {
        return false;
      }

      // Min Rating
      if (minRating > 0 && c.avgRating < minRating) {
        return false;
      }

      // Min Experience
      if (minExp > 0 && c.experienceYears < minExp) {
        return false;
      }

      // Max Rate
      const lowestRate = Math.min(...c.rates.map((r) => r.minRatePerSqft));
      if (lowestRate > maxRate) {
        return false;
      }

      // Only Verified
      if (onlyVerified && (!c.verificationBadges.govtIdVerified || !c.verificationBadges.siteInspected)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'projects') return b.completedProjectsCount - a.completedProjectsCount;
      if (sortBy === 'price_asc') {
        const minA = Math.min(...a.rates.map((r) => r.minRatePerSqft));
        const minB = Math.min(...b.rates.map((r) => r.minRatePerSqft));
        return minA - minB;
      }
      if (sortBy === 'price_desc') {
        const maxA = Math.max(...a.rates.map((r) => r.maxRatePerSqft));
        const maxB = Math.max(...b.rates.map((r) => r.maxRatePerSqft));
        return maxB - maxA;
      }
      // default: recommended
      return (a.featuredOrder || 99) - (b.featuredOrder || 99);
    });
  }, [searchQuery, selectedCity, selectedCategory, selectedPackage, minRating, minExp, maxRate, onlyVerified, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('ALL');
    setSelectedCategory('ALL');
    setSelectedPackage('ALL');
    setMinRating(0);
    setMinExp(0);
    setMaxRate(4000);
    setOnlyVerified(false);
    setSortBy('recommended');
  };

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Find Contractors
          </Typography>
        </Breadcrumbs>

        {/* Header Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            Discover Verified Civil Thekedars & Builders
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 720 }}>
            Compare verified contractors across India by experience, completed buildings, indicative ₹/sq.ft rates, and authentic customer ratings.
          </Typography>
        </Box>

        {/* Top Search & Sorting Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 3,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Keyword Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search by thekedar name, business name, or locality (e.g. Whitefield, Sector 78)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#D9531E" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ maxWidth: { md: 540 } }}
          />

          {/* Sort By Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, whiteSpace: 'nowrap' }}>
              SORT BY:
            </Typography>
            <TextField
              select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="recommended">Recommended & Verified</MenuItem>
              <MenuItem value="rating">Highest Customer Rating</MenuItem>
              <MenuItem value="experience">Most Experienced (Years)</MenuItem>
              <MenuItem value="projects">Most Completed Sites</MenuItem>
              <MenuItem value="price_asc">Rate: Low to High (₹/sq.ft)</MenuItem>
              <MenuItem value="price_desc">Rate: High to Low (₹/sq.ft)</MenuItem>
            </TextField>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3.5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                position: { md: 'sticky' },
                top: { md: 90 },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Filter size={18} color="#D9531E" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    Filter Thekedars
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={handleResetFilters}
                  startIcon={<RotateCcw size={13} />}
                  sx={{ color: '#64748B', fontSize: '0.75rem' }}
                >
                  Reset
                </Button>
              </Box>

              <Divider sx={{ mb: 2.5 }} />

              {/* City Filter */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 1 }}>
                  OPERATING CITY
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
                  <MenuItem value="Pune">Pune & PCMC</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Gurugram">Gurugram / Gurgaon</MenuItem>
                  <MenuItem value="Jaipur">Jaipur</MenuItem>
                </TextField>
              </Box>

              {/* Building Category Filter */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 1 }}>
                  BUILDING TYPE
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="ALL">All Types</MenuItem>
                  {Object.entries(BUILDING_TYPE_LABELS).map(([k, v]) => (
                    <MenuItem key={k} value={k}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Package Filter */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 1 }}>
                  CONSTRUCTION PACKAGE
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                >
                  <MenuItem value="ALL">All Packages</MenuItem>
                  {Object.entries(PACKAGE_LABELS).map(([k, v]) => (
                    <MenuItem key={k} value={k}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* Max Rate Slider */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155' }}>
                    MAX RATE (₹ / SQ.FT)
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#D9531E' }}>
                    {formatRatePerSqft(maxRate)}
                  </Typography>
                </Box>
                <Slider
                  value={maxRate}
                  min={300}
                  max={4000}
                  step={100}
                  onChange={(_, val) => setMaxRate(val as number)}
                  sx={{ color: '#D9531E' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                  <span>₹300 (Labour)</span>
                  <span>₹4,000 (Luxury)</span>
                </Box>
              </Box>

              {/* Min Experience */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 1 }}>
                  MINIMUM EXPERIENCE
                </Typography>
                <RadioGroup
                  value={minExp}
                  onChange={(e) => setMinExp(Number(e.target.value))}
                >
                  <FormControlLabel value={0} control={<Radio size="small" />} label={<Typography variant="body2">Any Experience</Typography>} />
                  <FormControlLabel value={10} control={<Radio size="small" />} label={<Typography variant="body2">10+ Years in Civil Construction</Typography>} />
                  <FormControlLabel value={15} control={<Radio size="small" />} label={<Typography variant="body2">15+ Years (Master Thekedar)</Typography>} />
                </RadioGroup>
              </Box>

              {/* Verified Only Checkbox */}
              <Box sx={{ p: 1.5, bgcolor: '#ECFDF5', borderRadius: 2, border: '1px solid #A7F3D0' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={onlyVerified}
                      onChange={(e) => setOnlyVerified(e.target.checked)}
                      sx={{ color: '#059669', '&.Mui-checked': { color: '#059669' } }}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#047857' }}>
                        Physical Site Inspected Only
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#065F46', display: 'block', fontSize: '0.7rem' }}>
                        Profiles verified with on-site building quality checks.
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Paper>
          </Grid>

          {/* Contractors Results Grid */}
          <Grid size={{ xs: 12, md: 8.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#475569' }}>
                Showing <strong>{filteredContractors.length}</strong> Verified Thekedars & Contractors
              </Typography>
            </Box>

            {filteredContractors.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 3,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                }}
              >
                <HardHat size={48} color="#94A3B8" style={{ marginBottom: 16 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                  No Contractors Found Matching Your Filters
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 440, mx: 'auto', mb: 3 }}>
                  Try relaxing your location, maximum ₹/sq.ft rate, or minimum experience requirements to view available civil thekedars.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleResetFilters}>
                  Reset All Filters
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredContractors.map((contractor) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={contractor.id}>
                    <ContractorCard contractor={contractor} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function ContractorsDirectoryPage() {
  return (
    <React.Suspense fallback={<Box sx={{ py: 8, textAlign: 'center' }}>Loading contractors...</Box>}>
      <ContractorsDirectoryContent />
    </React.Suspense>
  );
}
