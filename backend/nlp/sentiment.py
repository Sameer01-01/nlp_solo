from transformers import pipeline

# distilbert-base-uncased-finetuned-sst-2-english
try:
    classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    classifier = None
    print(f"Failed to load sentiment model: {e}")

def get_overall_sentiment(text: str) -> str:
    """
    Returns 'Positive' or 'Negative'.
    """
    if not classifier:
        return "Neutral"
    
    # truncate to 512 tokens to avoid errors
    result = classifier(text[:512])[0]
    return result['label'].capitalize()

def get_aspect_sentiment(text: str, aspect: str) -> str:
    """
    Simple approach: determine the sentiment of the sentence containing the aspect,
    or just use the overall sentiment if no complex logic is needed.
    """
    if not classifier:
        return "Neutral"
    
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        import spacy.cli
        spacy.cli.download("en_core_web_sm")
        nlp = spacy.load("en_core_web_sm")
    
    doc = nlp(text)
    # Find the sentence containing the aspect
    for sent in doc.sents:
        if aspect.lower() in sent.text.lower():
            result = classifier(sent.text[:512])[0]
            return result['label'].capitalize()
    
    # Fallback to overall sentiment
    return get_overall_sentiment(text)
