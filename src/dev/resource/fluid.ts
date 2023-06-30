class ItemFluidCell extends NCItem.ItemInstance {

    constructor(stringID: string, liquid: string) {
        super(stringID, LiquidRegistry.getLiquidName(liquid) + " Cell");
        LiquidItemRegistry.registerItem(liquid, ItemID.nc_cell_empty, this.id, 16000);
    }

    onNameOverride(item: ItemInstance, name: string): string {
        return name + "\n§7" + (16000 - item.data) + " mB";
    }

}


//FluidRegistry.genCellTex("water", LiquidRegistry.getLiquidUIBitmap("water", 16, 16));
//FluidRegistry.genCellTex("lava", LiquidRegistry.getLiquidUIBitmap("lava", 16, 16));
//FluidRegistry.genCellTex("milk", LiquidRegistry.getLiquidUIBitmap("milk", 16, 16));

Item.addCreativeGroup("nc_cell", "NC Cell", [
    NCItem.createItem("cell_empty", "Empty Cell"),
    ItemRegistry.registerItem(new ItemFluidCell("cell_water", "water")).id,
    ItemRegistry.registerItem(new ItemFluidCell("cell_lava", "lava")).id,
    ItemRegistry.registerItem(new ItemFluidCell("cell_milk", "milk")).id
]);


Callback.addCallback("PreLoaded", () => {

    Recipes2.addShaped({id: NCID.cell_empty, count: 2}, "_a_:aba:_a_", {
        a: NCID.bioplastic,
        b: "glass_pane"
    });

});


FluidRegistry.register("oxygen", "Oxygen", "GAS", "#7E8CC8");
FluidRegistry.register("hydrogen", "Hydrogen", "GAS", "#B37AC4");
FluidRegistry.register("deuterium", "Deuterium", "GAS", "#9E6FEF");
FluidRegistry.register("tritium", "Tritium", "GAS", "#5DBBD6");
FluidRegistry.register("helium3", "Helium-3", "GAS", "#CBBB67");
FluidRegistry.register("helium", "Helium", "GAS", "#C57B81");

FluidRegistry.register("molten_boron", "Molten Boron", "MOLTEN", "#7D7D7D");
FluidRegistry.register("molten_boron10", "Molten Boron-10", "MOLTEN", "#7D7D7D");
FluidRegistry.register("molten_boron11", "Molten Boron-11", "MOLTEN", "#7D7D7D");
FluidRegistry.register("molten_lithium", "Molten Lithium", "MOLTEN", "#EFEFEF");
FluidRegistry.register("molten_lithium6", "Molten Lithium-6", "MOLTEN", "#EFEFEF");
FluidRegistry.register("molten_lithium7", "Molten Lithium-7", "MOLTEN", "#EFEFEF");

FluidRegistry.register("molten_steel", "Molten Steel", "MOLTEN", "#7B7B7B");
FluidRegistry.register("molten_ferroboron", "Molten Ferroboron", "MOLTEN", "#4A4A4A");
FluidRegistry.register("molten_tough", "Molten Tough Alloy", "MOLTEN", "#150F21");
FluidRegistry.register("molten_hard_carbon", "Molten Hard Carbon", "MOLTEN", "#195970");

FluidRegistry.register("molten_coal", "Liquefacted Coal", "MOLTEN", "#202020");
FluidRegistry.register("molten_beryllium", "Molten Beryllium", "MOLTEN", "#D4DBC2");
FluidRegistry.register("molten_manganese", "Molten Manganese", "MOLTEN", "#7284CC");
FluidRegistry.register("molten_manganese_dioxide", "Molten Manganese Dioxide", "MOLTEN", "#28211E");
FluidRegistry.register("molten_sulfur", "Molten Sulfur", "MOLTEN", "#DEDE7A");
FluidRegistry.register("molten_arsenic", "Molten Arsenic", "MOLTEN", "#818475");

FluidRegistry.register("liquid_helium", "Liquid Helium");
FluidRegistry.register("liquid_nitrogen", "Liquid Nitrogen", "LIQUID", "#31C23A");

//plasma
//neutron

FluidRegistry.register("ethanol", "Ethanol", "LIQUID", "#655140");
FluidRegistry.register("methanol", "Methanol", "LIQUID", "#71524C");

//radaway
//radaway_slow

