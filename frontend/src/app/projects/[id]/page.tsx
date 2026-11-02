'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  HardHat,
  ArrowRight,
  ShieldCheck,
  Phone,
  Layers,
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_CONTRACTORS } from '@/data/mockData';
import { formatINR, BUILDING_TYPE_LABELS } from '@/lib/currency';

function ProjectDetailContent() {
  const params = useParams();
  const projectId = params.id as string;

  const project = MOCK_PROJECTS.find((p) => p.id === projectId) || MOCK_PROJECTS[0];
  const contractor = MOCK_CONTRACTORS.find((c) => c.id === project.contractorId) || MOCK_CONTRACTORS[0];

  const [activeMediaIndex, setActiveMediaIndex] = React.useState(0);
  const activeMedia = project.media[activeMediaIndex] || project.media[0];

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/projects" style={{ color: '#64748B', textDecoration: 'none' }}>
            Projects
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {project.title}
          </Typography>
        </Breadcrumbs>

        {/* Title Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip
              label={BUILDING_TYPE_LABELS[project.buildingType]}
              size="small"
              sx={{ bgcolor: '#FFF7ED', color: '#C2410C', fontWeight: 700 }}
            />
            <Chip
              icon={<CheckCircle2 size={13} color="#059669" />}
              label="Verified Physical Delivery"
              size="small"
              sx={{ bgcolor: '#ECFDF5', color: '#047857', fontWeight: 700 }}
            />
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            {project.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B' }}>
            <MapPin size={16} color="#D9531E" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {project.locality}, {project.city}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column: Photo Stage Viewer */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 4 }}>
              {/* Main Photo Display */}
              <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                <Box
                  component="img"
                  src={activeMedia.mediaUrl}
                  alt={activeMedia.caption}
                  sx={{
                    width: '100%',
                    height: { xs: 280, sm: 460 },
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    bgcolor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFF',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  STAGE: {activeMedia.stage}
                </Box>
              </Box>

              {/* Caption */}
              <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, mb: 2, px: 1 }}>
                📸 {activeMedia.caption}
              </Typography>

              {/* Thumbnails */}
              <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
                {project.media.map((med, idx) => (
                  <Box
                    key={med.id}
                    onClick={() => setActiveMediaIndex(idx)}
                    component="img"
                    src={med.mediaUrl}
                    alt={med.caption}
                    sx={{
                      width: 90,
                      height: 70,
                      borderRadius: 1.5,
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: `2px solid ${activeMediaIndex === idx ? '#D9531E' : '#E2E8F0'}`,
                      opacity: activeMediaIndex === idx ? 1 : 0.7,
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Description & Narrative */}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                Project Overview & Execution Details
              </Typography>
              <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 3 }}>
                {project.description}
              </Typography>

              {project.specifications && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}>
                    Verified Material Specifications Used:
                  </Typography>
                  <Table size="small">
                    <TableBody>
                      {Object.entries(project.specifications).map(([key, val]) => (
                        <TableRow key={key}>
                          <TableCell sx={{ fontWeight: 700, color: '#64748B', width: '35%' }}>{key}</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#0F172A' }}>{val}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </Paper>
          </Grid>

          {/* Right Column: Key Metrics & Contractor Card */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Quick Metrics Card */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block', mb: 2 }}>
                PROJECT SPECIFICATIONS
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Built-up Area</span>
                  <strong style={{ color: '#0F172A' }}>{project.builtUpAreaSqft.toLocaleString('en-IN')} sq.ft</strong>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Number of Floors</span>
                  <strong style={{ color: '#0F172A' }}>{project.floors} Floors (G+{project.floors - 1})</strong>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Approx Construction Cost</span>
                  <strong style={{ color: '#D9531E', fontSize: '1.1rem' }}>{formatINR(project.approxCostInr, true)}</strong>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Execution Duration</span>
                  <strong style={{ color: '#0F172A' }}>11 Months</strong>
                </Box>
              </Box>
            </Paper>

            {/* Builder Card */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block', mb: 2 }}>
                EXECUTING CIVIL THEKEDAR
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <Box
                  component="img"
                  src={contractor.profilePhotoUrl}
                  alt={contractor.businessName}
                  sx={{ width: 60, height: 60, borderRadius: 2, objectFit: 'cover' }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                    {contractor.businessName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                    Thekedar: <strong>{contractor.proprietorName}</strong>
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2 }}>
                <Box sx={{ bgcolor: '#059669', color: '#FFF', px: 0.8, py: 0.2, borderRadius: 1, fontWeight: 800, fontSize: '0.85rem' }}>
                  ★ {contractor.avgRating}
                </Box>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                  ({contractor.reviewCount} reviews) • {contractor.experienceYears} Years Exp
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href={`/contractors/${contractor.id}`} style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="contained" color="primary" sx={{ py: 1.2, fontWeight: 700 }}>
                    View Full Rate Card & Profile
                  </Button>
                </Link>

                <Button
                  fullWidth
                  variant="outlined"
                  component="a"
                  href={`tel:${contractor.phone}`}
                  startIcon={<Phone size={16} color="#059669" />}
                  sx={{ py: 1.1, fontWeight: 700, borderColor: '#CBD5E1', color: '#0F172A' }}
                >
                  Call {contractor.proprietorName}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function ProjectDetailPage() {
  return (
    <React.Suspense fallback={<Box sx={{ py: 8, textAlign: 'center' }}>Loading project details...</Box>}>
      <ProjectDetailContent />
    </React.Suspense>
  );
}
