import re

def is_urdu(text):
    """
    Checks if the text contains a meaningful proportion of Urdu characters.
    Requires at least 30% of characters to be in the Urdu/Arabic Unicode range
    to filter out predominantly English or mixed-noise inputs.
    """
    if not text or len(text.strip()) == 0:
        return False
    # Remove whitespace and punctuation for ratio calculation
    cleaned = re.sub(r'\s+', '', text)
    if len(cleaned) == 0:
        return False
    # Urdu character range: \u0600-\u06FF (includes Arabic script used in Urdu)
    urdu_chars = len(re.findall(r'[\u0600-\u06FF]', cleaned))
    return (urdu_chars / len(cleaned)) > 0.3
