import requests
import json
import time

BASE_LIST_URL = "https://tiki.vn/api/v2/products"
BASE_DETAIL_URL = "https://tiki.vn/api/v2/products/{}"

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://tiki.vn/"
}

def get_products(query, limit=20, page=1):
    url = f"{BASE_LIST_URL}?q={query}&limit={limit}&page={page}&aggregations=2"
    return requests.get(url, headers=HEADERS).json().get("data", [])

def get_product_detail(pid):
    url = BASE_DETAIL_URL.format(pid)
    return requests.get(url, headers=HEADERS).json()

def extract_images(obj, fallback=None):
    images = []
    for img in obj.get("images", []):
        if isinstance(img, dict):
            images.append(img.get("large_url") or img.get("base_url"))
        else:
            images.append(img)
    return images or ([fallback] if fallback else [])

def main():
    products = get_products("điện thoại", limit=20)
    result = []
    all_category_ids = set()

    print(f"🔍 Crawl {len(products)} products")

    for p in products:
        pid = p["id"]
        print(f"📦 Product {pid}")

        detail = get_product_detail(pid)
        time.sleep(0.2)

        category_ids = p.get("category_ids", [])
        all_category_ids.update(category_ids)

        result.append({
            "id": pid,
            "name": p.get("name"),
            "price": p.get("price"),
            "category_ids": category_ids,
            "thumbnail": p.get("thumbnail_url"),
            "description": detail.get("description"),
            "images": extract_images(detail, p.get("thumbnail_url"))
        })

    with open("products.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    with open("category_ids.json", "w") as f:
        json.dump(sorted(list(all_category_ids)), f, indent=2)

    print(f"✅ Saved products.json ({len(result)})")
    print(f"📁 Extracted {len(all_category_ids)} category ids")

if __name__ == "__main__":
    main()
