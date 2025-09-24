'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from './useProfile'
import { setAuthToken, clearAuthToken } from '@/fetcher'

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    user: any
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    // Use the existing useProfile hook to get user data
    const { profile, isLoading: profileLoading, isError } = useProfile()

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage?.getItem('token')
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        // Update authentication status based on profile loading/error state
        if (!profileLoading) {
            if (isError || !profile) {
                // If there's an error or no profile, user is not authenticated
                setIsAuthenticated(false)
                // Clear invalid token
                clearAuthToken()
            } else if (profile) {
                // If profile exists, user is authenticated
                setIsAuthenticated(true)
            }
        }
    }, [profileLoading, isError, profile])

    const login = (token: string) => {
        setAuthToken(token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        clearAuthToken()
        setIsAuthenticated(false)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading: isLoading || profileLoading,
            user: profile,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
