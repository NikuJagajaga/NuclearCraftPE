class TileProcessor extends ProcessorBase {

    defaultValues = {
        energy: 0,
        progress: 0
    };

    constructor(
        readonly inputSlotSize: number,
        readonly inputTankSize: number,
        readonly outputSlotSize: number,
        readonly outputTankSize: number,
        readonly particle1: EParticleType,
        readonly particle2: EParticleType,
        readonly processTime: number,
        readonly processPower: number
    ){
        super();
    }

    getEnergyStorage(): number {
        const handler = this.getRecipeHandler();
        if(!handler){
            return 0;
        }
        return (handler.getMaxTime() * this.getProcessTime()) * (handler.getMaxPower() * this.getProcessPower()) | 0;
    }

    getScreenByName(): UI.StandardWindow {
        return ProcessorRegistry.getWindow(this.blockID);
    }

    getRecipeHandler(): ProcessorRecipeHandler {
        return ProcessorRegistry.getRecipeHandler(this.blockID);
    }

    setupContainer(): void {
        const liquids = this.getRecipeHandler().getValidInputLiquids();
        for(let i = 0; i < this.inputTankSize; i++){
            this["inputLiq" + i] = this.addLiquidTank("inputLiq" + i, 16000, liquids);
        }
        for(let i = 0; i < this.outputTankSize; i++){
            this["outputLiq" + i] = this.addLiquidTank("outputLiq" + i, 16000);
        }
        StorageInterface.setGlobalValidatePolicy(this.container, this.getRecipeHandler().globalValidatePolicy);
    }

    getInputSlots(): ItemContainerSlot[] {
        const slots = [];
        for(let i = 0; i < this.inputSlotSize; i++){
            slots.push(this.container.getSlot("input" + i));
        }
        return slots;
    }

    getOutputSlots(): ItemContainerSlot[] {
        const slots = [];
        for(let i = 0; i < this.outputSlotSize; i++){
            slots.push(this.container.getSlot("output" + i));
        }
        return slots;
    }

    getInputTanks(): BlockEngine.LiquidTank[] {
        const tanks = [];
        for(let i = 0; i < this.inputTankSize; i++){
            tanks.push(this["inputLiq" + i]);
        }
        return tanks;
    }

    getOutputTanks(): BlockEngine.LiquidTank[] {
        const tanks = [];
        for(let i = 0; i < this.outputTankSize; i++){
            tanks.push(this["outputLiq" + i]);
        }
        return tanks;
    }

    getSpeedUpgCount(): number {
        const slot = this.container.getSlot("slotUpgSpeed");
        return slot.id === NCID.upg_speed ? Math.min(8, slot.count) : 0;
    }

    getEnergyUpgCount(): number {
        const slot = this.container.getSlot("slotUpgEnergy");
        return slot.id === NCID.upg_energy ? Math.min(8, slot.count, this.getSpeedUpgCount()) : 0;
    }

    getSpeedMultiplier(): number {
        return this.getSpeedUpgCount() + 1;
    }

    getPowerMultiplier(): number {
        return (this.getSpeedUpgCount() + 1) ** 2 / (this.getEnergyUpgCount() + 1);
    }

    getProcessTime(): number {
        return this.processTime / this.getSpeedMultiplier() | 0;
    }

    getProcessPower(): number {
        return this.processPower * this.getPowerMultiplier() | 0;
    }

    getRecipe(): ProcessorRecipe {
        const handler = this.getRecipeHandler();
        return handler ? handler.get(this.getInputSlots(), this.getInputTanks()) : null;
    }

    consumeSources(recipe: ProcessorRecipe): void {
        const inputSlots = this.getInputSlots();
        const inputTanks = this.getInputTanks();
        let slot: ItemContainerSlot;
        let tank: BlockEngine.LiquidTank;
        for(const item of recipe.input){
            slot = inputSlots.find(s => s.id === item.id && (item.data === -1 || s.data === item.data));
            if(slot){
                slot.count -= item.count;
                slot.markDirty();
                slot.validate();
            }
        }
        for(const liquid of recipe.inputLiq){
            tank = inputTanks.find(t => t.getLiquidStored() === liquid.liquid && t.getAmount() >= liquid.amount);
            if(tank){
                tank.getLiquid(liquid.amount);
            }
        }
    }

    hasSpace(recipe: ProcessorRecipe): boolean {
        const outputSlots = this.getOutputSlots();
        const outputTanks = this.getOutputTanks();
        let item: ItemInstance;
        let slot: ItemContainerSlot;
        let liquid: LiquidInstance;
        let tank: BlockEngine.LiquidTank;
        for(let i = 0; i < recipe.output.length; i++){
            item = recipe.output[i];
            slot = outputSlots[i];
            if(!slot.isEmpty() && (slot.id !== item.id || slot.data !== item.data || slot.count + item.count > Item.getMaxStack(item.id))){
                return false;
            }
        }
        for(let i = 0; i < recipe.outputLiq.length; i++){
            liquid = recipe.outputLiq[i];
            tank = outputTanks[i];
            if(!tank.isEmpty() && (tank.getLiquidStored() !== liquid.liquid || tank.getAmount() + liquid.amount > tank.getLimit())){
                return false;
            }
        }
        return true;
    }

    putResults(recipe: ProcessorRecipe): void {
        const outputSlots = this.getOutputSlots();
        const outputTanks = this.getOutputTanks();
        let item: ChanceItemInstance;
        let slot: ItemContainerSlot;
        let liquid: LiquidInstance;
        let tank: BlockEngine.LiquidTank;
        for(let i = 0; i < recipe.output.length; i++){
            item = recipe.output[i];
            slot = outputSlots[i];
            if(!item.chance || item.chance > Math.random()){
                slot.id = item.id;
                slot.data = item.data;
                slot.count += item.count;
                slot.markDirty();
            }
        }
        for(let i = 0; i < recipe.outputLiq.length; i++){
            liquid = recipe.outputLiq[i];
            tank = outputTanks[i];
            tank.addLiquid(liquid.liquid, liquid.amount);
        }
    }

    updateTankScales(): void {
        const inputTanks = this.getInputTanks();
        const outputTanks = this.getOutputTanks();
        for(let i = 0; i < inputTanks.length; i++){
            inputTanks[i].updateUiScale("inputLiq" + i);
        }
        for(let i = 0; i < outputTanks.length; i++){
            outputTanks[i].updateUiScale("outputLiq" + i);
        }
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, playerUid: number): boolean {

        const player = new PlayerEntity(playerUid);
        const inputTanks = this.getInputTanks();
        const outputTanks = this.getOutputTanks();
        const empty = LiquidItemRegistry.getEmptyItem(item.id, item.data);
        let stored = "";

        if(empty){
            for(const tank of inputTanks){
                stored = tank.getLiquidStored();
                if(!tank.isFull() && (stored === empty.liquid || !stored && tank.isValidLiquid(empty.liquid))){
                    if(tank.getLimit() - tank.getAmount(stored) >= empty.amount){
                        tank.addLiquid(empty.liquid, empty.amount);
                        item.count--;
                        player.setCarriedItem(item);
                        player.addItemToInventory(empty.id, 1, empty.data);
                        this.preventClick();
                        return true;
                    }
                    if(item.count === 1 && empty.storage){
                        item.data += tank.addLiquid(empty.liquid, empty.amount);
                        player.setCarriedItem(item);
                        this.preventClick();
                        return true;
                    }
                }
            }
        }

        let full: {id: number, data: number, amount: number, storage?: number};

        for(const tank of [...outputTanks, ...inputTanks]){
            stored = tank.getLiquidStored();
            if(stored){
                full = LiquidItemRegistry.getFullItem(item.id, item.data, stored);
                if(full){
                    const amount = tank.getAmount(stored);
                    if(full.amount <= amount){
                        tank.getLiquid(stored, full.amount);
                        if(item.count === 1){
                            player.setCarriedItem(full.id, 1, full.data);
                        }
                        else{
                            item.count--;
                            player.setCarriedItem(item);
                            player.addItemToInventory(full.id, 1, full.data);
                        }
                        this.preventClick();
                        return true;
                    }
                    if(item.count === 1 && full.storage){
                        player.setCarriedItem(full.id, 1, full.amount - tank.getLiquid(stored, full.amount));
                        this.preventClick();
                        return true;
                    }
                }
            }
        }

        return false;

    }

    onTick(): void {

        const recipe = this.getRecipe();
        let processPower: number;
        let processTime: number;
        let isActive = false;

        if(recipe){
            processPower = this.getProcessPower() * recipe.powerMultiplier | 0;
            processTime = this.getProcessTime() * recipe.timeMultiplier | 0;
            if(this.data.energy >= processPower){
                isActive = true;
                this.data.energy -= processPower;
                this.data.progress++;
                if(this.data.progress >= processTime && this.hasSpace(recipe)){
                    this.consumeSources(recipe);
                    this.putResults(recipe);
                    this.data.progress = 0;
                }
                if(Math.random() < 0.2){
                    this.sendPacket("spawnParticle", {particle: this.particle1});
                    this.sendPacket("spawnParticle", {particle: this.particle2});
                }
            }
        }
        else{
            this.data.progress = 0;
        }

        this.setActive(isActive);
        StorageInterface.checkHoppers(this);
        this.setUiScale("scaleEnergy", this.data.energy, this.getEnergyStorage());
        this.setUiScale("scaleProgress", this.data.progress, processTime);
        this.updateTankScales();
        this.container.sendChanges();

    }

    @NetworkEvent(Side.Client)
    spawnParticle(data: {particle: EParticleType}): void {
        const y = this.y + 0.125 + Math.random() * 0.75;
        let x = this.x + 0.5;
        let z = this.z + 0.5;
        let rand = Math.random() * 0.6 - 0.3;
        switch(this.networkData.getInt("facing")){
            case EBlockSide.NORTH: x += rand; z -= 0.6; break;
            case EBlockSide.SOUTH: x += rand; z += 0.6; break;
            case EBlockSide.WEST: z += rand; x -= 0.6; break;
            case EBlockSide.EAST: z += rand; x += 0.6; break;
        }
        Particles.addParticle(data.particle, x, y, z, 0, 0, 0);
    }

}
