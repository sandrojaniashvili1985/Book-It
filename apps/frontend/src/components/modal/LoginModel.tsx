import axios from "axios";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Modal from "./Model";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import useLoginModel from "../hooks/useLoginModel";
import useRegisterModel from "../hooks/useRegisterModel";
import { useAuthStore } from "@/components/hooks/useAuthStore";

function LoginModel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();
  const [loading, setLoading] = useState(false);

  const { setUser, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      id: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", data, {
        withCredentials: true,
      });
      // console.log("res", res.cookies);

      login(res);
      setUser(res.data);
      toast.success(`welcome ${res.data?.username}`);
      loginModel.onClose();
      navigate("/account/profile");
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading
        title={t("NAV-BAR.User-menu.Login.login")}
        subtitle={t("NAV-BAR.User-menu.Login.subtitle")}
        center
      />

      <Input
        id="email"
        type="email"
        label={t("NAV-BAR.User-menu.Login.email")}
        disabled={loading}
        register={register}
        errors={errors}
        required
        placeholder="Enter your email"
      />
      <Input
        id="password"
        type="password"
        label={t("NAV-BAR.User-menu.Login.password")}
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
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center flex-row items-center gap-2">
          <div>{t("NAV-BAR.User-menu.Login.create-account")}</div>
          <div
            onClick={() => {
              loginModel.onClose();
              registerModel.onOpen();
              navigate("/register");
            }}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {t("NAV-BAR.User-menu.Sign-up.sign-up")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title={t("NAV-BAR.User-menu.Login.login")}
      disabled={loading}
      isOpen={loginModel.isOpen}
      onClose={loginModel.onClose}
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={t("NAV-BAR.User-menu.Login.continue")}
    />
  );
}

export default LoginModel;
