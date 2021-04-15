import React from 'react';


const Footer = props => {

    return (
        <footer id="main-footer" className="bg-info text-center text-lg-start mt-3">

         <div className="container p-4">
            <section className="mb-4">
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fab fa-facebook-f"></i>
                </a>


                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fab fa-twitter"></i>
                </a>


                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fab fa-google"></i>
                </a>


                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fab fa-instagram"></i>
                </a>


                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fab fa-linkedin-in"></i>
                </a>

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fab fa-github"></i>
                </a>
            </section>



            <section className="">

            <div className="row">
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Links</h5>

                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="#!" className="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Link 4</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Links</h5>

                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="#!" className="text-white">Link 1</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Link 2</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Link 3</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white">Link 4</a>
                        </li>
                    </ul>
                </div>
            
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <form >
                        <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                        </p>
                      
                        <input type="email" id="form5Example2" className="form-control mb-2" placeholder="Enter your Email" />
                      
                        <button type="submit" className="btn btn-outline-light form-control mb-4">
                        Subscribe
                        </button>
                </form>
            </div>
        </div>
        </section>

            <div className="text-center p-3 ">
                © 2020 Copyright:
                <a className="text-dark" href="#">E-learning</a>
            </div>
        </div>
        </footer>
    )
}

export default Footer;