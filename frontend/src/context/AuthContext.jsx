import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [orgName, setOrgName] = useState('')

    const logout = () => {
        setIsLoggedIn(false)
        setOrgName('')
        // Add any other logout logic (clear localStorage, cookies, etc.)
    }

    const login = (org) => {
        setIsLoggedIn(true)
        setOrgName(org.name)
        // Add any other login logic
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, orgName, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 