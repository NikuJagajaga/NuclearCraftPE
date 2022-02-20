class ProcessorInterface implements StorageDescriptor {

    slots: {[key: string]: SlotData};
    tileEntity: TileProcessor;

    constructor(inSlotSize: number, inTankSize: number, outSlotSize: number, outTankSize: number){
        this.slots = {};
        for(let i = 0; i < inSlotSize; i++){
            this.slots["input" + i] = {input: true};
        }
        for(let i = 0; i < outSlotSize; i++){
            this.slots["output" + i] = {output: true};
        }
    }

    getInputTank(side: number): ILiquidStorage {
        if(!this.tileEntity){
            return null;
        }
        const tanks = this.tileEntity.getInputTanks();
        for(let i = 0; i < tanks.length; i++){
            if(!tanks[i].isFull()){
                return tanks[i];
            }
        }
        return null;
    }

    getOutputTank(side: number): ILiquidStorage {
        if(!this.tileEntity){
            return null;
        }
        const tanks = this.tileEntity.getOutputTanks();
        for(let i = 0; i < tanks.length; i++){
            if(!tanks[i].isFull()){
                return tanks[i];
            }
        }
        return null;
    }

}