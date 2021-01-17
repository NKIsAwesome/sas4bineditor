
module.exports = class ByteArray{
	constructor(buf){
		this.buf = buf;
		this.index = 0;
	}
	readInt(){
		const result = {
			value: this.buf.readInt32BE(this.index),
			index: this.index,
			writer: this.writeInt
		}
		this.index += 4;
		return result;
	}
	readFloat(){
		const result = {
			value: this.buf.readFloatBE(this.index),
			index: this.index,
			writer: this.writeFloat
		}
		this.index += 4;
		return result;
	}
	readShort(){
		const result = {
			value: this.buf.readInt16BE(this.index),
			index: this.index,
			writer: this.writeShort
		}
		this.index += 2;
		return result;
	}
	readBoolean(){
		const result = {
			value: Boolean(this.buf.readUInt8(this.index)),
			index: this.index,
			writer: this.writeBoolean
		}
		this.index++;
		return result;
	}
	readUTF(){
		let str = '';
		const size = this.readShort().value;
		for(let i = 0; i < size; i++){
			str += String.fromCharCode(this.buf.readUInt8(this.index)); 
			this.index++;
		}
		return str;
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
