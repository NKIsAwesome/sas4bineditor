const ByteArray = require('./ByteArray');
module.exports = class ByteWriter extends ByteArray{
	constructor(){
		super(Buffer.from([]));
	}
	writeInt(value){
		const size = 4;
		this.buf = Buffer.concat([this.buf], this.buf.length + size);
		super.writeInt(value, this.index);
		this.index += size;
	}
	writeFloat(value){
		const size = 4;
		this.buf = Buffer.concat([this.buf], this.buf.length + size);
		super.writeFloat(value, this.index);
		this.index += size;
	}
	writeShort(value){
		const size = 2;
		this.buf = Buffer.concat([this.buf], this.buf.length + size);
		super.writeShort(value, this.index);
		this.index += size;
	}
	writeByte(value){
		const size = 1;
		this.buf = Buffer.concat([this.buf], this.buf.length + size);
		super.writeByte(value, this.index);
		this.index += size;
	}
	writeBoolean(value){
		const size = 1;
		this.buf = Buffer.concat([this.buf], this.buf.length + size);
		super.writeBoolean(value, this.index);
		this.index += size;
	}
	writeUTF(value){
		const size = value.length + 2;
		console.log(size);
		this.buf = Buffer.concat([this.buf], this.buf.length + size);
		super.writeUTF(value, this.index);
		this.index += size;
	}

}
