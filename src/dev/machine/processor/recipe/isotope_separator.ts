Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.isotope_separator);

    handler.add(NCID.ingot_thorium, NCID.T232, {id: NCID.T230, data: 1});
    handler.add(NCID.dust_thorium, NCID.T232, {id: NCID.T230, data: 1});
    handler.add(NCID.ingot_uranium, NCID.U238, {id: NCID.U235, data: 1});
    handler.add(NCID.dust_uranium, NCID.U238, {id: NCID.U235, data: 1});
    handler.add(NCID.ingot_boron, NCID.boron11, {id: NCID.boron10, count: 3, data: 1});
    handler.add(NCID.dust_boron, NCID.boron11, {id: NCID.boron10, count: 3, data: 1});
    handler.add(NCID.ingot_lithium, NCID.lithium7, {id: NCID.lithium6, count: 3, data: 1});
    handler.add(NCID.dust_lithium, NCID.lithium7, {id: NCID.lithium6, count: 3, data: 1});

    handler.add(NCID.TBU, {id: NCID.T232, count: 9}, null);
    handler.add(NCID.TBUox, {id: NCID.T232ox, count: 9}, null);
    handler.add(NCID.MOX239, {id: NCID.U238, count: 8}, NCID.P239ox);
    handler.add(NCID.MOX241, {id: NCID.U238, count: 8}, NCID.P241ox);

    const addFuelSeparationRecipes = (symbol: string, fertile: number, ...fissiles: number[]): void => {
        fissiles.forEach(fissile => {
            handler.add(NCID["LE" + symbol + fissile], {id: NCID[symbol + fertile], count: 8}, NCID[symbol + fissile]);
            handler.add(NCID["LE" + symbol + fissile + "ox"], {id: NCID[symbol + fertile], count: 8}, NCID[symbol + fissile + "ox"]);
            handler.add(NCID["HE" + symbol + fissile], {id: NCID[symbol + fertile], count: 5}, {id: NCID[symbol + fissile], count: 4});
            handler.add(NCID["HE" + symbol + fissile + "ox"], {id: NCID[symbol + fertile], count: 5}, {id: NCID[symbol + fissile + "ox"], count: 4});
        });
    }

    addFuelSeparationRecipes("U", 238, 233, 235);
    addFuelSeparationRecipes("N", 237, 236);
    addFuelSeparationRecipes("P", 242, 239, 241);
    addFuelSeparationRecipes("A", 243, 242);
    addFuelSeparationRecipes("Cm", 246, 243, 245, 247);
    addFuelSeparationRecipes("B", 247, 248);
    addFuelSeparationRecipes("Cf", 252, 249, 251);

});