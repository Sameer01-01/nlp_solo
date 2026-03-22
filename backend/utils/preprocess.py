import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os

# Set custom NLTK data path if needed, or rely on default
# Try downloading NLTK datasets safely
try:
    nltk.download('stopwords', quiet=True)
    nltk.download('punkt', quiet=True)
    nltk.download('punkt_tab', quiet=True)
except Exception:
    pass

def preprocess_text(text: str) -> list:
    """
    Lowercases text, tokenizes, and removes stopwords.
    Returns a list of tokens.
    """
    text = text.lower()
    try:
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
        return filtered_tokens
    except Exception:
        # Fallback if NLTK fails to load punkt
        tokens = text.split()
        return [word for word in tokens if word.isalnum()]
