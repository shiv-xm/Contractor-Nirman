'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
  InputBase,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  X as CloseIcon,
  HardHat,
  Search,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/common/AuthModal';
import NirmanAIModal from '@/components/common/NirmanAIModal';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, setOpenLoginModal, setOpenSignupModal } = useAuth();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [aiModalOpen, setAiModalOpen] = React.useState(false);

  // Sign up dropdown anchor
  const [signupAnchor, setSignupAnchor] = React.useState<null | HTMLElement>(null);

  // User menu anchor
  const [userAnchor, setUserAnchor] = React.useState<null | HTMLElement>(null);

  const navLinks = [
    { label: 'Find Contractors', href: '/contractors' },
    { label: 'Cost Estimator', href: '/cost-estimator' },
    { label: 'Completed Projects', href: '/projects' },
    { label: 'Compare', href: '/compare' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/contractors?city=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/contractors');
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#FFFFFF',
          color: '#0F172A',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 74 }, gap: { xs: 1, md: 2 } }}>
            {/* 1. Brand Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: '#D9531E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 10px rgba(217, 83, 30, 0.25)',
                }}
              >
                <HardHat size={22} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.03em',
                    fontSize: '1.25rem',
                    lineHeight: 1,
                  }}
                >
                  Nirman<span style={{ color: '#D9531E' }}>Setu</span>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontSize: '0.65rem',
                    color: '#64748B',
                    fontWeight: 600,
                    lineHeight: 1,
                    mt: 0.3,
                  }}
                >
                  भरोसेमंद ठेकेदार • मजबूत निर्माण
                </Typography>
              </Box>
            </Link>

            {/* 2. Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5, ml: 2 }}>
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
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
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </Box>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* 3. Reference-Matched Search Pill (`🔍 Search NirmanSetu...`) */}
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                bgcolor: '#FBF5F1', // Soft warm blush tint matching reference image
                borderRadius: '24px',
                px: 2,
                py: 0.6,
                minWidth: { sm: 200, md: 240, lg: 280 },
                border: '1px solid rgba(217, 83, 30, 0.15)',
                transition: 'all 0.2s',
                '&:focus-within': {
                  bgcolor: '#FFFFFF',
                  borderColor: '#D9531E',
                  boxShadow: '0 0 0 3px rgba(217, 83, 30, 0.1)',
                },
              }}
            >
              <Search size={16} color="#8E6A58" style={{ marginRight: 8, flexShrink: 0 }} />
              <InputBase
                placeholder="Search NirmanSetu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  fontSize: '0.86rem',
                  color: '#4A3B32',
                  width: '100%',
                  '& input::placeholder': {
                    color: '#8E6A58',
                    opacity: 0.9,
                  },
                }}
              />
            </Box>

            {/* 4. `✨ Nirman AI` Pill Button matching reference */}
            <Button
              onClick={() => setAiModalOpen(true)}
              startIcon={<Sparkles size={16} color="#B44010" />}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                bgcolor: '#FFFFFF',
                color: '#B44010',
                border: '1px solid rgba(217, 83, 30, 0.28)',
                borderRadius: '20px',
                px: 2,
                py: 0.7,
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                '&:hover': {
                  bgcolor: '#FFF7ED',
                  borderColor: '#D9531E',
                },
              }}
            >
              Nirman AI
            </Button>

            {/* 5. User Profile / Log in / Sign up Controls */}
            {user ? (
              // Logged in state
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link href="/enquiries" style={{ textDecoration: 'none' }}>
                  <Button
                    size="small"
                    startIcon={<FileText size={15} color="#D9531E" />}
                    sx={{ color: '#0F172A', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    My Enquiries
                  </Button>
                </Link>

                <Button
                  onClick={(e) => setUserAnchor(e.currentTarget)}
                  endIcon={<ChevronDown size={14} />}
                  sx={{
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '20px',
                    px: 1.5,
                    py: 0.5,
                    color: '#0F172A',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  <Avatar sx={{ width: 24, height: 24, bgcolor: '#D9531E', fontSize: '0.75rem', mr: 1 }}>
                    {user.name[0]}
                  </Avatar>
                  {user.name.split(' ')[0]}
                </Button>

                <Menu
                  anchorEl={userAnchor}
                  open={Boolean(userAnchor)}
                  onClose={() => setUserAnchor(null)}
                  slotProps={{ paper: { sx: { borderRadius: 2, mt: 1, minWidth: 180 } } }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Role: {user.role}
                    </Typography>
                  </Box>
                  <MenuItem component={Link} href="/enquiries" onClick={() => setUserAnchor(null)}>
                    My Enquiries
                  </MenuItem>
                  {user.role === 'ADMIN' && (
                    <MenuItem component={Link} href="/admin/dashboard" onClick={() => setUserAnchor(null)}>
                      Admin Console
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      setUserAnchor(null);
                      logout();
                    }}
                    sx={{ color: '#DC2626' }}
                  >
                    <LogOut size={15} style={{ marginRight: 8 }} /> Log out
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              // Logged out: Clean reference buttons `[ Log in ]` and `[ Sign up ⌃ ]`
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Outlined `Log in` Button */}
                <Button
                  onClick={() => setOpenLoginModal(true)}
                  sx={{
                    color: '#A83C15',
                    border: '1px solid #C87856',
                    borderRadius: '8px',
                    px: 2.2,
                    py: 0.75,
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    bgcolor: '#FFFFFF',
                    '&:hover': {
                      bgcolor: '#FFF7ED',
                      borderColor: '#A83C15',
                    },
                  }}
                >
                  Log in
                </Button>

                {/* Filled `Sign up ⌃` Button with dropdown */}
                <Button
                  onClick={(e) => setSignupAnchor(e.currentTarget)}
                  endIcon={<ChevronDown size={15} />}
                  sx={{
                    bgcolor: '#A83C15', // Rich terracotta brick color matching screenshot
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    px: 2.2,
                    py: 0.75,
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#8F310F',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Sign up
                </Button>

                {/* Sign up role options */}
                <Menu
                  anchorEl={signupAnchor}
                  open={Boolean(signupAnchor)}
                  onClose={() => setSignupAnchor(null)}
                  slotProps={{ paper: { sx: { borderRadius: 2, mt: 1, minWidth: 200 } } }}
                >
                  <MenuItem
                    onClick={() => {
                      setSignupAnchor(null);
                      setOpenSignupModal(true);
                    }}
                  >
                    <User size={16} color="#059669" style={{ marginRight: 10 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        As Homeowner
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Post requirements & hire
                      </Typography>
                    </Box>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setSignupAnchor(null);
                      setOpenSignupModal(true);
                    }}
                  >
                    <HardHat size={16} color="#D9531E" style={{ marginRight: 10 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        As Thekedar / Contractor
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Get leads & list company
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {/* Mobile Hamburger Toggle */}
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, ml: 0.5 }}>
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
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: '#D9531E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
              }}
            >
              <HardHat size={18} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Nirman<span style={{ color: '#D9531E' }}>Setu</span>
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon size={20} />
          </IconButton>
        </Box>

        <Box sx={{ my: 2 }}>
          <Button
            fullWidth
            onClick={() => {
              setMobileOpen(false);
              setAiModalOpen(true);
            }}
            startIcon={<Sparkles size={16} color="#B44010" />}
            sx={{
              bgcolor: '#FFF7ED',
              color: '#B44010',
              border: '1px solid #FFEDD5',
              py: 1,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Ask Nirman AI
          </Button>
        </Box>

        <List>
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
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

          <ListItem disablePadding sx={{ mt: 1 }}>
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
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 700, fontSize: '0.88rem' }}>
                    Admin Console Demo
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', pt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {!user ? (
            <>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenLoginModal(true);
                }}
                sx={{ py: 1.1, fontWeight: 700, borderColor: '#C87856', color: '#A83C15' }}
              >
                Log in
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenSignupModal(true);
                }}
                sx={{ py: 1.1, fontWeight: 700, bgcolor: '#A83C15' }}
              >
                Sign up
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
            >
              Log out ({user.name.split(' ')[0]})
            </Button>
          )}
        </Box>
      </Drawer>

      {/* Global Auth Modal & Nirman AI Modal */}
      <AuthModal />
      <NirmanAIModal open={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
}
