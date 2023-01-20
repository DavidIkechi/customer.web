from dotenv import load_dotenv
import os
from rave_python import Rave
from python_flutterwave import payment
import requests
import json
from datetime import datetime


load_dotenv()

#Can be found in .env file at base directory
RAVE_PUBLIC_KEY = os.getenv("RAVE_PUBLIC_KEY")
SECRET_KEY = os.getenv('RAVE_SECRET_KEY')
payment.token = SECRET_KEY

payment_endpoint = "https://api.flutterwave.com/v3/payments"
header = {'Authorization':'Bearer '+ SECRET_KEY}
# data ={
#     "tx_ref": "100nb",
#     "amount": 100,
#     "currency": "NGN",
#     "redirect_url": "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
#     "payment_options": "card",    
#     "meta": {
#         "consumer_id": 23,
#         "consumer_mac": "92a3-912ba-1192a",
#         "cancel_url": "https://google.com"
#     },
#     "customer": {
#         "email": "davidakwuruu@gmail.com",
#         "name": "Yemi Desola"
#     }
#     # customizations: {
#     #     title: "Pied Piper Payments",
#     #     logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
#     # }
# }

# get_link = requests.post(payment_endpoint, json=data, headers=header)
# a = get_link.json()
# print(a['data']['link'])
# # print(str(datetime.now()).replace(" ", "-"))
id = 4090153
# rave = Rave(RAVE_PUBLIC_KEY, SECRET_KEY)
link = f"https://api.flutterwave.com/v3/transactions/{id}/verify"
get_link = requests.get(link, headers = header)
print(get_link.json())


# rave = Rave(RAVE_PUBLIC_KEY, SECRET_KEY)
# print(rave.Transaction().verify({"id": "288200108"}))  
# Replace with the transaction reference of the transaction you want to verify
transaction_reference = 4090153

# Endpoint to verify a transaction
verify_url = "https://api.flutterwave.com/v3/transactions/{}/verify".format(transaction_reference)

# Headers for the verify request
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer {}".format(SECRET_KEY)
}

# Send the verify request
response = requests.get(verify_url, headers=headers)

# Parse the response
response_json = json.loads(response.text)

# Print the response
print(response_json)


from fastapi import FastAPI, Request, Header
import json
import hmac
import hashlib

app = FastAPI()

SECRET_KEY = "your_secret_key"

def validate_signature(headers: dict, body: str) -> bool:
    signature = headers.get("verif-hash")
    if signature:
        hashed = hmac.new(SECRET_KEY.encode(), body.encode(), hashlib.sha512)
        return signature == hashed.hexdigest()
    else:
        return False

@app.post("/webhook")
def webhook(request: Request, verif_hash: str = Header(None)):
    body = await request.body()
    if validate_signature(request.headers, body.decode()):
        data = json.loads(body.decode())
        event = data.get('event')
        if event == 'transaction.success':
            # Handle successful transaction
            print('Transaction was successful')
        elif event == 'transaction.pending':
            # Handle pending transaction
            print('Transaction is pending')
        elif event == 'transaction.failed':
            # Handle failed transaction
            print('Transaction failed')
        return {"status": "ok"}
    else:
        return {"error": "Invalid signature"}
