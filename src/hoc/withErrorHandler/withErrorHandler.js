import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        const [error,setError] = useState(null)

        useEffect(() => {

            let reqInterceptor = axios.interceptors.request.use(req => {
                                setError(null)
                            })
            let resInterceptor = axios.interceptors.response.use(res => res, err => {
                                setError(err)
                            })

            return () => {
                // console.log('Unmount',reqInterceptor,resInterceptor)
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            }
        },[])

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
