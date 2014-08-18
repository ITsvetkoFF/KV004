$(window).resize(function() {
	
	
    if($(window).width()<1150&&$(window).width()>950){
	    var w=1150-$(window).width();
    
	    $("#logo").css("left",""+(200-w)+"px");
	    $(".header-menu-content").css("margin-left",""+(300-w)+"px");
    }
			    if($(window).width()<950){ 
				    $(".header-menu-content").css("margin-left","0px");
			     $(".header-menu").css("display","none");
				    $(".header-menu-content").css("display","none");
				 $(".header-bottom").css("display","none");}
	
				if($(window).width()>950){ 
					 $(".header-menu").css("display","block");
				    $(".header-menu-content").css("display","block");
				 $(".header-bottom").css("display","block");}
					
						if($(window).width()>1151){ 
						$("#logo").css("left","200px");
					 $(".header-menu-content").css("margin-left","300px");
					
				}       
     
	});


window.onload=function(){
    var map = L.map('map').setView([50.45, 30.52], 7);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // add a marker in the given location, attach some popup content to it and open the popup
   var marker=L.marker([50.45, 30.52]).on('click',showProblem);
    marker.addTo(map);
        
   //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");
        
        filesInput.addEventListener("change", function(event){
            
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            
            for(var i = 0; i< files.length; i++)
            {
                var file = files[i];
                
                //Only pics
                if(!file.type.match('image'))
                  continue;
                
                var picReader = new FileReader();
                
                picReader.addEventListener("load",function(event){
                    
                    var picFile = event.target;
                    
                    var div = document.createElement("div");
                    
                    div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/>";
                    div.className = "added_photo"
                    
                    div.onclick = function() {div.parentNode.removeChild(div);};
                    
                    output.insertBefore(div,null);
                
                });
                
                 //Read the image
                picReader.readAsDataURL(file);
            }
           
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }

 
   
    
    
} 


 

$(document).ready(function(){
    $("#panel-pointer").click(function(){
       
      $(".b-container-panel").animate({left:'0px'});
       $("#panel-pointer").animate({left:'300px'});
         $("#panel-pointer").css("background-position","-5px center");
      
 
    
    
    });
      $("#panel-pointer").click(function(){
       if($("#panel-pointer").css("left")=="300px"){
      $(".b-container-panel").animate({left:'-300px'});
       $("#panel-pointer").animate({left:'0px'});
           $("#panel-pointer").css("background-position","-40px center");
       }
 
    
    
    });
     
    $("#info-pointer").click(function(){
       if($("#info-pointer").css("right")=="680px"){
      $(".b-container-info").animate({right:'-680px'});
             
       $("#info-pointer").animate({right:'-20px'});
          
            
       }
    if($("#info-pointer").css("right")=="400px"){
      $(".b-container-addproblem").animate({right:'-400px'});
             
       $("#info-pointer").animate({right:'-20px'});
          
            
       }
    
    
    });
     
	
	 $(".mini-menu").click(function(){
        if( $(".header-menu-content").css("display")=="none"){
		 $(".header-menu").css("display","block");
		  $(".header-bottom").css("display","block");
		  $(".header-menu-content").css("display","block");}
		 else{
			 $(".header-menu").css("display","none");
		  $(".header-bottom").css("display","none");
		  $(".header-menu-content").css("display","none");
			 
			 
		 }
		 
 
    
    
    });
 
});
function showForm(){
   
	hideForms();
      
	$(".login-form").css("display","inline-block");
	$(".login-form").css("*display","block");
       $(".login-form").animate({top:'54px'});
        
	
	
}
function hideForms(){
	$(".login-form").animate({top:'-310px'});
	$(".registration-form").animate({top:'-450px'});
 
	 
	
}
function showRegForm(){
 
	hideForms();
    
	$(".registration-form").css("display","inline-block");
	$(".registration-form").css("*display","block");
       $(".registration-form").animate({top:'53px'});
        
	
	
}
function showAddProblem(){
     
       hideProplem();
        	$(".b-container-addproblem").css("display","block");
      $(".b-container-addproblem").animate({right:'0px'});
       $("#info-pointer").animate({right:'400px'});
          
      

}
function hideProplem(){
    $(".b-container-addproblem").css("display","none");
    $(".b-container-info").css("display","none");
}
function showProblem(){
     hideProplem();
       
        	$(".b-container-info").css("display","block");
      $(".b-container-info").animate({right:'0px'});
       $("#info-pointer").animate({right:'680px'});
          
      

}