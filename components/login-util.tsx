import { useState } from 'react';
import { loginFields } from "./constants/formFields";
import Input from "./input";
import FormAction from "./form-action";
import FormExtra from "./form-extra";
import React, { FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface FieldState {
    [key: string]: string;
}

const fields = loginFields;
let fieldsState: FieldState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        try {
            const JSONobj = JSON.stringify(loginState)
            console.log(JSONobj)
            axios.post('http://127.0.0.1:8000/api/login', JSONobj ),{
              headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrftoken
              }, };
          } catch(error) {
            console.error(error)
          }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map(field =>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}