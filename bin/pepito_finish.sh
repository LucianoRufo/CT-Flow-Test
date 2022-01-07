#!/usr/bin/env bash

LIGHTCYAN='\033[1;36m'
LIGHTGREEN='\033[1;32m'
WHITE='\033[1;37m'
YELLOW='\033[1;33m'

printf ${LIGHTGREEN}
echo "Please select a pepito:"
printf ${WHITE}
select pepito in $1
do 
    echo $REPLY "You picked: $pepito"
    break
done   

echo 
printf ${LIGHTCYAN}
printf "GIT OUTPUT:"
echo
printf ${YELLOW}
echo
git checkout develop
echo 
git merge --no-ff $pepito
echo 
git branch -d $pepito
echo 
echo 

printf ${LIGHTCYAN}
printf "COMMANDS RUN:"
echo 
echo 

printf ${YELLOW}
echo "git branch -a | grep pepito/"
echo "git checkout develop"
echo "git merge --no-ff $pepito"
echo "git branch -d $pepito"
echo "git checkout develop"