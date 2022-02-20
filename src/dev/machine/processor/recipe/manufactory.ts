Callback.addCallback("PreLoaded", () => {

    const handler = ProcessorRegistry.getRecipeHandler(NCID.manufactory);

    handler.add({id: "coal", data: 0}, NCID.dust_coal, 0.5, 1);
    handler.add(NCID.dust_coal, NCID.dust_graphite, 0.25, 0.5);
    //handler.add("charcoal", dustCharcoal, 0.5, 0.5);
    handler.add("diamond", NCID.dust_diamond, 1.5, 1.5);
    //handler.add("lapis_lazuli", NCID.dust_lapis);
    handler.add(NCID.gem_rhodochrosite, NCID.dust_rhodochrosite, 1.5, 1.5);
    handler.add("quartz", NCID.dust_quartz);
    handler.add("prismarine_shard", "prismarine_crystals");
    handler.add(NCID.gem_boron_nitride, NCID.dust_boron_nitride, 1.5, 1.5);
    handler.add(NCID.gem_fluorite, NCID.dust_fluorite, 1.5, 1.5);
    handler.add(NCID.gem_villiaumite, NCID.dust_villiaumite, 1.5, 1.5);
    handler.add(NCID.gem_carobbiite, NCID.dust_carobbiite, 1.5, 1.5);
    handler.add(NCID.dust_villiaumite, NCID.comp_NaF);
    handler.add(NCID.dust_carobbiite, NCID.comp_KF);
    handler.add("sand", NCID.gem_silicon);
    handler.add("obsidian", {id: NCID.dust_obsidian, count: 4}, 2, 1);
    handler.add("cobblestone", "sand");
    handler.add("gravel", "flint");
    handler.add("end_stone", NCID.dust_endstone);
    handler.add("blaze_rod", {id: "blaze_powder", count: 4});
    handler.add({id: "rotten_flesh", count: 4}, "leather", 0.5, 1);
    handler.add({id: "reeds", count: 2}, NCID.bioplastic, 1, 0.5);
    handler.add("bone", {id: "bone_meal", count: 6});
    handler.add("planks", {id: "stick", count: 4}, 0.25, 0.5);

    handler.add({id: "log", data: 0}, {id: "planks", count: 6, data: 0}, 0.5, 0.5);
    handler.add({id: "log", data: 1}, {id: "planks", count: 6, data: 1}, 0.5, 0.5);
    handler.add({id: "log", data: 2}, {id: "planks", count: 6, data: 2}, 0.5, 0.5);
    handler.add({id: "log", data: 3}, {id: "planks", count: 6, data: 3}, 0.5, 0.5);
    handler.add({id: "log2", data: 0}, {id: "planks", count: 6, data: 4}, 0.5, 0.5);
    handler.add({id: "log2", data: 1}, {id: "planks", count: 6, data: 5}, 0.5, 0.5);

    handler.add(NCID.ore_copper, {id: NCID.dust_copper, count: 2}, 1.25, 1);
    handler.add(NCID.ore_tin, {id: NCID.dust_tin, count: 2}, 1.25, 1);
    handler.add(NCID.ore_lead, {id: NCID.dust_lead, count: 2}, 1.25, 1);
    handler.add(NCID.ore_thorium, {id: NCID.dust_thorium, count: 2}, 1.25, 1);
    handler.add(NCID.ore_uranium, {id: NCID.dust_uranium, count: 2}, 1.25, 1);
    handler.add(NCID.ore_boron, {id: NCID.dust_boron, count: 2}, 1.25, 1);
    handler.add(NCID.ore_lithium, {id: NCID.dust_lithium, count: 2}, 1.25, 1);
    handler.add(NCID.ore_magnesium, {id: NCID.dust_magnesium, count: 2}, 1.25, 1);

    handler.add(NCID.ingot_copper, NCID.dust_copper);
    handler.add(NCID.ingot_tin, NCID.dust_tin);
    handler.add(NCID.ingot_lead, NCID.dust_lead);
    handler.add(NCID.ingot_thorium, NCID.dust_thorium);
    handler.add(NCID.ingot_uranium, NCID.dust_uranium);
    handler.add(NCID.ingot_boron, NCID.dust_boron);
    handler.add(NCID.ingot_lithium, NCID.dust_lithium);
    handler.add(NCID.ingot_magnesium, NCID.dust_magnesium);
    handler.add(NCID.ingot_graphite, NCID.dust_graphite);
    handler.add(NCID.ingot_beryllium, NCID.dust_beryllium);
    handler.add(NCID.ingot_zirconium, NCID.dust_zirconium);
    handler.add(NCID.ingot_manganese, NCID.dust_manganese);
    handler.add(NCID.ingot_aluminum, NCID.dust_aluminum);
    handler.add(NCID.ingot_silver, NCID.dust_silver);
    handler.add(NCID.ingot_manganese_oxide, NCID.dust_manganese_oxide);
    handler.add(NCID.ingot_manganese_dioxide, NCID.dust_manganese_dioxide);

});