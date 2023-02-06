
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
		const result = new ByteResult(Boolean(this.buf.readUInt8(this.index)),this.index,this.writeBoolean.bind(this));
		this.index++;
		return result;
	}
	readByte(){
		const result = new ByteResult(this.buf.readUInt8(this.index),this.index,this.writeByte.bind(this));
		this.index++;
		return result;
	}
	readUTF(){
		const result = new ByteResult('',this.index,this.writeUTF.bind(this));
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
	writeByte(value,index){
		this.buf.writeUInt8(value,index);
	}
	writeBoolean(value,index){
		this.buf.writeUInt8(Number(value),index);
	}
	writeUTF(value, index){
		this.writeShort(value.length, index);
		for(let i = 0; i < value.length; i++){
			this.writeByte(value.charCodeAt(i), index+i+2);
		}
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
