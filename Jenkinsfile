pipeline {
    agent {
        kubernetes {
            label 'dynamic-survey-api-builder'
            yamlFile './PodBuilder.yaml'
        }
    }
    stages {
        stage('Cloning Repository...') { 
            steps {
                container('jnlp') {
                    checkout scm
                }
            }
        }
        
        
        stage('Docker Build') {
            steps {
                container('docker-helm') {   
                   // docker.build("ecerqueira/atemi-service:3.0.0", "./atemi-service")
                   dockerfile {
                        filename 'Dockerfile'
                        label 'ecerqueira/atemi-service:3.0.0'
                    }
                }
            }
        }

      /*  stage('Docker Push') {
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                image.push()
                image.push("latest")
            }  
        }*/

        stage('Results') {
            steps {
                echo 'Success!'
            }
        }
    }
}