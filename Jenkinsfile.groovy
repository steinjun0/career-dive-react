properties([pipelineTriggers([githubPush()])])
node {
    stage ('Pull scource from github'){
        git branch: 'master',
        credentialsId: 'git-ssh',
        url: 'git@github.com:steinjun0/career-dive-react.git'
    }
    stage('Build image by kaniko') {
        withKubeConfig([credentialsId: 'kube-config']) {
        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
        sh 'chmod u+x ./kubectl'  
        sh 'bash ./deploy/run-kaniko.sh'
    }
    }
    stage ('Wait building'){
        sh 'bash ./deploy/wait-kaniko.sh'
    }
    stage ('rollout deployment'){
        sh './kubectl rollout restart deployment career-dive-react'
    }
}    