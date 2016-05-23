$(document).ready(function(){
  var now = $.now();
  chrome.storage.sync.get('syncTime',function(item){
    if ((now-item.syncTime)>20000) {
      //change
      showImage();
      syncURL();
    }else{
      showImage();
    }
    chrome.storage.sync.set({'syncTime': now}, function() { });
  });
  var syncURL = function(){
    $.get( "https://api.desktoppr.co/1/wallpapers/random", function( data ) {
      var imageURL=data.response.image.url;
      chrome.storage.sync.set({'imageURL': imageURL}, function() {
        $('#theImage').attr("src",imageURL);
      });
    });
  }
  var showImage = function(){
    chrome.storage.sync.get('imageURL',function(items){
      var str = items.imageURL;
      $('#theImage').attr("src",str);
    });
  }
  $('#newImage').click(function(){
    syncURL();
  });
});

$('#textbox').keydown(function(){
  if (event.keyCode == 13 || event.which == 13) {
    googleLocation='http://www.google.com/search?q=' + encodeURIComponent(document.getElementById('textbox').value);
    window.open(googleLocation,"_self");
  }
});
