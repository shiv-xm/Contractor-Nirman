'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Tabs,
  Tab,
  Rating,
  Divider,
  Card,
  CardMedia,
  CardContent,
  TextField,
  MenuItem,
  Alert,
  Breadcrumbs,
} from '@mui/material';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Award,
  Calendar,
  Building,
  Check,
  X,
  FileText,
  Star,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MOCK_CONTRACTORS, MOCK_PROJECTS, MOCK_REVIEWS } from '@/data/mockData';
import { Contractor, ServicePackage, BuildingType } from '@/types';
import { formatINR, formatRatePerSqft, PACKAGE_LABELS, BUILDING_TYPE_LABELS } from '@/lib/currency';

function ContractorProfileContent() {
  const params = useParams();
  const router = useRouter();
  const contractorId = params.id as string;

  // Find contractor from mock data
  const contractor = MOCK_CONTRACTORS.find((c) => c.id === contractorId) || MOCK_CONTRACTORS[0];

  // Associated projects & reviews
  const projects = MOCK_PROJECTS.filter((p) => p.contractorId === contractor.id);
  const reviews = MOCK_REVIEWS.filter((r) => r.contractorId === contractor.id);

  // Active Tab
  const [activeTab, setActiveTab] = React.useState(0);

  // Quick Enquiry Form state
  const [plotArea, setPlotArea] = React.useState<number>(1500);
  const [buildingType, setBuildingType] = React.useState<BuildingType>('INDEPENDENT_HOUSE');
  const [packageType, setPackageType] = React.useState<ServicePackage>('LABOUR_PLUS_MATERIAL');
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [enquirySuccess, setEnquirySuccess] = React.useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
    }, 6000);
  };

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2.5, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/contractors" style={{ color: '#64748B', textDecoration: 'none' }}>
            Contractors
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {contractor.businessName}
          </Typography>
        </Breadcrumbs>

        {/* Demo Record Notice */}
        {contractor.isDemoRecord && (
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1E40AF',
              '& .MuiAlert-icon': { color: '#2563EB' },
            }}
          >
            <strong>Demonstration Profile:</strong> This is a verified prototype demonstration record for{' '}
            <strong>{contractor.city}</strong>. Real contractor portfolios will display government Aadhaar/PAN
            certificates and live on-site inspection reports.
          </Alert>
        )}

        {/* Profile Hero Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            mb: 4,
          }}
        >
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            {/* Photo & Basic Details */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { sm: 'center' } }}>
                <Box
                  component="img"
                  src={contractor.profilePhotoUrl}
                  alt={contractor.businessName}
                  sx={{
                    width: { xs: 90, sm: 110 },
                    height: { xs: 90, sm: 110 },
                    borderRadius: 3,
                    objectFit: 'cover',
                    border: '3px solid #F1F5F9',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.4rem', sm: '1.8rem' } }}>
                      {contractor.businessName}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle2" sx={{ color: '#475569', mb: 1 }}>
                    Lead Contractor / Thekedar: <strong>{contractor.proprietorName}</strong>
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748B', fontSize: '0.85rem' }}>
                      <MapPin size={15} color="#D9531E" />
                      <span>{contractor.primaryLocality}, {contractor.city} ({contractor.state})</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748B', fontSize: '0.85rem' }}>
                      <Calendar size={15} color="#059669" />
                      <span><strong>{contractor.experienceYears} Years</strong> Experience</span>
                    </Box>
                  </Box>

                  {/* Verification Badges */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                      icon={<ShieldCheck size={14} color="#059669" />}
                      label="Aadhaar / Govt ID Verified"
                      size="small"
                      sx={{ bgcolor: '#ECFDF5', color: '#047857', fontWeight: 700, border: '1px solid #A7F3D0' }}
                    />
                    <Chip
                      icon={<CheckCircle2 size={14} color="#0284C7" />}
                      label="GST Registered"
                      size="small"
                      sx={{ bgcolor: '#F0F9FF', color: '#0369A1', fontWeight: 700, border: '1px solid #BAE6FD' }}
                    />
                    <Chip
                      icon={<Award size={14} color="#D9531E" />}
                      label="Physical Site Inspected"
                      size="small"
                      sx={{ bgcolor: '#FFF7ED', color: '#C2410C', fontWeight: 700, border: '1px solid #FFEDD5' }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Rating & Contact Action Buttons */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: '#F8FAFC',
                  border: '1px solid #F1F5F9',
                  textAlign: { xs: 'left', md: 'center' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' }, gap: 1, mb: 0.5 }}>
                  <Box
                    sx={{
                      bgcolor: '#059669',
                      color: '#FFF',
                      px: 1.2,
                      py: 0.4,
                      borderRadius: 1.5,
                      fontWeight: 800,
                      fontSize: '1.1rem',
                    }}
                  >
                    ★ {contractor.avgRating}
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
                      Verified Rating
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Based on {contractor.reviewCount} homeowner reviews
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2, pt: 1.5, borderTop: '1px solid #E2E8F0' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                      Completed
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {contractor.completedProjectsCount} Houses
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
                      Active Sites
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#D9531E' }}>
                      {contractor.ongoingProjectsCount} Ongoing
                    </Typography>
                  </Box>
                </Box>

                {/* Direct Connect Buttons */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <Button
                    variant="outlined"
                    component="a"
                    href={`tel:${contractor.phone}`}
                    startIcon={<Phone size={16} color="#059669" />}
                    sx={{
                      borderColor: '#CBD5E1',
                      color: '#0F172A',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      py: 1,
                    }}
                  >
                    Call
                  </Button>

                  {contractor.whatsappNumber && (
                    <Button
                      variant="contained"
                      component="a"
                      href={`https://wa.me/${contractor.whatsappNumber}?text=Hi%20${encodeURIComponent(contractor.proprietorName)},%20I%20saw%20your%20verified%20profile%20on%20NirmanSetu.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<MessageCircle size={16} />}
                      sx={{
                        bgcolor: '#16A34A',
                        '&:hover': { bgcolor: '#15803D' },
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        py: 1,
                      }}
                    >
                      WhatsApp
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Main Content Tabs & Sticky Enquiry Sidebar */}
        <Grid container spacing={4}>
          {/* Left Column: Tabs */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <Tabs
                value={activeTab}
                onChange={(_, val) => setActiveTab(val)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: '1px solid #E2E8F0',
                  px: 2,
                  bgcolor: '#FAFAFA',
                  '& .MuiTab-root': { fontWeight: 700, py: 2, fontSize: '0.92rem' },
                }}
              >
                <Tab label="Rate Cards & Packages" />
                <Tab label={`Completed Projects (${projects.length})`} />
                <Tab label={`Customer Reviews (${reviews.length})`} />
                <Tab label="About & KYC Proof" />
              </Tabs>

              <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
                {/* TAB 0: RATE CARDS & PACKAGES */}
                {activeTab === 0 && (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                        Construction Rate Cards & Scope of Work
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        Transparent pricing per square foot of built-up area. Rates are indicative and depend on structural specifications.
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {contractor.rates.map((rate) => (
                        <Card
                          key={rate.id}
                          sx={{
                            borderRadius: 3,
                            border: '1px solid #E2E8F0',
                            bgcolor: '#FFFFFF',
                            p: 3,
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
                            <Box>
                              <Chip
                                label={BUILDING_TYPE_LABELS[rate.buildingCategory]}
                                size="small"
                                sx={{ bgcolor: '#F1F5F9', color: '#334155', fontWeight: 700, mr: 1, mb: 0.5 }}
                              />
                              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', display: 'inline-block' }}>
                                {PACKAGE_LABELS[rate.packageType]}
                              </Typography>
                            </Box>

                            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                                Indicative Rate
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 900, color: '#D9531E' }}>
                                ₹{rate.minRatePerSqft} - ₹{rate.maxRatePerSqft}
                                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}> /sq.ft</span>
                              </Typography>
                            </Box>
                          </Box>

                          {rate.pricingNotes && (
                            <Box sx={{ bgcolor: '#FEF3C7', color: '#92400E', p: 1.2, borderRadius: 1.5, fontSize: '0.8rem', fontWeight: 600, mb: 2 }}>
                              {rate.pricingNotes}
                            </Box>
                          )}

                          <Grid container spacing={2}>
                            {/* Inclusions */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#059669', mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Check size={16} /> Scope Inclusions:
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                                {rate.inclusions.map((inc, i) => (
                                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, fontSize: '0.82rem', color: '#334155' }}>
                                    <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
                                    <span>{inc}</span>
                                  </Box>
                                ))}
                              </Box>
                            </Grid>

                            {/* Exclusions */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#DC2626', mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <X size={16} /> Scope Exclusions:
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                                {rate.exclusions.map((exc, i) => (
                                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, fontSize: '0.82rem', color: '#64748B' }}>
                                    <span style={{ color: '#DC2626', fontWeight: 800 }}>✗</span>
                                    <span>{exc}</span>
                                  </Box>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* TAB 1: COMPLETED PROJECTS */}
                {activeTab === 1 && (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                        Completed Buildings & Site Inspections
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        Physically verified projects delivered by {contractor.proprietorName} with construction stage progress photos.
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      {projects.map((proj) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={proj.id}>
                          <Link href={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid #E2E8F0', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-3px)' } }}>
                              <CardMedia
                                component="img"
                                height="180"
                                image={proj.coverImage}
                                alt={proj.title}
                              />
                              <CardContent sx={{ p: 2 }}>
                                <Typography variant="caption" sx={{ color: '#D9531E', fontWeight: 700, display: 'block' }}>
                                  {proj.locality}, {proj.city}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                                  {proj.title}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B' }}>
                                  <span>{proj.builtUpAreaSqft.toLocaleString('en-IN')} sq.ft</span>
                                  <strong style={{ color: '#D9531E' }}>{formatINR(proj.approxCostInr, true)}</strong>
                                </Box>
                              </CardContent>
                            </Card>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* TAB 2: REVIEWS */}
                {activeTab === 2 && (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                        Homeowner Reviews & Rating Breakdown
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748B' }}>
                        Ratings validated against completed physical project delivery.
                      </Typography>
                    </Box>

                    {/* Sub-ratings bars */}
                    <Paper elevation={0} sx={{ p: 2.5, mb: 3, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                      <Grid container spacing={2}>
                        {[
                          { label: 'Work Quality & RCC Strength', score: '4.9 / 5' },
                          { label: 'Timeliness & Schedule Adherence', score: '4.7 / 5' },
                          { label: 'Communication & Daily Logs', score: '4.9 / 5' },
                          { label: 'Budget Transparency (No Hidden BOQ)', score: '4.8 / 5' },
                        ].map((sub, i) => (
                          <Grid size={{ xs: 12, sm: 6 }} key={i}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>
                                {sub.label}
                              </Typography>
                              <Typography variant="caption" sx={{ fontWeight: 800, color: '#059669' }}>
                                {sub.score}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {reviews.map((rev) => (
                        <Paper key={rev.id} elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid #E2E8F0' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                                {rev.customerName}
                              </Typography>
                              {rev.isVerifiedHomeowner && (
                                <Chip
                                  label="Verified Homeowner"
                                  size="small"
                                  sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#ECFDF5', color: '#047857', fontWeight: 700 }}
                                />
                              )}
                            </Box>
                            <Rating value={rev.overallRating} readOnly size="small" />
                          </Box>

                          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1.5 }}>
                            Site: {rev.projectTitle} • {rev.customerLocation}
                          </Typography>

                          <Typography variant="body2" sx={{ color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                            &ldquo;{rev.feedbackText}&rdquo;
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* TAB 3: ABOUT & KYC PROOF */}
                {activeTab === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                      Contractor Bio & Company Profile
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 3 }}>
                      {contractor.bio}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                      Verification & Legal Credentials
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block' }}>
                            AADHAAR / PAN KYC
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#059669', mt: 0.5 }}>
                            Verified by NirmanSetu Admin
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block' }}>
                            GST COMPLIANCE
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0369A1', mt: 0.5 }}>
                            Registered Entity
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block' }}>
                            LANGUAGES SPOKEN
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.5 }}>
                            {contractor.languages.join(', ')}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Sticky Request Quote Widget */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                position: { lg: 'sticky' },
                top: { lg: 90 },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                Request a Free Quotation
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Get an itemized quotation directly from {contractor.proprietorName} without commission.
              </Typography>

              {enquirySuccess && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                  Enquiry sent to {contractor.proprietorName}! You will receive a call within 24 hours.
                </Alert>
              )}

              <Box component="form" onSubmit={handleEnquirySubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Your Full Name"
                  size="small"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />

                <TextField
                  label="Phone Number (10 digits)"
                  size="small"
                  required
                  placeholder="9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />

                <TextField
                  select
                  label="Building Category"
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

                <TextField
                  select
                  label="Preferred Package"
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

                <TextField
                  label="Built-up Area (sq.ft)"
                  type="number"
                  size="small"
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ py: 1.3, fontWeight: 800, fontSize: '0.95rem', mt: 1 }}
                >
                  Submit Requirement
                </Button>

                <Typography variant="caption" sx={{ color: '#94A3B8', textAlign: 'center', fontSize: '0.72rem' }}>
                  🔒 100% Privacy. Your contact is only shared with this authorized contractor.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function ContractorProfilePage() {
  return (
    <React.Suspense fallback={<Box sx={{ py: 8, textAlign: 'center' }}>Loading contractor profile...</Box>}>
      <ContractorProfileContent />
    </React.Suspense>
  );
}
