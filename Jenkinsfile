pipeline {

	agent any
	stages {
		
		
		
					
		stage("build frontend"){

			steps {
				sh "cd scrybe_frontend"
				sh "cd scrybe_frontend && npm i --force && sudo CI=false npm run build"
			} 
                } 
        	stage("build backend"){

			steps {
				sh "cd backend/app"
				sh "cd backend/app && source env/bin/activate && python3 -m pip install --upgrade pip"
				sh "cd backend/app && source env/bin/activate && pip3 install -r requirements.txt --force"
				sh "cd backend/app && source env/bin/activate && alembic revision --autogenerate -m 'first migration' && alembic upgrade head"
				
		
			} 
        	}
		stage("deploy") {
		
			steps {

				sh "sudo pm2 delete heed"
				sh "sudo pm2 delete heed_api"
				sh "source env/bin/activate && sudo pm2 start backend/app/main.py --name heed_api --interpreter python3"
				sh "cd scrybe_frontend && sudo pm2 start --name heed npm -- start"
				sh "sudo pm2 save"
			}
			
		}


        }	



}
