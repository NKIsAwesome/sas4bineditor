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
			if(item.type === 'lookup'){
				result[item.name] = [];
				for(let i = 0; i < result[item.lengthId].value; i++){
					result[item.name].push(this.loadTarget(this.schema[item.lookupId]));
				}
				return;
			}
			result[item.name] = this.byteArray['read'+item.type]();
		});
		return result;
	}
	serialize(object = this.result){
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
