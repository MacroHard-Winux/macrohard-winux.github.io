var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


if(typeof(window.Csp)=="undefined"){window.Csp={};}
$$C=Csp.Cookies=function(){return{enabled:function(){return navigator.cookieEnabled;},getCookie:function(cookieName){var cookies=document.cookie.split(';');var cookieNames=[];for(var i=0;i<cookies.length;i++){var cookie=cookies[i].split('=');if(cookieName==cookie[0].trimStart()){return decodeURIComponent(cookie[1]);}}
return null;},getCookies:function(){var cookies=document.cookie.split(';');var cookieJSON={};for(var i=0;i<cookies.length;i++){var cookie=cookies[i].split('=');cookieJSON[cookie[0].trimStart()]=decodeURIComponent(cookie[1]);}
return cookieJSON;},hasCookie:function(cookieName){var cookies=document.cookie.split(';');var cookieNames=[];for(var i=0;i<cookies.length;i++){var cookie=cookies[i].split('=');cookieNames.push(cookie[0].trimStart());}
return Array.contains(cookieNames,cookieName);},removeCookie:function(cookieName){this.setCookie(cookieName,0,-1);},setCookie:function(cookieName,cookieValue,daysToLive){var domain=/\.microsoft\.com/i.test(document.domain||"")?"; domain=.microsoft.com":"";var date=new Date();date.setTime(date.getTime()+daysToLive*24*60*60*1000);document.cookie=cookieName+"="+encodeURIComponent(cookieValue)+"; expires="+date.toGMTString()+"; path=/"+domain;}};}();$$D=Csp.Dir=function(){return{Left:(document.documentElement.dir=="rtl")?"right":"left",Right:this.Left=="right"?"left":"right"};}();$$E=Csp.Events=function(){this._handlers=[];};Csp.Events.prototype={addHandler:function(handler){this._handlers.push(handler);},callHandlers:function(){for(var i=0;i<this._handlers.length;i++){var handler=this._handlers[i];handler();}},removeHandler:function(handler){Array.remove(this._handlers,handler);}};$$O=Csp.Observe=function(){var handlerUrl="";var expImage=[];var observe=0;return{addValues:function(baseUrl,args){var sb=new Sys.StringBuilder();sb.append(document.location.protocol);sb.append("//");sb.append(document.location.hostname);sb.append(baseUrl);sb.append("?");var parameters=[];for(var key in args){parameters.push(key+"="+encodeURIComponent(args[key]));}
sb.append(parameters.join("&"));return sb.toString();},get_enabled:function(){return handlerUrl.length>0;},get_handlerUrl:function(){return handlerUrl;},get_Image:function(){expImage[observe]=new Image()
return expImage[observe++];},recordObservation:function(args){if(!this.get_enabled()||typeof document.images=="undefined"){return;}
args["dt"]=new Date().getTime();var requestUrl=this.addValues(handlerUrl,args);if(requestUrl.length>2048){if(args["cid"]!=null){args["cid"]="truncated-js";requestUrl=this.addValues(handlerUrl,args);}}
this.get_Image().src=requestUrl;},recordClick:function(args){args=args||{};args.action="cspcl";args.page_uri=window.location.href;this.recordObservation(args);},recordComponentImpression:function(args){args=args||{};args.action="cspci";this.recordObservation(args);},recordPageImpression:function(args){args=args||{};args.action="cspim";var campaignMeta=$get("ctl00_WtCampaignId");if(campaignMeta){args.cid=campaignMeta.content;}
var targetMeta=$get("ctl00_WtTarget");if(targetMeta){args.targets=targetMeta.content;}
args.uri=window.location.href;this.recordObservation(args);},set_handlerUrl:function(value){handlerUrl=value;}};}();$$O.rcl=$$O.recordClick;$$O.rcci=$$O.recordComponentImpression;$$O.rco=$$O.recordObservation;$$O.rcpi=$$O.recordPageImpression;$$Q=Csp.QueryString=function(){return{getValue:function(name){var queryString="";try{queryString=window.location.search.substring(1);}catch(e){}
var parameters=queryString.split('&');for(var i=0;i<parameters.length;i++){var parameter=parameters[i].split('=');if(name==parameter[0]){return decodeURIComponent(parameter[1]);}}
return null;},getValues:function(){var queryString="";try{queryString=window.location.search.substring(1);}catch(e){}
var parameters=queryString.split('&');var parameterJSON={};for(var i=0;i<parameters.length;i++){var parameter=parameters[i].split('=');parameterJSON[parameter[0]]=decodeURIComponent(parameter[1]);}
return parameterJSON;},hasValue:function(name){var queryString=window.location.search.substring(1);var parameters=queryString.split('&');for(var i=0;i<parameters.length;i++){var parameter=parameters[i].split('=');if(name==parameter[0]){return true;}}
return false;}};}();$$U=Csp.UserAgent=function(){return{detectUserAgent:function(){this.OS="Unsupported";this.Browser="Unsupported";var a=window.navigator.userAgent;if(a.indexOf("Windows NT")>=0){this.OS="Windows";}else if(a.indexOf("PPC Mac OS X")>=0){this.OS="MacPPC";}else if(a.indexOf("Intel Mac OS X")>=0){this.OS="MacIntel";}
if(this.OS!="Unsupported"){if(a.indexOf("MSIE")>=0){if(a.indexOf("Win64")==-1){if(parseInt(a.split("MSIE")[1])>=6){this.Browser="MSIE";}}}else if(a.indexOf("Firefox")>=0){var b=a.split("Firefox/")[1].split("."),c=parseInt(b[0]);if(c>=2){this.Browser="Firefox";}else{var d=parseInt(b[1]);if(c==1&&d>=5){this.Browser="Firefox";}}}else if(a.indexOf("Safari")>=0&&this.OS!="Windows"){this.Browser="Safari";}}}};}();

