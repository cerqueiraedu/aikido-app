podTemplate(label: 'jenkins-pod', containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'helm', image: 'ecerqueira/helm-client:0.3.0', command: 'cat', ttyEnabled: true, shell: '/bin/bash')
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
  ]
  ) {
    node ('jenkins-pod') {
        def image

        stage('Cloning Repository...') { 
            container('jnlp') {
                checkout scm
            }
        }
        container('docker') {
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
            container('helm'){
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