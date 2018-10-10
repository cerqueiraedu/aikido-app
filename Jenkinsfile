def trustedText = readTrusted 'PodBuilder.yaml'
def image

podTemplate(label: 'atemi-service-builder', yaml: trustedText) {
    node ('atemi-service-builder') {
        stage('Cloning Repository...') { 
            container('jnlp') {
                checkout scm
            }
        }
        container('docker-helm') {
            stage('Docker Build') {
                image = docker.build("ecerqueira/atemi-service:3.1.0", "./atemi-service")
            }
            stage('Running Tests') {
                image.inside(){
                    // sh 'ls -lrt'
                    sh 'cd /atemi-service'
                    sh 'npm run test-jenkins'
                }

                //sh 'docker run --rm -w /home/jenkins/workspace/Build from YAML File/atemi-service ecerqueira/atemi-service:3.1.0 npm run test-jenkins'
                //sh 'docker run --rm -e DB_URL=mysql2://${MY_POD_IP}:3306/portal $TEST_IMAGE_NAME bundle exec rspec'
                //sh 'docker run --rm -w ./atemi-service ecerqueira/atemi-service:3.1.0 npm run test-jenkins'
            }
            stage('Docker Push') {
                docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                    image.push()
                    image.push("latest")
                }  
            }
        }
        stage('Helm Deploying') {
            container('docker-helm'){
                //sh 'helm init --client-only --skip-refresh'
                //sh 'helm repo add aikido-charts https://cerqueiraedu.github.io/aikido-app-charts/charts'
                //sh 'helm upgrade --install --wait alpha-production-atemi-service aikido-charts/atemi-service'
            }
        }
        post {
            always {
                junit 'build/reports/**/*.xml'
            }
        }
        stage('Results') {
            echo 'Success!'
        }
    }
}