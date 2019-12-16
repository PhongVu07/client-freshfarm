import React from "react";
import { FaFacebookF, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import {Link} from 'react-router-dom'
import "../css/footer.css";

export default function Footer() {
  return (
    <div className="container-fluid footer">
      <div className="container">
        <div className="col-container row">
          <div className="menu-nav col-6 col-sm-6 col-md-4">
            <h6 className="sm-footer-title">MENU</h6>
            <ul>
              <li className="foot-link-li"><Link className="foot-link" to="/">This</Link></li>
              <li className="foot-link-li"><Link className="foot-link" to="/blog">Is</Link></li>
              <li className="foot-link-li"><Link className="foot-link" to="/portfolio">Amazing</Link></li>
              <li className="foot-link-li"><Link className="foot-link" to="/aboutme">Right?</Link></li>
            </ul>
          </div>

          <div className="menu-nav col-6 col-sm-6 col-md-5">
            <h6 className="sm-footer-title">CONTACT</h6>
            <p style={{marginTop : '6%', cursor: 'pointer'}} className="foot-link">heyphong2606@gmail.com</p>
          </div>

          <div className="menu-nav col-12 col-sm-12 col-md-3">
            <h6 className="sm-footer-title">ONLINE</h6>
            <ul className="social-icons">
              <li>
                <a href="" className="social-icon facebook">
                  <FaFacebookF />
                </a>
              </li>

              <li>
                <a href="" className="social-icon youtube">
                  <FaYoutube />
                </a>
              </li>

              <li>
                <a href="" className="social-icon linkedin">
                  <FaLinkedin />
                </a>
              </li>

              <li>
                <a href="" className="social-icon github">
                  <FaGithub />
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="copy-right">
        <small> Copyright Phong Vu 2019 &copy;</small>
        </div>

      </div>
    </div>
  );
}