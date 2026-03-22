def generate_summary(aspects: list, overall: str) -> str:
    """
    Generates a 1-2 line summary. 
    Using a rule-based logic to keep ML simple and avoid heavy memory usage.
    """
    if not aspects:
        return f"Overall, the customer had a {overall.lower()} experience."
    
    positives = [a['aspect'] for a in aspects if a['sentiment'] == 'Positive']
    negatives = [a['aspect'] for a in aspects if a['sentiment'] == 'Negative']
    
    summary_parts = []
    if positives:
        if len(positives) > 2:
            pos_text = ", ".join(positives[:-1]) + ", and " + positives[-1]
        else:
            pos_text = " and ".join(positives)
        summary_parts.append(f"liked the {pos_text}")
        
    if negatives:
        if len(negatives) > 2:
            neg_text = ", ".join(negatives[:-1]) + ", and " + negatives[-1]
        else:
            neg_text = " and ".join(negatives)
        summary_parts.append(f"disliked the {neg_text}")
        
    if not summary_parts:
        return f"The review reflects a {overall.lower()} sentiment overall."
        
    if len(summary_parts) == 1:
        return f"Customers {summary_parts[0]}."
    else:
        return f"Customers {summary_parts[0]}, but {summary_parts[1]}."
