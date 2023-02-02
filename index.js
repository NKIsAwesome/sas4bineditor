const fs = require('fs');
const ByteArray = require('./ByteArray');
const Enemy = require('./Enemy');
const Equipment = require('./Equipment');
const SchemaParser = require('./SchemaParser');
const enemySchema = require('./enemySchema.json');



const init = ()=>{
	/*const buf = fs.readFileSync('enemies.bin');
	const binData = new ByteArray(buf);
	const enemies = [];
	while(!binData.isEmpty()){
		enemies.push(new Enemy(binData));
	}*/

	const buf = fs.readFileSync('enemies.bin');
	const binData = new ByteArray(buf);
	const enemies = [];
	while(!binData.isEmpty()){
		enemies.push((new SchemaParser(binData, enemySchema)));	
	}
	

	fs.writeFileSync('output/fullEnemiesSchemad.json',JSON.stringify(enemies.map(e=>e.serialize()),null,2));
	/*
	const eq = fs.readFileSync('equipment.bin');
	const eqBinData = new ByteArray(eq);
	console.log((new Equipment(eqBinData)).getValues());
	console.log((new Equipment(eqBinData)).getValues());
	*/

	//enemies[0].grades[0].health.write(1);
	//enemies[0].grades[0].meleeDamage.write(0);
	//enemies[0].grades[0].speed.write(8);
	//enemies[0].bodyDiameter.write(400);
	//enemies[0].grades[0].dropChance.write(100);
	//enemies[0].dropClass.write(3);
	//fs.writeFileSync('enemiesupdated.bin',binData.buf);


}

init();
