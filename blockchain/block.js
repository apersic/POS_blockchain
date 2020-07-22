const sha256 = require('crypto-js/sha256');
//Class that represents one block in the chain.
class Block{

    constructor(timestamp, prevHash, hash, data, validator, signature){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.validator = validator;
        this.signature = signature;
    }

    //Prints out the contents of the block.
    toString(){
        return `Block - 
            Timestamp: ${this.timestamp}
            Previous hash: ${this.prevHash}
            Hash: ${this.hash}
            Data: ${this.data}
            Validator: ${this.validator}
            Signature: ${this.signature}`;
    }

    //Creates a genesis block for the blockchain.
    static genesis(){
        return this(`genesis-time`, "-------", "genesis-hash", [])
    }

    //Calculates hash for the new block.
    static calculateHash(timestamp, prevHash, data){
        return sha256(`${timestamp}${prevHash}˘${data}`).toString;
    }

    //Creates a new block.
    static createABlock(prevBlock, data){
        let hash;
        let timestamp = Date.now();
        const prevHash = prevBlock.hash;
        hash = Block.calculateHash(timestamp, prevBlock, data);

        return new this(timestamp, prevHash, hash, data);
    }

    //Calculates hash of the given instance
    //of block.
    static getBlockHash(block){
        //Deconstructing a block.
        const {timestamp, prevHash, data} = block;

        return Block.calculateHash(timestamp, prevHash, data);
    }
}