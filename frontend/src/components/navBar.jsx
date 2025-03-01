import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js' // You'll need to create this context

const NavBar = () => {
    const { authOrg, logout } = useAuthStore() // Need to create this context

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                ClinSync
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {!authOrg ? (
                        // Not logged in state
                        <>
                            <li>Org Login</li>
                            <li>Org Signup</li>
                        </>
                    ) : (
                        // Logged in state
                        <>
                            <li>Create New</li>
                            <li>
                                <details>
                                    <summary className="text-lg">Welcome {authOrg.name}</summary>
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
