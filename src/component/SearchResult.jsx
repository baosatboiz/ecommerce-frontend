import TopBar2 from "./Topbar2";
import { useState, useEffect } from "react";
import fetchModel from "../fetchModelData/fetchModel";
import ProductCard from "./ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function SearchResult() {
  const [products, setProducts] = useState(null);
  const [searchParam,setSearchParam] = useSearchParams();
  const keyWord = searchParam.get('keyWord')||"";
  const minPrice = searchParam.get('minPrice')||"";
  const maxPrice = searchParam.get('maxPrice')||"";
  const page = Number(searchParam.get('page'))||1;
  const [min,setMin] = useState(minPrice);
  const [max,setMax] = useState(maxPrice);
  const isDigit = (key) =>{
    return /^[0-9]*$/.test(key)&&key.length<=9;
  }
  const applyFilter = () =>{
    let params = {};
    if(keyWord) params.keyWord = keyWord;
    if(min) params.minPrice = min;
    if(max) params.maxPrice = max;
    params.page = 1;
    setSearchParam(params);
  }
  useEffect(() => {
  setMin(minPrice);
  setMax(maxPrice);
}, [minPrice, maxPrice]);

  useEffect(()=>{
    let url = '/product?';
    if(keyWord) url+=`keyWord=${keyWord}&`;
    if(minPrice) url+=`minPrice=${minPrice}&`;
    if(maxPrice) url+=`maxPrice=${maxPrice}&`;
    if(page) url+=`page=${page-1}&`;
    const fetchData = async () => {
      const data = await fetchModel(url);
      setProducts(data);
    }
    fetchData();
  },[keyWord,minPrice,maxPrice,page]);
  useEffect(() => {
    window.scrollTo({top:0});
  }, [searchParam]);
  return (
    <div>
      <TopBar2 />
      <div className="container-fluid bg-light px-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 d-none d-md-block bg-white">
           <p className="mt-3 fs-5 fw-bold "> Bộ Lọc Tìm Kiếm</p>
           <div>
            <p>Khoảng giá</p>
            <input placeholder="Từ" value={min} onChange={(e) => isDigit(e.target.value) && setMin(e.target.value)} style={{width:"45%"}}></input>
            <span> - </span>
            <input placeholder="Đến" value={max} onChange={(e) => isDigit(e.target.value) && setMax(e.target.value)} style={{width:"45%"}}></input>
            <button onClick={applyFilter}className="btn btn-danger w-100 my-2">Áp dụng</button>
           </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-10">
            <div className="row">
              {products&&products.content.map((p, index) => (
                <div
                  key={p.id || index} // tránh warning key
                  className="col-lg-3 col-md-4 col-6 p-2"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            {products&&<nav className = "d-flex justify-content-center my-4">
              <button className ={`btn btn-light mx-2 ${page===1?'d-none':'d-block'}`} onClick={()=>{
                setSearchParam({keyWord,minPrice,maxPrice,page:page-1});
              }}>{page-1}</button>
              <button className ="btn btn-danger mx-2">{page}</button>
              <button className ={`btn btn-light mx-2 ${page>=products.totalPages?'d-none':'d-block'}`} onClick={()=>{
                setSearchParam({keyWord,minPrice,maxPrice,page:page+1});
              }}>{page+1}</button>
            </nav>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
