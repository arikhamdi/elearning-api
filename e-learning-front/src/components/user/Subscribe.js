import { Button } from 'react-bootstrap'
import React from 'react'
import { Layout } from '../Layout/Layout'

const Subscribe = () => {
    return (
        <Layout title="Abonnez-vous" 
                description="L'apprentissage vous permet de rester en tête." 
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fschoolgirl-1.png&f=1&nofb=1"
                className="container"
                >

<div className="demo10">
            <div className="container">
                <h4 className="py-4 text-center">Nos Abonnements</h4>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="pricingTable10">
                            <div className="pricingTable-header">
                                <h3 className="heading">mensuel</h3>
                                <span className="price-value">
                                    <span className="currency">€</span> 29,99
                                    <span className="month">/mois</span>
                                </span>
                            </div>
                            <div className="pricing-content">
                                <ul>
                                    <li>Acces illimité</li>
                                    <li>Lorem ipsum dolor</li>
                                    <li>consectetur adipisicing</li>
                                </ul>
                                <Button href="/subscribe-confirm" className="read">Souscrire</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="pricingTable10">
                            <div className="pricingTable-header">
                                <h3 className="heading">Annuel</h3>
                                <span className="price-value">
                                    <span className="currency">€</span> 299,99
                                    <span className="year">/an</span>
                                </span>
                            </div>
                            <div className="pricing-content">
                                <ul>
                                    <li>Acces illimité</li>
                                    <li>Lorem ipsum dolor</li>
                                    <li>consectetur adipisicing</li>
                                </ul>
                                <Button href="/subscribe-confirm" className="read">Souscrire</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                </Layout>
    )
}

export default Subscribe
