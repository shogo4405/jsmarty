JSmarty.Compiler.Variable = JSmarty.Classes.create(JSmarty.Compiler.Module,
{
	parse : function()
	{
		var m = this.toModify();
		var n = JSmarty.Compiler.VALSYMBL + this.get('name');
		this.sString = n + ').modify(' + m + '';

		return this;
	}
});