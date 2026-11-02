'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  Calculator,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { formatINR } from '@/lib/currency';

interface TierOption {
  key: string;
  name: string;
  ratePerSqft: number;
  badge?: string;
  brands: string;
}

const TIERS: TierOption[] = [
  {
    key: 'standard',
    name: 'Standard Package',
    ratePerSqft: 1650,
    brands: 'Ambuja / ACC Cement, Kamdhenu TMT, Cera sanitary',
  },
  {
    key: 'premium',
    name: 'Premium Package',
    ratePerSqft: 1980,
    badge: 'Most Popular',
    brands: 'UltraTech Cement, Tata Tiscon 550D, Kajaria tiles, Jaquar fittings',
  },
  {
    key: 'luxury',
    name: 'Luxury Turnkey',
    ratePerSqft: 2750,
    badge: 'High-End',
    brands: 'UltraTech Weather Plus, Tata Steel, Italian marble, Kohler artize',
  },
];

export default function QuickEstimatorWidget() {
  const [area, setArea] = React.useState<number>(1500);
  const [selectedTierKey, setSelectedTierKey] = React.useState<string>('premium');

  const selectedTier = TIERS.find((t) => t.key === selectedTierKey) || TIERS[1];
  const totalCost = area * selectedTier.ratePerSqft;

  // Milestone stage breakdown
  const stages = [
    { name: '1. Foundation & Sub-structure', pct: 15, cost: totalCost * 0.15 },
    { name: '2. RCC Structure & Brickwork', pct: 30, cost: totalCost * 0.3 },
    { name: '3. Plastering & Waterproofing', pct: 15, cost: totalCost * 0.15 },
    { name: '4. Flooring, Plumbing & Wiring', pct: 25, cost: totalCost * 0.25 },
    { name: '5. Painting & Finishing Handover', pct: 15, cost: totalCost * 0.15 },
  ];

  return (
    <Box sx={{ py: 9, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Subtle glow accent */}
          <Box
            sx={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 300,
              height: 300,
              borderRadius: '50%',
              bgcolor: 'rgba(217, 83, 30, 0.25)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />

          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            {/* Left Controls: Area Slider & Tiers */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Calculator size={18} color="#F97316" />
                <Typography variant="overline" sx={{ color: '#F97316', fontWeight: 800, letterSpacing: '0.1em' }}>
                  INSTANT HOUSE COST ESTIMATOR
                </Typography>
              </Box>

              <Typography variant="h3" sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' }, fontWeight: 800, mb: 1, color: '#FFF' }}>
                How Much Will It Cost to Build Your Home?
              </Typography>

              <Typography variant="body2" sx={{ color: '#94A3B8', mb: 4, maxWidth: 540 }}>
                Calculate realistic construction costs based on live market contractor rates per square foot in your city.
              </Typography>

              {/* Area Slider */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: '#E2E8F0', fontWeight: 700 }}>
                    Built-up Area (Total Floor Area)
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#F97316' }}>
                    {area.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>sq.ft</span>
                  </Typography>
                </Box>

                <Slider
                  value={area}
                  min={500}
                  max={4500}
                  step={50}
                  onChange={(_, val) => setArea(val as number)}
                  sx={{
                    color: '#D9531E',
                    height: 8,
                    '& .MuiSlider-thumb': {
                      width: 22,
                      height: 22,
                      backgroundColor: '#FFFFFF',
                      border: '3px solid #D9531E',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#334155',
                    },
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.75rem', mt: 0.5 }}>
                  <span>500 sq.ft (1BHK)</span>
                  <span>1,500 sq.ft (Duplex)</span>
                  <span>3,000 sq.ft (Villa)</span>
                  <span>4,500 sq.ft (G+2 / G+3)</span>
                </Box>
              </Box>

              {/* Package Tiers Radio */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#E2E8F0', fontWeight: 700, mb: 1.5 }}>
                  Select Material & Quality Tier
                </Typography>

                <Grid container spacing={1.5}>
                  {TIERS.map((tier) => {
                    const isSelected = selectedTierKey === tier.key;
                    return (
                      <Grid size={{ xs: 12, sm: 4 }} key={tier.key}>
                        <Box
                          onClick={() => setSelectedTierKey(tier.key)}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            cursor: 'pointer',
                            border: `2px solid ${isSelected ? '#D9531E' : '#334155'}`,
                            bgcolor: isSelected ? 'rgba(217, 83, 30, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                            transition: 'all 0.2s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF' }}>
                              {tier.name}
                            </Typography>
                            {tier.badge && (
                              <Chip
                                label={tier.badge}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: '0.65rem',
                                  bgcolor: isSelected ? '#D9531E' : '#F59E0B',
                                  color: '#FFF',
                                  fontWeight: 700,
                                }}
                              />
                            )}
                          </Box>

                          <Typography variant="h6" sx={{ fontWeight: 800, color: '#F97316', mb: 0.5 }}>
                            ₹{tier.ratePerSqft.toLocaleString('en-IN')}
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}> /sq.ft</span>
                          </Typography>

                          <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.72rem', lineHeight: 1.4, mt: 'auto' }}>
                            {tier.brands}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>

            {/* Right Cost Summary Card */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 3,
                  bgcolor: '#1E293B',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 20px 30px -10px rgba(0,0,0,0.5)',
                }}
              >
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ESTIMATED CONSTRUCTION COST
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, my: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#F97316', letterSpacing: '-0.02em' }}>
                    {formatINR(totalCost, true)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                    ({formatINR(totalCost)})
                  </Typography>
                </Box>

                <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 2 }}>
                  Based on <strong>{area} sq.ft</strong> @ <strong>₹{selectedTier.ratePerSqft}/sq.ft</strong> ({selectedTier.name})
                </Typography>

                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Stage-wise Payment Breakdown */}
                <Typography variant="caption" sx={{ color: '#E2E8F0', fontWeight: 700, display: 'block', mb: 1.5 }}>
                  Stage-wise Payment Schedule (NirmanSetu Standard):
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  {stages.map((st, idx) => (
                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: '#CBD5E1' }}>{st.name}</span>
                      <strong style={{ color: '#F8FAFC' }}>
                        {formatINR(st.cost, true)} ({st.pct}%)
                      </strong>
                    </Box>
                  ))}
                </Box>

                {/* CTAs */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Link href={`/contractors?rateMax=${selectedTier.ratePerSqft + 300}`} style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ py: 1.3, fontWeight: 800, fontSize: '0.95rem' }}
                      endIcon={<ArrowRight size={16} />}
                    >
                      Find Thekedars for This Budget
                    </Button>
                  </Link>

                  <Link href="/cost-estimator" style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      variant="text"
                      sx={{ color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      Open Full Estimator with Floor & Soil Options →
                    </Button>
                  </Link>
                </Box>

                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', textAlign: 'center', mt: 2, fontSize: '0.7rem' }}>
                  *Indicative estimate. Actual rate depends on architectural plans, site soil conditions & finishing brands.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
