const fs = require('fs');
const ByteArray = require('./ByteArray');
const Enemy = require('./Enemy');
const Equipment = require('./Equipment');
const SchemaParser = require('./SchemaParser');
const enemySchema = require('./enemySchema.json');
const equipmentSchema = require('./equipmentSchema.json');
const mapSchema = require('./mapSchema.json');



const init = ()=>{

	/*
	const buf = fs.readFileSync('enemies.bin');
	const binData = new ByteArray(buf);
	const enemies = [];
	while(!binData.isEmpty()){
		enemies.push((new SchemaParser(binData, enemySchema)));	
	}
	

	fs.writeFileSync('output/fullEnemiesSchemad.json',JSON.stringify(enemies.map(e=>e.serialize()),null,2));
	*/
	

	/*const buf = fs.readFileSync('equipment.bin');
	const binData = new ByteArray(buf);
	const equipment = [];
	while(!binData.isEmpty()){
		equipment.push((new SchemaParser(binData, equipmentSchema)));	
	}
	

	fs.writeFileSync('output/fullEquipment.json',JSON.stringify(equipment.map(e=>e.serialize()),null,2));*/
	
	const buf = fs.readFileSync('onslaught.bin');
	const binData = new ByteArray(buf);
	const onslaught = new SchemaParser(binData, mapSchema);

	console.log(binData.isEmpty());
	console.log(binData.index, buf.length);
	

	fs.writeFileSync('output/onslaught.json',JSON.stringify(onslaught.serialize(),null,2));


}

init();
