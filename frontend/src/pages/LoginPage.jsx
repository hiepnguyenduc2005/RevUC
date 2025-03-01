import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {

    const {login} = useAuthStore()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        
        login(formData)
    }

    return (
        <div className="h-screen flex items-center justify-center bg-base-200 p-4" style={{ overflow: 'hidden' }}>
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
                <div className="card-body p-6">
                    <h2 className="card-title justify-center text-3xl font-bold mb-4">Organization Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Organization Email</span>
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email" 
                                className="input input-bordered w-full text-md py-2" 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                            </label>
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password" 
                                className="input input-bordered w-full text-md py-2" 
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary text-md py-2">Login</button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-md">
                        Don't have an account? 
                        <Link to="/signup" className="link link-primary ml-2 font-semibold">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage