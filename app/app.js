$(function() {
  $('#search-term').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
    
  });

$('#search-results').on('click', '#tube', function() {
                      $.fancybox({
                        'padding'        : 0,
                        'autoScale'      : false,
                        'transitionIn'   : 'none',
                        'transitionOut'  : 'none',
                        'title'          : this.title,
                        'width'          : 680,
                        'height'         : 495,
                        'href'           : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                        'type'           : 'swf',
                        'swf'            : {
                        'wmode'              : 'transparent',
                        'allowfullscreen'    : 'true'
                        }
                    });
                return false;
            });
});
  
$('#foo').bind('click', function() {
  alert($(this).text());
});
            
$('#foo').trigger('click');



// Global Variables
var limit = 9;
var grabItems = [];

function getRequest(searchTerm) {
  var params = {
    part: 'snippet',
    q: searchTerm,
    chart: 'mostPopular',
    maxResults: limit,
    key:'AIzaSyCljHHBsg2XfhNuAE_Vc_0X5Z3qZhB6pVA'
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
  var html = "";
    for(var i = 0; i < limit; i++){
      var title = data[i].snippet.title;
      console.log(title);
      var thumb = data[i].snippet.thumbnails.medium.url;
      var video_id = data[i].id.videoId;
      console.log(video_id);
      var video_url = 'https://www.youtube.com/watch?v=' + video_id;
      var link = '<a id=\"tube\" href=\"' + video_url + '\"><img src=\"' + thumb + '\"></a>';
      html += '<div class=\"item\">' + '<h3>' + title + '</h3>' + link + '</div>';  

    }   
    console.log(html);
    $('#search-results').html(html);       
  }  

  
