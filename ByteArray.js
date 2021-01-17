
module.exports = class ByteArray{
	constructor(buf){
		this.buf = buf;
		this.index = 0;
	}
	readInt(){
		const result = new ByteResult(this.buf.readInt32BE(this.index),this.index,this.writeInt.bind(this));
		this.index += 4;
		return result;
	}
	readFloat(){
		const result = new ByteResult(this.buf.readFloatBE(this.index),this.index,this.writeFloat.bind(this));
		this.index += 4;
		return result;
	}
	readShort(){
		const result = new ByteResult(this.buf.readInt16BE(this.index),this.index,this.writeShort.bind(this));
		this.index += 2;
		return result;
	}
	readBoolean(){
		const result = new ByteResult(Boolean(this.buf.readUInt8(this.index)),this.index,this.writeBoolean);
		this.index++;
		return result;
	}
	readUTF(){
		const result = new ByteResult('',this.index,this.writeUTF);
		const size = this.readShort().value;
		for(let i = 0; i < size; i++){
			result.value += String.fromCharCode(this.buf.readUInt8(this.index)); 
			this.index++;
		}
		return result;
	}
	isEmpty(){
		return this.index >= this.buf.length;
	}
	writeInt(value,index){
		this.buf.writeInt32BE(value,index);
	}
	writeFloat(value,index){
		this.buf.writeFloatBE(value,index);
	}
	writeShort(value,index){
		this.buf.writeInt16BE(value,index);
	}

}

class ByteResult{
	constructor(value,index,callback){
		this.value = value;
		this.index = index;
		this.callback = callback;
	}
	write(value){
		this.callback(value,this.index);
	}
}
