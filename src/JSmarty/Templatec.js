JSmarty.Templatec = JSmarty.Classes.extend(JSmarty.Classes('History'))
({
	renderer : null,
	call : function(k, o){
		return (this.get(k) || function(){})(o);
	},
	isCompiled : function(n)
	{
		if(this.renderer.force_compile){ return false; };
		return this.isExist(n);
	},
	newFunction : function(n)
	{
		var src, o = JSmarty.Classes.Resource.fetch(n, this.renderer);
		if(o.isFailure){ return false; };

		try
		{
			src = this.renderer.getCompiler().execute(o.get('src'));
			this.set(o.namespace, new Function('$', src));
			return true;
		}
		catch(e)
		{
			JSmarty.Logging.error(e, 'from Templatec#newFunction');
		};

		return false;
	}
});
