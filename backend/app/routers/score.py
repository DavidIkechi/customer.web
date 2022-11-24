

def score_count():
	score = []
	total_score = pos_count + neg_count + neu_count
	avg_score = (pos_count/total_score) * 10

	while True:
		if overall_sentiment == "Positive":
			pos_count = 1
			neg_count = 0
			neu_count = 0
			break
		elif overall_sentiment == "Negative":
			pos_count = 0
			neg_count = 1
			neu_count = 0
			break
		elif overall_sentiment == "Neutral":
			pos_count = 0
			neg_count = 0
			neu_count = 1
			break
	scores = {
		"AVG": avg_score,
		"Positive":pos_count, 
		"Negative":neg_count, 
		"Neutral":neu_count
	}
	score.append(scores)
	return score