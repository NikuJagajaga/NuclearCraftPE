Item.addCreativeGroup("nc_battery", "Battery", [
    NCItem.createBlock("volpile_basic", "Basic Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("volpile_adv", "Advanced Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("volpile_du", "DU Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("volpile_elite", "Elite Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("battery_basic", "Basic Lithium Ion Battery", [0, 0, 3]),
    NCItem.createBlock("battery_adv", "Advanced Lithium Ion Battery", [0, 0, 3]),
    NCItem.createBlock("battery_du", "DU Lithium Ion Battery", [0, 0, 3]),
    NCItem.createBlock("battery_elite", "Elite Lithium Ion Battery", [0, 0, 3])
]);


MachineRegistry.registerPrototype(NCID.volpile_basic, new TileBattery(16e5));
MachineRegistry.registerPrototype(NCID.volpile_adv, new TileBattery(64e5));
MachineRegistry.registerPrototype(NCID.volpile_du, new TileBattery(256e5));
MachineRegistry.registerPrototype(NCID.volpile_elite, new TileBattery(1024e5));
MachineRegistry.registerPrototype(NCID.battery_basic, new TileBattery(32e6));
MachineRegistry.registerPrototype(NCID.battery_adv, new TileBattery(128e6));
MachineRegistry.registerPrototype(NCID.battery_du, new TileBattery(512e6));
MachineRegistry.registerPrototype(NCID.battery_elite, new TileBattery(2048e6));


Callback.addCallback("PreLoaded", () => {

    const types = 3 ** 6;

    const registerBatteryModel = (id: number, texName: string): void => {
        TileRenderer.setStandardModel(id, 0, [[texName, 0], [texName, 0], [texName, 3], [texName, 3], [texName, 3], [texName, 3]]);
        let code: string;
        for(let meta = 0; meta < types; meta++){
            code = ("000000" + meta.toString(3)).slice(-6);
            TileRenderer.registerRenderModel(id, meta, [
                [texName, +code[0]],
                [texName, +code[1]],
                [texName, +code[2] + 3],
                [texName, +code[3] + 3],
                [texName, +code[4] + 3],
                [texName, +code[5] + 3]
            ]);
        }
    }

    registerBatteryModel(NCID.volpile_basic, "nc_volpile_basic");
    registerBatteryModel(NCID.volpile_adv, "nc_volpile_adv");
    registerBatteryModel(NCID.volpile_du, "nc_volpile_du");
    registerBatteryModel(NCID.volpile_elite, "nc_volpile_elite");
    registerBatteryModel(NCID.battery_basic, "nc_battery_basic");
    registerBatteryModel(NCID.battery_adv, "nc_battery_adv");
    registerBatteryModel(NCID.battery_du, "nc_battery_du");
    registerBatteryModel(NCID.battery_elite, "nc_battery_elite");

});


Callback.addCallback("PreLoaded", () => {

    Recipes2.addShaped(NCID.volpile_basic, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.wire_copper,
        c: NCID.block_magnesium
    });

    Recipes2.addShaped(NCID.volpile_adv, "aba:ccc:ada", {
        a: NCID.plate_adv,
        b: NCID.ingot_magnesium,
        c: NCID.volpile_basic,
        d: NCID.ingot_copper
    });

    Recipes2.addShaped(NCID.volpile_du, "aba:ccc:ada", {
        a: NCID.plate_du,
        b: NCID.ingot_magnesium,
        c: NCID.volpile_adv,
        d: NCID.ingot_copper
    });

    Recipes2.addShaped(NCID.volpile_elite, "aba:ccc:ada", {
        a: NCID.plate_elite,
        b: NCID.ingot_magnesium,
        c: NCID.volpile_du,
        d: NCID.ingot_copper
    });

    Recipes2.addShaped(NCID.battery_basic, "aba:bcb:aba", {
        a: NCID.plate_elite,
        b: NCID.battery,
        c: NCID.wire_MnO2
    });

    Recipes2.addShaped(NCID.battery_adv, "aba:ccc:ada", {
        a: NCID.plate_adv,
        b: NCID.alloy_LiMnO2,
        c: NCID.battery_basic,
        d: NCID.wire_MnO2
    });

    Recipes2.addShaped(NCID.battery_du, "aba:ccc:ada", {
        a: NCID.plate_du,
        b: NCID.alloy_LiMnO2,
        c: NCID.battery_adv,
        d: NCID.wire_MnO2
    });

    Recipes2.addShaped(NCID.battery_elite, "aba:ccc:ada", {
        a: NCID.plate_elite,
        b: NCID.alloy_LiMnO2,
        c: NCID.battery_du,
        d: NCID.wire_MnO2
    });

});