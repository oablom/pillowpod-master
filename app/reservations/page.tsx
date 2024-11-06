import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import ReservationsClient from "../reservations/ReservationsClient";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You need to be logged in to view this page."
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations"
          subtitle="You don't have any reservations on your properties yet."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
