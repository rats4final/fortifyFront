import Button from "../../../components/form/button";
import {useForm} from "react-hook-form";
import api from "../../../utils/api";
import { logIn } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues:{
    email: '',
    password: ''
  }});

  const onSubmit = (data) => {
    console.log(data)
    api().get('/sanctum/csrf-cookie').then(() => {
      api().post('/api/login', data).then(response => {
        if (response.data.error) {
          console.log(response.data.errors);
        }else{
          logIn()
          nav("/");
        }
      }).catch(errors => console.log(errors.response.data.message ))
    })
  }

  useEffect(() => {
    setLoading(true);
    api().get('api/user').then((response) => {
      if (response) {
        console.log(response)
        nav('/')
      }
    }).catch(error => {
      setLoading(false)
      console.log(error);
    })
  },[])


  if (loading) {
    return (//show loading bar
      <>
        <h1>You are being redirected!</h1>
      </>
    )
  }else{
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
          <Button type="submit" className="font-bold">Log In</Button>
        </form>
      </>
    )
  }


}
