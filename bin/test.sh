#!/bin/bash
echo "Please select an epic:"
echo $1
echo $2
echo $3
select epic in $1 do 
    echo $REPLY "Your picked $epic"
    break
done            
echo $epic
$git checkout -b story/$epic/CTDEV-$2_$3 $epic
echo "\nCOMMANDS RUN:"
echo "git checkout -b story/$epic/CTDEV-$2_$3 $epic"