import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def extract_text_from_url(url):
    """
    Extracts the main article text from a given URL.
    Prioritizes <article> tags and falls back to <p> tags.
    """
    try:
        res = requests.get(url, timeout=15, headers=HEADERS)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, 'html.parser')

        # Remove script, style, nav, footer, header noise
        for tag in soup.find_all(['script', 'style', 'nav', 'footer', 'header', 'aside']):
            tag.decompose()

        # Strategy 1: Try <article> tag first (most news sites use this)
        article = soup.find('article')
        if article:
            paragraphs = article.find_all('p')
            text = " ".join(p.get_text() for p in paragraphs)
            if text.strip():
                return text.strip()

        # Strategy 2: Look for common news content containers
        for selector in ['.article-body', '.story-body', '.entry-content', '.post-content', '[itemprop="articleBody"]']:
            container = soup.select_one(selector)
            if container:
                paragraphs = container.find_all('p')
                text = " ".join(p.get_text() for p in paragraphs)
                if text.strip():
                    return text.strip()

        # Strategy 3: Fall back to all <p> tags but filter short ones (likely nav/footer text)
        paragraphs = soup.find_all('p')
        # Only keep paragraphs with meaningful length (>40 chars)
        meaningful = [p.get_text() for p in paragraphs if len(p.get_text().strip()) > 40]
        text = " ".join(meaningful)
        
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from URL: {e}")
        return ""
