$(function() {
  $('#search-term').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
    
  });
});

// Global Variables
var limit = 9;
var grabItems = [];

function getRequest(searchTerm) {
  var params = {
    part: 'snippet',
    q: 'bikes',
    chart: 'mostPopular',
    maxResults: limit,
    key: 'AIzaSyCljHHBsg2XfhNuAE_Vc_0X5Z3qZhB6pVA'
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data) {
    console.log(data);
    grabItems = data.items;
    console.log(grabItems);
    getResults(grabItems);
  });
  
}



function getResults(data){
    for(var i = 0; i<data.length; i++){
      var title = $("<h3>").append(data.items[i].snippet.title);
      console.log(title);
      var thumb = $("<img>").attr("src",data.items[i].snippet.thumbnails.medium.url);
      var video_id = data.items[i].snippet.resourceId.videoId;
      var video_url = 'https://www.youtube.com/watch?v='+video_id;
      var link = $("<a target='_blank'>").attr("href",video_url).append(thumb);
      var holder = $('.item').append(link,title);
      $('.search-reults').append(holder);        
    }        
  }  