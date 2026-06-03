import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const validUser = process.env.ADMIN_USER;
    const validPwd = process.env.ADMIN_PWD;

    if (username === validUser && password === validPwd) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
