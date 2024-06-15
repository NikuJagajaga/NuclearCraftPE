interface FissionFuelParams {
    name: string;
    time: number;
    power: number;
    heat: number;
}

class FissionFuel {

    private static data: {[id: number]: FissionFuelParams} = {};

    static create(key: string, name: string, time: number, power: number, heat: number): ItemBase {
        const item = ItemRegistry.registerItem(new this.Instance(key, name));
        Item.addCreativeGroup("nc_fission_fuel", "Fission Fuel", [item.id]);
        this.data[item.id] = {name: name, time: time, power: power, heat: heat};
        return item;
    }

    static createWithOxide(key: string, name: string, time: number, power: number, heat: number): void {
        const normal = this.create(key, name, time, power, heat);
        const oxide = this.create(key + "ox", name + " Oxide", time, Math.round(power * 1.4), Math.round(heat * 1.25));
        Recipes.addFurnace(oxide.id, 0, normal.id, 0);
        Recipes.addFurnace(oxide.id, 1, normal.id, 1);
    }

    static createLowAndHigh(key: string, name: string, time: number, power: number, heat: number): void {
        this.createWithOxide("LE" + key, "LE" + name, time, power, heat);
        this.createWithOxide("HE" + key, "HE" + name, time, power * 4, heat * 6);
    }

    static isFuel(id: number): boolean {
        return id in this.data;
    }

    static getParams(id: number): FissionFuelParams {
        return this.data[id];
    }

    static tickToString(tick: number): string {
        const t = tick / 20;
        const m = t / 60 | 0;
        const s = t % 60;
        let timeText = "";
        if(m > 0) timeText += m + "min ";
        if(s > 0) timeText += s + "sec";
        return timeText;
    }

    static getAllListForRV(): RecipePattern[] {
        const list: RecipePattern[] = [];
        for(let id in this.data){
            list.push({
                input: [{id: +id, count: 1, data: 0}],
                output: [{id: +id, count: 1, data: 1}]
            });
        }
        return list;
    }

    static Instance = class extends NCItem.ItemInstance implements ItemBehavior {

        constructor(key: string, name: string){
            super(key, name);
        }

        onNameOverride(item: ItemInstance, translation: string, name: string): string {
            if(item.data === 1){
                return "Deplated " + name;
            }
            const fuelData = FissionFuel.getParams(item.id);
            if(!fuelData){
                return name;
            }
            return name + `\n§bBase process time: ${FissionFuel.tickToString(fuelData.time)}\nBase power: ${fuelData.power} RF/t\nBase heat gen: ${fuelData.heat} H/t`;
        }

        onIconOverride(item: ItemInstance, isModUi: boolean): Item.TextureData {
            return {name: this.icon.name, meta: item.data === 1 ? 1 : 0};
        }

    }

}


FissionFuel.createWithOxide("TBU", "TBU", 144000, 60, 18);
FissionFuel.createLowAndHigh("U233", "U-233", 64000, 144, 60);
FissionFuel.createLowAndHigh("U235", "U-235", 72000, 120, 50);
FissionFuel.createLowAndHigh("N236", "N-236", 102000, 90, 36);
FissionFuel.createLowAndHigh("P239", "P-239", 92000, 105, 40);
FissionFuel.createLowAndHigh("P241", "P-241", 60000, 165, 70);
FissionFuel.create("MOX239", "MOX-239", 84000, 155.4, 57.5);
FissionFuel.create("MOX241", "MOX-241", 56000, 243.6, 97.5);
FissionFuel.createLowAndHigh("A242", "A-242", 54000, 192, 94);
FissionFuel.createLowAndHigh("Cm243", "Cm-243", 52000, 210, 112);
FissionFuel.createLowAndHigh("Cm245", "Cm-245", 68000, 162, 68);
FissionFuel.createLowAndHigh("Cm247", "Cm-247", 78000, 138, 54);
FissionFuel.createLowAndHigh("B248", "B-248", 86000, 135, 52);
FissionFuel.createLowAndHigh("Cf249", "Cf-249", 60000, 216, 116);
FissionFuel.createLowAndHigh("Cf251", "Cf-251", 58000, 225, 120);


Callback.addCallback("PreLoaded", () => {

    const addFuelRecipes = (symbol: string, fertile: number, ...fissiles: number[]): void => {
        for(const fissile of fissiles){
            NCID["LE" + symbol + fissile] || alert("LE" + symbol + fissile);
            NCID["HE" + symbol + fissile] || alert("HE" + symbol + fissile);
            NCID[symbol + fertile] || alert(symbol + fertile);
            NCID[symbol + fissile] || alert(symbol + fissile);
            Recipes2.addShapeless(NCID["LE" + symbol + fissile], [{id: NCID[symbol + fissile], data: 0}, {id: NCID[symbol + fertile], count: 8, data: 0}]);
            Recipes2.addShapeless(NCID["LE" + symbol + fissile + "ox"], [{id: NCID[symbol + fissile + "ox"], data: 0}, {id: NCID[symbol + fertile + "ox"], count: 8, data: 0}]);
            Recipes2.addShapeless(NCID["HE" + symbol + fissile], [{id: NCID[symbol + fissile], count: 4, data: 0}, {id: NCID[symbol + fertile], count: 5, data: 0}]);
            Recipes2.addShapeless(NCID["HE" + symbol + fissile + "ox"], [{id: NCID[symbol + fissile + "ox"], count: 4, data: 0}, {id: NCID[symbol + fertile + "ox"], count: 5, data: 0}]);
        }
    };

    Recipes2.addShapeless(NCID.TBU, [{id: NCID.T232, count: 9, data: 0}]);
    Recipes2.addShapeless(NCID.TBUox, [{id: NCID.T232ox, count: 9, data: 0}]);
    addFuelRecipes("U", 238, 233, 235);
    addFuelRecipes("N", 237, 236);
    addFuelRecipes("P", 242, 239, 241);
    Recipes2.addShapeless(NCID.MOX239, [{id: NCID.P239ox, data: 0}, {id: NCID.U238ox, count: 8, data: 0}]);
    Recipes2.addShapeless(NCID.MOX241, [{id: NCID.P241ox, data: 0}, {id: NCID.U238ox, count: 8, data: 0}]);
    addFuelRecipes("A", 243, 242);
    addFuelRecipes("Cm", 246, 243, 245, 247);
    addFuelRecipes("B", 247, 248);
    addFuelRecipes("Cf", 252, 249, 251);

});
