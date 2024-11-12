import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// Hämta sessionen och använd den för att få användardata
export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null; // Om ingen session finns, returnera null
  }
  return session;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) {
      return null; // Om session är null, returnera null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // Format och returnera användardata
    return {
      ...currentUser,
      isAdmin: currentUser.isAdmin,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("Failed to fetch user");
  }
}
