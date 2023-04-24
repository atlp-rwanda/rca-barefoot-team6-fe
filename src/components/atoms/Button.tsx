interface ButtonProps {
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset',
    theme?: 'primary' | 'secondary',
    outline?: boolean,
    onClick?: () => void,
    disabled?: boolean,
    className?: string,
}

export default function Button(props: ButtonProps) {
    const {
        type,
        children,
        className,
        disabled,
        onClick,
        theme = 'primary',
        outline
    } = props
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`px-4 py-2 rounded-md ${theme === 'primary' && !outline && 'bg-primary text-white'} 
    ${theme === 'secondary' && !outline && 'bg-secondary text-white'} 
    ${outline && theme === 'primary' && 'bg-transparent text-primary border-2 border-primary'}
    ${outline && theme === 'secondary' && 'bg-transparent text-secondary border-2 border-secondary'}
    ${disabled && 'cursor-not-allowed'} ${className}`}>{children}</button>
    )
}
