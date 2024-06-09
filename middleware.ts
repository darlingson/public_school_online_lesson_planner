import { NextRequest, NextResponse } from 'next/server';

// Helper function to verify JWT with Web Crypto API
// async function verifyJWT(token: string, secret: string): Promise<boolean> {
//   try {
//     const [headerB64, payloadB64, signatureB64] = token.split('.');
//     const data = `${headerB64}.${payloadB64}`;
//     const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));

//     const encoder = new TextEncoder();
//     const keyData = encoder.encode(secret);
//     const importedKey = await crypto.subtle.importKey(
//       "raw",
//       keyData,
//       { name: "HMAC", hash: "SHA-256" },
//       false,
//       ["verify"]
//     );

//     const verification = await crypto.subtle.verify(
//       "HMAC",
//       importedKey,
//       signature,
//       encoder.encode(data)
//     );

//     return verification;
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return false;
//   }
// }

// export async function middleware(req: NextRequest) {
//   // Ensure to retrieve the string directly from the cookie
//   const token = req.cookies.get('token') || '';  // Default to empty string if undefined

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   const isValid = await verifyJWT(token.value, process.env.JWT_SECRET as string);
//   if (!isValid) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/lesson-plans/:path*'],
// };

async function verifyJWT(token: string, secret: string): Promise<{ email: string, userId: string } | null> {
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

    if (!verification) {
      return null;
    }

    const payload = JSON.parse(atob(payloadB64));
    return { email: payload.email, userId: payload.userId };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function middleware(req: NextRequest) {

  console.log(`middleware hit by ${req.nextUrl.pathname}`)

  const token = req.cookies.get('token')?.value || '';

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const payload = await verifyJWT(token, process.env.JWT_SECRET as string);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Attach the email to the request
  req.headers.set('user-email', payload.email);
  console.log(req.headers.get('user-email'));
  // return NextResponse.next();
  const response = NextResponse.next();
  response.headers.set('user-email', payload.email);
  return response;
}

export const config = {
  matcher: [
    '/lesson-plans/:path*',
    '/schemes/:path*',
    '/api/lessonplans/:path*',
    "/api/lessonplans",
    "/api/schemes",
  ],
};
