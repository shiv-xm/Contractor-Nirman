'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  Rating,
  Divider,
} from '@mui/material';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Phone,
  MessageCircle,
  ExternalLink,
  Award,
} from 'lucide-react';
import { Contractor } from '@/types';
import { formatRatePerSqft } from '@/lib/currency';

interface ContractorCardProps {
  contractor: Contractor;
  onEnquireClick?: (contractor: Contractor) => void;
}

export default function ContractorCard({ contractor, onEnquireClick }: ContractorCardProps) {
  // Find minimum rate
  const minRate = contractor.rates.reduce(
    (min, r) => (r.minRatePerSqft < min ? r.minRatePerSqft : min),
    contractor.rates[0]?.minRatePerSqft || 1650
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#FFFFFF',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        position: 'relative',
      }}
    >
      {/* Demo Record Notification Badge */}
      {contractor.isDemoRecord && (
        <Box
          sx={{
            bgcolor: '#FFFBEB',
            color: '#B45309',
            px: 2,
            py: 0.5,
            fontSize: '0.72rem',
            fontWeight: 700,
            borderBottom: '1px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Verified Demonstration Profile</span>
          <Chip
            label="Demo Data"
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              bgcolor: 'rgba(180, 83, 9, 0.1)',
              color: '#B45309',
              fontWeight: 700,
            }}
          />
        </Box>
      )}

      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header: Photo, Name, Location & Verified Status */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box
            component="img"
            src={contractor.profilePhotoUrl}
            alt={contractor.businessName}
            sx={{
              width: 68,
              height: 68,
              borderRadius: '12px',
              objectFit: 'cover',
              border: '2px solid #F1F5F9',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}
          />

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.2,
                  fontSize: '1.05rem',
                }}
              >
                {contractor.businessName}
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.2 }}>
              Proprietor: <strong>{contractor.proprietorName}</strong>
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, color: '#475569' }}>
              <MapPin size={14} color="#D9531E" />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {contractor.primaryLocality}, {contractor.city}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Verification Pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
          {contractor.verificationBadges.govtIdVerified && (
            <Chip
              icon={<ShieldCheck size={13} color="#059669" />}
              label="Govt ID Verified"
              size="small"
              sx={{
                bgcolor: '#ECFDF5',
                color: '#047857',
                fontSize: '0.72rem',
                fontWeight: 600,
                border: '1px solid #A7F3D0',
              }}
            />
          )}
          {contractor.verificationBadges.gstVerified && (
            <Chip
              icon={<CheckCircle2 size={13} color="#0284C7" />}
              label="GST Registered"
              size="small"
              sx={{
                bgcolor: '#F0F9FF',
                color: '#0369A1',
                fontSize: '0.72rem',
                fontWeight: 600,
                border: '1px solid #BAE6FD',
              }}
            />
          )}
          {contractor.verificationBadges.siteInspected && (
            <Chip
              icon={<Award size={13} color="#D9531E" />}
              label="Site Inspected"
              size="small"
              sx={{
                bgcolor: '#FFF7ED',
                color: '#C2410C',
                fontSize: '0.72rem',
                fontWeight: 600,
                border: '1px solid #FFEDD5',
              }}
            />
          )}
        </Box>

        {/* Ratings & Key Stats */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#F8FAFC',
            p: 1.5,
            borderRadius: 2,
            mb: 2,
            border: '1px solid #F1F5F9',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box
              sx={{
                bgcolor: '#059669',
                color: '#FFFFFF',
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                fontWeight: 800,
                fontSize: '0.85rem',
              }}
            >
              ★ {contractor.avgRating}
            </Box>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              ({contractor.reviewCount} reviews)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>
                Experience
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {contractor.experienceYears} Years
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: 22 }} />

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>
                Completed
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {contractor.completedProjectsCount} Sites
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bio snippet */}
        <Typography
          variant="body2"
          sx={{
            color: '#475569',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {contractor.bio}
        </Typography>

        {/* Indicative Rate Card Highlight */}
        <Box
          sx={{
            mt: 'auto',
            pt: 1.5,
            borderTop: '1px dashed #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>
              Indicative Construction Rate
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#D9531E', lineHeight: 1.1 }}>
              From {formatRatePerSqft(minRate)}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500, fontSize: '0.7rem' }}>
            Built-up Area
          </Typography>
        </Box>

        {/* Action Buttons: Call / WhatsApp / View Profile / Request Quote */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            component="a"
            href={`tel:${contractor.phone}`}
            sx={{
              minWidth: 40,
              px: 1.2,
              borderColor: '#CBD5E1',
              color: '#0F172A',
              '&:hover': { borderColor: '#94A3B8', bgcolor: '#F8FAFC' },
            }}
            title="Call Thekedar"
          >
            <Phone size={15} color="#059669" />
          </Button>

          {contractor.whatsappNumber && (
            <Button
              variant="outlined"
              size="small"
              component="a"
              href={`https://wa.me/${contractor.whatsappNumber}?text=Hi%20${encodeURIComponent(contractor.proprietorName)},%20I%20found%20your%20profile%20on%20NirmanSetu%20and%20would%20like%20to%20discuss%20a%20construction%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: 40,
                px: 1.2,
                borderColor: '#A7F3D0',
                bgcolor: '#F0FDF4',
                color: '#047857',
                '&:hover': { borderColor: '#34D399', bgcolor: '#DCFCE7' },
              }}
              title="Chat on WhatsApp"
            >
              <MessageCircle size={15} color="#059669" />
            </Button>
          )}

          <Link href={`/contractors/${contractor.id}`} style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.84rem', py: 0.9 }}
            >
              View Portfolio & Rates
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
