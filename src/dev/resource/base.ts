Item.addCreativeGroup("blockMetal", Translation.translate("Metal Blocks"), [
    NCItem.createBlock("block_copper", "Copper Block", "blockCopper"),
    NCItem.createBlock("block_tin", "Tin Block", "blockTin"),
    NCItem.createBlock("block_lead", "Lead Block", "blockLead"),
    NCItem.createBlock("block_thorium", "Thorium Block", "blockThorium"),
    NCItem.createBlock("block_uranium", "Uranium Block", "blockUranium"),
    NCItem.createBlock("block_boron", "Boron Block"),
    NCItem.createBlock("block_lithium", "Lithium Block", "blockLithium"),
    NCItem.createBlock("block_magnesium", "Magnesium Block", "blockMagnesium"),
    NCItem.createBlock("block_graphite", "Graphite Block"),
    NCItem.createBlock("block_beryllium", "Beryllium Block", "blockBeryllium"),
    NCItem.createBlock("block_zirconium", "Zirconium Block"),
    NCItem.createBlock("block_manganese", "Manganese Block", "blockManganese"),
    NCItem.createBlock("block_aluminum", "Aluminum Block", "blockAluminum"),
    NCItem.createBlock("block_silver", "Silver Block", "blockSilver"),
    NCItem.createBlock("block_thorium230", "Thorium-230 Block"),
    NCItem.createBlock("block_uranium238", "Uranium-238 Block"),
    NCItem.createBlock("block_neptunium237", "Neptunium-237 Block"),
    NCItem.createBlock("block_plutonium242", "Plutonium-242 Block"),
    NCItem.createBlock("block_americium243", "Americium-243 Block"),
    NCItem.createBlock("block_curium246", "Curium-246 Block"),
    NCItem.createBlock("block_berkelium247", "Berkelium-247 Block"),
    NCItem.createBlock("block_californium252", "Californium-252 Block")
]);

Item.addCreativeGroup("ingot", Translation.translate("Ingots"), [
    NCItem.createItem("ingot_copper", "Copper Ingot", "ingotCopper"),
    NCItem.createItem("ingot_tin", "Tin Ingot", "ingotTin"),
    NCItem.createItem("ingot_lead", "Lead Ingot", "ingotLead"),
    NCItem.createItem("ingot_thorium", "Thorium Ingot"),
    NCItem.createItem("ingot_uranium", "Uranium Ingot", "uranium"),
    NCItem.createItem("ingot_boron", "Boron Ingot"),
    NCItem.createItem("ingot_lithium", "Lithium Ingot", "ingotLithium"),
    NCItem.createItem("ingot_magnesium", "Magnesium Ingot", "ingotMagnesium"),
    NCItem.createItem("ingot_graphite", "Graphite Ingot"),
    NCItem.createItem("ingot_beryllium", "Beryllium Ingot", "ingotBeryllium"),
    NCItem.createItem("ingot_zirconium", "Zirconium Ingot"),
    NCItem.createItem("ingot_manganese", "Manganese Ingot", "ingotManganese"),
    NCItem.createItem("ingot_aluminum", "Aluminum Ingot", "ingotAluminum"),
    NCItem.createItem("ingot_silver", "Silver Ingot", "ingotSilver"),
    NCItem.createItem("ingot_manganese_oxide", "Manganese Oxide Ingot"),
    NCItem.createItem("ingot_manganese_dioxide", "Manganese Dioxide Ingot"),
    NCItem.createItem("alloy_bronze", "Bronze Ingot", "ingotBronze"),
    NCItem.createItem("alloy_tough", "Tough Alloy"),
    NCItem.createItem("alloy_hard_carbon", "Hard Carbon Alloy"),
    NCItem.createItem("alloy_MgB2", "Magnesium Diboride Alloy"),
    NCItem.createItem("alloy_LiMnO2", "Lithium Manganese Dioxide Alloy"),
    NCItem.createItem("alloy_steel", "Steel Ingot", "ingotSteel"),
    NCItem.createItem("alloy_ferroboron", "Ferroboron Alloy"),
    NCItem.createItem("alloy_shibuichi", "Shibuichi Alloy"),
    NCItem.createItem("alloy_tin_silver", "Tin Silver Alloy"),
    NCItem.createItem("alloy_lead_platinum", "Lead Platinum Alloy"),
    NCItem.createItem("alloy_extreme", "Extreme Alloy"),
    NCItem.createItem("alloy_thermal", "Thermoconducting Alloy"),
    NCItem.createItem("alloy_zircaloy", "Zircaloy"),
    NCItem.createItem("alloy_SiC", "Silicon Carbide Alloy"),
    NCItem.createItem("alloy_sic_sic_cmc", "SiC-SiC Ceramic Matrix Composite"),
    NCItem.createItem("alloy_hsla_steel", "HSLA Steel Alloy"),
    NCItem.createItem("alloy_enderium", "Enderium Ingot", "ingotEnderium")
]);

