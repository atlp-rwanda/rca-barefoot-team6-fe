import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../components/atoms/Button";
import { FacebookLogo, GoogleLogo, PasswordHidden, PasswordShown } from "../../components/atoms/Icon";
import Input from "../../components/atoms/Input";
import authStore from "../../store/auth.store";
import { CreateUser } from "../../types/services/user.types";
import { formValidate } from "../../utils/validator";
import { ResetPasswordInfo } from "../../types/services/auth.types";

export default function NewPassword() {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const {mutate, isLoading} = authStore.resetPassword();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
const token=params.get("token");
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
  const [formData, setFormData] = useState<ResetPasswordInfo>({
    password:"",
    repeatPassword:"",
    token:""
  })

  const handleSubmit = (e: FormEvent)=>{
    // setter
    e.preventDefault();
  
    const toastId ="hello"
   setter();
  if(formData.password!==formData.repeatPassword){
    return toast.error('Password not matching',{id:toastId})
  }  
    
   
    mutate(formData,{
      onSuccess: (_)=>{
        toast.success('password updated', {
          id: toastId
        })
        navigate('/auth/login');
      },
      onError: (error)=>{
        toast.error(
          // @ts-ignore
          Array.isArray(error?.response?.data) ? error?.response?.data?.error[0]: error?.response?.data?.error 
          || 'Failed to change password',
          {
            id: toastId
          }
        )
      }
    });
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
 const setter=()=>{
  const pass=formData.password;
  const newPass=formData.repeatPassword;
  setFormData({password:pass,repeatPassword:newPass,token:token})
   console.log(formData);
 }

  return (
    <div className="max-w-md px-9 py-4 shadow-formCard rounded-2xl mx-auto my-6">
      <h1
        className="text-3xl font-bold text-center"
      >Reset Password</h1>

      <p className="text-center text-[15px] text-gray-700 my-5">
      Please enter new password
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <Input
        required
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={handleChange}
          error={
            (dataErrors && dataErrors.touched?.pass) ? dataErrors.errors?.pass:''
          }
        />
 <Input
          type="password"
          placeholder="Repeat password"
          name="repeatPassword"
          id="repeatPassword"
          onChange={handleChange}
          error={
            (dataErrors && dataErrors.touched?.repeatPassword) ? dataErrors.errors?.repeatPassword:''
          }
        />       
       
        <Button type="submit" disabled={
          isLoading || dataErrors.hasError
        }>
          {
            isLoading ? 'Loading...':'Reset'
          }
        </Button>
        
        <p className="text-center">Remember your password <Link to="/auth/login" className="font-bold text-primary">Log in</Link></p>
      </form>
    </div>
  )
}
