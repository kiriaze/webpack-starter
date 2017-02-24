if ( module.hot ) {
	module.hot.accept();
}

const jQuery	= require('jquery');

import './assets/scss/style.scss';
import './assets/scss/hans.scss';

import people from './assets/js/people';

var args = {
	foo: 'bar'
};

$('#app').css({
	'opacity': .3
});

const app		= document.querySelector('#app');
app.innerHTML	= `<pre>${JSON.stringify(people, null, 2)}</pre>`;
