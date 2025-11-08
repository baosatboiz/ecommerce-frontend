import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBell,
    FaQuestionCircle,
    FaShoppingCart,
    FaFacebook,
    FaInstagram,
    FaSearch,
  } from 'react-icons/fa';
import fetchModel from '../fetchModelData/fetchModel';
export default function TopBar2(){
    const [input,setInput] = useState("");
    const navigate = useNavigate();
    const handleSearch = ()=>{
        navigate(`/search?key=${input}`)
    }
    const handleKeyDown = (e)=>{
        if(e.key==='Enter') handleSearch();
    }
    return (
        <div className="container-fluid px-lg-5 bg-danger text-white small">
            <div className="row border-bottom border-light py-1 px-md-5">
                <div className="d-flex flex-wrap gap-1 col-12 col-md-6 justify-content-center justify-content-lg-start">
                    <a className="text-white text-decoration-none" href="">Kênh người bán</a>
                    <span>|</span>
                    <a className='text-white text-decoration-none' href="">Trở thành người bán</a>
                    <span>|</span>
                    <a className='text-white text-decoration-none' href="">Tải ứng dụng</a>
                    <span>|</span>
                    <div className='d-flex gap-2'>
                    <span>Kết nối</span>
                    <a className="text-white" href=""><FaFacebook/></a>
                    <a className="text-white" href=""><FaInstagram/></a>
                    </div>
                </div>
                <div className='col-12 col-md-6 d-flex flex-wrap gap-3 justify-content-center justify-content-lg-end '>
                    <a className="text-white text-decoration-none"href=""><FaBell/> Thông báo</a>
                    <a className="text-white text-decoration-none"href=""><FaQuestionCircle/> Hỗ trợ</a>
                    <a className="text-white text-decoration-none"href="">Đăng ký</a>
                    <span>|</span>
                    <a className="text-white text-decoration-none"href="">Đăng nhập</a>

                </div>
            </div>
            <div className='row align-items-center py-1 px-md-5'>
                <div className='col-auto d-none d-sm-block'>
                    <h2>🛒 Shopee</h2>
                </div>
                <div className='col'>
                    <div className="input-group">
                    <input className='form-control' placeholder='Nhập từ khoá sản phẩm' value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown}></input>
                    <button className='btn btn-light' onClick={handleSearch}><FaSearch/></button>
                    </div>
                </div>
                <div className="col-auto text-center pb-1">
                            <a title='Giỏ hàng' href="#" className="text-white fs-4">
                              <FaShoppingCart />
                            </a>
                          </div>
            </div>
        </div>
    )
}