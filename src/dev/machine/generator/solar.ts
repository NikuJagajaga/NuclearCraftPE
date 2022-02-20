Item.addCreativeGroup("nc_solar", "Solar Panel", [
    NCItem.createBlock("solar_basic", "Basic Solar Panel", [1, 0, 1]),
    NCItem.createBlock("solar_adv", "Advanced Solar Panel", [1, 0, 1]),
    NCItem.createBlock("solar_du", "DU Solar Panel", [1, 0, 1]),
    NCItem.createBlock("solar_elite", "Elite Solar Panel", [1, 0, 1])
]);


class SolarPanel extends GeneratorBase {

    constructor(readonly produce: number){
        super();
    }

    getEnergyStorage(): number {
        return this.produce * 4;
    }

    getGenerated(): number {
        return this.produce * (this.region.getLightLevel(this.x, this.y + 1, this.z) / 15) | 0;
    }

    checkSky(): void {
        this.networkData.putBoolean("canSeeSky", this.region.canSeeSky(this.x, this.y + 1, this.z));
        this.networkData.sendChanges();
    }

    onInit(): void {
        this.checkSky();
    }

    clientLoad(): void {}
    clientUnload(): void {}

    onTick(): void {
        if((World.getThreadTime() & 255) === 0){
            this.checkSky();
        }
        if(this.networkData.getBoolean("canSeeSky")){
            this.data.energy = Math.min(this.data.energy + this.getGenerated(), this.getEnergyStorage());
        }
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, playerUid: number): boolean {
        return true;
    }

}


MachineRegistry.registerPrototype(NCID.solar_basic, new SolarPanel(5));
MachineRegistry.registerPrototype(NCID.solar_adv, new SolarPanel(20));
MachineRegistry.registerPrototype(NCID.solar_du, new SolarPanel(80));
MachineRegistry.registerPrototype(NCID.solar_elite, new SolarPanel(320));


Callback.addCallback("PreLoaded", () => {

    Recipes2.addShaped(NCID.solar_basic, "aba:cdc:ece", {
        a: NCID.dust_graphite,
        b: NCID.dust_quartz,
        c: "heavy_weighted_pressure_plate",
        d: "lapis_lazuli",
        e: NCID.wire_copper
    });

    Recipes2.addShaped(NCID.solar_adv, "aba:ccc:ada", {
        a: NCID.plate_adv,
        b: NCID.dust_graphite,
        c: NCID.solar_basic,
        d: NCID.wire_copper
    });

    Recipes2.addShaped(NCID.solar_du, "aba:ccc:ada", {
        a: NCID.plate_du,
        b: NCID.dust_graphite,
        c: NCID.solar_adv,
        d: NCID.wire_MnO2
    });

    Recipes2.addShaped(NCID.solar_elite, "aba:ccc:ada", {
        a: NCID.plate_elite,
        b: NCID.gem_boron_arsenide,
        c: NCID.solar_du,
        d: NCID.wire_MnO2
    });

});