IMPORT("BlockEngine");
IMPORT("EnergyNet");
IMPORT("TileRender");
IMPORT("StorageInterface");
IMPORT("VanillaSlots");
IMPORT("ConnectedTexture");
IMPORT("EnhancedRecipes");

const Color = android.graphics.Color;
const Bitmap = android.graphics.Bitmap;
const Canvas = android.graphics.Canvas;
const Paint = android.graphics.Paint;
const ColorFilter = android.graphics.PorterDuffColorFilter;
const PDMode = android.graphics.PorterDuff.Mode;
const ClientSide = BlockEngine.Decorators.ClientSide;
const NetworkEvent = BlockEngine.Decorators.NetworkEvent;
const ContainerEvent = BlockEngine.Decorators.ContainerEvent;

const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);


const isItemInstance = (a): a is ItemInstance => a !== null && typeof a === "object" && typeof a.id === "number" && typeof a.count === "number" && typeof a.data === "number";
const isLiquidInstance = (a): a is LiquidInstance => a !== null && typeof a === "object" && typeof a.liquid === "string" && typeof a.amount === "number";

const setLoadingTip: (text: string) => void = ModAPI.requireGlobal("MCSystem.setLoadingTip");

Network.addClientPacket("nc.clientTipMessage", function(data: {msg: string}) {
	Game.tipMessage(data.msg);
});

type VanillaID = keyof typeof VanillaBlockID | keyof typeof VanillaItemID;


Array.prototype.includes = function(elem){
    return this.indexOf(elem) !== -1;
};


/*
const LiquidItemRegistry_isEmptyItem = (id: number, data: number): boolean => {
    for(let key in LiquidItemRegistry.FullByEmpty){
        if(key.startsWith(id + ":")){
            return true;
        }
    }
    for(let key in LiquidRegistry.FullByEmpty){
        if(key.startsWith(id + ":" + data + ":") || key.startsWith(id + ":-1:")){
            return true;
        }
    }
    return false;
}
*/