Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.fuel_reprocessor);

    const addReprocessingRecipes = (fuel: string, out1: string, n1: number, out2: string, n2: number, out3: string, n3: number, out4: string, n4: number): void => {
        handler.add({id: NCID[fuel], count: 1, data: 1}, {id: NCID[out1], count: n1, data: 1}, {id: NCID[out2], count: n2, data: 1}, {id: NCID[out3], count: n3, data: 1}, {id: NCID[out4], count: n4, data: 1});
        handler.add({id: NCID[fuel + "ox"], data: 1}, {id: NCID[out1 + "ox"], count: n1, data: 1}, {id: NCID[out2 + "ox"], count: n2, data: 1}, {id: NCID[out3 + "ox"], count: n3, data: 1}, {id: NCID[out4 + "ox"], count: n4, data: 1});
    }

    addReprocessingRecipes("TBU", "U233", 16, "U235", 8, "N236", 8, "N237", 32);
    addReprocessingRecipes("LEU235", "U238", 40, "N237", 8, "P239", 8, "P241", 8);
    addReprocessingRecipes("HEU235", "U238", 20, "N237", 16, "P239", 4, "P242", 24);
    addReprocessingRecipes("LEU233", "P239", 4, "P241", 4, "P242", 32, "A243", 24);
    addReprocessingRecipes("HEU233", "N236", 32, "N237", 8, "P242", 16, "A243", 8);
    addReprocessingRecipes("LEN236", "N237", 4, "P242", 32, "A242", 8, "A243", 20);
    addReprocessingRecipes("HEN236", "U238", 16, "P238", 8, "P239", 8, "P242", 32);
    addReprocessingRecipes("MOX239", "U238", 40, "P242", 12, "A243", 8, "Cm243", 4);
    addReprocessingRecipes("LEP239", "P239", 8, "P242", 24, "Cm243", 4, "Cm246", 28);
    addReprocessingRecipes("HEP239", "A241", 8, "A242", 24, "Cm245", 8, "Cm246", 24);
    addReprocessingRecipes("LEP241", "P242", 4, "A242", 4, "A243", 8, "Cm246", 48);
    addReprocessingRecipes("HEP241", "A241", 8, "Cm245", 8, "Cm246", 24, "Cm247", 24);
    addReprocessingRecipes("MOX241", "U238", 40, "P241", 8, "P242", 8, "Cm246", 8);
    addReprocessingRecipes("LEA242", "Cm243", 8, "Cm245", 8, "Cm246", 40, "Cm247", 8);
    addReprocessingRecipes("HEA242", "Cm245", 16, "Cm246", 32, "Cm247", 8, "B247", 8);
    addReprocessingRecipes("LECm243", "Cm246", 32, "B247", 16, "B248", 8, "Cf249", 8);
    addReprocessingRecipes("HECm243", "Cm246", 24, "B247", 24, "B248", 8, "Cf249", 8);
    addReprocessingRecipes("LECm245", "B247", 40, "B248", 8, "Cf249", 4, "Cf252", 12);
    addReprocessingRecipes("HECm245", "B247", 48, "B248", 4, "Cf249", 4, "Cf251", 8);
    addReprocessingRecipes("LECm247", "B247", 20, "B248", 4, "Cf251", 8, "Cf252", 32);
    addReprocessingRecipes("HECm247", "B248", 8, "Cf249", 8, "Cf251", 24, "Cf252", 24);
    addReprocessingRecipes("LEB248", "Cf249", 4, "Cf251", 4, "Cf252", 28, "Cf252", 28);
    addReprocessingRecipes("HEB248", "Cf250", 8, "Cf251", 8, "Cf252", 24, "Cf252", 24);
    addReprocessingRecipes("LECf249", "Cf250", 16, "Cf251", 8, "Cf252", 20, "Cf252", 20);
    addReprocessingRecipes("HECf249", "Cf250", 32, "Cf251", 16, "Cf252", 8, "Cf252", 8);
    addReprocessingRecipes("LECf251", "Cf251", 4, "Cf252", 20, "Cf252", 20, "Cf252", 20);
    addReprocessingRecipes("HECf251", "Cf251", 16, "Cf252", 16, "Cf252", 16, "Cf252", 16);

});