import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import useRegisterModel from "../hooks/useRegisterModel";
import useLoginModel from "../hooks/useLoginModel";
import Modal from "./Model";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";

function RegisterModel() {
  const { t } = useTranslation();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", data);
      toast.success(res.data.massage);
      loginModel.onClose();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={t("NAV-BAR.User-menu.Sign-up.title")}
        subtitle={t("NAV-BAR.User-menu.Sign-up.subtitle")}
        center
      />

      <Input
        id="username"
        type="text"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
        placeholder="Enter your name"
      />
      <Input
        id="email"
        type="email"
        label={t("NAV-BAR.User-menu.Sign-up.email")}
        disabled={loading}
        register={register}
        errors={errors}
        required
        placeholder="Enter your email"
      />
      <Input
        id="password"
        type="password"
        label={t("NAV-BAR.User-menu.Sign-up.password")}
        disabled={loading}
        register={register}
        errors={errors}
        required
        placeholder="Enter your password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        outline
        label={t("NAV-BAR.User-menu.Sign-up.continue-google")}
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label={t("NAV-BAR.User-menu.Sign-up.continue-github")}
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center flex-row items-center gap-2">
          <div>{t("NAV-BAR.User-menu.Sign-up.already-have-account")}</div>
          <div
            onClick={() => {
              registerModel.onClose();
              loginModel.onOpen();
              navigate("/login");
            }}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {t("NAV-BAR.User-menu.Login.login")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={registerModel.isOpen}
      onClose={registerModel.onClose}
      title={t("NAV-BAR.User-menu.Sign-up.registration")}
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      relative="relative top-20"
    />
  );
}

export default RegisterModel;
