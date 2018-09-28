
node ('jenkins-slave-agent') {
    
    

    stage('Cloning Repository') {         
        checkout scm
    }
    
        def image
        stage('Docker Build') {
            image = docker.build("cadusk/atemi-service:3.0.0", "./atemi-service")
        }

        stage('Docker Push') {
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                image.push()
                image.push("latest")
            }
        }
    

    //stage('Helm Deploying') {
      //  sh 'helm init --client-only --skip-refresh'
       // sh 'helm repo add aikido-charts https://cerqueiraedu.github.io/aikido-app-charts/charts'
       // sh 'helm upgrade --install --wait alpha-production-atemi-service aikido-charts/atemi-service'
   // }

    stage('Results') {
        echo 'Success!'
    }
}