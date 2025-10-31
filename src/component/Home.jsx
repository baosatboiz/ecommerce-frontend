import { useEffect, useState } from "react"
import ProductCard from "./ProductCard/ProductCard"
import TopBar from "./Topbar"
import TopBar2 from "./Topbar2"
import fetchModel from "../fetchModelData/fetchModel";
import CategoryCard from "./CategoryCard";
export default function Home(){
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);
    useEffect(()=> {
      const fetchData = async()=>{
        const data = await fetchModel('/category')
      setCategory(data);
      }
      fetchData();
    },[]);
    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchModel('/product');
          setProducts(data);
        };
        fetchData();
      }, []);
    return (
        <div>
            <TopBar2/>
            <div className="container">
              <div className="d-flex overflow-auto gap-0">
              {category.map(c=>                 
                   <div className="flex-shrink-0 border border-light-subtle d-flex align-items-center justify-content-center" style={{width:"120px",height:"170px"}}>
                    <CategoryCard category={c}></CategoryCard>
                  </div>
                )}
              </div>
                <div className="row">
                  {products&&
                  products.map(p=>
                  <div className="col-lg-2 col-md-4 col-6 p-2">
                  <ProductCard product={p}></ProductCard>
                  </div>)
                  }
            
                </div>
                </div>
        </div>
    )
}