from paystackapi.paystack import Paystack
from paystackapi.charge import Charge
paystack_secret_key = "sk_test_b61fd64e4a45ae8baa7d8c75848efd47c21ab468"
paystack = Paystack(secret_key=paystack_secret_key)



# to use transaction class
trans = paystack.transaction()

# initialize a transaction that generates a callback.
res = trans.initialize(email='daakwuruu@gmail.com', amount=2000000, 
                       metadata = {'minutes': 30, 'plan': 'Enterprise'},
                       callback_url= "https://heed.hng.tech/checkout-growing")

if res['status'] == True:
    # get the authorization url, access_code, and also the reference number.
    autho_url = res['data']['authorization_url']
    access_code = res['data']['access_code']
    reference = res['data']['reference']
    
print(reference)
print(autho_url)
# 4084084084084081

# veri = paystack.verification().resolve_card_bin('408408')
veri = paystack.transaction().verify(reference = '6unj1ppzz4')
get_status = veri['data']
if get_status['status'].strip().lower() == "success":
    amount = get_status['amount']
    trans_id = get_status['id']
    pay_channel = get_status['channel']
    currency = get_status['currency']
    minutes = get_status['metadata']['minutes']
    plan = get_status['metadata']['plan']
    
print(plan)