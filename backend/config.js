var productionVersion = false;
var locationProduction = "../frontend/dist/";
var locationDevelop = "../frontend/";
var location="";
if(productionVersion){
    location = locationProduction;
}else{
    location = locationDevelop;
}

module.exports  = location;
