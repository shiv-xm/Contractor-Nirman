'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  Breadcrumbs,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  FileText,
  Clock,
  MapPin,
  Building,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  HardHat,
  ArrowRight,
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/types';
import { formatINR, PACKAGE_LABELS, BUILDING_TYPE_LABELS } from '@/lib/currency';
import { MOCK_CONTRACTORS } from '@/data/mockData';

// Realistic sample enquiries submitted by customer
const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    customerId: 'cust-1',
    customerName: 'Anil Mehta',
    customerPhone: '+91 98765 11223',
    contractorId: 'ctr-02',
    contractorName: 'Dakshin BuiltTech Turnkey Solutions',
    buildingType: 'VILLA',
    city: 'Bengaluru',
    locality: 'Whitefield',
    builtUpAreaSqft: 2800,
    floors: 3,
    estimatedBudgetInr: 5800000,
    packageType: 'TURNKEY',
    requirementDescription: 'Planning to construct a G+2 contemporary duplex villa on a 30x40 site. Need itemized quotation with Tata Tiscon steel, UltraTech cement, and solar water heater line.',
    status: 'QUOTATION',
    createdAt: '2025-01-28',
  },
  {
    id: 'enq-102',
    customerId: 'cust-1',
    customerName: 'Anil Mehta',
    customerPhone: '+91 98765 11223',
    contractorId: 'ctr-01',
    contractorName: 'Shree Ram Civil Constructions & Thekedar',
    buildingType: 'INDEPENDENT_HOUSE',
    city: 'Noida',
    locality: 'Sector 78',
    builtUpAreaSqft: 2200,
    floors: 2,
    estimatedBudgetInr: 3900000,
    packageType: 'LABOUR_PLUS_MATERIAL',
    requirementDescription: 'G+1 independent house on 200 sq.yard plot. Looking for labour+material package with double coat river sand plaster and 10-year structural warranty.',
    status: 'CONTACTED',
    createdAt: '2025-02-01',
  },
];

