import {useState, useEffect} from 'react';

const useHttpErrorHandler = httpClient => {
    const [error, setError] = useState(null);

    const resetErrorHandler = () => setError(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
            
    const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setError(error);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    return {
        error: error,
        resetErrorHandler: resetErrorHandler
    };
};

export default useHttpErrorHandler;