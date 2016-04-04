'use strict';

const path = require('path');

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
	const parser = /^\((.*)\),\((.*)\)$/;
	const shell = context.shell;

	function startup() {		
	}	

	function search(query, res) {
		prefs.shortcuts.forEach((pref) => {
			var result = parser.exec(pref);

			if(result != null) {
				var _, pattern, filePath;
				[_, pattern, filePath] = result;

				const regexp = new RegExp(pattern, "i");

				if(regexp.test(query)) {
					filePath = injectEnvVariable(filePath);
					
			      	const filePath_base64 = new Buffer(filePath).toString('base64');

					res.add({
						id: filePath,
						title: path.basename(filePath, path.extname(filePath)),
						desc: filePath,
						icon: `icon://${filePath_base64}`,
						group: 'Shortcuts'
					})
				}				
			}
		});
	}

	function execute(id, payload) {
		shell.openItem(id);
		app.close();
	}

	return { startup, search, execute };
}