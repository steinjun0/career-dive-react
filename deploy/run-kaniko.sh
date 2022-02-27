#!/bin/bash/
IFS=" "
string="`./kubectl get pods --output=jsonpath={.items[*].metadata.name}`"
array=( $string )
value="kaniko-cd-front"
echo "${IFS}${array[*]}${IFS}"
if [[ "${IFS}${array[*]}${IFS}" =~ "${IFS}${value}${IFS}" ]]; then
    echo 'replace existed pod' 
    ./kubectl replace --force -f ./deploy/kaniko.yaml
else 
    echo 'create' 
    ./kubectl create -f ./deploy/kaniko.yaml
fi