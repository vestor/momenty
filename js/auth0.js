var lock = new Auth0Lock('BkO0WOxakURWLP2q7mC3sxCUvklh73WH', 'momenty.auth0.com');
var btn_login = document.getElementById('btn-login');
var showLock = function() {
  lock.show();
};
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    chrome.storage.sync.set('id_token', authResult.idToken);
    // Display user information
    console.log(profile);
  });
});
