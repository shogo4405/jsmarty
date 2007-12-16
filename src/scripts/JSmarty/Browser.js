JSmarty.Browser =
{
	newRequest : function(xmlns)
	{
		var tryout = JSmarty.Plugin['util.tryout'];
		return function(){ return tryout(xmlns, null); };
	}([
		function(){ return new ActiveXObject('Msxml2.XMLHTTP.4.0'); },
		function(){ return new ActiveXObject('Msxml2.XMLHTTP.3.0'); },
		function(){ return new ActiveXObject('Msxml2.XMLHTTP'); },
		function(){ return new ActiveXObject('Microsoft.XMLHTTP'); },
		function(){ return new XMLHttpRequest(); }
	]),
	getCurrentScript : function()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts[scripts.length - 1];
	},
	appendScript : function()
	{
		var http_build_query = JSmarty.Plugin.get('php.http_build_query');
		var script = document.createElement('script');
		document.getElementsByTagName('body')[0].appendChild(script);
		script = null;
	},
	setEnviroment : function()
	{
		var path = JSmarty.System.path;
		var i, Plugin = JSmarty.Plugin;
		var script = this.getCurrentScript();
		var dir = script.getAttribute('src');

		i = dir.lastIndexOf('/');
		dir = (i == -1) ? path : path + dir.slice(0, i)

		Plugin.repos = [dir + '/plugins'];
		Plugin.internals = dir + '/internals';
		script = null;

		this.setEnviroment = JSmarty.emptyFunction();
	},
	buildSystemObject : function()
	{
		this.setEnviroment();

		delete(this.buildSystemObject);
		this.Request = this.newRequest();

		JSmarty.Classes.extend(JSmarty.System)
		({
			read : function(f, d)
			{
				var a = this.buildPath(f, d);
				var i, t, r, x, h = JSmarty.Browser.Request;

				for(i=0,x=a.length;i<x;i++)
				{
					try
					{
						h.open('GET', a[i], false);
						h.send('');
						if(h.status == 200 || h.status == 0)
						{
							r = h.responseText;
							t = h.getResponseHeader('last-modified');
							this.modified[f] = (t) ? new Date(t).getTime() : new Date().getTime();
							break;
						};
					}
					catch(e){}
					finally{ h.abort(); };
				};

				return r || function()
				{
					JSmarty.Logger.invoke('info')('can\'t load the ' + f, 'from', 'System#read');
					return null;
				}();
			},
			time : function(f, d)
			{
				var m = this.modified;
				return m[f] || function(o)
				{
					o.read(f, d);
					return m[f] || null;
				}(this);
			},
			getArgs : function(k)
			{
				var v = {}, s = String(location.search).slice(1);
				JSmarty.Plugin.get('php.parse_str')(s, v);
				return (k == void(0)) ? v : (v[k] == void(0)) ? null : v[k];
			},
			outputString : function(){
				document.write(Array.prototype.join.call(arguments,''));
			},
			loadScript : function(path, dir)
			{
				var flag = true;
				try
				{
					(new Function(this.read(path, dir)))();
				}
				catch(e)
				{
					flag = false;
					JSmarty.Logger.invoke('error')(e, 'from System#loadScript');
				};
				return flag;
			}
		});
	}
};
JSmarty.System.forName(JSmarty.System.getName());
