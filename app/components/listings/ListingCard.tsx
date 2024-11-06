"use client";

import { useRouter } from "next/navigation";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  onEdit?: () => void;
  disabled?: boolean;
  actionLabel?: string;
  editLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onEdit,
  disabled,
  actionLabel,
  editLabel = "Edit",
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEdit?.();
    },
    [onEdit]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser ?? null}
            />
          </div>
        </div>
        <div className="font-semibold text-lg text-gray-800 dark:text-white">
          {data.title}{" "}
          {location ? `(${location.region}, ${location.label})` : ""}
        </div>
        <div className="text-sm text-neutral-500 dark:text-gray-400 mb-1 max-h-[1.2em] overflow-hidden text-ellipsis whitespace-nowrap transition-all group-hover:max-h-full group-hover:overflow-visible group-hover:whitespace-normal">
          {data.description}
        </div>
        <div className="font-light text-neutral-500 dark:text-gray-400">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">/ night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}

        {onEdit && (
          <Button
            disabled={disabled}
            small
            label={editLabel}
            onClick={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
