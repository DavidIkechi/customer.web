import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.tokenize import sent_tokenize
import json

def sentiment(transcript):
    nltk.download('vader_lexicon')
    nltk.download('punkt')
    sentences = sent_tokenize(transcript)
    negative_sentences = []
    postive_sentences = []
    sentiment = SentimentIntensityAnalyzer().polarity_scores(transcript)
    #getting the most positive and negative sentences
    for sentence in sentences:
        individual_sentiment = SentimentIntensityAnalyzer().polarity_scores(sentence)
        if individual_sentiment['neg'] > 0.5:
            negative_sentences.append({"sentence": sentence, "negativity_score": individual_sentiment['neg']})
        elif individual_sentiment['pos'] > 0.5:
            postive_sentences.append({"sentence": sentence, "positivity_score": individual_sentiment['pos']})
    most_negative_sentences =json.dumps(negative_sentences)
    most_postive_sentences = json.dumps(postive_sentences)
    if sentiment['neg'] > sentiment['pos']:
        overall_sentiment = "Negative"
    elif sentiment['pos'] > sentiment['neg']:
        overall_sentiment = "Positive"
    else:
        overall_sentiment = "Neutral"
    sentiment = {
            "transcript": transcript,
            "positivity_score": sentiment['pos'],
            "negativity_score": sentiment['neg'],
            "neutrality_score": sentiment['neu'],
            "overall_sentiment": overall_sentiment,
            "most_negative_sentences": most_negative_sentences,
            "most_postive_sentences": most_postive_sentences
            }
    return sentiment


