export const dynamic = "force-dynamic";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components//listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listings found"
          subtitle="Looks like there are no listings available."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8 
        z-10
    "
        >
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}{" "}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
