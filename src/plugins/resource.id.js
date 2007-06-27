/**
 * JSmarty plugin
 * @package JSmarty
 * @subpackage plugins
 */

/**
 * JSmarty id resource plugin
 *
 * Type:     resource<br />
 * Name:     id<br />
 *
 * @author   shogo < shogo4405 at gmail dot com>
 * @version  1.0.1
 * @type     Array
 */
var jsmarty_resource_id =
[
	/**
	 * get a template source
	 * @param {String} name Template name
	 * @param {Object} data Template data
	 * @param {JSmarty} jsmarty
	 * @return {Boolean} 
	 */
	function(name, data, jsmarty)
	{
		var element = document.getElementById(name);
		if(!element) return false;
		data.src = element.innerHTML;
		return true;
	},
	/**
	 * get a template timestamp
	 * @param {String} name Template name
	 * @param {Object} data Template data
	 * @param {JSmarty} jsmarty
	 * @return {Boolean} 
	 */
	function(name, data, jsmarty)
	{
		var element = document.getElementById(name);
		if(!element) return false;

		if(document.lastModified)
			data.time = document.lastModified;
		else
			data.time = new Date.getTime();

		return true;
	},
	/**
	 * secure?
	 * @return {Boolean} true
	 */
	function(){
		return true;
	},
	/**
	 * trusted?
	 * @return {Boolean} true
	 */
	function(){
		return true;
	}
];