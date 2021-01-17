module.exports = class Equipment{
	constructor(byteArray){
		this.loadEquipment(byteArray);
	}
	loadEquipment(buf){
		this.id = buf.readShort();
		this.s1 = buf.readShort();
		this.name = buf.readShort();
		this.b1 = buf.readByte();
		this.description = buf.readShort();
		this.s2 = buf.readShort();
		this.s3 = buf.readShort();
		this.i1 = buf.readInt();
		this.f1 = buf.readFloat();
		this.f2 = buf.readFloat();
		this.f3 = buf.readFloat();
		this.f4 = buf.readFloat();
		this.f5 = buf.readFloat();
		this.f6 = buf.readFloat();
		this.f7 = buf.readFloat();
		this.f8 = buf.readFloat();
		this.f9 = buf.readFloat();
		this.f10 = buf.readFloat();
		this.f11 = buf.readFloat();
		this.f12 = buf.readFloat();
		this.f13 = buf.readFloat();
		this.b2 = buf.readByte();
		this.display = [];
		for(let i = 0; i < 4; i++)
			this.display.push(buf.readShort());
		this.arr1 = [];
		for(let i = 0; i < 4; i++)
			this.arr1.push(buf.readShort());
		this.arr2 = [];
		for(let i = 0; i < 4; i++)
			this.arr2.push(buf.readShort());
		this.s4 = buf.readShort();
		if(this.s4 > 10) this.s4 = 10;
		this.boolean1 = buf.readBoolean();
		this.s5 = buf.readShort();
		this.s6 = buf.readShort();
		this.s7 = buf.readShort();
		this.boolean2 = buf.readBoolean();

	}
	getValues(){
		const result = {
		};
		Object.entries(this).forEach(([k,v])=>{
			result[k] = v.value;
		});
		return result;
	}


}
