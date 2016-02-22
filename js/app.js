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

  $(document).on('click', '.lightbox-trigger', function(e) {
    e.preventDefault();
    var image_href = $(this).attr("href");

    if ($('#lightbox').length > 0) { // #lightbox exists
      
      //place href as img src value
      $('#content').html('<iframe id="video" src="' + image_href +'?rel=0&autoplay=1"></iframe>');
      $('#lightbox').show('fast');
    } else { //#lightbox does not exist - create and insert (runs 1st time only)
      
      //create HTML markup for lightbox window
      var lightbox = 
      '<div id="lightbox">' +
        '<div id="content">' + //insert clicked link's href into img src
          '<iframe id="video" src="' + image_href +'?rel=0&autoplay=1"></iframe>' +
        '</div>' +  
      '</div>';
        
      //insert lightbox HTML into page
      $('body').prepend(lightbox);
    }
    
  });
  
  //Click anywhere on the page to get rid of lightbox window
  $(document).on('click', '#lightbox', function() { //must use live, as the lightbox element is inserted into the DOM
    $('#video').attr('src', '');
    $('#lightbox').hide();
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
      var video_url = 'https://www.youtube.com/embed/' + video_id;
      var link = '<a class="lightbox-trigger" id="tube" href="' + video_url + '"><img src="' + thumb + '"></a>';
      html += "<div class='item'>" + '<h3>' + title + '</h3>' + link + '<div class=\"description\">'+ description + '</div></div>';  
    }   

    $('#search-results').html(html); 
}  

