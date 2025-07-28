import {  useForm, type SubmitHandler } from "react-hook-form";
import type { IErrorResponse, IRegisterProps } from "../interface";
import Input from "../Components/UI/Input";
import { useState } from "react";
import { imageUrl, REGISTER_FORM } from "../Data";
import InputErrorMessage from "../Components/Error/InputErrorMessage";
import Button from "../Components/UI/Button";
import axiosInstance from "../Config/Axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {  Link, useNavigate } from "react-router-dom";
import Label from "../Components/UI/Label";

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
    <div className="flex w-full h-screen overflow-hidden">
        <div className="w-full hidden md:inline-block">
          <img
            className="h-full"
            src={imageUrl}
            alt="leftSideImage"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium">Register</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          <button
            type="button"
            className="w-96 mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 max-w-md mx-auto h-max"
          >
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>
            {REGISTER_FORM.map(({ name, labelName, placeholder, type, validation }, idx) => (
              <div key={idx} className="mb-4 space-y-2">
                <Label>{labelName}</Label>
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

            <Button fullWidth isLoading={IsLoading} type="submit"
                    className="h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              Sign up
            </Button>
            <p className="text-sm text-gray-500/90 mt-3">
              Do have an account?{" "}
              <Link
                to="/Login"
                className="text-indigo-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
  );
};

export default Register;
