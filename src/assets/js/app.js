// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

import '../scss/style.scss';
import '../scss/hans.scss';

import jQuery from 'jquery';
import people from './people';
import './foo';
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






// wp api

var WPAPI		= require( 'wpapi' );
var endpoint	= 'http://wp.dev/wp/wp-json';
var wpContainer = document.querySelector('.wp-container');
var wp			= new WPAPI({
					endpoint: endpoint,
					username: 'admin', // ...
					password: 'root', // ...
					auth: true // while deving, no auth
				});


// // Create
// wp.posts().create({
// 	// "title" and "content" are the only required properties
// 	title: 'Your Post Title',
// 	content: 'Your post content',
// 	// Post will be created as a draft by default if a specific "status"
// 	// is not specified
// 	status: 'publish'
// }).then(function( response ) {
// 	// "response" will hold all properties of your newly-created post,
// 	// including the unique `id` the post was assigned on creation
// 	console.log( response.id );
// });

// Read
wp.posts().then(function( data ) {
	// do something with the returned posts
	console.log(data);
	wpContainer.innerHTML = data[0].content.rendered;

}).catch(function( err ) {
	// handle error
	console.log('theres an error you fuck!');
});

// write to dom
function render(data) {
	console.log(data);
	wpContainer.innerHTML = data.content.rendered;
}

// Update
function updatePost(id, data){
	// .id() must be used to specify the post we are updating
	wp.posts().id( 1 ).update({
		// Update the title
		title: data['title'],
		content: data['content'],
		// Set the post live (assuming it was "draft" before)
		status: 'publish'
	}).then(function( response ) {
		// console.log( response );
		render(response);
	});
}

// Delete



$('form').on('submit', (e) => {
	e.preventDefault();
	let $this = $(e.currentTarget);
	let data  = {};
	$this.find('input, textarea').each((k ,v) => {
		data[$(v).attr('name')] = $(v).val();
	})
	updatePost(1, data);
});



// // media upload
// wp.media()
// 	// Specify a path to the file you want to upload, or a Buffer
// 	.file( document.getElementById( 'file-input' ).files[0] )
// 	.create({
// 		title: 'My awesome image',
// 		alt_text: 'an image of something awesome',
// 		caption: 'This is the caption text',
// 		description: 'More explanatory information'
// 	})
// 	.then(function( response ) {
// 		// Your media is now uploaded: let's associate it with a post
// 		var newImageId = response.id;
// 		return wp.media().id( newImageId ).update({
// 			post: associatedPostId
// 		});
// 	})
// 	.then(function( response ) {
// 		console.log( 'Media ID #' + response.id );
// 		console.log( 'is now associated with Post ID #' + response.post );
// 	});