class ItemDustWithTiny extends NCItem.ItemInstance {

    onNameOverride(item: ItemInstance, translation: string, name: string): string {
        return item.data ? "Tiny Pile of " + name : name;
    }

    onIconOverride(item: ItemInstance, isModUi: boolean): Item.TextureData {
        return {name: this.icon.name, meta: item.data ? 1 : 0};
    }

}

Item.addCreativeGroup("dust", Translation.translate("Dusts"), [
    NCItem.createItem("dust_copper", "Copper Dust", "dustCopper"),
    NCItem.createItem("dust_tin", "Tin Dust", "dustTin"),
    ItemRegistry.registerItem(new ItemDustWithTiny("dust_lead", "Lead Dust", "dustLead")).id,
    NCItem.createItem("dust_thorium", "Thorium Dust"),
    NCItem.createItem("dust_uranium", "Uranium Dust"),
    NCItem.createItem("dust_boron", "Boron Dust"),
    NCItem.createItem("dust_lithium", "Lithium Dust", "dustLithium"),
    NCItem.createItem("dust_magnesium", "Magnesium Dust", "dustMagnesium"),
    NCItem.createItem("dust_graphite", "Graphite Dust"),
    NCItem.createItem("dust_beryllium", "Beryllium Dust", "dustBeryllium"),
    NCItem.createItem("dust_zirconium", "Zirconium Dust"),
    NCItem.createItem("dust_manganese", "Manganese Dust", "dustManganese"),
    NCItem.createItem("dust_aluminum", "Aluminum Dust", "dustAluminum"),
    NCItem.createItem("dust_silver", "Silver Dust", "dustSilver"),
    NCItem.createItem("dust_manganese_oxide", "Manganese Oxide Dust"),
    NCItem.createItem("dust_manganese_dioxide", "Manganese Dioxide Dust"),
    NCItem.createItem("dust_diamond", "Crushed Diamond", "dustDiamond"),
    NCItem.createItem("dust_rhodochrosite", "Crushed Rhodochrosite"),
    NCItem.createItem("dust_quartz", "Crushed Quartz", "dustQuartz"),
    NCItem.createItem("dust_obsidian", "Crushed Obsidian", "dustObsidian"),
    NCItem.createItem("dust_boron_nitride", "Hexagonal Boron Nitride"),
    NCItem.createItem("dust_fluorite", "Crushed Fluorite"),
    NCItem.createItem("dust_sulfur", "Sulfur", "dustSulfur"),
    NCItem.createItem("dust_coal", "Crushed Coal", "dustCoal"),
    NCItem.createItem("dust_villiaumite", "Crushed Villiaumite"),
    NCItem.createItem("dust_carobbiite", "Crushed Carobbiite"),
    NCItem.createItem("dust_arsenic", "Crushed Arsenic"),
    NCItem.createItem("dust_endstone", "Crushed End Stone", "dustEndstone")
]);

Recipes2.addShapeless({id: NCID.dust_lead, data: 0}, [{id: NCID.dust_lead, count: 9, data: 1}]);

