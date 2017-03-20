// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

import '../scss/style.scss';
// import '../../views/modules/style.scss';

import jQuery from 'jquery';
import people from './people';


// import mods script.js, which imports the associated style.scss
// then inject to dom
import {element} from '../../views/modules/heroes/hero/script';
document.write(element);

// import '../../views/modules/heroes/hero/template.twig'; // requires twig-loader

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
