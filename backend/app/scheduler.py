from rocketry import Rocketry
from rocketry.conds import (
    every, hourly, daily,
    after_success,
    true, false
)

import cron_status

cron_schedule = Rocketry(config={"task_execution": "async"})

# Creating some tasks
@cron_schedule.task(every("15 seconds"))
async def do_things():
    cron_status.check_and_update_jobs()
    

@cron_schedule.task(after_success(do_things))
async def do_after():
    await cron_status.transcription_mail()

    
    
if __name__ == "__main__":
    # If this script is run, only Rocketry is run
    cron_schedule.run()