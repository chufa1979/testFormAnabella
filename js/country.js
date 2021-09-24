$(document).ready(function () {

    let price = 200;
    let soles = 4.11; /// se puso como fijo el valor pero se puede buscar algun servicio que pegarle, en los requerimientos no estaba aclarado

    function getElementText(response, elementName) {
        return response.getElementsByTagName(elementName)[0].innerHTML;
    }
    
    fetch('http://api.hostip.info').then(response => {
        return response.text();
   }).then(xml => { 
       return (new window.DOMParser()).parseFromString(xml, "text/xml");
   }).then(xmlDoc => {
        countryName = getElementText(xmlDoc , "countryName");
        countryCode = getElementText(xmlDoc , "countryAbbrev");
        if (countryName==='PERU'){
            let convertsoles = price + soles;
            $("#price").html("Precio: S/"+convertsoles);
        } else {
            $("#price").html("Price: U$"+price);
        }
   });
    
});
