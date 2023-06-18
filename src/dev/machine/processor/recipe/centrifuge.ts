Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.centrifuge);

    handler.add(["molten_boron:144"], ["molten_boron11:144"], ["molten_boron10:48"], null, null);
    handler.add(["molten_lithium:144"], ["molten_lithium7:144"], ["molten_lithium6:48"], null, null);

});