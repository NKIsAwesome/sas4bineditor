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

const loadExtra = (thing,buf)=>{
	thing.i1 = buf.readInt32BE(index);
	index += 4;
	thing.f1 = buf.readFloatBE(index);
	index += 4;
	thing.f2 = buf.readFloatBE(index);
	index += 4;
	thing.f3 = buf.readFloatBE(index);
	index += 4;
	thing.f4 = buf.readFloatBE(index);
	index += 4;
	thing.f5 = buf.readFloatBE(index);
	index += 4;
	thing.f6 = buf.readFloatBE(index);
	index += 4;
	thing.f7 = buf.readFloatBE(index);
	index += 4;
	thing.f8 = buf.readFloatBE(index);
	index += 4;
	thing.f9 = buf.readFloatBE(index);
	index += 4;
	thing.f10 = buf.readFloatBE(index);
	index += 4;
	thing.f11 = buf.readFloatBE(index);
	index += 4;
	thing.f12 = buf.readFloatBE(index);
	index += 4;
	thing.f13 = buf.readFloatBE(index);
	index += 4;
	thing.f14 = buf.readFloatBE(index);
	index += 4;
	thing.i2 = buf.readInt32BE(index);
	index += 4;
	thing.i3 = buf.readInt32BE(index);
	index += 4;
	thing.i4 = buf.readInt32BE(index);
	index += 4;
	thing.i5 = buf.readInt32BE(index);
	index += 4;
	thing.i6 = buf.readInt32BE(index);
	index += 4;
	thing.i7 = buf.readInt32BE(index);
	index += 4;
	thing.i8 = buf.readInt32BE(index);
	index += 4;
	thing.i9 = buf.readInt32BE(index);
	index += 4;
	thing.i10 = buf.readInt32BE(index);
	index += 4;

}
const loadEnemy = buf=>{
	const enemy = {};
	enemy.int1 = buf.readInt32BE(index);
	index += 4;
	enemy.name = readUTF(buf);
	enemy.extraSize = buf.readInt16BE(index);
	index += 2;
	enemy.float1 = buf.readFloatBE(index);
	index += 4;
	enemy.float2 = buf.readFloatBE(index);
	index += 4;
	enemy.boolean1 = Boolean(buf.readUInt8(index));
	index += 1;
	enemy.float3 = buf.readFloatBE(index);
	index += 4;
	enemy.float4 = buf.readFloatBE(index);
	index += 4;
	enemy.float5 = buf.readFloatBE(index);
	index += 4;
	enemy.float6 = buf.readFloatBE(index);
	index += 4;
	enemy.int2 = buf.readInt32BE(index);
	index += 4;
	enemy.int3 = buf.readInt32BE(index);
	index += 4;
	enemy.int4 = buf.readInt32BE(index);
	index += 4;
	enemy.short1 = buf.readInt16BE(index);
	index += 2;
	enemy.short2 = buf.readInt16BE(index);
	index += 2;
	enemy.short3 = buf.readInt16BE(index);
	index += 2;
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
	index = 0;
	loadEnemy(buf);
	console.log(index);
	loadEnemy(buf);


}

init();
