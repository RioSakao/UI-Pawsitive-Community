// FormAction.tsx
import React from 'react';

interface FormActionProps<T = React.SyntheticEvent> {
    handleSubmit: (e: T) => void;
    type?: 'Button';
    action?: 'submit';
    text: string;
}

export default function FormAction<T>({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}: FormActionProps<T>) {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        handleSubmit(e as T);
    };

    return (
        <>
            {type === 'Button' ? (
                <button
                    type={action}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                    onClick={handleClick}
                >
                    {text}
                </button>
            ) : (
                <></>
            )}
        </>
    );
}