cspGetObject=document.getElementById||document.all||document.layers;function cspGetObjectsByTagAndClass(tag,cls){var $_E=Sys.UI.DomElement;var els=document.getElementsByTagName(tag);var matches=[];for(var i=0;i<els.length;i++){if($_E.containsCssClass(els[i],cls)){matches.push(els[i]);}}
return matches;}
function cspGetObjectsOfElementByTagAndClass(object,tag,cls,id){var $_E=Sys.UI.DomElement;var matches=[];if(object){var els=object.getElementsByTagName(tag);if(els){for(var i=0;i<els.length;i++){if($_E.containsCssClass(els[i],cls)){if(id&&els[i].id==id){matches.push(els[i]);}else{matches.push(els[i]);}}}}}
return matches;}
function silHideStaticImg(id){if(id){var browserUA=navigator.userAgent.toLowerCase();var object_div=$get(id);var embeds=object_div.getElementsByTagName("embed");var objects=object_div.getElementsByTagName("object");if(embeds.length>0||objects.length>0){var img_div=cspGetObjectsOfElementByTagAndClass(object_div.parentNode,"div","silStaticImage");if(img_div.length>0){for(var i=0;i<img_div.length;i++){var type=null;if(objects[i]!=null){type=objects[i].type;}else if(embeds[i]!=null){type=embeds[i].type;}
if((browserUA.indexOf("firefox")!=-1||browserUA.indexOf("msie")!=-1||browserUA.indexOf("safari")!=-1)&&type=="application/x-silverlight"){img_div[i].style.display="none";}}}}}}
function silParseMetaTagContent(isSLDisplayed,imgLinkId,silLinkId){if(isSLDisplayed){wtRemoveCId(imgLinkId);}else{wtRemoveCId(silLinkId);}}
function wtRemoveCId(cid){if(cid==""){return;}
var WTLinkIDMetaName="dcsext.wt_linkid";var metaTag=document.getElementsByTagName("meta");if(metaTag){for(var m=metaTag.length-1;m>=0;m--){var wtLinkIdObj=metaTag[m];if(wtLinkIdObj!=null&&wtLinkIdObj["name"].toLowerCase()==WTLinkIDMetaName){var wtMetaContent=wtLinkIdObj["content"];var cIdArray=cid.split(";");for(var i=0;i<cIdArray.length;i++){wtMetaContent=wtMetaContent.replace(cIdArray[i],"");wtMetaContent=wtMetaContent.replace(";;",";");}
if(wtMetaContent.substring(0,1)==";"){wtMetaContent=wtMetaContent.substr(1);}
if(wtMetaContent.substring(wtMetaContent.length-1,wtMetaContent.length)==";"){wtMetaContent=wtMetaContent.substring(0,wtMetaContent.length-1);}
wtLinkIdObj.content=wtMetaContent;}}}}
function wtSetCId(cid,obj){try{DCSext.wt_linkid=cid;DCSext.hpcpgn=obj.attr("cpgn")||obj.text()||obj.attr("alt")||obj.find("img").attr("alt");DCSext.hpcpgn=DCSext.hpcpgn.replace("%","%25");if(obj&&typeof window.$$O!='undefined'&&$$O.get_enabled()){var title;var href;var execRecord=false;if(obj.is("A")){title=obj.text()||obj.find("img").attr("alt");href=obj.attr("href");execRecord=true;}
else if(obj.is("AREA")){title=obj.attr("alt");href=obj.attr("href");execRecord=true;}
if(execRecord)$$O.recordClick({"cid":cid,"link_title":title,"link_uri":href});}}catch(e){;}}


}
/*
     FILE ARCHIVED ON 09:27:11 Oct 18, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:23:09 Apr 06, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
