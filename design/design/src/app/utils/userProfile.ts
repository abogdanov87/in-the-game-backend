export type AvatarType = 'color' | 'emoji' | 'photo';

export interface UserProfile {
  nickname: string;
  avatarType: AvatarType;
  avatarColor: string;
  avatarEmoji: string;
  avatarPhoto: string; // server media URL or base64 data URL before save
  favorites: string[];
}

export interface AvatarDisplayProfile {
  nickname: string;
  avatarType: AvatarType;
  avatarColor: string;
  avatarEmoji: string;
  avatarPhoto: string;
}

export interface AvatarUserSource {
  nickname?: string | null;
  username?: string;
  email?: string;
  avatar?: string | null;
  avatar_type?: AvatarType | string | null;
  avatar_color?: string | null;
  avatar_emoji?: string | null;
}

const STORAGE_KEY = 'userProfile';

function normalizeMediaUrl(value?: string | null) {
  if (!value) return null;
  if (/^(https?:|data:|blob:|\/)/.test(value)) return value;
  return `/files/${value}`;
}

export function resolveAvatarProfile(source: AvatarUserSource): AvatarDisplayProfile {
  const nickname = source.nickname?.trim()
    || source.username
    || source.email?.split('@')[0]
    || 'Игрок';
  const serverPhoto = normalizeMediaUrl(source.avatar);

  if (serverPhoto) {
    return {
      nickname,
      avatarType: 'photo',
      avatarColor: source.avatar_color || '#c4f135',
      avatarEmoji: source.avatar_emoji || '⚽',
      avatarPhoto: serverPhoto,
    };
  }

  const color = source.avatar_color || '#c4f135';
  const emoji = source.avatar_emoji || '⚽';

  if (source.avatar_type === 'emoji' && source.avatar_emoji) {
    return {
      nickname,
      avatarType: 'emoji',
      avatarColor: color,
      avatarEmoji: emoji,
      avatarPhoto: '',
    };
  }

  return {
    nickname,
    avatarType: 'color',
    avatarColor: color,
    avatarEmoji: emoji,
    avatarPhoto: '',
  };
}

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

export function mergeUserIntoProfile(user: AvatarUserSource & { nickname?: string; username?: string; email?: string; avatar?: string | null }): UserProfile {
  const current = loadUserProfile();
  const serverPhoto = normalizeMediaUrl(user.avatar) ?? '';

  return {
    ...current,
    nickname: user.nickname?.trim() || user.username || user.email?.split('@')[0] || current.nickname,
    avatarType: (user.avatar_type as AvatarType) || 'color',
    avatarColor: user.avatar_color || DEFAULT_PROFILE.avatarColor,
    avatarEmoji: user.avatar_emoji || DEFAULT_PROFILE.avatarEmoji,
    avatarPhoto: serverPhoto,
  };
}

export function avatarSourceFromProfile(profile: UserProfile): AvatarUserSource {
  return {
    nickname: profile.nickname,
    avatar: profile.avatarPhoto || null,
    avatar_type: profile.avatarType,
    avatar_color: profile.avatarColor,
    avatar_emoji: profile.avatarEmoji,
  };
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

export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}
