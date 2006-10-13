/**
 * JSmarty plugin
 * @package JSmarty
 * @subpackage plugins
 */

/**
 * JSmarty count_paragraphs modifier plugin
 *
 * Type:     modifier<br />
 * Name:     count_paragraphs<br />
 *
 * @author   shogo < shogo4405 at gmail dot com>
 * @version  1.0.0
 * @see      http://smarty.php.net/manual/en/language.modifier.count.paragraphs.php
 * @param    {String} string
 * @return   {Number} integer of \r or \n numbers.
 */
function jsmarty_modifier_count_paragraphs(string)
{
	// count \r or \n characters
	return string.match(/[\r\n]+/g).length;
};