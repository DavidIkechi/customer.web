from rocketry import Rocketry
from rocketry.conds import (
    every, hourly, daily,
    after_success,
    true, false
)

import cron_status

cron_schedule = Rocketry(config={"task_execution": "async"})

# Creating some tasks
@cron_schedule.task(every("30 seconds"))
async def do_things():
    await cron_status.transcription_mail()
    

@cron_schedule.task(after_success(do_things))
async def do_after():
    await cron_status.check_and_update_jobs()

    
    
if __name__ == "__main__":
    # If this script is run, only Rocketry is run
    cron_schedule.run()