class ProcessorInterface implements StorageDescriptor {

    readonly liquidUnitRatio: number;
    readonly inputSlotSize: number;
    readonly inputTankSize: number;
    readonly outputSlotSize: number;
    readonly outputTankSize: number;

    slots: {[key: string]: SlotData};
    tileEntity: TileProcessor;

    constructor(inputSlotSize: number, inputTankSize: number, outputSlotSize: number, outputTankSize: number){
        this.liquidUnitRatio = 0.001;
        this.inputSlotSize = inputSlotSize;
        this.inputTankSize = inputTankSize;
        this.outputSlotSize = outputSlotSize;
        this.outputTankSize = outputTankSize;
        this.slots = {};
        for(let i = 0; i < this.inputSlotSize; i++){
            this.slots["input" + i] = {
                input: true,
                isValid: (item, side, tileEntity: TileProcessor) => {
                    const recipes = tileEntity.getRecipeHandler().getAll();
                    return recipes.some(recipe => recipe.input[i].id === item.id && (recipe.input[i].data === -1 || recipe.input[i].data === item.data));
                }
            };
        }
        for(let i = 0; i < this.outputSlotSize; i++){
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
            if(!tanks[i].isEmpty()){
                return tanks[i];
            }
        }
        return null;
    }

    canReceiveLiquid(liquid: string, side: number): boolean {

        if(this.inputTankSize === 0) return false;

        const recHandler = this.tileEntity.getRecipeHandler();

        return recHandler.getAll().some(recipe => {
            for(let i = 0; i < this.inputTankSize; i++){
                if(recipe.inputLiq[i].liquid === liquid){
                    return true;
                }
            }
            return false;
        });

    }

    canTransportLiquid(liquid: string, side: number): boolean {
        return this.outputTankSize > 0;
    }

}