if [ -z "$1" ]
then
        thing="manual_dump"
else
        thing=$1
fi

ssh deploy@104.131.86.47 ./dump_db.sh
scp -r deploy@104.131.86.47:db_dumps/latest_dump dumps/$thing
cp -r dumps/$thing/latest_dump dumps/$thing/$(date +%Y-%m-%d-%H-%M-%S)_dump
