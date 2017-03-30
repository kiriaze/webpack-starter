import 'hideseek';
import Dropzone from 'dropzone';

// media manager
class MediaManager {
	
	constructor(wp){

		this.wp			     = wp;
		this.$body			 = $('body');
		this.$mmOpen	     = $('.open-mm');
		this.$mmClose	     = $('.close-mm');
		this.$mediaManager	 = $('.media-manager');
		this.$attachmentList = this.$mediaManager.find('.attachment-list');
		this.$attachment	 = this.$mediaManager.find('.attachment-list li');
		this.$sidebar        = $('.media-manager--sidebar');
		this.$mediaSelect    = $('.media-select');
		this.$tabs           = $('.media-manager--tabs');
		this.$tab            = this.$tabs.find('a');

		this.limit           = 100;
		this.selected        = {};
		this.media;
		
		this.init();

	}

	init(){
		this.getMedia();
		this.dragDropUploader();
	}

	dragDropUploader() {
		// probably replace this since im not using really any of the functionality, just make a multi file input drag/drop
		Dropzone.options.fileUploader = {
			paramName: 'file',
			maxFilesize: 2,
			dictDefaultMessage: 'Browse...',
			acceptedFiles: '.jpg, .jpeg, .png, .gif, .svg',
			clickable: '#clickable', // false/true, or css selector

			url: '/', // Set the url to nothing since we're not using it
			thumbnailWidth: 150,
			thumbnailHeight: 150,
			parallelUploads: 20,
			previewTemplate: $('#template').html(),

			accept: (file, done) => {
				if ( file.name == '9.jpg' ) {
					done('Naha, you don\'t.');
				}
				else {
					$('.loader').addClass('is-active');
					this.uploadMedia(file);
					done();
				}
			},

			complete: (file) => {
				// console.log(file);
				
			}
		};
	}
	
	getMedia() {
		this.wp.media().perPage(this.limit).then((media) => {
			this.media = media;
			this.continue();
		});
	}
	
	continue() {
		this.addEventListeners();
		this.removeEventListeners();
		// console.log(media);
		// source_url
		// media_details
		// 	sizes
		this.search();
	}

	_open() {
		this.$body.addClass('media-manager-open');
		this.renderMedia();
	}

	_close() {
		this.$body.removeClass('media-manager-open');
	}

	search() {
		$('#media-search').hideseek({
			attribute: 'data-title'
		});
	}

	_tabs(e) {

		let $this = $(e.currentTarget);
		let tabID = $this.attr('data-tab');

		$('[data-tab]').removeClass('is-active');
		$('[data-tab-content]').removeClass('is-active');

		$this.addClass('is-active');
		$('[data-tab-content="'+ tabID +'"]').addClass('is-active');

	}

	_updateMedia(e) {
		
		e.preventDefault();
		
		let data   = {};
		let $this  = $(e.currentTarget);
		let id     = $this.data('id');

		// get input values
		$this.find('input, textarea').each((k ,v) => {
			let val = $(v).val();
			if ( ! val ) return;
			data[$(v).attr('name')] = val;
		});

		this.wp.media().id(id).update({
			title       : data['title'],
			alt_text    : data['alt_text'],
			caption     : data['caption'],
			description : data['description'],
		}).then( (response) => {
			// regrab media and set cached media to new data
			// then rerender media
			this.wp.media()
				.perPage(this.limit)
				.then((media) => {
					this.media = media;
				})
				.then(() => {
					this.renderMedia();
					// console.log( response );
				});
		});

	}

	_deleteMedia(e) {
		
		e.preventDefault();

		let $this = $(e.currentTarget),
			id    = $this.closest('form').data('id');

		this.wp.media().id(id).delete({
			force: true
		}).then( (response) => {
			// regrab media and set cached media to new data
			// then rerender media
			this.wp.media()
				.perPage(this.limit)
				.then((media) => {
					this.media = media;
				})
				.then(() => {
					this.renderMedia();
					// console.log( response );
				});
		});
	}

	uploadMedia(file) {

		this.wp.media()
			// Specify a path to the file you want to upload, or a Buffer
			.file( file )
			.create({
				title: 'My awesome image',
				alt_text: 'an image of something awesome',
				caption: 'This is the caption text',
				description: 'More explanatory information'
			})
			.then((response) => {
				// console.log(response);
				this.wp.media()
					.then((media) => {
						this.media = media;
					})
					.then(() => {
						this.renderMedia();
						$('.dropzone').removeClass('dz-started');
						$('.loader').removeClass('is-active');
						this.$tabs.find('[data-tab="media"]').trigger('click');
					})
			})
	}

