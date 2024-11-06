import { create } from "zustand";

interface RentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Rent modal opened");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("Rent modal closed");
    set({ isOpen: false });
  },
}));

export default useRentModal;
