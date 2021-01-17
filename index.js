const fs = require('fs');

let index = 0;

const readUTF = (buf)=>{
	let str = '';
	const size = buf.readInt16BE(index); 
	index += 2;
	for(let i = 0; i < size; i++){
		str += String.fromCharCode(buf.readUInt8(index)); 
		index++;
	}
	return str;

}


class BinaryData{
	constructor(buf){
		this.buf = buf;
		this.index = 0;
	}
	readInt(){
		const value = this.buf.readInt32BE(this.index);
		this.index += 4;
		return value;
	}
	readFloat(){
		const value = this.buf.readFloatBE(this.index);
		this.index += 4;
		return value;
	}
	readShort(){
		const value =  this.buf.readInt16BE(this.index);
		this.index += 2;
		return value;
	}
	readBoolean(){
		const value = Boolean(this.buf.readUInt8(this.index));
		this.index++;
		return value;
	}
	readUTF(){
		let str = '';
		const size = this.readShort();
		for(let i = 0; i < size; i++){
			str += String.fromCharCode(this.buf.readUInt8(this.index)); 
			this.index++;
		}
		return str;

	}


}

const loadExtra = (thing,buf)=>{
	thing.i1 = buf.readInt();
	thing.f1 = buf.readFloat();
	thing.f2 = buf.readFloat();
	thing.f3 = buf.readFloat();
	thing.f4 = buf.readFloat();
	thing.f5 = buf.readFloat();
	thing.f6 = buf.readFloat();
	thing.f7 = buf.readFloat();
	thing.f8 = buf.readFloat();
	thing.f9 = buf.readFloat();
	thing.f10 = buf.readFloat();
	thing.f11 = buf.readFloat();
	thing.f12 = buf.readFloat();
	thing.f13 = buf.readFloat();
	thing.f14 = buf.readFloat();
	thing.i2 = buf.readInt();
	thing.i3 = buf.readInt();
	thing.i4 = buf.readInt();
	thing.i5 = buf.readInt();
	thing.i6 = buf.readInt();
	thing.i7 = buf.readInt();
	thing.i8 = buf.readInt();
	thing.i9 = buf.readInt();
	thing.i10 = buf.readInt();

}
const loadEnemy = buf=>{
	const enemy = {};
	enemy.int1 = buf.readInt();
	enemy.name = buf.readUTF();
	console.log(enemy.name);
	enemy.extraSize = buf.readShort();
	enemy.float1 = buf.readFloat();
	enemy.float2 = buf.readFloat();
	enemy.boolean1 = buf.readBoolean();
	enemy.float3 = buf.readFloat();
	enemy.float4 = buf.readFloat();
	enemy.float5 = buf.readFloat();
	enemy.float6 = buf.readFloat();
	enemy.int2 = buf.readInt();
	enemy.int3 = buf.readInt();
	enemy.int4 = buf.readInt();
	enemy.short1 = buf.readShort();
	enemy.short2 = buf.readShort();
	enemy.short3 = buf.readShort();
	enemy.extra = [];
	for(let i = 0; i < enemy.extraSize; i++){
		const thing = {}
		loadExtra(thing,buf);
		enemy.extra.push(thing);
	}
	console.log(enemy);
}

const init = ()=>{
	const buf = fs.readFileSync('enemies.bin');
	const binData = new BinaryData(buf);
	index = 0;
	loadEnemy(binData);
	//console.log(index);
	loadEnemy(binData);


}

init();
