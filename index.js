'use strict';

const path = require('path');
const twitter = require('twitter-text');
const url = require('url');

function injectEnvVariable(dirPath) {
  let _path = dirPath;
  for (const envVar in process.env) {
    const value = process.env[envVar];
    _path = _path.replace(`\${${envVar}}`, value);
  }
  return _path;
}

module.exports = (context) => {
	const app = context.app;
	const logger = context.logger;
	const prefs = context.preferences.get();
	const shell = context.shell;

	function startup() {		
	}	

	function search(query, res) {
		prefs.keywords.forEach((pref) => {
			const pattern = "^" + pref.keyword + "( |$)";
			const regexp = new RegExp(pattern, "i");
			const match = regexp.exec(query);
			let filePath = pref.path;

			if(match) {
				const query_trim = query.replace(match[0], "").trim();
				let result = {
					payload: query_trim,
					title: query_trim,
					group: 'Keyword',
					score: 100	
				};

				const urls = twitter.extractUrls(filePath);
				if (urls.length) {
					if (filePath.indexOf("$q") > -1) {
						result.desc = `Search ${url.parse(filePath).hostname}`
						result.icon = "#fa fa-search"
					} else {
						result.desc = `Open ${url.parse(filePath).hostname}`
						result.icon = "#fa fa-globe"
					}
				} else { // file
					filePath = injectEnvVariable(filePath);
					const filePath_base64 = new Buffer(filePath).toString('base64');
					result.icon = `icon://${filePath_base64}`;
					result.desc = filePath;
				}

				result.id = filePath;

				res.add(result);
			}
		});
	}

	function execute(id, payload) {
		app.close();
		shell.openItem(id.replace("$q", payload));
	}

	return { startup, search, execute };
}