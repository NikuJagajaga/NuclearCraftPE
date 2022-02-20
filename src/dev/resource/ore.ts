Item.addCreativeGroup("ores", Translation.translate("Ores"), [
    NCItem.createBlock("ore_copper", "Copper Ore", "oreCopper"),
    NCItem.createBlock("ore_tin", "Tin Ore", "oreTin"),
    NCItem.createBlock("ore_lead", "Lead Ore", "oreLead"),
    NCItem.createBlock("ore_thorium", "Thorium Ore", "oreThorium"),
    NCItem.createBlock("ore_uranium", "Uranium Ore", "oreUranium"),
    NCItem.createBlock("ore_boron", "Boron Ore", "oreBoron"),
    NCItem.createBlock("ore_lithium", "Lithium Ore", "oreLithium"),
    NCItem.createBlock("ore_magnesium", "Magnesium Ore", "oreMagnesium")
]);

ToolAPI.registerBlockMaterial(NCID.ore_copper, "stone", 2, true);
ToolAPI.registerBlockMaterial(NCID.ore_tin, "stone", 2, true);
ToolAPI.registerBlockMaterial(NCID.ore_lead, "stone", 2, true);
ToolAPI.registerBlockMaterial(NCID.ore_thorium, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_uranium, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_boron, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_lithium, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_magnesium, "stone", 3, true);

Block.setDestroyLevel(NCID.ore_copper, 2);
Block.setDestroyLevel(NCID.ore_tin, 2);
Block.setDestroyLevel(NCID.ore_lead, 2);
Block.setDestroyLevel(NCID.ore_thorium, 3);
Block.setDestroyLevel(NCID.ore_uranium, 3);
Block.setDestroyLevel(NCID.ore_boron, 3);
Block.setDestroyLevel(NCID.ore_lithium, 3);
Block.setDestroyLevel(NCID.ore_magnesium, 3);

//ToolLib.addBlockDropOnExplosion(namedID);


const genetateOre = (chunkX: number, chunkZ: number, random: java.util.Random, id: number, prop: NCConfig.OreProperty): void => {
    if(prop.enabled){
        for(let i = 0; i < prop.rate; i++){
            GenerationUtils.generateOre(
                chunkX * 16 + random.nextInt(16),
                random.nextInt(prop.maxY - prop.minY + 1) - prop.minY,
                chunkZ * 16 + random.nextInt(16),
                id, 0, prop.size, false, random.nextInt()
            );
        }
    }
}

Callback.addCallback("GenerateChunk", (chunkX: number, chunkZ: number, random: java.util.Random) => {
    genetateOre(chunkX, chunkZ, random, NCID.ore_copper, NCConfig.ore_copper);
    genetateOre(chunkX, chunkZ, random, NCID.ore_tin, NCConfig.ore_tin);
    genetateOre(chunkX, chunkZ, random, NCID.ore_lead, NCConfig.ore_lead);
    genetateOre(chunkX, chunkZ, random, NCID.ore_thorium, NCConfig.ore_thorium);
    genetateOre(chunkX, chunkZ, random, NCID.ore_uranium, NCConfig.ore_uranium);
    genetateOre(chunkX, chunkZ, random, NCID.ore_boron, NCConfig.ore_boron);
    genetateOre(chunkX, chunkZ, random, NCID.ore_lithium, NCConfig.ore_lithium);
    genetateOre(chunkX, chunkZ, random, NCID.ore_magnesium, NCConfig.ore_magnesium);
});