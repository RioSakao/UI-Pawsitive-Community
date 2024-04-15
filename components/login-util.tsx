import { useState } from 'react';
import { loginFields } from "./constants/formFields";
import Input from "./input";
import FormAction from "./form-action";
import FormExtra from "./form-extra";
import Home from "../app/page"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { FormEvent } from 'react';
import axios , { AxiosResponse } from 'axios';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

interface FieldState {
  [key: string]: string;
}

interface BearState {
  username: string;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        username: "",
      }),
      {
        name: 'bear-storage',
      },
    ),
  ),
)

const fields = loginFields;
let fieldsState: FieldState = {};
fields.forEach(field => (fieldsState[field.id] = ''));
export default function Login(){
    // const router = useRouter();
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
        const JSONobj = JSON.stringify(loginState)
        console.log(JSONobj)
        axios.post('http://127.0.0.1:8000/api/login', JSONobj ,{
            headers: {
            'Content-Type': 'application/json',
            // 'X-CSRFToken': csrftoken
        }
        }) .then((response: AxiosResponse) => {
            // Handle successful response
            // console.log('Response Status Code:', response.status);
            // console.log('Response Data:', response.data);
            if (response.status === 200) {
              console.log('Login successful');
              useBearStore.setState({ username: response.data.username })
              const paw = useBearStore.getState().username
              console.log(paw)
              // console.log(useBearStore)
              return(
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                    </Routes>
                </Router>
              );
            //   router.push('/');
            } else {
              console.log('Login failed');
            }
        }) .catch((error: any) => {
            // Handle error
            console.error('Error:', error);
        });
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