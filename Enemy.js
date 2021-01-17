
module.exports = class Enemy{

	constructor(byteArray){
		this.loadEnemy(byteArray);
	}
	loadGrade(buf){
		const grade = {};
		grade.version = buf.readInt();
		grade.dropChance = buf.readFloat();
		grade.health = buf.readFloat();
		grade.meleeCooldown = buf.readFloat();
		grade.meleeDamage = buf.readFloat();
		grade.speed = buf.readFloat();
		grade.rangedAttackCooldown = buf.readFloat();
		grade.rangedDamage = buf.readFloat();
		grade.rangedProjectileSpeed = buf.readFloat();
		grade.rangedRange = buf.readFloat();
		grade.chemicalResist = buf.readFloat();
		grade.energyResist = buf.readFloat();
		grade.physicalResist = buf.readFloat();
		grade.thermalResist = buf.readFloat();
		grade.xpRating = buf.readFloat();
		grade.deathAsset = buf.readInt();
		grade.rangedAsset = buf.readInt();
		grade.walkingAsset = buf.readInt();
		grade.hitAnimation0Asset = buf.readInt();
		grade.hitAnimation1Asset = buf.readInt();
		grade.hitAnimation2Asset = buf.readInt();
		grade.meleeAnimation0Asset = buf.readInt();
		grade.meleeAnimation1Asset = buf.readInt();
		grade.flameDeathAsset = buf.readInt();
		return grade;

	}
	loadEnemy(buf){
		this.id = buf.readInt();
		this.name = buf.readUTF();
		this.gradeCount = buf.readShort();
		this.bodyDiameter = buf.readFloat();
		this.stunThreshold = buf.readFloat();
		this.canGib = buf.readBoolean();
		this.gibAmount = buf.readFloat();
		this.mass = buf.readFloat();
		this.meleeRange = buf.readFloat();
		this.turnSpeed = buf.readFloat();
		this.bloodOnFloorAsset = buf.readInt();
		this.bloodOnDeathAsset = buf.readInt();
		this.bloosOnHitAsset = buf.readInt();
		this.dropClass = buf.readShort();
		this.meleeDamageType = buf.readShort();
		this.rangedDamageType = buf.readShort();
		this.grades = [];
		for(let i = 0; i < this.gradeCount.value; i++){
			this.grades.push(this.loadGrade(buf));
		}
	}



}
