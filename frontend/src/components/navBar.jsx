import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js' // You'll need to create this context

const NavBar = () => {
    const { authOrg, logout } = useAuthStore() // Need to create this context

    return (
        <div className="navbar bg-gray-800 text-white shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl normal-case">ClinSync</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {!authOrg ? (
                        // Not logged in state
                        <>
                            <li><Link to="/login" className="hover:bg-gray-700 rounded-lg">Org Login</Link></li>
                            <li><Link to="/signup" className="hover:bg-gray-700 rounded-lg">Org Signup</Link></li>
                        </>
                    ) : (
                        // Logged in state
                        <>
                            <li><Link to="/create-trial" className="hover:bg-gray-700 rounded-lg">Create New</Link></li>
                            <li>
                                <details>
                                    <summary className="text-lg hover:bg-gray-700">Welcome {authOrg.name}</summary>
                                    <ul className="bg-gray-800 rounded-t-none p-2">
                                        <li><button onClick={logout} className="hover:bg-gray-700">Logout</button></li>
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
