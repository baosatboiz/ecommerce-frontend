import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaBell,
  FaQuestionCircle,
  FaShoppingCart,
  FaFacebook,
  FaInstagram,
  FaSearch,
} from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="bg-danger text-white small">
      {/* Top row */}
      <div className="container-fluid py-1 border-bottom border-light">
        <div className="row align-items-center">
          {/* Left */}
          <div className="col-12 col-lg-6 mb-2 mb-lg-0">
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-lg-start">
              <a href="#" className="text-white text-decoration-none">
                Kênh Người Bán
              </a>
              <span>|</span>
              <a href="#" className="text-white text-decoration-none">
                Trở thành Người bán Shopee
              </a>
              <span>|</span>
              <a href="#" className="text-white text-decoration-none">
                Tải ứng dụng
              </a>
              <span>|</span>
              <span>Kết nối</span>
              <a href="#" className="text-white ms-2">
                <FaFacebook />
              </a>
              <a href="#" className="text-white ms-1">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-lg-end mt-2 mt-lg-0">
              <a href="#" className="text-white text-decoration-none">
                <FaBell className="me-1" />
                Thông Báo
              </a>
              <a href="#" className="text-white text-decoration-none">
                <FaQuestionCircle className="me-1" />
                Hỗ Trợ
              </a>
              <a href="#" className="text-white text-decoration-none">🌐 Tiếng Việt</a>
              <a href="#" className="text-white text-decoration-none">Đăng Ký</a>
              <a href="#" className="text-white text-decoration-none">Đăng Nhập</a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo, Search, Cart */}
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          <div className="col-12 col-md-auto text-center text-md-start mb-2 mb-md-0">
            <h2 className="fw-bold m-0">🛒 Shopee</h2>
          </div>
          <div className="col-12 col-md">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
              />
              <button className="btn btn-light">
                <FaSearch />
              </button>
            </div>
            <div className="mt-2 d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              {[
                'Áo Kiểu Nữ',
                'Điện Thoại iPhone 6 Giá Rẻ',
                'Dép',
                'Đồ Đá Banh 1k',
                'Sale 1k',
              ].map((item, i) => (
                <a key={i} href="#" className="text-white text-decoration-none small">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-auto text-center mt-2 mt-md-0">
            <a href="#" className="text-white fs-4">
              <FaShoppingCart />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
