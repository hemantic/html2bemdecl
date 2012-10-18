(function() {
	require('./prototypes');
	
	var fs 		= require('fs'),
		jsdom 	= require('jsdom'),
		program = require('commander');

	program
		.version('0.0.1')
		.usage('[options]')
		.option('-i, --input <filename>', 'Input HTML file')
		.option('-o, --output <filename>', 'Output BEMDECL')
		.option('-enc, --encoding', 'Input file encoding [encoding]', 'utf8')
		.parse(process.argv);

	fs.readFile(program.input, program.encoding, function (err, data) {
		if (err) throw err;

		jsdom.env({
			html: data,
			scripts: [
				'./jquery-1.7.2.min.js'
			]
		}, function (err, window) {
			var $ = window.jQuery
			  , classes = []
			  , blocks = [];
			
			$("*").each(function(){
				if (className = $(this).attr('class')) {
					classes = classes
						.concat(className.split(" "))
						.unique()
						.sort();
				}
			});

			classes.forEach(function(item){        
				// Matcher
				// b-block
				// b-block_blockmod_modvalue
				// b-block__elem
				// b-block__elem_elemmod_modvalue
				// b-block-with-dashes_mod-with-dashes__elem-with-dashes_mod-with-dashes_value-with-dashes

				// block[1] - block name
				// block[2] & block[3] - block mods (if any)
				// block[4] - block element
				// block[5] & block[6] - elem mods (if any)

				if (matches = item.match(/([bli]-[-a-z]+)(?:_([-a-z]+)_([-a-z]+))?(?:__([-a-z]+)(?:_([-a-z]+)_([-a-z]+))?)?/)) {
					block = blocks
						.pushUnique('name', matches[1]);

					if (matches[2]) {
						blockMod = block
							.addSibling('mods', [])
							.pushUnique('name', matches[2])
							.addSibling('vals', [])
							.push(matches[3]);
					}

					if (matches[4]) {
						elem = block
							.addSibling('elems', [])
							.pushUnique('name', matches[4]);
					}

					if (matches[5]) {
						elemMod = elem
							.addSibling('mods', [])
							.pushUnique('name', matches[5])
							.addSibling('vals', [])
							.push(matches[6]);
					}
				}
			});
			
			// Writing prepared and beatyfied JSON to bemdecl file 
			fs.writeFile(
				program.output, 
				"exports.blocks = " + JSON.stringify(blocks, null, 2), 
				function (err) {
					if (err) throw err;
					console.log(program.output + " saved");
				}
			);
		});
	});
}).call(this)