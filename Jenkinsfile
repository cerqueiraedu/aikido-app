def trustedText = readTrusted 'PodBuilder.yaml'
def image

podTemplate(label: 'dynamic-survey-api-builder', yaml: trustedText) {
    node ('dynamic-survey-api-builder') {
        stage('Cloning Repository...') { 
            container('jnlp') {
                checkout scm
            }
        }
        container('docker-helm') {
            stage('Docker Build') {
                image = docker.build("ecerqueira/atemi-service:3.0.0", "./atemi-service")
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
                sh 'helm init --client-only --skip-refresh'
                sh 'helm repo add aikido-charts https://cerqueiraedu.github.io/aikido-app-charts/charts'
                sh 'helm upgrade --install --wait alpha-production-atemi-service aikido-charts/atemi-service'
            }
        }
        stage('Results') {
            echo 'Success!'
        }
    }
}