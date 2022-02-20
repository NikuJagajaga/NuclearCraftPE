NCItem.createBlock("furnace", "Nuclear Furnace", [0, 1, 0, 2, 0, 0]);
TileRenderer.setStandardModelWithRotation(NCID.furnace, 2, [0, 1, 0, 2, 0, 0].map(meta => ["nc_furnace", meta]));
TileRenderer.registerModelWithRotation(NCID.furnace, 2, [0, 1, 0, 3, 0, 0].map(meta => ["nc_furnace", meta]));
TileRenderer.setRotationFunction(NCID.furnace);


namespace NCWindow {
    const winMaker = new NCWindowMaker("Nuclear Furnace", 176, 86, "nc.frame_dark_bold");
    winMaker.addSlot("slotFuel", 55, 52, 18, "nc.slot_dark");
    winMaker.addSlot("slotSource", 55, 16, 18, "nc.slot_dark");
    winMaker.addSlot("slotResult", 111, 30, 26, "nc.slot_dark_large");
    winMaker.addScale("scaleFire", 57, 36, "nc.fire_bg", "nc.fire", WindowMaker.SCALE_UP);
    winMaker.addScale("scaleProgress", 80, 34, "nc.prog_furnace_bg", "nc.prog_furnace");
    winMaker.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(["furnace", "nc_fuel"]);
        }
    });
    export const Furnace = winMaker.makeWindow();
}


class NuclearFurnace extends MachineBase {

    private static readonly cookTime = 10;

    static readonly FuelData: {[id: number]: number} = { //burn time
        [NCID.block_thorium]: 3200,
        [NCID.block_uranium]: 3200,
        [NCID.ingot_thorium]: 320,
        [NCID.ingot_uranium]: 320,
        [NCID.dust_thorium]: 320,
        [NCID.dust_uranium]: 320,
        [NCID.T230]: 320,
        [NCID.T232]: 320,
        [NCID.U233]: 320,
        [NCID.U235]: 320,
        [NCID.U238]: 320,
        [NCID.T230ox]: 480,
        [NCID.T232ox]: 480,
        [NCID.U233ox]: 480,
        [NCID.U235ox]: 480,
        [NCID.U238ox]: 480
    };

    defaultValues = {
        energy: 0, //burn
        time: 0,
        progress: 0
    };

    getScreenByName(): UI.StandardWindow {
        return NCWindow.Furnace;
    }

    setupContainer(): void {
        StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
            if(name === "slotSource") return !!Recipes.getFurnaceRecipeResult(id, data);
            if(name === "slotFuel") return id in NuclearFurnace.FuelData && data === 0;
            return false;
        });
    }

    consumeFuel(): void {
        const slotFuel = this.container.getSlot("slotFuel");
        const time = NuclearFurnace.FuelData[slotFuel.id];
        if(time && slotFuel.data === 0){
            slotFuel.count--;
            slotFuel.validate();
            slotFuel.markDirty();
            this.data.energy = this.data.time = time;
        }
    }

    onTick(): void {

        const slotSource = this.container.getSlot("slotSource");
        const slotResult = this.container.getSlot("slotResult");
        const result = Recipes.getFurnaceRecipeResult(slotSource.id, slotSource.data);
        let isBurning = this.data.energy > 0;

        if(result && (slotResult.id === 0 || slotResult.id === result.id && slotResult.data === result.data && slotResult.count < Item.getMaxStack(slotResult.id))){

            if(!isBurning){
                this.consumeFuel();
                isBurning = this.data.energy > 0;
            }

            if(isBurning){
                this.data.progress++;
                if(this.data.progress >= NuclearFurnace.cookTime){
                    slotSource.count--;
                    slotSource.markDirty();
                    slotSource.validate();
                    slotResult.id = result.id;
                    slotResult.data = result.data;
                    slotResult.count++;
                    slotResult.markDirty();
                    this.data.progress = 0;
                }
            }
            else{
                if(this.data.progress > 0){
                    this.data.progress = Math.max(0, this.data.progress - 2);
                }
            }

        }
        else{
            this.data.progress = 0;
        }

        if(isBurning){
            this.data.energy--;
        }

        StorageInterface.checkHoppers(this);
        this.setActive(isBurning);
        this.setUiScale("scaleFire", this.data.energy, this.data.time);
        this.setUiScale("scaleProgress", this.data.progress, NuclearFurnace.cookTime);
        this.container.sendChanges();

    }

    canReceiveEnergy(side: number, type: string): boolean {
        return false;
    }

    canExtractEnergy(side: number, type: string): boolean {
        return false;
    }

    getEnergyStorage(): number {
        return 0;
    }

}


Block.setDestroyTime(NCID.furnace, 3);
ToolAPI.registerBlockMaterial(NCID.furnace, "stone");
TileEntity.registerPrototype(NCID.furnace, new NuclearFurnace());

StorageInterface.createInterface(NCID.furnace, {
    slots: {
        "slotSource": {input: true, side: "up", isValid: (item: ItemInstance) => !!Recipes.getFurnaceRecipeResult(item.id, item.data)},
        "slotFuel": {input: true, side: "horizontal", isValid: (item: ItemInstance) => item.id in NuclearFurnace.FuelData && item.data === 0},
        "slotResult": {output: true}
    }
});


Callback.addCallback("PreLoaded", () => {
    Recipes2.addShaped(NCID.furnace, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.alloy_tough,
        c: "furnace"
    });
});