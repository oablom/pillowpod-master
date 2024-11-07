"use client";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disableDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disableDates,
}) => {
  return (
    <div
      className="
        bg-white dark:bg-neutral-800 rounded-xl border-[1px] border-neutral-200 dark:border-neutral-700 overflow-hidden min-w-[350px] shadow-lg
      "
    >
      <div className="flex flex-row justify-center items-center gap-1 p-4">
        <div className="text-2xl font-semibold text-black dark:text-white">
          $ {price}
        </div>
        <div className="font-light text-neutral-500 dark:text-neutral-200">
          / night
        </div>
      </div>
      <hr className="border-neutral-200 dark:border-neutral-700" />
      <Calendar
        value={dateRange}
        disableDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr className="border-neutral-200 dark:border-neutral-700" />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div className="text-black dark:text-white">Total</div>
        <div className="text-black dark:text-white">$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
