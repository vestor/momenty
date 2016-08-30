var isAuthenticated = true;





chrome.browserAction.onClicked.addListener(function(activeTab){

  if(isAuthenticated){
    console.debug("Inside browser action");
    chrome.browserAction.setPopup({"popup" : "/html/popup.html" });
  } else {
    var newURL = chrome.extension.getURL("momenty.co/login");
    console.log("Browser initiated");
    chrome.tabs.create({ url: newURL });
  }
});
