"use client";
// import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { use, useCallback, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import Heading from "../Heading";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((response) => {
      setIsLoading(false);

      if (response?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        loginModal.onClose();
      }
      if (response?.error) {
        toast.error(response.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back!" subtitle="Login to your account" center />
      <Input
        id="email"
        label="Email"
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
        <div className="">First time using PillowPod?</div>
        <div
          onClick={toggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Register
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default LoginModal;
