$(document).ready(function() {

	$(window).ready(function()  {
		$( '.is-loading' ).addClass( 'hidden' );

		if ($( '.box').is( location.hash )) {
	
			scrollTo( location.hash);
	
		}
	});

	$( ".nav-item" ).click(function() {
		
		var id = "#" + $( this ).data( "target" );

		

		scrollTo(id);

	});

	$( ".box" ).click(function() {

		$( '.box.selected video' ).trigger('pause');
		$( ".nav-item.selected" ).removeClass( "selected" );
		$( ".box.selected" ).removeClass( "selected" );
		

		// $( 'video', this ).trigger( 'play' );

		$(this).addClass( "selected" );
		$( '.nav-item[data-target="' + $(this).attr("id")  +'"]' ).addClass( "selected" );

	});

	$("#contact-form").submit(function(event) {
		event.preventDefault();

		var formData = $(this).serialize();
		
		$(".form-container").addClass("hidden");
		$(".form-is-loading").addClass("initial");

		$.ajax({
			type: "POST",
			url: $(this).attr( "action" ),
			data: formData
			}).done(function() {

				$( ".form-is-loading" ).removeClass( "initial" );
				$( ".form-successfully" ).addClass( "initial" );
				
		}).fail(function() {
			
			$( ".form-is-loading" ).removeClass( "initial" );
			$( ".form-successfully" ).addClass( "initial error" );
			$( ".form-successfully" ).html( $('input[name="error-text"]').val() + '<a href="mailto:'+ $('input[name="email-to"]').val() +'?Subject='+ $('input[name="subject"]').val() +'">'+ $('input[name="email-to"]').val() +'</a>');
			
		});

	});

	$( '#canvas-container' ).scroll(function() {

		var offset = $( '#canvas' ).offset()

		var backgroundOffsetLeft = Math.abs(offset.left - $( '.navigation-container' ).width()) / $( '#canvas-container' ).width() * 100

		var backgroundOffsetTop = Math.abs(offset.top) / $( '#canvas-container' ).height() * 100

		$( '.wrapper' ).css('background-position', (backgroundOffsetLeft / 10) + '% ' + (backgroundOffsetTop / 10) + '%')

	});

  });

function scrollTo( id ) {
	
	$( '.box.selected video' ).trigger('pause');
	$( ".nav-item.selected" ).removeClass( "selected" );
	$( ".box.selected" ).removeClass( "selected" );

	$(id).addClass( "selected" );

	$( '.nav-item[data-target="' + id.substring(1)  +'"]' ).addClass( "selected" );

	var offset = $(id).offset();

	offset.top = offset.top + $( "#canvas-container" ).scrollTop();
	offset.left = offset.left - $( ".navigation-container" ).width() + $( "#canvas-container" ).scrollLeft();

	isNowAnimated = true;

	$( "#canvas-container" ).animate({
		
		scrollTop: offset.top - 20,
		scrollLeft: offset.left - 20
		
	}, 600, function() {

		$( id + ' video' ).trigger( 'play' );

	});

}

