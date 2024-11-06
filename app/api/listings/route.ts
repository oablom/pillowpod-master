import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const {
      title,
      description,
      price,
      guestCount,
      roomCount,
      bathroomCount,
      location,
      category,
      imageSrc,
    } = body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        guestCount,
        roomCount,
        bathroomCount,
        locationValue: location.value || "",
        category,
        imageSrc,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
