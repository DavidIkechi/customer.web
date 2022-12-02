pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "cd scrybe_frontend"
				sh "cd scrybe_frontend && npm i --force && CI=false npm run build"
			} 
                } 
        	stage("build backend"){

			steps {
				sh "cd backend"
				sh "cd backend/app && python3 -m pip install --upgrade pip"
				sh "cd backend/app && pip3 install -r requirements.txt --force"
			} 
        	}
		stage("deploy") {
		
			steps {
				sh "sudo cp -rf ${WORKSPACE}/backend/app/* /home/riches/heed/backend"
				sh "sudo cp -fr ${WORKSPACE}/scrybe_frontend/* /home/riches/heed/frontend"
				sh "sudo su - riches && whoami"
                                //sh "sudo pm2 stop heed"
				//sh "sudo pm2 stop heed_api"
				sh "(cd /home/riches/heed/frontend && sudo pm2 start --name heed npm -- start)"
				sh "sudo pm2 start /home/riches/heed/backend/main.py --interpreter python3 --name heed_api"
			}
			
		}


        }	



}
