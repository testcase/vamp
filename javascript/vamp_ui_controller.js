/*			this script manages the creation of UI items in response to input that describes the name/type/other properties of the UI item to be created.

this object is only intended to manage the creation of UI items necessary to implement a single paramater/INPUT in a jit.gl.isf object (one script per UI item, basically).			*/

var vamp = require("vamp_addons");

inlets = 1;
setinletassist(0, "msgs from the vamp_controller.js object");
//	ultimately, this outlet sends to the jit.gl.isf object
outlets = 1;
setoutletassist(0, "needs to connect to corresponding vamp.host~ object");




//	i need to store some values b/c they need to persist across multiple function calls
var			myName = null;
var			myType = null;
var			myMin = null;
var			myMax = null;

//	all the objects i create are stored here (type-dependent)
var			items = new Array();

// needed to set defaults for long types with a umenu
var 		longValues = new Array();



//	this method should be called before anything else (we create UI items during the type() function, and we need the name to create some UI items)
function name(inName)	{
	//	clean up anything that might exist
	clean();
	
	//	store the var locally (need it for some 'set' msgs)
	myName = inName;
	//	populate the 'label' field (we'll re-populate it later if this isf has a valid label value)
	this.patcher.getnamed("LABEL").set(inName);
}


//	calling this function deletes any UI items that were programmatically created
function clean()	{
	myName = null;
	myType = null;
	myMin = null;
	myMax = null;
	while (items.length > 0)	{
		this.patcher.remove(items.shift());
	}
}


