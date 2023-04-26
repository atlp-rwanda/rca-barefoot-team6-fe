import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import authStore from "../../store/auth.store";
import { formValidate } from "../../utils/validator";
import { CreateUser } from "../../types/services/user.types";
import { EmailChecker } from "../../types/services/user.types";
import { ResetPasswordInfo } from "../../types/services/auth.types";
export default function Reset() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const {mutate, isLoading} = authStore.createPasswordReset();
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
  const [formData, setFormData] = useState<string>(
""
  )

  const handleSubmit = (e: FormEvent)=>{
    e.preventDefault();
    const validateErrors = formValidate(formData);
    setDataErrors(validateErrors);
    if(validateErrors.hasError) return;
    
    const toastId = toast.loading('Sending email...');
    mutate(formData,{
      onSuccess: (_)=>{
        toast.success('Check your email', {
          id: toastId
        })
      },
      onError: (error)=>{
        toast.error(
          // @ts-ignore
          Array.isArray(error?.response?.data) ? error?.response?.data?.error[0]: error?.response?.data?.error 
          || 'Email not registered',
          {
            id: toastId
          }
        )
      }
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    
  
    const validateErrors = formValidate({email: value}, name);
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
    setFormData( value); 
  }

  return (
    <div className="max-w-md px-9 py-4 shadow-formCard rounded-2xl mx-auto my-6">
      <h1
        className="text-3xl font-bold text-center"
      >Request New Password</h1>

      <p className="text-center text-[15px] text-gray-700 my-5">
     Please enter your email
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
    
        <Button type="submit" disabled={
          isLoading || dataErrors.hasError
        }>
          {
            isLoading ? 'Loading...':'Submit'
          }
        </Button>
      </form>
    </div>
  )
}
