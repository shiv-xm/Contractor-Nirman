'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  Breadcrumbs,
} from '@mui/material';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Award,
  Phone,
  MessageCircle,
  ArrowRight,
  HardHat,
} from 'lucide-react';
import { MOCK_CONTRACTORS } from '@/data/mockData';
import { formatRatePerSqft } from '@/lib/currency';

export default function ContractorComparePage() {
  const [contractorId1, setContractorId1] = React.useState<string>(MOCK_CONTRACTORS[0].id);
  const [contractorId2, setContractorId2] = React.useState<string>(MOCK_CONTRACTORS[1].id);
  const [contractorId3, setContractorId3] = React.useState<string>(MOCK_CONTRACTORS[2].id);

  const c1 = MOCK_CONTRACTORS.find((c) => c.id === contractorId1) || MOCK_CONTRACTORS[0];
  const c2 = MOCK_CONTRACTORS.find((c) => c.id === contractorId2) || MOCK_CONTRACTORS[1];
  const c3 = MOCK_CONTRACTORS.find((c) => c.id === contractorId3) || MOCK_CONTRACTORS[2];

  const selectedContractors = [c1, c2, c3];

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Compare Contractors
          </Typography>
        </Breadcrumbs>

        {/* Title */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#D9531E', mb: 1 }}>
            <Scale size={20} />
            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.1em' }}>
              SIDE-BY-SIDE EVALUATION
            </Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            Compare Thekedars & Rates
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Evaluate construction credentials, ₹/sq.ft rates, verified completed projects, and customer ratings.
          </Typography>
        </Box>

        {/* Comparison Table */}
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead sx={{ bgcolor: '#F1F5F9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#0F172A', width: '22%' }}>
                  Comparison Metric
                </TableCell>
                {selectedContractors.map((c, idx) => (
                  <TableCell key={idx} sx={{ width: '26%' }}>
                    <FormControl fullWidth size="small">
                      <Select
                        value={c.id}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (idx === 0) setContractorId1(val);
                          if (idx === 1) setContractorId2(val);
                          if (idx === 2) setContractorId3(val);
                        }}
                        sx={{ bgcolor: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        {MOCK_CONTRACTORS.map((opt) => (
                          <MenuItem key={opt.id} value={opt.id}>
                            {opt.businessName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Photo & Name */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Thekedar / Founder</TableCell>
                {selectedContractors.map((c) => (
                  <TableCell key={c.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        component="img"
                        src={c.profilePhotoUrl}
                        alt={c.businessName}
                        sx={{ width: 44, height: 44, borderRadius: 2, objectFit: 'cover' }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                          {c.proprietorName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          {c.primaryLocality}, {c.city}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>

              {/* Rating */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Verified Customer Rating</TableCell>
                {selectedContractors.map((c) => (
                  <TableCell key={c.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ bgcolor: '#059669', color: '#FFF', px: 1, py: 0.2, borderRadius: 1, fontWeight: 800, fontSize: '0.85rem' }}>
                        ★ {c.avgRating}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                        ({c.reviewCount} reviews)
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>

              {/* Experience */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Civil Experience</TableCell>
                {selectedContractors.map((c) => (
                  <TableCell key={c.id}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {c.experienceYears} Years
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Completed Houses */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Completed Sites</TableCell>
                {selectedContractors.map((c) => (
                  <TableCell key={c.id}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#059669' }}>
                      {c.completedProjectsCount} Houses Built
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Indicative Starting Rate */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Labour + Material Rate</TableCell>
                {selectedContractors.map((c) => {
                  const matRate = c.rates.find((r) => r.packageType === 'LABOUR_PLUS_MATERIAL');
                  return (
                    <TableCell key={c.id}>
                      {matRate ? (
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#D9531E' }}>
                          ₹{matRate.minRatePerSqft} - ₹{matRate.maxRatePerSqft} /sq.ft
                        </Typography>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>On Request</Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Turnkey Rate */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Turnkey Luxury Rate</TableCell>
                {selectedContractors.map((c) => {
                  const turnkeyRate = c.rates.find((r) => r.packageType === 'TURNKEY');
                  return (
                    <TableCell key={c.id}>
                      {turnkeyRate ? (
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          ₹{turnkeyRate.minRatePerSqft} - ₹{turnkeyRate.maxRatePerSqft} /sq.ft
                        </Typography>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>On Request</Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Verification Badges */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Verification Badges</TableCell>
                {selectedContractors.map((c) => (
                  <TableCell key={c.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem', color: '#047857' }}>
                        <ShieldCheck size={14} color="#059669" />
                        <span>Aadhaar KYC Verified</span>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem', color: '#0369A1' }}>
                        <CheckCircle2 size={14} color="#0284C7" />
                        <span>GST Registered</span>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem', color: '#C2410C' }}>
                        <Award size={14} color="#D9531E" />
                        <span>Physical Site Inspected</span>
                      </Box>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>

              {/* Actions */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748B' }}>Next Steps</TableCell>
                {selectedContractors.map((c) => (
                  <TableCell key={c.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Link href={`/contractors/${c.id}`} style={{ textDecoration: 'none' }}>
                        <Button fullWidth variant="contained" color="primary" size="small" sx={{ fontWeight: 700 }}>
                          View Rate Card
                        </Button>
                      </Link>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        component="a"
                        href={`tel:${c.phone}`}
                        startIcon={<Phone size={14} color="#059669" />}
                        sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}
                      >
                        Call
                      </Button>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
