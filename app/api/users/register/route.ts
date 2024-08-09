import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      savedUser,
      success: true
    });

  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
