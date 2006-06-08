JSmarty.Function.html_options = function($params, $smarty)
{
	var option = JSmarty.Function.html_options.option;

	var $html, $option;
	var $name, $values, $options, $selected;

	$name    = $params['name'] || '';
	$options = $params['options'];

	$html = '<select><!--__OPTION__--></select>'

	for(var i in $options)
	{
		$option  = '<option value="'+ i +'">'+ $options[i] +'</option>';
		$html    = $html.replace('<!--__OPTION__-->', $option + '<!--__OPTION__-->');
	}

	return $html.replace('<!--__OPTION__-->','');
}

JSmarty.Function.html_options.option = function()
{
	var $option = '';
	return $option;
}