"use client";

import Modal from "./Modal";
import { categories } from "../navbar/Categories";
import useEditModal from "@/app/hooks/useEditModal";
import { useState, useEffect, useMemo } from "react";
import Heading from "../Heading";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { CountrySelectValue } from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
// import { SafeListing } from "@/app/types"; //removed for deployment
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface EditModalProps {
  id: string;
  onClose: () => void;
}
//onClose removed for deployment
const EditModal: React.FC<EditModalProps> = ({ id }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const editModal = useEditModal();
  const [isLoading, setIsLoading] = useState(false);
  // const [listing, setListing] = useState<SafeListing | null>(null); //removed for deployment
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

  //removed for deployment
  // useEffect(() => {
  //   if (id) {
  //     const fetchListing = async () => {
  //       try {
  //         const response = await axios.get(`/api/listings/${id}`);
  //         setListing(response.data);
  //       } catch (error) {
  //         console.error("Error fetching listing:", error);
  //       }
  //     };
  //     fetchListing();
  //   }
  // }, [id]);

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  // const price = watch("price"); //never used

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/listings/${id}`)
        .then((response) => {
          const data = response.data;
          setValue("category", data.category);
          setValue("location", data.location);
          setValue("guestCount", data.guestCount);
          setValue("roomCount", data.roomCount);
          setValue("bathroomCount", data.bathroomCount);
          setValue("imageSrc", data.imageSrc);
          setValue("price", data.price);
          setValue("description", data.description);
          setValue("title", data.title);
        })
        .catch(() => {
          toast.error("Could not fetch listing data.");
        });
    }
  }, [id, setValue]);

  const setCustomValue = (
    id: string,
    value: string | number | boolean | CountrySelectValue | null | undefined
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((step) => step - 1);
  const onNext = () => setStep((step) => step + 1);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) return onNext();
    setIsLoading(true);

    const updatedData = {
      ...data,
      price: parseInt(data.price, 10),
      locationValue: data.location?.value,
    };
    console.log(updatedData);

    axios
      .put(`/api/listings/${id}`, updatedData)
      .then(() => {
        toast.success("Listing updated successfully!");
        editModal.onClose();
        reset();
        setStep(STEPS.CATEGORY);
        router.refresh();
      })
      .catch(() => {
        toast.error("An error occurred while updating the listing.");
      })
      .finally(() => setIsLoading(false));
  };

  const actionLabel = useMemo(
    () => (step === STEPS.PRICE ? "Save Changes" : "Next"),
    [step]
  );
  const secondaryActionLabel = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : "Back"),
    [step]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
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
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Basic information"
          subtitle="Set the target number of guests, rooms, and bathrooms"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms does your place offer?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms are available?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Upload images" subtitle="Show off your place!" />
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
        <Heading title="Set your price" subtitle="How much per night?" />
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
      isOpen={editModal.isOpen}
      title="Edit your listing"
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default EditModal;
