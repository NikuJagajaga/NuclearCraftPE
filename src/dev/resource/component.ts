NCItem.createItem("upg_speed", "Speed Upgrade");
NCItem.createItem("upg_energy", "Energy Upgrade");

NCItem.createBlocks("reactor_casing", [
    {name: "Fission Reactor Casing", texture: [["nc_reactor_casing", 0]]},
    {name: "Transparent Fission Reactor Casing", texture: [["nc_reactor_casing_transparent", 0]]}
]);

ConnectedTexture.setModelForGlass(NCID.reactor_casing, 1, "nc_reactor_casing_transparent");

NCItem.createBlock("reactor_cell", "Reactor Cell");

Item.addCreativeGroup("nc_cooler", "Fission Cooler", [
    NCItem.createBlock("cooler_empty", "Empty Cooler"),
    NCItem.createBlock("cooler_water", "Water Cooler"),
    NCItem.createBlock("cooler_redstone", "Redstone Cooler"),
    NCItem.createBlock("cooler_quartz", "Quartz Cooler"),
    NCItem.createBlock("cooler_gold", "Gold Cooler"),
    NCItem.createBlock("cooler_glowstone", "Glowstone Cooler"),
    NCItem.createBlock("cooler_lapis", "Lapis Cooler"),
    NCItem.createBlock("cooler_diamond", "Diamond Cooler"),
    NCItem.createBlock("cooler_helium", "Helium Cooler"),
    NCItem.createBlock("cooler_enderium", "Enderium Cooler"),
    NCItem.createBlock("cooler_cryotheum", "Cryotheum Cooler"),
    NCItem.createBlock("cooler_iron", "Iron Cooler"),
    NCItem.createBlock("cooler_emerald", "Emerald Cooler"),
    NCItem.createBlock("cooler_copper", "Copper Cooler"),
    NCItem.createBlock("cooler_tin", "Tin Cooler"),
    NCItem.createBlock("cooler_magnesium", "Magnesium Cooler")
]);


Callback.addCallback("PreLoaded", () => {

    Recipes2.addShaped(NCID.upg_speed, "aba:bcb:aba", {
        a: "lapis_lazuli",
        b: "redstone",
        c: "heavy_weighted_pressure_plate"
    });

    Recipes2.addShaped(NCID.upg_energy, "aba:bcb:aba", {
        a: NCID.dust_obsidian,
        b: NCID.dust_quartz,
        c: "light_weighted_pressure_plate"
    });

    Recipes2.addShaped({id: NCID.reactor_casing, count: 4}, "_a_:aba:_a_", {
        a: NCID.plate_basic,
        b: NCID.alloy_tough
    });

    Recipes2.addShapeless(NCID.reactor_casing, [{id: NCID.reactor_casing, data: 1}]);

    Recipes2.addShaped({id: NCID.reactor_casing, data: 1, count: 4}, "aba:bcb:aba", {
        a: "glass",
        b: NCID.plate_basic,
        c: NCID.alloy_tough
    });

    Recipes2.addShapeless({id: NCID.reactor_casing, data: 1}, [
        {id: NCID.reactor_casing, data: 0},
        "glass"
    ]);

    Recipes2.addShaped(NCID.reactor_cell, "aba:b_b:aba", {
        a: NCID.alloy_tough,
        b: "glass"
    });

    Recipes2.addShaped({id: NCID.cooler_empty, count: 2}, "aba:b_b:aba", {
        a: NCID.alloy_tough,
        b: NCID.alloy_steel
    });

    Recipes2.addShaped(NCID.cooler_redstone, "_a_:bcb:_a_", {
        a: "redstone_block",
        b: "redstone",
        c: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_quartz, "aba:bcb:aba", {
        a: NCID.dust_quartz,
        b: "quartz_block",
        c: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_gold, "aaa:aba:aaa", {
        a: "gold_ingot",
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_glowstone, "aba:bcb:aba", {
        a: "glowstone_dust",
        b: "glowstone",
        c: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_lapis, "aba", {
        a: "lapis_block",
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_diamond, "aaa:aba:aaa", {
        a: "diamond",
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_iron, "aaa:aba:aaa", {
        a: "iron_ingot",
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_emerald, "aaa:_b_:aaa", {
        a: "emerald",
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_copper, "aaa:aba:aaa", {
        a: NCID.ingot_copper,
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_tin, "aaa:aba:aaa", {
        a: NCID.ingot_tin,
        b: NCID.cooler_empty
    });

    Recipes2.addShaped(NCID.cooler_magnesium, "aaa:aba:aaa", {
        a: NCID.ingot_magnesium,
        b: NCID.cooler_empty
    });

});