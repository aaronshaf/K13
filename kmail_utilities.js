jq182 = jQuery.noConflict(true);

(function ($) {
	names = null;

	var input = $('<input type="search" placeholder="Add student(s)" /><br/>');
	$('#recipientAboutContainer tbody tr:eq(0) td:eq(1)').prepend(input);
	input.focus();
	input.on('keydown',function(event) {
		if(event.which === 13) {
			var query = $(this).val();
			names = query.split(',');
			$(input).next('input').fireEvent('click');
			loadPopup();
			return false;
		}
	});

	function loadPopup() {
		if(!$('#MB_window').length) {
			setTimeout(function(){loadPopup();},50);
			return;	
		}
		selectRole();
	}

	function selectRole() {
		if(!$('#MB_window .editForm option:contains(Student)').length) {
			setTimeout(function(){selectRole();},50);
			return;	
		}
		$('#MB_window .editForm option:contains(Student)').closest('select').val(3);
		fillAndSearch();
	}

	function fillAndSearch() {
		var name = names.shift();
		name = $.trim(name);
		var parts = name.split(' ');
		if(parts.length > 1) {
			firstName = parts[0];
			lastName = parts[1];
		} else {
			firstName = parts[0];
			lastName = null;
		}

		$('#MB_window td:contains(First Name:)').next('td').find('input').val($.trim(firstName));

		if(lastName) {
			$('#MB_window td:contains(Last Name:)').next('td').find('input').val($.trim(lastName));
		}

		$('#results').html('');
		$('#MB_window input[value="Search"]').fireEvent('click');
		selectResult();
	}

	function selectResult() {
		if(!$('#results th:contains(School)').length) {
			setTimeout(function(){selectResult();},50);
			return;	
		}

		$('#results input[type="checkbox"]').first().fireEvent('click');
		setTimeout(waitForProcessing,1500);
	}

	function waitForProcessing() {
		if(!names.length) {
			$('#MB_window input[value="Return to Message"]').fireEvent('click');	
		} else {
			fillAndSearch();
		}
	}

	//Fixes various annoyances
	$('#MB_content .editForm input[type="text"]').live('keydown',function(event) {
		if(event.which === 13) { //enter
			$('#MB_window input[value="Search"]').fireEvent('click');
			return false;
		}

		if(event.which === 9) {
			var currentIndex = $('#MB_content .editForm input[type="text"]').index($(this));
			if(event.shiftKey) {
				currentIndex--;
			} else {
				currentIndex++;
			}
			$('#MB_content .editForm input[type="text"]').get(currentIndex).focus();
			return false;
		}
	});
})(jq182);