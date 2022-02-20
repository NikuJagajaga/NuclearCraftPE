interface ReactorStatus extends ReactorPartStatus {
    cells: number;
    cooling: number;
}

class ReactorDesign {

    readonly sizeX: number;
    readonly sizeY: number;
    readonly sizeZ: number;
    private readonly design: ReactorPart[][][];

    constructor(region: WorldRegion, from: Vector, to: Vector){
        this.sizeX = to.x - from.x - 1;
        this.sizeY = to.y - from.y - 1;
        this.sizeZ = to.z - from.z - 1;
        this.design = [];
        let x = 0;
        let y = 0;
        let z = 0;
        let reactorPart: typeof ReactorPart;
        for(x = 0; x < this.sizeX; x++){
            this.design[x] = [];
            for(y = 0; y < this.sizeY; y++){
                this.design[x][y] = [];
                for(z = 0; z < this.sizeZ; z++){
                    reactorPart = ReactorPartRegistry.get(region.getBlockId(from.x + x + 1, from.y + y + 1, from.z + z + 1));
                    this.design[x][y][z] = reactorPart ? new reactorPart(this, x, y, z) : null;
                }
            }
        }
    }

    isCasing(vec: Vector): boolean;
    isCasing(x: number, y: number, z: number): boolean;
    isCasing(x: Vector | number, y?: number, z?: number): boolean {
        if(typeof x !== "number"){
            return this.isCasing(x.x, x.y, x.z);
        }
        return x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY || z < 0 || z >= this.sizeZ;
    }

    getPart(coords: Vector): ReactorPart;
    getPart(x: number, y: number, z: number): ReactorPart;
    getPart(x: Vector | number, y?: number, z?: number): ReactorPart {
        if(typeof x !== "number"){
            return this.getPart(x.x, x.y, x.z);
        }
        if(this.isCasing(x, y, z)){
            return null;
        }
        return this.design[x][y][z] || null;
    }

    getPartType(target: string[], coords: Vector): string;
    getPartType(target: string[], x: number, y: number, z: number): string;
    getPartType(target: string[], x: Vector | number, y?: number, z?: number): string {
        if(typeof x !== "number"){
            return this.getPartType(target, x.x, x.y, x.z);
        }
        if(this.isCasing(x, y, z)){
            return "casing";
        }
        const part = this.getPart(x, y, z);
        if(part && target.includes(part.type) && part.isActive()){
            return part.type;
        }
        return null;
    }

    getStatus(fuelID: number): ReactorStatus {
        const status: ReactorStatus = {cells: 0, power: 0, heat: 0, cooling: 0};
        const fuel = FissionFuel.getParams(fuelID);
        let part: ReactorPart;
        let partStatus: {power: number, heat: number};
        let x = 0;
        let y = 0;
        let z = 0;
        for(x = 0; x < this.sizeX; x++){
        for(y = 0; y < this.sizeY; y++){
        for(z = 0; z < this.sizeZ; z++){
            part = this.getPart(x, y, z);
            if(part){
                partStatus = part.getStatus(fuel);
                status.power += partStatus.power;
                if(partStatus.heat > 0){
                    status.heat += partStatus.heat;
                }
                else{
                    status.cooling -= partStatus.heat;
                }
                part.type === "cell" && status.cells++;
            }
        }
        }
        }
        return status;
    }

}