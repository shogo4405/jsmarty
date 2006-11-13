/**
 * JSmarty plugin
 * @package JSmarty
 * @subpackage plugins
 */

/**
 * JSmarty {html_options} function plugin
 *
 * Type:     function<br />
 * Name:     html_options<br />
 * Original: Smarty {html_options} function plugin
 *
 * @author   shogo < shogo4405 at gmail dot com>
 * @version  1.0.3
 * @see      http://smarty.php.net/manual/en/language.function.html.options.php
 * @param    {Object} params
 * @param    {JSmarty} jsmarty
 * @return   {String}
 */

function jsmarty_function_html_options(params, jsmarty)
{
	JSmarty.Plugin.addPlugin('shared.escape_special_chars', jsmarty.plugins_dir);

	var k, value, i = 0, html = [];
	var optoutput = jsmarty_function_html_options_optoutput;
	var strval = JSmarty.Plugin.getFunction('php.strval');
	var array_map = JSmarty.Plugin.getFunction('php.array_map');
	var array_values = JSmarty.Plugin.getFunction('php.array_values');

	var name = null;
	var extra = [];
	var output = null;
	var values = null;
	var options = null;
	var selected = [];

	for(k in params)
	{
		if(!params.hasOwnProperty(k)) continue;

		switch(k)
		{
			case 'name':
				name = params[k]; break;
			case 'options':
				options = params[k]; break;
			case 'values':
				values = params[k]; break;
			case 'output':
				output = params[k]; break;
			case 'selected':
				selected = array_map(strval, array_values([params[k]]));
				break;
			default:
				if(typeof(params[k]) != 'object')
					extra.push(k +'="'+ params[k] +'"');
				else
					jsmarty.trigger_error('html_checkboxes: extra attribute '+ k +' cannot be an array');
				break;
		};
	};

	if(!options && !values) return '';

	if(options)
	{
		for(k in options)
		{
			if(!options.hasOwnProperty(k)) continue;
			html[i++] = optoutput(k, options[k], selected)
		};
	}
	else
	{
		for(k in values)
		{
			value = (output[k]) ? output[k] : '';
			html[i++] = optoutput(k, value, selected)
		};
	};

	// fix
	if(!name)
		return html.join('\n');

	// fix!
	return '<select name="'+ name +'"'+ extra.join(' ') +'>\n'+ html.join('\n') +'</select>\n';
};

function jsmarty_function_html_options_optoutput(key, value, selected)
{
	var optgroup = jsmarty_function_html_options_optgroup;
	var html, in_array = JSmarty.Plugin.getFunction('php.in_array');
	var escape_special_chars = JSmarty.Plugin.getFunction('shared.escape_special_chars');

	if(!(value instanceof Array))
	{
		html =
			'<option label="' + escape_special_chars(value.toString()) + '" value="' +
			escape_special_chars(key.toString()) +'"';
		if(in_array(key, selected)) html += ' selected="selected"';
		html += '>' + escape_special_chars(value.toString()) + '</option>';
	}

	return html || optgroup(key, value, selected);
};

function jsmarty_function_html_options_optgroup(key, value, selected)
{
	var k, i = 0, html = [];
	var optoutput = jsmarty_function_html_options_optoutput;

	html[i++] = '<optgroup label="' + key + '">';
	for(k in value)
	{
		if(!value.hasOwnProperty(k)) continue;
		html[i++] = optoutput(key, value, selected);
	};
	html[i++] = '</optgroup>';

	return html.join('');
};