export const dynamic = "force-dynamic";

import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password, isAdmin = false, phoneNumber = null } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      isAdmin,
      phoneNumber,
    },
  });

  return NextResponse.json(user);
}
