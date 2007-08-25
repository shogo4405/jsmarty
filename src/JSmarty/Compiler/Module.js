JSmarty.Compiler.Module = function(){};
JSmarty.Compiler.Module.prototype =
{
	imp : -1,
	iap : -1,
	name : null,
	text : null,
	/** prefix **/
	sPrefix : 'buf.append(',
	/** suffix **/
	sSuffix : ');',
	/** string **/
	sString : null,
	/** terminal **/
	bTerminal : true,
	/**
	 * parse function
	 */
	parse : function(c){},
	/**
	 * prefix function
	 */
	prefix : function(){
		return this.sPrefix;
	},
	/**
	 * suffix function
	 */
	suffix : function(){
		return this.sSuffix;
	},
	/**
	 * isTerminal function
	 */
	isTerminal : function(){
		return this.bTerminal;
	},
	/**
	 * modifier function
	 */
	toModify : function()
	{
		if(this.imp < 0) return '{}';

		var i, f, c = false;
		var v = JSmarty.Compiler.VALSYMBL;
		var s = this.text.slice(this.imp).split('');

		for(i=0,f=s.length;i<=f;i++)
		{
			switch(s[i])
			{
				case '$':
					s[i] = v;
					break;
				case '"':
				case "'":
					c = s[i++];
					while(s[i] != c && i <= f){ i++; };
					if(f + 1 < i){ this._error(); };
					if(s[i-1] == '\\'){ i--; };
					break;
				case ':':
					s[i] = (c) ? ',' : '":[,';
					c = true;
					break;
				case '|':
					s[i] = (c) ? '],"' : '":[],"';
					c = false;
					break;
			};
		};
		s[i] = (c) ? '' : '":[';

		return '{"'+ s.join('') +']}';
	},
	/**
	 * parameter function
	 */
	toParams : function()
	{
		if(this.iap < 0) return '{}';

		var i, f;
		var v = JSmarty.Compiler.VALSYMBL;
		var s = this.text.slice(this.iap).split('');

		outerloop:
		for(i=0,f=s.length;i<=f;i++)
		{
			switch(s[i])
			{
				case '$':
					s[i] = v;
					break;
				case '=':
					s[i] = ':';
					break;
				case ' ':
				case '\t':
				case '\r':
				case '\n':
					s[i++] = ',';
					while(s[i] <= ' '){ s[i++] = ''; };
					break;
				case '"':
				case "'":
					c = s[i++];
					while(s[i] != c && i <= f){ ++i; };
					if(f < i){ this._error(); };
					if(s[i-1] == '\\'){ i--; };
					break;
				case '|':
					s.splice(i);
					this.imp = this.iap + i + 1;
					break outerloop;
			};
		};

		return '{' + s.join('') + '}';
	},
	/**
	 * get a text
	 * @return {String}
	 */
	getText : function(){
		return this.escape(this.text);
	},
	getName : function(){
		return this.quote(this.name);
	},
	/**
	 * quote a string of argument
	 * @param {String} s string
	 * @return {String} quoted string
	 */
	quote : function(s){
		return (s) ? "'" + s + "'" : '';
	},
	/**
	 * escape a string of argument
	 * @param {String} s string
	 * @return {String}
	 */
	escape : function(s){
		return (s.indexOf("'") == -1) ? s : s.split("'").join("\\'");
	},
	toString : function(){
		return this.sString;
	},
	_error : function(){
		JSmarty.Error.raise('Compiler : templates syntax error: can\'t find quotation.','die');
	}
};

JSmarty.Plugin.getFunction('shared.mergeObject')
(
	JSmarty.Storage.prototype,
	JSmarty.Compiler.Module.prototype
);