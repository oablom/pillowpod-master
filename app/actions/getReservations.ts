import prisma from "@/app/libs/prismadb";
import { console } from "inspector";
import { ObjectId } from "mongodb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    console.log("Listing ID i getReservations:", listingId);
    console.log("Listing ID:", listingId, "Type:", typeof listingId);

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

//Below is the code that removes the error message but it's still not working correctly

// import prisma from "@/app/libs/prismadb";
// import { ObjectId } from "mongodb";

// interface IParams {
//   listingId?: string;
//   userId?: string;
//   authorId?: string;
// }

// let isFetching = false;

// export default async function getReservations(params: IParams) {
//   if (isFetching) {
//     console.log("Data hämtas redan, avbryter nytt anrop.");
//     return;
//   }

//   isFetching = true;

//   try {
//     const { listingId, userId, authorId } = params;

//     console.log("Listing ID i getReservations:", listingId);
//     console.log("Listing ID:", listingId, "Type:", typeof listingId);

//     const query: any = {};

//     // Kontrollera om listingId är en giltig 24-teckens sträng innan omvandling
//     if (listingId && typeof listingId === "string" && listingId.length === 24) {
//       query.listingId = new ObjectId(listingId);
//     }

//     if (userId) {
//       query.userId = userId;
//     }

//     if (authorId) {
//       query.listing = { userId: authorId };
//     }

//     const reservations = await prisma.reservation.findMany({
//       where: query,
//       include: {
//         listing: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     const safeReservations = reservations.map((reservation) => ({
//       ...reservation,
//       createdAt: reservation.createdAt.toISOString(),
//       startDate: reservation.startDate.toISOString(),
//       endDate: reservation.endDate.toISOString(),
//       listing: {
//         ...reservation.listing,
//         createdAt: reservation.listing.createdAt.toISOString(),
//       },
//     }));

//     return safeReservations;
//   } catch (error: any) {
//     console.error("Fel i getReservations:", error); // Lägg till loggning för felsökning
//     throw new Error(error);
//   } finally {
//     isFetching = false;
//   }
// }
