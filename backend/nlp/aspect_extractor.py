import spacy

# Load spaCy English model safely
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def extract_aspects(text: str) -> list:
    """
    Extracts noun chunks as aspects using spaCy.
    """
    doc = nlp(text)
    aspects = []
    for chunk in doc.noun_chunks:
        # Filter out pronouns
        if chunk.root.pos_ != "PRON":
            aspects.append(chunk.text.lower().strip())
    
    # Remove duplicates while preserving order
    unique_aspects = list(dict.fromkeys(aspects))
    return unique_aspects
