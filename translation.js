function getParameterByName(name)
        {
          name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
          var regexS = "[\\?&]" + name + "=([^&#]*)";
          var regex = new RegExp(regexS);
          var results = regex.exec(window.location.href);
          if(results == null)
            return "";
          else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }

getTranslateObject = function()
        {
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }

            if(locale == 'jp')
            {
                xmlhttp.open("GET","noodles_jp.xml",false);
                xmlhttp.send();
                xmlDoc=xmlhttp.responseXML;
            }
            else
            {
                xmlhttp.open("GET","noodles_en.xml",false);
                xmlhttp.send();
                xmlDoc=xmlhttp.responseXML;
            }
            var translate_unit = {}
            var all_context = xmlDoc.getElementsByTagName('group')

            for(var i = 0; i < all_context.length; i++)
            {
                var context = all_context[i]
                var all_trans_unit = context.getElementsByTagName('trans-unit')
                var context_translation = {}
                for(var j = 0; j < all_trans_unit.length; j++)
                {
                   var currentNode = all_trans_unit[j]
                   context_translation[currentNode.getAttribute('id')] = currentNode.getElementsByTagName('target')[0].childNodes[0].nodeValue
                }
                translate_unit[context.getAttribute('extradata')] = context_translation
            }
           return translate_unit
        }

function translate(parentNode)
{
    translationUnit = getTranslateObject()
    parentNode.render( translationUnit);
}

