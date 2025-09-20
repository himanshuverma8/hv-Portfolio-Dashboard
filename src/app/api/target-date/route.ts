import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import TargetDate from '@/model/TargetDate';

// GET - Fetch target date from database
export async function GET() {
  try {
    await connect();
    
    let targetDateDoc = await TargetDate.findOne({ isActive: true });
    
    // If no target date exists, create a default one
    if (!targetDateDoc) {
      targetDateDoc = await TargetDate.create({
        targetDate: "1 May 2026",
        description: "Default target countdown date",
        isActive: true
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        targetDate: targetDateDoc.targetDate,
        description: targetDateDoc.description,
        isActive: targetDateDoc.isActive
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch target date' },
      { status: 500 }
    );
  }
}
