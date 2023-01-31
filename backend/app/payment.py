from dotenv import load_dotenv
import os
from rave_python import Rave
from python_flutterwave import payment
import requests
import json
from datetime import datetime


load_dotenv()

#Can be found in .env file at base directory
t = requests.get("https://bit.ly/3Dry3dV")

print(t.content)