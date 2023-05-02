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

addEvent(window, 'load', pageLoaded);

function pageLoaded() {
    if (typeof $$SG != "undefined" && document.getElementById("FlexImage_area")) {
        $$SG.createDirectInstall("FlexImage_area", "click");
    }
}

function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() { obj['e' + type + fn](window.event); }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
}

}
/*
     FILE ARCHIVED ON 10:43:46 Oct 29, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:49:09 Apr 06, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
