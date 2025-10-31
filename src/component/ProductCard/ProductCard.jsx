import './index.css'
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  if (!product) return null;
  const navigate = useNavigate();
  const imageUrl = Array.isArray(product.imageUrls) && product.imageUrls.length > 0 
    ? product.imageUrls[0] 
    : null;

  const resolvedImageUrl = imageUrl?.startsWith("/upload")
    ? `${import.meta.env.VITE_API_URL}${imageUrl}`
    : imageUrl;

  return (
      <div className="card h-100 card-hover" onClick={()=>navigate(`/product/${product.id}`)}>
        {resolvedImageUrl && (
          <img
            loading="lazy"
            src={resolvedImageUrl}
            className="card-img-top object-fit-contain"
            style={{ height: "180px" }}
            alt={product.name}
          />
        )}
        <div className="card-body py-2">
          <p className="card-title mb-1 text-truncate" title={product.name}>
            {product.name}
          </p>
          <p className="card-text text-danger fw-bold">
            {Number(product.price).toLocaleString("vi-VN")} VND
          </p>
        </div>
      </div>
  );
}
