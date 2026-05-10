# Urdu Bias Detection Web Application

This project is a full-stack application for detecting bias in Urdu news text and URLs.

## Features
- **Direct Text Input:** Paste Urdu text to analyze its bias.
- **URL-based Extraction:** Provide a URL to a news article to analyze its content.
- **Urdu Validation:** Ensures the input is in Urdu.
- **ML Pipeline:** Uses TF-IDF and LaBSE embeddings with a Logistic Regression classifier.

## Project Structure
- `backend/`: FastAPI server with the ML model and services.
- `frontend/`: Next.js web interface with RTL support.
- `train_final_model.py`: Script to train and save the final model.

## Setup & Running

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Train the model (if not already trained):
   ```bash
   python train_final_model.py
   ```
3. Start the backend:
   ```bash
   cd backend
   python app.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The web app will be available at `http://localhost:3000`.
