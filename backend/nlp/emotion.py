from transformers import pipeline

try:
    # Use j-hartmann's DistilRoBERTa emotion model as requested
    emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
except Exception as e:
    emotion_classifier = None
    print(f"Failed to load emotion model: {e}")

def get_emotion(text: str) -> str:
    """
    Returns the dominant emotion: Happy, Angry, Sad, Neutral.
    Model default labels: anger, disgust, fear, joy, neutral, sadness, surprise.
    """
    if not emotion_classifier:
        return "Neutral"
    
    try:
        # truncate text payload to prevent token max-length errors
        result = emotion_classifier(text[:512])[0]
        label = result['label'].lower()
        
        if label in ['joy', 'surprise']:
            return 'Happy'
        elif label in ['anger', 'disgust']:
            return 'Angry'
        elif label in ['sadness', 'fear']:
            return 'Sad'
        else:
            return 'Neutral'
    except Exception:
        return "Neutral"
