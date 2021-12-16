#!/usr/bin/env bash

LIGHTCYAN='\033[1;36m'
LIGHTGREEN='\033[1;32m'
WHITE='\033[1;37m'
YELLOW='\033[1;33m'

printf ${LIGHTGREEN}
echo "Please select a story:"
printf ${WHITE}
select story in $1
do 
    echo $REPLY "You picked: $story"
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
echo 
git merge --no-ff $story
echo 
echo 
git branch -d $story
echo 
echo 
git branch -d $story
echo 
echo 

printf ${LIGHTCYAN}
printf "COMMANDS RUN:"
echo 
echo 

printf ${YELLOW}
echo "git branch -a | grep story/"
echo "git checkout develop"
echo "git merge --no-ff $story"
echo "git branch -d $story"
echo "git checkout develop"