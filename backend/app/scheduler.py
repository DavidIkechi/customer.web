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
    #await cron_status.check_and_update_jobs()
    await cron_status.transcription_mail()



#@cron_schedule.task(cron("* * * * *"), execution="main") 
#async def constantly():
#    await cron_status.transcription_mail()

@cron_schedule.task(daily)
async def account_deletion_reminder():
    await cron_status.due_for_deletion()
      
if __name__ == "__main__":
    # If this script is run, only Rocketry is run
    cron_schedule.run()
