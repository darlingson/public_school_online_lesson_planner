import { NextRequest, NextResponse } from 'next/server';

// Helper function to verify JWT with Web Crypto API
async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const data = `${headerB64}.${payloadB64}`;
    const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const importedKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const verification = await crypto.subtle.verify(
      "HMAC",
      importedKey,
      signature,
      encoder.encode(data)
    );

    return verification;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  // Ensure to retrieve the string directly from the cookie
  const token = req.cookies.get('token') || '';  // Default to empty string if undefined

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const isValid = await verifyJWT(token.value, process.env.JWT_SECRET as string);
  if (!isValid) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/lesson-plans/:path*'],
};
