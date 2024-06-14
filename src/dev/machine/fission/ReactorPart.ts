class ReactorPartRegistry {

    private static data: {[id: number]: typeof ReactorPart} = {};

    static register(id: number, reactorPart: typeof ReactorPart): void {
        this.data[id] = reactorPart;
    }

    static get(id: number): typeof ReactorPart {
        return this.data[id];
    }

}


interface ReactorPartStatus {
    power: number;
    heat: number;
}


class ReactorPart {

    readonly type: string = "";
    readonly target: string[] = [];

    constructor(readonly parent: ReactorDesign, readonly x: number, readonly y: number, readonly z: number){
    }

    vector3(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    getNearParts(): [string, string, string, string, string, string] {
        const parts: [string, string, string, string, string, string] = ["", "", "", "", "", ""];
        let partType: string;
        for(let side = 0; side < 6; side++){
            partType = this.parent.getPartType(this.target, this.vector3().add(Vector3.getDirection(side)));
            if(partType){
                parts[side] = partType;
            }
        }
        return parts;
    }

    isActive(): boolean {
        return true;
    }

    getStatus(fuel: FissionFuelParams): ReactorPartStatus {
        return {power: 0, heat: 0};
    }

}


class ReactorCell extends ReactorPart {

    readonly type = "cell";
    readonly target = ["cell", "moderator"];

    findAdjacentCells(): number {
        let cells = 0;
        let coords: Vector3;
        let direction: Vector3;
        let reactorPart: ReactorPart;
        for(let side = 0; side < 6; side++){
            coords = this.vector3();
            direction = Vector3.getDirection(side);
            while(true){
                coords.add(direction);
                reactorPart = this.parent.getPart(coords);
                if(reactorPart){
                    if(reactorPart.type === "moderator"){
                        continue;
                    }
                    if(reactorPart.type === "cell"){
                        cells++;
                    }
                }
                break;
            }
        }
        return cells;
    }

    getStatus(fuel: FissionFuelParams): ReactorPartStatus {
        if(!fuel){
            return {power: 0, heat: 0};
        }
        const cells = this.findAdjacentCells();
        const moderators = this.getNearParts().filter(part => part === "moderator").length;
        let powerMultiplier = cells + 1;
        let heatMultiplier = (cells + 1) * (cells + 2) / 2;
        powerMultiplier += moderators / 6 * (cells + 1);
        heatMultiplier += moderators / 3 * (cells + 1);
        return {power: fuel.power * powerMultiplier, heat: fuel.heat * heatMultiplier};
    }

}


class ReactorModerator extends ReactorPart {

    readonly type = "moderator";
    readonly target = ["cell"];

    isActive(): boolean {
        return this.getNearParts().indexOf("cell") !== -1;
    }

}


namespace ReactorCooler {

    export class Base extends ReactorPart {

        readonly target: string[] = [];
        readonly cooling: number;
        static readonly cooling: number
        static readonly description: string;

        isActive(): boolean {
            const parts = this.getNearParts();
            for(let i = 0; i < this.target.length; i++){
                if(parts.indexOf(this.target[i]) === -1){
                    return false;
                }
            }
            return true;
        }

        getStatus(fuel: FissionFuelParams): ReactorPartStatus {
            return {power: 0, heat: this.isActive() ? -this.cooling : 0};
        }

    }

    export class Water extends Base {
        readonly type = "cooler_water";
        readonly target = ["cell", "moderator"];
        readonly cooling = Water.cooling;
        static readonly cooling = 60;
        static readonly description = "Must be adjacent to at least one Reactor Cell or active moderator block.";
        isActive(): boolean {
            const parts = this.getNearParts();
            return parts.indexOf("cell") !== -1 || parts.indexOf("moderator") !== -1;
        }
    }

    export class Redstone extends Base {
        readonly type = "cooler_redstone";
        readonly target = ["cell"];
        readonly cooling = Redstone.cooling;
        static readonly cooling = 90;
        static readonly description = "Must be adjacent to at least one Reactor Cell.";
    }

    export class Quartz extends Base {
        readonly type = "cooler_quartz";
        readonly target = ["moderator"];
        readonly cooling = Quartz.cooling;
        static readonly cooling = 90;
        static readonly description = "Must be adjacent to at least one active moderator block.";
    }

    export class Gold extends Base {
        readonly type = "cooler_gold";
        readonly target = ["cooler_water", "cooler_redstone"];
        readonly cooling = Gold.cooling;
        static readonly cooling = 120;
        static readonly description = "Must be adjacent to at least one valid Water Cooler and one valid Redstone Cooler.";
    }

    export class Glowstone extends Base {
        readonly type = "cooler_glowstone";
        readonly target = ["moderator"];
        readonly cooling = Glowstone.cooling;
        static readonly cooling = 130;
        static readonly description = "Must be adjacent to at least two active moderator blocks.";
        isActive(): boolean {
            return this.getNearParts().filter(comp => comp === "moderator").length >= 2;
        }
    }

    export class Lapis extends Base {
        readonly type = "cooler_lapis";
        readonly target = ["cell", "casing"];
        readonly cooling = Lapis.cooling;
        static readonly cooling = 120;
        static readonly description = "Must be adjacent to at least one Reactor Cell and one Reactor Casing.";
    }

