/*eslint-disable*/
import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <Link
                  to="/index"
                >
                  TheCoffee
                </Link>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a
              href="#"
              onClick={e => e.preventDefault()}
            >
              Trí & Vi
            </a>
            . Coded by{" "}
            <a
              href="#"
              onClick={e => e.preventDefault()}
            >
              Triều
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
