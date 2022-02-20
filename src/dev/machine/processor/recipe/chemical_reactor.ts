Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.chemical_reactor);

    //handler.add({liquid: "water", amount: 1000}, {liquid: "lava", amount: 0}, {liquid: "oxygen", amount: 500}, {liquid: "hydrogen", amount: 500}, 0.1, 1);
    //handler.add(["oxygen:500"], ["hydrogen:1000"], ["lava:2000"], null, 1, 1);

});