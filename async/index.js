import 'babel-polyfill';

window.onload = () => {

	function httpRequest(url) {
		let httpRequest = new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && xhr.status === 200) {
					resolve(xhr.responseText);
				} else if(xhr.readyState === 4 && xhr.status !==200) {
					reject(xhr.statusText);
				}
			}
			xhr.open('GET', url, true);
			xhr.send();
		});

		return httpRequest;
	}

/*	function sleep(duration) {
	  return new Promise(function(resolve, reject) {
	    setTimeout(()=> { resolve(0) }, duration);
	  })
	}

	async function httpRequest(url) {
			let xhr = new XMLHttpRequest();

			xhr.open('GET', url);
			xhr.send();
			while(1) {
				await sleep(10);
				if(xhr.readyState === 4 && xhr.status === 200) {
					return xhr.responseText;
				} else if(xhr.readyState === 4 && xhr.status !==200) {
					throw xhr.statusText;
				}
			}
	}*/

	async function fetchInfo(url, i) {

		try{
			//获取数据并计算输出每次请求时间
			let begin_timeStamp = new Date().getTime();
			let contactInfo = await httpRequest(url);
			let end_timeStamp = new Date().getTime();
			let req_time = end_timeStamp - begin_timeStamp;

			//输出每次请求时间
			let time = document.createElement('li');
			time.innerHTML = `第${i}次请求时间：${req_time}`;
			document.getElementById('time').appendChild(time);

			return contactInfo

		} catch(error) {
			alert(error + ': Cannot get data'); 
		};
	}

	function writeInTable(infos) {

		let column = infos.length; //列 =4
		let row = Object.values(JSON.parse(infos[0]))[0].length+1; //行 =6

		//定义一个二维table数组，作为拼装后的数据存储
		let table = new Array();
		for(let i=0; i<row; i++){
			table[i] = new Array();			
		}

		//数组第一行存放表头
		for(let j=0; j<column; j++) {
			table[0][j] = Object.keys(JSON.parse(infos[j]))
		}

		//数组第二行开始存放数据内容
		for(let i=1; i<row; i++) {
			for(let j=0; j<column; j++) {
				table[i][j] = Object.values(JSON.parse(infos[j]))[0][i-1];
			}
		}

		for(let i=row-1; i>=0; i--) {
			let newRow = document.getElementById('text').insertRow(0);
			table[i].forEach(function(val, index) {
				newRow.insertCell(index).innerHTML = val;
			})
		}
	}

	async function pieceTogether(url) {

		//获取4次请求的全部数据，并计算4次请求的总耗时
		let begin_timeStamp = new Date().getTime();

		let promises = url.map((val, index) => {
			return fetchInfo(val, index+1);
		});

		let infos = await Promise.all(promises);
		let end_timeStamp = new Date().getTime();
		let totalTime = end_timeStamp - begin_timeStamp;

		//输出总数据
		writeInTable(infos);

		//输出4次请求的总耗时
		let time = document.createElement('li');
		time.innerHTML = `请求总时间：${totalTime}`;
		document.getElementById('time').appendChild(time);

		return totalTime;
	}

	let url = [
		'/contactInfo1.json', 
		'/contactInfo2.json', 
		'/contactInfo3.json',
		'/contactInfo4.json',
		'/contactInfo5.json',
	]

	function main() {
		pieceTogether(url).then((data) => {
			console.log(data);
		});
	}

	main();	
}