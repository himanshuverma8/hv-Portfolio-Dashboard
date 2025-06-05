import { NextResponse } from "next/server";
import { LinkedInProfile } from "@/model/LinkedInProfileSchema";
import { connect } from "@/dbConfig/dbConfig";
export async function GET() {
    try {
         await connect();
         const user = await LinkedInProfile.findOne({ username: "himanshu_ver" }).lean();
         if(!user){
            return NextResponse.json({error: "user not found"}, {status:404});
         }
         return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
