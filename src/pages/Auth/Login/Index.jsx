import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../../components/form/button";
import {useForm} from "react-hook-form";

export default function Index() {
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues:{
    email: '',
    password: ''
  }});

  const http = axios.create({
    baseURL: `http://localhost:8000`,
    headers: {
      
    },
    withCredentials: true
  })

  async function getUser() {
    const csrf = await http.get('/sanctum/csrf-cookie');
    console.log(csrf);
    const login = await http.post('/api/login',{
      email: "test@example.com",
      password: "password"
    });
    console.log(login);
    Cookies.set('logged_in_cookie', true, {expires: 86400, sameSite: 'lax'})
    const cars = await http.get('/api/cars');
    console.log(cars);
    const user = await http.get('/api/user');
    console.log(user)
  }

  useEffect(() => {
    getUser();
  },[]);

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1>Login Test</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input placeholder="example@email.com" type="email" name="email" id="email" {...register("email", {
          required: "This field is required",
        })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" {...register("password", {
          required: "This field is required",
          minLength: {
            value: 5,
            message: "The minimun length is 5"
          }
        })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" className="font-bold" onClick={() => {alert("clicked!")}}>Log In</Button>
      </form>
    </>
  )
}
