from celery import Celery 
from time import sleep

app = Celery('tasks', broker='redis://red-cemob9o2i3molpjf2k5g:6379', backend='db+sqlite:///db.sqlite3')

@app.task 
def reverse(text):
    sleep(5)
    return text[::-1]
