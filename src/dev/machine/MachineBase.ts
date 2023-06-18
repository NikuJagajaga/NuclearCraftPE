abstract class MachineBase extends TileEntityBase {

    defaultValues = {
        energy: 0
    };

    data: this["defaultValues"];

    onInit(): void {
        this.networkData.putInt("blockId", this.blockID);
        this.networkData.putInt("facing", this.blockSource.getBlockData(this.x, this.y, this.z));
        this.networkData.sendChanges();
        this.setupContainer();
        delete this.liquidStorage;
    }

    setupContainer(): void {}

    addLiquidTank(name: string, limit: number, liquids?: string[]) {
        const tank = new BlockEngine.LiquidTank(this, name, limit, liquids);
        const liquid = this.liquidStorage.getLiquidStored();
        if(liquid){
            const amount = this.liquidStorage.getLiquid(liquid, tank.getLimit() / 1000);
            tank.addLiquid(liquid, Math.round(amount * 1000));
        }
        return tank;
    }

    setActive(isActive: boolean): void {
        if (this.networkData.getBoolean("active") !== isActive) {
            this.networkData.putBoolean("active", isActive);
            this.networkData.sendChanges();
        }
    }

    @ClientSide
    renderModel(): void {
        if(this.networkData.getBoolean("active")){
            TileRenderer.mapAtCoords(this.x, this.y, this.z, Network.serverToLocalId(this.networkData.getInt("blockId")), this.networkData.getInt("facing"));
        }
        else{
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        }
    }

    clientLoad(): void {
        this.renderModel();
        this.networkData.addOnDataChangedListener((data: SyncedNetworkData, isExternal: boolean) => {
            this.renderModel();
        });
    }

    clientUnload(): void {
        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
    }

    setUiScale(name: string, numerator: number, denominator: number): void {
        this.container.setScale(name, denominator ? numerator / denominator : 0);
    }

    getScreenByName(screenName: string, container: ItemContainer): UI.IWindow {
        return null;
    }

    abstract canReceiveEnergy(side: number, type: string): boolean;
    abstract canExtractEnergy(side: number, type: string): boolean;
    abstract getEnergyStorage(): number;

}