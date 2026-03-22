from nlp.sentiment import get_overall_sentiment
from nlp.emotion import get_emotion

def aggregate_results(reviews: list[str]) -> dict:
    aggregation = {
        "total_reviews": len(reviews),
        "sentiment_distribution": {
            "positive": 0,
            "negative": 0,
            "neutral": 0
        },
        "emotion_distribution": {
            "happy": 0,
            "angry": 0,
            "sad": 0,
            "neutral": 0
        }
    }
    
    for text in reviews:
        sent = get_overall_sentiment(text).lower()
        if sent in aggregation["sentiment_distribution"]:
            aggregation["sentiment_distribution"][sent] += 1
        else:
            aggregation["sentiment_distribution"]["neutral"] += 1
            
        emo = get_emotion(text).lower()
        if emo in aggregation["emotion_distribution"]:
            aggregation["emotion_distribution"][emo] += 1
        else:
            aggregation["emotion_distribution"]["neutral"] += 1
            
    return aggregation
