import TopBar2 from "./Topbar2";
import { useState, useEffect } from "react";
import fetchModel from "../fetchModelData/fetchModel";
import ProductCard from "./ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function SearchResult() {
  const [products, setProducts] = useState([]);
  const [searchParam] = useSearchParams();
  const key = searchParam.get('key')||null;
  useEffect(() => {
    const fetchData = async () => {
      const url = key ? `/product?keyWord=${key}`:'/product'
      const data = await fetchModel(url);
      setProducts(data || []);
    };
    fetchData();
  }, [key]);

  return (
    <div>
      <TopBar2 />
      <div className="container-fluid bg-light px-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 d-none d-md-block bg-white">
            eeeea
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-10">
            <div className="row">
              {products.map((p, index) => (
                <div
                  key={p.id || index} // tránh warning key
                  className="col-lg-3 col-md-4 col-6 p-2"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
