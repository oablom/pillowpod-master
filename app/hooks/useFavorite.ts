import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser: SafeUser | null;
}

const UseFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Favorites updated");
      } catch (error) {
        toast.error("An error occurred while updating favorites");
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  );

  return { hasFavorite, toggleFavorite };
};

export default UseFavorite;
