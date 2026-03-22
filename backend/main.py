from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from nlp.sentiment import get_overall_sentiment, get_aspect_sentiment
from nlp.aspect_extractor import extract_aspects
from nlp.summarizer import generate_summary
from utils.preprocess import preprocess_text
from services.serpapi_service import fetch_products
from services.review_fetcher import generate_mock_reviews
from services.aggregator import aggregate_results

app = FastAPI(title="Explainable Aspect-Based Sentiment Analyzer")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewRequest(BaseModel):
    review: str

class AspectResponse(BaseModel):
    aspect: str
    sentiment: str

class AnalysisResponse(BaseModel):
    overall_sentiment: str
    aspects: list[AspectResponse]
    summary: str

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_review(req: ReviewRequest):
    text = req.review
    
    # 1. Preprocessing
    tokens = preprocess_text(text)
    
    # 2. Overall Sentiment
    overall_sent = get_overall_sentiment(text)
    
    # 3. Aspect Extraction
    extracted_aspects = extract_aspects(text)
    
    # 4. Aspect-Based Sentiment Analysis
    aspect_list = []
    for aspect in extracted_aspects:
        sentiment = get_aspect_sentiment(text, aspect)
        aspect_list.append({"aspect": aspect, "sentiment": sentiment})
        
    # 5. Summarization
    summary = generate_summary(aspect_list, overall_sent)
    
    return AnalysisResponse(
        overall_sentiment=overall_sent,
        aspects=aspect_list,
        summary=summary
    )

class ProductQueryRequest(BaseModel):
    query: str

@app.post("/analyze-product")
async def analyze_product(req: ProductQueryRequest):
    query = req.query
    
    # 1. Fetch products from SerpAPI
    try:
        products = fetch_products(query)
    except Exception:
        products = []
    
    # 2. Simulate large-scale reviews dataset
    # Restricted to a reasonable pool size so CPU inference finishes accurately without freezing
    mock_reviews = generate_mock_reviews(query, count=45)
    
    # 3 & 4. Run NLP pipeline and Aggregate Insights
    response_data = aggregate_results(mock_reviews, products)
    
    # Combine the payload
    response_data["products"] = products
    
    return response_data

if __name__ == "__main__":
    # Trigger hot-reload to apply NumPy environment fixes
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
