const TransferMode = {
    IN: 0,
    OUT: 1,
    NONE: 2
} as const;


class TileBattery extends MachineBase {

    defaultValues = {
        energy: 0,
        mode: 0
    };

    constructor(readonly capacity: number){
        super();
    }

    onInit(): void {
        this.networkData.putInt("mode", this.data.mode);
        super.onInit();
    }

    setMode(mode: number[]): void {
        const code = parseInt(mode.join(""), 3);
        this.data.mode = code;
        this.networkData.putInt("mode", code);
    }

    getMode(): number[] {
        const mode = ("000000" + this.data.mode.toString(3)).slice(-6);
        return [+mode[0], +mode[1], +mode[2], +mode[3], +mode[4], +mode[5]];
    }

    canReceiveEnergy(side: number): boolean {
        return this.getMode()[side] === TransferMode.IN;
    }

    canExtractEnergy(side: number): boolean {
        return this.getMode()[side] === TransferMode.OUT;
    }

    getEnergyStorage(): number {
        return this.capacity;
    }

    getMaxTransfer(): number {
        return this.getEnergyStorage() / 20 | 0;
    }

    energyReceive(type: string, amount: number, voltage: number): number {
        const add = Math.min(amount, this.getEnergyStorage() - this.data.energy, this.getMaxTransfer());
        this.data.energy += add;
        return add;
    }

    energyTick(type: string, src: any): void {
        const out = Math.min(this.data.energy, this.getMaxTransfer());
        this.data.energy += src.add(out) - out;
    }

    @ClientSide
    renderModel(): void {
        TileRenderer.mapAtCoords(this.x, this.y, this.z, Network.serverToLocalId(this.networkData.getInt("blockId")), this.networkData.getInt("mode"));
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, playerUid: number): boolean {
        const client = Network.getClientForPlayer(playerUid);
        if(Entity.getSneaking(playerUid)){
            const mode = this.getMode();
            mode[coords.side]++;
            mode[coords.side] %= 3;
            this.setMode(mode);
            this.renderModel();
            client.send("nc.clientTipMessage", {msg: "RF: " + ["Input", "Output", "None"][mode[coords.side]]});
        }
        else{
            client.send("nc.watchBattery", {x: this.x, y: this.y, z: this.z});
        }
        return true;
    }

}


Network.addClientPacket("nc.watchBattery", (data: {x: number, y: number, z: number}) => {

    if(Threading.getThread("nc_watchBattery")){
        return;
    }

    Threading.initThread("nc_watchBattery", () => {

        let pointed: {pos: BlockPosition, vec: Vector, block: Tile, entity: number};
        let battery: TileBattery;
        let energy = 0;
        let storage = 0;
        let scale = 0;

        while(true){

            pointed = Player.getPointed();

            if(pointed.pos.x != data.x || pointed.pos.y != data.y || pointed.pos.z != data.z){
                break;
            }

            battery = World.getTileEntity(data.x, data.y, data.z) as TileBattery;

            if(!battery){
                break;
            }

            energy = battery.data.energy;
            storage = battery.getEnergyStorage();
            scale = 0;

            while(energy > 10000){
                energy = energy / 1000 | 0;
                storage = storage / 1000 | 0;
                scale++;
            }

            Game.tipMessage(`Energy Stored: ${energy} / ${storage} ${["", "k", "M", "G"][scale]}RF`);

            java.lang.Thread.sleep(500);

        }

        Game.tipMessage("");

    });

});