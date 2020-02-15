# A Quick and sexy webpack boilerplate that handles twig and php.

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

### Notes

- If node is acting up, i.e. EADDRINUSE issues:`killall node`
- If local apache server port isn't being released, `lsof -t -i :8000`, then kill the process using that port, e.g; `kill -9 12345`
- For local development on multiple devices, swap out commented out proxy/localhost section with the uncommented section, and point devices to the ip address provided in terminal after running `npm start`.
- Uses composer for slim/twig templating, custom dynamic php routing off of index.php for other pages, and compiles templates to html, with output(dist) also in html - so no need for server to house composer/vendor.
	- Also, pages have their own directory for pretty permalinks.
- Update .htaccess and .htpasswd respectively if needed, remember to hash the htpasswd and update username if needed.
- To deploy to github pages; `git subtree push --prefix dist origin gh-pages`
	- Might need to change some relative paths from root in regards to the repo name / gh-branch; e.g. assets would be pointing to kiriaze.github.com/verkada as root, so kiriaze.github.com/verkada/assets/css/etc..
	- so use repo paths; e.g. /repoName/assets/etc.. but only for gh-pages..build a function that swaps em or passes them in depending on whether we're pushing to gh pages? or access url/base and check whether its a github.io path, or rather the entire base url and use that as the prefix for pathing?
	- or add custom domain to gh-pages that point to subdomain; e.g. reponame.domain.com, which should all point correctly off of root relative 
---

## License

The MIT License (MIT)

Copyright (c) 2016 Constantine Kiriaze

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

