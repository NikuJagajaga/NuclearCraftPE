class TileFluidGenerator extends TileEntityBase {

    readonly passive_fluid: string;
    readonly passive_speed: number;

    constructor(fluid: string, mbPerSec: number){
        super();
        this.passive_fluid = fluid;
        this.passive_speed = mbPerSec;
    }

    onInit(): void {
        delete this.liquidStorage;
    }

    onTick(): void {

        if(World.getThreadTime() % 20 === 0){

            let amount = this.passive_speed;
            let storage: Storage;
            let tank: ILiquidStorage;

            for(let side = 0; side < 6 && amount > 0; side++){

                storage = StorageInterface.getNeighbourStorage(this.blockSource, this, side);

                if(storage){
                    tank = storage.getInputTank(side ^ 1);
                    if(tank && storage.canReceiveLiquid(this.passive_fluid, amount) && !tank.isFull(this.passive_fluid)){
                        amount = tank.addLiquid(this.passive_fluid, amount);
                    }
                }

            }

        }

    }

}