function type(inType)	{
	//post("type() : " + inType + "\n");
	
	//	store the type locally (need it for some other functions)
	myType = inType;
	
	//	put all the UI items in the "hint text" named "DESCRIPTION"
	//var			bounds = this.patcher.getnamed("DESCRIPTION").rect;
	var			bpRect = this.patcher.box.rect;
	var			bounds = new Array(20, 20, bpRect[2]-bpRect[0]-2, bpRect[3]-bpRect[1]);
	
	if (myType == "bool")	{
		//	[0]- the toggle button!
		//	[1]- "param" set msg
		
		//	make the toggle button
		var			button = this.patcher.newdefault(0,0,"toggle");
		items.push(button);
		button.rect = new Array(bounds[0], bounds[1]+5, bounds[0]+20, bounds[1]+25);
		
		//	make the "param" set msg to jit.gl.isf object/outlet
		var			msgToOut = this.patcher.newdefault(160,90,"message");
		items.push(msgToOut);
		msgToOut.rect = new Array(160, 90, 160+300, 160+20);
		msgToOut.set("setparam", myName, "$1");
		this.patcher.hiddenconnect(button, 0, msgToOut, 0);
		this.patcher.hiddenconnect(msgToOut, 0, this.patcher.getnamed("OUTLET"), 0);
		//	hide all the items i want hidden!
		for (var i=1; i<items.length; ++i)	{
			items[i].hidden = true;
		}
	}
	else if (myType == "long")	{
		//	[0]- number object
		//	[1]- string umenu
		//	[2]- int umenu
		//	[3]- "param" set msg
		
		//	make the number object- leave it visible by default!
		var			number = this.patcher.newdefault(0,0,"number");
		items.push(number);
		number.rect = new Array(bounds[0], bounds[1]+5, bounds[0]+60, bounds[1]+25);
		
		//	make the string umenu, hide it by default
		var			stringMenu = this.patcher.newdefault(0,0,"umenu");
		items.push(stringMenu);
		//stringMenu.rect = new Array(bounds[0], bounds[1], bounds[0]+80, bounds[1]+20);
		stringMenu.rect = new Array(number.rect[2]+20, number.rect[1], number.rect[2]+20+80, number.rect[3]);
		
		//	make the int umenu, hide it by default
		var			intMenu = this.patcher.newdefault(0,0,"umenu");
		items.push(intMenu);
		intMenu.rect = new Array(stringMenu.rect[2]+20, stringMenu.rect[1], stringMenu.rect[2]+20+80, stringMenu.rect[3]);
		
		//	make the "param" set msg to jit.gl.isf object/outlet
		var			msgToOut = this.patcher.newdefault(160,90,"message");
		items.push(msgToOut);
		msgToOut.rect = new Array(160, 90, 160+300, 160+20);
		msgToOut.set("setparam", myName, "$1");
		
		//	connect the number object to the param set msg
		this.patcher.hiddenconnect(number, 0, msgToOut, 0);
		//	connect the string umenu to the int umenu
		this.patcher.hiddenconnect(stringMenu, 0, intMenu, 0);
		//	connect the int umenu to the param set msg
		//this.patcher.hiddenconnect(intMenu, 1, msgToOut, 0);
		//	connect the param set msg to the outlet
		this.patcher.hiddenconnect(msgToOut, 0, this.patcher.getnamed("OUTLET"), 0);
		//	hide all the items i want hidden!
		for (var i=1; i<items.length; ++i)	{
			items[i].hidden = true;
		}
	}
	else if (myType == "float")	{
		//	[0]- slider
		//	[1]- flonum
		//	[2]- slider-to-flonum msg
		//	[3]- flonum-to-slider msg
		//	[4]- "param" set msg
		
		//	make a slider
		var			slider = this.patcher.newdefault(0,0,"multislider");
		items.push(slider);
		slider.contdata(1);
		slider.orientation(0);
		slider.settype(1);
		slider.signed(1);
		slider.setstyle(1);
		
		//slider.rect = new Array(bounds[0], bounds[1], bounds[2], bounds[1] + 20);
		slider.rect = new Array(bounds[0]+80+2, bounds[1]+5, bounds[2]-2, bounds[1] + 25);
		
		//	make a flonum
		var			flonum = this.patcher.newdefault(0,0,"flonum");
		items.push(flonum);
		//flonum.rect = new Array(slider.rect[0], slider.rect[3], slider.rect[0]+80, slider.rect[3]+20);
		flonum.rect = new Array(bounds[0], bounds[1]+5, bounds[0]+70, bounds[1] + 25);
		
		//	slider-to-flonum "set" msg
		var			STFMsg = this.patcher.newdefault(160,90,"message");
		items.push(STFMsg);
		STFMsg.set("set", "$1");
		this.patcher.hiddenconnect(slider, 0, STFMsg, 0);
		this.patcher.hiddenconnect(STFMsg, 0, flonum, 0);
		//	flonum-to-slider "set" msg
		var			FTSMsg = this.patcher.newdefault(160,120,"message");
		items.push(FTSMsg);
		FTSMsg.set("set", "$1");
		this.patcher.hiddenconnect(flonum, 0, FTSMsg, 0);
		this.patcher.hiddenconnect(FTSMsg, 0, slider, 0);
		//	"param" set msg to jit.gl.isf object/outlet
		var			msgToOut = this.patcher.newdefault(160, 150, "message");
		items.push(msgToOut);
		msgToOut.rect = new Array(160, 150, 160+300, 150+20);
		msgToOut.set("setparam", myName, "$1");
		this.patcher.hiddenconnect(slider, 0, msgToOut, 0);
		this.patcher.hiddenconnect(flonum, 0, msgToOut, 0);
		this.patcher.hiddenconnect(msgToOut, 0, this.patcher.getnamed("OUTLET"), 0);
		//	hide all the items i want hidden!
		for (var i=2; i<items.length; ++i)	{
			items[i].hidden = true;
		}
	}

	if(items.length) {
		items[0].message("parameter_enable", 1);
		items[0].message("_parameter_longname", myName);
		items[0].message("_parameter_shortname", myName);
		var pattr = this.patcher.newdefault(0, 0,"pattr", myName+"_pattr", items[0].varname);
		pattr.hidden = true;
		items.push(pattr);
	}
}


function label(inLabel)	{
	//post("label() : " + inLabel + "\n");
	if (inLabel.length > 0)
		this.patcher.getnamed("LABEL").set(inLabel);
}


