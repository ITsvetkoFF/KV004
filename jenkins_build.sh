cd frontend/ 
bower install --allow-root
npm install
grunt distOn
grunt
cd ../backend 
npm install
mysql -u root -proot < EnviromapDB.sql
nodejs filldb.js
sudo forever start api.js
