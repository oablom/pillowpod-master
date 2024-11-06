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

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.error();
    }

    return NextResponse.json(listing);
  } catch (error) {
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
    const listing = await prisma.listing.update({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
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

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
