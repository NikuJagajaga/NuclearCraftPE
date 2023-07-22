class MachineRegistry {

    static registerPrototype(id: number, prototype: TileEntity.TileEntityPrototype): void {
        Block.setDestroyTime(id, 3);
        ToolAPI.registerBlockMaterial(id, "stone");
        TileEntity.registerPrototype(id, prototype);
        EnergyTileRegistry.addEnergyTypeForId(id, RF);
        ICRender.getGroup("rf-wire").add(id, -1);
    }

    static getGlobalValidatePolicy(machineId: number): GlobalValidatePolicyFunc {
        const descriptor = StorageInterface.getData(machineId) || {};
        if(descriptor.slots){
            return (name, id, amount, data, extra, container, player) => {
                const slotData = descriptor.slots[name];
                if(slotData){
                    if(slotData.input){
                        if(slotData.isValid){
                            return slotData.isValid({id: id, count: amount, data: data, extra: extra}, -1, null);
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            };
        }
        return () => true;
    }

}