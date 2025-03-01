import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // You'll need to create this context

const NavBar = () => {
    const { authOrg, logout } = useAuth() // Need to create this context

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl">ClinSync</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {!authOrg ? (
                        // Not logged in state
                        <>
                            <li><Link to="/org/login">Org Login</Link></li>
                            <li><Link to="/org/signup">Org Signup</Link></li>
                        </>
                    ) : (
                        // Logged in state
                        <>
                            <li><Link to="/create-request">Create New</Link></li>
                            <li>
                                <details>
                                    <summary className="text-lg">Welcome {authOrg}</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><a onClick={logout}>Logout</a></li>
                                    </ul>
                                </details>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NavBar
