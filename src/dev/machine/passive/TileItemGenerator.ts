class TileItemGenerator extends TileEntityBase {

    readonly passive_item: Tile;
    readonly passive_speed: number;

    constructor(item: number | Tile, countPerSec: number){
        super();
        this.passive_item = typeof item === "number" ? {id: item, data: 0} : item;
        this.passive_speed = countPerSec;
    }

    onInit(): void {
        delete this.liquidStorage;
    }

    onTick(): void {

        if(World.getThreadTime() % 20 === 0){

            let amount = this.passive_speed;
            let storage: Storage;

            for(let side = 0; side < 6 && amount > 0; side++){

                storage = StorageInterface.getNeighbourStorage(this.blockSource, this, side);

                if(storage){
                    amount = storage.addItem({...this.passive_item, count: amount}, side ^ 1);
                }

            }

        }

    }

}