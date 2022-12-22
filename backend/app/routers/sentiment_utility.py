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
    result = {
        "Negative": sentiment['neg'],
        "Positive": sentiment['pos'],
        "Neutral": sentiment['neu']
    }
    overall_sentiment = max(result, key=result.get)
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

def get_overall_sentiment(pos, neg, neu):
    result = {
        "Positive":pos,
        "Negative":neg,
        "Neutral": neu
    }
    
    return max(result, key=result.get)


def sentiment_assembly(transcript):
    pos_result, neg_result, neu_result = [], [], []
    pos_sent, neg_sent = [], []
    for i in transcript['sentiment_analysis_results']:
        get_sentiment = i['sentiment']
        if get_sentiment == 'NEUTRAL':
            neu_result.append("Neutral")
        elif get_sentiment == 'POSITIVE':
            pos_result.append("Positive")
            pos_sent.append({"sentence": i['text'], "positivity_score": i['confidence']})
        else:
            neg_result.append("Negative")
            neg_sent.append({"sentence": i['text'], "negativity_score": i['confidence']})
        
    pos_score = len(pos_result)
    neg_score = len(neg_result)
    neu_score = len(neu_result)
    
    total = pos_score + neg_score + neu_score
    positivity_score, negativity_score = pos_score / total, neg_score / total
    neutral_score = neu_score / total
    
    overall_sentiment = get_overall_sentiment(pos_score, neg_score, neu_score)
    
    sentiment = {
            "transcript": transcript['text'],
            "positivity_score": round(positivity_score, 4),
            "negativity_score": round(negativity_score, 4),
            "neutrality_score": round(neutral_score, 4),
            "overall_sentiment": overall_sentiment,
            "most_negative_sentences": json.dumps(neg_sent),
            "most_positive_sentences": json.dumps(pos_sent)
            }
    return sentiment        