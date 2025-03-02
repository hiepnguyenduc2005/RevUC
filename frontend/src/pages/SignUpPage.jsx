import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const SignUpPage = () => {
    const { signup } = useAuthStore()
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing again
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!')
            return
        }

        // Check if password is empty
        if (!formData.password) {
            setError('Password is required!')
            return
        }

        // Create new object without confirmPassword
        const { confirmPassword, ...signupData } = formData

        // If validation passes, proceed with signup
        console.log(signupData)
        signup(signupData)
    }

    return (
        <div className="h-screen flex items-center justify-center bg-base-200 p-4" style={{ overflow: 'hidden' }}>
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
                <div className="card-body p-6">
                    <h2 className="card-title justify-center text-3xl font-bold mb-4">Organization Sign Up</h2>
                    {error && (
                        <div className="alert alert-error text-md mb-3">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Organization Name</span>
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter organization name" 
                                className="input input-bordered w-full text-md py-2" 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Organization Email</span>
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter organization email" 
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
                                placeholder="Enter password" 
                                className={`input input-bordered w-full text-md py-2 ${error && 'input-error'}`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Confirm Password</span>
                            </label>
                            <input 
                                type="password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password" 
                                className={`input input-bordered w-full text-md py-2 ${error && 'input-error'}`}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary text-md py-2">Sign Up</button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-md">
                        Already have an account? 
                        <Link to="/login" className="link link-primary ml-2 font-semibold">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage