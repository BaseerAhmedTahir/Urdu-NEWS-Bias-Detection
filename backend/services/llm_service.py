import os
import sys
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def get_client():
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        print("WARNING: DEEPSEEK_API_KEY is missing or invalid. LLM features will not work.")
        return None
    return OpenAI(
        api_key=api_key,
        base_url="https://api.deepseek.com"
    )

def explain_bias(sentence_data):
    """
    Generates short user-friendly Urdu explanations
    aligned with dataset annotation guidelines.
    """

    sentence = sentence_data.get("sentence", "")
    prediction = sentence_data.get("prediction", "biased")
    top_words = sentence_data.get("top_words", [])

    print(f"\n>>> [LLM DEBUG] EXPLAIN REQUEST FOR: {sentence[:50]}...")
    sys.stdout.flush()

    client = get_client()

    if not client:
        return "سسٹم کو ایل ایل ایم کی کلید نہیں ملی۔ براہ کرم .env فائل چیک کریں۔"

    urdu_stopwords = {
        "ہے", "ہیں", "تھا", "تھی",
        "میں", "کو", "کا", "کی",
        "کے", "اور", "سے", "پر"
    }

    filtered_words = []

    for word in top_words:
        word = str(word).strip()

        if (
            len(word) > 1 and
            word not in urdu_stopwords
        ):
            filtered_words.append(word)

    words_text = ", ".join(filtered_words[:5])


    prompt = f"""
    آپ اردو میڈیا بائس کی وضاحت کرنے والے ماہر ہیں۔

    جملہ:
    "{sentence}"

    نمایاں الفاظ:
    [{words_text}]

    لیبل:
    {prediction}

    ہدایات:
    1. مختصر اور آسان اردو میں وضاحت کریں۔
    2. واضح کریں کہ کون سے الفاظ یا اندازِ بیان جملے کو فریقانہ، جذباتی یا یک طرفہ بنا رہے ہیں۔
    3. وضاحت درج ذیل اصولوں کے مطابق ہونی چاہیے:
    - Subjective framing
    - One-sided wording
    - Emotional or judgmental language
    - Assertive or factive wording
    4. تکنیکی اصطلاحات، ماڈل اسکور یا semantic signals کا ذکر نہ کریں۔
    5. کوئی بیرونی یا فرضی تشریح شامل نہ کریں۔
    6. جواب زیادہ سے زیادہ 2 جملوں پر مشتمل ہو۔

    صرف مختصر اردو وضاحت فراہم کریں۔
    """

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You explain Urdu media bias using only the provided sentence "
                        "and highlighted words. Do not hallucinate or add political, "
                        "racial, religious, or social assumptions."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=140,
            temperature=0.2
        )

        content = response.choices[0].message.content.strip()

        print(">>> [LLM DEBUG] EXPLAIN RESPONSE SUCCESS.")
        sys.stdout.flush()

        if not content:
            return "ایل ایل ایم نے خالی جواب دیا۔"

        return content

    except Exception as e:
        print(f">>> [LLM DEBUG] EXPLAIN ERROR: {str(e)}")
        sys.stdout.flush()

        return "معذرت، اس وقت وضاحت فراہم کرنے میں دشواری ہو رہی ہے۔"

def rewrite_unbiased(sentence):
    """
    Rewrites a biased Urdu sentence into a neutral,
    journalistic, and objective version.
    """

    print(f"\n>>> [LLM DEBUG] REWRITE REQUEST FOR: {sentence[:50]}...")
    sys.stdout.flush()

    client = get_client()

    if not client:
        return "سسٹم کو ایل ایل ایم کی کلید نہیں ملی۔ براہ کرم .env فائل چیک کریں۔"

    prompt = f"""
    آپ ایک پیشہ ور اردو نیوز ایڈیٹر ہیں۔

    درج ذیل جملے کو غیرجانبدار، صحافتی اور متوازن انداز میں دوبارہ لکھیں۔

    قواعد:
    1. اصل معلومات اور مرکزی مفہوم برقرار رکھیں۔
    2. جذباتی، فریقانہ یا مبالغہ آمیز الفاظ ہٹا دیں۔
    3. جانبدار افعال یا اصطلاحات کو غیرجانبدار الفاظ سے تبدیل کریں۔
    4. ایسے الفاظ ہٹا دیں جو کسی فریق کو غیر ضروری طور پر مثبت یا منفی انداز میں پیش کریں۔
    5. کوئی نئی معلومات شامل نہ کریں۔
    6. جملے کو مختصر، واضح اور صحافتی انداز میں رکھیں۔
    7. جواب میں صرف غیرجانبدار جملہ فراہم کریں۔

    جملہ:
    "{sentence}"
    """

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a professional Urdu news editor specializing "
                        "in neutral, factual, and objective journalistic rewriting. "
                        "You must remove emotional framing and one-sided wording "
                        "without changing the core facts."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=180,
            temperature=0.2
        )

        content = response.choices[0].message.content.strip()

        if not content:
            return "ایل ایل ایم نے خالی جواب دیا۔"

        print(">>> [LLM DEBUG] REWRITE RESPONSE SUCCESS.")
        sys.stdout.flush()

        return content

    except Exception as e:
        print(f">>> [LLM DEBUG] REWRITE ERROR: {str(e)}")
        sys.stdout.flush()

        return "معذرت، اس وقت متن کو دوبارہ لکھنے میں دشواری ہو رہی ہے۔"