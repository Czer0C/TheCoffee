/*eslint-disable*/
import React from "react";

const st = {
  display: "block",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  textAlign: "center",

};

function DefaultFooter() {
  return (
      <footer className="domino-footer-1">
        <article>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 left-footer">
                <div className="hotline">
                  <h2>Hotline<span>Đặt hàng</span></h2>
                  <a href="tel:19006099">
                    <img
                        alt=""
                        src={require(`assets/img/hotline.png`)}>
                    </img>
                  </a>
                </div>
                <div className='Module Module-285'>
                  <ul className="copyright">
                    <li><span>© 2020 The Coffee VIETNAM</span></li>
                    <li><a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Chính sách</a></li>
                    <li><a href="#">Danh sách cửa hàng</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 right-footer">
                <div className='Module Module-285'>
                  <ul className="copyright">
                    <li><span>Liên hệ với chúng tôi</span></li>
                    <li>
                      <a href="https://www.facebook.com/groups/2698304197160171" target="_blank" >
                        <img src="https://pizzahut.vn/_nuxt/img/97eaf9e.png"></img>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" >
                        <img src="https://pizzahut.vn/_nuxt/img/7de71ae.png"></img>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:aktv4pro@gmail.com" target="_blank" >
                        <img src="https://pizzahut.vn/_nuxt/img/e5405ba.png"></img>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="logo_footer">
                  <img
                      alt=""
                      src={require(`evolution/assets/img/pc/_global/footer_logo.png`)}>
                  </img>
                </div>
              </div>

              <a className="hotline-fixed" href="tel:19006066">
                <span className="fas fa-phone"></span></a>
            </div>
          </div>
        </article>
      </footer>
  );
}

export default DefaultFooter;
