// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

import '../scss/style.scss';

import jQuery from 'jquery';
import people from './people';
import '../../views/modules/heroes/hero/script';

var args = {
	foo: 'bar'
};

$('#app').css({
	'opacity': .3
});

const app			= document.querySelector('#app');
if ( app ) {
	app.innerHTML	= `<pre>${JSON.stringify(people, null, 2)}</pre>`;
}

console.log(args, 'test');