function description(inDescription)	{
// 	/post("description() : " + inDescription + "\n");
	this.patcher.getnamed("DESCRIPTION").set(inDescription);
}


function min()	{
	var			args = arrayfromargs(arguments);
	//post("min() : \"" + args + "\"\n");
	if (args.length < 1)
		return;
	
	if (myType == "bool")	{
		//	intentionally blank
	}
	else if (myType == "long")	{
		myMin = args[0];
	}
	else if (myType == "float")	{
		myMin = args[0];
		//items[0].min = myMin;
	}
}


function max()	{
	var			args = arrayfromargs(arguments);
	//post("max() : \"" + args + "\"\n");
	if (args.length < 1)
		return;
	
	if (myType == "bool")	{
		//	intentionally blank
	}
	else if (myType == "long")	{
		myMax = args[0];
		if (myMin != null)
			items[0].min(myMin);
		if (myMax != null)
    		items[0].max(myMax);
		if (myMin != null)
			items[0].min(myMin);
		if (myMax != null)
    		items[0].max(myMax);
	}
	else if (myType == "float")	{
		myMax = args[0];
		//items[0].setminmax(myMin, myMax);
		items[0].message("setminmax", myMin, myMax);
		items[1].min(myMin);
		items[1].max(myMax);
		items[1].min(myMin);
		items[1].max(myMax);
	}
}


function default()	{
	var			args = arrayfromargs(arguments);
	//post("default() : " + args + "\n");
	if (args.length < 1)
		return;
	
	if (myType == "bool")	{
		items[0].message("set", args[0]);
		//items[0].int(args[0]);
	}
	else if (myType == "long")	{
		if(longValues.length) {
			// RR - we must find the index of our default value and use that to set the umenu
			var val = 0;
			for(lval in longValues) {
				if(longValues[lval] == args[0]) {
					items[0].message("int", val);
					break;
				}
				val++;
			}
		}
		else {
			items[0].message("set", args[0]);
		}
		//items[0].set(args[0]);
		//items[1].set(args[0]);
	}
	else if (myType == "float")	{
		//items[0].float(args[0]);
		//items[0].float(0.0);
		items[0].message("set", args[0]);
		items[1].message("set", args[0]);
	}
}


function values()	{
	var			args = arrayfromargs(arguments);
	//post("values() : \"" + args + "\"\n");
	
	if (myType != "long" || args.length < 1)
		return;
	
	this.patcher.hiddenconnect(items[2], 1, items[3], 0);

	// RR - remove the number object (remove rather than hide to fix issues with pattr/snapshots)
	this.patcher.remove(items[items.length-1]);
	items.splice(items.length-1, 1);
	this.patcher.remove(items[0]);
	items.splice(0, 1);

	// RR - enable pattr and snapshots on umenu
	items[0].message("parameter_enable", 1);
	items[0].message("_parameter_longname", myName);
	items[0].message("_parameter_shortname", myName);
	var pattr = this.patcher.newdefault(0, 0,"pattr", myName+"_pattr", items[0].varname);
	pattr.hidden = true;
	items.push(pattr);

	//	show the string menu and int menu
	items[0].hidden = false;

	// RR - why show the int menu here? let's leave it hidden
	//items[2].hidden = false;

	//	populate the string and int menus with the (same) passed values (we don't know if we'll be getting "labels")
	items[0].clear();
	items[1].clear();
	for (var i=0; i<args.length; ++i)	{
		items[0].append(args[i]);
		items[1].append(args[i]);
		longValues.push(args[i]);
	}
}
function labels()	{
	var			args = arrayfromargs(arguments);
	//post("labels() : \"" + args + "\"\n");
	
	if (myType != "long" || args.length < 1)
		return;
	
	//	clear the string menu, populate it with the passed values
	items[0].clear();
	for (var i=0; i<args.length; ++i)	{
		items[0].append(args[i]);
	}
}
/*
function values(inValues)	{
	post("values() : " + inValues + "\n");
}
function labels(inLabels)	{
	post("labels() : " + inLabels + "\n");
}
*/




