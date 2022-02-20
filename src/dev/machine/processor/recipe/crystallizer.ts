Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.crystallizer);

    handler.add(["boron_nitride_solution:666"], NCID.dust_boron_nitride);
    handler.add(["fluorite_water:666"], NCID.dust_fluorite);
    handler.add(["calcium_sulfate_solution:666"], NCID.comp_CaSO4);
    handler.add(["sodium_fluoride_solution:666"], NCID.comp_NaF);
    handler.add(["potassium_fluoride_solution:666"], NCID.comp_KF);
    handler.add(["sodium_hydroxide_solution:666"], NCID.comp_NaOH, 0.5, 0.5);
    handler.add(["potassium_hydroxide_solution:666"], NCID.comp_KOH, 0.5, 0.5);
    handler.add(["borax_solution:666"], NCID.comp_borax, 0.5, 0.5);

});