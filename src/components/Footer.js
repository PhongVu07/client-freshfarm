import React from "react";
import { FaFacebookF, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/footer.css";

export default function Footer() {
  return (
    <div className="container-fluid footer">
      <div className="container">
        <div className="col-container row">
          <div className="menu-nav col-6 col-sm-6 col-md-3">
            <h6 className="sm-footer-title">ABOUT FRESH FARM</h6>
            <ul>
              <li className="foot-link-li">
                <Link className="foot-link" to="/">
                  Fresh Farm Vietnam
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/blog">
                  Career
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/portfolio">
                  Blog
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/aboutme">
                  Investor relation
                </Link>
              </li>
            </ul>
          </div>

          <div className="menu-nav col-6 col-sm-6 col-md-3">
            <h6 className="sm-footer-title">CONTACT</h6>
            <ul>
              <li className="foot-link-li">
                <Link className="foot-link" to="/">
                  info@freshfarm.com
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/blog">
                  1800 6868
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/portfolio">
                  1900 6868
                </Link>
              </li>
            </ul>
          </div>

          <div className="menu-nav col-12 col-sm-12 col-md-3">
            <h6 className="sm-footer-title">FOLLOW US ON</h6>
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

          <div className="menu-nav col-6 col-sm-6 col-md-3">
            <h6 className="sm-footer-title">LET US HELP YOU</h6>
            <ul>
              <li className="foot-link-li">
                <Link className="foot-link" to="/">
                  Shipping rates
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/blog">
                  Return
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/portfolio">
                  Manage
                </Link>
              </li>
              <li className="foot-link-li">
                <Link className="foot-link" to="/portfolio">
                  Help
                </Link>
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
