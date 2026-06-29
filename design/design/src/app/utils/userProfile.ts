export type AvatarType = 'color' | 'emoji' | 'photo';

export interface UserProfile {
  nickname: string;
  avatarType: AvatarType;
  avatarColor: string;
  avatarEmoji: string;
  avatarPhoto: string; // base64 data URL
  favorites: string[];
}

const STORAGE_KEY = 'userProfile';

export const DEFAULT_PROFILE: UserProfile = {
  nickname: 'Игрок',
  avatarType: 'color',
  avatarColor: '#c4f135',
  avatarEmoji: '⚽',
  avatarPhoto: '',
  favorites: ['Спартак', 'Краснодар'],
};

export function loadUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('userProfileUpdated'));
  } catch {}
}

export function mergeUserIntoProfile(user: { nickname?: string; username?: string; email?: string; avatar?: string | null }): UserProfile {
  const current = loadUserProfile();
  const fallbackName = user.nickname || user.username || user.email?.split('@')[0] || current.nickname;
  const updated = {
    ...current,
    nickname: current.nickname === DEFAULT_PROFILE.nickname ? fallbackName : current.nickname,
    avatarPhoto: current.avatarPhoto || user.avatar || '',
  };
  saveUserProfile(updated);
  return updated;
}

/** Resize and center-crop an image File to a square base64 JPEG */
export function resizeImage(file: File, maxPx = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height, maxPx);
        const canvas = document.createElement('canvas');
        canvas.width = side;
        canvas.height = side;
        const ctx = canvas.getContext('2d')!;
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}