	_selectMedia(e) {

		e.preventDefault();

		// set file input to selected value		
		this.$body.find('form input[name="select-image"]').val(this.selected['id']);
		console.log(this.selected['id']);
		this.$body.find('form img').attr('src', this.selected['url']);

		this._close();

	}

	_renderInfo(e) {

		e.preventDefault();

		let $this       = $(e.currentTarget),
			index       = $(e.currentTarget).index(),
			id          = this.media[index]['id'],
			url         = this.media[index]['source_url'],
			title       = this.media[index]['title']['rendered'],
			caption     = $(this.media[index]['caption']['rendered']).text(),
			alt_text    = this.media[index]['alt_text'],
			description = $(this.media[index]['description']['rendered']).text(),
			file_name   = this.media[index]['media_details']['file'],
			file_type   = this.media[index]['mime_type'],
			date        = this.media[index]['date'],
			dimensions  = this.media[index]['media_details']['width'] + 'x' + this.media[index]['media_details']['height'],
			post        = this.media[index]['post'],
			author      = this.media[index]['author'];

		this.selected.id   = this.media[index]['id']; // set the selected count/index to pass to _selectMedia()
		this.selected.url  = url;

		// this.$attachment.removeClass('is-active');
		$this.parent().find('li').removeClass('is-active');
		$this.addClass('is-active');

		let output = `
		<ul>
			<li><span>File Name:</span> ${file_name}</li>
			<li><span>File Type:</span> ${file_type}</li>
			<li><span>Uploaded On:</span> ${date}</li>
			<li><span>Dimensions:</span> ${dimensions}</li>
			<li><span>Uploaded To:</span> ${post}</li>
			<li><span>Uploaded By:</span> ${author}</li>
		</ul>
		<form data-id="${id}">
			<div class="row">
				<label>Title</label>
				<input type="text" name="title" value="${title}">
			</div>
			<div class="row">
				<label>Caption</label>
				<input type="text" name="caption" value="${caption}">
			</div>
			<div class="row">
				<label>Alt Text</label>
				<input type="text" name="alt_text" value="${alt_text}">
			</div>
			<div class="row">
				<label>Description</label>
				<input type="text" name="description" value="${description}">
			</div>
			<div class="row">
				<button type="submit">Update Image</button>
				<button id="delete-media">Delete Image</button>
			</div>
		</form>
		`;
		
		this.$sidebar.html(output);

		this._updateMedia = this._updateMedia.bind(this);
		this.$sidebar.find('form').off('submit').on('submit',this._updateMedia);

		this._deleteMedia = this._deleteMedia.bind(this);
		this.$sidebar.find('form #delete-media').on('click',this._deleteMedia);

	}

	renderMedia(e) {

		let output = '';

		for ( var i = 0; i < this.media.length; i++ ) {
			let file         = this.media[i],
				id           = file.id.rendered,
				title        = file.title.rendered,
				caption      = file.caption.rendered,
				description  = file.description.rendered,
				alt_text     = file.alt_text.rendered,
				sizes        = file.media_details.sizes;

			output += `<li data-title="${title}"><img src="${sizes['thumbnail']['source_url']}" alt="" /></li>`;

		}

		this.$attachmentList.html(output);

		this._renderInfo  = this._renderInfo.bind(this);
		$(document).find('.attachment-list li').on('click', this._renderInfo);

	}

	addEventListeners() {
		// 
		this._open        = this._open.bind(this);
		this._close       = this._close.bind(this);
		// this._renderInfo  = this._renderInfo.bind(this);
		this._selectMedia = this._selectMedia.bind(this);
		this._tabs        = this._tabs.bind(this);
		
		// 
		this.$mmOpen.on('click', this._open);
		this.$mmClose.on('click', this._close);
		// this.$attachment.on('click', this._renderInfo);
		this.$mediaSelect.on('click', this._selectMedia);
		this.$tab.on('click', this._tabs);

	}

	removeEventListeners(){
		// this.$mmOpen.off('click', this._open);
	}

}

export default MediaManager;