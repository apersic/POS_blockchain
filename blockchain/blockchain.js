const Block = require('./block');
//Class that represents the blockchain.
class BlockChain{

    constructor(){
        this.chain = [Block.genesis()];
    }

    //Function that adds blocks at the end
    //of the blockchain.
    addBlock(data){
        const block = Block.createABlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);

        return block;
    }

    //Validates the blockchain.
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;
        
        for (let i = 0; i < chain.length; i++) {
            const block = chain[i];
            const prevBlock = chain[i - 1];
            if((block.prevHash !== prevBlock.hash) || (block.hash !== Block.getBlockHash(block)))
                return false;
        }

        return true;
    }

    //Replaces current chain with a newer,
    //valid version.
    replaceChain(newChain){
        if(newChain.length < this.chain.length){
            console.log("Received chain is shorter that the current instance.");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("Received chain is not valid.");
            return;
        }

        console.log("Replacing chain with a new one.");
        this.chain = newChain;
    }
}

module.exports = BlockChain;