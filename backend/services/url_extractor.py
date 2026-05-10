import requests
from bs4 import BeautifulSoup

def extract_text_from_url(url):
    """
    Extracts the main article text from a given URL.
    """
    try:
        res = requests.get(url, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, 'html.parser')

        # Try to find the main content
        # Common tags for news articles
        paragraphs = soup.find_all('p')
        text = " ".join(p.get_text() for p in paragraphs)
        
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from URL: {e}")
        return ""
