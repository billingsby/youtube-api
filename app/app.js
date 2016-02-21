$(function() {

  $('#search-term').submit(function(event) {
    event.preventDefault();
    searchInput = $('#query').val();
    getRequest(searchInput);
    $('#moreResults').toggle(); 
    $('#previousResults').toggle(); 
  });

  $('#moreResults').click(function(event) {
    event.preventDefault();
    moreResults(searchInput);
    
  });

  $('#previousResults').click(function(event) {
    event.preventDefault();
    previousResults(searchInput);
    
  });


});

// Global Variables
  var limit = 9;
  var grabItems = [];
  var next = "";
  var previous = "";
  var searchInput = "";
  var url = 'https://www.googleapis.com/youtube/v3/search';

 var params = {
    part: 'snippet',
    order: 'relevance',
    maxResults: limit,
    key:'AIzaSyCljHHBsg2XfhNuAE_Vc_0X5Z3qZhB6pVA'
  };



function getRequest(searchInput) {
  params.q = searchInput;
  console.log(params)
  $.getJSON(url, params, function(data) {
    next = data.nextPageToken;
    console.log(data);
    grabItems = data.items;
    getResults(grabItems);
  });
  
}

function moreResults(searchInput) {
  params.pageToken = next;
  $('#search-results').text("");
  $.getJSON(url, params, function(data) {
    previous = data.prevPageToken;
    grabItems = data.items;
    next = data.nextPageToken;
    getResults(grabItems);

  });
}

function previousResults(searchInput) {
  params.pageToken = previous;
  $('#search-results').text("");
  $.getJSON(url, params, function(data) {
    grabItems = data.items;
    next = data.nextPageToken;
    getResults(grabItems);

  });
}


function getResults(data){
  var html = "";
    for(var i = 0; i < limit; i++){
      var title = data[i].snippet.title;
      var thumb = data[i].snippet.thumbnails.medium.url;
      var video_id = data[i].id.videoId;
      var description = data[i].snippet.description;
      var video_url = 'https://www.youtube.com/watch?v=' + video_id;
      var link = '<a id=\"tube\" href=\"' + video_url + '\"><img src=\"' + thumb + '\"></a>';
      html += '<div class=\"item\">' + '<h3>' + title + '</h3>' + link + '<div class=\"description\">'+ description + '</div></div>';  
    }   

    $('#search-results').html(html); 
        
  }  


