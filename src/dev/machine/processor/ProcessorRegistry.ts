type ParticleKey = keyof typeof EParticleType;

class ProcessorRegistry {

    private static windows: {[id: number]: UI.StandardWindow} = {};
    private static recipes: {[id: number]: ProcessorRecipeHandler} = {};

    static createBlock(key: string, name: string): number {
        const prekey = NCItem.PREFIX + key;
        const prepro = NCItem.PREFIX + "processor"
        const id = NCItem.createBlock(key, name, [[prepro, 0], [prepro, 1], [prepro, 2], [prekey, 0], [prepro, 3], [prepro, 3]]);
        TileRenderer.setStandardModelWithRotation(id, 2, [[prepro, 0], [prepro, 1], [prepro, 2], [prekey, 0], [prepro, 3], [prepro, 3]]);
        TileRenderer.registerModelWithRotation(id, 2, [[prepro, 0], [prepro, 1], [prepro, 2], [prekey, 1], [prepro, 3], [prepro, 3]]);
        TileRenderer.setRotationFunction(id);
        return id;
    }

    static createMachine(key: string, name: string, io: [number, number, number, number], particle1: ParticleKey, particle2: ParticleKey, processTime: number, processPower: number): number {
        const id = this.createBlock(key, name);
        MachineRegistry.registerPrototype(id, new TileProcessor(...io, EParticleType[particle1], EParticleType[particle2], processTime, processPower));
        StorageInterface.createInterface(id, new ProcessorInterface(...io));
        this.registerRecipeHandler(id, new ProcessorRecipeHandler(...io));
        Item.addCreativeGroup("nc_processor", "Processor Machine", [id]);
        return id;
    }

    static registerWindow(id: number, window: UI.StandardWindow): void {
        this.windows[id] = window;
        NCConfig.SlotsLikeVanilla && VanillaSlots.registerForTile(id);
    }

    static registerRecipeHandler(id: number, recipe: ProcessorRecipeHandler): void {
        this.recipes[id] = recipe;
    }

    static getWindow(id: number): UI.StandardWindow {
        return this.windows[id];
    }

    static getRecipeHandler(id: number): ProcessorRecipeHandler {
        return this.recipes[id];
    }

}