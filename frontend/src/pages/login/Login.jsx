import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import  useLogin  from '../../hooks/useLogin.js'

const Login = () => {

    const [inputs, setInputs] = useState({
        userName: '',
        password: ''
    });

    const { login, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    }

    return <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
                <span className='text-blue-500'> SendIt</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div className='Username_box'>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10'
                        value={inputs.userName}
                        onChange={(e) => setInputs({...inputs, userName: e.target.value})}
                    />
                </div>

                <div className='Password_box'>
                    <label className='label'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                    />
                </div>

                <Link to="/signup" className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block'>
                    {"Don't"} have an account ?
                </Link>

                <div>
                    <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>

}

export default Login
