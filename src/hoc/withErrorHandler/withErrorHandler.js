import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        const [error,setError] = useState(null)

        // componentWillMount
        const reqInterceptor = axios.interceptors.request.use(req => { 
            setError(null)
            return req 
        })
        const resInterceptor = axios.interceptors.response.use(res => res, err => { 
            setError(err) 
        })

        useEffect(() => {
            return () => {
                // console.log('Unmount',reqInterceptor,resInterceptor)
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            }
        }, [reqInterceptor, resInterceptor ])

        const errorChecked = () => {
            setError(null)
        }

        return (
                <>
                <Modal show={error} cancelPurchase={errorChecked}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </>
        )
    }
}

export default withErrorHandler
