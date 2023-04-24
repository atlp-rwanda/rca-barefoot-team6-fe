import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/atoms/Input";
import { toast } from 'react-hot-toast';
import Button from '../../components/atoms/Button';
import { formValidate } from '../../utils/validator';
import { backendUrl } from '../../plugins/configUrl';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validateErrors = formValidate(email);
    setDataErrors(validateErrors);
    if (validateErrors.hasError) return;
    const toastId = toast.loading('Requesting...');

    try {
      setIsLoading(true);
      const response = await fetch(`${backendUrl}/users/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to request new password');
      }

      toast.success('Requested New Password Reset', {
        id: toastId
      });

      navigate('/auth/login');
    } catch (error) {
      setIsLoading(false);
      toast.error(
        // @ts-ignore
        Array.isArray(error?.response?.data) ? error?.response?.data?.error[0] : error?.response?.data?.error
          || 'Failed to request new password',
        {
          id: toastId
        });
    }

    // mutate(email, {
    //   onSuccess: (_) => {
    //     toast.success('Requested New Password Reset', {
    //       id: toastId
    //     })
    //     navigate('/auth/login');
    //   },
    //   onError: (error) => {
    //     toast.error(
    //       // @ts-ignore
    //       Array.isArray(error?.response?.data) ? error?.response?.data?.error[0] : error?.response?.data?.error
    //         || 'Failed to request new password',
    //       {
    //         id: toastId
    //       }
    //     )
    //   }
    // });
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // check error
    const validateErrors = formValidate({ email, [name]: value }, name);
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
    });
    setEmail(value);
  }
  return (
    <div className='flex items-center justify-center my-24'>
      <div className='max-w-md shadow rounded-xl card p-8'>
        <h1 className='font-bold text-center text-lg'>Request New Password</h1>
        <p className='py-2 text-center font-light'>Please enter your email</p>
        <form onSubmit={handleFormSubmit} className='pt-6 flex flex-col space-y-5'>
          <Input
            label='Email'
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChange}
            error={
              (dataErrors && dataErrors.touched?.email) ? dataErrors.errors?.email : ''
            }
          />
          <Button type="submit" disabled={
            isLoading || dataErrors.hasError
          }>
            {
              isLoading ? 'Loading...' : 'Submit'
            }
          </Button>
        </form>
      </div>
    </div>
  )
}


