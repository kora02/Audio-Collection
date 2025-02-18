import React from 'react'
import {useLocation, Navigate, Outlet} from 'react-router-dom'
import { useCookies } from 'react-cookie'

const RequireAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken'])
    const authToken = cookies.AuthToken
    return (
        authToken? <Outlet /> : <Navigate to={'/'} />
    )
}

export default RequireAuth