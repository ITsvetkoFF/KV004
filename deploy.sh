# it assumes you have forever, npm, node, bower, mysql installed 
#
mkdir -p /var/tmp/deploy/
cd /var/tmp/deploy/
forever stopall 
rm -r KV004/
git clone https://github.com/ITsvetkoFF/KV004.git
cd KV004/frontend/ 
bower install --allow-root
npm install
grunt distOn
grunt
cd ../backend 
npm install
mysql -u root -proot < EnviromapDB.sql
nodejs filldb.js
forever start -a -l /var/log/forever.log -o /var/log/out.log -e /var/log/err.log api.js
