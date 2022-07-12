import { Form, message } from 'antd'
import Input from 'antd/lib/input/Input'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Resources/Auth.css'
import axios  from 'axios'
import { Spinner } from '../Components/Spinner'


export const Login = () => {
    const [loading,setLoading] =useState(false)
    let navigate = useNavigate()
    const onFinish = async (values) => {
        try {
        setLoading(true)
          const response = await axios.post("/api/users/login", values);
      
          localStorage.setItem(
            "Expense-tracker",
            JSON.stringify({ ...response.data, password: "" }),
            );
            setLoading(false)
         
          message.success("Login successful");
          navigate("/");
        } catch (error) {
            setLoading(false)
        
          message.error("Login failed");
        }
      };

      useEffect(() => {
        if (localStorage.getItem("Expense-tracker")) {
          navigate("/");
        }
      }, []);

  return (
  <>
  <div className="register">
    
    {loading&& <Spinner/>}
  <div className="row justify-content-center align-items-center w-100 h-100 ">
   
  <div className="col-md-5">
        <div className="lottie">

    <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_l5o1uey5.json"  background="transparent"  speed="1"  loop autoplay></lottie-player>
        </div>

    </div>
    <div className="col-md-4">
    <Form layout='vertical' onFinish={onFinish}>
    <h1>Login</h1>

        <Form.Item label = "Email" name = "email">
            <Input/>
        </Form.Item>
        <Form.Item label = "Password" name = "password">
            <Input type = "password"/>
        </Form.Item>
        <div className="d-flex justify-content-between align-items-center">
            <Link to = "/register">Not Registered yet,  click here to Register</Link>
            <button type='submit' className = "primary">Let's get in</button>
        </div>
    </Form>
    </div>

  </div>

  </div>
  </>
  )
}
