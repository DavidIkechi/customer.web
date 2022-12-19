
@app.get("/leaderboard", summary = "get agent leaderboard", tags=['agent leaderboard'])
def get_agents_leaderboard(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    leaderboard = crud.get_leaderboard(db, user.id)
    results = {"week":{"Top3_Agents": [], "Other_Agents": []},
            "month":{"Top3_Agents": [], "Other_Agents": []}
    }
    results["week"]["Top3_Agents"] = leaderboard[0][:3]
    results["week"]["Other_Agents"] = leaderboard[0][3:]
    results["month"]["Top3_Agents"] = leaderboard[1][:3]
    results["month"]["Other_Agents"] = leaderboard[1][3:]

    return results

#agent total_analysis
@app.get("/total-agent-analysis", summary="get total agent analysis")
def get_total_agent_analysis(agent_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    total_analysis = db.query(models.Audio).filter(models.Audio.user_id == user.id, models.Audio.agent_id == agent_id)
    week = datetime.now().isocalendar().week
    month = datetime.now().month
    result = {
        "week": [
            {"total_recording": 0},
            {"id": 1, "time": "Day 1", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 2, "time": "Day 2", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 3, "time": "Day 3", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 4, "time": "Day 4", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 5, "time": "Day 5", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 6, "time": "Day 6", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 7, "time": "Day 7", "positive": 0, "negative": 0, "neutral": 0}
        ],
        "month": [
            {"total_recording": 0},
            {"id": 1, "time": "wk1", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 2, "time": "wk2", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 3, "time": "wk3", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 4, "time": "wk4", "positive": 0, "negative": 0, "neutral": 0}
        ]
    }
    for i in total_analysis:
        if i.timestamp.isocalendar().week == week:
            result["week"][0]["total_recording"] += 1
            for y in range(7):
                if i.timestamp.weekday() == y:
                    if i.overall_sentiment == "Positive":
                        result["week"][y+1]["positive"] += 1
                    elif i.overall_sentiment == "Negative":
                        result["week"][y+1]["negative"] += 1
                    elif i.overall_sentiment == "Neutral":
                        result["week"][y+1]["neutral"] += 1
        if i.timestamp.month == month:
            result["month"][0]["total_recording"] += 1
            if i.timestamp.day <= 7:
                if i.overall_sentiment == "Positive":
                    result["month"][1]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][1]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][1]["neutral"] += 1
            elif 8 <= i.timestamp.day <= 14:
                if i.overall_sentiment == "Positive":
                    result["month"][2]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][2]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][2]["neutral"] += 1
            elif 15 <= i.timestamp.day <= 21:
                if i.overall_sentiment == "Positive":
                    result["month"][3]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][3]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][3]["neutral"] += 1
            elif 22 <= i.timestamp.day <= 31:
                if i.overall_sentiment == "Positive":
                    result["month"][4]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][4]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][4]["neutral"] += 1

    return result

@app.post("/agent", tags=['create agent'])
async def create_agent(agent: schema.AgentCreate, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    company_id = user.company_id
    return crud.create_agent(db, agent, company_id)

@app.get("/AgentDetails", summary = "get agent performance report", tags=['Agent Performance Report'])
def get_agent_performance(agent_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    try:
        result = {}
        leaderboard = crud.get_leaderboard(db, user.id)
        for i in leaderboard[0]:
            if i["agent_id"] == agent_id:
                result["week"] = i
                break
            else: 
                result["week"] = []
        for j in leaderboard[1]:
            if j["agent_id"] == agent_id:
                result["month"] = j
                break
            else: 
                result["month"] = []
        return {"Agent_Performance_Report": {"week": result["week"], "month": result["month"]}}
    except:
        return {"message": "agent details does not exist"}
