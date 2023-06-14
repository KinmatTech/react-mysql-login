import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import Validation from '../components/SignupValidation';
import axios from 'axios';

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
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
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err));
        }
    }
  return (
    <div className='mysignup d-flex justify-content-center align-items-center vh-100'>
        <div className='signup-form text-light rounded'>
            <h1>Sign-Up</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input 
                        type='text' 
                        placeholder='Enter Name' 
                        className='form-control rounded-0'
                        name='name'
                        onChange={ handleInput }
                    />
                    {errors.name && <span className='text-danger'> {errors.name} </span>}
                </div>
                <div className="mb-3">
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input 
                        type='email' 
                        placeholder='Enter Email' 
                        className='form-control rounded-0'
                        name='email'
                        onChange={ handleInput }
                    />
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <div className="mb-3">
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input 
                        type='password' 
                        placeholder='Enter Password' 
                        className='form-control rounded-0'
                        name='password'
                        onChange={ handleInput }
                    />
                    {errors.password && <span className='text-danger'> {errors.password} </span>}
                </div>
                <button type='submit' className="btn btn-success w-100 rounded-0"><strong>Sign up</strong></button>
                <p></p>
                <Link to='/'><button className="btn btn-default text-light border w-100 rounded-0">Log in</button></Link>
            </form>
        </div>
    </div>
  )
}
