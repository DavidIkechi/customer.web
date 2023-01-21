from rocketry import Rocketry
from rocketry.conds import (
    every, hourly, daily,
    after_success,
    true, false, cron
)

import cron_status

cron_schedule = Rocketry(config={"task_execution": "async"})

@cron_schedule.task(every("3 seconds"))
async def another():
    await cron_status.check_and_update_jobs()


@cron_schedule.task(cron("* * * * *"), execution="main") 
async def constantly():
    await cron_status.transcription_mail()
    
@cron_schedule.task("every 2 seconds")
async def send_free_email():
    await cron_status.send_free_email()

@cron_schedule.task(daily)
async def account_deletion_reminder():
    await cron_status.due_for_deletion()

@cron_schedule.task("daily")
async def agent_report():
    await cron_status.agent_report()
      
if __name__ == "__main__":
    # If this script is run, only Rocketry is run
    cron_schedule.run()
