import { NextRequest, NextResponse } from 'next/server';
import { getUserFromPrivyToken } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 400 });
    }

    const user = await getUserFromPrivyToken(token);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
