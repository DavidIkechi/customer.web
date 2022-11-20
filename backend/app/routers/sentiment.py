import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize


def sentiment(transcript):
    nltk.download('vader_lexicon')
    sentiment = SentimentIntensityAnalyzer().polarity_scores(transcript)
    if sentiment['neg'] > sentiment['pos']:
        overall_sentiment = "Negative"
    elif sentiment['pos'] > sentiment['neg']:
        overall_sentiment = "Positive"
    else:
        overall_sentiment = "Neutral"
    sentiment = { "positivity_score": sentiment['pos'],
            "negativity_score": sentiment['neg'],
            "neutrality_score": sentiment['neu'],
            "overall_sentiment": overall_sentiment}
    return sentiment