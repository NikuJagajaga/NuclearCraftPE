Item.addCreativeGroup("nc_rtg", "RTG", [
    NCItem.createBlock("rtg_uranium", "Uranium RTG", [0, 0, 1]),
    NCItem.createBlock("rtg_plutonium", "Plutonium RTG", [0, 0, 1]),
    NCItem.createBlock("rtg_americium", "Americium RTG", [0, 0, 1]),
    NCItem.createBlock("rtg_californium", "Californium RTG", [0, 0, 1])
]);


class RTGenerator extends GeneratorBase {

    constructor(readonly produce: number){
        super();
    }

    getEnergyStorage(): number {
        return this.produce * 4;
    }

    onInit(): void {}
    clientLoad(): void {}
    clientUnload(): void {}

    onTick(): void {
        this.data.energy = Math.min(this.data.energy + this.produce, this.getEnergyStorage());
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, playerUid: number): boolean {
        return true;
    }

}



MachineRegistry.registerPrototype(NCID.rtg_uranium, new RTGenerator(4));
MachineRegistry.registerPrototype(NCID.rtg_plutonium, new RTGenerator(100));
MachineRegistry.registerPrototype(NCID.rtg_americium, new RTGenerator(50));
MachineRegistry.registerPrototype(NCID.rtg_californium, new RTGenerator(400));


Callback.addCallback("PreLoaded", () => {

    Recipes2.addShaped(NCID.rtg_uranium, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_graphite,
        c: NCID.block_uranium238
    });

    Recipes2.addShaped(NCID.rtg_plutonium, "aba:bcb:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.P238
    });

    Recipes2.addShaped(NCID.rtg_americium, "aba:bcb:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.A241
    });

    Recipes2.addShaped(NCID.rtg_californium, "aba:bcb:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.Cf250
    });

});