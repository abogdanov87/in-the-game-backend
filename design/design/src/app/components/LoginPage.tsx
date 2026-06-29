import { useState, useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Typography, Alert, TextField } from '@mui/material';
import { ArrowForward as ArrowIcon, MailOutline as MailIcon } from '@mui/icons-material';
import { fetchMe, loginWithCode, requestLoginCode } from '../utils/api';
import { mergeUserIntoProfile } from '../utils/userProfile';

const CODE_LENGTH = 6;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const char = value.slice(-1).toUpperCase();
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setError('');
    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, CODE_LENGTH).toUpperCase();
    const newDigits = [...digits];
    pasted.split('').forEach((char, i) => {
      if (i < CODE_LENGTH) newDigits[i] = char;
    });
    setDigits(newDigits);
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleRequestCode = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError('Введите корректный email');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await requestLoginCode(normalizedEmail);
      if (!response.sent) {
        throw new Error('Не удалось отправить код. Попробуйте ещё раз.');
      }
      setCodeSent(true);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить код');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const code = digits.join('');
    if (code.length !== CODE_LENGTH) {
      setError('Введите все 6 символов кода');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await loginWithCode(email, code);
      try {
        mergeUserIntoProfile(await fetchMe());
      } catch {}
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  };

  const codeComplete = digits.every((d) => d !== '');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Background accent */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(196, 241, 53, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255, 78, 26, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
        {/* Logo mark */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: 'rgba(196, 241, 53, 0.1)',
              border: '1px solid rgba(196, 241, 53, 0.25)',
              mb: 3,
              boxShadow: '0 0 32px rgba(196, 241, 53, 0.15)',
            }}
          >
            <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>⚽</Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3rem' },
              color: 'text.primary',
              letterSpacing: '0.06em',
              lineHeight: 1,
              mb: 1,
            }}
          >
            ПРОГНОЗЫ
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}
          >
            Соревнование · Футбол 2026
          </Typography>
        </Box>

        {/* Card */}
        <Box
          sx={{
            bgcolor: '#0d1120',
            border: '1px solid rgba(26, 34, 64, 0.8)',
            borderRadius: 2,
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              mb: 0.75,
            }}
          >
            Введите код из письма
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, fontSize: '0.85rem', lineHeight: 1.5 }}>
            Введите email, получите одноразовый код и подтвердите вход. Код действует 5 минут.
          </Typography>

          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            disabled={codeSent || loading}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !codeSent) handleRequestCode();
            }}
            InputProps={{ startAdornment: <MailIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} /> }}
            sx={{ mb: 2.5 }}
          />

          {/* OTP inputs */}
          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, mb: 3, justifyContent: 'center', opacity: codeSent ? 1 : 0.45 }}>
            {digits.map((digit, index) => (
              <Box
                key={index}
                component="input"
                ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el; }}
                value={digit}
                disabled={!codeSent || loading}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                maxLength={1}
                autoFocus={index === 0}
                sx={{
                  width: { xs: 44, sm: 52 },
                  height: { xs: 52, sm: 60 },
                  borderRadius: 1,
                  border: digit
                    ? '1px solid rgba(196, 241, 53, 0.5)'
                    : '1px solid rgba(26, 34, 64, 0.8)',
                  bgcolor: digit ? 'rgba(196, 241, 53, 0.06)' : '#141928',
                  color: 'text.primary',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                  caretColor: '#c4f135',
                  '&:focus': {
                    borderColor: '#c4f135',
                    bgcolor: 'rgba(196, 241, 53, 0.06)',
                    boxShadow: '0 0 0 2px rgba(196, 241, 53, 0.12)',
                  },
                }}
              />
            ))}
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                bgcolor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                '& .MuiAlert-icon': { color: '#ef4444' },
                borderRadius: 1,
                fontSize: '0.825rem',
              }}
            >
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={codeSent ? handleSubmit : handleRequestCode}
            disabled={(codeSent && !codeComplete) || loading}
            endIcon={<ArrowIcon />}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.06em',
              opacity: codeComplete ? 1 : 0.5,
            }}
          >
            {loading ? 'Подождите...' : codeSent ? 'ВОЙТИ' : 'ПОЛУЧИТЬ КОД'}
          </Button>

          {codeSent && (
            <Button
              fullWidth
              variant="text"
              disabled={loading}
              onClick={() => {
                setCodeSent(false);
                setDigits(Array(CODE_LENGTH).fill(''));
              }}
              sx={{ mt: 1.5, color: 'text.secondary' }}
            >
              Изменить email
            </Button>
          )}

          <Box
            sx={{
              mt: 3,
              pt: 2.5,
              borderTop: '1px solid rgba(26, 34, 64, 0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                flexShrink: 0,
                boxShadow: '0 0 6px rgba(196, 241, 53, 0.5)',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.4 }}>
              Код отправляется на указанный email. Если письмо не пришло, запросите код повторно.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
