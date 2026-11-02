'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Slider,
  TextField,
  MenuItem,
  Button,
  Chip,
  Divider,
  Alert,
  Breadcrumbs,
} from '@mui/material';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Building2,
  Package,
  Layers,
  MapPin,
  Sparkles,
  Download,
  Send,
  HelpCircle,
} from 'lucide-react';
import { BuildingType, ServicePackage } from '@/types';
import { formatINR, POPULAR_CITIES, BUILDING_TYPE_LABELS, PACKAGE_LABELS } from '@/lib/currency';

export default function CostEstimatorPage() {
  const [city, setCity] = React.useState('Bengaluru');
  const [buildingType, setBuildingType] = React.useState<BuildingType>('INDEPENDENT_HOUSE');
  const [packageType, setPackageType] = React.useState<ServicePackage>('LABOUR_PLUS_MATERIAL');
  const [floors, setFloors] = React.useState<number>(2); // G+1
  const [builtUpArea, setBuiltUpArea] = React.useState<number>(1800);
  const [finishingTier, setFinishingTier] = React.useState<'STANDARD' | 'PREMIUM' | 'LUXURY'>('PREMIUM');

  // Calculate rate based on package and tier
  const calculateRate = (): number => {
    let baseRate = 1750;
    if (packageType === 'LABOUR_ONLY') {
      baseRate = 320;
      if (finishingTier === 'PREMIUM') baseRate = 380;
      if (finishingTier === 'LUXURY') baseRate = 450;
    } else if (packageType === 'STRUCTURE_ONLY') {
      baseRate = 1200;
      if (finishingTier === 'PREMIUM') baseRate = 1350;
      if (finishingTier === 'LUXURY') baseRate = 1550;
    } else if (packageType === 'TURNKEY') {
      baseRate = 2450;
      if (finishingTier === 'PREMIUM') baseRate = 2950;
      if (finishingTier === 'LUXURY') baseRate = 3800;
    } else {
      // LABOUR_PLUS_MATERIAL
      baseRate = 1650;
      if (finishingTier === 'PREMIUM') baseRate = 1980;
      if (finishingTier === 'LUXURY') baseRate = 2450;
    }

    // Floor factor (G+2 or G+3 has slight pump & shuttering lift factor)
    if (floors > 2) {
      baseRate += (floors - 2) * 50;
    }

    return baseRate;
  };

  const ratePerSqft = calculateRate();
  const estimatedCost = builtUpArea * ratePerSqft;

  // Material approximations for Indian house construction
  const approxCementBags = Math.round(builtUpArea * 0.4); // ~0.4 bags per sq.ft
  const approxSteelTonnes = ((builtUpArea * 3.5) / 1000).toFixed(1); // ~3.5 to 4 kg per sq.ft
  const approxBricks = Math.round(builtUpArea * 8.5); // ~8-9 bricks per sq.ft

  // Milestone payments
  const stages = [
    { title: '1. Booking & Soil Testing / Architecture Drawings', pct: 10, amount: estimatedCost * 0.1 },
    { title: '2. Foundation Excavation & Plinth Beam Casting', pct: 15, amount: estimatedCost * 0.15 },
    { title: '3. RCC Columns, Beams & Roof Slab Casting', pct: 30, amount: estimatedCost * 0.3 },
    { title: '4. Red Brick Masonry & Double Coat Sand Plastering', pct: 15, amount: estimatedCost * 0.15 },
    { title: '5. Flooring, Electrical Conduits & Plumbing Piping', pct: 20, amount: estimatedCost * 0.2 },
    { title: '6. Painting, Door/Window Fittings & Final Handover', pct: 10, amount: estimatedCost * 0.1 },
  ];

  const [submitted, setSubmitted] = React.useState(false);

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Construction Budget Estimator
          </Typography>
        </Breadcrumbs>

        {/* Title */}
        <Box sx={{ mb: 4, textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#D9531E', mb: 1 }}>
            <Calculator size={20} />
            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.1em' }}>
              HOUSE BUDGET ESTIMATOR (INDIAN MARKET)
            </Typography>
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, fontSize: { xs: '1.9rem', md: '2.6rem' } }}>
            Calculate Your Home Construction Cost
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Accurate itemized estimates based on current cement, TMT steel, and thekedar labour rates in your city.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Inputs Column */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 3 }}>
                1. Project Location & Structure
              </Typography>

              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 0.5 }}>
                    CITY LOCATION
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {POPULAR_CITIES.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 0.5 }}>
                    BUILDING CATEGORY
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                  >
                    {Object.entries(BUILDING_TYPE_LABELS).map(([k, v]) => (
                      <MenuItem key={k} value={k}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 0.5 }}>
                    NUMBER OF FLOORS
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                  >
                    <MenuItem value={1}>Ground Floor Only (G)</MenuItem>
                    <MenuItem value={2}>Ground + 1 Floor (G+1 Duplex)</MenuItem>
                    <MenuItem value={3}>Ground + 2 Floors (G+2)</MenuItem>
                    <MenuItem value={4}>Ground + 3 Floors (G+3)</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block', mb: 0.5 }}>
                    ENGAGEMENT PACKAGE
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value as ServicePackage)}
                  >
                    {Object.entries(PACKAGE_LABELS).map(([k, v]) => (
                      <MenuItem key={k} value={k}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Area Slider */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                    Total Built-up Area
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#D9531E' }}>
                    {builtUpArea.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: '#64748B' }}>sq.ft</span>
                  </Typography>
                </Box>
                <Slider
                  value={builtUpArea}
                  min={600}
                  max={5000}
                  step={50}
                  onChange={(_, val) => setBuiltUpArea(val as number)}
                  sx={{ color: '#D9531E' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.75rem' }}>
                  <span>600 sq.ft</span>
                  <span>1,800 sq.ft</span>
                  <span>3,200 sq.ft</span>
                  <span>5,000 sq.ft</span>
                </Box>
              </Box>

              {/* Material Tier Selection */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
                  Select Finish & Material Quality Tier
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { tier: 'STANDARD', label: 'Standard', desc: 'Ambuja / ACC, Kamdhenu TMT, Cera sanitary' },
                    { tier: 'PREMIUM', label: 'Premium', desc: 'UltraTech, Tata Tiscon, Kajaria vitrified, Jaquar' },
                    { tier: 'LUXURY', label: 'Luxury Turnkey', desc: 'UltraTech Weather Plus, Italian marble, Kohler' },
                  ].map((t) => {
                    const isSel = finishingTier === t.tier;
                    return (
                      <Grid size={{ xs: 12, sm: 4 }} key={t.tier}>
                        <Box
                          onClick={() => setFinishingTier(t.tier as any)}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            cursor: 'pointer',
                            border: `2px solid ${isSel ? '#D9531E' : '#E2E8F0'}`,
                            bgcolor: isSel ? '#FFF7ED' : '#FAFAFA',
                            height: '100%',
                            transition: 'all 0.2s',
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: isSel ? '#C2410C' : '#0F172A' }}>
                            {t.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.72rem', mt: 0.5 }}>
                            {t.desc}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Results Summary Column */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: '#0F172A',
                color: '#FFFFFF',
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)',
              }}
            >
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                ESTIMATED PROJECT BUDGET
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, my: 1.5 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, color: '#F97316' }}>
                  {formatINR(estimatedCost, true)}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#94A3B8' }}>
                  ({formatINR(estimatedCost)})
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 3 }}>
                Applicable Indicative Rate: <strong>₹{ratePerSqft.toLocaleString('en-IN')}/sq.ft</strong> for{' '}
                <strong>{builtUpArea.toLocaleString('en-IN')} sq.ft</strong> ({PACKAGE_LABELS[packageType]} - {finishingTier})
              </Typography>

              {/* Material requirement estimate */}
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.06)', p: 2, borderRadius: 2, mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#FCD34D', fontWeight: 700, display: 'block', mb: 1 }}>
                  APPROXIMATE RAW MATERIAL QUANTITIES NEEDED:
                </Typography>
                <Grid container spacing={1} sx={{ fontSize: '0.8rem', color: '#E2E8F0' }}>
                  <Grid size={{ xs: 6 }}>Cement: ~<strong>{approxCementBags} Bags</strong></Grid>
                  <Grid size={{ xs: 6 }}>TMT Steel: ~<strong>{approxSteelTonnes} Tonnes</strong></Grid>
                  <Grid size={{ xs: 6 }}>Bricks/Blocks: ~<strong>{approxBricks.toLocaleString('en-IN')} Pcs</strong></Grid>
                  <Grid size={{ xs: 6 }}>Coarse Sand: ~<strong>{(builtUpArea * 1.8).toFixed(0)} Cu.ft</strong></Grid>
                </Grid>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2.5 }} />

              {/* Stage-wise Payment Schedule */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF', mb: 1.5 }}>
                Milestone-Based Payment Schedule:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3.5 }}>
                {stages.map((st, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: '#94A3B8' }}>{st.title}</span>
                    <strong style={{ color: '#FFF' }}>{formatINR(st.amount, true)} ({st.pct}%)</strong>
                  </Box>
                ))}
              </Box>

              {/* Actions */}
              {submitted ? (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                  Requirement recorded! Redirecting to matching contractors...
                </Alert>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Link href={`/contractors?rateMax=${ratePerSqft + 200}`} style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ py: 1.4, fontWeight: 800, fontSize: '0.95rem' }}
                      endIcon={<ArrowRight size={18} />}
                    >
                      Find Thekedars for This Budget
                    </Button>
                  </Link>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setSubmitted(true);
                      setTimeout(() => setSubmitted(false), 4000);
                    }}
                    startIcon={<Send size={16} />}
                    sx={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.3)', py: 1.2, fontWeight: 700 }}
                  >
                    Save & Submit Estimate as Requirement
                  </Button>
                </Box>
              )}

              {/* Disclaimer */}
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', textAlign: 'center', mt: 2.5, fontSize: '0.7rem' }}>
                *Disclaimer: Indicative estimation based on current material benchmarks. Actual quotations may vary based on structural soil load test, architectural elevation & local municipality regulations.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
