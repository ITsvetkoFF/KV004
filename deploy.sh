# it assumes you have forever, npm, node, bower, mysql installed 
cd /var/tmp/deploy/
forever stop api.js 
rm -r KV004/
git clone https://github.com/ITsvetkoFF/KV004.git
cd KV004/frontend/ 
bower install --allow-root
cd ../backend 
npm install
mysql -u root -proot < EnviromapDB.sql
nodejs filldb.js
forever start -a -l forever.log -o out.log -e err.log api.js
