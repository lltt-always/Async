import $ from'./jquery-3.1.0.min.js';

$(document).ready(function() {

	function httpRequest(method, url, ifasync) {
		let httpRequest = $.ajax({
			type: method,
			url: url,
			async: ifasync
		});
		return httpRequest;
	}

	/* data 是ajax请求返回的json对象*/
	function fetchContactInfo() {
		httpRequest('GET', '/contactInfo.json', true)
		.done((data) => {
			$("#text").html(JSON.stringify(data));
		})
		.fail((undefined, textStatus) => {
			alert(textStatus + ": Cannot get data");
		});
	}

	fetchContactInfo();
	
	$("#insert").html("2333");

})