pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "cd scrybe_frontend"
				sh "npm i --force && CI=false npm run build"
			} 
                } 
        	stage("build backend"){

			steps {
				sh "cd backend"
				sh "cd app && pip3 install -r requirements.txt --force"
			} 
        	}
		stage("deploy") {
		
			steps {
				sh "sudo cp -rf backend /home/riches/heed/customersupport.web/backend/app"
				sh "sudo cp -fr ${WORKSPACE}/scrybe_frontend/dist/* /home/riches/heed/customersupport.web/scrybe_frontend"
				sh "sudo su - riches && whoami"
                                sh "sudo pm2 stop heed"
				sh "sudo pm2 stop heed_api"
				sh "sudo pm2 --name heed start npm -- start /home/riches/frontend/build --port 4173"
				sh "sudo pm2 start main.py --name heed_api --interpreter python3 /home/riches/backend/index.js"
			}
			
		}


        }	



}
