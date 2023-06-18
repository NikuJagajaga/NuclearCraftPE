Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.fluid_extractor);

    handler.add(NCID.cooler_water, NCID.cooler_empty, ["water:1000"]);
    handler.add(NCID.cooler_helium, NCID.cooler_empty, ["liquid_helium:1000"]);

});