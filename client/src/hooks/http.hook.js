import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [status, setStatus] = useState('initial')
    const [error, setError] = useState(null)

    async function customFetch({ url, method = 'GET', body = null, headers = {} }) {
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, { method, body, headers })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
        }

        return data
    }

    const request = useCallback(async (params) => {

        setStatus('loading');

        try {
            // если в параметрах прилетел массив а не объект:
            if (Array.isArray(params)) {
                const results = await Promise.all(params.map(param => customFetch(param)));

                setStatus('loaded');

                return results
            }

            const result = await customFetch(params);

            setStatus('loaded');

            return result
        } catch (error) {
            setStatus('error')
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {
        status,
        request,
        error,
        clearError,
        isLoading: status === 'loading',
        isLoaded: status === 'loaded',
        isError: status === 'error'
    }

}