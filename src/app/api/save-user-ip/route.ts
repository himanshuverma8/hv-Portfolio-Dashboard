import { NextRequest, NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";
import axios from 'axios';

await connect();

const IP_API_URL = "https://ipinfo.io";
const API_KEY = process.env.iptoken;

export async function POST(req: NextRequest) {
    try {
        const { ip } = await req.json();
        const ipResponse = await axios.get(`${IP_API_URL}/${ip}/json?token=${API_KEY}`);
        const ipData = ipResponse.data;

        if (ipData.error) {
            return NextResponse.json({ error: "Failed to fetch IP details" }, { status: 400 });
        }

        const ipDetails = {
            ip,
            city: ipData.city || null,
            region: ipData.region || null,
            country: ipData.country || null,
            loc: ipData.loc || null,
            organization: ipData.org || null,
            hostname: ipData.hostname || null,
            timezone: ipData.timezone || null,
        };

        const existingUser = await UniqueViews.findOne({ ip });

        if (!existingUser) {
            const newUser = new UniqueViews(ipDetails);
            await newUser.save();
        }

        return NextResponse.json({ message: "IP details saved successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
