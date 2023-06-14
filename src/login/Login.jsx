import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import Validation from '../components/LoginValidation';
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values))
        if(errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/home')
                }
                else{
                    alert("User does not exist");
                }
            })
            .catch(err => console.log(err));
        }
    }
  return (
    <div className='mylogin d-flex justify-content-center align-items-center vh-100'>
        <div className='login-form text-light rounded'>
            <h1>Sign-In</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input 
                        type='email' 
                        name='email'
                        placeholder='Enter Email' 
                        className='form-control rounded-0'
                        onChange={ handleInput }                        
                    />
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <div className="mb-3">
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input 
                        type='password' 
                        name='password'
                        placeholder='Enter Password'
                        className='form-control rounded-0'
                        onChange={ handleInput }
                    />
                    {errors.password && <span className='text-danger'> {errors.password} </span>}
                </div>
                <button type='submit' className="btn btn-success w-100 rounded-0"><strong>Log in</strong></button>
                <p></p>
                <Link to='/signup'><button className="btn btn-default text-light border w-100 rounded-0">Create Account</button></Link>
            </form>
        </div>
    </div>
  )
}
