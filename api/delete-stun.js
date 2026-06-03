import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

redis = Redis.fromEnv();

export async function POST(request) {
  try {
    const token = request.headers.get('authorization');
    if (!token || token !== process.env.API_TOKEN) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { key } = await request.json();
    if (!key) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const map = await redis.get('stun_map') || {};
    delete map[key];
    await redis.set('stun_map', map);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
