import { useState } from 'react';
import { getInitials, getAvatarGradient } from '@/lib/avatar.js';

const SIZE_MAP = {
  xs: 'w-5 h-5 text-[9px]',
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-24 h-24 text-2xl sm:text-3xl',
  '2xl': 'w-32 h-32 text-4xl',
};

export default function UserAvatar({ user, size = 'md', className = '' }) {
  const [imageError, setImageError] = useState(false);

  const avatarUrl = user?.avatar;
  const [prevAvatarUrl, setPrevAvatarUrl] = useState(avatarUrl);
  if (avatarUrl !== prevAvatarUrl) {
    setPrevAvatarUrl(avatarUrl);
    setImageError(false);
  }

  // Hiển thị ảnh khi avatar không phải 'default.jpg' (vd: ảnh Google sau khi đăng nhập)
  const hasAvatarImage = Boolean(
    avatarUrl &&
    avatarUrl !== 'default.jpg' &&
    !imageError
  );

  const sizeClasses = SIZE_MAP[size] || size;
  const initials = user?.initials || getInitials(user?.name, user?.email);
  const gradient = getAvatarGradient(user?.name || user?.email || 'User');

  if (hasAvatarImage) {
    return (
      <img
        src={avatarUrl}
        alt={user?.name || 'User Avatar'}
        className={`${sizeClasses} rounded-full object-cover shrink-0 ${className}`}
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center font-bold tracking-tight text-white select-none shrink-0 bg-gradient-to-br ${gradient} shadow-xs ${className}`}
      title={user?.name || user?.email || 'User'}
      aria-label={user?.name || 'User Avatar'}
    >
      {initials}
    </div>
  );
}