    export class Diamond extends Base {
        readonly type = "cooler_diamond";
        readonly target = ["cooler_water", "cooler_quartz"];
        readonly cooling = Diamond.cooling;
        static readonly cooling = 150;
        static readonly description = "Must be adjacent to at least one valid Water Cooler and one valid Quartz Cooler.";
    }

    export class Helium extends Base {
        readonly type = "cooler_helium";
        readonly target = ["cooler_redstone", "casing"];
        readonly cooling = Helium.cooling;
        static readonly cooling = 140;
        static readonly description = "Must be adjacent to exactly one valid Redstone Cooler and at least one Reactor Casing.";
        isActive(): boolean {
            const parts = this.getNearParts();
            return parts.filter(comp => comp === "cooler_redstone").length === 1 && parts.indexOf("casing") !== -1;
        }
    }

    export class Enderium extends Base {
        readonly type = "cooler_enderium";
        readonly target = ["casing"];
        readonly cooling = Enderium.cooling;
        static readonly cooling = 120;
        static readonly description = "Must be adjacent to exactly three Reactor Casings at exactly one vertex.";
        isActive(): boolean {
            return this.getNearParts().filter(comp => comp === "casing").length === 3;
        }
    }

    export class Cryotheum extends Base {
        readonly type = "cooler_cryotheum";
        readonly target = ["cell"];
        readonly cooling = Cryotheum.cooling;
        static readonly cooling = 160;
        static readonly description = "Must be adjacent to at least two Reactor Cells.";
        isActive(): boolean {
            return this.getNearParts().filter(comp => comp === "cell").length >= 2;
        }
    }

    export class Iron extends Base {
        readonly type = "cooler_iron";
        readonly target = ["cooler_gold"];
        readonly cooling = Iron.cooling;
        static readonly cooling = 80;
        static readonly description = "Must be adjacent to at least one valid Gold Cooler.";
    }

    export class Emerald extends Base {
        readonly type = "cooler_emerald";
        readonly target = ["moderator", "cell"];
        readonly cooling = Emerald.cooling;
        static readonly cooling = 160;
        static readonly description = "Must be adjacent to at least one active moderator block and one Reactor Cell.";
    }

    export class Copper extends Base {
        readonly type = "cooler_copper";
        readonly target = ["cooler_glowstone"];
        readonly cooling = Copper.cooling;
        static readonly cooling = 80;
        static readonly description = "Must be adjacent to at least one valid Glowstone Cooler.";
    }

    export class Tin extends Base {
        readonly type = "cooler_tin";
        readonly target = ["cooler_lapis"];
        readonly cooling = Tin.cooling;
        static readonly cooling = 120;
        static readonly description = "Must be adjacent to at least two valid Lapis Coolers along a common axis.";
        isActive(): boolean {
            const parts = this.getNearParts();
            return parts[0] === "cooler_lapis" && parts[1] === "cooler_lapis" || parts[2] === "cooler_lapis" && parts[3] === "cooler_lapis" || parts[4] === "cooler_lapis" && parts[5] === "cooler_lapis";
        }
    }

    export class Magnesium extends Base {
        readonly type = "cooler_magnesium";
        readonly target = ["casing", "moderator"];
        readonly cooling = Magnesium.cooling;
        static readonly cooling = 110;
        static readonly description = "Must be adjacent to at least one Reactor Casing and one active moderator block.";
    }

    ReactorPartRegistry.register(NCID.reactor_cell, ReactorCell);
    ReactorPartRegistry.register(NCID.block_graphite, ReactorModerator);
    ReactorPartRegistry.register(NCID.block_beryllium, ReactorModerator);
    ReactorPartRegistry.register(NCID.cooler_water, Water);
    ReactorPartRegistry.register(NCID.cooler_redstone, Redstone);
    ReactorPartRegistry.register(NCID.cooler_quartz, Quartz);
    ReactorPartRegistry.register(NCID.cooler_gold, Gold);
    ReactorPartRegistry.register(NCID.cooler_glowstone, Glowstone);
    ReactorPartRegistry.register(NCID.cooler_lapis, Lapis);
    ReactorPartRegistry.register(NCID.cooler_diamond, Diamond);
    ReactorPartRegistry.register(NCID.cooler_helium, Helium);
    ReactorPartRegistry.register(NCID.cooler_enderium, Enderium);
    ReactorPartRegistry.register(NCID.cooler_cryotheum, Cryotheum);
    ReactorPartRegistry.register(NCID.cooler_iron, Iron);
    ReactorPartRegistry.register(NCID.cooler_emerald, Emerald);
    ReactorPartRegistry.register(NCID.cooler_copper, Copper);
    ReactorPartRegistry.register(NCID.cooler_tin, Tin);
    ReactorPartRegistry.register(NCID.cooler_magnesium, Magnesium);

    const coolerNameOverride = (item: ItemInstance, name: string): string => {
        const coolerData = ReactorPartRegistry.get(item.id) as typeof Base;
        return name + "\n§bCooling rate: " + coolerData.cooling + "H/t\n" + coolerData.description;
    };

    Item.registerNameOverrideFunction(NCID.cooler_water, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_redstone, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_quartz, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_gold, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_glowstone, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_lapis, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_diamond, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_helium, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_enderium, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_cryotheum, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_iron, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_emerald, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_copper, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_tin, coolerNameOverride);
    Item.registerNameOverrideFunction(NCID.cooler_magnesium, coolerNameOverride);

}
