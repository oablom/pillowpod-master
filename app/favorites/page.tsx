import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getFavoriteListings from "../actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();
  console.log("Listings:", listings);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites"
          subtitle="You don't have any favorites yet."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
