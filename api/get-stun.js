import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET() {
  try {
    const data = await redis.get('stun_map') || {};
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
