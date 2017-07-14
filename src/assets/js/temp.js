// // import mods script.js, which imports the associated style.scss
// // then inject to dom
// import {element} from '../../views/modules/heroes/hero/script';
// document.write(element);

//////////////////////////////////////////////////

// // new age ajax
// fetch('https://api.github.com/users/chriscoyier/repos')
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data)
// 	});

// // sending data with fetch
// fetch('some-url', options);

// let content = {some: 'content'};

// // The actual fetch request
// fetch('some-url', {
// 	method: 'post',
// 	headers: {
// 		'Content-Type': 'application/json'
// 	},
// 	body: JSON.stringify(content)
// })
// // .then()...

//////////////////////////////////////////////////

// // testing dynamically loaded scripts on events
// // <a href="javascript:;" id="test">test</a>
// let map;
// $('#test').on('click', function(e){

// 	// if ( !mapLoaded ) // some flag?
// 	require.ensure([
// 		'./test'
// 	], (require) => {
		
// 		if (map) {
// 			return map.open();
// 		}

// 		let MapComponent = require('./test');

// 		map = new MapComponent({
// 			el: '.map_holder'
// 		});

// 		map.open();

// 	}, 'map');

// });



// export default class Test {

// 	constructor(el) {
// 		this.init();
// 	}

// 	init(){
// 		console.log('testing dynamically loading script on events');
// 	}

// 	open(){
// 		console.log('opening...');
// 	}

// }