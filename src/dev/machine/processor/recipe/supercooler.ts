Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.supercooler);

    handler.add(["helium:8000"], ["liquid_helium:25"]);
    handler.add(["nitrogen:8000"], ["liquid_nitrogen:25"], 0.5, 0.5);

});