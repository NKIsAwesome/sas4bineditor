const ByteWriter = require('./ByteWriter');
module.exports = class SchemaWriter{
	constructor(jsonData, schema){
		this.jsonData = jsonData;
		this.schema = schema;
		this.loadJSON();
	}
	loadJSON(){
		this.byteArray = new ByteWriter();
		this.fixArrays(this.jsonData, this.schema[this.schema.root]);
		this.loadTarget(this.jsonData, this.schema[this.schema.root]);
	}
	fixArrays(obj, schema){
		if(Array.isArray(obj)){
			obj.forEach(item=>{
				this.fixArrays(item, schema);
			});
			return;
		}
		schema.forEach(rule=>{
			if(rule.type === 'lookup'){
				obj[rule.lengthId] = obj[rule.name].length;
				this.fixArrays(obj[rule.name], this.schema[rule.lookupId]);
			} else if(rule.type === 'array'){
				if(rule.arrayLengthLookup)
					obj[rule.arrayLengthLookup] = obj[rule.name].length;
			} 
		});
		
	}

	loadTarget(obj, schema){
		if(Array.isArray(obj)){
			obj.forEach(item=>{
				this.loadTarget(item, schema);
			});
			return;
		}
		schema.forEach(rule=>{
			if(rule.type === 'lookup'){
				const array = obj[rule.name];
				this.loadTarget(array, this.schema[rule.lookupId]);
				return;
			} else if(rule.type === 'array'){
				const array = obj[rule.name];
				let arrayLength = rule.arrayLength;
				if(!arrayLength){
					arrayLength = array.length;
				}
				for(let i = 0; i < arrayLength; i++){
					this.byteArray['write' + rule.arrayType](array[i]);
				}
				return;
			} 
			this.byteArray['write' + rule.type](obj[rule.name]);
		});
	}
}
