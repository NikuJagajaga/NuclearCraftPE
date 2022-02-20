const NCID: {[key: string]: number} = {};

class NCItem {

    static readonly PREFIX = "nc_";

    static createBlock(key: string, name: string, globalKey?: string): number;
    static createBlock(key: string, name: string, texture: ([string, number] | number)[], globalKey?: string): number;
    static createBlock(key: string, name: string, val1?: ([string, number] | number)[] | string, val2?: string): number {
        let texture: ([string, number] | number)[];
        let globalKey: string;
        if(val1){
            if(typeof val1 === "string"){
                texture = [0];
                globalKey = val1;
            }
            else{
                texture = val1;
                globalKey = val2;
            }
        }
        else{
            texture = [0];
        }
        const prekey = this.PREFIX + key;
        const id = IDRegistry.genBlockID(globalKey || prekey);
        Block.createBlock(globalKey || prekey, [{
            name: name,
            texture: texture.map(tex => typeof tex === "number" ? [prekey, tex] : tex),
            inCreative: true
        }]);
        NCID[key] = id;
        return id;
    }

    static createBlocks(key: string, defineData: {name: string, texture?: [string, number][], isTech?: boolean}[]): number {
        const prekey = this.PREFIX + key;
        const id = IDRegistry.genBlockID(prekey);
        Block.createBlock(prekey, defineData.map(data => ({
            name: data.name,
            texture: data.texture,
            inCreative: !data.isTech
        })));
        NCID[key] = id;
        return id;
    }

    static createItem(key: string, name: string, globalKey?: string): number {
        const prekey = this.PREFIX + key;
        const id = IDRegistry.genItemID(globalKey || prekey);
        Item.createItem(globalKey || prekey, name, {name: prekey});
        Item.setCategory(id, ItemCategory.ITEMS);
        //ItemRegistry.createItem(globalKey || prekey, {name: name, icon: prekey});
        NCID[key] = id;
        return id;
    }
/*
    static BlockInstance = class extends BlockBase {

        readonly prefix_stringID: string;

        constructor(key: string, globalKey?: string){
            const prekey = NCItem.PREFIX + key;
            super(globalKey || prekey);
            this.prefix_stringID = prekey;
            NCID[key] = this.id;
        }

        addVariation(name: string, texture: ([string, number] | number)[], inCreative?: boolean): void {
            super.addVariation(name, texture.map(tex => typeof tex === "number" ? [this.prefix_stringID, tex] : tex), inCreative);
        }

    }
*/
    static ItemInstance = class extends ItemCommon {
        constructor(key: string, name: string, globalKey?: string){
            const prekey = NCItem.PREFIX + key;
            super(globalKey || prekey, name, prekey);
            NCID[key] = this.id;
        }
    }

}