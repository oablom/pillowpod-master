import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite places" />
      <div className="mt-10 grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
