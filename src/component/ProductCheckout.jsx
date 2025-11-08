import { useState } from "react";
import Topbar2 from "./Topbar2";
import { useLocation } from "react-router-dom";

export default function ProductCheckout() {
  const location = useLocation();
  const { items } = location.state || {};
  console.log(items);

  // Nếu không có item, hiển thị thông báo
  if (!items) {
    return (
      <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <h3 className="text-muted">Không có sản phẩm để thanh toán</h3>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <style>
        {`
         @media(max-width:255px){
           .aligncenter{
             width:100%;
             text-align:center;
           }
         }
      `}
      </style>
      <div className="d-none d-md-block"><Topbar2 /></div>
      <div className="bg-white shadow-sm border-bottom py-3">
        <div className="container text-danger fw-bold">Thanh toán</div>
      </div>
      <div className="container mt-3">
        <div className="bg-white">
          <div className="bg-primary bg-opacity-10 px-3 py-1 mb-3">
            <h5 className="m-0">Shop: {items.productSeller}</h5>
          </div>
          <div className="d-none d-md-flex p-3">
            <div className="col-md-5">Sản phẩm</div>
            <div className="col-md-2 text-center">Số lượng</div>
            <div className="col-md-2 text-end">Đơn giá</div>
            <div className="col-md-3 text-end">Thành tiền</div>
          </div>
          <div className="d-none d-md-flex px-3">
            <div className="col-md-5 d-flex align-items-center">
              <img
                src={items.imgUrl}
                alt={items.name}
                style={{ height: "60px", width: "60px" }}
              />
              <div className="d-flex flex-column justify-content-center">
              <p className="text-truncate m-0 ps-2">{items.productName}</p>
              <p className="text-truncate m-0 ps-2">phân loại</p>
              </div>
            </div>
            <div className="col-md-2 justify-content-center d-flex align-items-center">
              {items.quantity}
            </div>
            <div className="col-md-2 justify-content-end d-flex align-items-center">
              {items.price.toLocaleString("vi-VN")}₫
            </div>
            <div className="col-md-3 justify-content-end d-flex align-items-center">
              {(items.price * items.quantity).toLocaleString("vi-VN")}₫
            </div>
          </div>

          <div className="d-flex d-md-none justify-content-between flex-wrap">
            <div className="d-flex flex-wrap">
              <img
                src={items.imgUrl}
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
              <div className="d-flex flex-column justify-content-between align-items-start ps-2">
                <p className="text-truncate" style={{ maxWidth: "120px" }}>
                  {items.productName}
                </p>
                <p className="text-danger m-0">
                  {items.price.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>
            <div className="d-flex align-items-end pe-2">
              <p className="text-muted small m-0">x{items.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
