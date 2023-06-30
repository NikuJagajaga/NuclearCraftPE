Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.melter);

    handler.add(NCID.dust_sulfur, ["molten_sulfur:666"]);
    handler.add(NCID.comp_NaOH, ["molten_NaOH:666"]);
    handler.add(NCID.comp_KOH, ["molten_KOH:666"]);
    handler.add(NCID.dust_arsenic, ["molten_arsenic:666"]);
    handler.add(NCID.gem_boron_arsenide, ["molten_BAs:666"]);

    handler.add("ender_pearl", ["molten_ender:250"], 0.5, 1.5);

});