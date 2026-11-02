'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Menu as MenuIcon,
  X as CloseIcon,
  HardHat,
  Calculator,
  Building2,
  Scale,
  ShieldCheck,
  UserCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { POPULAR_CITIES } from '@/lib/currency';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState(POPULAR_CITIES[0]);

  const navLinks = [
    { label: 'Find Contractors', href: '/contractors', icon: HardHat },
    { label: 'Cost Estimator', href: '/cost-estimator', icon: Calculator, badge: 'Instant' },
    { label: 'Completed Projects', href: '/projects', icon: Building2 },
    { label: 'Compare', href: '/compare', icon: Scale },
  ];

  return (
    <>
      {/* Top Trust & Announcement Bar */}
      <Box
        sx={{
          bgcolor: '#0F172A',
          color: '#94A3B8',
          py: 0.75,
          fontSize: '0.8rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldCheck size={14} color="#10B981" />
              <Typography variant="caption" sx={{ color: '#E2E8F0', fontWeight: 500 }}>
                100% Verified Civil Thekedars & Turnkey Contractors • Zero Brokerage
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
                <Chip
                  icon={<UserCheck size={13} color="#F59E0B" />}
                  label="Admin Demo Panel"
                  size="small"
                  clickable
                  sx={{
                    bgcolor: 'rgba(245, 158, 11, 0.15)',
                    color: '#FCD34D',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    height: 22,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}
                />
              </Link>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Helpline: +91 80000 99888
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Navigation Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#FFFFFF',
          color: '#0F172A',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '10px',
                  bgcolor: '#D9531E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(217, 83, 30, 0.3)',
                }}
              >
                <HardHat size={24} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      fontWeight: 800,
                      color: '#0F172A',
                      letterSpacing: '-0.03em',
                      fontSize: '1.25rem',
                      lineHeight: 1.1,
                    }}
                  >
                    Nirman<span style={{ color: '#D9531E' }}>Setu</span>
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    fontSize: '0.68rem',
                    color: '#64748B',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  भरोसेमंद ठेकेदार • मजबूत निर्माण
                </Typography>
              </Box>
            </Link>

            {/* City Selector */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', ml: 1 }}>
              <FormControl size="small" variant="standard">
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disableUnderline
                  sx={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#334155',
                    bgcolor: '#F1F5F9',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    '& .MuiSelect-select': { py: 0.4, pr: '28px !important' },
                  }}
                  startAdornment={<MapPin size={14} color="#D9531E" style={{ marginRight: 6 }} />}
                >
                  {POPULAR_CITIES.map((c) => (
                    <MenuItem key={c} value={c} sx={{ fontSize: '0.85rem' }}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Desktop Nav Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{
                        color: isActive ? '#D9531E' : '#334155',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.88rem',
                        py: 0.8,
                        px: 1.5,
                        borderRadius: '8px',
                        bgcolor: isActive ? 'rgba(217, 83, 30, 0.08)' : 'transparent',
                        '&:hover': {
                          bgcolor: 'rgba(217, 83, 30, 0.06)',
                          color: '#D9531E',
                        },
                      }}
                      startIcon={<Icon size={16} />}
                    >
                      {item.label}
                      {item.badge && (
                        <Box
                          component="span"
                          sx={{
                            ml: 0.8,
                            bgcolor: '#FEF3C7',
                            color: '#B45309',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            px: 0.8,
                            py: 0.2,
                            borderRadius: '4px',
                            border: '1px solid #FDE68A',
                          }}
                        >
                          {item.badge}
                        </Box>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </Box>

            {/* Right Action Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <Link href="/cost-estimator" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#CBD5E1',
                    color: '#0F172A',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    '&:hover': { borderColor: '#94A3B8', bgcolor: '#F8FAFC' },
                  }}
                >
                  Calculate Cost
                </Button>
              </Link>

              <Link href="/contractors" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Sparkles size={15} />}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    px: 2,
                    py: 0.9,
                  }}
                >
                  Post Requirement
                </Button>
              </Link>
            </Box>

            {/* Mobile Hamburger Toggle */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ color: '#0F172A' }}
              >
                <MenuIcon size={24} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: 300, p: 2, bgcolor: '#FFFFFF' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: '1px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                bgcolor: '#D9531E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
              }}
            >
              <HardHat size={20} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Nirman<span style={{ color: '#D9531E' }}>Setu</span>
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon size={20} />
          </IconButton>
        </Box>

        <List sx={{ pt: 2 }}>
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.href} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: '8px',
                    bgcolor: isActive ? 'rgba(217, 83, 30, 0.08)' : 'transparent',
                    color: isActive ? '#D9531E' : '#1E293B',
                  }}
                >
                  <Icon size={18} style={{ marginRight: 12 }} />
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: isActive ? 700 : 500, fontSize: '0.92rem' }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding sx={{ mt: 2, mb: 1 }}>
            <ListItemButton
              component={Link}
              href="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: '8px',
                bgcolor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
              }}
            >
              <UserCheck size={18} style={{ marginRight: 12 }} />
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    Admin Demo Portal
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', pt: 3 }}>
          <Link href="/contractors" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
            <Button fullWidth variant="contained" color="primary" sx={{ py: 1.2, fontWeight: 700 }}>
              Post Requirement
            </Button>
          </Link>
        </Box>
      </Drawer>
    </>
  );
}
