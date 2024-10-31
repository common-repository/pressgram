(function( $ ) {
	"use strict";

	$(function() {

		var sUrl, aUrl, i, l, sQuery, aQuery;

		// Determine if we have any query string parameters
		sUrl = window.location.href;
		aUrl = sUrl.split('?');

		// First, see if there are query string variables
		if ( 0 < aUrl.length ) {

			// Next, iterate through them and split on the '='
			for( i = 0, l = aUrl.length; i < l; i++ ) {

				// Split the current key/value pair into an array
				sQuery = aUrl[ i ];
				aQuery = sQuery.split('=');

				// Look to see if we've discovered the Pressgram key/value
				if( 0 < aQuery.length && 'pressgram' === aQuery[1] ) {

					// If so, scroll to the bottom...
					window.scrollTo( 0, $(window).height() );

				} // end if

			} // end for

		} // end if

		// Secondly, check to see if our select box exists. If so, apply Select2.
		if ( 0 < $('select#pressgram_category').length ) {

			$('select#pressgram_category').select2({
				width: 187
			});

		} // end if

		// If pressgram_fine_control_show_multi_category_homepage is clicked uncheck pressgram_fine_control_show_home
        $('#pressgram_inclusion_show_multi_category_homepage').on('click', function () {
            $('input#pressgram_inclusion_show_home').prop('checked','');
        });

		// If pressgram_fine_control_show_home is clicked uncheck pressgram_fine_control_show_multi_category_homepage
        $('#pressgram_inclusion_show_home').on('click', function () {
            $('#pressgram_inclusion_show_multi_category_homepage').prop('checked','');
        });

		// If pressgram_fine_control_show_multi_category_feed is clicked uncheck pressgram_fine_control_show_feed
        $('#pressgram_inclusion_show_multi_category_feed').on('click', function () {
            $('input#pressgram_inclusion_show_feed').prop('checked','');
        });

		// If pressgram_fine_control_show_feed is clicked uncheck pressgram_fine_control_show_multi_category_feed
        $('#pressgram_inclusion_show_feed').on('click', function () {
            $('#pressgram_inclusion_show_multi_category_feed').prop('checked','');
        });

        // respond to server with accepted invite
		$("#add-pressgram-category,#remove-pressgram-category").click(function() {

			// get the selected category
			var categorySelected = $('#pressgram_category').find(':selected');

			// get the state change for selected category (1=add, 0=remove)
			var categoryState = $(this).data('category-control');
			
			// alert user if no category selected
			if ( 'default' == categorySelected.val() ) {
				alert( 'Please select a category.' );
			} else {

				// send ajax request to add/remove category in database
				$.post(ajaxurl, {
					action: 'pressgram_category',
					pressgram_category: categorySelected.val(),
					pressgram_category_state: categoryState
				}, function (response) {
					
					// if success
	                if ( 1 === parseInt(response) ) {

	                	// if adding a category, do this
	                   	if ( '1' == categoryState ) {

	                   		// add an item to category selection
							$('<a href="options-media.php?pfc_current_category='+categorySelected.val()+'" id="pressgram-fine-control-'+categorySelected.val()+'" class="nav-tab">'+categorySelected.data('category-name')+'</a>').appendTo($("#pressgram_fine_control_categories"));
						
						}
						// if removing, do this
						if ( '0' == categoryState ) {

							// hide the item from category selection
							$('a[id="pressgram-fine-control-'+categorySelected.val()+'"]').hide();

							// hide the fieldset
							$('fieldset[id="pressgram-fine-control-cat-'+categorySelected.val()+'-fields"]').hide();

							// if category was currently being edited
							if ( $('input[id="pfc-current-cat"]').val() == categorySelected.val() ) {

								// undefine active category
								$('input[id="pfc-current-cat"]').attr('value','-1');

							}
							
						}

	                // Otherwise, let's alert the user that there was a problem.
	                } else {

	                    alert("Hmm. Something went wrong.");

	                } // end if/else
				})
			}	
		});

		$('#view-pfc-overview').click(function() {
			$('#pfc-overview').toggle();
			$(this).toggleClass('pfc-on');
		})
	});
}(jQuery));