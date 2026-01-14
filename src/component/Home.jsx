import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard/ProductCard";
import TopBar2 from "./Topbar2";
import fetchModel from "../fetchModelData/fetchModel";
import CategoryCard from "./CategoryCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadRef = useRef(null);

  // CATEGORY
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchModel('/category');
      setCategory(data);
    };
    fetchData();
  }, []);

  // PRODUCT PAGE
  useEffect(() => {
    const fetchData = async () => {
      console.log("FETCH PAGE:", pageNumber);
      setLoading(true);

      const data = await fetchModel(`/product?page=${pageNumber}`);
      console.log("RESPONSE:", data);

      if (data.content.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setProducts(prev => [...prev, ...data.content]);

      if (data.last) setHasMore(false);

      setLoading(false);
    };

    if (hasMore) fetchData();
  }, [pageNumber]);

  // OBSERVER FIXED
useEffect(() => {
  if (!loadRef.current) return;

  const ob = new IntersectionObserver(
    (entries) => {
      if (loading) return;

      if (entries[0].isIntersecting && hasMore) {
        console.log("👉 LOAD NEXT PAGE:", pageNumber + 1);
        setPageNumber(prev => prev + 1);
      }
    }  );

  ob.observe(loadRef.current);
  return () => ob.disconnect();
}, [hasMore, loading]);


  return (
    <div>
      <TopBar2 />

      <div className="container">

        {/* CATEGORY */}
        <div className="d-flex overflow-auto gap-0">
          {category.map(c =>
            <div className="flex-shrink-0 border border-light-subtle d-flex align-items-center justify-content-center"
              style={{ width:"120px", height:"170px" }}>
              <CategoryCard category={c} />
            </div>
          )}
        </div>

        {/* PRODUCT */}
        <div className="row">
          {products.map(p =>
            <div className="col-lg-2 col-md-4 col-6 p-2">
              <ProductCard product={p} />
            </div>
          )}
        </div>

        {/* SPINNER */}
        {loading && (
          <div className="w-100 text-center p-3">
            <div className="spinner-border" role="status"></div>
          </div>
        )}

        {!hasMore && (
          <p className="text-center text-secondary py-3">Hết dữ liệu</p>
        )}

        {/* LOAD TARGET – CHỐNG AUTO LOAD */}
        <div
          ref={loadRef}
          style={{
            height: "30px",
          }}
        ></div>

      </div>
    </div>
  );
}
