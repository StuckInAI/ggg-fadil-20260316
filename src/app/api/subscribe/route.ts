import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Subscriber } from '@/lib/entities/Subscriber';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as { email?: string };

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const dataSource = await getDataSource();
    const subscriberRepo = dataSource.getRepository(Subscriber);

    const existing = await subscriberRepo.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed.' },
        { status: 409 }
      );
    }

    const subscriber = subscriberRepo.create({
      email: email.trim().toLowerCase(),
    });
    await subscriberRepo.save(subscriber);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
