export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error();
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.error();
    }

    if (listing.userId !== currentUser.id && !currentUser.isAdmin) {
      return NextResponse.error();
    }

    return NextResponse.json(listing);
  } catch {
    return NextResponse.error();
  }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, statusText: "Unauthorized" }
    );
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json(
      { error: "Invalid listingId" },
      { status: 400, statusText: "Invalid listingId" }
    );
  }

  const body = await request.json();
  const {
    title,
    description,
    category,
    guestCount,
    roomCount,
    bathroomCount,
    price,
    imageSrc,
    locationValue,
  } = body;

  try {
    const whereCondition = currentUser.isAdmin
      ? { id: listingId }
      : { id: listingId, userId: currentUser.id };

    const listing = await prisma.listing.update({
      where: whereCondition,

      data: {
        title,
        description,
        category,
        guestCount,
        roomCount,
        bathroomCount,
        price,
        imageSrc,
        locationValue,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Failed to update listing:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, statusText: "Server error" }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId");
  }

  try {
    const whereCondition = currentUser.isAdmin
      ? { id: listingId }
      : { id: listingId, userId: currentUser.id };

    const listing = await prisma.listing.deleteMany({
      where: whereCondition,
    });

    if (!listing.count) {
      return NextResponse.json(
        { error: "No permission to delete this listing" },
        { status: 403 }
      );
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Failed to delete listing:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, statusText: "Server error" }
    );
  }
}
