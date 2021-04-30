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

   <div className="text-center p-3 ">
       © 2021 Copyright: <span style={{color:'red'}}>E</span>learning - made with passion by <a className="text-dark" href="https://arik-hamdi.be" target="_blank">Arik</a>
   </div>
</div>
</footer>
            )}
        </Fragment>
    )

}

export default withRouter(Footer);