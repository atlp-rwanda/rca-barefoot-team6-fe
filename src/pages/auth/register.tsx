import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../components/atoms/Button";
import { FacebookLogo, GoogleLogo, PasswordHidden, PasswordShown } from "../../components/atoms/Icon";
import Input from "../../components/atoms/Input";
import authStore from "../../store/auth.store";
import { CreateUser } from "../../types/services/user.types";
import { formValidate } from "../../utils/validator";

export default function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const {mutate, isLoading} = authStore.register();
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
  const [formData, setFormData] = useState<CreateUser>({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  })

  const handleSubmit = (e: FormEvent)=>{
    e.preventDefault();
    const validateErrors = formValidate(formData);
    setDataErrors(validateErrors);
    if(validateErrors.hasError) return;
    
    const toastId = toast.loading('Logging in...');
    mutate(formData,{
      onSuccess: (_)=>{
        toast.success('You have been registered, enjoy!', {
          id: toastId
        })
        navigate('/auth/login');
      },
      onError: (error)=>{
        toast.error(
          // @ts-ignore
          Array.isArray(error?.response?.data) ? error?.response?.data?.error[0]: error?.response?.data?.error 
          || 'Failed to register',
          {
            id: toastId
          }
        )
      }
    });
  }

  const loginWithFacebook = ()=>{
    window.open(`${import.meta.env.VITE_BASE_URL}/users/auth/google`, "_self");
  }

  const loginWithGoogle = ()=>{
    window.open(`${import.meta.env.VITE_BASE_URL}/users/auth/google`, "_self");
  }
  
  const handlePasswordShown = ()=>{
    setIsPasswordShown(!isPasswordShown);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    // check error
    const validateErrors = formValidate({...formData, [name]: value}, name);
    setDataErrors(previousErrors=>{
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
    });
    setFormData({...formData, [name]: value}); 
  }

  return (
    <div className="max-w-md px-9 py-4 shadow-formCard rounded-2xl mx-auto my-6">
      <h1
        className="text-3xl font-bold text-center"
      >Registration</h1>

      <p className="text-center text-[15px] text-gray-700 my-5">
      Let's quickly get you started with the registration.
      Please Fill the inputs and you are all set to go.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          id="email"
          onChange={handleChange}
          error={
            (dataErrors && dataErrors.touched?.email) ? dataErrors.errors?.email:''
          }
        />
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          id="firstName"
          onChange={handleChange}
          error={
            (dataErrors && dataErrors.touched?.firstName) ? dataErrors.errors?.firstName:''
          }
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          id="lastName"
          onChange={handleChange}
          error={
            (dataErrors && dataErrors.touched?.lastName) ? dataErrors.errors?.lastName:''
          }
        />
        <Input
          type={isPasswordShown?"text":"password"}
          placeholder="Your Password"
          name="password"
          id="password"
          onClickIcon={handlePasswordShown}
          icon={isPasswordShown?<PasswordShown/>:<PasswordHidden/>}
          onChange={handleChange}
          error={
            (dataErrors && dataErrors.touched?.password) ? dataErrors.errors?.password:''
          }
        />
        <Button type="submit" disabled={
          isLoading || dataErrors.hasError
        }>
          {
            isLoading ? 'Loading...':'Register'
          }
        </Button>
        <div className="flex items-center justify-between space-x-2">
          <div className="h-[1px] w-auto flex-1 bg-black"></div>
          <p className="text-sm">Or continue with</p>
          <div className="h-[1px] w-auto flex-1 bg-black"></div>
        </div>
        <div className="flex space-x-8">
          <div onClick={loginWithGoogle} className="border-2 cursor-pointer border-black flex items-center flex-1 py-1 rounded-md gap-7">
            <GoogleLogo/>
            Google
          </div>
          <div onClick={loginWithFacebook} className="border-2 cursor-pointer border-black flex items-center flex-1 py-1 rounded-md gap-7">
            <FacebookLogo/>
            Facebook
          </div>
        </div>
        <p className="text-center">Already have an account? <Link to="/auth/login" className="font-bold text-primary">Log in</Link></p>
      </form>
    </div>
  )
}
