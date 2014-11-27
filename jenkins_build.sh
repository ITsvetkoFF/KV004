cd frontend/ 
bower install --allow-root
npm install
grunt distOn
grunt
cd ../backend 
npm install
mysql -u root -proot < EnviromapDB.sql
nodejs filldb.js
forever start api.js
