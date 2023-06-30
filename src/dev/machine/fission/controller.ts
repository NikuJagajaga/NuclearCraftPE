NCItem.createBlock("fission_controller", "Fission Controller", [0, 1, 3, 4, 2, 2]);
TileRenderer.setStandardModelWithRotation(NCID.fission_controller, 2, [0, 1, 3, 4, 2, 2].map(meta => ["nc_fission_controller", meta]));
TileRenderer.registerModelWithRotation(NCID.fission_controller, 2, [0, 1, 3, 5, 2, 2].map(meta => ["nc_fission_controller", meta]));
TileRenderer.setRotationFunction(NCID.fission_controller);


namespace NCWindow {
    const font = {color: Color.rgb(255, 170, 0), size: 6};
    const winMaker = new NCWindowMaker("Fission Controller", 176, 97, "nc.frame_dark_bold")
        .addSlot("slotSource", 55, 34, 18, "nc.slot_dark")
        .addSlot("slotResult", 111, 30, 26, "nc.slot_dark_large")
        .addDrawing("", {type: "frame", x: 7, y: 5, width: 8, height: 87, bitmap: "nc.frame_dark"})
        .addDrawing("", {type: "frame", x: 17, y: 5, width: 8, height: 87, bitmap: "nc.frame_dark"})
        .addElements("scaleEnergy", {type: "scale", x: 8, y: 6, bitmap: "nc.fission_energy", direction: WindowMaker.SCALE_UP})
        .addElements("scaleHeat", {type: "scale", x: 18, y: 6, bitmap: "nc.fission_heat", direction: WindowMaker.SCALE_UP})
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_fission_bg", "nc.prog_fission")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage("nc_fission");
            }
        })
        .addElements("textTitle", {type: "text", x: 92, y: 3, font: {...font, align: UI.Font.ALIGN_CENTER}})
        .addElements("textFuel", {type: "text", x: 32, y: 80, multiline: true, font: font})
        .addElements("textStatus", {type: "text", x: 168, y: 80, multiline: true, font: {...font, align: UI.Font.ALIGN_END}});
    export const FissionController = winMaker.makeWindow();
}


class TileFissionController extends GeneratorBase {

    defaultValues = {
        energy: 0,
        heat: 0,
        fuelID: 0,
        progress: 0,
        isEnabled: false
    };

    getScreenByName(): UI.StandardWindow {
        return NCWindow.FissionController;
    }

    onInit(): void {
        super.onInit();
        this.updateStatus();
    }

