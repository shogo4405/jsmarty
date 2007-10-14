JSmarty.Classes.Object = function(){};
JSmarty.Classes.Object.prototype =
{
	className : 'Object',
	get : function(k)
	{
		if(this.isExit(k)){ return this[k]; };
		this._error(k);
	},
	set : function(k, v)
	{
		if(this.isExit(k)){ this[k] = v; }
		else{ this._error(k) };
	},
	isExit : function(k){
		return (k in this);
	},
	_error : function(k){
		JSmarty.Logging.info(this.className, k + ' is not defined');
	}
};