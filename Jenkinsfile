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
        publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report'
        ])
    }
    }
}