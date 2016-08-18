import 'babel-polyfill';

window.onload = function() {

	function httpRequest(method, url, ifasync) {
		let httpRequest = new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && xhr.status === 200) {
					resolve(xhr.responseText);
				} else if(xhr.readyState === 4 && xhr.status !==200) {
					reject(xhr.statusText);
				}
			}
			xhr.open(method, url, ifasync);
			xhr.send();
		});

		return httpRequest;
	}

	let fetchContactInfo = async function() {
		try {
			alert("START!");
			let data = await httpRequest('GET', '/contactInfo.json', true);
			document.getElementById('text').innerHTML = data;
		} catch(error) {
			alert(error + ': Cannot get data');
		}
	}

	fetchContactInfo();

	document.getElementById('insert').innerHTML = '2333';
}