Item.addCreativeGroup("gem", "Gem", [
    NCItem.createItem("gem_rhodochrosite", "Rhodochrosite"),
    NCItem.createItem("gem_boron_nitride", "Cubic Boron Nitride"),
    NCItem.createItem("gem_fluorite", "Fluorite"),
    NCItem.createItem("gem_villiaumite", "Villiaumite"),
    NCItem.createItem("gem_carobbiite", "Carobbiite"),
    NCItem.createItem("gem_boron_arsenide", "Boron Arsenide"),
    NCItem.createItem("gem_silicon", "Silicon")
]);

Item.addCreativeGroup("nc_comp", "Compound", [
    NCItem.createItem("comp_CaSO4", "Calcium Sulfate"),
    NCItem.createItem("comp_crystal_binder", "Crystal Binder"),
    NCItem.createItem("comp_energetic", "Energetic Blend"),
    NCItem.createItem("comp_NaF", "Sodium Fluoride"),
    NCItem.createItem("comp_KF", "Potassium Fluoride"),
    NCItem.createItem("comp_NaOH", "Sodium Hydroxide"),
    NCItem.createItem("comp_KOH", "Potassium Hydroxide"),
    NCItem.createItem("comp_borax", "Borax"),
    NCItem.createItem("comp_dimensional", "Dimensional Blend"),
    NCItem.createItem("comp_CMn", "Carbon-Manganese Blend"),
    NCItem.createItem("comp_alugentum", "Alugentum Dust")
]);

NCItem.createItem("plate_basic", "Basic Plating");
NCItem.createItem("plate_adv", "Advanced Plating");
NCItem.createItem("plate_du", "DU Plating");
NCItem.createItem("plate_elite", "Elite Plating");
NCItem.createItem("wire_copper", "Copper Solenoid");
NCItem.createItem("wire_MnO2", "Magnesium Diboride Solenoid");
NCItem.createItem("bioplastic", "Bioplastic");
NCItem.createItem("servo", "Servomechanism");
NCItem.createItem("motor", "Electric Motor");
NCItem.createItem("actuator", "Linear Actuator");
NCItem.createItem("battery", "Lithium Ion Cell");

NCItem.createBlock("chassis", "Machine Chassis");
NCItem.createBlock("empty_frame", "Empty Frame");
NCItem.createBlock("steel_frame", "Steel Frame");


const setChassisModel = (id: number, texture: string): void => {
    const render = new ICRender.Model();
    const model = BlockRenderer.createModel();
    model.addBox( 0/16,  0/16,  0/16, 16/16,  3/16,  3/16, texture, 0);
    model.addBox( 0/16,  0/16, 13/16, 16/16,  3/16, 16/16, texture, 0);
    model.addBox( 0/16,  0/16,  0/16,  3/16,  3/16, 16/16, texture, 0);
    model.addBox(13/16,  0/16,  0/16, 16/16,  3/16, 16/16, texture, 0);
    model.addBox( 0/16, 13/16,  0/16, 16/16, 16/16,  3/16, texture, 0);
    model.addBox( 0/16, 13/16, 13/16, 16/16, 16/16, 16/16, texture, 0);
    model.addBox( 0/16, 13/16,  0/16,  3/16, 16/16, 16/16, texture, 0);
    model.addBox(13/16, 13/16,  0/16, 16/16, 16/16, 16/16, texture, 0);
    model.addBox( 0/16,  0/16,  0/16,  3/16, 16/16,  3/16, texture, 0);
    model.addBox(13/16,  0/16,  0/16, 16/16, 16/16,  3/16, texture, 0);
    model.addBox( 0/16,  0/16, 13/16,  3/16, 16/16, 16/16, texture, 0);
    model.addBox(13/16,  0/16, 13/16, 16/16, 16/16, 16/16, texture, 0);
    model.addBox( 2/16,  2/16,  2/16, 14/16, 14/16, 14/16, texture, 1);
    render.addEntry(model);
    BlockRenderer.setStaticICRender(id, -1, render);
    ItemModel.getFor(id, -1).setModel(render);
}

