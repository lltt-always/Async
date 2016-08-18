window.onload = function() {

	function httpRequset(success, failed, method, url, ifasync) {
		let xhr = new XMLHttpRequest();		
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				success(xhr.responseText);
			} else if(xhr.readyState === 4 && xhr.status !== 200) {
				failed(xhr.statusText);
			}
		};
		xhr.open(method, url, ifasync);
		xhr.send();	
	}

	function fetchContactInfo() {
		httpRequset(
			(resp) => {
			document.getElementById('text').innerHTML = resp;
		},  (resp) => {
			alert(error + ": Cannot get data");
		}, 'GET', '/contactInfo.json', true)
	}

	fetchContactInfo();

	document.getElementById('insert').innerHTML = '2333';
}