pipeline {
    agent any

    stages {
        stage('Prepare') {
            agent any

            steps {
                echo "Clonning Repository" 
                
                git url: 'https://github.com/hbjs97/knu-plate.git',
                    branch: 'staging',
                    credentialsId: 'hbjs97'
            }


            post {
                success {
                    echo 'Repository clone success'
                }

                always {
                    echo 'tried...'
                }

                cleanup {
                    echo 'after all other post condition'
                }
            }
        }

        stage('Build Docker') {
            agent any
            steps {
                echo 'Build Docker'

                dir('./') {    
                    sh '''
                    cp /root/environment/.env .
                    docker-compose -f stack.yml build
                    docker-compose -f stack.yml push
                    '''
                }
            }
            post {
                failure {
                    error 'build fail...'
                }
                success {
                    echo 'build success...'
                }
            }
        }

        stage('Remote Deploy') {
            agent any
            steps {
                echo 'Remote Deploy'
                
                dir('./') {
                    sh '''
                    cp /root/environment/.env .
                    docker-compose -f stack.yml build
                    docker-compose -f stack.yml push
                    scp .env ubuntu@3.35.58.40:~/nexa_pms_dev/
                    ssh ubuntu@3.35.58.40 "cd ~/nexa_pms_dev && bash ./deploy.sh"
                    '''
                }

            }
            post {
                success {
                    echo 'deploy success'
                }
            }
        }

    }
}
