"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import useRegisterModal from "../../hooks/useRegisterModal";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "../../hooks/useLoginModal";

import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        // loginModal.onOpen();
        toast.success("Registration successful!"); // Bekräftelsemeddelande
        signIn("credentials", { email: data.email, password: data.password });
        // setIsLoading(false);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "An error occurred"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to PillowPod" subtitle="A restful place" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="flex justify-center flex-row items-center gap-2">
        <div className="">Already have an account?</div>
        <div
          onClick={toggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Log in
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default RegisterModal;
