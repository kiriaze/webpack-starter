// wp api

// ToDo:
// write to data dir different json endpoints; e.g. /wp-json/wp/v2/pages || /wp-json/wp/v2/posts
// each having their own json file
// on update/create, re write local json files
// reference local json for read and render, both interface and template rendering

// concept:
// 1. use localstorage to store json and render templates with twig
// 2. use php templates
// 3. use both, circumstantial - php templates for templates that need live changes on server reading from json, which php can create, and twig for flat content

import Crud from './crud.js';
import mediaManager from './media-manager/media-manager.js';

let endpoint    	= 'http://wp.dev/wp-json';
export const crud	= new Crud(endpoint);
export const wp		= crud.wp;

export const mm     = new mediaManager(crud.wp);

// // from crud.js read
// console.log(JSON.parse(localStorage.posts));