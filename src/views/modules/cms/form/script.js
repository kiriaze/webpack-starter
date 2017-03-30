import {wp, crud, mm} from '../script.js';

export function fuckyou(){

	// form
	// populate from api
	let postID	= 1;
	wp.posts().id(postID)
		.then( (data) => {
			
			let p = {
				title: data.title.rendered,
				content: $(data.content.rendered).text()
			};

			let imgID     = data.featured_media,
				imgURL;

			wp.media().id(imgID)
				.then( (media) => {
					imgURL = media.source_url;
					$('.edit-form').find('.img-preview').attr('src', imgURL);
					$('.edit-form').find('input:not([type="hidden"]), textarea').each((k,v) => {
							let name = $(v).attr('name');
							let val  = p[name];
							$(v).val(val);
					})
				})
		});

	$('.edit-form').off('submit').on('submit', (e) => {

		e.preventDefault();
		
		let $this	= $(e.currentTarget);
		let postID	= 1;
		let data	= {};
		
		// get input values
		$this.find('input:not([type="hidden"]), textarea').each((k,v) => {
			let val = $(v).val();
			if ( ! val ) return;
			data[$(v).attr('name')] = val;
		});

		// update post
		crud.update(postID, data);
		
		// attach media to post
		// upload is handled via mediaManager
		wp.posts().id( postID ).update({
			featured_media: $('input[name="select-image"]').val()
		});

	});

	console.log($('.edit-form'));

}