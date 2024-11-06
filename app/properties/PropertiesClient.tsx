"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import useEditModal from "@/app/hooks/useEditModal";
import EditModal from "../components/modals/EditModal"; // Import EditModal here

interface TripsClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<TripsClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const editModal = useEditModal();
  const [deletingId, setDeletingId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null); // State to store the editing ID

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to cancel listing");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onEdit = useCallback(
    (listingId: string) => {
      setEditingId(listingId);
      editModal.onOpen();
    },
    [editModal]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="All the properties you've listed" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            onEdit={() => onEdit(listing.id)} // Pass `listing.id` to onEdit
            disabled={deletingId === listing.id}
            actionLabel="Delete listing"
            editLabel="Edit listing"
            currentUser={currentUser}
          />
        ))}
      </div>

      {/* Render EditModal with the selected editingId */}
      {editModal.isOpen && editingId && (
        <EditModal
          id={editingId}
          onClose={() => {
            editModal.onClose();
            setEditingId(null);
          }}
        />
      )}
    </Container>
  );
};

export default PropertiesClient;
