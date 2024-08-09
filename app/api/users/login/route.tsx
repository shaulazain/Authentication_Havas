import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from "@/models/userModel";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return new Response('Invalid password', { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECERET!, { expiresIn: '1h' });

        const response = NextResponse.json({
            success: true,
            message: 'Logged in successfully',
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.error('Error in login API:', error);  // Log the error to the console
        return new Response(error.message, { status: 500 });
    }
}
