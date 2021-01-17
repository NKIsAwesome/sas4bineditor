const fs = require('fs');
const ByteArray = require('./ByteArray');

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



const loadGrade = (thing,buf)=>{
	thing.version = buf.readInt();
	thing.dropChance = buf.readFloat();
	thing.health = buf.readFloat();
	thing.meleeCooldown = buf.readFloat();
	thing.meleeDamage = buf.readFloat();
	thing.speed = buf.readFloat();
	thing.rangedAttackCooldown = buf.readFloat();
	thing.rangedDamage = buf.readFloat();
	thing.rangedProjectileSpeed = buf.readFloat();
	thing.rangedRange = buf.readFloat();
	thing.chemicalResist = buf.readFloat();
	thing.energyResist = buf.readFloat();
	thing.physicalResist = buf.readFloat();
	thing.thermalResist = buf.readFloat();
	thing.xpRating = buf.readFloat();
	thing.deathAsset = buf.readInt();
	thing.rangedAsset = buf.readInt();
	thing.walkingAsset = buf.readInt();
	thing.hitAnimation0Asset = buf.readInt();
	thing.hitAnimation1Asset = buf.readInt();
	thing.hitAnimation2Asset = buf.readInt();
	thing.meleeAnimation0Asset = buf.readInt();
	thing.meleeAnimation1Asset = buf.readInt();
	thing.flameDeathAsset = buf.readInt();

}
const loadEnemy = buf=>{
	const enemy = {};
	enemy.id = buf.readInt();
	enemy.name = buf.readUTF();
	enemy.gradeCount = buf.readShort();
	enemy.bodyDiameter = buf.readFloat();
	enemy.stunThreshold = buf.readFloat();
	enemy.canGib = buf.readBoolean();
	enemy.gibAmount = buf.readFloat();
	enemy.mass = buf.readFloat();
	enemy.meleeRange = buf.readFloat();
	enemy.turnSpeed = buf.readFloat();
	enemy.bloodOnFloorAsset = buf.readInt();
	enemy.bloodOnDeathAsset = buf.readInt();
	enemy.bloosOnHitAsset = buf.readInt();
	enemy.dropClass = buf.readShort();
	enemy.meleeDamageType = buf.readShort();
	enemy.rangedDamageType = buf.readShort();
	enemy.grades = [];
	for(let i = 0; i < enemy.gradeCount.value; i++){
		const thing = {}
		loadGrade(thing,buf);
		enemy.grades.push(thing);
	}
	fs.writeFileSync(`output/${enemy.name}.json`,(JSON.stringify(enemy,null,2)));
}

const init = ()=>{
	const buf = fs.readFileSync('enemies.bin');
	const binData = new ByteArray(buf);
	index = 0;
	for(let i = 0; i < 15; i++){
		loadEnemy(binData);
	}
	//console.log(index);
	//loadEnemy(binData);


}

init();
