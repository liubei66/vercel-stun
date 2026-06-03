import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function POST(request) {
  try {
    const token = request.headers.get('authorization');
    if (!token || token !== process.env.API_TOKEN) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { key, value } = await request.json();
    if (!key || !value) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const map = await redis.get('stun_map') || {};
    map[key] = value;
    await redis.set('stun_map', map);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
