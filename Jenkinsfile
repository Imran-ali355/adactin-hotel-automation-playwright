pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Environment Variables') {
            steps {
                withCredentials([
                    string(credentialsId: 'ADACTIN_USERNAME', variable: 'ENV_USER'),
                    string(credentialsId: 'ADACTIN_PASSWORD', variable: 'ENV_PASS')
                ]) {
                    sh '''
                        echo "BASE_URL=https://adactinapp.com/HotelAppBuild2/" > .env
                        echo "USERNAME=${ENV_USER}" >> .env
                        echo "PASSWORD=${ENV_PASS}" >> .env
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}