import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
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

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no trips"
          subtitle="Go ahead and book a trip!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />{" "}
    </ClientOnly>
  );
};

export default TripsPage;
