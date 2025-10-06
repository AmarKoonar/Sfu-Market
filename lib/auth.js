import { SignJWT, jwtVerify } from 'jose';
import Cookies from 'js-cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'sfu-marketplace-secret-key-2024');

export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export function setAuthToken(token) {
  Cookies.set('auth_token', token, { expires: 7 });
}

export function getAuthToken() {
  return Cookies.get('auth_token');
}

export function removeAuthToken() {
  Cookies.remove('auth_token');
}

export async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;
  return await verifyToken(token);
}
