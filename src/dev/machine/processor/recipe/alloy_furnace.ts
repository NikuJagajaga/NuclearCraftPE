Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.alloy_furnace);

    type ID = VanillaID | number;

    const addCombineRecipe = (source1: ID[], amount1: number, source2: ID[], amount2: number, result: ID | {id: ID, count: number}, timeMultiplier?: number, powerMultiplier?: number): void => {
        let i = 0;
        let j = 0;
        for(i = 0; i < source1.length; i++){
        for(j = 0; j < source2.length; j++){
            handler.add({id: source1[i], count: amount1}, {id: source2[j], count: amount2}, result, timeMultiplier, powerMultiplier);
        }
        }
    }

    addCombineRecipe([NCID.dust_copper, NCID.ingot_copper], 3, [NCID.dust_tin, NCID.ingot_tin], 1, {id: NCID.alloy_bronze, count: 4});
    addCombineRecipe(["iron_ingot"], 1, [NCID.dust_graphite, NCID.ingot_graphite], 1, NCID.alloy_steel);
    addCombineRecipe(["iron_ingot"], 1, ["coal", NCID.dust_coal], 2, NCID.alloy_steel);
    addCombineRecipe([NCID.alloy_steel], 1, [NCID.dust_boron, NCID.ingot_boron], 1, {id: NCID.alloy_ferroboron, count: 2}, 1, 1.5);
    addCombineRecipe([NCID.alloy_ferroboron], 1, [NCID.dust_lithium, NCID.ingot_lithium], 1, {id: NCID.alloy_tough, count: 2}, 1.5, 1.5);
    addCombineRecipe([NCID.dust_graphite, NCID.ingot_graphite], 2, [NCID.dust_diamond, "diamond"], 1, {id: NCID.alloy_hard_carbon, count: 2}, 1, 2);
    addCombineRecipe([NCID.dust_magnesium, NCID.ingot_magnesium], 1, [NCID.dust_boron, NCID.ingot_boron], 2, {id: NCID.alloy_MgB2, count: 3});
    addCombineRecipe([NCID.dust_lithium, NCID.ingot_lithium], 1, [NCID.dust_manganese_dioxide, NCID.ingot_manganese_dioxide], 1, {id: NCID.alloy_LiMnO2, count: 2}, 1.5, 1);
    addCombineRecipe([NCID.dust_copper, NCID.ingot_copper], 3, [NCID.dust_silver, NCID.ingot_silver], 1, {id: NCID.alloy_shibuichi, count: 4}, 1.5, 0.5);
    addCombineRecipe([NCID.dust_tin, NCID.ingot_tin], 3, [NCID.dust_silver, NCID.ingot_silver], 1, {id: NCID.alloy_tin_silver, count: 4}, 1.5, 0.5);
    //addCombineRecipe([NCID.dust_lead, NCID.ingot_lead], 3, [], 1, {id: NCID.alloy_lead_platinum, count: 4}, 1.5, 0.5);
    handler.add(NCID.alloy_tough, NCID.alloy_hard_carbon, NCID.alloy_extreme, 2, 2);
    handler.add(NCID.alloy_extreme, NCID.gem_boron_arsenide, {id: NCID.alloy_thermal, count: 2}, 1.5, 1.5);
    addCombineRecipe([NCID.dust_zirconium, NCID.ingot_zirconium], 7, [NCID.dust_tin, NCID.ingot_tin], 1, {id: NCID.alloy_zircaloy, count: 8}, 4, 1);
    addCombineRecipe([NCID.gem_silicon], 1, [NCID.dust_graphite, NCID.ingot_graphite], 1, {id: NCID.alloy_SiC, count: 2}, 2, 2);
    handler.add({id: "iron_ingot", count: 15}, NCID.comp_CMn, {id: NCID.alloy_hsla_steel, count: 16});

});