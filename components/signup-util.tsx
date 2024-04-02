import React, { useState, ChangeEvent, FormEvent } from 'react';
import { signupFields } from "./constants/formFields";
import FormAction from "./form-action";
import Input from "./input";
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

interface FieldState {
  [key: string]: string;
}


const fields = signupFields
let fieldsState: FieldState = {}


fields.forEach((field) => (fieldsState[field.id] = ''))

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
    setSignupState(fieldsState)
  };

  // Handle Signup API Integration here
  const createAccount = async () => {
    try {
      const csrftoken = Cookies.get('csrftoken');
      const JSONobj = JSON.stringify(signupState)
      console.log(JSONobj)
      axios.post('http://127.0.0.1:8000/api/create', JSONobj ),{
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRFToken': csrftoken
        }, };
    } catch(error) {
      console.error(error)
    }
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
