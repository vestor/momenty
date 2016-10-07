let MOMENTY_TOKEN;
let MOMENTY_USER_ID;

if('MOMENTY_TOKEN' in chrome.storage.sync) {
  //If we already have the tokens, it means that the user has already logged in
  MOMENTY_TOKEN = chrome.storage.sync['MOMENTY_TOKEN'];
  MOMENTY_USER_ID = chrome.storage.sync['MOMENTY_USER_ID'];

  chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.browserAction.setPopup({'popup' : 'html/popup.html'});
  });
} else {
  //Let's prompt the user to log in
  chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.windows.create({'url' : 'login.html'});
  });
}
