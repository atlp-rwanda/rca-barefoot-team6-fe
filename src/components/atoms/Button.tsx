import clsx from "clsx"

interface ButtonProps {
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset',
    theme?: 'primary' | 'secondary',
    outline?: boolean,
    onClick?: (() => void) | undefined,
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
            className={clsx(
                'px-4 py-2 rounded-md',
                {
                    'bg-primary text-white': theme === 'primary' && !outline,
                    'bg-secondary text-white': theme === 'secondary' && !outline,
                    'bg-transparent text-primary border-2 border-primary': outline && theme === 'primary',
                    'bg-transparent text-secondary border-2 border-secondary': outline && theme === 'secondary',
                    'cursor-not-allowed': disabled
                },
                className
            )}>{children}</button>
    )
}
