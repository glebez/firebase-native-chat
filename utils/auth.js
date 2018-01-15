export function normaliseEmail(email) {
  if (!email || typeof email !== "string") return;
  const [head, tail] = email.toLowerCase().trim().split('@');
  const cleanHead = head.split('.').join('');
  return `${cleanHead}@${tail}`;
}
