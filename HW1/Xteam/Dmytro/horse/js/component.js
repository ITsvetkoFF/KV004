function Component()
{
// ссылка на html-элемент интерфейса с которым работает 
this.elem = null;
this.init = function (sSelector) {
	this.selector = sSelector;
	this.elem = $(this.selector);
		if (!this.elem.length){
		alert('Can`t access form by selector: ' + this.selector);
		}
	} 

this.find = function (sSelector){
	var  find_result = this.elem.find(sSelector);
		if (find_result.length){
			return find_result;
			}
		else{
			alert('Could not find element by selector' + sSelector);
			}
	}

this.copyData = function(oSourse,oDestination, aFieldNames){
	$.each(aFieldNames, function(i, fieldName){
		var oSourceElement 		= oSourse		.find(fieldName); //это один елемент картинка или поле ввода ит.д
		var oDestinationElement = oDestination	.find(fieldName); //это один елемент картинка или поле ввода ит.д
		var tagName 			= oSourceElement.prop('tagName');
		
		if ( tagName == 'IMG'){ 		//если источнтк это изображение 		oSourse.is('img')
				oDestinationElement.attr('src'
					,oSourceElement.attr('src'));
			}
		else if (tagName=='INPUT' || tagName=='TEXTAREA'){	//если источнтк это поле ввода
				oDestinationElement.val(
			oSourceElement.val());
			}
		else {		//иначе -- содержательный(парный) тег
				oDestination.find(fieldName).html(
					 oSourceElement.html());
		}	
	});
	
	
	} //end of function
}
