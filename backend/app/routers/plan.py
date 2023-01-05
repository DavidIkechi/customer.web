from fastapi import  status, Depends, HTTPException, APIRouter
import services as _services
import models, schema
from sqlalchemy.orm import Session
import auth
import crud
import math


plan_router = APIRouter(
    prefix="/plans",
    tags=["User Subscription Plans"])


def convert_plan(plan_data: dict, user:models.User, db: Session):
    """ Function to change user plans and convert balance time for new plans """
    company = db.query(models.Company).filter(models.Company.id == user.company_id).first()
    old_plan = plan_data["current_plan"]
    balance_time = plan_data["minutes"]
    if old_plan != "free":
        initial_plan = crud.get_plan_by_name(db, old_plan)
        initial_plan_price = initial_plan.price
        upgrade_plan = crud.get_plan_by_name(db, plan_data["new_plan"])
        upgrade_plan_price = upgrade_plan.price
        
        cash_amount = balance_time * initial_plan_price
        upload_time = float(cash_amount / upgrade_plan_price)
        
        if upload_time < 3600:
            raise HTTPException(status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Your balance is too low for this plan")
        # print (cash_balance, upload_time)
        else:
            # return upload_time
            company.plan = plan_data["new_plan"]
            company.time_left = upload_time
            db.commit()
            db.refresh(company)
            return {"message": f"plan succesfully changed to {plan_data['new_plan']}"}



@plan_router.patch("/change_plan", description="Change the user's subscription plan", status_code=status.HTTP_200_OK)
def change_plan(user_plan:schema.ChangePlan , logged_in_user:models.User = Depends(auth.get_active_user), db: Session = Depends(_services.get_session)):
    plan_details = {"current_plan": logged_in_user.company.plan,
                    "new_plan": user_plan.plan,
                    "minutes": logged_in_user.company.time_left}
    return convert_plan(plan_details, logged_in_user, db)
        
@plan_router.get("/view_plan", description="View User's current subscription plan", status_code=status.HTTP_200_OK)
def view_user_plan(user: models.User=Depends(auth.get_active_user), db: Session = Depends(_services.get_session)):
    user_plan = db.query(models.ProductPlan).filter(models.ProductPlan.name == user.company.plan).first()
    amount_left = math.floor(user_plan.price * user.company.time_left)
    
    plan_details = {"current_plan": user_plan.name , 
                    "Amount": amount_left,
                    "Time_Left": math.floor(user.company.time_left / 60)}
    
    return plan_details

