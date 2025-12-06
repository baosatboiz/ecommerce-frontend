import requests
import json

BASE_URL = "https://tiki.vn/api/v2/products"
HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://tiki.vn/"
}

def get_products(query="áo", limit=3, page=1):
    """Gọi API tìm kiếm sản phẩm"""
    url = f"{BASE_URL}?q={query}&limit={limit}&page={page}&aggregations=2&include=advertisement"
    resp = requests.get(url, headers=HEADERS)
    data = resp.json()
    return data.get("data", [])

def get_product_detail(product_id):
    """Lấy chi tiết sản phẩm (bao gồm biến thể)"""
    url = f"{BASE_URL}/{product_id}"
    resp = requests.get(url, headers=HEADERS)
    return resp.json()

def extract_images(detail_or_variant, fallback_url=None):
    """
    Lấy danh sách hình ảnh từ detail (product) hoặc variant.
    Nếu là dict variant có key 'images' dạng list str hoặc list dict.
    """
    images = []
    for img in detail_or_variant.get("images", []):
        if isinstance(img, dict):
            url = img.get("large_url") or img.get("base_url")
        else:
            url = img
        if url:
            images.append(url)
    if not images and fallback_url:
        images = [fallback_url]
    return images

def main():
    products = get_products(query="áo",limit=5,page=1)

    result = []

    for p in products:
        master_id = p.get("id")
        detail = get_product_detail(master_id)

        # Lấy tên options từ cha
        option_names = [opt.get("name") for opt in detail.get("configurable_options", [])]

        # Lấy variants (child products)
        variants = []
        for v in detail.get("configurable_products", []):
            child_id = v.get("child_id")
            child_detail = get_product_detail(child_id)  # gọi thêm để lấy qty

            # Map option1, option2... với tên cha
            option_values = {}
            for i, opt_name in enumerate(option_names, start=1):
                key = f"option{i}"
                option_values[opt_name] = v.get(key)

            # Lấy hình ảnh variant: ưu tiên ảnh riêng của variant, fallback về ảnh cha
            variant_images = extract_images(v, fallback_url=p.get("thumbnail_url"))

            variants.append({
                "id": child_id,
                "sku": v.get("sku"),
                "price": v.get("price"),
                "status": v.get("inventory_status"),
                "url_key": v.get("url_key"),
                "qty": child_detail.get("stock_item", {}).get("qty"),
                "attributes": option_values,
                "images": variant_images
            })

        # Lấy hình ảnh cha
        product_images = extract_images(detail, fallback_url=p.get("thumbnail_url"))

        # Gom vào object sản phẩm cha
        product_obj = {
            "id": master_id,
            "name": p.get("name"),
            "price": p.get("price"),
            "description" : detail.get("description"),
            "thumbnail": p.get("thumbnail_url"),
            "images": product_images,
            "options": detail.get("configurable_options", []),
            "variants": variants
        }
        result.append(product_obj)

    # Xuất JSON ra file
    with open("products.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print("Đã lưu dữ liệu vào products.json")

if __name__ == "__main__":
    main()
