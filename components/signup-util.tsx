import React, { useState, ChangeEvent, FormEvent } from 'react';
import { signupFields } from "./constants/formFields";
import FormAction from "./form-action";
import Input from "./input";

interface FieldState {
  [key: string]: string;
}

const fields = signupFields;
let fieldsState: FieldState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  // Handle Signup API Integration here
  const createAccount = () => {
    // Implementation of signup logic
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction<React.FormEvent<HTMLFormElement>> handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
