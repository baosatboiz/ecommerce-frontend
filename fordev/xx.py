import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def get_shopee_json_final(keyword):
    print("--> Đang kết nối vào Chrome (Port 9222)...")
    
    chrome_options = Options()
    chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
    except:
        print("LỖI: Hãy mở Chrome chế độ Debug trước!")
        return

    # 1. Điều hướng (nếu cần)
    if "shopee.vn" not in driver.current_url:
        driver.get("https://shopee.vn")
        time.sleep(2)

    print(f"--> Đang gọi API lấy dữ liệu cho: {keyword}...")

    # 2. Inject JavaScript fetch()
    js_script = f"""
        var callback = arguments[arguments.length - 1];
        var url = 'https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword={keyword}&limit=100&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2';
        
        fetch(url, {{
            method: 'GET',
            headers: {{ 'Content-Type': 'application/json' }}
        }})
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => callback(null));
    """

    # 3. Thực thi
    try:
        json_data = driver.execute_async_script(js_script)
        
        if not json_data:
            print("Lỗi: Không có dữ liệu trả về (Hãy F5 trang web và thử lại).")
            return

        items = json_data.get('items', [])
        if not items: items = json_data.get('item_basic', [])

        print(f"--> BINGO! Lấy được {len(items)} sản phẩm.")
        
        # 4. Xử lý dữ liệu sang List of Dictionaries (Chuẩn JSON)
        product_list = []
        for item in items:
            basic = item.get('item_basic', item)
            
            # Xử lý giá
            raw_price = basic.get('price')
            price = int(raw_price / 100000) if raw_price else 0
            
            # Lấy list ảnh (CSV không lưu được cái này đẹp, nhưng JSON thì vô tư)
            images = [f"https://down-vn.img.susercontent.com/file/{img}" for img in basic.get('images', [])]

            product_obj = {
                "itemid": basic.get('itemid'),
                "shopid": basic.get('shopid'),
                "name": basic.get('name'),
                "price": price,
                "sold": basic.get('historical_sold'),
                "rating": round(basic.get('item_rating', {}).get('rating_star', 0), 2),
                "location": basic.get('shop_location'),
                "images": images, # Lưu mảng ảnh
                "link": f"https://shopee.vn/product/{basic.get('shopid')}/{basic.get('itemid')}"
            }
            product_list.append(product_obj)

        # 5. XUẤT FILE JSON
        if product_list:
            filename = f"shopee_data_{keyword}.json"
            
            with open(filename, 'w', encoding='utf-8') as f:
                # ensure_ascii=False: Giữ nguyên tiếng Việt có dấu
                # indent=4: Format code đẹp, dễ đọc
                json.dump(product_list, f, ensure_ascii=False, indent=4)
                
            print(f"--> XONG! Đã lưu file JSON tại: {filename}")
        
    except Exception as e:
        print(f"Có lỗi xảy ra: {e}")

# --- CHẠY ---
keyword = input("Nhập từ khóa: ")
get_shopee_json_final(keyword)