setChassisModel(NCID.chassis, "nc_chassis");
setChassisModel(NCID.steel_frame, "nc_steel_frame");


Callback.addCallback("PreLoaded", () => {

    const addIngotBlockRecipes = (ingot: number, block: number): void => {
        Recipes2.addShapeless(block, [{id: ingot, count: 9}]);
        Recipes2.addShapeless({id: ingot, count: 9, data: 0}, [block]);
    }

    addIngotBlockRecipes(NCID.ingot_copper, NCID.block_copper);
    addIngotBlockRecipes(NCID.ingot_tin, NCID.block_tin);
    addIngotBlockRecipes(NCID.ingot_lead, NCID.block_lead);
    addIngotBlockRecipes(NCID.ingot_thorium, NCID.block_thorium);
    addIngotBlockRecipes(NCID.ingot_uranium, NCID.block_uranium);
    addIngotBlockRecipes(NCID.ingot_boron, NCID.block_boron);
    addIngotBlockRecipes(NCID.ingot_lithium, NCID.block_lithium);
    addIngotBlockRecipes(NCID.ingot_magnesium, NCID.block_magnesium);
    addIngotBlockRecipes(NCID.ingot_graphite, NCID.block_graphite);
    addIngotBlockRecipes(NCID.ingot_beryllium, NCID.block_beryllium);
    addIngotBlockRecipes(NCID.ingot_zirconium, NCID.block_zirconium);
    addIngotBlockRecipes(NCID.ingot_manganese, NCID.block_manganese);
    addIngotBlockRecipes(NCID.ingot_aluminum, NCID.block_aluminum);
    addIngotBlockRecipes(NCID.ingot_silver, NCID.block_silver);
    addIngotBlockRecipes(NCID.T230, NCID.block_thorium230);
    addIngotBlockRecipes(NCID.U238, NCID.block_uranium238);
    addIngotBlockRecipes(NCID.N237, NCID.block_neptunium237);
    addIngotBlockRecipes(NCID.P242, NCID.block_plutonium242);
    addIngotBlockRecipes(NCID.A243, NCID.block_americium243);
    addIngotBlockRecipes(NCID.Cm246, NCID.block_curium246);
    addIngotBlockRecipes(NCID.B247, NCID.block_berkelium247);
    addIngotBlockRecipes(NCID.Cf252, NCID.block_californium252);

    Recipes2.addFurnace(NCID.ore_copper, NCID.ingot_copper);
    Recipes2.addFurnace(NCID.ore_tin, NCID.ingot_tin);
    Recipes2.addFurnace(NCID.ore_lead, NCID.ingot_lead);
    Recipes2.addFurnace(NCID.ore_thorium, NCID.ingot_thorium);
    Recipes2.addFurnace(NCID.ore_uranium, NCID.ingot_uranium);
    Recipes2.addFurnace(NCID.ore_boron, NCID.ingot_boron);
    Recipes2.addFurnace(NCID.ore_lithium, NCID.ingot_lithium);
    Recipes2.addFurnace(NCID.ore_magnesium, NCID.ingot_magnesium);

    Recipes2.addFurnace(NCID.dust_copper, NCID.ingot_copper);
    Recipes2.addFurnace(NCID.dust_tin, NCID.ingot_tin);
    Recipes2.addFurnace({id: NCID.dust_lead, data: 0}, NCID.ingot_lead);
    Recipes2.addFurnace(NCID.dust_thorium, NCID.ingot_thorium);
    Recipes2.addFurnace(NCID.dust_uranium, NCID.ingot_uranium);
    Recipes2.addFurnace(NCID.dust_boron, NCID.ingot_boron);
    Recipes2.addFurnace(NCID.dust_lithium, NCID.ingot_lithium);
    Recipes2.addFurnace(NCID.dust_magnesium, NCID.ingot_magnesium);
    Recipes2.addFurnace(NCID.dust_graphite, NCID.ingot_graphite);
    Recipes2.addFurnace(NCID.dust_beryllium, NCID.ingot_beryllium);
    Recipes2.addFurnace(NCID.dust_zirconium, NCID.ingot_zirconium);
    Recipes2.addFurnace(NCID.dust_manganese, NCID.ingot_manganese);
    Recipes2.addFurnace(NCID.dust_aluminum, NCID.ingot_aluminum);
    Recipes2.addFurnace(NCID.dust_silver, NCID.ingot_silver);
    Recipes2.addFurnace(NCID.dust_manganese_oxide, NCID.ingot_manganese_oxide);
    Recipes2.addFurnace(NCID.dust_manganese_dioxide, NCID.ingot_manganese_dioxide);

    Recipes2.addShapeless({id: NCID.comp_crystal_binder, count: 2}, [
        NCID.dust_rhodochrosite,
        NCID.comp_CaSO4,
        NCID.dust_obsidian,
        NCID.dust_magnesium
    ]);

    Recipes2.addShapeless({id: NCID.comp_energetic, count: 2}, [
        "redstone",
        "glowstone_dust"
    ]);

    Recipes2.addShapeless({id: NCID.comp_dimensional, count: 2}, [
        {id: NCID.dust_obsidian, count: 4},
        NCID.dust_endstone
    ]);

    Recipes2.addShapeless({id: NCID.comp_CMn, count: 2}, [
        NCID.dust_graphite,
        NCID.dust_manganese
    ]);

    Recipes2.addShaped({id: NCID.plate_basic, count: 2}, "ab:ba", {
        a: NCID.ingot_lead,
        b: NCID.dust_graphite
    });

    Recipes2.addShaped(NCID.plate_adv, "aba:bcb:aba", {
        a: "redstone",
        b: NCID.alloy_tough,
        c: NCID.plate_basic
    });

    Recipes2.addShaped(NCID.plate_du, "aba:bcb:aba", {
        a: NCID.dust_sulfur,
        b: NCID.U238,
        c: NCID.plate_adv
    });

    Recipes2.addShaped(NCID.plate_elite, "aba:bcb:aba", {
        a: NCID.comp_crystal_binder,
        b: NCID.ingot_boron,
        c: NCID.plate_du
    });

    Recipes2.addShaped({id: NCID.wire_copper, count: 2}, "aa:bb:aa", {
        a: NCID.ingot_copper,
        b: "iron_ingot"
    });

    Recipes2.addShaped({id: NCID.wire_MnO2, count: 2}, "aa:bb:aa", {
        a: NCID.alloy_MgB2,
        b: NCID.alloy_tough
    });

    Recipes2.addShaped(NCID.servo, "a_a:bcb:cdc", {
        a: NCID.alloy_ferroboron,
        b: "redstone",
        c: NCID.alloy_steel,
        d: NCID.ingot_copper
    });

    Recipes2.addShaped(NCID.motor, "aab:ccd:aab", {
        a: NCID.alloy_steel,
        b: "gold_nugget",
        c: NCID.wire_copper,
        d: "iron_ingot"
    });

    Recipes2.addShaped(NCID.actuator, "__a:bc_:db_", {
        a: NCID.alloy_steel,
        b: NCID.alloy_ferroboron,
        c: "piston",
        d: NCID.ingot_copper
    });

    Recipes2.addShaped(NCID.battery, "aaa:bcb:ddd", {
        a: NCID.alloy_hard_carbon,
        b: NCID.alloy_ferroboron,
        c: NCID.ingot_lithium,
        d: NCID.alloy_LiMnO2
    });

    Recipes2.addShaped(NCID.chassis, "aba:bcb:aba", {
        a: NCID.ingot_lead,
        b: NCID.alloy_steel,
        c: NCID.alloy_tough
    });

    Recipes2.addShaped(NCID.empty_frame, "aba:c_c:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_tin,
        c: "iron_ingot"
    });

    Recipes2.addShaped(NCID.steel_frame, "aba:bcb:aba", {
        a: NCID.alloy_steel,
        b: NCID.alloy_tough,
        c: NCID.alloy_bronze
    });

});