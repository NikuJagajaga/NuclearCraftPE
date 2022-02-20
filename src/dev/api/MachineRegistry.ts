class MachineRegistry {

    static registerPrototype(id: number, prototype: TileEntity.TileEntityPrototype): void {
        Block.setDestroyTime(id, 3);
        ToolAPI.registerBlockMaterial(id, "stone");
        TileEntity.registerPrototype(id, prototype);
        EnergyTileRegistry.addEnergyTypeForId(id, RF);
        ICRender.getGroup("rf-wire").add(id, -1);
    }

}