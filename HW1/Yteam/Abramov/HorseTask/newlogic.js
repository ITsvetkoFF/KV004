
  //the constructor describes chessfield
  function Desk (width,height){
	this.width=width;
	this.height=height;
  };
  //the constructor describes some point(x,y)
  function Point(x,y){
 	this.x=x;
 	this.y=y;
 	this.level=0;

  }; 
  //initialization: set input data( desk, startpoint,endpoint)
  function setParameters(){
	 //set desk from form
	 var width=document.getElementById("width");
	 var height=document.getElementById("height");
     
     desk=new Desk(Number.parseInt(width.value),Number.parseInt(height.value));
     //set startpoint from form
     var xs=document.getElementById("xStartPoint");
     var ys=document.getElementById("yStartPoint");
     startPoint=new Point(Number.parseInt(xs.value),Number.parseInt(ys.value));
     //set endpoint from form
     xe=document.getElementById("xEndPoint");
     ye=document.getElementById("yEndPoint");
     endpoint=new Point(Number.parseInt(xe.value),Number.parseInt(ye.value)); 
     

  }
                             //Global variables 

  var lastLevelMass=Array(); //All elements last level
  var fininshPoint;          //the point 
  var path;                  //the array of points  consist all path with startpoint and endpoint
  var mass;
  var desk;
  var endpoint;
  var startPoint;
 
  //checking newPoint in mass, if does not exist then add newPoint  parents pointer and parents level+1
  function checkExist(mass,newPoint,nextLevelMass,i){ 

     if(mass[newPoint.x-1][newPoint.y-1]==undefined){
     newPoint.superPoint=lastLevelMass[i];
	 newPoint.level=lastLevelMass[i].level+1;
	 nextLevelMass.push(newPoint);
	 mass[newPoint.x-1][newPoint.y-1]=1;
   }
 }
  //this function does all work
  function go(){
  	                    
     setParameters(); 
     var start=new Date();
     //create an array of pointers for all desk
     mass=Array(desk.width);
     for(var i=0;i<desk.width;i++){
     var er=Array(desk.height);
     mass[i]=er;
    }
     //create  result array
     path=Array();
 
 
	 lastLevelMass.push(startPoint);
	 fininshPoint=new Point(startPoint.x,startPoint.y);
	 var level=0;
	 calculate(desk,mass, endpoint);
				 
				 
				 path.push(fininshPoint);

				 while(fininshPoint.level!=0){
				 	 
				 		path.push(fininshPoint.superPoint);
				 		fininshPoint=fininshPoint.superPoint;


				 }
				  
				 var end=new Date();
				  

				 // path.reverse();
				  
			 	 
			 	   showCanvas(desk,path,start,end);

 }
   
  function calculate(desk,mass,endpoint){

        while(fininshPoint.x!=endpoint.x || fininshPoint.y!=endpoint.y){
        	var nextLevelMass=Array();
            for(var i=0;i<lastLevelMass.length;i++){ 	    
 	                if(lastLevelMass[i].x==endpoint.x&&lastLevelMass[i].y==endpoint.y)
 	                {             
 	                	fininshPoint=new Point(lastLevelMass[i].x,lastLevelMass[i].y);
 	                	fininshPoint.superPoint=lastLevelMass[i].superPoint;
 	                	fininshPoint.level=lastLevelMass[i].level;
 	                	console.log("OK!");
 	                	return true;
 	                }
			 		if(lastLevelMass[i].x-1>=1 && lastLevelMass[i].y+2<=desk.height){
			 			    var newPoint=new Point(lastLevelMass[i].x-1,lastLevelMass[i].y+2);
			 			    checkExist(mass,newPoint,nextLevelMass,i); 
			 		};
			 		if(lastLevelMass[i].x-2>=1 && lastLevelMass[i].y+1<=desk.height){			 			    
			 			    var newPoint=new Point(lastLevelMass[i].x-2,lastLevelMass[i].y+1);
			 			      checkExist(mass,newPoint,nextLevelMass,i); 				
			 		}; 
			 		if(lastLevelMass[i].x-2>=1 && lastLevelMass[i].y-1>=1){	        
			 		        var newPoint=new Point(lastLevelMass[i].x-2,lastLevelMass[i].y-1);
			 		          checkExist(mass,newPoint,nextLevelMass,i);				 			 
			 		};
			 		if(lastLevelMass[i].x-1>=1 && lastLevelMass[i].y-2>=1){		 			    
			 			    var newPoint=new Point(lastLevelMass[i].x-1,lastLevelMass[i].y-2);
			 			      checkExist(mass,newPoint,nextLevelMass,i); 	 
			 		};
			 		if(lastLevelMass[i].x+1<=desk.width && lastLevelMass[i].y-2>=1){
			 		        var newPoint=new Point(lastLevelMass[i].x+1,lastLevelMass[i].y-2);
			 		          checkExist(mass,newPoint,nextLevelMass,i); 			 		
			 		};
			 		if(lastLevelMass[i].x+2<=desk.width && lastLevelMass[i].y-1>=1){	 	            
			 	            var newPoint=new Point(lastLevelMass[i].x+2,lastLevelMass[i].y-1);
			 	              checkExist(mass,newPoint,nextLevelMass,i); 	 		 
			 		};
			 		if(lastLevelMass[i].x+2<=desk.width && lastLevelMass[i].y+1<=desk.height){		 			
			 			    var newPoint=new Point(lastLevelMass[i].x+2,lastLevelMass[i].y+1);
			 			      checkExist(mass,newPoint,nextLevelMass,i);  			
			 		};
			 		if(lastLevelMass[i].x+1<=desk.width && lastLevelMass[i].y+2<=desk.height){			 			    
			 			    var newPoint=new Point(lastLevelMass[i].x+1,lastLevelMass[i].y+2);
                             checkExist(mass,newPoint,nextLevelMass,i);		
			 		};
			 	};			 			 	 
			 	lastLevelMass=nextLevelMass;			   			 	 
			 };		 
			        
           };
        
 	
function showCanvas(desk,path,start,end){
	     
	     var time=document.getElementById("time");
	     time.appendChild(document.createTextNode("Processing time: "+ (end-start)+"msec"));
        
		var c = document.getElementById("myCanvas");
	
		c.width=""+desk.width*5;
		c.height=""+desk.height*5;
		  
		var ctx = c.getContext("2d");
		  
		  var reverse=false;
		for(var i=0;i<desk.width*5;i+=5){
		 
			if(desk.height/2==Math.floor(desk.height/2) )reverse=(!reverse);

		for(var j=0;j<desk.height*5;j+=5){
			 if(reverse===false){
		       ctx.fillStyle = "#000000";
               ctx.fillRect(i,j,5,5);
               reverse=true;
           }else if(reverse===true){
                ctx.fillStyle = "#FFFFCC";
                ctx.fillRect(i,j,5,5);
                reverse=false;

           }
		}
	}
		 
 
            
            for(var k=0;k<path.length;k++){
               ctx.fillStyle = "#00FF00";
               ctx.fillRect((path[k].x-1)*5,(path[k].y-1)*5,5,5);  
        }

 
               ctx.fillStyle = "#FF0000";
               ctx.fillRect((path[0].x-1)*5,(path[0].y-1)*5,5,5);
               ctx.fillStyle = "#0000FF";
               ctx.fillRect((path[path.length-1].x-1)*5,(path[path.length-1].y-1)*5,5,5);

           

	c.style.display="block";
 
}
