'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import { X as CloseIcon, Sparkles, Send, Bot, User, ArrowRight, Calculator } from 'lucide-react';

interface NirmanAIModalProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function NirmanAIModal({ open, onClose }: NirmanAIModalProps) {
  const [inputQuery, setInputQuery] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste! I am Nirman AI, your Indian construction cost & thekedar advisor. Ask me anything about ₹/sq.ft rates, cement/steel requirements, or contractor recommendations for your city!',
    },
  ]);

  const quickPrompts = [
    'Cost to build 1,500 sq.ft duplex in Bengaluru',
    'Labour Only vs Labour + Material difference',
    'How many cement bags for 2,000 sq.ft?',
    'Top verified thekedars in Noida',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    let aiResponse = '';

    const lower = text.toLowerCase();
    if (lower.includes('bengaluru') || lower.includes('bangalore') || lower.includes('1,500') || lower.includes('1500')) {
      aiResponse =
        'In Bengaluru (Whitefield/Sarjapur), average Labour + Material construction is currently ₹1,850 – ₹2,200/sq.ft. For a 1,500 sq.ft duplex, your estimated cost will be ~₹29.70 Lakhs with UltraTech cement & Tata Tiscon steel. Recommended verified builder: Dakshin BuiltTech Turnkey Solutions.';
    } else if (lower.includes('cement') || lower.includes('bags')) {
      aiResponse =
        'As an Indian construction rule of thumb, you need ~0.4 bags of cement per sq.ft of built-up area. For a 2,000 sq.ft house, you will require approximately 800 bags of OPC/PPC 53-grade cement (e.g. UltraTech Super or Ambuja Kawach).';
    } else if (lower.includes('labour') && lower.includes('material')) {
      aiResponse =
        'Labour-Only (₹280–₹380/sq.ft) covers masons, shuttering & bar-bending; you buy all cement, steel & sand. Labour+Material (₹1,650–₹2,100/sq.ft) includes all civil materials under a single fixed-rate contract with milestone escrow, reducing hassle.';
    } else if (lower.includes('noida') || lower.includes('delhi')) {
      aiResponse =
        'In Noida & Greater Noida, our top verified master contractor is Shree Ram Civil Constructions (18 years experience, 142 completed houses, rates from ₹1,650/sq.ft). Both Govt ID and physical site inspection are verified.';
    } else {
      aiResponse =
        `Great question! In Indian metros, current standard civil construction ranges between ₹1,650 and ₹2,450/sq.ft depending on finishes. We recommend getting itemized BOQ quotes from at least 2 verified thekedars on NirmanSetu before signing.`;
    }

    setMessages((prev) => [...prev, userMsg, { sender: 'ai', text: aiResponse }]);
    setInputQuery('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              bgcolor: '#FFF7ED',
              color: '#D9531E',
              border: '1px solid #FFEDD5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={18} />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              Nirman <span style={{ color: '#D9531E' }}>AI</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              AI Construction & Rate Estimator Advisor
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon size={18} />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 1, pb: 2 }}>
        {/* Chat History */}
        <Box
          sx={{
            minHeight: 260,
            maxHeight: 360,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 1.5,
            bgcolor: '#F8FAFC',
            borderRadius: 2,
            border: '1px solid #E2E8F0',
            mb: 2,
          }}
        >
          {messages.map((m, idx) => {
            const isAi = m.sender === 'ai';
            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  maxWidth: '88%',
                }}
              >
                {isAi && (
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: '#D9531E',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={15} />
                  </Box>
                )}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: isAi ? '#FFFFFF' : '#D9531E',
                    color: isAi ? '#0F172A' : '#FFFFFF',
                    border: isAi ? '1px solid #E2E8F0' : 'none',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                  }}
                >
                  {m.text}
                </Paper>
              </Box>
            );
          })}
        </Box>

        {/* Quick prompt suggestions */}
        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block', mb: 1 }}>
          SUGGESTED QUESTIONS:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
          {quickPrompts.map((p, i) => (
            <Chip
              key={i}
              label={p}
              size="small"
              onClick={() => handleSend(p)}
              sx={{
                cursor: 'pointer',
                bgcolor: '#FFF7ED',
                color: '#C2410C',
                border: '1px solid #FFEDD5',
                fontSize: '0.72rem',
                fontWeight: 600,
                '&:hover': { bgcolor: '#FFEDD5' },
              }}
            />
          ))}
        </Box>

        {/* Input bar */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
          sx={{ display: 'flex', gap: 1 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Ask about construction costs, thekedars, rates..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ px: 2.5, bgcolor: '#D9531E' }}>
            <Send size={16} />
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
