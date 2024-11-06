import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  console.log("Listing ID:", params.listingId);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  if (listing) {
    return (
      <ClientOnly>
        <ListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  }
};

export default ListingPage;
