(function() {

	Momenty = {

                utilities: {
                  errorCallback: function( response ) {
                    console.error("Error occurred", response);
                  },

                  successCallback: function ( response ) {
                    console.debug("Got this response from server", response);

                  },
                  processSelectionData: function (rawSelection){
                    return {
                            range : RangeSerializer.serialize(rawSelection.range),
                            url: window.location.href,
                            userId: 1,
                            text: rawSelection.text
                        }
                    }
                },

                init: function(callback, userId) {
                        this.userId = userId;
        	        this.selections = this.getUserSelections();
                        this.callback = callback;
                        this.selections.forEach(function(selection){
                                callback(selection.range);
                        });

                },

                getUserSelections: function(){
                  //TODO Implement this
                  return [];
                },

                postSelection: function (selection, callback) {
                  data = this.utilities.processSelectionData(selection);
                  var utils = this.utilities;
                  if(!callback){
                          callback = this.callback;
                  }
                  console.log(data);
                  aja()
                  .method('post')
                  .url('https://echo.getpostman.com/post')
                  .cache(false)
                  .header('Content-Type', 'application/json')
                  .body(data)
                  .on('200', function(response){
                      console.log('well done');
                      utils.successCallback(response);
                      callback(selection.range);
                  })
                  .on('501', function(response){
                      console.log('oh crap');
                      utils.errorCallback(response);
                  })
                  .go();
                }
        }
})();
