// interface ILoginProps {

import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../Auth/AuthContext";
import InputErrorMessage from "../Components/Error/InputErrorMessage";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import type { IErrorResponse, ILoginProps } from "../interface";
import { LOGIN_FORM } from "../Data";
import { useState } from "react";
import axiosInstance from "../Config/Axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

// }

const Login = () => {
  const { login } = useAuth();
  const [IsLoading ,setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginProps>();

    // ** Handlers
  const onSubmit: SubmitHandler<ILoginProps> = async data => {
    setIsLoading(true);

    try {
      // ** 2 - Fulfilled => SUCCESS => (OPTIONAL)
      const { status, data: resData } = await axiosInstance.post("/auth/local", data);
      console.log(resData);
      if (status === 200) {
        toast.success("You will navigate to the home page after 2 seconds!", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });

        login(resData);
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      // ** 3 - Rejected  => Field => (OPTIONAL)
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto h-max">
      
      {LOGIN_FORM.map(({name, placeholder, type,validation},idx) => (
            <div key={idx} className="mb-4">
        <label>{name}</label>
        <Input
          placeholder={placeholder}
          type={type}
          {...register(name, validation)}
          
        />
  {errors[name] && (
  <InputErrorMessage msg={errors[name]?.message as string } />
)}

      </div>
      ))}
  

    

      <Button
        fullWidth
        isLoading={IsLoading}
        type="submit">

        Login
      </Button>

  
    </form>
    </>
  );
};

export default Login;