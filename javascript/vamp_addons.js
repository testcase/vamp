
Buffer.prototype.samplerate = function() {
	if(this.length()*this.framecount() == 0) {
		return undefined;
	} else {
		return Math.floor(this.framecount() / this.length()*1000.);
	}
}

//
// adding methods to Dict.
Dict.prototype.forEach = function(callbackFn ) {
	var keys = this.getkeys();

	if(!Array.isArray(keys)) {
	keys = [keys];
	}

	for(var i=0;i<keys.length;i++) {
	
		var key = keys[i];
		var entry = this.get(key);
		callbackFn.call(this, entry, key,this);
	
	}
}

Dict.prototype.every = function(callbackFn ) {
	var keys = this.getkeys();
	var res = false;
	for(var i=0;i<keys.length;i++) {
		var key = keys[i];
		var entry = this.get(key);
		res = callbackFn.call(this, entry, key,this);
		if(!res) break;
	}
	return res;
}

Dict.prototype.find = function(callbackFn ) {
	var keys = this.getkeys();
	var res = false;
	for(var i=0;i<keys.length;i++) {
		var key = keys[i];
		var entry = this.get(key);
		res = callbackFn.call(this, entry, key,this);
		if(res) return entry;
	}
	return undefined;
}

Dict.prototype.at = function(n) {
	var e = this.get(n);
	if(e === undefined) throw "key " + e + " is undefined."
	return e;
}

Dict.prototype.toArray = function() {

	var arr = new Array();

	this.forEach( function(v,k) {
		arr[k] = v;
	});

	return arr;
}


// Don't remember why i did this
function isInteger(x) {
    return parseInt(x, 10) === x;
}


exports.dict_to_jsobj = function (dict) {
	if (dict == null) return null;
	var o = new Object();
	var keys = dict.getkeys();
	if (keys == null || keys.length == 0) return null;

	if (keys instanceof Array) {
		for (var i = 0; i < keys.length; i++)
		{
			
			var value = dict.get(keys[i]);
			
			if (value && value instanceof Dict) {
				value = dict_to_jsobj(value);
			}
			o[keys[i]] = value;
		}		
	} else {
		var value = dict.get(keys);
		
		if (value && value instanceof Dict) {
			value = dict_to_jsobj(value);
		}
		o[keys] = value;
	}

	return o;
}

exports.jsobj_to_dict = function(o) {
	var d = new Dict();
	
	for (var keyIndex in o)	{
		var value = o[keyIndex];

		if (!(typeof value === "string" || typeof value === "number")) {
			var isEmpty = true;
			for (var anything in value) {
				isEmpty = false;
				break;
			}
			
			if (isEmpty) {
				value = new Dict();
			}
			else {
				var isArray = true;
				for (var valueKeyIndex in value) {
					if (isNaN(parseInt(valueKeyIndex))) {
						isArray = false;
						break;
					}
				}
			
				if (!isArray) {
					value = jsobj_to_dict(value);
				}
			}
		}
		d.set(keyIndex, value);
	}
	return d;
}

// 
exports.dictarray_to_matrix = function(dict, key) {
	var d = new Dict(dict);
	var target = key || "values";
	
	//lets find out what size matrix we are going to need
	
	var arr = d.toArray();

	var cols = arr.length;
	var rows = arr[0].at(target).getkeys().length;
	
	var mat = new JitterMatrix(1, "float32", cols, rows);
	
	arr.forEach( function (column, colnum) {
		column.at(target).forEach( function (val, rownum) {
			mat.setcell2d(colnum, rows-rownum-1, val);
		
		});
	});
	
	
	return mat;
}


exports.filldurations = function (x, len) {
	
	var d = new Dict(x);
	var keys = d.getkeys();

	for(var i=0;i<keys.length;i++) {
		var key = keys[i];
		var e = d.get(key);
		
		if(i<keys.length-1) {
			if( e.get("hasDuration") == 0) {
				var start = e.get("timestamp");
				var end = d.get(keys[i+1]).get("timestamp"); 
				var duration = end - start;
				e.set("hasDuration", 1);
				e.set("duration", duration);
				d.set(keys[i],e);
			} 
		} else {
			
			if( e.get("hasDuration") == 0) {
				
				if(len) {
					var start = e.get("timestamp");
					var end = len; 
					var duration = end - start;
					e.set("hasDuration", 1);
					e.set("duration", duration);
					d.set(keys[i],e);
					
				} else {
					
					var duration = 0.0;
					e.set("hasDuration", 1);
					e.set("duration", duration);
					d.set(keys[i],e);
					
				}
			}
	
		}
	}
	return d;
}



/*
{
	"color" : [ 0.3, 0.3, 0.3, 1.0 ],
	"thickness" : 3.0,
	"point_style" : "circle", // "circle", "square", "none"
	"line_style" : "linear", // "lines", "curve", "origin", "none"
	"number_style" : "none",// "above", "below", "center", "none"
	"filter" : "none",  // or "atodb"
	"domain_start" : 0.0,
	"domain_end" : 1.0,
	"domain_style" : "linear",
	"domain_markers" : [  ], // definexgrid
	"domain_labels" : [  ], //definexlabels  float label pair
	"range_start" : 0.0,
	"range_end" : 1.0,
	"range_style" : "linear",
	"range_markers" : [  ], //defineygrid
	"range_labels" : [  ], //defineylabels
	"origin_x" : 0.0,
	"origin_y" : 0.0,
	"data" : [ 62.5, 81.0, 12.5, 0.0 ]
}

*/

exports.MaxPlot = function(options) {
	var opt = options || {};
	this.color = [0.3, 0.3, 0.3, 1.0];
	this.thickness = 3.0;
	this.point_style = "circle"; // "circle", "square", "none"
	this.line_style = "linear"; // "lines", "curve", "origin", "none"
	this.number_style = "none";// "above", "below", "center", "none"
	this.filter = "none";  // or "atodb"
	this.domain_start = 0.0;
	this.domain_end = 1.0;
	this.domain_style = "linear"; // "log"
	//this.domain_markers = [0.0]; // definexgrid
	//this.domain_labels = null; //definexlabels  float label pair
	this.range_start = 0.0;
	this.range_end = 1.0;
	this.range_style = "linear"; // "log"
	//this.range_markers = null; //defineygrid
	//this.range_labels = null; //defineylabels
	this.origin_x = 0.0;
	this.origin_y =  0.0;
	this.data =[ ];
}


exports.rescale = function(num, oldMin, oldMax, newMin, newMax)
{
    if(num > oldMax)
		return newMax;
    else if(num < oldMin)
		return newMin;
    
    var div = (num - oldMin) / (oldMax - oldMin);
    return ((newMax - newMin) * div) + newMin;
}
