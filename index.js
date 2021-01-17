const fs = require('fs');
const ByteArray = require('./ByteArray');
const Enemy = require('./Enemy');



const init = ()=>{
	const buf = fs.readFileSync('enemies.bin');
	const binData = new ByteArray(buf);
	const enemies = [];
	while(!binData.isEmpty()){
		enemies.push(new Enemy(binData));
	}
	fs.writeFileSync('output/fullEnemies.json',JSON.stringify(enemies.map(e=>e.getValues()),null,2));


}

init();
