const fs = require('fs');
const ByteArray = require('./ByteArray');
const Enemy = require('./Enemy');
const Equipment = require('./Equipment');
const SchemaParser = require('./SchemaParser');
const SchemaWriter = require('./SchemaWriter');
const enemySchema = require('./enemySchema.json');
const equipmentSchema = require('./equipmentSchema.json');
const mapSchema = require('./mapSchema.json');
const weaponSchema = require('./weaponSchema.json');
const ammoSchema = require('./ammoSchema.json');



const init = ()=>{

	/*
	const buf = fs.readFileSync('ammo.bin');
	const binData = new ByteArray(buf);
	const ammos = [];
	while(!binData.isEmpty()){
		ammos.push((new SchemaParser(binData, ammoSchema)));	
	}
	fs.writeFileSync('output/fullAmmos.json',JSON.stringify(ammos.map(e=>e.serialize()),null,2));
	*/


	/*
	const buf = fs.readFileSync('weapons.bin');
	const binData = new ByteArray(buf);
	const weapons = [];
	while(!binData.isEmpty()){
		weapons.push((new SchemaParser(binData, weaponSchema)));	
	}
	fs.writeFileSync('output/fullWeapons.json',JSON.stringify(weapons.map(e=>e.serialize()),null,2));
	const jupiter = weapons.find(weapon=>weapon.result.id.value === 149);
	jupiter.result.rarity.write(350);
	jupiter.result.rating.write(123);*/
	/*const filtered = weapons.filter(weapon=>{
		const result = weapon.result;
		return result.minGradeDrop.value === -1 && result.weaponVersion.value !== 3 && result.manufacturer.value !== 13 && !result.isTurret.value
	});
	console.log(filtered.length);
	console.log(filtered.map(a=>a.result.id.value));*/

	//fs.writeFileSync('output/weaponspatched.bin', binData.buf);
	

	const data = require('./output/pods.json');
	const parser = new SchemaWriter(data, mapSchema);
	console.log(parser.byteArray);
	fs.writeFileSync('output/podsJson.bin', parser.byteArray.buf);
	

	/*	
	const buf = fs.readFileSync('enemies.bin');
	const binData = new ByteArray(buf);
	const enemies = [];
	while(!binData.isEmpty()){
		enemies.push((new SchemaParser(binData, enemySchema)));	
	}
	

	fs.writeFileSync('output/fullEnemies.json',JSON.stringify(enemies.map(e=>e.serialize()),null,2));
	enemies[0].result.name.write("Whampled");
	fs.writeFileSync('output/patchedenemies.bin', binData.buf);
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
