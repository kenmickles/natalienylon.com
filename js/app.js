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

	// how's this for a hack: inject new banner ad because i'm too lazy to update the tumblr theme
	$('#top').html('<a href="https://itunes.apple.com/us/album/star-crossed-single/id585395508"><img src="http://natalienylon.37i.net/images/starcrossed_banner.jpg" alt=""></a>');

	// and the NN logo too
	$('body').append('<div id="nn"></div>');
  
  // Music page: add playlist embed
  if ( tab == 'music' ) {
    $('#content .post .body').append('<iframe width="300" height="410" style="position: relative; display: block; width: 300px; height: 410px;" src="http://bandcamp.com/EmbeddedPlayer/v=2/album=3446449114/size=grande3/bgcol=d8c7bd/linkcol=7f5aa0/transparent=true/" allowtransparency="true" frameborder="0"><a href="http://natalienylon.bandcamp.com/album/star-crossed">Star​-​Crossed by Natalie Nylon</a></iframe>');
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