FluidRegistry.register("nitrogen", "Nitrogen", "GAS", "#7CC37B");
FluidRegistry.register("fluorine", "Fluorine", "GAS", "#D3C75D");

FluidRegistry.register("carbon_dioxide", "Carbon Dioxide", "GAS", "#5C635A");
FluidRegistry.register("carbon_monoxide", "Carbon Monoxide", "GAS", "#4C5649");
FluidRegistry.register("ethene", "Ethylene", "GAS", "#FFE4A3");

FluidRegistry.register("fluoromethane", "Fluorimethane", "GAS", "#424C05");
FluidRegistry.register("ammonia", "Ammonia", "GAS", "#7AC3A0");
FluidRegistry.register("oxygen_difluoride", "Oxygen Difluoride", "GAS", "#EA1B01");
FluidRegistry.register("diborane", "Diborane", "GAS", "#CC6E8C");
FluidRegistry.register("sulfur_dioxide", "Sulfur Dioxide", "GAS", "#C3BC7A");
FluidRegistry.register("sulfur_trioxide", "Sulfur Trioxide", "GAS", "#D3AE5D");

FluidRegistry.register("hydrofluoric_acid", "Hydrofluoric Acid", "LIQUID", "#004C05");
FluidRegistry.register("boric_acid", "Boric Acid", "LIQUID", "#696939");
FluidRegistry.register("sulfuric_acid", "Sulfuric Acid", "LIQUID", "#454500");

FluidRegistry.register("boron_nitride_solution", "Boron Nitride Solution", "SALT_SOLUTION", "#6F8E5C");
FluidRegistry.register("fluorite_water", "Fluorite Water", "SALT_SOLUTION", "#8AB492");
FluidRegistry.register("calcium_sulfate_solution", "Calcium Sulfate Solution", "SALT_SOLUTION", "#B8B0A6");
FluidRegistry.register("sodium_fluoride_solution", "Sodium Fluoride Solution", "SALT_SOLUTION", "#C2B1A1");
FluidRegistry.register("potassium_fluoride_solution", "Potassium Fluoride Solution", "SALT_SOLUTION", "#C1C99D");
FluidRegistry.register("sodium_hydroxide_solution", "Sodium Hydroxide Solution", "SALT_SOLUTION", "#C2B7BB");
FluidRegistry.register("potassium_hydroxide_solution", "Potassium Hydroxide Solution", "SALT_SOLUTION", "#B8C6B0");
FluidRegistry.register("borax_solution", "Borax Solution", "SALT_SOLUTION", "#EEEEEE");

FluidRegistry.register("molten_LiF", "Molten Lithium Fluoride", "MOLTEN", "#CDCDCB");
FluidRegistry.register("molten_BeF2", "Molten Beryllium Fluoride", "MOLTEN", "#BEC6AA");
FluidRegistry.register("molten_FLiBe", "Molten FLiBe Salt Mixture", "MOLTEN", "#C1C8B0");
FluidRegistry.register("molten_NaOH", "Molten Sodium Hydroxide", "MOLTEN", "#C2B7BB");
FluidRegistry.register("molten_KOH", "Molten Potassium Hydroxide", "MOLTEN", "#B8C6B0");

FluidRegistry.register("molten_sodium", "Molten Sodium", "MOLTEN", "#C1898C");
FluidRegistry.register("molten_potassium", "Molten Potassium", "MOLTEN", "#B8C503");

FluidRegistry.register("coolant_NaK", "Eutectic NaK Alloy", "MOLTEN", "#FFE5BC");
FluidRegistry.register("hotcoolant_NaK", "Hot Eutectic NaK Alloy", "MOLTEN", "#FFD5AC");

FluidRegistry.register("molten_BAs", "Molten Boron Arsenide", "MOLTEN", "#9B9B89");

FluidRegistry.register("SiC_vapor", "Silicon Carbide Vapor", "GAS", "#78746A");

FluidRegistry.register("molten_alugentum", "Molten Alugentum", "MOLTEN", "#B5C9CB");
FluidRegistry.register("molten_alumina", "Molten Alumina", "MOLTEN", "#919880");
FluidRegistry.register("molten_aluminum", "Molten Aluminum", "MOLTEN", "#B5ECD5");
FluidRegistry.register("molten_silver", "Molten Silver", "MOLTEN", "#E2DAF6");

FluidRegistry.register("molten_ender", "Resonant Ender");
