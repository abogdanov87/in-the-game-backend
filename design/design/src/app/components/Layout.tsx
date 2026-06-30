import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Leaderboard as LeaderboardIcon,
  SportsSoccer as SoccerIcon,
  BarChart as StatsIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import { loadUserProfile, resolveAvatarProfile, mergeUserIntoProfile, saveUserProfile, avatarSourceFromProfile, type UserProfile } from '../utils/userProfile';
import { clearTokens, fetchMe } from '../utils/api';
import { UserAvatarDisplay } from './PlayerStatsView';

const drawerWidth = 260;

const navItems = [
  { text: 'Таблица', icon: <LeaderboardIcon />, path: '/' },
  { text: 'Матчи',   icon: <SoccerIcon />,      path: '/matches' },
  { text: 'Профиль', icon: <ProfileIcon />,      path: '/profile' },
];

const pageTitles: Record<string, string> = {
  '/':        'Таблица результатов',
  '/matches': 'Матчи',
  '/stats':   'Мой профиль',
  '/profile': 'Мой профиль',
};

function UserAvatar({ profile, size = 32 }: { profile: UserProfile; size?: number }) {
  const resolved = resolveAvatarProfile(avatarSourceFromProfile(profile));
  return <UserAvatarDisplay profile={resolved} size={size} />;
}

function BrandTitle({ compact = false }: { compact?: boolean }) {
  return (
    <Box sx={{ minWidth: 0, flexShrink: 0 }}>
      <Typography
        component="div"
        sx={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          color: '#c4f135',
          letterSpacing: '0.06em',
          lineHeight: 1,
          fontSize: compact ? '1.2rem' : '1.75rem',
          whiteSpace: 'nowrap',
        }}
      >
        FOOTBET
      </Typography>
    </Box>
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  // Sync profile from server and refresh after local edits
  useEffect(() => {
    fetchMe()
      .then((me) => {
        const merged = mergeUserIntoProfile(me);
        setProfile(merged);
        saveUserProfile(merged);
      })
      .catch(() => {});

    const handler = () => setProfile(loadUserProfile());
    window.addEventListener('userProfileUpdated', handler);
    return () => window.removeEventListener('userProfileUpdated', handler);
  }, []);

  const currentNavIndex = navItems.findIndex((item) =>
    item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path)
  );

  const pageTitle = pageTitles[location.pathname] ?? 'Прогнозы';

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
    if (isMobile) setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <BrandTitle />
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Nav items */}
      <Box sx={{ px: 2, py: 1, flex: 1 }}>
        <Typography variant="caption" sx={{ px: 1, color: 'text.secondary', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem', display: 'block', mb: 1, mt: 1 }}>
          Навигация
        </Typography>
        <List disablePadding>
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => { navigate(item.path); if (isMobile) setMobileOpen(false); }}
                  sx={{
                    borderRadius: 1.5, py: 1.25,
                    bgcolor: isActive ? 'rgba(196,241,53,0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(196,241,53,0.2)' : '1px solid transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': { bgcolor: isActive ? 'rgba(196,241,53,0.14)' : 'rgba(255,255,255,0.03)', color: isActive ? 'primary.main' : 'text.primary' },
                    transition: 'all 0.15s ease',
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 38, '& svg': { fontSize: '1.2rem' } }}>
                    {item.text === 'Профиль' ? <UserAvatar profile={profile} size={22} /> : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: isActive ? 700 : 500, fontSize: '1rem', letterSpacing: '0.04em' }}
                  />
                  {isActive && <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'primary.main', ml: 1 }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* User card + logout */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Tooltip title="Перейти в профиль" placement="top">
          <Box
            onClick={goToProfile}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.5, px: 1, py: 1.25, mb: 1,
              borderRadius: 1.5, bgcolor: '#141928', cursor: 'pointer',
              border: '1px solid rgba(26,34,64,0.8)',
              transition: 'all 0.15s ease',
              '&:hover': { bgcolor: '#1a2240', borderColor: 'rgba(196,241,53,0.2)' },
            }}
          >
            <UserAvatar profile={profile} size={32} />
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', lineHeight: 1.2 }} noWrap>
                {profile.nickname}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                #1 · 145 очков
              </Typography>
            </Box>
            <ProfileIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', flexShrink: 0 }} />
          </Box>
        </Tooltip>
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: 1.5, py: 1, color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'rgba(239,68,68,0.08)' }, transition: 'all 0.15s ease' }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 38, '& svg': { fontSize: '1.1rem' } }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" primaryTypographyProps={{ fontSize: '0.825rem', fontWeight: 500 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar sx={{ minHeight: { xs: 56, md: 60 }, px: { xs: 2, md: 3 } }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1.5, color: 'text.secondary' }}>
              <MenuIcon />
            </IconButton>
          )}
          {isMobile ? (
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <BrandTitle compact />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', letterSpacing: '0.04em', display: 'block', mt: 0.25 }} noWrap>
                {pageTitle}
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mr: 1.5, boxShadow: '0 0 8px rgba(196,241,53,0.6)' }} />
              <Typography variant="h5" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.04em', color: 'text.primary', fontSize: '1.3rem' }}>
                {pageTitle}
              </Typography>
            </>
          )}
          <Box sx={{ flex: 1 }} />
          {/* Desktop: avatar navigates to profile */}
          {!isMobile && (
            <Tooltip title="Мой профиль">
              <Box onClick={goToProfile} sx={{ cursor: 'pointer', transition: 'opacity 0.15s', '&:hover': { opacity: 0.8 } }}>
                <UserAvatar profile={profile} size={34} />
              </Box>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" open
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, pt: { xs: '56px', md: '60px' }, pb: { xs: '80px', md: '24px' }, minHeight: '100vh', overflowX: 'hidden' }}>
        <Outlet />
      </Box>

      {/* Mobile bottom nav */}
      {isMobile && (
        <BottomNavigation
          value={currentNavIndex === -1 ? 0 : currentNavIndex}
          onChange={(_, v) => navigate(navItems[v].path)}
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200 }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.text}
              label={item.text}
              icon={item.text === 'Профиль' ? <UserAvatar profile={profile} size={22} /> : item.icon}
              showLabel
            />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
}
