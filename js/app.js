// the user id for the flickr user hosting the portfolio set
// (most easily obtained via http://idgettr.com/)
FLICKR_USER_ID = '70738915@N02';

// the id of the portfolio flickr set
FLICKR_SET_ID = '72157628149153533';

$(document).ready(function(){
  var tab = null;
  
  switch ( location.pathname ) {
    case '/':
      tab = 'home'; break;
    case '/music':   
      tab = 'music'; break; 
    case '/gallery':
      tab = 'photos'; break;
    case '/tagged/media':
      tab = 'media'; break;
    case '/about':
      tab = 'bio'; break;
    case '/tour':
      tab = 'tour'; break;          
  }
  
  if ( tab ) {
    $('header a.' + tab).addClass('active');
  }
  
  // Music page: add playlist embed
  if ( tab == 'music' ) {
    $('#content .post .body').append('<object width="450" height="470"> <param name="movie" value="http://www.musicplaylist.us/mc/mp3player_new.swf"></param> <param name="allowscriptaccess" value="never"></param> <param name="wmode" value="transparent"></param> <param name="flashvars" value="config=http%3A%2F%2Fwww.indimusic.us%2Fext%2Fpc%2Fconfig_black.xml&amp;mywidth=450&amp;myheight=470&amp;playlist_url=http%3A%2F%2Fwww.musicplaylist.us%2Fpl.php%3Fplaylist%3D85564584%26t%3D1304532440&amp;wid=os"></param> <embed style="width:450px; visibility:visible; height:470px;" allowScriptAccess="never" src="http://www.musicplaylist.us/mc/mp3player_new.swf" flashvars="config=http%3A%2F%2Fwww.indimusic.us%2Fext%2Fpc%2Fconfig_black.xml&amp;mywidth=450&amp;myheight=470&amp;playlist_url=http%3A%2F%2Fwww.musicplaylist.us%2Fpl.php%3Fplaylist%3D85564584%26t%3D1304532440&amp;wid=os" width="450" height="470" name="mp3player" wmode="transparent" type="application/x-shockwave-flash" border="0"/> </object>');
  }
  // Photo page: add Flickr embed
  else if ( tab == 'photos' ) {
    // Append flickr photos to page content
		$('#content .post .body').append('<div id="flickr-images"></div><p id="flickr-link"><a href="http://www.flickr.com/photos/' + FLICKR_USER_ID + '/sets/' + FLICKR_SET_ID + '/">Browse more of Natalie\'s photos on Flickr ↬</a></p>');
		
		// load the portfolio photos from flickr
		var url = 'http://api.flickr.com/services/feeds/photoset.gne?set=' + FLICKR_SET_ID + '&nsid=' + FLICKR_USER_ID + '&lang=en-us&format=json&jsoncallback=?';

		$.getJSON(url, function(data){
	
			// attach all images to the portfolio slide
			var $div = $('#flickr-images');
			$.each(data.items, function(i,item){
				var src = item.media.m.replace(/_m\.jpg$/, '_s.jpg');
				var href = item.media.m.replace(/_m\.jpg$/, '_z.jpg');
				$div.append('<a rel="portfolio" href="' + href + '" title="' + item.title + '"><img src="' + src + '" alt="' + item.title + '" /></a>');
			});
	
			// set the portfolio images to open in a fancybox overlay
			$("a[rel=portfolio]").fancybox({
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'titlePosition' 	: 'over',
				'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
					return '<span id="fancybox-title-over">[' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? '] &nbsp; ' + title : ']') + '</span>';
				}
			});				
		});
  }
});
