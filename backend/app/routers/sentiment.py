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

# # send to the sentiment route
# @app.get("/download/{id}")
# def download (id: Union[int, str], db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
#     db_audio = crud.get_freeaudio(db, audio_id=id)

#     if db_audio is None:
#         raise HTTPException(status_code=404, detail="No Audio With This ID")
#     else:
#         positivity_score = float(db_audio.positivity_score)
#         negativity_score = float(db_audio.negativity_score)
#         neutrality_score = float(db_audio.neutrality_score)
#         overall_sentiment = str(db_audio.overall_sentiment)
#         most_positive_sentences = json.loads(db_audio. most_positive_sentences)
#         most_negative_sentences = json.loads(db_audio. most_negative_sentences)
#         transcript = db_audio.transcript
#         sentiment = {"transcript": transcript,
#                     "positivity_score": positivity_score,
#                     "negativity_score": negativity_score,
#                     "neutrality_score": neutrality_score,
#                     "overall_sentiment": overall_sentiment,
#                     "most_positive_sentences": most_positive_sentences,
#                     "most_negative_sentences": most_negative_sentences,
#                     }
#         return sentiment
    
# @app.get("/total-analysis", summary="get user total analysis", response_model = schema.TotalAnalysis)
# def get_total_analysis(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
#     overall_sentiment = db.query(models.Audio).filter(models.Audio.user_id == user.id)
#     week = datetime.now().isocalendar().week
#     month = datetime.now().month
#     list_month=[]
#     list_week=[]
#     week_item={}
#     month_item={}
#     result = dict()
#     for i in overall_sentiment:
#         if i.timestamp.month == month:
#             list_month.append(i.overall_sentiment)
#         if i.timestamp.isocalendar().week == week:
#             list_week.append(i.overall_sentiment)
#     if len(list_week) > 0:
#         week_item['id'] = 1
#         week_item['positive'] = list_week.count("Positive")
#         week_item['neutral'] = list_week.count("Neutral")
#         week_item['negative'] = list_week.count("Negative")
#         result['week'] = [week_item]
    
#     if len(list_month) > 0:
#         month_item['id'] = 1
#         month_item['positive'] = list_month.count("Positive")
#         month_item['neutral'] = list_month.count("Neutral")
#         month_item['negative'] = list_month.count("Negative")
#         result['month'] = [month_item]

#     return result

# @app.get("/new_analysis/{id}", summary = "get result of a sentiment analysis", response_model=schema.Analysis, tags=['analysis'])
# def get_sentiment_result(id: int, db: Session = Depends(get_db)):
#     """
#     Get single analysis
#     """
#     analysis = crud.get_analysis(db, id)
#     if not analysis:
#         raise HTTPException(
#             status_code=404,
#             detail="The analysis doesn't exist",
#         )
#     return analysis
