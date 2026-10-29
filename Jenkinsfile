pipeline {
    agent any

    environment {
        BASE_URL = 'https://adactinhotelapp.com/HotelAppBuild2/'
        USERNAME = 'imranali'
        PASSWORD = 'imranali'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Imran-ali355/adactin-hotel-automation-playwright.git'
            }
        }

        stage('Create .env File') {
            steps {
                sh '''
                    echo "BASE_URL=${BASE_URL}" > .env
                    echo "USERNAME=${USERNAME}" >> .env
                    echo "PASSWORD=${PASSWORD}" >> .env
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Yeh block test khatam hone ke baad HTML report ko Jenkins par save (archive) karega
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}