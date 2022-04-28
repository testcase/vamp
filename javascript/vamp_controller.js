var vamp = require("vamp_addons");
autowatch = 1;
inlets = 1;
setinletassist(0, "msgs from the vamp.host~ object");
//	outlet 0:		to jit.gl.isf object
//	outlet 1:		to bpatcher
outlets = 2;
//setoutletassist(0, "msgs to the vamp.host~ object");
setoutletassist(0, "msgs to the bpatcher that i'm currently configuring");

size = 3;



//	contains the bpatchers that are programmatically created
var bpatchers = new Array();
//	if non-null, this is the last bpatcher we created
//	if non-null, it's assumed that msgs from the vamp.host~ object will be used to configure the contents of this bpatcher
//	if non-null, the 2nd outlet of this js object is connected to the input of this bpatcher
var inputBPatcher = null;
var inputName = null;
var inputType = null;
var inputMin = null;
var inputMax = null;



function init() {
	this.patcher.apply(addbpatchers);
}

function addbpatchers(b) {
	if (b.maxclass === "patcher") {
		bpatchers.push(b);
	}
	return true;
}

function clear() {
	//remove existing bpatchers
	//post("clear");
	while (bpatchers.length > 0) {
		this.patcher.remove(bpatchers.shift());
	}

}


function dictionary() {
	var x = arrayfromargs(arguments);
	var d = new Dict(x);
	var paramsdict = null;
	//grab it here since this has different meaning in forEach call
	var patcher = this.patcher;

	
	try {
		paramsdict = d.at("params");
	} catch(error) {
		post(error);
		return;
	}

	//remove existing bpatchers
	while (bpatchers.length > 0) {
		patcher.remove(bpatchers.shift());
	}
	
	
	var keycheck = d.at("params").getkeys();
	
	if(!keycheck) {
		return;
	}
	
	
	
	paramsdict.forEach( function(param, key) {
		
		//if appropriate, disconnect the outlet of this js object from the last bpatcher we created
		if (inputBPatcher != null) {
			patcher.disconnect(patcher.getnamed("vamp_controller"), 1, inputBPatcher, 0);
		}
		//	clear all the local vars
		inputBPatcher = null;
		inputName = null;
		inputType = null;
		inputMin = null;
		inputMax = null;
		
		var lastRect = null;
		if (bpatchers.length > 0) {
			lastRect = bpatchers[bpatchers.length - 1].rect;
		}
					
		//	make a new bpatcher, position it, tell it to load the appropriate file
		inputBPatcher = patcher.newdefault(0, 0, "bpatcher");
		inputBPatcher.varname = "controller" + bpatchers.length;
		inputBPatcher.bgmode(1);

		if (lastRect == null) {
			var bounds = patcher.box.rect;
			inputBPatcher.rect = new Array(0, 0, bounds[2] - bounds[0], 50);
		}
		else {
			var newRect = new Array();
			newRect[0] = lastRect[0];
			newRect[1] = lastRect[3];
			newRect[2] = lastRect[2];
			newRect[3] = newRect[1] + 50;
			inputBPatcher.rect = newRect;
		}
		inputBPatcher.replace("VAMP_UI_item.maxpat");
		patcher.message("script", "sendbox", inputBPatcher.varname, "embed", 1);
		//inputBPatcher.border(2);
		bpatchers.push(inputBPatcher);
		//	connect my outlet (outlet of my js object) to the bpatcher's inlet temporarily (we need to send data to the patch inside the bpatcher, and if we do that in js we wind up sending msgs to the bpatcher itself)
		patcher.hiddenconnect(patcher.getnamed("vamp_controller"), 1, inputBPatcher, 0);
		//	connect the bpatcher's outlet to the outlet in my patch (which connects to the jit.gl.isf object)
		patcher.hiddenconnect(inputBPatcher, 0, patcher.getnamed("OUTLET"), 0);
		outlet(1, "name", key);
		
		var type = "float";
		//using some simple heuristics
		
		
		if(param.at("isQuantized") && param.at("quantizeStep") == 1) {
			if(param.at("minValue") == 0 && param.at("maxValue") == 1) {
				outlet(1, "type", "bool");
			} else if (param.at("valueNames")) {
				outlet(1, "type", "long");
				var vn = param.at("valueNames");
				var labArray = [];
				var valArray = [];
				var val = 0;
				
				vn.forEach( function(x) {
					valArray.push(val++);
					labArray.push(x);
				});
				outlet(1, "values", valArray);
				//post(valArray);
				outlet(1, "labels", labArray);
				//post(labArray);
			} else {
				outlet(1, "type", "long");
				outlet(1, "min", param.at("minValue"));
				outlet(1, "max", param.at("maxValue"));
			}
		
		} else {
			outlet(1, "type", "float");
			outlet(1, "min", param.at("minValue"));
			outlet(1, "max", param.at("maxValue"));
		}
		
		

		outlet(1, "default", param.at("defaultValue"));
		outlet(1, "description", param.at("description"));
		
	
	});
}