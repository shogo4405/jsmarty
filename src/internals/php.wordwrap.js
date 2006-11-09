/**
 * wordwrap function
 *
 * @author shogo < shogo4405 at gmail dot com >
 * @version 1.0.1
 * @see http://www.php.net/wordwrap
 * @param  {String} str
 * @param  {Number} width
 * @param  {String} break_word
 * @param  {Boolean} cut
 * @return {String}
 */
function wordwrap(str, width, break_word, cut)
{
	var buffer, i = 0, text = [];
	var word, words = str.split(' ');

	for(var k=0,f=str.length;i<f;k++)
	{
		word = words[k];

		if(word.length > width)
		{
			if(buffer != '') text[i++] = buffer;
			if(!cut)
			{
				text[i++] = word;
			}
			else
			{
				text[i] = word.match(regexp);
				text[i] += word.slice(-(str.length % width));
				i++;
			};
			continue;
		};

		if(buffer && (buffer.length + word.length <= width))
			buffer += ' ' + word;
		else
			buffer = '', k--, text[i++] = buffer;
	};

	return text.join(break_word);
};