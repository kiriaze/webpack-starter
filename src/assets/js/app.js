// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

// 
import '../scss/style.scss';

// 
import '../../views/globals/style.scss';
import '../../views/modules/style.scss';

import jQuery from 'jquery';

// console.log('lorem');

// // import mods script.js, which imports the associated style.scss
// // then inject to dom
// import {element} from '../../views/modules/heroes/hero/script';
// document.write(element);

// import '../../views/modules/heroes/hero/template.twig'; // requires twig-loader