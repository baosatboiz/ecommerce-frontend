import requests
import json
import time

CATEGORY_URL = "https://tiki.vn/api/v2/categories/{}"

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://tiki.vn/"
}

def get_category(cid):
    url = CATEGORY_URL.format(cid)
    return requests.get(url, headers=HEADERS).json()

def main():
    with open("category_ids.json") as f:
        category_ids = json.load(f)

    categories = []

    print(f"🔍 Crawl {len(category_ids)} categories")

    for cid in category_ids:
        print(f"📂 Category {cid}")
        cat = get_category(cid)
        time.sleep(0.15)

        categories.append({
            "id": cat.get("id"),
            "name": cat.get("name"),
            "parent_id": cat.get("parent_id"),
            "level": cat.get("level"),
            "is_leaf": cat.get("is_leaf"),
            "status": cat.get("status"),
            "url_key": cat.get("url_key")
        })

    with open("categories.json", "w", encoding="utf-8") as f:
        json.dump(categories, f, ensure_ascii=False, indent=2)

    print(f"✅ Saved categories.json ({len(categories)})")

if __name__ == "__main__":
    main()
