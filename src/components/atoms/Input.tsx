import clsx from "clsx";
import { useState } from "react";

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    name: string;
    formData?: any;
    setFormData?: any;
    id?: string;
    required?: boolean;
    error?: string;
    label?: string;
    icon?: React.ReactNode | null;
    onClickIcon?: () => void;
}
export default function Input(props: InputProps) {
    const { formData, type, placeholder, value, defaultValue, onChange, className, disabled, name, id, required, error, label, icon, onClickIcon } = props
    const [isEditing, setIsEditing] = useState(false);
    const displayValue = isEditing ? defaultValue : defaultValue ?? '';
    const handleFocus = () => {
        setIsEditing(true);
    }
    const handleBlur = () => setIsEditing(false);
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="pb-2 text-sm font-semibold text-gray-700">{label}</label>
            <label htmlFor={id} className={clsx(
                "flex flex-row items-center",
                "overflow-hidden w-full rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-secondary focus-within:border-transparent",
                className,
                { "border-red-500 focus-within:ring-red-500": error },
                { "cursor-not-allowed bg-gray-100": disabled },
            )}
            >
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="off"
                    defaultValue={displayValue}
                    disabled={disabled}
                    name={name}
                    className="flex-1 h-full py-2 focus:outline-none px-4"
                    id={id}
                    required={required}
                />
                {icon && (
                    <div className="px-2 cursor-pointer" onClick={onClickIcon}>
                        {icon}
                    </div>
                )}
            </label>
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}
