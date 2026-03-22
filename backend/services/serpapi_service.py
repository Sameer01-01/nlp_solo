from serpapi import GoogleSearch
import os

API_KEY = os.getenv("SERP_API_KEY", "9ab687c76ede93b0562df8149e48973f54980eff39ad3034cac27befbe36f122")

def fetch_products(query: str):
    params = {
      "engine": "google_shopping",
      "q": query,
      "hl": "en",
      "gl": "us",
      "api_key": API_KEY
    }
    
    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        
        shopping_results = results.get("shopping_results", [])
        
        products = []
        for item in shopping_results:
            if "rating" in item and "reviews" in item:
                products.append({
                    "title": item.get("title", ""),
                    "rating": float(item.get("rating", 0.0)),
                    "reviews": int(item.get("reviews", 0)),
                    "thumbnail": item.get("thumbnail", "")
                })
            if len(products) >= 5:
                break
                
        # Fallback if no products matched criteria
        if not products:
            for item in shopping_results[:5]:
                products.append({
                    "title": item.get("title", ""),
                    "rating": float(item.get("rating", 0.0)),
                    "reviews": int(item.get("reviews", 0)),
                    "thumbnail": item.get("thumbnail", "")
                })
                
        return products
    except Exception as e:
        print(f"SerpAPI Error: {e}")
        return []
