import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../fetchModelData/fetchModel";
import TopBar2 from "./Topbar2";
import DOMPurify from 'dompurify';


export default function ProductDetail({}){
    const [product,setProduct] = useState();
    const [mainImg,setMainImg] = useState();
    const [hover,setHover] = useState(null);
    const [clicked,setClicked] = useState({});
    const {id} = useParams();
    const [price,setPrice] = useState();
    useEffect(()=>{
        const fetch = async () =>{
            const data = await fetchModel(`/product/${id}`);
            setProduct(data);
            setMainImg(data?.imageUrls[0]||'')
            setPrice(data.price.toLocaleString("vi-VN"));
        }
        fetch();
    },[id])
    useEffect(()=>{
        const allClicked = product?.options?.every(opt=>clicked[opt.name]);
        if(allClicked){
            const variant = product.variants.find((v)=>Object.entries(v.attributes).every(([key,value])=>clicked[key]===value));
            if(variant) setPrice(variant.price);
        }
    },[clicked])
    const images = product?.imageUrls||[];
    const description = DOMPurify.sanitize(product?.description||'');
    return (
        <div className="bg-light">
            <TopBar2/>
            <div className="container bg-white mt-4">
                <div className="row">
                    <div className="col-lg-5 col-12 text-center">
                        <img src={mainImg} alt="" className="img-fluid" style={{height:"400px"}}/>
                        <div className="d-flex flex-row gap-2 overflow-auto">
                        {images&&images.map(i=>
                         <img src={i} className="object-fit-contain" style={{height:"80px",width:"80px",cursor:"pointer",border: mainImg===i? "2px solid #ee4d2d"
                            : "2px solid transparent",}} onMouseEnter={()=>{setMainImg(i)}}/>
                    )}
                        </div>

                    </div>
                    <div className="col-lg-7 col-12">
                        {product?<>
                        <h1 className="h5">{product.name}</h1>
                        <div className="bg-light px-3">
                            <p className="fs-3 text-danger fw-medium">{price} VND</p>
                        </div>
                        {product.options.length!==0?
                        <div className="d-flex flex-column gap-2">
                        {product.options.map(option=>
                            <div className="d-flex text-dark-emphasis gap-2">
                                <p className="col-2">{option.name}</p>
                                <div className="col-10 d-flex gap-2 flex-wrap">
                                    {option.optionValueSet.map(ov=>
                                        <button className="position-relative p-2" style={{border:clicked[option.name]===ov.value||hover===ov.value?"1px solid red":"1px solid transparent"}} onMouseEnter={()=>setHover(ov.value)} 
                                        onMouseLeave={()=>setHover(null)}
                                        onClick={() =>
                                            setClicked(prev => ({
                                              ...prev,
                                              [option.name]:ov.value
                                            }))
                                          }                                                                                  >
                                        {ov.value}
                                        {ov.value===clicked[option.name]?
                                        <span className="d-block position-absolute bottom-0 end-0 text-end" style={{height:"20px",width:"20px", background:"red", clipPath:"polygon(0 100%,100% 0,100% 100%)"}}>    ✓   </span>
                                        :<></>}
                                        </button>)
                                    }
                                    </div>
                            </div>
                        )}
                        </div>
                        :
                        
                        <p>Null</p>}
                        <div className="row  ms-0 gap-3 mt-4">
                            <button className="col-4 p-2 bg-danger text-white border border-0">Mua ngay</button>
                            <button className="col-5 p-2 border border-danger text-danger">Thêm vào giỏ hàng</button>
                        </div>
                        </>
                        :<h3>Loading...</h3>
                        }
                    </div>
                </div>
            </div>
            <div className="container mt-4">
            <div className="row">
                    <div className="col-lg-10 col-12 bg-white" dangerouslySetInnerHTML={{__html:description}}></div>
                    <div className="col-lg-2 col-12 bg-light"></div>
                </div>
            </div>
        </div>
    )
}