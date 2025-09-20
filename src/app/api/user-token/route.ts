import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import UserToken from '@/model/UserToken';
import UniqueViews from '@/model/UniqueViews';

connect();

// POST - Handle user token saving (IP handled separately)
export async function POST(request: Request) {
  try {
    const { userId, locationData } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    // Check if user token already exists in database
    let existingUser = await UserToken.findOne({ userId });
    
    if (existingUser) {
      // User exists - update last visit and visit count
      existingUser.lastVisit = new Date();
      existingUser.visitCount += 1;
      
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
      // New user - create new token record (without IP)
      const newUser = await UserToken.create({
        userId,
        ...locationData,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1
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
    console.log(userId);

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
