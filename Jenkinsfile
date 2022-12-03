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
				sh "sudo pm2 stop heed"
				sh "sudo pm2 stop heed_api"
				sh "cd ${WORKSPACE}/backend/app && sudo pm2 start main.py --interpreter python3 --name heed_api"
				sh "cd ${WORKSPACE}/scrybe_frontend && sudo pm2 start --name heed npm -- start"
			}
			
		}


        }	



}
