"use client";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState, useEffect, use } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { title } from "process";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// const Map = dynamic(() => import("../Map"), { ssr: false });

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      description: "",
      title: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const price = watch("price");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((step) => step - 1);
  };

  const onNext = () => {
    setStep((step) => step + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully!");
        console.log("Listing created successfully!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("An error occurred while creating the listing");
        console.error("An error occurred while creating the listing");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    } else {
      return "Next";
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="gird grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue(`location`, value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Basic information about the accommodation"
          subtitle="Set the target number of guests, rooms and bathrooms"
        />
        <Counter
          title="Number of guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms does the accommodation provide?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms does the accommodation provide?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload images of your place"
          subtitle="Show off your place!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Describe your place" subtitle="Short and sweet!" />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set the price for your place"
          subtitle="How much does it cost per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Rent away your pod"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
