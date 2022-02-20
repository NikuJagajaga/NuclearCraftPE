class FissionMaterial {

    static create(key: string, name: string): ItemBase {
        const item = ItemRegistry.registerItem(new this.Instance(key, name));
        Recipes2.addShapeless({id: item.id, data: 0}, [{id: item.id, count: 9, data: 1}]);
        Recipes2.addShapeless({id: item.id, count: 9, data: 1}, [{id: item.id, data: 0}]);
        Item.addCreativeGroup("nc_fission_material", "Fission Material", [item.id]);
        return item;
    }

    static createWithOxide(key: string, name: string): void {
        const normal = this.create(key, name);
        const oxide = this.create(key + "ox", name + " Oxide");
        Recipes.addFurnace(oxide.id, 0, normal.id, 0);
        Recipes.addFurnace(oxide.id, 1, normal.id, 1);
    }

    static createWithIsotope(symbol: string, name: string, ...nums: number[]): void {
        for(let i = 0; i < nums.length; i++){
            this.createWithOxide(symbol + nums[i], name + "-" + nums[i]);
        }
    }

    static Instance = class extends NCItem.ItemInstance implements ItemBehavior {

        constructor(key: string, name: string){
            super(key, name);
        }

        onNameOverride(item: ItemInstance, translation: string, name: string): string {
            return item.data === 1 ? "Tiny Clamp of " + name : name;
        }

        onIconOverride(item: ItemInstance, isModUi: boolean): Item.TextureData {
            return {name: this.icon.name, meta: item.data === 1 ? 1 : 0};
        }

    }

}


FissionMaterial.createWithIsotope("T", "Thorium", 230, 232);
FissionMaterial.createWithIsotope("U", "Uranium", 233, 235, 238);
FissionMaterial.createWithIsotope("N", "Neptunium", 236, 237);
FissionMaterial.createWithIsotope("P", "Plutonium", 238, 239, 241, 242);
FissionMaterial.createWithIsotope("A", "Americium", 241, 242, 243);
FissionMaterial.createWithIsotope("Cm", "Curium", 243, 245, 246, 247);
FissionMaterial.createWithIsotope("B", "Berkelium", 247, 248);
FissionMaterial.createWithIsotope("Cf", "Californium", 249, 250, 251, 252);

FissionMaterial.create("boron10", "Boron-10");
FissionMaterial.create("boron11", "Boron-11");
FissionMaterial.create("lithium6", "Lithium-6");
FissionMaterial.create("lithium7", "Lithium-7");