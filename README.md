# A Quick and sexy webpack boilerplate that handles twig and php. ( no mas handlebars )

## Requirements

* [Node.js](http://nodejs.org/)

## Installation Steps

1. Clone repo
2. The first time you will need to run `npm run setup`, after which you will only need to run `npm start`.
3. Make dope shit.

### Builds
Run `npm run build` to compile the bundle in production mode

### Deployment
Run `npm run deploy` to deploy the production ready bundle to location defined within your config, by passing the optional env argument `--staging`.

---

Uses composer for slim/twig templating, custom dynamic php routing off of index.php for other pages, and compiles templates to html, with output(dist) also in html - so no need for server to house composer/vendor.
	- Also, pages have their own directory for pretty permalinks.

---

## License

The MIT License (MIT)

Copyright (c) 2016 SitePoint

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

