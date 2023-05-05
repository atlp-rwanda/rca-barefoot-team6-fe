import React, { FormEvent, useState } from 'react'
import Input from './atoms/Input'
import authStore from '../store/auth.store';
import { EditUserType } from '../types/services/user.types';
import { formValidate } from '../utils/validator';
import Button from './atoms/Button';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

// EditRole component
interface EditUserProps {
    userId: number | undefined;
    onClose: Function;
    formData: EditUserType;
    setFormData: React.Dispatch<React.SetStateAction<EditUserType>>;
}

const EditUser: React.FC<EditUserProps> = (props) => {
    const { setFormData, formData, onClose, userId } = props
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // check error
        const validateErrors = formValidate({ ...formData, [name]: value }, name);
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
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validateErrors = formValidate(formData);
        console.log("form data: ", formData);

        setDataErrors(validateErrors);
        if (validateErrors.hasError) return;

        const toastId = toast.loading('Updating...');
        const token = Cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const data = await authStore.updateUser(formData, userId ? userId : 0, config);

            toast.success('You have updated the user!', {
                id: toastId,
            });
        } catch (error) {
            toast.error(
                // @ts-ignore
                Array.isArray(error?.response?.data) ? error?.response?.data?.error[0] : error?.response?.data?.error
                    || 'Failed to update user',
                {
                    id: toastId
                }
            )
        }
    }
    const handleEditClose = () => {
        onClose();
    };
    return (
        <div className="flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative py-2 bg-white rounded-xl shadow-2xl dark:bg-gray-700">
                    <button type="button" onClick={handleEditClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <form onSubmit={handleSubmit} className='bg-white text-gray-700 mx-8 rounded-lg p-6'>
                        <p className='font-bold pb-4 text-lg'>Update User</p>
                        <div className='grid grid-cols-1 gap-4'>
                            <Input
                                type="text"
                                defaultValue={formData.firstName}
                                name="firstName"
                                label='First Name'
                                id="firstName"
                                onChange={handleChange}
                                error={
                                    (dataErrors && dataErrors.touched?.firstName) ? dataErrors.errors?.firstName : ''
                                }
                            />
                            <Input
                                type="text"
                                name="lastName"
                                defaultValue={formData.lastName}
                                id="lastName"
                                label='Last Name'
                                onChange={handleChange}
                                error={
                                    (dataErrors && dataErrors.touched?.lastName) ? dataErrors.errors?.lastName : ''
                                }
                            />
                            <Input type="email"
                                label='Email'
                                defaultValue={formData.email}
                                name="email"
                                id="email"
                                onChange={handleChange}
                                error={dataErrors.touched.email && dataErrors.errors.email || ''} />
                        </div>
                        <Button className='px-24 mt-4'
                            disabled={dataErrors.hasError}>
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUser