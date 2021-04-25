import React, { Fragment } from 'react';
import { withRouter } from 'react-router';


const Footer = ({history}) => {

    return (
        <Fragment>
            {history.location.pathname.split("/")[1] !== 'student' && (
                <footer id="main-footer" className="text-center text-dark text-lg-start mt-5">

                    <div className="container p-4">
                    <section className="mb-4">
                        <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-facebook-f"></i>
                        </a>


                        <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-twitter"></i>
                        </a>


                        <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-google"></i>
                        </a>


                        <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-instagram"></i>
                        </a>


                        <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                            <i className="fab fa-github"></i>
                        </a>
                    </section>

                    <section className="">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Links</h5>

                                <ul className="list-unstyled mb-0">
                                    <li>
                                    <a href="#!" className="text-dark">Link 1</a>
                                    </li>
                                    <li>
                                    <a href="#!" className="text-dark">Link 2</a>
                                    </li>
                                    <li>
                                    <a href="#!" className="text-dark">Link 3</a>
                                    </li>
                                    <li>
                                    <a href="#!" className="text-dark">Link 4</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Links</h5>

                                <ul className="list-unstyled mb-0">
                                    <li>
                                    <a href="#!" className="text-dark">Link 1</a>
                                    </li>
                                    <li>
                                    <a href="#!" className="text-dark">Link 2</a>
                                    </li>
                                    <li>
                                    <a href="#!" className="text-dark">Link 3</a>
                                    </li>
                                    <li>
                                    <a href="#!" className="text-dark">Link 4</a>
                                    </li>
                                </ul>
                            </div>
    
                            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                <form >
                                    <p className="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                    </p>
                                    
                                    <input type="email" id="form5Example2" className="form-control mb-2" placeholder="Enter your Email" />
                                    
                                    <button type="submit" className="btn btn-outline-dark form-control mb-4">
                                    Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>

   <div className="text-center p-3 ">
       © 2020 Copyright:
       <a className="text-dark" href="/">E-learning</a>
   </div>
</div>
</footer>
            )}
        </Fragment>
    )

}

export default withRouter(Footer);