const STATUS_CONFIG: Record<EnquiryStatus, { label: string; color: string; bg: string }> = {
  NEW: { label: 'New Lead Sent', color: '#0284C7', bg: '#F0F9FF' },
  CONTACTED: { label: 'Thekedar Contacted', color: '#D97706', bg: '#FFFBEB' },
  DISCUSSION: { label: 'Site Discussion & Measurements', color: '#7C3AED', bg: '#F5F3FF' },
  QUOTATION: { label: 'Quotation / BOQ Shared', color: '#D9531E', bg: '#FFF7ED' },
  WON: { label: 'Agreement Signed & Started', color: '#059669', bg: '#ECFDF5' },
  LOST: { label: 'Closed / Cancelled', color: '#64748B', bg: '#F1F5F9' },
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = React.useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [selectedEnquiry, setSelectedEnquiry] = React.useState<Enquiry>(INITIAL_ENQUIRIES[0]);
  const [replyMessage, setReplyMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    { sender: 'THEKEDAR', text: 'Namaste Anil ji! Received your requirement for 2,800 sq.ft villa in Whitefield. When would be a convenient time for a site inspection?', time: '28 Jan, 3:15 PM' },
    { sender: 'CUSTOMER', text: 'Hi Venkat, I am available this Saturday morning at 10 AM on the plot.', time: '28 Jan, 4:20 PM' },
    { sender: 'THEKEDAR', text: 'Confirmed! I have prepared the initial structural BOQ estimate based on ₹2,450/sq.ft. Sharing draft.', time: '29 Jan, 11:00 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    setMessages([...messages, { sender: 'CUSTOMER', text: replyMessage, time: 'Just now' }]);
    setReplyMessage('');
  };

  const currentStatus = STATUS_CONFIG[selectedEnquiry.status];

  return (
    <Box sx={{ py: 4, bgcolor: '#F8FAFC', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            My Enquiries & Communications
          </Typography>
        </Breadcrumbs>

        {/* Title */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#D9531E', mb: 0.5 }}>
            <FileText size={20} />
            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.1em' }}>
              HOMEOWNER LEAD & QUOTATION TRACKER
            </Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            My Construction Enquiries
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Track contractor follow-ups, itemized quotations (BOQs), and real-time project messaging.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column: List of enquiries */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {enquiries.map((enq) => {
                const isSelected = selectedEnquiry.id === enq.id;
                const statusMeta = STATUS_CONFIG[enq.status];
                return (
                  <Paper
                    key={enq.id}
                    elevation={0}
                    onClick={() => setSelectedEnquiry(enq)}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      cursor: 'pointer',
                      border: `2px solid ${isSelected ? '#D9531E' : '#E2E8F0'}`,
                      bgcolor: '#FFFFFF',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 8px 20px -5px rgba(217, 83, 30, 0.12)' : 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        {enq.contractorName}
                      </Typography>
                      <Chip
                        label={statusMeta.label}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          bgcolor: statusMeta.bg,
                          color: statusMeta.color,
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B', fontSize: '0.8rem', mb: 1 }}>
                      <MapPin size={13} color="#D9531E" />
                      <span>{enq.locality}, {enq.city}</span>
                      <span>•</span>
                      <span>{enq.builtUpAreaSqft} sq.ft</span>
                    </Box>

                    <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.4, mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {enq.requirementDescription}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid #F1F5F9' }}>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Budget: <strong style={{ color: '#D9531E' }}>{formatINR(enq.estimatedBudgetInr, true)}</strong>
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        {enq.createdAt}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Grid>

          {/* Right Column: Active Enquiry Details & Real-Time Chat Thread */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block' }}>
                    ENQUIRY ID: #{selectedEnquiry.id.toUpperCase()}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.2 }}>
                    {selectedEnquiry.contractorName}
                  </Typography>
                </Box>
                <Chip
                  label={currentStatus.label}
                  sx={{ bgcolor: currentStatus.bg, color: currentStatus.color, fontWeight: 800 }}
                />
              </Box>

              {/* Requirement Summary Box */}
              <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: 2, border: '1px solid #E2E8F0', mb: 3 }}>
                <Grid container spacing={1.5} sx={{ fontSize: '0.85rem' }}>
                  <Grid size={{ xs: 6 }}>Building: <strong>{BUILDING_TYPE_LABELS[selectedEnquiry.buildingType]}</strong></Grid>
                  <Grid size={{ xs: 6 }}>Package: <strong>{PACKAGE_LABELS[selectedEnquiry.packageType]}</strong></Grid>
                  <Grid size={{ xs: 6 }}>Area: <strong>{selectedEnquiry.builtUpAreaSqft} sq.ft</strong> ({selectedEnquiry.floors} Floors)</Grid>
                  <Grid size={{ xs: 6 }}>Budget: <strong style={{ color: '#D9531E' }}>{formatINR(selectedEnquiry.estimatedBudgetInr, true)}</strong></Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="caption" sx={{ color: '#475569', display: 'block', fontStyle: 'italic' }}>
                  &ldquo;{selectedEnquiry.requirementDescription}&rdquo;
                </Typography>
              </Box>

              {/* Chat Thread */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MessageCircle size={16} color="#D9531E" /> Conversation with Thekedar:
              </Typography>

              <Box
                sx={{
                  bgcolor: '#FAFAFA',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                  maxHeight: 280,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  mb: 2.5,
                }}
              >
                {messages.map((msg, i) => {
                  const isThekedar = msg.sender === 'THEKEDAR';
                  return (
                    <Box
                      key={i}
                      sx={{
                        alignSelf: isThekedar ? 'flex-start' : 'flex-end',
                        maxWidth: '82%',
                        bgcolor: isThekedar ? '#FFFFFF' : '#D9531E',
                        color: isThekedar ? '#1E293B' : '#FFFFFF',
                        p: 1.5,
                        borderRadius: 2,
                        border: isThekedar ? '1px solid #E2E8F0' : 'none',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, mb: 0.3, color: isThekedar ? '#D9531E' : '#FDE68A' }}>
                        {isThekedar ? selectedEnquiry.contractorName : 'You (Homeowner)'}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        {msg.text}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, fontSize: '0.68rem', opacity: 0.8 }}>
                        {msg.time}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Message Input Box */}
              <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message or discuss drawing specs..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ px: 2.5 }}>
                  <Send size={16} />
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
