import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '../../../(lib)/mongodb';
import User from '../../../(models)/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// export async function POST(req: NextRequest) {
//   await dbConnect();

//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     return NextResponse.json({ message: 'User not found' }, { status: 400 });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
//   }

//   const token = jwt.sign(
//     { userId: user._id, email: user.email },
//     process.env.JWT_SECRET as string,
//     { expiresIn: '1h' }
//   );

//   const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

//   // Set the token in a cookie
//   response.cookies.set('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 3600,
//     path: '/',
//   });

//   return response;
// }

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

  // Set the token in a cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

  return response;
}