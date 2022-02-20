interface ChanceItemInstance extends ItemInstance {
    chance?: number;
}

interface ProcessorRecipe extends RecipePattern {
    input?: ChanceItemInstance[];
    output?: ChanceItemInstance[];
    timeMultiplier: number;
    powerMultiplier: number;
}


class ProcessorRecipeHandler {

    readonly inputSlotSize: number;
    readonly inputTankSize: number;
    readonly outputSlotSize: number;
    readonly outputTankSize: number;
    private readonly recipes: ProcessorRecipe[] = [];
    private maxTime: number;
    private maxPower: number;

    constructor(inputSlotSize: number, inputTankSize: number, outputSlotSize: number, outputTankSize: number){
        this.inputSlotSize = inputSlotSize;
        this.inputTankSize = inputTankSize;
        this.outputSlotSize = outputSlotSize;
        this.outputTankSize = outputTankSize;
        this.maxTime = 1;
        this.maxPower = 1;
    }

    private convItem(item: any, defData: number): ChanceItemInstance {
        let pair: {id: number, data: number};
        if(!item){
            return {id: 0, count: 0, data: 0};
        }
        if(typeof item === "number"){
            return {id: item, count: 1, data: defData};
        }
        if(typeof item === "string"){
            pair = IDConverter.getIDData(item);
            return {id: pair.id, count: 1, data: pair.data || defData};
        }
        if(typeof item.id === "number"){
            return {id: item.id, count: item.count || 1, data: item.data || defData, chance: item.chance};
        }
        if(typeof item.id === "string"){
            pair = IDConverter.getIDData(item.id);
            return {id: pair.id, count: item.count || 1, data: pair.data || defData, chance: item.chance};
        }
        return null;
    }

    private convLiquid(liquid: any): LiquidInstance {
        if(!liquid){
            return {liquid: null, amount: 0};
        }
        if(isLiquidInstance(liquid)){
            return liquid;
        }
        if(Array.isArray(liquid) && liquid.length === 1 && typeof liquid[0] === "string"){
            const split = liquid[0].split(":");
            return {liquid: split[0], amount: +split[1] || 1000};
        }
        return null;
    }

    add(...resources: (number | VanillaID | {id: number | VanillaID, count?: number, data?: number, chance?: number} | LiquidInstance | [string])[]): void {
        if(resources.length < this.inputSlotSize + this.inputTankSize + this.outputSlotSize + this.outputTankSize){
            alert("[NC] Invalid Recipe: " + JSON.stringify(resources));
            return;
        }
        const recipe: ProcessorRecipe = {timeMultiplier: 1, powerMultiplier: 1};
        const inputItem: ItemInstance[] = [];
        const inputLiquid: LiquidInstance[] = [];
        const outputItem: ItemInstance[] = [];
        const outputLiquid: LiquidInstance[] = [];
        const option = [];
        let res: (typeof resources)[number];
        let item: ItemInstance;
        let liquid: LiquidInstance;
        for(let i = 0; i < resources.length; i++){
            res = resources[i];
            if(i < this.inputSlotSize){
                item = this.convItem(res, -1);
                if(!item){
                    return;
                }
                inputItem.push(item);
            }
            else if(i < this.inputSlotSize + this.inputTankSize){
                liquid = this.convLiquid(res);
                if(!liquid){
                    return;
                }
                inputLiquid.push(liquid);
            }
            else if(i < this.inputSlotSize + this.inputTankSize + this.outputSlotSize){
                item = this.convItem(res, 0);
                if(!item){
                    return;
                }
                outputItem.push(item);
            }
            else if(i < this.inputSlotSize + this.inputTankSize + this.outputSlotSize + this.outputTankSize){
                liquid = this.convLiquid(res);
                if(!liquid){
                    return;
                }
                outputLiquid.push(liquid);
            }
            else{
                option.push(res);
            }
        }
        recipe.timeMultiplier = typeof option[0] === "number" ? option[0] : 1;
        recipe.powerMultiplier = typeof option[1] === "number" ? option[1] : 1;
        if(inputItem.length > 0) recipe.input = inputItem;
        if(inputLiquid.length > 0) recipe.inputLiq = inputLiquid;
        if(outputItem.length > 0) recipe.output = outputItem;
        if(outputLiquid.length > 0) recipe.outputLiq = outputLiquid;
        this.recipes.push(recipe);
        this.maxTime = Math.max(this.maxTime, recipe.timeMultiplier);
        this.maxPower = Math.max(this.maxPower, recipe.powerMultiplier);
    }

    getAll(): ProcessorRecipe[] {
        return this.recipes;
    }

    get(slots: ItemContainerSlot[], tanks: BlockEngine.LiquidTank[]): ProcessorRecipe {
        const find = this.recipes.find(recipe => {
            const indexes: number[] = [];
            let index: number;
            if(recipe.input){
                let item: ItemInstance;
                for(let i = 0; i < recipe.input.length; i++){
                    item = recipe.input[i];
                    index = slots.findIndex((slot, j) => indexes.indexOf(j) === -1 && slot.id === item.id && (item.data === -1 || slot.data === item.data) && slot.count >= item.count);
                    if(index === -1){
                        return false;
                    }
                    indexes.push(index);
                }
            }
            indexes.length = 0;
            if(recipe.inputLiq){
                let liquid: LiquidInstance;
                for(let i = 0; i < recipe.inputLiq.length; i++){
                    liquid = recipe.inputLiq[i];
                    index = tanks.findIndex((tank, j) => indexes.indexOf(j) === -1 && tank.getLiquidStored() === liquid.liquid && tank.getAmount() >= liquid.amount);
                    if(index === -1){
                        return false;
                    }
                    indexes.push(index);
                }
            }
            return true;
        });
        return find ? {input: [], output: [], inputLiq: [], outputLiq: [], ...find} : null;
    }

    getMaxTime(): number {
        return this.maxTime;
    }

    getMaxPower(): number {
        return this.maxPower;
    }

}