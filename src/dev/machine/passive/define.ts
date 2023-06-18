Item.addCreativeGroup("nc_passive", "Item/Fluid Generator", [

    NCItem.createBlock("passive_cobblestone", "Cobblestone Generator"),
    NCItem.createBlock("passive_cobblestone_compact", "Compact Cobblestone Generator"),
    NCItem.createBlock("passive_cobblestone_dense", "Dense Cobblestone Generator"),

    NCItem.createBlock("passive_water", "Infinite Water Source"),
    NCItem.createBlock("passive_water_compact", "Compact Infinite Water Source"),
    NCItem.createBlock("passive_water_dense", "Dense Infinite Water Source"),

    NCItem.createBlock("passive_helium", "Helium Collector"),
    NCItem.createBlock("passive_helium_compact", "Compact Helium Collector"),
    NCItem.createBlock("passive_helium_dense", "Dense Helium Collector"),

    NCItem.createBlock("passive_nitrogen", "Nitrogen Collector"),
    NCItem.createBlock("passive_nitrogen_compact", "Compact Nitrogen Collector"),
    NCItem.createBlock("passive_nitrogen_dense", "Dense Nitrogen Collector")

]);


Block.setDestroyTime(NCID.passive_cobblestone, 3);
Block.setDestroyTime(NCID.passive_cobblestone_compact, 3);
Block.setDestroyTime(NCID.passive_cobblestone_dense, 3);
Block.setDestroyTime(NCID.passive_water, 3);
Block.setDestroyTime(NCID.passive_water_compact, 3);
Block.setDestroyTime(NCID.passive_water_dense, 3);
Block.setDestroyTime(NCID.passive_helium, 3);
Block.setDestroyTime(NCID.passive_helium_compact, 3);
Block.setDestroyTime(NCID.passive_helium_dense, 3);
Block.setDestroyTime(NCID.passive_nitrogen, 3);
Block.setDestroyTime(NCID.passive_nitrogen_compact, 3);
Block.setDestroyTime(NCID.passive_nitrogen_dense, 3);

ToolAPI.registerBlockMaterial(NCID.passive_cobblestone, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_cobblestone_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_cobblestone_dense, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_water, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_water_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_water_dense, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_helium, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_helium_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_helium_dense, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_nitrogen, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_nitrogen_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_nitrogen_dense, "stone");


TileEntity.registerPrototype(NCID.passive_cobblestone, new TileItemGenerator(VanillaBlockID.cobblestone, 2));
TileEntity.registerPrototype(NCID.passive_cobblestone_compact, new TileItemGenerator(VanillaBlockID.cobblestone, 16));
TileEntity.registerPrototype(NCID.passive_cobblestone_dense, new TileItemGenerator(VanillaBlockID.cobblestone, 128));
TileEntity.registerPrototype(NCID.passive_water, new TileFluidGenerator("water", 200));
TileEntity.registerPrototype(NCID.passive_water_compact, new TileFluidGenerator("water", 1600));
TileEntity.registerPrototype(NCID.passive_water_dense, new TileFluidGenerator("water", 12800));
TileEntity.registerPrototype(NCID.passive_helium, new TileFluidGenerator("helium", 100));
TileEntity.registerPrototype(NCID.passive_helium_compact, new TileFluidGenerator("helium", 800));
TileEntity.registerPrototype(NCID.passive_helium_dense, new TileFluidGenerator("helium", 6400));
TileEntity.registerPrototype(NCID.passive_nitrogen, new TileFluidGenerator("nitrogen", 50));
TileEntity.registerPrototype(NCID.passive_nitrogen_compact, new TileFluidGenerator("nitrogen", 400));
TileEntity.registerPrototype(NCID.passive_nitrogen_dense, new TileFluidGenerator("nitrogen", 3200));


Callback.addCallback("PreLoaded", () => {

    const bucketFunc: Recipes.CraftingFunction = (api, field, slot) => {
        let liquid = "";
        let empty: {id: number, data: number, liquid: string};
        for(let i = 0; i < field.length; i++){
            liquid = LiquidRegistry.getItemLiquid(field[i].id, field[i].data);
            if(liquid === "water" || liquid === "lava"){
                empty = LiquidRegistry.getEmptyItem(field[i].id, field[i].data);
                field[i].id = empty.id;
                field[i].data = empty.data;
            }
            else{
                api.decreaseFieldSlot(i);
            }
        }
    }

    Recipes2.addShaped(NCID.passive_cobblestone, "aba:c_d:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_tin,
        c: "water_bucket",
        d: "lava_bucket"
    }, bucketFunc);

    Recipes2.addShaped(NCID.passive_cobblestone_compact, "aaa:aba:aaa", {
        a: NCID.passive_cobblestone,
        b: NCID.alloy_bronze
    });

    Recipes2.addShaped(NCID.passive_cobblestone_dense, "aaa:aba:aaa", {
        a: NCID.passive_cobblestone_compact,
        b: "gold_ingot"
    });

    Recipes2.addShaped(NCID.passive_water, "aba:c_c:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_tin,
        c: "water_bucket"
    }, bucketFunc);

    Recipes2.addShaped(NCID.passive_water_compact, "aaa:aba:aaa", {
        a: NCID.passive_water,
        b: NCID.alloy_bronze
    });

    Recipes2.addShaped(NCID.passive_water_dense, "aaa:aba:aaa", {
        a: NCID.passive_water_compact,
        b: "gold_ingot"
    });

    Recipes2.addShaped(NCID.passive_helium, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_zirconium,
        c: NCID.block_thorium230
    });

    Recipes2.addShaped(NCID.passive_helium_compact, "aaa:aba:aaa", {
        a: NCID.passive_helium,
        b: NCID.alloy_bronze
    });

    Recipes2.addShaped(NCID.passive_helium_dense, "aaa:aba:aaa", {
        a: NCID.passive_helium_compact,
        b: "gold_ingot"
    });

    Recipes2.addShaped(NCID.passive_nitrogen, "aba:c_c:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_beryllium,
        c: "bucket"
    });

    Recipes2.addShaped(NCID.passive_nitrogen_compact, "aaa:aba:aaa", {
        a: NCID.passive_nitrogen,
        b: NCID.alloy_bronze
    });

    Recipes2.addShaped(NCID.passive_nitrogen_dense, "aaa:aba:aaa", {
        a: NCID.passive_nitrogen_compact,
        b: "gold_ingot"
    });

});