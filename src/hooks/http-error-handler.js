import {useCallback, useEffect, useState} from "react";

const useHttpErrorHandler = httpClient => {
    const [error, setError] = useState(null)

    const reqInt = httpClient.interceptors.request.use(res => {
        return res
    }, err => {
        setError(err)
        return Promise.reject(err)
    })

    const resInt = httpClient.interceptors.response.use(res => {
        return res
    }, err => {
        setError(err)
        return Promise.reject(err)
    })

    useEffect(() => {
        return () => {
            console.log('remove interceptors')
            httpClient.interceptors.request.eject(reqInt)
            httpClient.interceptors.response.eject(resInt)
        }
    }, [reqInt, resInt])


    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return [error, clearError]
}

export default useHttpErrorHandler;