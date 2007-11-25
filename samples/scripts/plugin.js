if(!document.scripts){
	document.scripts = document.getElementsByTagName('script');
};

String.prototype.toUcfirst = function(){
	return this.slice(0, 1).toUpperCase().concat(this.slice(1));
};

window.onload = function()
{
	var i, f, link, hash;
	var links = document.getElementsByTagName('a');

	for(i=0,f=links.length;i<f;i++)
	{
		link = links[i];
		if((hash = link.href.indexOf('#')) > -1)
		{
			hash = link.href.slice(hash + 1);
			link.onclick = link.onkeypress = Record.HashRecord(hash);
		}
	};

	hash = (location.hash) ? String(location.hash).slice(1) : 'index';
	Record.HashRecord(hash)();
};

function postrender(target)
{
	var script, temp = document.write;
	var scripts = target.getElementsByTagName('script');

	document.write = function()
	{
		var arguments = Array.prototype.slice.call(arguments);
		script.insertAdjacentHTML('beforeBegin', arguments.join(''));
	};

	for(var i=0,f=scripts.length;i<f;i++)
	{
		script = scripts[i];
		eval(script.text)
	};

	document.write = temp;
};

Record = {};
Record.HashRecord = function(arg)
{
	arg = arg.toUcfirst();
	if(Model[arg]) return Model[arg];
	return function(){ return false; };
};

Model =
{
	Index : function()
	{
		smarty.display('plugin.txt');
	},
	If : function()
	{
		smarty.assign("hoge", 2);
		smarty.display('if.txt');
		smarty.clear_assign();
	},
	Textformat : function()
	{
		smarty.display('textformat.txt');
	},
	Strip : function()
	{
		smarty.display('strip.txt');
		smarty.clear_all_assign();
	},
	Foreach : function()
	{
		smarty.assign_by_ref("hoge", { English:"Hello,World", Japanese:"KONNNICHIWA,SEKAI!!" });
		smarty.display('foreach.txt');
		smarty.clear_all_assign();
	},
	Section : function()
	{
		smarty.assign_by_ref('custid', [ '001', '002', '003', '004', '005' ]);
		smarty.assign_by_ref('name',   [ 'hoge', 'foo', 'bar', 'foofoo', 'barbar']);
		smarty.assign_by_ref('address',[ 'hoge@com', 'foo@com', 'bar@com', 'foofoo@com', 'barbar@com']);
		smarty.display('section.txt');
		smarty.clear_all_assign();
	},
	Mailto : function()
	{
		smarty.display('mailto.txt');
		postrender(document.getElementById('content'));
	},
	Counter : function()
	{
		smarty.display('counter.txt');
	},
	Cycle : function()
	{
		smarty.display('cycle.txt');
	},
	Ldelim : function()
	{
		smarty.display('ldelim.txt');
	},
	Rdelim : function()
	{
		smarty.display('rdelim.txt');
	},
	Literal : function()
	{
		smarty.display('literal.txt');
	},
	Html_image : function()
	{
		smarty.assign('img','images/jsmarty_icon.gif');
		smarty.display('html_image.txt');
		smarty.clear_all_assign();
	},
	Html_table : function()
	{
		smarty.assign_by_ref('data', [0,1,2,3,4,5,6,7,8]);
		smarty.assign_by_ref('tr', ['bgcolor="#eeeeee"','bgcolor="#dddddd"']);
		smarty.display('html_table.txt');
		smarty.clear_all_assign();
	},
	Html_options : function()
	{
		smarty.assign_by_ref('data', {'001':'tanaka', '002':'suzuki', '003':'kato'});
		smarty.display('html_options.txt');
		smarty.clear_all_assign();
	},
	Html_radios : function()
	{
		smarty.assign_by_ref('data', {'001':'tanaka', '002':'suzuki', '003':'kato'});
		smarty.display('html_radios.txt');
		smarty.clear_all_assign();
	},
	Html_checkboxes : function()
	{
		smarty.assign_by_ref('data', {'001':'tanaka', '002':'suzuki', '003':'kato'});
		smarty.display('html_checkboxes.txt');
		smarty.clear_all_assign();
	},
	Html_select_time : function()
	{
		smarty.display('html_select_time.txt');
	},
	Html_select_date : function()
	{
		smarty.display('html_select_date.txt');
	},
	Trimwhitespace : function()
	{
		smarty.display('trimwhitespace.txt');
	},
	Capitalize : function()
	{
		smarty.assign('foo', 'this is a pen.');
		smarty.display('capitalize.txt');
		smarty.clear_all_assign();
	},
	Cat : function()
	{
		smarty.assign('hoge', 'Hello');
		smarty.display('cat.txt');
		smarty.clear_all_assign();
	},
	Count_characters : function()
	{
		smarty.display('count_characters.txt');
	},
	Count_paragraphs : function()
	{
		smarty.display('count_paragraphs.txt');
	},
	Count_sentences : function()
	{
		smarty.display('count_sentences.txt');
	},
	Count_words : function()
	{
		smarty.display('count_words.txt');
	},
	Default : function()
	{
		smarty.display('default.txt');
	},
	Indent : function()
	{
		smarty.display('indent.txt');
	},
	Lower : function()
	{
		smarty.display('lower.txt');
	},
	Nl2br : function()
	{
		smarty.assign("html",'Hello\nWorld!!\n');
		smarty.display('nl2br.txt');
		smarty.clear_all_assign();
	},
	Regex_replace : function()
	{
		smarty.display('regex_replace.txt');
	},
	Spacify : function()
	{
		smarty.display('spacify.txt');
	},
	String_format : function()
	{
		smarty.display('string_format.txt');
	},
	Stripm : function()
	{
		smarty.display('stripm.txt');
	},
	Strip_tags : function()
	{
		smarty.display('strip_tags.txt');
	},
	Truncate : function()
	{
		smarty.assign('text','El ingenioso hidalgo Don Quijote de La Mancha');
		smarty.display('truncate.txt');
		smarty.clear_all_assign();
	},
	Upper : function()
	{
		smarty.display('upper.txt');
	},
	Wordwrap : function()
	{
		smarty.assign('text','El ingenioso hidalgo Don Quijote de La Mancha');
		smarty.display('wordwrap.txt');
		smarty.clear_all_assign();
	},
	Assign : function()
	{
		smarty.display('assign.txt');
		smarty.clear_all_assign();
	},
	Include : function()
	{
		smarty.assign('foo', 'Hello World!!');
		smarty.display('include.txt');
		smarty.clear_all_assign();
	}
};