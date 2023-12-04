import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { getFromSS } from "../../utils/getFromSS";
import { useDebounce } from "../../hooks/useDebounce";
import authService from "../../services/auth";
import { useUser } from "../../stores/user";
import { api } from "../../http/api";
import Stepper from "components/UI/Stepper";
import RegisterFormFirstStep from "components/business/RegisterForm/FirstStep";
import RegisterFormSecondStep from "components/business/RegisterForm/SecondStep";
import { AxiosError } from "axios";

import * as Styled from "./Register.styled";

export type RegisterInputs = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  images: any[];
  description: string;
};

function RegisterPage() {
  const setUser = useUser((state) => state.setUser);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<RegisterInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const [activeStep, setActiveStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const username = useDebounce(watch("username"));
  const duckDescription = useDebounce(watch("description"));

  const initStorage = () => {
    sessionStorage.setItem(
      "registerFormData",
      JSON.stringify({
        username: "",
        duckDescription: "",
      })
    );
  };

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const images = data.images.reduce((acc, image, index) => {
      if (image.value[0]) {
        const key = `image${index + 1}`;
        return { ...acc, [key]: image.value[0] };
      }
      return acc;
    }, {});
    // @ts-ignore
    delete data.images;

    try {
      setError("");
      setIsSending(true);
      const res = await authService.register({ ...data, ...images });
      localStorage.setItem("accessToken", res.accessToken);
      api.defaults.headers["Access-Token"] = `Bearer ${res.accessToken}`;
      setUser(res.user);
      reset();
      initStorage();
    } catch (err: any) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data.message || "Failed to register");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const registerFormData = getFromSS<{
      username: string;
      duckDescription: string;
    }>("registerFormData");
    if (registerFormData !== null) {
      setValue("username", registerFormData.username);
      setValue("description", registerFormData.duckDescription);
    } else {
      initStorage();
    }

    append("");
  }, []);

  useEffect(() => {
    if (
      typeof username === "undefined" ||
      typeof duckDescription === "undefined"
    ) {
      return;
    }
    const registerFormData = getFromSS<{
      username: string;
      duckDescription: string;
    }>("registerFormData");
    if (registerFormData === null) {
      return;
    }
    if (
      registerFormData.username === username &&
      registerFormData.duckDescription === duckDescription
    ) {
      return;
    }
    sessionStorage.setItem(
      "registerFormData",
      JSON.stringify({
        username,
        duckDescription,
      })
    );
  }, [username, duckDescription]);

  return (
    <Layout>
      <Styled.Wrapper>
        <div style={{ maxWidth: 370, width: "100%" }}>
          <Styled.Title>Registration</Styled.Title>
          <Stepper
            activeStep={activeStep}
            steps={2}
            onStepClick={(step) => setActiveStep(step)}
          />
          <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <RegisterFormFirstStep
              activeStep={activeStep}
              register={register}
              errors={errors}
              watch={watch}
              setActiveStep={setActiveStep}
            />
            <RegisterFormSecondStep
              activeStep={activeStep}
              register={register}
              fields={fields}
              errors={errors}
              remove={remove}
              submitButtonDisabled={isSending}
              setActiveStep={setActiveStep}
            />
          </Form>
          {error && (
            <Styled.Error className="text-danger">{error}</Styled.Error>
          )}
        </div>
      </Styled.Wrapper>
    </Layout>
  );
}

export default RegisterPage;
