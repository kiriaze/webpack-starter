# A Quick and sexy webpack boilerplate that handles twig and php. ( no mas handlebars )

## Requirements

* [Node.js](http://nodejs.org/)

## Installation Steps

1. Clone repo
2. Run `npm install`
3. Run `npm start` to start webpack
4. Run `npm run build` to compile the bundle in production mode
5. Run `php -S localhost:8000 -t src/` in a separate terminal window for php.

---

#### The difference between the branches is this:

- Master
	- js for twig templates, compiles to html, copies over php files but primarily is for spa/mpa's that are simple.
- PHP
	- uses composer for slim/twig templating, custom dynamic php routing off of index.php for other pages, but output(dist) is non compiled twig templates that require composer/vendor to be on server for rendering templates.
- PHP-HTML
	- Takes the best of both Master and PHP branches, and compiles templates to html, with output(dist) also in html - so no need for server to house composer/vendor.
	- Also, it houses pages differently, with each having their own directory for pretty permalinks.
- WP
	- Branched of the PHP branch, it uses the node-wp-api for tinkering with wp json api.
	- Also, it houses a custom media manager.
- Travel-App
	- Branched of PHP-HTML, without pages being housed seperately - sans pretty permalinks. Also, connected to firebase, and uses `ensure/require` for dynamic script loading on handlers.

---

## License

The MIT License (MIT)

Copyright (c) 2016 SitePoint

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

