import ssl
from pyngrok import ngrok, conf, installer
import os
pyngrok_config = conf.get_default()

if not os.path.exists(pyngrok_config.ngrok_path):
    myssl = ssl.create_default_context();
    myssl.check_hostname=False
    myssl.verify_mode=ssl.CERT_NONE
    installer.install_ngrok(pyngrok_config.ngrok_path, context=myssl)

public_url = ngrok.connect(3210).public_url

print(public_url)