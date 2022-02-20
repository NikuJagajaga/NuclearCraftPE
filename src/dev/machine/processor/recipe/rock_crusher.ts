Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.rock_crusher);

    handler.add({id: "stone", data: 1}, {id: NCID.dust_rhodochrosite, count: 2, chance: 0.4}, {id: NCID.dust_sulfur, count: 2, chance: 0.3}, {id: NCID.dust_villiaumite, chance: 0.35});
    handler.add({id: "stone", data: 2}, {id: NCID.dust_rhodochrosite, count: 2, chance: 0.4}, {id: NCID.dust_sulfur, count: 2, chance: 0.3}, {id: NCID.dust_villiaumite, chance: 0.35});
    handler.add({id: "stone", data: 3}, {id: NCID.dust_fluorite, count: 2, chance: 0.45}, {id: NCID.dust_carobbiite, count: 2, chance: 0.35}, {id: NCID.dust_zirconium, chance: 0.4});
    handler.add({id: "stone", data: 4}, {id: NCID.dust_fluorite, count: 2, chance: 0.45}, {id: NCID.dust_carobbiite, count: 2, chance: 0.35}, {id: NCID.dust_zirconium, chance: 0.4});
    handler.add({id: "stone", data: 5}, {id: NCID.dust_beryllium, count: 2, chance: 0.5}, {id: NCID.comp_alugentum, count: 2, chance: 0.25}, {id: NCID.dust_arsenic, chance: 0.3});
    handler.add({id: "stone", data: 6}, {id: NCID.dust_beryllium, count: 2, chance: 0.5}, {id: NCID.comp_alugentum, count: 2, chance: 0.25}, {id: NCID.dust_arsenic, chance: 0.3});

});