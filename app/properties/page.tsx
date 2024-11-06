import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You need to be logged in to view your trips"
          subtitle="Please log in first"
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="You don't have any properties listed."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />{" "}
    </ClientOnly>
  );
};

export default PropertiesPage;
