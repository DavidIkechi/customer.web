

def score_count():
	score = []
	pos_count = 0
	neg_count = 0
	neu_count = 0
	total_score = pos_count + neg_count + neu_count
	percent_avg_score = (pos_count/total_score) * 100

	while True:
		if overall_sentiment == "Positive":
			pos_count+=1
			break
		elif overall_sentiment == "Negative":
			neg_count +=1
			break
		elif overall_sentiment == "Neutral":
			neu_count+=1
			break
	scores = {
		"Average [%]": percent_avg_score,
		"Positive":pos_count, 
		"Negative":neg_count, 
		"Neutral":neu_count
	}
	score.append(scores)
	return score