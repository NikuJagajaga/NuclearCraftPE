NCItem.createBlock("decay_generator", "Decay Generator");

/*
    D:decay_lifetime <
        16000.0
        10000.0
        1200.0
        5454.545454545454
        4000.0
        666.6666666666666
        428.57142857142856
        150.0
        12.0
     >
    D:decay_power <
        0.75
        1.2
        1.0
        2.2
        3.0
        18.0
        28.0
        80.0
        1000.0
     >
*/

interface DecayBlockRecipe {
    become: number;
    power: number;
    lifetime: number;
}

class DecayGenerator extends GeneratorBase {

    static readonly Recipe: {[id: number]: DecayBlockRecipe} = {
        [NCID.block_thorium]: {become: NCID.block_lead, power: 80, lifetime: 62.4 * 60},
        [NCID.block_uranium]: {become: NCID.block_uranium238, power: 80, lifetime: 20.4 * 60},
        [NCID.block_thorium230]: {become: NCID.block_lead, power: 15, lifetime: 36.6 * 60},
        [NCID.block_uranium238]: {become: NCID.block_thorium230, power: 5, lifetime: 39.6 * 60},
        [NCID.block_neptunium237]: {become: NCID.block_lead, power: 10, lifetime: 35.5 * 60},
        [NCID.block_plutonium242]: {become: NCID.block_uranium238, power: 15, lifetime: 12.8 * 60},
        [NCID.block_americium243]: {become: NCID.block_lead, power: 20, lifetime: 52.8 * 60},
        [NCID.block_curium246]: {become: NCID.block_plutonium242, power: 25, lifetime: 8.5 * 60},
        [NCID.block_berkelium247]: {become: NCID.block_americium243, power: 30, lifetime: 7.2 * 60},
        [NCID.block_californium252]: {become: NCID.block_lead, power: 40, lifetime: 65.2 * 60},
    };

    constructor(){
        super();
    }

    getEnergyStorage(): number {
        return 1600;
    }

    onInit(): void {}
    clientLoad(): void {}
    clientUnload(): void {}

    onTick(): void {

        if(World.getThreadTime() % 20 === 0){

            let coords: Vector;
            let recipe: DecayBlockRecipe;
            let produce = 0;

            for(let side = 0; side < 6; side++){
                coords = World.getRelativeCoords(this.x, this.y, this.z, side);
                recipe = DecayGenerator.Recipe[this.blockSource.getBlockId(coords.x, coords.y, coords.z)];
                if(recipe){
                    produce += recipe.power;
                    if(recipe.lifetime * Math.random() < 1){
                        this.blockSource.setBlock(coords.x, coords.y, coords.z, recipe.become, 0);
                    }
                }
            }

            this.data.energy = Math.min(this.data.energy + produce, this.getEnergyStorage());

        }

    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, playerUid: number): boolean {
        return true;
    }

}

MachineRegistry.registerPrototype(NCID.decay_generator, new DecayGenerator());


Callback.addCallback("PreLoaded", () => {
    Recipes2.addShaped(NCID.decay_generator, "aba:bcb:aba", {
        a: NCID.ingot_lead,
        b: "cobblestone",
        c: "redstone"
    });
});


/*
const testData: {[key: string]: number} = {};
const testArray: number[] = [];
Block.setRandomTickCallback(NCID.block_lead, (x: number, y: number, z: number, id: number, data: number, region: BlockSource) => {
    const key = x + ":" + y + ":" + z;
    const time = Debug.sysTime() / 1000 | 0;
    if(key in testData){
        testArray.push(time - testData[key]);
        const len = testArray.length;
        if(len === 0){
            return;
        }
        let sum = 0;
        for(let i = 0; i < len; i++){
            sum += testArray[i];
        }
        Game.message("min: " + Math.min(...testArray) + "s max: " + Math.max(...testArray) + "s avg: " + (sum / len | 0) + "s (" + len + ")");
    }
    testData[key] = time;
});
*/