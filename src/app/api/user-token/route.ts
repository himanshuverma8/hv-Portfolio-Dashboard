import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import UserToken from '@/model/UserToken';
import UniqueViews from '@/model/UniqueViews';

connect();

// POST - Handle user token and IP saving
export async function POST(request: Request) {
  try {
    const { userId, ip, locationData } = await request.json();

    if (!userId || !ip) {
      return NextResponse.json(
        { success: false, error: 'userId and ip are required' },
        { status: 400 }
      );
    }

    // Check if user token already exists in database
    let existingUser = await UserToken.findOne({ userId });
    
    if (existingUser) {
      // User exists - update last visit and visit count
      existingUser.lastVisit = new Date();
      existingUser.visitCount += 1;
      existingUser.ip = ip; // Update IP in case it changed
      
      // Update location data if provided
      if (locationData) {
        Object.assign(existingUser, locationData);
      }
      
      await existingUser.save();
      
      return NextResponse.json({
        success: true,
        data: existingUser,
        message: 'User visit updated'
      });
    } else {
      // New user - create new token record
      const newUser = await UserToken.create({
        userId,
        ip,
        ...locationData,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1
      });

      // Also save to UniqueViews for backward compatibility
      await UniqueViews.create({
        userId,
        ip,
        ...locationData
      });

      return NextResponse.json({
        success: true,
        data: newUser,
        message: 'New user created'
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process user token' },
      { status: 500 }
    );
  }
}

// GET - Check if user token exists
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    const user = await UserToken.findOne({ userId });
    
    return NextResponse.json({
      success: true,
      exists: !!user,
      data: user
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to check user token' },
      { status: 500 }
    );
  }
}
