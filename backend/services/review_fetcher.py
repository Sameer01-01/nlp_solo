import random

def generate_mock_reviews(query: str, count: int = 50) -> list[str]:
    """
    Simulates loading a local dataset and filtering by keyword.
    Generates realistic looking reviews based on the search query 
    to properly test the aggregation speed and capabilities.
    """
    templates = [
        "The {query} is absolutely fantastic! Best purchase I've made.",
        "I hate this {query}. It broke after two days and customer service was awful.",
        "This {query} is okay, but it's not exactly what I expected.",
        "So happy with my new {query}. Highly recommend it to everyone!",
        "Terrible quality. I am very angry about how much I paid for this.",
        "It's a decent {query} for the price. Delivery was fast.",
        "I was really disappointed when I opened the box and saw it was damaged.",
        "Incredible! It works perfectly.",
        "Do not buy this {query}. Waste of money and completely useless.",
        "It is just standard, nothing special."
    ]
    
    adjectives_pos = ["great", "awesome", "perfect", "excellent"]
    adjectives_neg = ["terrible", "awful", "bad", "disappointing"]
    
    reviews = []
    
    for _ in range(count):
        template = random.choice(templates)
        review_text = template.replace("{query}", query.lower())
        
        # Add random secondary sentences to vary length/complexity
        if random.random() > 0.5:
            if "!" in review_text:
                review_text += f" It's {random.choice(adjectives_pos)} overall."
            elif "hate" in review_text or "Terrible" in review_text or "Do not buy" in review_text:
                review_text += f" It's just {random.choice(adjectives_neg)}."
                
        reviews.append(review_text)
        
    return reviews
