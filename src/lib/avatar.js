/**
 * Lấy 2 ký tự đầu viết in hoa cho avatar người dùng:
 * - Nếu tên có từ 2 từ trở lên (vd: "Nguyễn Văn", "John Doe"): lấy chữ cái đầu của 2 từ đầu -> "NV", "JD"
 * - Nếu tên chỉ có 1 từ (vd: "Admin", "Nam", "User"): lấy 2 chữ cái đầu -> "AD", "NA", "US"
 * - Nếu chỉ có 1 ký tự (vd: "A"): trả về chữ cái in hoa -> "A"
 * - Dự phòng email hoặc 'US' nếu không có tên
 */
export function getInitials(name, email) {
  const source = (name && name.trim()) || (email && email.split('@')[0].trim()) || 'US';
  const clean = source.replace(/^[^\p{L}\p{N}]+/u, '');
  const words = clean.split(/[\s\-_.]+/).filter(Boolean);

  if (words.length >= 2) {
    const first = Array.from(words[0])[0] || '';
    const second = Array.from(words[1])[0] || '';
    return (first + second).toUpperCase();
  }

  const chars = Array.from(clean);
  if (chars.length >= 2) {
    return (chars[0] + chars[1]).toUpperCase();
  }
  return (chars[0] || 'U').toUpperCase();
}

export const AVATAR_GRADIENTS = [
  'from-blue-600 to-indigo-600',
  'from-indigo-600 to-purple-600',
  'from-violet-600 to-fuchsia-600',
  'from-emerald-600 to-teal-600',
  'from-cyan-600 to-blue-600',
  'from-rose-600 to-pink-600',
  'from-amber-500 to-orange-600',
];

export function getAvatarGradient(key) {
  if (!key) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}
