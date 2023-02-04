const fs = require('fs');
const ByteArray = require('./ByteArray');
const Enemy = require('./Enemy');
const Equipment = require('./Equipment');
const SchemaParser = require('./SchemaParser');
const enemySchema = require('./enemySchema.json');
const equipmentSchema = require('./equipmentSchema.json');
const mapSchema = require('./mapSchema.json');
const weaponSchema = require('./weaponSchema.json');



const init = ()=>{
	
	const buf = fs.readFileSync('weapons.bin');
	const binData = new ByteArray(buf);
	const weapons = [];
	while(!binData.isEmpty()){
		weapons.push((new SchemaParser(binData, weaponSchema)));	
	}
	fs.writeFileSync('output/fullWeapons.json',JSON.stringify(weapons.map(e=>e.serialize()),null,2));
	const ronson45 = weapons.find(weapon=>weapon.result.id.value === 77);
	ronson45.result.clipSize.write(222);
	fs.writeFileSync('output/weaponspatched.bin', binData.buf);

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
	
	/*const buf = fs.readFileSync('sealabs.bin');
	const binData = new ByteArray(buf);
	const onslaught = new SchemaParser(binData, mapSchema);

	console.log(binData.isEmpty());
	console.log(binData.index, buf.length);
	
	fs.writeFileSync('output/sealabs.json',JSON.stringify(onslaught.serialize(),null,2));
	*/
/*
	onslaught.result.avatarSpawns.forEach(spawn=>{
		spawn.x.write(spawn.x.value+1800);
		spawn.y.write(spawn.y.value+1200);
	});
	fs.writeFileSync('output/patchedpods.bin', binData.buf);
	*/


}

init();
