import {  useForm, type SubmitHandler } from "react-hook-form";
import type { IErrorResponse, IRegisterProps } from "../interface";
import Input from "../Components/UI/Input";
import { useState } from "react";
import { REGISTER_FORM } from "../Data";
import InputErrorMessage from "../Components/Error/InputErrorMessage";
import Button from "../Components/UI/Button";
import axiosInstance from "../Config/Axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {  useNavigate } from "react-router-dom";

const Register = () => {
  
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterProps>();


  const onSubmit:SubmitHandler<IRegisterProps> = async (data: IRegisterProps) => {
    setIsLoading(true);
  try {
      // ** 2 - Fulfilled => SUCCESS => (OPTIONAL)
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("You will navigate to the login page after 2 seconds to login!", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      // ** 3 - Rejected  => Field => (OPTIONAL)
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto h-max"
    >
      {REGISTER_FORM.map(({ name, placeholder, type, validation }, idx) => (
        <div key={idx} className="mb-4">
          <label>{name}</label>
          <Input
            placeholder={placeholder}
            type={type}
            {...register(name, validation)}
          />
          {errors[name] && (
            <InputErrorMessage msg={errors[name]?.message as string} />
          )}
        </div>
      ))}

      <Button 
        fullWidth
        isLoading={IsLoading}
      type="submit">Register</Button>
    </form>
  );
};

export default Register;
