import { FormEvent, useState } from "react";
import Input from "../../components/atoms/Input";
import { FacebookLogo, GoogleLogo, PasswordHidden, PasswordShown } from "../../components/atoms/Icon";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Button from "../../components/atoms/Button";
import toast from "react-hot-toast";
import { LoginInfo } from "../../types/services/auth.types";
import { formValidate } from "../../utils/validator";
import authStore from "../../store/auth.store";

export default function Login() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const { mutate, isLoading, data } = authStore.login();

  const navigate = useNavigate();
  const [dataErrors, setDataErrors] = useState<{
    touched: {
      [key: string]: boolean
    },
    errors: {
      [key: string]: string
    },
    hasError: boolean
  }>({
    touched: {},
    errors: {},
    hasError: false
  });
  const [formData, setFormData] = useState<LoginInfo>({
    email: "",
    password: ""
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validateErrors = formValidate(formData);
    setDataErrors(validateErrors);
    if (validateErrors.hasError) return;

    const toastId = toast.loading('Logging in...');
    mutate(formData, {
      onSuccess: (data) => {
        toast.success('You have been registered, enjoy!', {
          id: toastId
        })


        authStore.setToken(data?.data.token) // save token to local storage)
        localStorage.setItem("token", data.data.token);
        console.log("Set Token: ", data?.data.token);

        navigate('/dashboard');
      },
      onError: (error) => {
        toast.error(
          // @ts-ignore
          Array.isArray(error?.response?.data) ? error?.response?.data?.message : error?.response?.data?.message
            || 'Failed to login',
          {
            id: toastId
          }
        )
      }
    });
  }
  const handlePasswordShown = () => {
    setIsPasswordShown(!isPasswordShown);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // check error
    const validateErrors = formValidate({ ...formData, [name]: value });
    // set errors
    setDataErrors(previousErrors => {
      return {
        ...previousErrors,
        touched: {
          ...previousErrors.touched,
          [name]: true
        },
        errors: {
          ...previousErrors.errors,
          [name]: validateErrors.errors[name]
        },
        hasError: validateErrors.hasError
      }
    })
    setFormData({ ...formData, [name]: value });
  }

  const loginWithFacebook = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/users/auth/google`, "_self");
  }

  const loginWithGoogle = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/users/auth/google`, "_self");
  }

  return (
    <div className="max-w-md px-9 py-4 shadow-formCard rounded-2xl mx-auto my-6">
      <h1
        className="text-3xl font-bold text-center"
      >Welcome back</h1>

      <p className="text-center text-[15px] text-gray-700 my-5">
        Nice to see you again</p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          id="email"
          onChange={handleChange}
          error={dataErrors.touched.email && dataErrors.errors.email || ''}
        />
        <Input
          type={isPasswordShown ? "text" : "password"}
          placeholder="Your Password"
          name="password"
          id="password"
          onClickIcon={handlePasswordShown}
          icon={isPasswordShown ? <PasswordShown /> : <PasswordHidden />}
          error={dataErrors.touched.password && dataErrors.errors.password || ''}
          onChange={handleChange}
        />
        <Link to="/auth/forgot-password" className="text-primary text-right font-bold text-sm">Forgot Password?</Link>
        <Button type="submit" disabled={
          isLoading || dataErrors.hasError
        }>
          {
            isLoading ? 'Loading...' : 'Login'
          }
        </Button>
        <div className="flex items-center justify-between space-x-2">
          <div className="h-[1px] w-auto flex-1 bg-black"></div>
          <p className="text-sm">Or continue with</p>
          <div className="h-[1px] w-auto flex-1 bg-black"></div>
        </div>
        <div className="flex space-x-8">
          <div onClick={loginWithGoogle} className="border-2 px-2 cursor-pointer border-black flex items-center flex-1 py-1 rounded-md gap-7">
            <GoogleLogo />
            Google
          </div>
          <div onClick={loginWithFacebook} className="border-2 px-2 cursor-pointer border-black flex items-center flex-1 py-1 rounded-md gap-7">
            <FacebookLogo />
            Facebook
          </div>
        </div>
        <p className="text-center">No account yet?<Link to="/auth/register" className="font-bold text-primary">Register</Link></p>
      </form>
    </div>
  )
}
