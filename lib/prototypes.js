Array.prototype.unique = function(){
	var r = new Array();
	o:for (var i = 0; i < this.length; i++) {
		for (var x = 0; x < r.length; x++) {
			if (r[x]==this[i]) continue o;
		}
		r[r.length] = this[i];
	}
	return r;
};

Array.prototype.pushUnique = function(k, v) {
	exist = false;
	for(var i = 0; i < this.length; i++) {
		if (this[i][k] == v) return this[i];
	}
	
	if (!exist) {
		obj = {};
		obj[k] = v;
		this.push(obj);
		return this[i++];
	}
}

Object.prototype.addSibling = function(k, v) {
	if (typeof this[k] === 'undefined') this[k] = v;
	return this[k];
}