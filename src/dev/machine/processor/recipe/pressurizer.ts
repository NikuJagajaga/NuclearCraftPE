Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.pressurizer);

    handler.add(NCID.dust_graphite, "coal");
    handler.add(NCID.dust_diamond, "diamond");
    handler.add(NCID.dust_rhodochrosite, NCID.gem_rhodochrosite);
    handler.add(NCID.dust_quartz, "quartz");
    handler.add({id: NCID.dust_obsidian, count: 4}, "obsidian", 1.5, 1.5);
    handler.add(NCID.dust_boron_nitride, NCID.gem_boron_nitride);
    handler.add(NCID.dust_fluorite, NCID.gem_fluorite);
    handler.add(NCID.dust_villiaumite, NCID.gem_villiaumite);
    handler.add(NCID.dust_carobbiite, NCID.gem_carobbiite);
    handler.add({id: NCID.ingot_graphite, count: 64}, "diamond", 3, 1.5);

});