#!/usr/bin/env bash

LIGHTCYAN='\033[1;36m'
LIGHTGREEN='\033[1;32m'
WHITE='\033[1;37m'
YELLOW='\033[1;33m'

printf ${LIGHTGREEN}
echo "Please select an epic:"
printf ${WHITE}
select epic in $1
do 
    echo $REPLY "You picked: $epic"
    break
done   

epicFromId=${epic#*epic/}   # remove prefix ending in "epic/"
epicId=${epicFromId%%_*}   # get substring before the first _

echo 
printf ${LIGHTCYAN}
printf "GIT OUTPUT:"
echo
printf ${YELLOW}
echo
git checkout -b story/$epicId/CTDEV-$2_$3 $epic
echo 
echo 

printf ${LIGHTCYAN}
printf "COMMANDS RUN:"
echo 
echo 

printf ${YELLOW}
echo "git branch -a | grep epic/"
echo "git checkout -b story/$epicId/CTDEV-$2_$3 $epic"