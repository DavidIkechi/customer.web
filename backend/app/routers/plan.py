from fastapi import  status, Depends, HTTPException, APIRouter
import services as _services
import models, schema
from sqlalchemy.orm import Session
import auth

change_plan_router = APIRouter(
    prefix="/plans/change_plan",
    tags=["Change Plans"])


def convert_plan(current_plan:str, new_plan:str, time:float):
    """ Function to change user plans and convert balance upload time """
    user_plans = {
                    "startup": {"price": 0.068},
                    "growing": {"price": 0.086},
                    "enterprise": {"price": 0.785}
                }
    plan_names = ["startup", "growing", "enterprise"]
    
    for plan in plan_names:
        if plan != current_plan and new_plan == plan:  
            new_plan = plan 
            cash_balance = time * user_plans[current_plan]["price"]
            upload_time = float(cash_balance / user_plans[new_plan]["price"])
            if upload_time < 1.00:
                raise HTTPException(status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Your balance is too low for this plan")
            # print (cash_balance, upload_time)
            return upload_time



@change_plan_router.post("/", description="Change the user's subscription plan", status_code=status.HTTP_200_OK)
def change_plan(user_plan:schema.ChangePlan, user:models.User = Depends(auth.get_active_user), db: Session = Depends(_services.get_session)):
    company = db.query(models.Company).filter(models.Company.id == user.company_id).first()
    current_plan = company.plan
    balance_time = company.time_left
    new_plan = user_plan.plan
    upload_time = convert_plan(current_plan, new_plan, balance_time)
    company.plan = new_plan
    company.time_left = upload_time
    db.commit()
    db.refresh(company)
    
    return {"message": f"plan succesfully changed to {new_plan}"}


