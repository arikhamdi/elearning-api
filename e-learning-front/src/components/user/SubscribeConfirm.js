import { Button } from 'react-bootstrap'
import React from 'react'
import { Layout } from '../Layout/Layout'
import { useDispatch } from 'react-redux'
import { subscribe } from '../../store/user/auth'

const SubscribeConfirm = () => {

    const dispatch = useDispatch()

    const userSubscribe = duration => {
        dispatch(subscribe(duration));
    }
    return (
        <Layout title="Abonnez-vous" 
                description="L'apprentissage vous permet de rester en tête." 
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fschoolgirl-1.png&f=1&nofb=1"
                className="container"
                >
                <Button onClick={() => userSubscribe('month')}>1 mois</Button>
                <Button onClick={() => userSubscribe('year')}>1 an</Button>
        </Layout>
    )
}

export default SubscribeConfirm
