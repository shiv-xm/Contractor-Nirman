'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import { X as CloseIcon, HardHat, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const {
    openLoginModal,
    setOpenLoginModal,
    openSignupModal,
    setOpenSignupModal,
    login,
  } = useAuth();

  const isOpen = openLoginModal || openSignupModal;
  const isSignUp = openSignupModal;

  const [authType, setAuthType] = React.useState<'CUSTOMER' | 'CONTRACTOR'>('CUSTOMER');
  const [phoneOrEmail, setPhoneOrEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  const handleClose = () => {
    setOpenLoginModal(false);
    setOpenSignupModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(authType);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: '#D9531E',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HardHat size={18} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>
            Nirman<span style={{ color: '#D9531E' }}>Setu</span>
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon size={18} />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5 }}>
          {isSignUp
            ? 'Connect directly with verified civil thekedars with zero brokerage.'
            : 'Access your construction enquiries, quotes, and saved contractors.'}
        </Typography>

        {isSignUp && (
          <Tabs
            value={authType}
            onChange={(_, val) => setAuthType(val)}
            variant="fullWidth"
            sx={{
              mb: 2.5,
              bgcolor: '#F1F5F9',
              borderRadius: 2,
              p: 0.5,
              minHeight: 38,
              '& .MuiTab-root': {
                minHeight: 36,
                py: 0.5,
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 1.5,
                color: '#64748B',
                '&.Mui-selected': { bgcolor: '#FFFFFF', color: '#D9531E', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
              },
              '& .MuiTabs-indicator': { display: 'none' },
            }}
          >
            <Tab value="CUSTOMER" label="Homeowner" />
            <Tab value="CONTRACTOR" label="Contractor / Thekedar" />
          </Tabs>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isSignUp && (
            <TextField
              label="Full Name"
              required
              size="small"
              placeholder="e.g. Anand Kulkarni"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}

          <TextField
            label="Mobile Number or Email"
            required
            size="small"
            placeholder="+91 98765 43210"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              py: 1.2,
              fontWeight: 800,
              fontSize: '0.95rem',
              bgcolor: '#D9531E',
              '&:hover': { bgcolor: '#C44210' },
            }}
          >
            {isSignUp ? 'Sign up' : 'Log in'}
          </Button>

          <Divider sx={{ my: 1 }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
              OR ONE-CLICK DEMO LOGIN
            </Typography>
          </Divider>

          {/* Quick Demo Switchers */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => login('CUSTOMER')}
              startIcon={<User size={15} color="#059669" />}
              sx={{ borderColor: '#E2E8F0', color: '#0F172A', fontWeight: 600, fontSize: '0.82rem', justifyContent: 'flex-start', py: 0.8 }}
            >
              Log in as <strong>Homeowner</strong> (Anil Mehta)
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => login('CONTRACTOR')}
              startIcon={<HardHat size={15} color="#D9531E" />}
              sx={{ borderColor: '#E2E8F0', color: '#0F172A', fontWeight: 600, fontSize: '0.82rem', justifyContent: 'flex-start', py: 0.8 }}
            >
              Log in as <strong>Civil Thekedar</strong> (Ram Kishore)
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => login('ADMIN')}
              startIcon={<ShieldCheck size={15} color="#0284C7" />}
              sx={{ borderColor: '#E2E8F0', color: '#0F172A', fontWeight: 600, fontSize: '0.82rem', justifyContent: 'flex-start', py: 0.8 }}
            >
              Log in as <strong>Administrator</strong> (Full KYC Access)
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            {isSignUp ? (
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Already have an account?{' '}
                <span
                  onClick={() => {
                    setOpenSignupModal(false);
                    setOpenLoginModal(true);
                  }}
                  style={{ color: '#D9531E', fontWeight: 700, cursor: 'pointer' }}
                >
                  Log in
                </span>
              </Typography>
            ) : (
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                New to NirmanSetu?{' '}
                <span
                  onClick={() => {
                    setOpenLoginModal(false);
                    setOpenSignupModal(true);
                  }}
                  style={{ color: '#D9531E', fontWeight: 700, cursor: 'pointer' }}
                >
                  Sign up
                </span>
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