    setupContainer(): void {
        StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
            if(name === "slotSource") return FissionFuel.isFuel(id) && data === 0;
            return false;
        });
    }

    onRedstoneUpdate(signal: number): void {
        const enabled = signal > 0;
        if(enabled && !this.data.isEnabled){
            this.updateStatus();
        }
        this.data.isEnabled = enabled
    }

    getCasingShape(): {from: Vector, to: Vector} {
        const from: Vector = {x: this.x, y: this.y, z: this.z};
        const to: Vector = {x: this.x, y: this.y, z: this.z};
        const facing = this.networkData.getInt("facing");
        const arrayL: number[] = [];
        const arrayR: number[] = [];
        let lenL = 0;
        let lenR = 0;
        let height = 0;
        let depth = 0;
        switch(facing){
            case EBlockSide.NORTH:
            case EBlockSide.SOUTH:
                while(this.region.getBlockId(this.x, this.y + (++height), this.z) === NCID.reactor_casing){
                    lenL = lenR = 0;
                    while(this.region.getBlockId(this.x - (++lenL), this.y + height, this.z) === NCID.reactor_casing);
                    while(this.region.getBlockId(this.x + (++lenR), this.y + height, this.z) === NCID.reactor_casing);
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                while(this.region.getBlockId(this.x, this.y, this.z + (facing === EBlockSide.NORTH ? (++depth) : (--depth))) === NCID.reactor_casing){
                    lenL = lenR = 0;
                    while(this.region.getBlockId(this.x - (++lenL), this.y, this.z + depth) === NCID.reactor_casing);
                    while(this.region.getBlockId(this.x + (++lenR), this.y, this.z + depth) === NCID.reactor_casing);
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                from.x -= Math.min(...arrayL);
                to.x += Math.min(...arrayR);
                depth < 0 ? from.z += depth : to.z += depth;
                break;
            case EBlockSide.WEST:
            case EBlockSide.EAST:
                while(this.region.getBlockId(this.x, this.y + (++height), this.z) === NCID.reactor_casing){
                    lenL = lenR = 0;
                    while(this.region.getBlockId(this.x, this.y + height, this.z - (++lenL)) === NCID.reactor_casing);
                    while(this.region.getBlockId(this.x, this.y + height, this.z + (++lenR)) === NCID.reactor_casing);
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                while(this.region.getBlockId(this.x + (facing === EBlockSide.WEST ? (++depth) : (--depth)), this.y, this.z) === NCID.reactor_casing){
                    lenL = lenR = 0;
                    while(this.region.getBlockId(this.x + depth, this.y, this.z - (++lenL)) === NCID.reactor_casing);
                    while(this.region.getBlockId(this.x + depth, this.y, this.z + (++lenR)) === NCID.reactor_casing);
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                from.z -=Math.min(...arrayL);
                to.z += Math.min(...arrayR);
                depth < 0 ? from.x += depth : to.x += depth;
                break;
        }
        to.y += height;
        return {from: from, to: to};
    }

    isValidStructure(from: Vector, to: Vector): boolean {
        if(to.x - from.x - 1 < 1 || to.y - from.y - 1 < 1 || to.z - from.z - 1 < 1){
            return false;
        }
        let i = 0;
        let j = 0;
        for(i = from.x; i <= to.x; i++){
        for(j = from.z; j <= to.z; j++){
            if(i === from.x || i === to.x || j === from.z || j === to.z){
                if(this.region.getBlockId(i, from.y, j) === this.blockID && (i !== this.x || j !== this.z)){
                    return false;
                }
            }
            else{
                if(this.region.getBlockId(i, from.y, j) !== NCID.reactor_casing || this.region.getBlockId(i, to.y, j) !== NCID.reactor_casing){
                    return false;
                }
            }
        }
        }
        for(i = from.x + 1; i <= to.x - 1; i++){
        for(j = from.y + 1; j <= to.y - 1; j++){
            if(this.region.getBlockId(i, j, from.z) !== NCID.reactor_casing || this.region.getBlockId(i, j, to.z) !== NCID.reactor_casing){
                return false;
            }
        }
        }
        for(i = from.y + 1; i <= to.y - 1; i++){
        for(j = from.z + 1; j <= to.z - 1; j++){
            if(this.region.getBlockId(from.x, i, j) !== NCID.reactor_casing || this.region.getBlockId(to.x, i, j) !== NCID.reactor_casing){
                return false;
            }
        }
        }
        return true;
    }

    explodeReactor(): void {
        const shape = this.getCasingShape();
        let x: number;
        let y: number;
        let z: number;
        for(x = shape.from.x + 1; x < shape.to.x - 1; x++){
        for(y = shape.from.y + 1; y < shape.to.y - 1; y++){
        for(z = shape.from.z + 1; z < shape.to.z - 1; z++){
            if(Math.random() < 0.2){
                this.region.setBlock(x, y, z, VanillaBlockID.lava, 0);
            }
            else{
                this.region.destroyBlock(x, y, z, false);
            }
        }
        }
        }
        this.region.playSound(this.x, this.y, this.z, "random.explode");
        this.container.dropSlot(this.blockSource, "slotSource", this.x, this.y, this.z);
        this.resetStatus();
        this.data.heat = 0;
        this.data.fuelID = 0;
        this.data.progress = 0;
    }

    getReactorCapacity(): number {
        return this.networkData.getInt("statSizeX") * this.networkData.getInt("statSizeY") * this.networkData.getInt("statSizeZ");
    }

    getEnergyStorage(): number {
        return this.getReactorCapacity() * 64000 | 0;
    }

    getHeatStorage(): number {
        return this.getReactorCapacity() * 25000 | 0;
    }

    resetStatus(): void {
        this.networkData.putInt("statSizeX", 0);
        this.networkData.putInt("statSizeY", 0);
        this.networkData.putInt("statSizeZ", 0);
        this.networkData.putInt("statCells", 0);
        this.networkData.putInt("statPower", 0);
        this.networkData.putInt("statHeat", 0);
        this.networkData.putInt("statCooling", 0);
        this.networkData.sendChanges();
    }

    updateStatus(): void {
        const shape = this.getCasingShape();
        if(this.isValidStructure(shape.from, shape.to)){
            const design = new ReactorDesign(this.region, shape.from, shape.to);
            const status = design.getStatus(this.data.fuelID);
            this.networkData.putInt("statSizeX", shape.to.x - shape.from.x - 1);
            this.networkData.putInt("statSizeY", shape.to.y - shape.from.y - 1);
            this.networkData.putInt("statSizeZ", shape.to.z - shape.from.z - 1);
            this.networkData.putInt("statCells", status.cells);
            this.networkData.putInt("statPower", status.power);
            this.networkData.putInt("statHeat", status.heat);
            this.networkData.putInt("statCooling", status.cooling);
            this.networkData.sendChanges();
            return;
        }
        this.resetStatus();
    }

    onTick(): void {

        StorageInterface.checkHoppers(this);

        if(this.data.fuelID === 0){
            const slotSource = this.container.getSlot("slotSource");
            if(FissionFuel.isFuel(slotSource.id)){
                this.data.fuelID = slotSource.id;
                slotSource.count--;
                slotSource.markDirty();
                slotSource.validate();
            }
            this.data.progress = 0;
        }

        const status: ReactorStatus = {
            cells: this.networkData.getInt("statCells"),
            power: this.networkData.getInt("statPower"),
            heat: this.networkData.getInt("statHeat"),
            cooling: this.networkData.getInt("statCooling")
        };

        let energyStorage = this.getEnergyStorage();
        let heatStorage = this.getHeatStorage();

        const fuelData = FissionFuel.getParams(this.data.fuelID);
        let isActive = false;

        if(fuelData){
            if(this.data.isEnabled){
                if(this.data.progress === 0){
                    this.updateStatus();
                    status.cells = this.networkData.getInt("statCells");
                    status.power = this.networkData.getInt("statPower");
                    status.heat = this.networkData.getInt("statHeat");
                    status.cooling = this.networkData.getInt("statCooling");
                    energyStorage = this.getEnergyStorage();
                    heatStorage = this.getHeatStorage();
                }
                if(status.cells > 0){
                    isActive = true;
                    this.data.energy = Math.min(this.data.energy + status.power, energyStorage);
                    this.data.heat += status.heat;
                    this.data.progress += status.cells;
                    if(this.data.progress >= fuelData.time){
                        const slotResult = this.container.getSlot("slotResult");
                        if(slotResult.id === 0 || slotResult.id === this.data.fuelID && slotResult.data === 1 && slotResult.count < 64){
                            slotResult.id = this.data.fuelID;
                            slotResult.data = 1;
                            slotResult.count++;
                            slotResult.markDirty();
                            this.data.fuelID = 0;
                            this.data.progress = 0;
                        }
                    }
                }
            }
        }
        else{
            this.data.fuelID = 0;
            this.data.progress = 0;
        }

        this.data.heat = Math.max(0, this.data.heat - status.cooling);
        this.data.heat > heatStorage && this.explodeReactor();

        this.setActive(isActive);
        this.setUiScale("scaleEnergy", this.data.energy, energyStorage);
        this.setUiScale("scaleHeat", this.data.heat, heatStorage);
        this.setUiScale("scaleProgress", this.data.progress, fuelData ? fuelData.time : 0);
        this.container.setText("textTitle", [this.networkData.getInt("statSizeX"), this.networkData.getInt("statSizeY"), this.networkData.getInt("statSizeZ")].join("x") + " Fission Reactor");
        this.container.setText("textFuel", (fuelData ? fuelData.name : "No Fuel") + "\nCells: " + status.cells);
        this.container.setText("textStatus", status.power + " RF/t\n" + (status.cooling > 0 ? status.heat + " - " + status.cooling + " = " : "") + (status.heat - status.cooling) + " H/t");
        this.container.sendChanges();

    }

}


MachineRegistry.registerPrototype(NCID.fission_controller, new TileFissionController());

StorageInterface.createInterface(NCID.fission_controller, {
    slots: {
        slotSource: {input: true, isValid: item => FissionFuel.isFuel(item.id) && item.data === 0},
        slotResult: {output: true}
    }
});


Callback.addCallback("PreLoaded", () => {
    Recipes2.addShaped(NCID.fission_controller, "aba:cdc:aba", {
        a: NCID.plate_adv,
        b: NCID.wire_MnO2,
        c: NCID.furnace,
        d: NCID.chassis
    });
});