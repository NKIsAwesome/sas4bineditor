module.exports = class SchemaParser{
	constructor(byteArray, schema){
		this.byteArray = byteArray;
		this.schema = schema;
		this.loadData();
	}
	loadData(){
		const target = this.schema[this.schema.root];
		this.result = this.loadTarget(target);
	}
	loadTarget(target){
		const result = {};
		target.forEach(item=>{
			if(item.dependsOn && !result[item.dependsOn].value) return;
			if(item.type === 'lookup'){
				result[item.name] = [];
				for(let i = 0; i < result[item.lengthId].value; i++){
					result[item.name].push(this.loadTarget(this.schema[item.lookupId]));
				}
				return;
			} else if(item.type === 'array'){
				result[item.name] = [];
				let arrayLength = item.arrayLength;
				if(!arrayLength) arrayLength = result[item.arrayLengthLookup].value;
				for(let i = 0; i < arrayLength; i++){
					result[item.name].push(this.byteArray['read' + item.arrayType]());
				}
				return;
			}
			result[item.name] = this.byteArray['read'+item.type]();
			if(item.max) result[item.name].value = Math.max(item.max, result[item.name].value);
		});
		return result;
	}
	serialize(object = this.result){
		if('value' in object && object.callback) return object.value;
		const result = {
		};
		Object.entries(object).forEach(([k,v])=>{
			if(Array.isArray(v)){
				result[k] = v.map(subObj=>this.serialize(subObj));
			} else result[k] = v.value;
		});
		return result;
	}


}
