from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from nlp.sentiment import get_overall_sentiment, get_aspect_sentiment
from nlp.aspect_extractor import extract_aspects
from nlp.summarizer import generate_summary
from utils.preprocess import preprocess_text

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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
