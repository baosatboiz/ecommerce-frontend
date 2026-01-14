import { useState } from "react";
import Topbar2 from "./Topbar2";
import { useLocation } from "react-router-dom";
import fetchModel from "../fetchModelData/fetchModel";
export default function ProductCheckout() {
  const location = useLocation();
  const { items } = location.state || {};
  console.log(items);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const variant = items?Object.entries(items.attributes)
    .map(([key, value]) => `${key} ${value}`)
    .join(", "):null;

  const handlerOrder = async () => {
    const order = {
      address,
      phoneNumber : phone,
      orderItems:[
        {
          ...(variant?{variantId:items.id}:{productId:items.id}),
          quantity: items.quantity
        }
      ]
    }
    try{
      const data = await fetchModel("/order",{
      method:"POST",
      body:JSON.stringify(order)
    })
    console.log(data);
    alert('Đặt hàng thành công!');
  }
    catch(err){
      alert('Đã có lỗi xảy ra, vui lòng thử lại sau!');
      console.error(err);
    }
  };

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

      <div className="d-none d-md-block">
        <Topbar2 />
      </div>

      <div className="bg-white shadow-sm border-bottom py-3">
        <div className="container text-danger fw-bold">Thanh toán</div>
      </div>

      <div className="container mt-3">

        <div className="bg-white p-3 mb-3">
          <h5 className="mb-3">Thông tin nhận hàng</h5>

          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              rows={2}
              placeholder="Nhập địa chỉ nhận hàng"
            ></textarea>
          </div>
        </div>

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
              <div className="d-flex flex-column justify-content-center overflow-hidden">
                <p className="text-truncate m-0 ps-2">{items.productName}</p>
                {variant && (
                  <p className="text-truncate m-0 ps-2 fst-italic">
                    phân loại: {variant}
                  </p>
                )}
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

          {/* Mobile */}
          <div className="d-flex d-md-none justify-content-between flex-wrap p-3">
            <div className="d-flex" style={{ flex: "1 1 200px", minWidth: 0 }}>
              <img
                src={items.imgUrl}
                style={{ width: 80, height: 80, objectFit: "contain" }}
                className="flex-shrink-0"
              />
              <div className="d-flex flex-column justify-content-center align-items-start ps-2 overflow-hidden flex-grow-1">
                <p className="text-truncate fw-bold mb-1 w-100">
                  {items.productName}
                </p>
                <p className="text-danger m-0">
                  {items.price.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>

            <div className="d-flex align-items-end pe-2 flex-shrink-0">
              <p className="text-muted small m-0">x{items.quantity}</p>
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="d-flex flex-column me-sm-3 align-items-center align-items-sm-end">
            <div className="d-flex justify-content-between mt-3">
              <div className="text-nowrap me-3">
                <p>Tổng tiền hàng:</p>
                <p>Tổng tiền vận chuyển:</p>
                <p>Tổng tiền thanh toán:</p>
              </div>

              <div className="text-end">
                <p>{items.price.toLocaleString("vi-VN")}₫</p>
                <p>0₫</p>
                <p className="fw-bold text-danger">
                  {items.price.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>

            <div className="text-sm-end">
              <button onClick={handlerOrder} className="btn btn-danger w-100">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
