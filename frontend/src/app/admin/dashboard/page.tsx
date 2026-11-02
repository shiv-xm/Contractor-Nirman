'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  Breadcrumbs,
} from '@mui/material';
import {
  Users,
  HardHat,
  Building2,
  FileCheck,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  AlertCircle,
  MessageSquare,
  Search,
  Check,
  X,
} from 'lucide-react';
import { MOCK_CONTRACTORS, MOCK_PROJECTS, MOCK_REVIEWS } from '@/data/mockData';
import { Contractor, VerificationStatus } from '@/types';
import { formatINR } from '@/lib/currency';

export default function AdminDashboardPage() {
  const [contractors, setContractors] = React.useState<Contractor[]>(MOCK_CONTRACTORS);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [searchFilter, setSearchFilter] = React.useState('');

  // Contractor verification dialog
  const [verifyDialogOpen, setVerifyDialogOpen] = React.useState(false);
  const [activeContractor, setActiveContractor] = React.useState<Contractor | null>(null);
  const [adminNote, setAdminNote] = React.useState('');
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  // New Contractor modal
  const [newContractorDialogOpen, setNewContractorDialogOpen] = React.useState(false);
  const [newBizName, setNewBizName] = React.useState('');
  const [newProprietor, setNewProprietor] = React.useState('');
  const [newCity, setNewCity] = React.useState('Delhi NCR');
  const [newPhone, setNewPhone] = React.useState('');
  const [newExp, setNewExp] = React.useState(10);

  const handleOpenVerify = (c: Contractor) => {
    setActiveContractor(c);
    setAdminNote('Documents verified on MCA / GST portal. Physical site visit conducted by NirmanSetu field engineer.');
    setVerifyDialogOpen(true);
  };

  const handleSetStatus = (status: VerificationStatus) => {
    if (!activeContractor) return;
    setContractors((prev) =>
      prev.map((c) =>
        c.id === activeContractor.id
          ? {
              ...c,
              verificationStatus: status,
              verificationBadges: {
                ...c.verificationBadges,
                govtIdVerified: status === 'VERIFIED',
                siteInspected: status === 'VERIFIED',
              },
            }
          : c
      )
    );
    setVerifyDialogOpen(false);
    setActionSuccess(`Contractor ${activeContractor.businessName} updated to ${status}.`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const handleAddContractor = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ctr-${Date.now()}`;
    const created: Contractor = {
      id: newId,
      businessName: newBizName,
      proprietorName: newProprietor,
      profilePhotoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80',
      city: newCity,
      state: 'India',
      primaryLocality: 'Central',
      operatingCities: [newCity],
      phone: newPhone,
      email: `${newProprietor.toLowerCase().replace(/\s+/g, '')}@example.com`,
      bio: 'New civil thekedar profile added via administrator console.',
      experienceYears: Number(newExp),
      languages: ['Hindi', 'English'],
      verificationStatus: 'PENDING',
      verificationBadges: {
        govtIdVerified: false,
        gstVerified: false,
        siteInspected: false,
      },
      supportedCategories: ['INDEPENDENT_HOUSE', 'VILLA'],
      supportedPackages: ['LABOUR_PLUS_MATERIAL', 'LABOUR_ONLY'],
      rates: [
        {
          id: `rate-${Date.now()}`,
          contractorId: newId,
          buildingCategory: 'INDEPENDENT_HOUSE',
          packageType: 'LABOUR_PLUS_MATERIAL',
          minRatePerSqft: 1700,
          maxRatePerSqft: 2000,
          unit: 'sq.ft',
          inclusions: ['UltraTech Cement', 'Tata Steel', 'Red brickwork'],
          exclusions: ['Interior woodwork'],
        },
      ],
      completedProjectsCount: 0,
      ongoingProjectsCount: 1,
      avgRating: 5.0,
      reviewCount: 0,
      isPublished: true,
      isDemoRecord: true,
    };

    setContractors([created, ...contractors]);
    setNewContractorDialogOpen(false);
    setActionSuccess(`Contractor profile "${newBizName}" created successfully!`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const filtered = contractors.filter((c) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return c.businessName.toLowerCase().includes(q) || c.proprietorName.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
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
            Administrator Back-Office
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#D9531E', mb: 0.5 }}>
              <ShieldCheck size={20} />
              <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.1em' }}>
                ADMINISTRATOR CONTROL PANEL
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
              Platform Overview & Verification Queue
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Manage civil contractor profiles, verify government KYC documents, inspect completed site portfolios, and moderate reviews.
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={18} />}
            onClick={() => setNewContractorDialogOpen(true)}
            sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, px: 2.5 }}
          >
            Add New Contractor
          </Button>
        </Box>

        {actionSuccess && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {actionSuccess}
          </Alert>
        )}

        {/* 4 Key Platform Metric Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: 'Published Thekedars', count: contractors.filter((c) => c.isPublished).length, color: '#D9531E', icon: HardHat, note: 'All verified profiles' },
            { label: 'Awaiting KYC Verification', count: contractors.filter((c) => c.verificationStatus === 'PENDING').length, color: '#D97706', icon: FileCheck, note: 'ID & Site inspection' },
            { label: 'Verified Sites Delivered', count: MOCK_PROJECTS.length, color: '#059669', icon: Building2, note: 'With progress photographs' },
            { label: 'Customer Reviews Moderated', count: MOCK_REVIEWS.length, color: '#0284C7', icon: MessageSquare, note: '100% verified homeowners' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B' }}>
                      {stat.label}
                    </Typography>
                    <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                      <Icon size={18} />
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#0F172A', mb: 0.5 }}>
                    {stat.count}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    {stat.note}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Tabs for Contractors, Verification Queue, Reviews */}
        <Paper elevation={0} sx={{ borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <Tabs
            value={selectedTab}
            onChange={(_, v) => setSelectedTab(v)}
            sx={{
              px: 3,
              pt: 1,
              bgcolor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              '& .MuiTab-root': { fontWeight: 700 },
            }}
          >
            <Tab label={`Contractor Management (${contractors.length})`} />
            <Tab label="Review Moderation Queue (3)" />
            <Tab label="System Audit Log" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {selectedTab === 0 && (
              <Box>
                {/* Search Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <TextField
                    size="small"
                    placeholder="Search contractor by name or city..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: <Search size={16} color="#94A3B8" style={{ marginRight: 8 }} />,
                      },
                    }}
                    sx={{ maxWidth: 360 }}
                  />
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Total: {filtered.length} Contractors
                  </Typography>
                </Box>

                <TableContainer>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 800 }}>Business Name / Thekedar</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>City</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>Experience</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>Indicative Rates</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>KYC Status</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>Rating</TableCell>
                        <TableCell sx={{ fontWeight: 800, textAlign: 'right' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filtered.map((c) => (
                        <TableRow key={c.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box
                                component="img"
                                src={c.profilePhotoUrl}
                                alt={c.businessName}
                                sx={{ width: 36, height: 36, borderRadius: 1.5, objectFit: 'cover' }}
                              />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                                  {c.businessName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#64748B' }}>
                                  Proprietor: {c.proprietorName} • {c.phone}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell sx={{ fontWeight: 600, color: '#334155' }}>
                            {c.city}
                          </TableCell>

                          <TableCell sx={{ fontWeight: 600 }}>
                            {c.experienceYears} Yrs
                          </TableCell>

                          <TableCell>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#D9531E' }}>
                              ₹{c.rates[0]?.minRatePerSqft || 1650} - ₹{c.rates[0]?.maxRatePerSqft || 1950} /sq.ft
                            </Typography>
                          </TableCell>

                          <TableCell>
                            {c.verificationStatus === 'VERIFIED' ? (
                              <Chip
                                label="VERIFIED"
                                size="small"
                                sx={{ bgcolor: '#ECFDF5', color: '#047857', fontWeight: 800, fontSize: '0.68rem' }}
                              />
                            ) : c.verificationStatus === 'REJECTED' ? (
                              <Chip
                                label="REJECTED"
                                size="small"
                                sx={{ bgcolor: '#FEF2F2', color: '#B91C1C', fontWeight: 800, fontSize: '0.68rem' }}
                              />
                            ) : (
                              <Chip
                                label="PENDING KYC"
                                size="small"
                                sx={{ bgcolor: '#FFFBEB', color: '#B45309', fontWeight: 800, fontSize: '0.68rem' }}
                              />
                            )}
                          </TableCell>

                          <TableCell sx={{ fontWeight: 800, color: '#059669' }}>
                            ★ {c.avgRating}
                          </TableCell>

                          <TableCell sx={{ textAlign: 'right' }}>
                            <Box sx={{ display: 'inline-flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleOpenVerify(c)}
                                sx={{ fontSize: '0.75rem', py: 0.4 }}
                              >
                                Review KYC
                              </Button>
                              <Link href={`/contractors/${c.id}`} style={{ textDecoration: 'none' }}>
                                <Button size="small" variant="text" sx={{ fontSize: '0.75rem', py: 0.4, color: '#64748B' }}>
                                  View
                                </Button>
                              </Link>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {selectedTab === 1 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                  Homeowner Reviews Moderation Queue
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {MOCK_REVIEWS.map((rev) => (
                    <Paper key={rev.id} elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid #E2E8F0' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                            {rev.customerName} ({rev.customerLocation})
                          </Typography>
                          <Chip label="Approved" size="small" sx={{ bgcolor: '#ECFDF5', color: '#047857', fontWeight: 700 }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>{rev.createdAt}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#334155', fontStyle: 'italic', mb: 2 }}>
                        &ldquo;{rev.feedbackText}&rdquo;
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="contained" color="success" startIcon={<Check size={14} />}>
                          Approve Review
                        </Button>
                        <Button size="small" variant="outlined" color="error" startIcon={<X size={14} />}>
                          Reject / Flag
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {selectedTab === 2 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                  Administrative Audit Trail
                </Typography>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Target Entity</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Admin User</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Today, 14:15</TableCell>
                      <TableCell>Contractor KYC Verified</TableCell>
                      <TableCell>Dakshin BuiltTech Turnkey Solutions</TableCell>
                      <TableCell>admin@nirmansetu.in</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Yesterday, 18:30</TableCell>
                      <TableCell>Project Stage Photos Approved</TableCell>
                      <TableCell>Contemporary G+2 Duplex Villa</TableCell>
                      <TableCell>admin@nirmansetu.in</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Yesterday, 11:20</TableCell>
                      <TableCell>Review Approved</TableCell>
                      <TableCell>Anand Kulkarni (Homeowner)</TableCell>
                      <TableCell>admin@nirmansetu.in</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Paper>

        {/* KYC Verification Dialog */}
        <Dialog open={verifyDialogOpen} onClose={() => setVerifyDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>
            Contractor KYC Verification & Site Audit
          </DialogTitle>
          <DialogContent dividers>
            {activeContractor && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {activeContractor.businessName} (Proprietor: {activeContractor.proprietorName})
                </Typography>

                <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: 2, border: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block' }}>
                    SUBMITTED IDENTIFICATION EVIDENCE:
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <div>• <strong>Aadhaar Card:</strong> XXXX-XXXX-4589 (Verified with OTP)</div>
                    <div>• <strong>PAN Card:</strong> AABCS****K (Matches Proprietor Name)</div>
                    <div>• <strong>GSTIN:</strong> 07AABCS1234F1Z8 (Active Status on GST Portal)</div>
                    <div>• <strong>Physical Site Inspection:</strong> Passed 14-point structural checklist (Column curing, shuttering alignment, steel grade Fe550D)</div>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Administrative Notes & Verification Remark"
                  size="small"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => handleSetStatus('REJECTED')} color="error" variant="outlined">
              Reject Verification
            </Button>
            <Button onClick={() => handleSetStatus('VERIFIED')} color="success" variant="contained">
              Approve & Grant Verified Badges
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add New Contractor Dialog */}
        <Dialog open={newContractorDialogOpen} onClose={() => setNewContractorDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>
            Create New Civil Contractor / Thekedar Profile
          </DialogTitle>
          <Box component="form" onSubmit={handleAddContractor}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Business / Firm Name"
                required
                size="small"
                placeholder="e.g. Balaji Civil Infrastructure"
                value={newBizName}
                onChange={(e) => setNewBizName(e.target.value)}
              />
              <TextField
                label="Proprietor / Lead Thekedar Name"
                required
                size="small"
                placeholder="e.g. Ramesh Chandra Sharma"
                value={newProprietor}
                onChange={(e) => setNewProprietor(e.target.value)}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Operating City"
                    size="small"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  >
                    <MenuItem value="Delhi NCR">Delhi NCR</MenuItem>
                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Jaipur">Jaipur</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Years of Experience"
                    type="number"
                    size="small"
                    value={newExp}
                    onChange={(e) => setNewExp(Number(e.target.value))}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Primary Phone Number"
                required
                size="small"
                placeholder="+91 98765 43210"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setNewContractorDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Create Profile
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}
