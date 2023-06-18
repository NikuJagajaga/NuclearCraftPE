Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.electrolyzer);

    handler.add(["water:1000"], ["hydrogen:950"], ["deuterium:50"], ["oxygen:500"], null, 1.5, 1.0);
    handler.add(["hydrofluoric_acid:1000"], ["hydrogen:500"], ["fluorine:500"], null, null, 1.0, 0.5);
    handler.add(["molten_NaOH:666"], ["molten_sodium:144"], ["water:1000"], ["oxygen:500"], null, 1.5, 1.5);
    handler.add(["molten_KOH:666"], ["molten_potassium:144"], ["water:1000"], ["oxygen:500"], null, 1.5, 1.5);
    handler.add(["molten_alumina:144"], ["molten_aluminum:288"], ["oxygen:3000"], null, null, 2.0, 1.0);

    //Fluoride Recipes

});