Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.decay_hastener);

    const addDecayRecipes = (input: string, output: string): void => {
        handler.add({id: NCID[input], data: 0}, {id: NCID[output], data: 0});
        handler.add({id: NCID[input], data: 1}, {id: NCID[output], data: 1});
        handler.add({id: NCID[input + "ox"], data: 0}, {id: NCID[output + "ox"] || NCID[output], data: 0});
        handler.add({id: NCID[input + "ox"], data: 1}, {id: NCID[output + "ox"] || NCID[output], data: 1});
    }

    addDecayRecipes("T230", "dust_lead");
    addDecayRecipes("T232", "dust_lead");
    addDecayRecipes("U233", "dust_lead");
    addDecayRecipes("U235", "dust_lead");
    addDecayRecipes("U238", "T230");
    addDecayRecipes("N236", "T232");
    addDecayRecipes("N237", "U233");
    addDecayRecipes("P238", "T230");
    addDecayRecipes("P239", "U235");
    addDecayRecipes("P241", "N237");
    addDecayRecipes("P242", "U238");
    addDecayRecipes("A241", "N237");
    addDecayRecipes("A242", "T230");
    addDecayRecipes("A243", "P239");
    addDecayRecipes("Cm243", "P239");
    addDecayRecipes("Cm245", "P241");
    addDecayRecipes("Cm246", "P242");
    addDecayRecipes("Cm247", "A243");
    addDecayRecipes("B247", "A243");
    addDecayRecipes("B248", "T232");
    addDecayRecipes("Cf249", "Cm245");
    addDecayRecipes("Cf250", "Cm246");
    addDecayRecipes("Cf251", "Cm247");
    addDecayRecipes("Cf252", "T232");

});