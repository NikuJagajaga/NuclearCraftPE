Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.fluid_infuser);

    handler.add(NCID.ingot_manganese, ["oxygen:1000"], NCID.ingot_manganese_oxide);
    handler.add(NCID.ingot_manganese_oxide, ["oxygen:1000"], NCID.ingot_manganese_dioxide);
    handler.add(NCID.dust_manganese, ["oxygen:1000"], NCID.dust_manganese_oxide);
    handler.add(NCID.dust_manganese_oxide, ["oxygen:1000"], NCID.dust_manganese_dioxide);

    handler.add(NCID.cooler_empty, ["water:1000"], NCID.cooler_water);
    handler.add(NCID.cooler_empty, ["liquid_helium:1000"], NCID.cooler_helium);
    //cooler_cryotheum

    //water source
    //cobblestone generator

    //handler.add("sandstone", ["ender:250"], "end_stone");
    //handler.add("red_sandstone", ["ender:250"], "end_stone");

    for(let i = 0; i < 16; i++){
        handler.add({id: "concrete_powder", data: i}, ["water:1000"], "concrete", 0.5, 0.5);
    }

    handler.add("dirt", ["water:2000"], "clay");
    handler.add("grass", ["water:2000"], "clay_ball");
    handler.add("brick", ["water:2000"], "clay");
    handler.add("hardened_clay", ["water:4000"], "clay", 4, 1);

    const OXIDIZING_VOLUME = 400;

    const addOxidizingRecipes = (initial: string, ...nums: number[]): void => {
        let key: string;
        for(let i = 0; i < nums.length; i++){
            key = initial + nums[i];
            handler.add(NCID[key], {liquid: "oxygen", amount: OXIDIZING_VOLUME}, NCID[key + "ox"], 0.5, 1);
            handler.add({id: NCID[key], data: 1}, {liquid: "oxygen", amount: OXIDIZING_VOLUME / 8}, {id: NCID[key + "ox"], data: 1}, 1/18, 1);
        }
    }

    const addFuelOxidizingRecipes = (key: string): void => {
        handler.add(NCID[key], {liquid: "oxygen", amount: OXIDIZING_VOLUME * 10}, NCID[key + "ox"], 2, 2);
        handler.add({id: NCID[key], data: 1}, {liquid: "oxygen", amount: OXIDIZING_VOLUME * 8}, {id: NCID[key + "ox"], data: 1}, 2, 2);
    }

    addOxidizingRecipes("T", 230, 232);
    addOxidizingRecipes("U", 233, 235, 238);
    addOxidizingRecipes("N", 236, 237);
    addOxidizingRecipes("P", 238, 239, 241, 242);
    addOxidizingRecipes("A", 241, 242, 243);
    addOxidizingRecipes("Cm", 243, 245, 246, 247);
    addOxidizingRecipes("B", 247, 248);
    addOxidizingRecipes("Cf", 249, 250, 251, 252);

    addFuelOxidizingRecipes("TBU");
    addFuelOxidizingRecipes("LEU233");
    addFuelOxidizingRecipes("HEU233");
    addFuelOxidizingRecipes("LEU235");
    addFuelOxidizingRecipes("HEU235");
    addFuelOxidizingRecipes("LEN236");
    addFuelOxidizingRecipes("HEN236");
    addFuelOxidizingRecipes("LEP239");
    addFuelOxidizingRecipes("HEP239");
    addFuelOxidizingRecipes("LEP241");
    addFuelOxidizingRecipes("HEP241");
    addFuelOxidizingRecipes("LEA242");
    addFuelOxidizingRecipes("HEA242");
    addFuelOxidizingRecipes("LECm243");
    addFuelOxidizingRecipes("HECm243");
    addFuelOxidizingRecipes("LECm245");
    addFuelOxidizingRecipes("HECm245");
    addFuelOxidizingRecipes("LECm247");
    addFuelOxidizingRecipes("HECm247");
    addFuelOxidizingRecipes("LEB248");
    addFuelOxidizingRecipes("HEB248");
    addFuelOxidizingRecipes("LECf249");
    addFuelOxidizingRecipes("HECf249");
    addFuelOxidizingRecipes("LECf251");
    addFuelOxidizingRecipes("HECf251");

});