import Scheme from '@/app/(models)/Scheme';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const userEmail = request.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
    }
  try {
    const scheme = await Scheme.findById(params.id);
    if (!scheme) {
      return NextResponse.json({ message: 'Scheme not found' }, { status: 404 });
    }
    return NextResponse.json(scheme);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to get scheme' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedScheme = await Scheme.findOneAndUpdate({ _id: params.id }, body, { new: true });
    if (!updatedScheme) {
      return NextResponse.json({ message: 'Scheme not found' }, { status: 404 });
    }
    return NextResponse.json(updatedScheme);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update scheme' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletedScheme = await Scheme.findByIdAndDelete(params.id);
    if (!deletedScheme) {
      return NextResponse.json({ message: 'Scheme not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete scheme' }, { status: 500 });
  }
}
