// Just add the following line.
SP.SOD.executeOrDelayUntilScriptLoaded("SP.UserProfiles.js", 
   "~sitecollection/Style Library/Scripts/jquery.SPServices-2013.01.js");

var siteCollection = "/";
var siteCollectionUrl = "https://manage.dev1.rowansj.edu";     
var pageName; 
var subsite;
// Fetch the name of the subsite you're currently on.
$().SPServices({
    operation: "SiteDataGetWeb",
    async: false,
  completefunc: function (xData, Status) {
   subsite = $(xData.responseXML).SPFilterNode("Title").text();
  }
});
// Fetch the url of the subsite you're currently on.
var subsiteUrl = $().SPServices.SPGetCurrentSite();
// Fetch the title of the page, remove a piece of text from the title
// (in my case, "Pages - "), then remove any white spaces before and 
// after the title.
var pageTitle = document.getElementsByTagName("title")[0].innerHTML
   .replace("Pages - ", "").replace(/^\s\s*/, "").replace(/\s\s*$/, "");

// If the current site is the same as the site collection (meaning it is
// not a subsite), then use the url of the current page.
if (subsite == siteCollection) {
 // Create the string that will contain the breadcrumb trail.
 var text = "<a href='" + siteCollectionUrl + "'>" + siteCollection 
 + "</a> > <a href='" + document.URL + "'>" + pageTitle + "</a>";
}
// In any other case, use the url of the subsite. 
else {
 // Create the string that will contain the breadcrumb trail.
 var text = "<a href='" + siteCollectionUrl + "'>" + siteCollection 
 + "</a> > <a href='" + subsiteUrl + "'>" + subsite + "</a>";
}

$(function runMe() {
 // Set the ID of your subsite navigation. 
 var $this = $("#NavRootAspMenu");
 if($this != null) {
  // Remove the class "static" from the last item in the navigation 
  // (because it(s a link to edit the navigation) and remove the last
  // child element (since this doesn't have a href attribute).
  $(".ms-listMenu-editLink").removeClass("static");
  $("ul[id*='RootAspMenu'] li.ms-navedit-editArea:last-child").remove();
  $this.find("li").each(function(i){
   var elem = $($this).find("li.static")[i]; 
   // If elem finds an anchor tag that contains the following class, then
   // add a new class. We'll use this class for the parent elements.
   if ($(elem).find("a").hasClass("ms-core-listMenu-selected")) {
    $(elem).addClass("parentSelected");
   }  
  });  
  // If the subsite navigation contains elements with the class 
  // "parentSelected" and that element contains an anchor, a span and
  // another span with the class "menu-item-text", then for each of those
  // elements do the following. 
  $this.find(".parentSelected > a span span.menu-item-text")
   .each(function(j) { 
   $(this).addClass("bcn");  //bcn = breadcrumbnode
   var crumbLink = $($this).find(".parentSelected > a")[j].href;
   var crumbName = $("span.bcn")[j].innerHTML;
   // If the link equals the url of the site collection, then this list
   // item is a category and it does not require an anchor tag.
   if (crumbLink == "https://your-site-collection.com/") {
    text = text + " > " + crumbName;
   }
   // In any other case, this list item has a page and we will add an
   // anchor tag to the breadcrumb trail. 
   else {
   text = text + " > <a href='" + crumbLink + "'>" + crumbName + "</a>";
   }
  });
 }
// When we ran through the navigation, apply the new breadcrumb trail to
// the element in the master page. 
document.getElementById("customBreadcrumb").innerHTML = text;
});