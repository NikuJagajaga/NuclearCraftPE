var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
IMPORT("BlockEngine");
IMPORT("EnergyNet");
IMPORT("TileRender");
IMPORT("StorageInterface");
IMPORT("VanillaSlots");
IMPORT("ConnectedTexture");
IMPORT("WindowMaker");
IMPORT("EnhancedRecipes");
var Color = android.graphics.Color;
var Bitmap = android.graphics.Bitmap;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var ColorFilter = android.graphics.PorterDuffColorFilter;
var PDMode = android.graphics.PorterDuff.Mode;
var ClientSide = BlockEngine.Decorators.ClientSide;
var NetworkEvent = BlockEngine.Decorators.NetworkEvent;
var ContainerEvent = BlockEngine.Decorators.ContainerEvent;
var RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
var isItemInstance = function (a) { return a !== null && typeof a === "object" && typeof a.id === "number" && typeof a.count === "number" && typeof a.data === "number"; };
var isLiquidInstance = function (a) { return a !== null && typeof a === "object" && typeof a.liquid === "string" && typeof a.amount === "number"; };
var setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");
var getLiquidByTex = function (texture) {
    for (var key in LiquidRegistry.liquids) {
        if (LiquidRegistry.liquids[key].uiTextures.some(function (tex) {
            return tex === texture;
        })) {
            return key;
        }
    }
    return "";
};
Network.addClientPacket("nc.clientTipMessage", function (data) {
    Game.tipMessage(data.msg);
});
Array.prototype.includes = function (elem) {
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
__config__.checkAndRestore({
    SlotsLikeVanilla: false,
    ore_copper: { enabled: true, rate: 5, size: 6, minY: 0, maxY: 48 },
    ore_tin: { enabled: true, rate: 4, size: 6, minY: 0, maxY: 40 },
    ore_lead: { enabled: true, rate: 6, size: 6, minY: 0, maxY: 36 },
    ore_thorium: { enabled: true, rate: 4, size: 4, minY: 0, maxY: 32 },
    ore_uranium: { enabled: true, rate: 4, size: 4, minY: 0, maxY: 32 },
    ore_boron: { enabled: true, rate: 6, size: 5, minY: 0, maxY: 28 },
    ore_lithium: { enabled: true, rate: 6, size: 5, minY: 0, maxY: 28 },
    ore_magnesium: { enabled: true, rate: 4, size: 5, minY: 0, maxY: 24 }
});
var NCConfig;
(function (NCConfig) {
    NCConfig.SlotsLikeVanilla = __config__.getBool("SlotsLikeVanilla");
    NCConfig.ore_copper = {
        enabled: __config__.getBool("ore_copper.enabled"),
        rate: __config__.getNumber("ore_copper.rate").intValue(),
        size: __config__.getNumber("ore_copper.size").intValue(),
        minY: __config__.getNumber("ore_copper.minY").intValue(),
        maxY: __config__.getNumber("ore_copper.maxY").intValue()
    };
    NCConfig.ore_tin = {
        enabled: __config__.getBool("ore_tin.enabled"),
        rate: __config__.getNumber("ore_tin.rate").intValue(),
        size: __config__.getNumber("ore_tin.size").intValue(),
        minY: __config__.getNumber("ore_tin.minY").intValue(),
        maxY: __config__.getNumber("ore_tin.maxY").intValue()
    };
    NCConfig.ore_lead = {
        enabled: __config__.getBool("ore_lead.enabled"),
        rate: __config__.getNumber("ore_lead.rate").intValue(),
        size: __config__.getNumber("ore_lead.size").intValue(),
        minY: __config__.getNumber("ore_lead.minY").intValue(),
        maxY: __config__.getNumber("ore_lead.maxY").intValue()
    };
    NCConfig.ore_thorium = {
        enabled: __config__.getBool("ore_thorium.enabled"),
        rate: __config__.getNumber("ore_thorium.rate").intValue(),
        size: __config__.getNumber("ore_thorium.size").intValue(),
        minY: __config__.getNumber("ore_thorium.minY").intValue(),
        maxY: __config__.getNumber("ore_thorium.maxY").intValue()
    };
    NCConfig.ore_uranium = {
        enabled: __config__.getBool("ore_uranium.enabled"),
        rate: __config__.getNumber("ore_uranium.rate").intValue(),
        size: __config__.getNumber("ore_uranium.size").intValue(),
        minY: __config__.getNumber("ore_uranium.minY").intValue(),
        maxY: __config__.getNumber("ore_uranium.maxY").intValue()
    };
    NCConfig.ore_boron = {
        enabled: __config__.getBool("ore_boron.enabled"),
        rate: __config__.getNumber("ore_boron.rate").intValue(),
        size: __config__.getNumber("ore_boron.size").intValue(),
        minY: __config__.getNumber("ore_boron.minY").intValue(),
        maxY: __config__.getNumber("ore_boron.maxY").intValue()
    };
    NCConfig.ore_lithium = {
        enabled: __config__.getBool("ore_lithium.enabled"),
        rate: __config__.getNumber("ore_lithium.rate").intValue(),
        size: __config__.getNumber("ore_lithium.size").intValue(),
        minY: __config__.getNumber("ore_lithium.minY").intValue(),
        maxY: __config__.getNumber("ore_lithium.maxY").intValue()
    };
    NCConfig.ore_magnesium = {
        enabled: __config__.getBool("ore_magnesium.enabled"),
        rate: __config__.getNumber("ore_magnesium.rate").intValue(),
        size: __config__.getNumber("ore_magnesium.size").intValue(),
        minY: __config__.getNumber("ore_magnesium.minY").intValue(),
        maxY: __config__.getNumber("ore_magnesium.maxY").intValue()
    };
})(NCConfig || (NCConfig = {}));
;
var NCID = {};
var NCItem = /** @class */ (function () {
    function NCItem() {
    }
    NCItem.createBlock = function (key, name, val1, val2) {
        var texture;
        var globalKey;
        if (val1) {
            if (typeof val1 === "string") {
                texture = [0];
                globalKey = val1;
            }
            else {
                texture = val1;
                globalKey = val2;
            }
        }
        else {
            texture = [0];
        }
        var prekey = this.PREFIX + key;
        var id = IDRegistry.genBlockID(globalKey || prekey);
        Block.createBlock(globalKey || prekey, [{
                name: name,
                texture: texture.map(function (tex) { return typeof tex === "number" ? [prekey, tex] : tex; }),
                inCreative: true
            }]);
        NCID[key] = id;
        return id;
    };
    NCItem.createBlocks = function (key, defineData) {
        var prekey = this.PREFIX + key;
        var id = IDRegistry.genBlockID(prekey);
        Block.createBlock(prekey, defineData.map(function (data) { return ({
            name: data.name,
            texture: data.texture,
            inCreative: !data.isTech
        }); }));
        NCID[key] = id;
        return id;
    };
    NCItem.createItem = function (key, name, globalKey) {
        var prekey = this.PREFIX + key;
        var id = IDRegistry.genItemID(globalKey || prekey);
        Item.createItem(globalKey || prekey, name, { name: prekey });
        Item.setCategory(id, ItemCategory.ITEMS);
        //ItemRegistry.createItem(globalKey || prekey, {name: name, icon: prekey});
        NCID[key] = id;
        return id;
    };
    NCItem.PREFIX = "nc_";
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
    NCItem.ItemInstance = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(key, name, globalKey) {
            var _this = this;
            var prekey = NCItem.PREFIX + key;
            _this = _super.call(this, globalKey || prekey, name, prekey) || this;
            NCID[key] = _this.id;
            return _this;
        }
        return class_1;
    }(ItemCommon));
    return NCItem;
}());
var MachineRegistry = /** @class */ (function () {
    function MachineRegistry() {
    }
    MachineRegistry.registerPrototype = function (id, prototype) {
        Block.setDestroyTime(id, 3);
        ToolAPI.registerBlockMaterial(id, "stone");
        TileEntity.registerPrototype(id, prototype);
        EnergyTileRegistry.addEnergyTypeForId(id, RF);
        ICRender.getGroup("rf-wire").add(id, -1);
    };
    MachineRegistry.getGlobalValidatePolicy = function (machineId) {
        var descriptor = StorageInterface.getData(machineId) || {};
        if (descriptor.slots) {
            return function (name, id, amount, data, extra, container, player) {
                var slotData = descriptor.slots[name];
                if (slotData) {
                    if (slotData.input) {
                        if (slotData.isValid) {
                            return slotData.isValid({ id: id, count: amount, data: data, extra: extra }, -1, null);
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            };
        }
        return function () { return true; };
    };
    return MachineRegistry;
}());
var NCWindowMaker = /** @class */ (function (_super) {
    __extends(NCWindowMaker, _super);
    function NCWindowMaker(title, width, height, frame) {
        var _this = _super.call(this, title, width, height, frame) || this;
        _this.enableTooltip(true);
        return _this;
    }
    NCWindowMaker.prototype.addSlot = function (name, x, y, size, bitmap) {
        _super.prototype.addSlot.call(this, name, x, y, size, bitmap);
        name.startsWith("output") && this.setValidItem(name, function () { return false; });
        return this;
    };
    NCWindowMaker.prototype.addTank = function (name, x, y, size, bitmap) {
        this.addDrawing(name, { type: "bitmap", x: x, y: y, width: size, height: size, bitmap: bitmap });
        this.addElements(name, { type: "scale", x: x + 1, y: y + 1, width: size - 2, height: size - 2, direction: WindowMaker.SCALE_UP, pixelate: false });
        this.setClicker(name, {
            onLongClick: function (position, container, tileEntity) {
                var tank = tileEntity[name];
                tank && tank.setAmount(null, 0);
            }
        });
        this.setTooltipFunc(name, function (elem) {
            var liquid = getLiquidByTex(elem.getBinding("texture") + "");
            var amount = elem.getBinding("value") * 16000 | 0;
            if (liquid && amount > 0) {
                return liquid + "\n" + amount + " mB";
            }
            return "";
        });
        return this;
    };
    NCWindowMaker.prototype.addProgressBar = function (name, x, y, bmpBack, bmpFront, direction, thickness) {
        if (direction === void 0) { direction = 0; }
        if (thickness === void 0) { thickness = 0; }
        this.addScale(name, x, y, bmpBack, bmpFront, direction, thickness);
        this.setTooltipFunc(name, function (elem) { return (elem.getBinding("value") * 100).toFixed(1) + "%"; });
        return this;
    };
    return NCWindowMaker;
}(WindowMaker));
var FluidRegistry = /** @class */ (function () {
    function FluidRegistry() {
    }
    FluidRegistry.genCellTex = function (key, liq) {
        var bmp = Bitmap.createBitmap(16, 16, Bitmap.Config.ARGB_8888);
        var cvs = new Canvas(bmp);
        var inside = Bitmap.createBitmap(liq, 6, 1, 5, 14, null, true);
        cvs.drawBitmap(this.cell_back, 0, 0, null);
        cvs.drawBitmap(inside, 6, 1, null);
        cvs.drawBitmap(this.cell_front, 0, 0, null);
        FileTools.WriteImage(__dir__ + "res/items-opaque/cell/nc_cell_".concat(key, ".png"), bmp);
    };
    FluidRegistry.register = function (key, name, texture, colorCode) {
        var uiTexture;
        if (colorCode && texture in this.base) {
            var bmp = Bitmap.createBitmap(16, 16, Bitmap.Config.ARGB_8888);
            var cvs = new Canvas(bmp);
            var paint = new Paint();
            var color = texture === "SALT_SOLUTION" ? this.waterBlendColor(colorCode) : Color.parseColor(colorCode);
            paint.setColorFilter(new ColorFilter(color, PDMode.MULTIPLY));
            cvs.drawBitmap(this.base[texture], 0, 0, paint);
            uiTexture = "nc.fluid." + key;
            UI.TextureSource.put(uiTexture, bmp);
            //this.genCellTex(key, bmp);
        }
        else {
            uiTexture = "nc.fluid." + key;
            //this.genCellTex(key, UI.TextureSource.get(uiTexture));
        }
        LiquidRegistry.registerLiquid(key, name, [uiTexture]);
        Item.addCreativeGroup("nc_cell", "NC Cell", [ItemRegistry.registerItem(new ItemFluidCell("cell_" + key, key)).id]);
    };
    FluidRegistry.waterBlendColor = function (soluteColor, blendRatio) {
        if (blendRatio === void 0) { blendRatio = 0.5; }
        var color1 = Color.parseColor("#2F43F4");
        var color2 = Color.parseColor(soluteColor);
        return Color.argb(Math.min(Color.alpha(color1), Color.alpha(color2)), Color.red(color1) + (Color.red(color2) - Color.red(color1)) * blendRatio, Color.green(color1) + (Color.green(color2) - Color.green(color1)) * blendRatio, Color.blue(color1) + (Color.blue(color2) - Color.blue(color1)) * blendRatio);
    };
    FluidRegistry.base = {
        LIQUID: FileTools.ReadImage(__dir__ + "tex_base/fluid/liquid.png"),
        GAS: FileTools.ReadImage(__dir__ + "tex_base/fluid/gas.png"),
        MOLTEN: FileTools.ReadImage(__dir__ + "tex_base/fluid/molten.png"),
        SALT_SOLUTION: FileTools.ReadImage(__dir__ + "tex_base/fluid/salt_solution.png")
    };
    FluidRegistry.cell_back = FileTools.ReadImage(__dir__ + "tex_base/cell/back.png");
    FluidRegistry.cell_front = FileTools.ReadImage(__dir__ + "tex_base/cell/front.png");
    return FluidRegistry;
}());
var MachineBase = /** @class */ (function (_super) {
    __extends(MachineBase, _super);
    function MachineBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0
        };
        return _this;
    }
    MachineBase.prototype.onInit = function () {
        this.networkData.putInt("blockId", this.blockID);
        this.networkData.putInt("facing", this.blockSource.getBlockData(this.x, this.y, this.z));
        this.networkData.sendChanges();
        this.setupContainer();
        delete this.liquidStorage;
    };
    MachineBase.prototype.setupContainer = function () { };
    MachineBase.prototype.addLiquidTank = function (name, limit, liquids) {
        var tank = new BlockEngine.LiquidTank(this, name, limit, liquids);
        var liquid = this.liquidStorage.getLiquidStored();
        if (liquid) {
            var amount = this.liquidStorage.getLiquid(liquid, tank.getLimit() / 1000);
            tank.addLiquid(liquid, Math.round(amount * 1000));
        }
        return tank;
    };
    MachineBase.prototype.setActive = function (isActive) {
        if (this.networkData.getBoolean("active") !== isActive) {
            this.networkData.putBoolean("active", isActive);
            this.networkData.sendChanges();
        }
    };
    MachineBase.prototype.renderModel = function () {
        if (this.networkData.getBoolean("active")) {
            TileRenderer.mapAtCoords(this.x, this.y, this.z, Network.serverToLocalId(this.networkData.getInt("blockId")), this.networkData.getInt("facing"));
        }
        else {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        }
    };
    MachineBase.prototype.clientLoad = function () {
        var _this = this;
        this.renderModel();
        this.networkData.addOnDataChangedListener(function (data, isExternal) {
            _this.renderModel();
        });
    };
    MachineBase.prototype.clientUnload = function () {
        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
    };
    MachineBase.prototype.setUiScale = function (name, numerator, denominator) {
        this.container.setScale(name, denominator ? numerator / denominator : 0);
    };
    MachineBase.prototype.getScreenByName = function (screenName, container) {
        return null;
    };
    __decorate([
        ClientSide
    ], MachineBase.prototype, "renderModel", null);
    return MachineBase;
}(TileEntityBase));
var GeneratorBase = /** @class */ (function (_super) {
    __extends(GeneratorBase, _super);
    function GeneratorBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeneratorBase.prototype.canReceiveEnergy = function (side, type) {
        return false;
    };
    GeneratorBase.prototype.canExtractEnergy = function (side, type) {
        return true;
    };
    GeneratorBase.prototype.energyTick = function (type, src) {
        this.data.energy = src.add(this.data.energy);
    };
    return GeneratorBase;
}(MachineBase));
var ProcessorBase = /** @class */ (function (_super) {
    __extends(ProcessorBase, _super);
    function ProcessorBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessorBase.prototype.canReceiveEnergy = function (side, type) {
        return true;
    };
    ProcessorBase.prototype.canExtractEnergy = function (side, type) {
        return false;
    };
    ProcessorBase.prototype.energyReceive = function (type, amount, voltage) {
        var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
        this.data.energy += add;
        return add;
    };
    return ProcessorBase;
}(MachineBase));
var TileProcessor = /** @class */ (function (_super) {
    __extends(TileProcessor, _super);
    function TileProcessor(inputSlotSize, inputTankSize, outputSlotSize, outputTankSize, particle1, particle2, processTime, processPower) {
        var _this = _super.call(this) || this;
        _this.inputSlotSize = inputSlotSize;
        _this.inputTankSize = inputTankSize;
        _this.outputSlotSize = outputSlotSize;
        _this.outputTankSize = outputTankSize;
        _this.particle1 = particle1;
        _this.particle2 = particle2;
        _this.processTime = processTime;
        _this.processPower = processPower;
        _this.defaultValues = {
            energy: 0,
            progress: 0
        };
        return _this;
    }
    TileProcessor.prototype.getEnergyStorage = function () {
        var handler = this.getRecipeHandler();
        if (!handler) {
            return 0;
        }
        return (handler.getMaxTime() * this.getProcessTime()) * (handler.getMaxPower() * this.getProcessPower()) | 0;
    };
    TileProcessor.prototype.getScreenByName = function () {
        return ProcessorRegistry.getWindow(this.blockID);
    };
    TileProcessor.prototype.getRecipeHandler = function () {
        return ProcessorRegistry.getRecipeHandler(this.blockID);
    };
    TileProcessor.prototype.setupContainer = function () {
        var liquids = this.getRecipeHandler().getValidInputLiquids();
        for (var i = 0; i < this.inputTankSize; i++) {
            this["inputLiq" + i] = this.addLiquidTank("inputLiq" + i, 16000, liquids);
        }
        for (var i = 0; i < this.outputTankSize; i++) {
            this["outputLiq" + i] = this.addLiquidTank("outputLiq" + i, 16000);
        }
        StorageInterface.setGlobalValidatePolicy(this.container, this.getRecipeHandler().globalValidatePolicy);
    };
    TileProcessor.prototype.getInputSlots = function () {
        var slots = [];
        for (var i = 0; i < this.inputSlotSize; i++) {
            slots.push(this.container.getSlot("input" + i));
        }
        return slots;
    };
    TileProcessor.prototype.getOutputSlots = function () {
        var slots = [];
        for (var i = 0; i < this.outputSlotSize; i++) {
            slots.push(this.container.getSlot("output" + i));
        }
        return slots;
    };
    TileProcessor.prototype.getInputTanks = function () {
        var tanks = [];
        for (var i = 0; i < this.inputTankSize; i++) {
            tanks.push(this["inputLiq" + i]);
        }
        return tanks;
    };
    TileProcessor.prototype.getOutputTanks = function () {
        var tanks = [];
        for (var i = 0; i < this.outputTankSize; i++) {
            tanks.push(this["outputLiq" + i]);
        }
        return tanks;
    };
    TileProcessor.prototype.getSpeedUpgCount = function () {
        var slot = this.container.getSlot("slotUpgSpeed");
        return slot.id === NCID.upg_speed ? Math.min(8, slot.count) : 0;
    };
    TileProcessor.prototype.getEnergyUpgCount = function () {
        var slot = this.container.getSlot("slotUpgEnergy");
        return slot.id === NCID.upg_energy ? Math.min(8, slot.count, this.getSpeedUpgCount()) : 0;
    };
    TileProcessor.prototype.getSpeedMultiplier = function () {
        return this.getSpeedUpgCount() + 1;
    };
    TileProcessor.prototype.getPowerMultiplier = function () {
        return Math.pow((this.getSpeedUpgCount() + 1), 2) / (this.getEnergyUpgCount() + 1);
    };
    TileProcessor.prototype.getProcessTime = function () {
        return this.processTime / this.getSpeedMultiplier() | 0;
    };
    TileProcessor.prototype.getProcessPower = function () {
        return this.processPower * this.getPowerMultiplier() | 0;
    };
    TileProcessor.prototype.getRecipe = function () {
        var handler = this.getRecipeHandler();
        return handler ? handler.get(this.getInputSlots(), this.getInputTanks()) : null;
    };
    TileProcessor.prototype.consumeSources = function (recipe) {
        var inputSlots = this.getInputSlots();
        var inputTanks = this.getInputTanks();
        var item;
        var slot;
        var liquid;
        var tank;
        for (var i = 0; i < recipe.input.length; i++) {
            item = recipe.input[i];
            slot = inputSlots.find(function (s) { return s.id === item.id && (item.data === -1 || s.data === item.data); });
            if (slot) {
                slot.count -= item.count;
                slot.markDirty();
                slot.validate();
            }
        }
        for (var i = 0; i < recipe.inputLiq.length; i++) {
            liquid = recipe.inputLiq[i];
            tank = inputTanks.find(function (t) { return t.getLiquidStored() === liquid.liquid && t.getAmount() >= liquid.amount; });
            if (tank) {
                tank.getLiquid(liquid.amount);
            }
        }
    };
    TileProcessor.prototype.hasSpace = function (recipe) {
        var outputSlots = this.getOutputSlots();
        var outputTanks = this.getOutputTanks();
        var item;
        var slot;
        var liquid;
        var tank;
        for (var i = 0; i < recipe.output.length; i++) {
            item = recipe.output[i];
            slot = outputSlots[i];
            if (!slot.isEmpty() && (slot.id !== item.id || slot.data !== item.data || slot.count + item.count > Item.getMaxStack(item.id))) {
                return false;
            }
        }
        for (var i = 0; i < recipe.outputLiq.length; i++) {
            liquid = recipe.outputLiq[i];
            tank = outputTanks[i];
            if (!tank.isEmpty() && (tank.getLiquidStored() !== liquid.liquid || tank.getAmount() + liquid.amount > tank.getLimit())) {
                return false;
            }
        }
        return true;
    };
    TileProcessor.prototype.putResults = function (recipe) {
        var outputSlots = this.getOutputSlots();
        var outputTanks = this.getOutputTanks();
        var item;
        var slot;
        var liquid;
        var tank;
        for (var i = 0; i < recipe.output.length; i++) {
            item = recipe.output[i];
            slot = outputSlots[i];
            if (!item.chance || item.chance > Math.random()) {
                slot.id = item.id;
                slot.data = item.data;
                slot.count += item.count;
                slot.markDirty();
            }
        }
        for (var i = 0; i < recipe.outputLiq.length; i++) {
            liquid = recipe.outputLiq[i];
            tank = outputTanks[i];
            tank.addLiquid(liquid.liquid, liquid.amount);
        }
    };
    TileProcessor.prototype.updateTankScales = function () {
        var inputTanks = this.getInputTanks();
        var outputTanks = this.getOutputTanks();
        for (var i = 0; i < inputTanks.length; i++) {
            inputTanks[i].updateUiScale("inputLiq" + i);
        }
        for (var i = 0; i < outputTanks.length; i++) {
            outputTanks[i].updateUiScale("outputLiq" + i);
        }
    };
    TileProcessor.prototype.onItemUse = function (coords, item, playerUid) {
        var player = new PlayerEntity(playerUid);
        var inputTanks = this.getInputTanks();
        var empty = LiquidItemRegistry.getEmptyItem(item.id, item.data);
        var tank;
        var stored;
        if (empty) {
            for (var i = 0; i < inputTanks.length; i++) {
                tank = inputTanks[i];
                stored = tank.getLiquidStored();
                if (!tank.isFull() && (stored === empty.liquid || !stored && tank.isValidLiquid(empty.liquid))) {
                    if (tank.getLimit() - tank.getAmount(stored) >= empty.amount) {
                        tank.addLiquid(empty.liquid, empty.amount);
                        item.count--;
                        player.setCarriedItem(item);
                        player.addItemToInventory(empty.id, 1, empty.data);
                        this.preventClick();
                        return true;
                    }
                    if (item.count === 1 && empty.storage) {
                        item.data += tank.addLiquid(empty.liquid, empty.amount);
                        player.setCarriedItem(item);
                        this.preventClick();
                        return true;
                    }
                }
            }
        }
        var allTanks = __spreadArray(__spreadArray([], this.getOutputTanks(), true), inputTanks, true);
        var full;
        for (var i = 0; i < allTanks.length; i++) {
            tank = allTanks[i];
            stored = tank.getLiquidStored();
            if (stored) {
                full = LiquidItemRegistry.getFullItem(item.id, item.data, stored);
                if (full) {
                    var amount = tank.getAmount(stored);
                    if (full.amount <= amount) {
                        tank.getLiquid(stored, full.amount);
                        if (item.count === 1) {
                            player.setCarriedItem(full.id, 1, full.data);
                        }
                        else {
                            item.count--;
                            player.setCarriedItem(item);
                            player.addItemToInventory(full.id, 1, full.data);
                        }
                        this.preventClick();
                        return true;
                    }
                    if (item.count === 1 && full.storage) {
                        player.setCarriedItem(full.id, 1, full.amount - tank.getLiquid(stored, full.amount));
                        this.preventClick();
                        return true;
                    }
                }
            }
        }
        return false;
    };
    TileProcessor.prototype.onTick = function () {
        var recipe = this.getRecipe();
        var processPower;
        var processTime;
        var isActive = false;
        if (recipe) {
            processPower = this.getProcessPower() * recipe.powerMultiplier | 0;
            processTime = this.getProcessTime() * recipe.timeMultiplier | 0;
            if (this.data.energy >= processPower) {
                isActive = true;
                this.data.energy -= processPower;
                this.data.progress++;
                if (this.data.progress >= processTime && this.hasSpace(recipe)) {
                    this.consumeSources(recipe);
                    this.putResults(recipe);
                    this.data.progress = 0;
                }
                if (Math.random() < 0.2) {
                    this.sendPacket("spawnParticle", { particle: this.particle1 });
                    this.sendPacket("spawnParticle", { particle: this.particle2 });
                }
            }
        }
        else {
            this.data.progress = 0;
        }
        this.setActive(isActive);
        StorageInterface.checkHoppers(this);
        this.setUiScale("scaleEnergy", this.data.energy, this.getEnergyStorage());
        this.setUiScale("scaleProgress", this.data.progress, processTime);
        this.updateTankScales();
        this.container.sendChanges();
    };
    TileProcessor.prototype.spawnParticle = function (data) {
        var y = this.y + 0.125 + Math.random() * 0.75;
        var x = this.x + 0.5;
        var z = this.z + 0.5;
        var rand = Math.random() * 0.6 - 0.3;
        switch (this.networkData.getInt("facing")) {
            case EBlockSide.NORTH:
                x += rand;
                z -= 0.6;
                break;
            case EBlockSide.SOUTH:
                x += rand;
                z += 0.6;
                break;
            case EBlockSide.WEST:
                z += rand;
                x -= 0.6;
                break;
            case EBlockSide.EAST:
                z += rand;
                x += 0.6;
                break;
        }
        Particles.addParticle(data.particle, x, y, z, 0, 0, 0);
    };
    __decorate([
        NetworkEvent(Side.Client)
    ], TileProcessor.prototype, "spawnParticle", null);
    return TileProcessor;
}(ProcessorBase));
var ProcessorWindowMaker = /** @class */ (function (_super) {
    __extends(ProcessorWindowMaker, _super);
    function ProcessorWindowMaker(title) {
        var _this = this;
        var width = 176;
        var height = 86;
        _this = _super.call(this, title, width, height) || this;
        //energy scale
        _this.addDrawing("", { type: "frame", x: 7, y: 5, width: 18, height: 76, bitmap: "nc.frame" });
        _this.addElements("scaleEnergy", { type: "scale", x: 8, y: 6, bitmap: "nc.energy", direction: WindowMaker.SCALE_UP });
        /*
                this.setTooltipFunc("scaleEnergy", (elem: UI.Element) => {
        
                    const tile = elem.window.getContainer().getParent().getParent();
        
                    const arr = [];
                    for(let key in tile)arr.push(key);
                    Game.message(arr.join(", "));
        
                    return (tile.getEnergyStorage() + " RF");
                    //return `${tile.data.energy} / ${tile.getEnergyStorage()} RF`;
        
                });
        */
        //upgrade slot
        _this.addSlot("slotUpgSpeed", 131, 63, 18, "nc.slot_upg_speed");
        _this.addSlot("slotUpgEnergy", 151, 63, 18, "nc.slot_upg_energy");
        return _this;
        //this.addElements("buttonRedstone", {type: "button", x: 27, y: 63, bitmap: "nc.button_rs_off", scale: 0.5});
    }
    return ProcessorWindowMaker;
}(NCWindowMaker));
var ProcessorInterface = /** @class */ (function () {
    function ProcessorInterface(inputSlotSize, inputTankSize, outputSlotSize, outputTankSize) {
        this.liquidUnitRatio = 0.001;
        this.inputSlotSize = inputSlotSize;
        this.inputTankSize = inputTankSize;
        this.outputSlotSize = outputSlotSize;
        this.outputTankSize = outputTankSize;
        this.slots = {};
        var _loop_1 = function (i) {
            this_1.slots["input" + i] = {
                input: true,
                isValid: function (item, side, tileEntity) {
                    var recipes = tileEntity.getRecipeHandler().getAll();
                    return recipes.some(function (recipe) { return recipe.input[i].id === item.id && (recipe.input[i].data === -1 || recipe.input[i].data === item.data); });
                }
            };
        };
        var this_1 = this;
        for (var i = 0; i < this.inputSlotSize; i++) {
            _loop_1(i);
        }
        for (var i = 0; i < this.outputSlotSize; i++) {
            this.slots["output" + i] = { output: true };
        }
    }
    ProcessorInterface.prototype.getInputTank = function (side) {
        if (!this.tileEntity) {
            return null;
        }
        var tanks = this.tileEntity.getInputTanks();
        for (var i = 0; i < tanks.length; i++) {
            if (!tanks[i].isFull()) {
                return tanks[i];
            }
        }
        return null;
    };
    ProcessorInterface.prototype.getOutputTank = function (side) {
        if (!this.tileEntity) {
            return null;
        }
        var tanks = this.tileEntity.getOutputTanks();
        for (var i = 0; i < tanks.length; i++) {
            if (!tanks[i].isEmpty()) {
                return tanks[i];
            }
        }
        return null;
    };
    ProcessorInterface.prototype.canReceiveLiquid = function (liquid, side) {
        var _this = this;
        if (this.inputTankSize === 0)
            return false;
        var recHandler = this.tileEntity.getRecipeHandler();
        return recHandler.getAll().some(function (recipe) {
            for (var i = 0; i < _this.inputTankSize; i++) {
                if (recipe.inputLiq[i].liquid === liquid) {
                    return true;
                }
            }
            return false;
        });
    };
    ProcessorInterface.prototype.canTransportLiquid = function (liquid, side) {
        return this.outputTankSize > 0;
    };
    return ProcessorInterface;
}());
var ProcessorRecipeHandler = /** @class */ (function () {
    function ProcessorRecipeHandler(inputSlotSize, inputTankSize, outputSlotSize, outputTankSize) {
        var _this = this;
        this.recipes = [];
        this.globalValidatePolicy = function (name, id, amount, data) {
            if (name === "slotUpgSpeed")
                return id === ItemID.nc_upg_speed;
            if (name === "slotUpgEnergy")
                return id === ItemID.nc_upg_energy;
            if (name.startsWith("input") && _this.inputSlotSize > 0)
                return _this.recipes.some(function (recipe) {
                    for (var i = 0; i < _this.inputSlotSize; i++) {
                        if (recipe.input[i].id === id && (recipe.input[i].data === -1 || recipe.input[i].data === data)) {
                            return true;
                        }
                    }
                    return false;
                });
            return false;
        };
        this.inputSlotSize = inputSlotSize;
        this.inputTankSize = inputTankSize;
        this.outputSlotSize = outputSlotSize;
        this.outputTankSize = outputTankSize;
        this.maxTime = 1;
        this.maxPower = 1;
    }
    ProcessorRecipeHandler.prototype.convItem = function (item, defData) {
        var pair;
        if (!item) {
            return { id: 0, count: 0, data: 0 };
        }
        if (typeof item === "number") {
            return { id: item, count: 1, data: defData };
        }
        if (typeof item === "string") {
            pair = IDConverter.getIDData(item);
            return { id: pair.id, count: 1, data: pair.data || defData };
        }
        if (typeof item.id === "number") {
            return { id: item.id, count: item.count || 1, data: item.data || defData, chance: item.chance };
        }
        if (typeof item.id === "string") {
            pair = IDConverter.getIDData(item.id);
            return { id: pair.id, count: item.count || 1, data: pair.data || defData, chance: item.chance };
        }
        return null;
    };
    ProcessorRecipeHandler.prototype.convLiquid = function (liquid) {
        if (!liquid) {
            return { liquid: null, amount: 0 };
        }
        if (isLiquidInstance(liquid)) {
            return liquid;
        }
        if (Array.isArray(liquid) && liquid.length === 1 && typeof liquid[0] === "string") {
            var split = liquid[0].split(":");
            return { liquid: split[0], amount: +split[1] || 1000 };
        }
        return null;
    };
    ProcessorRecipeHandler.prototype.add = function () {
        var resources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            resources[_i] = arguments[_i];
        }
        if (resources.length < this.inputSlotSize + this.inputTankSize + this.outputSlotSize + this.outputTankSize) {
            alert("[NC] Invalid Recipe: " + JSON.stringify(resources));
            return;
        }
        var recipe = { timeMultiplier: 1, powerMultiplier: 1 };
        var inputItem = [];
        var inputLiquid = [];
        var outputItem = [];
        var outputLiquid = [];
        var option = [];
        var res;
        var item;
        var liquid;
        for (var i = 0; i < resources.length; i++) {
            res = resources[i];
            if (i < this.inputSlotSize) {
                item = this.convItem(res, -1);
                if (!item) {
                    return;
                }
                inputItem.push(item);
            }
            else if (i < this.inputSlotSize + this.inputTankSize) {
                liquid = this.convLiquid(res);
                if (!liquid) {
                    return;
                }
                inputLiquid.push(liquid);
            }
            else if (i < this.inputSlotSize + this.inputTankSize + this.outputSlotSize) {
                item = this.convItem(res, 0);
                if (!item) {
                    return;
                }
                outputItem.push(item);
            }
            else if (i < this.inputSlotSize + this.inputTankSize + this.outputSlotSize + this.outputTankSize) {
                liquid = this.convLiquid(res);
                if (!liquid) {
                    return;
                }
                outputLiquid.push(liquid);
            }
            else {
                option.push(res);
            }
        }
        recipe.timeMultiplier = typeof option[0] === "number" ? option[0] : 1;
        recipe.powerMultiplier = typeof option[1] === "number" ? option[1] : 1;
        if (inputItem.length > 0)
            recipe.input = inputItem;
        if (inputLiquid.length > 0)
            recipe.inputLiq = inputLiquid;
        if (outputItem.length > 0)
            recipe.output = outputItem;
        if (outputLiquid.length > 0)
            recipe.outputLiq = outputLiquid;
        this.recipes.push(recipe);
        this.maxTime = Math.max(this.maxTime, recipe.timeMultiplier);
        this.maxPower = Math.max(this.maxPower, recipe.powerMultiplier);
    };
    ProcessorRecipeHandler.prototype.getAll = function () {
        return this.recipes;
    };
    ProcessorRecipeHandler.prototype.get = function (slots, tanks) {
        var _this = this;
        var find = this.recipes.find(function (recipe) {
            var indexes = [];
            var index;
            if (recipe.input) {
                var item_1;
                for (var i = 0; i < _this.inputSlotSize; i++) {
                    item_1 = recipe.input[i];
                    index = slots.findIndex(function (slot, j) { return indexes.indexOf(j) === -1 && slot.id === item_1.id && (item_1.data === -1 || slot.data === item_1.data) && slot.count >= item_1.count; });
                    if (index === -1) {
                        return false;
                    }
                    indexes.push(index);
                }
            }
            indexes.length = 0;
            if (recipe.inputLiq) {
                var liquid_1;
                for (var i = 0; i < _this.inputTankSize; i++) {
                    liquid_1 = recipe.inputLiq[i];
                    index = tanks.findIndex(function (tank, j) { return indexes.indexOf(j) === -1 && tank.getLiquidStored() === liquid_1.liquid && tank.getAmount() >= liquid_1.amount; });
                    if (index === -1) {
                        return false;
                    }
                    indexes.push(index);
                }
            }
            return true;
        });
        return find ? __assign({ input: [], output: [], inputLiq: [], outputLiq: [] }, find) : null;
    };
    ProcessorRecipeHandler.prototype.getMaxTime = function () {
        return this.maxTime;
    };
    ProcessorRecipeHandler.prototype.getMaxPower = function () {
        return this.maxPower;
    };
    ProcessorRecipeHandler.prototype.getValidInputLiquids = function () {
        var _this = this;
        var liquids = [];
        if (this.inputTankSize > 0) {
            this.recipes.some(function (recipe) {
                for (var i = 0; i < _this.inputTankSize; i++) {
                    if (!liquids.includes(recipe.inputLiq[i].liquid)) {
                        liquids.push(recipe.inputLiq[i].liquid);
                    }
                }
            });
        }
        return liquids;
    };
    return ProcessorRecipeHandler;
}());
var ProcessorRegistry = /** @class */ (function () {
    function ProcessorRegistry() {
    }
    ProcessorRegistry.createBlock = function (key, name) {
        var prekey = NCItem.PREFIX + key;
        var prepro = NCItem.PREFIX + "processor";
        var id = NCItem.createBlock(key, name, [[prepro, 0], [prepro, 1], [prepro, 2], [prekey, 0], [prepro, 3], [prepro, 3]]);
        TileRenderer.setStandardModelWithRotation(id, 2, [[prepro, 0], [prepro, 1], [prepro, 2], [prekey, 0], [prepro, 3], [prepro, 3]]);
        TileRenderer.registerModelWithRotation(id, 2, [[prepro, 0], [prepro, 1], [prepro, 2], [prekey, 1], [prepro, 3], [prepro, 3]]);
        TileRenderer.setRotationFunction(id);
        return id;
    };
    ProcessorRegistry.createMachine = function (key, name, io, particle1, particle2, processTime, processPower) {
        var id = this.createBlock(key, name);
        MachineRegistry.registerPrototype(id, new (TileProcessor.bind.apply(TileProcessor, __spreadArray(__spreadArray([void 0], io, false), [EParticleType[particle1], EParticleType[particle2], processTime, processPower], false)))());
        StorageInterface.createInterface(id, new (ProcessorInterface.bind.apply(ProcessorInterface, __spreadArray([void 0], io, false)))());
        this.registerRecipeHandler(id, new (ProcessorRecipeHandler.bind.apply(ProcessorRecipeHandler, __spreadArray([void 0], io, false)))());
        Item.addCreativeGroup("nc_processor", "Processor Machine", [id]);
        return id;
    };
    ProcessorRegistry.registerWindow = function (id, window) {
        this.windows[id] = window;
        NCConfig.SlotsLikeVanilla && VanillaSlots.registerForTile(id);
    };
    ProcessorRegistry.registerRecipeHandler = function (id, recipe) {
        this.recipes[id] = recipe;
    };
    ProcessorRegistry.getWindow = function (id) {
        return this.windows[id];
    };
    ProcessorRegistry.getRecipeHandler = function (id) {
        return this.recipes[id];
    };
    ProcessorRegistry.windows = {};
    ProcessorRegistry.recipes = {};
    return ProcessorRegistry;
}());
var FissionMaterial = /** @class */ (function () {
    function FissionMaterial() {
    }
    FissionMaterial.create = function (key, name) {
        var item = ItemRegistry.registerItem(new this.Instance(key, name));
        Recipes2.addShapeless({ id: item.id, data: 0 }, [{ id: item.id, count: 9, data: 1 }]);
        Recipes2.addShapeless({ id: item.id, count: 9, data: 1 }, [{ id: item.id, data: 0 }]);
        Item.addCreativeGroup("nc_fission_material", "Fission Material", [item.id]);
        return item;
    };
    FissionMaterial.createWithOxide = function (key, name) {
        var normal = this.create(key, name);
        var oxide = this.create(key + "ox", name + " Oxide");
        Recipes.addFurnace(oxide.id, 0, normal.id, 0);
        Recipes.addFurnace(oxide.id, 1, normal.id, 1);
    };
    FissionMaterial.createWithIsotope = function (symbol, name) {
        var nums = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            nums[_i - 2] = arguments[_i];
        }
        for (var i = 0; i < nums.length; i++) {
            this.createWithOxide(symbol + nums[i], name + "-" + nums[i]);
        }
    };
    FissionMaterial.Instance = /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2(key, name) {
            return _super.call(this, key, name) || this;
        }
        class_2.prototype.onNameOverride = function (item, translation, name) {
            return item.data === 1 ? "Tiny Clamp of " + name : name;
        };
        class_2.prototype.onIconOverride = function (item, isModUi) {
            return { name: this.icon.name, meta: item.data === 1 ? 1 : 0 };
        };
        return class_2;
    }(NCItem.ItemInstance));
    return FissionMaterial;
}());
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
var FissionFuel = /** @class */ (function () {
    function FissionFuel() {
    }
    FissionFuel.create = function (key, name, time, power, heat) {
        var item = ItemRegistry.registerItem(new this.Instance(key, name));
        Item.addCreativeGroup("nc_fission_fuel", "Fission Fuel", [item.id]);
        this.data[item.id] = { name: name, time: time, power: power, heat: heat };
        return item;
    };
    FissionFuel.createWithOxide = function (key, name, time, power, heat) {
        var normal = this.create(key, name, time, power, heat);
        var oxide = this.create(key + "ox", name + " Oxide", time, Math.round(power * 1.4), Math.round(heat * 1.25));
        Recipes.addFurnace(oxide.id, 0, normal.id, 0);
        Recipes.addFurnace(oxide.id, 1, normal.id, 1);
    };
    FissionFuel.createLowAndHigh = function (key, name, time, power, heat) {
        this.createWithOxide("LE" + key, "LE" + name, time, power, heat);
        this.createWithOxide("HE" + key, "HE" + name, time, power * 4, heat * 6);
    };
    FissionFuel.isFuel = function (id) {
        return id in this.data;
    };
    FissionFuel.getParams = function (id) {
        return this.data[id];
    };
    FissionFuel.tickToString = function (tick) {
        var t = tick / 20;
        var m = t / 60 | 0;
        var s = t % 60;
        var timeText = "";
        if (m > 0)
            timeText += m + "min ";
        if (s > 0)
            timeText += s + "sec";
        return timeText;
    };
    FissionFuel.getAllListForRV = function () {
        var list = [];
        for (var id in this.data) {
            list.push({
                input: [{ id: +id, count: 1, data: 0 }],
                output: [{ id: +id, count: 1, data: 1 }]
            });
        }
        return list;
    };
    FissionFuel.data = {};
    FissionFuel.Instance = /** @class */ (function (_super) {
        __extends(class_3, _super);
        function class_3(key, name) {
            return _super.call(this, key, name) || this;
        }
        class_3.prototype.onNameOverride = function (item, translation, name) {
            if (item.data === 1) {
                return "Deplated " + name;
            }
            var fuelData = FissionFuel.getParams(item.id);
            if (!fuelData) {
                return name;
            }
            return name + "\n\u00A7bBase process time: ".concat(FissionFuel.tickToString(fuelData.time), "\nBase power: ").concat(fuelData.power, " RF/t\nBase heat gen: ").concat(fuelData.heat, " H/t");
        };
        class_3.prototype.onIconOverride = function (item, isModUi) {
            return { name: this.icon.name, meta: item.data === 1 ? 1 : 0 };
        };
        return class_3;
    }(NCItem.ItemInstance));
    return FissionFuel;
}());
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
Callback.addCallback("PreLoaded", function () {
    var addFuelRecipes = function (symbol, fertile) {
        var fissiles = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fissiles[_i - 2] = arguments[_i];
        }
        fissiles.forEach(function (fissile) {
            NCID["LE" + symbol + fissile] || alert("LE" + symbol + fissile);
            NCID["HE" + symbol + fissile] || alert("HE" + symbol + fissile);
            NCID[symbol + fertile] || alert(symbol + fertile);
            NCID[symbol + fissile] || alert(symbol + fissile);
            Recipes2.addShapeless(NCID["LE" + symbol + fissile], [{ id: NCID[symbol + fissile], data: 0 }, { id: NCID[symbol + fertile], count: 8, data: 0 }]);
            Recipes2.addShapeless(NCID["LE" + symbol + fissile + "ox"], [{ id: NCID[symbol + fissile + "ox"], data: 0 }, { id: NCID[symbol + fertile + "ox"], count: 8, data: 0 }]);
            Recipes2.addShapeless(NCID["HE" + symbol + fissile], [{ id: NCID[symbol + fissile], count: 4, data: 0 }, { id: NCID[symbol + fertile], count: 5, data: 0 }]);
            Recipes2.addShapeless(NCID["HE" + symbol + fissile + "ox"], [{ id: NCID[symbol + fissile + "ox"], count: 4, data: 0 }, { id: NCID[symbol + fertile + "ox"], count: 5, data: 0 }]);
        });
    };
    Recipes2.addShapeless(NCID.TBU, [{ id: NCID.T232, count: 9, data: 0 }]);
    Recipes2.addShapeless(NCID.TBUox, [{ id: NCID.T232ox, count: 9, data: 0 }]);
    addFuelRecipes("U", 238, 233, 235);
    addFuelRecipes("N", 237, 236);
    addFuelRecipes("P", 242, 239, 241);
    Recipes2.addShapeless(NCID.MOX239, [{ id: NCID.P239ox, data: 0 }, { id: NCID.U238ox, count: 8, data: 0 }]);
    Recipes2.addShapeless(NCID.MOX241, [{ id: NCID.P241ox, data: 0 }, { id: NCID.U238ox, count: 8, data: 0 }]);
    addFuelRecipes("A", 243, 242);
    addFuelRecipes("Cm", 246, 243, 245, 247);
    addFuelRecipes("B", 247, 248);
    addFuelRecipes("Cf", 252, 249, 251);
});
Item.addCreativeGroup("blockMetal", Translation.translate("Metal Blocks"), [
    NCItem.createBlock("block_copper", "Copper Block", "blockCopper"),
    NCItem.createBlock("block_tin", "Tin Block", "blockTin"),
    NCItem.createBlock("block_lead", "Lead Block", "blockLead"),
    NCItem.createBlock("block_thorium", "Thorium Block", "blockThorium"),
    NCItem.createBlock("block_uranium", "Uranium Block", "blockUranium"),
    NCItem.createBlock("block_boron", "Boron Block"),
    NCItem.createBlock("block_lithium", "Lithium Block", "blockLithium"),
    NCItem.createBlock("block_magnesium", "Magnesium Block", "blockMagnesium"),
    NCItem.createBlock("block_graphite", "Graphite Block"),
    NCItem.createBlock("block_beryllium", "Beryllium Block", "blockBeryllium"),
    NCItem.createBlock("block_zirconium", "Zirconium Block"),
    NCItem.createBlock("block_manganese", "Manganese Block", "blockManganese"),
    NCItem.createBlock("block_aluminum", "Aluminum Block", "blockAluminum"),
    NCItem.createBlock("block_silver", "Silver Block", "blockSilver"),
    NCItem.createBlock("block_thorium230", "Thorium-230 Block"),
    NCItem.createBlock("block_uranium238", "Uranium-238 Block"),
    NCItem.createBlock("block_neptunium237", "Neptunium-237 Block"),
    NCItem.createBlock("block_plutonium242", "Plutonium-242 Block"),
    NCItem.createBlock("block_americium243", "Americium-243 Block"),
    NCItem.createBlock("block_curium246", "Curium-246 Block"),
    NCItem.createBlock("block_berkelium247", "Berkelium-247 Block"),
    NCItem.createBlock("block_californium252", "Californium-252 Block")
]);
Item.addCreativeGroup("ingot", Translation.translate("Ingots"), [
    NCItem.createItem("ingot_copper", "Copper Ingot", "ingotCopper"),
    NCItem.createItem("ingot_tin", "Tin Ingot", "ingotTin"),
    NCItem.createItem("ingot_lead", "Lead Ingot", "ingotLead"),
    NCItem.createItem("ingot_thorium", "Thorium Ingot"),
    NCItem.createItem("ingot_uranium", "Uranium Ingot", "uranium"),
    NCItem.createItem("ingot_boron", "Boron Ingot"),
    NCItem.createItem("ingot_lithium", "Lithium Ingot", "ingotLithium"),
    NCItem.createItem("ingot_magnesium", "Magnesium Ingot", "ingotMagnesium"),
    NCItem.createItem("ingot_graphite", "Graphite Ingot"),
    NCItem.createItem("ingot_beryllium", "Beryllium Ingot", "ingotBeryllium"),
    NCItem.createItem("ingot_zirconium", "Zirconium Ingot"),
    NCItem.createItem("ingot_manganese", "Manganese Ingot", "ingotManganese"),
    NCItem.createItem("ingot_aluminum", "Aluminum Ingot", "ingotAluminum"),
    NCItem.createItem("ingot_silver", "Silver Ingot", "ingotSilver"),
    NCItem.createItem("ingot_manganese_oxide", "Manganese Oxide Ingot"),
    NCItem.createItem("ingot_manganese_dioxide", "Manganese Dioxide Ingot"),
    NCItem.createItem("alloy_bronze", "Bronze Ingot", "ingotBronze"),
    NCItem.createItem("alloy_tough", "Tough Alloy"),
    NCItem.createItem("alloy_hard_carbon", "Hard Carbon Alloy"),
    NCItem.createItem("alloy_MgB2", "Magnesium Diboride Alloy"),
    NCItem.createItem("alloy_LiMnO2", "Lithium Manganese Dioxide Alloy"),
    NCItem.createItem("alloy_steel", "Steel Ingot", "ingotSteel"),
    NCItem.createItem("alloy_ferroboron", "Ferroboron Alloy"),
    NCItem.createItem("alloy_shibuichi", "Shibuichi Alloy"),
    NCItem.createItem("alloy_tin_silver", "Tin Silver Alloy"),
    NCItem.createItem("alloy_lead_platinum", "Lead Platinum Alloy"),
    NCItem.createItem("alloy_extreme", "Extreme Alloy"),
    NCItem.createItem("alloy_thermal", "Thermoconducting Alloy"),
    NCItem.createItem("alloy_zircaloy", "Zircaloy"),
    NCItem.createItem("alloy_SiC", "Silicon Carbide Alloy"),
    NCItem.createItem("alloy_sic_sic_cmc", "SiC-SiC Ceramic Matrix Composite"),
    NCItem.createItem("alloy_hsla_steel", "HSLA Steel Alloy"),
    NCItem.createItem("alloy_enderium", "Enderium Ingot", "ingotEnderium")
]);
var ItemDustWithTiny = /** @class */ (function (_super) {
    __extends(ItemDustWithTiny, _super);
    function ItemDustWithTiny() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemDustWithTiny.prototype.onNameOverride = function (item, translation, name) {
        return item.data ? "Tiny Pile of " + name : name;
    };
    ItemDustWithTiny.prototype.onIconOverride = function (item, isModUi) {
        return { name: this.icon.name, meta: item.data ? 1 : 0 };
    };
    return ItemDustWithTiny;
}(NCItem.ItemInstance));
Item.addCreativeGroup("dust", Translation.translate("Dusts"), [
    NCItem.createItem("dust_copper", "Copper Dust", "dustCopper"),
    NCItem.createItem("dust_tin", "Tin Dust", "dustTin"),
    ItemRegistry.registerItem(new ItemDustWithTiny("dust_lead", "Lead Dust", "dustLead")).id,
    NCItem.createItem("dust_thorium", "Thorium Dust"),
    NCItem.createItem("dust_uranium", "Uranium Dust"),
    NCItem.createItem("dust_boron", "Boron Dust"),
    NCItem.createItem("dust_lithium", "Lithium Dust", "dustLithium"),
    NCItem.createItem("dust_magnesium", "Magnesium Dust", "dustMagnesium"),
    NCItem.createItem("dust_graphite", "Graphite Dust"),
    NCItem.createItem("dust_beryllium", "Beryllium Dust", "dustBeryllium"),
    NCItem.createItem("dust_zirconium", "Zirconium Dust"),
    NCItem.createItem("dust_manganese", "Manganese Dust", "dustManganese"),
    NCItem.createItem("dust_aluminum", "Aluminum Dust", "dustAluminum"),
    NCItem.createItem("dust_silver", "Silver Dust", "dustSilver"),
    NCItem.createItem("dust_manganese_oxide", "Manganese Oxide Dust"),
    NCItem.createItem("dust_manganese_dioxide", "Manganese Dioxide Dust"),
    NCItem.createItem("dust_diamond", "Crushed Diamond", "dustDiamond"),
    NCItem.createItem("dust_rhodochrosite", "Crushed Rhodochrosite"),
    NCItem.createItem("dust_quartz", "Crushed Quartz", "dustQuartz"),
    NCItem.createItem("dust_obsidian", "Crushed Obsidian", "dustObsidian"),
    NCItem.createItem("dust_boron_nitride", "Hexagonal Boron Nitride"),
    NCItem.createItem("dust_fluorite", "Crushed Fluorite"),
    NCItem.createItem("dust_sulfur", "Sulfur", "dustSulfur"),
    NCItem.createItem("dust_coal", "Crushed Coal", "dustCoal"),
    NCItem.createItem("dust_villiaumite", "Crushed Villiaumite"),
    NCItem.createItem("dust_carobbiite", "Crushed Carobbiite"),
    NCItem.createItem("dust_arsenic", "Crushed Arsenic"),
    NCItem.createItem("dust_endstone", "Crushed End Stone", "dustEndstone")
]);
Recipes2.addShapeless({ id: NCID.dust_lead, data: 0 }, [{ id: NCID.dust_lead, count: 9, data: 1 }]);
Item.addCreativeGroup("gem", "Gem", [
    NCItem.createItem("gem_rhodochrosite", "Rhodochrosite"),
    NCItem.createItem("gem_boron_nitride", "Cubic Boron Nitride"),
    NCItem.createItem("gem_fluorite", "Fluorite"),
    NCItem.createItem("gem_villiaumite", "Villiaumite"),
    NCItem.createItem("gem_carobbiite", "Carobbiite"),
    NCItem.createItem("gem_boron_arsenide", "Boron Arsenide"),
    NCItem.createItem("gem_silicon", "Silicon")
]);
Item.addCreativeGroup("nc_comp", "Compound", [
    NCItem.createItem("comp_CaSO4", "Calcium Sulfate"),
    NCItem.createItem("comp_crystal_binder", "Crystal Binder"),
    NCItem.createItem("comp_energetic", "Energetic Blend"),
    NCItem.createItem("comp_NaF", "Sodium Fluoride"),
    NCItem.createItem("comp_KF", "Potassium Fluoride"),
    NCItem.createItem("comp_NaOH", "Sodium Hydroxide"),
    NCItem.createItem("comp_KOH", "Potassium Hydroxide"),
    NCItem.createItem("comp_borax", "Borax"),
    NCItem.createItem("comp_dimensional", "Dimensional Blend"),
    NCItem.createItem("comp_CMn", "Carbon-Manganese Blend"),
    NCItem.createItem("comp_alugentum", "Alugentum Dust")
]);
NCItem.createItem("plate_basic", "Basic Plating");
NCItem.createItem("plate_adv", "Advanced Plating");
NCItem.createItem("plate_du", "DU Plating");
NCItem.createItem("plate_elite", "Elite Plating");
NCItem.createItem("wire_copper", "Copper Solenoid");
NCItem.createItem("wire_MnO2", "Magnesium Diboride Solenoid");
NCItem.createItem("bioplastic", "Bioplastic");
NCItem.createItem("servo", "Servomechanism");
NCItem.createItem("motor", "Electric Motor");
NCItem.createItem("actuator", "Linear Actuator");
NCItem.createItem("battery", "Lithium Ion Cell");
NCItem.createBlock("chassis", "Machine Chassis");
NCItem.createBlock("empty_frame", "Empty Frame");
NCItem.createBlock("steel_frame", "Steel Frame");
var setChassisModel = function (id, texture) {
    var render = new ICRender.Model();
    var model = BlockRenderer.createModel();
    model.addBox(0 / 16, 0 / 16, 0 / 16, 16 / 16, 3 / 16, 3 / 16, texture, 0);
    model.addBox(0 / 16, 0 / 16, 13 / 16, 16 / 16, 3 / 16, 16 / 16, texture, 0);
    model.addBox(0 / 16, 0 / 16, 0 / 16, 3 / 16, 3 / 16, 16 / 16, texture, 0);
    model.addBox(13 / 16, 0 / 16, 0 / 16, 16 / 16, 3 / 16, 16 / 16, texture, 0);
    model.addBox(0 / 16, 13 / 16, 0 / 16, 16 / 16, 16 / 16, 3 / 16, texture, 0);
    model.addBox(0 / 16, 13 / 16, 13 / 16, 16 / 16, 16 / 16, 16 / 16, texture, 0);
    model.addBox(0 / 16, 13 / 16, 0 / 16, 3 / 16, 16 / 16, 16 / 16, texture, 0);
    model.addBox(13 / 16, 13 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, texture, 0);
    model.addBox(0 / 16, 0 / 16, 0 / 16, 3 / 16, 16 / 16, 3 / 16, texture, 0);
    model.addBox(13 / 16, 0 / 16, 0 / 16, 16 / 16, 16 / 16, 3 / 16, texture, 0);
    model.addBox(0 / 16, 0 / 16, 13 / 16, 3 / 16, 16 / 16, 16 / 16, texture, 0);
    model.addBox(13 / 16, 0 / 16, 13 / 16, 16 / 16, 16 / 16, 16 / 16, texture, 0);
    model.addBox(2 / 16, 2 / 16, 2 / 16, 14 / 16, 14 / 16, 14 / 16, texture, 1);
    render.addEntry(model);
    BlockRenderer.setStaticICRender(id, -1, render);
    ItemModel.getFor(id, -1).setModel(render);
};
setChassisModel(NCID.chassis, "nc_chassis");
setChassisModel(NCID.steel_frame, "nc_steel_frame");
Callback.addCallback("PreLoaded", function () {
    var addIngotBlockRecipes = function (ingot, block) {
        Recipes2.addShapeless(block, [{ id: ingot, count: 9 }]);
        Recipes2.addShapeless({ id: ingot, count: 9, data: 0 }, [block]);
    };
    addIngotBlockRecipes(NCID.ingot_copper, NCID.block_copper);
    addIngotBlockRecipes(NCID.ingot_tin, NCID.block_tin);
    addIngotBlockRecipes(NCID.ingot_lead, NCID.block_lead);
    addIngotBlockRecipes(NCID.ingot_thorium, NCID.block_thorium);
    addIngotBlockRecipes(NCID.ingot_uranium, NCID.block_uranium);
    addIngotBlockRecipes(NCID.ingot_boron, NCID.block_boron);
    addIngotBlockRecipes(NCID.ingot_lithium, NCID.block_lithium);
    addIngotBlockRecipes(NCID.ingot_magnesium, NCID.block_magnesium);
    addIngotBlockRecipes(NCID.ingot_graphite, NCID.block_graphite);
    addIngotBlockRecipes(NCID.ingot_beryllium, NCID.block_beryllium);
    addIngotBlockRecipes(NCID.ingot_zirconium, NCID.block_zirconium);
    addIngotBlockRecipes(NCID.ingot_manganese, NCID.block_manganese);
    addIngotBlockRecipes(NCID.ingot_aluminum, NCID.block_aluminum);
    addIngotBlockRecipes(NCID.ingot_silver, NCID.block_silver);
    addIngotBlockRecipes(NCID.T230, NCID.block_thorium230);
    addIngotBlockRecipes(NCID.U238, NCID.block_uranium238);
    addIngotBlockRecipes(NCID.N237, NCID.block_neptunium237);
    addIngotBlockRecipes(NCID.P242, NCID.block_plutonium242);
    addIngotBlockRecipes(NCID.A243, NCID.block_americium243);
    addIngotBlockRecipes(NCID.Cm246, NCID.block_curium246);
    addIngotBlockRecipes(NCID.B247, NCID.block_berkelium247);
    addIngotBlockRecipes(NCID.Cf252, NCID.block_californium252);
    Recipes2.addFurnace(NCID.ore_copper, NCID.ingot_copper);
    Recipes2.addFurnace(NCID.ore_tin, NCID.ingot_tin);
    Recipes2.addFurnace(NCID.ore_lead, NCID.ingot_lead);
    Recipes2.addFurnace(NCID.ore_thorium, NCID.ingot_thorium);
    Recipes2.addFurnace(NCID.ore_uranium, NCID.ingot_uranium);
    Recipes2.addFurnace(NCID.ore_boron, NCID.ingot_boron);
    Recipes2.addFurnace(NCID.ore_lithium, NCID.ingot_lithium);
    Recipes2.addFurnace(NCID.ore_magnesium, NCID.ingot_magnesium);
    Recipes2.addFurnace(NCID.dust_copper, NCID.ingot_copper);
    Recipes2.addFurnace(NCID.dust_tin, NCID.ingot_tin);
    Recipes2.addFurnace({ id: NCID.dust_lead, data: 0 }, NCID.ingot_lead);
    Recipes2.addFurnace(NCID.dust_thorium, NCID.ingot_thorium);
    Recipes2.addFurnace(NCID.dust_uranium, NCID.ingot_uranium);
    Recipes2.addFurnace(NCID.dust_boron, NCID.ingot_boron);
    Recipes2.addFurnace(NCID.dust_lithium, NCID.ingot_lithium);
    Recipes2.addFurnace(NCID.dust_magnesium, NCID.ingot_magnesium);
    Recipes2.addFurnace(NCID.dust_graphite, NCID.ingot_graphite);
    Recipes2.addFurnace(NCID.dust_beryllium, NCID.ingot_beryllium);
    Recipes2.addFurnace(NCID.dust_zirconium, NCID.ingot_zirconium);
    Recipes2.addFurnace(NCID.dust_manganese, NCID.ingot_manganese);
    Recipes2.addFurnace(NCID.dust_aluminum, NCID.ingot_aluminum);
    Recipes2.addFurnace(NCID.dust_silver, NCID.ingot_silver);
    Recipes2.addFurnace(NCID.dust_manganese_oxide, NCID.ingot_manganese_oxide);
    Recipes2.addFurnace(NCID.dust_manganese_dioxide, NCID.ingot_manganese_dioxide);
    Recipes2.addShapeless({ id: NCID.comp_crystal_binder, count: 2 }, [
        NCID.dust_rhodochrosite,
        NCID.comp_CaSO4,
        NCID.dust_obsidian,
        NCID.dust_magnesium
    ]);
    Recipes2.addShapeless({ id: NCID.comp_energetic, count: 2 }, [
        "redstone",
        "glowstone_dust"
    ]);
    Recipes2.addShapeless({ id: NCID.comp_dimensional, count: 2 }, [
        { id: NCID.dust_obsidian, count: 4 },
        NCID.dust_endstone
    ]);
    Recipes2.addShapeless({ id: NCID.comp_CMn, count: 2 }, [
        NCID.dust_graphite,
        NCID.dust_manganese
    ]);
    Recipes2.addShaped({ id: NCID.plate_basic, count: 2 }, "ab:ba", {
        a: NCID.ingot_lead,
        b: NCID.dust_graphite
    });
    Recipes2.addShaped(NCID.plate_adv, "aba:bcb:aba", {
        a: "redstone",
        b: NCID.alloy_tough,
        c: NCID.plate_basic
    });
    Recipes2.addShaped(NCID.plate_du, "aba:bcb:aba", {
        a: NCID.dust_sulfur,
        b: NCID.U238,
        c: NCID.plate_adv
    });
    Recipes2.addShaped(NCID.plate_elite, "aba:bcb:aba", {
        a: NCID.comp_crystal_binder,
        b: NCID.ingot_boron,
        c: NCID.plate_du
    });
    Recipes2.addShaped({ id: NCID.wire_copper, count: 2 }, "aa:bb:aa", {
        a: NCID.ingot_copper,
        b: "iron_ingot"
    });
    Recipes2.addShaped({ id: NCID.wire_MnO2, count: 2 }, "aa:bb:aa", {
        a: NCID.alloy_MgB2,
        b: NCID.alloy_tough
    });
    Recipes2.addShaped(NCID.servo, "a_a:bcb:cdc", {
        a: NCID.alloy_ferroboron,
        b: "redstone",
        c: NCID.alloy_steel,
        d: NCID.ingot_copper
    });
    Recipes2.addShaped(NCID.motor, "aab:ccd:aab", {
        a: NCID.alloy_steel,
        b: "gold_nugget",
        c: NCID.wire_copper,
        d: "iron_ingot"
    });
    Recipes2.addShaped(NCID.actuator, "__a:bc_:db_", {
        a: NCID.alloy_steel,
        b: NCID.alloy_ferroboron,
        c: "piston",
        d: NCID.ingot_copper
    });
    Recipes2.addShaped(NCID.battery, "aaa:bcb:ddd", {
        a: NCID.alloy_hard_carbon,
        b: NCID.alloy_ferroboron,
        c: NCID.ingot_lithium,
        d: NCID.alloy_LiMnO2
    });
    Recipes2.addShaped(NCID.chassis, "aba:bcb:aba", {
        a: NCID.ingot_lead,
        b: NCID.alloy_steel,
        c: NCID.alloy_tough
    });
    Recipes2.addShaped(NCID.empty_frame, "aba:c_c:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_tin,
        c: "iron_ingot"
    });
    Recipes2.addShaped(NCID.steel_frame, "aba:bcb:aba", {
        a: NCID.alloy_steel,
        b: NCID.alloy_tough,
        c: NCID.alloy_bronze
    });
});
NCItem.createItem("upg_speed", "Speed Upgrade");
NCItem.createItem("upg_energy", "Energy Upgrade");
NCItem.createBlocks("reactor_casing", [
    { name: "Fission Reactor Casing", texture: [["nc_reactor_casing", 0]] },
    { name: "Transparent Fission Reactor Casing", texture: [["nc_reactor_casing_transparent", 0]] }
]);
ConnectedTexture.setModelForGlass(NCID.reactor_casing, 1, "nc_reactor_casing_transparent");
NCItem.createBlock("reactor_cell", "Reactor Cell");
Item.addCreativeGroup("nc_cooler", "Fission Cooler", [
    NCItem.createBlock("cooler_empty", "Empty Cooler"),
    NCItem.createBlock("cooler_water", "Water Cooler"),
    NCItem.createBlock("cooler_redstone", "Redstone Cooler"),
    NCItem.createBlock("cooler_quartz", "Quartz Cooler"),
    NCItem.createBlock("cooler_gold", "Gold Cooler"),
    NCItem.createBlock("cooler_glowstone", "Glowstone Cooler"),
    NCItem.createBlock("cooler_lapis", "Lapis Cooler"),
    NCItem.createBlock("cooler_diamond", "Diamond Cooler"),
    NCItem.createBlock("cooler_helium", "Helium Cooler"),
    NCItem.createBlock("cooler_enderium", "Enderium Cooler"),
    NCItem.createBlock("cooler_cryotheum", "Cryotheum Cooler"),
    NCItem.createBlock("cooler_iron", "Iron Cooler"),
    NCItem.createBlock("cooler_emerald", "Emerald Cooler"),
    NCItem.createBlock("cooler_copper", "Copper Cooler"),
    NCItem.createBlock("cooler_tin", "Tin Cooler"),
    NCItem.createBlock("cooler_magnesium", "Magnesium Cooler")
]);
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.upg_speed, "aba:bcb:aba", {
        a: "lapis_lazuli",
        b: "redstone",
        c: "heavy_weighted_pressure_plate"
    });
    Recipes2.addShaped(NCID.upg_energy, "aba:bcb:aba", {
        a: NCID.dust_obsidian,
        b: NCID.dust_quartz,
        c: "light_weighted_pressure_plate"
    });
    Recipes2.addShaped({ id: NCID.reactor_casing, count: 4 }, "_a_:aba:_a_", {
        a: NCID.plate_basic,
        b: NCID.alloy_tough
    });
    Recipes2.addShapeless(NCID.reactor_casing, [{ id: NCID.reactor_casing, data: 1 }]);
    Recipes2.addShaped({ id: NCID.reactor_casing, data: 1, count: 4 }, "aba:bcb:aba", {
        a: "glass",
        b: NCID.plate_basic,
        c: NCID.alloy_tough
    });
    Recipes2.addShapeless({ id: NCID.reactor_casing, data: 1 }, [
        { id: NCID.reactor_casing, data: 0 },
        "glass"
    ]);
    Recipes2.addShaped(NCID.reactor_cell, "aba:b_b:aba", {
        a: NCID.alloy_tough,
        b: "glass"
    });
    Recipes2.addShaped({ id: NCID.cooler_empty, count: 2 }, "aba:b_b:aba", {
        a: NCID.alloy_tough,
        b: NCID.alloy_steel
    });
    Recipes2.addShaped(NCID.cooler_redstone, "_a_:bcb:_a_", {
        a: "redstone_block",
        b: "redstone",
        c: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_quartz, "aba:bcb:aba", {
        a: NCID.dust_quartz,
        b: "quartz_block",
        c: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_gold, "aaa:aba:aaa", {
        a: "gold_ingot",
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_glowstone, "aba:bcb:aba", {
        a: "glowstone_dust",
        b: "glowstone",
        c: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_lapis, "aba", {
        a: "lapis_block",
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_diamond, "aaa:aba:aaa", {
        a: "diamond",
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_enderium, "aaa:aba:aaa", {
        a: NCID.alloy_enderium,
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_cryotheum, "aaa:bcb:aaa", {
        a: "blue_ice",
        b: "redstone",
        c: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_iron, "aaa:aba:aaa", {
        a: "iron_ingot",
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_emerald, "aaa:_b_:aaa", {
        a: "emerald",
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_copper, "aaa:aba:aaa", {
        a: NCID.ingot_copper,
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_tin, "aaa:aba:aaa", {
        a: NCID.ingot_tin,
        b: NCID.cooler_empty
    });
    Recipes2.addShaped(NCID.cooler_magnesium, "aaa:aba:aaa", {
        a: NCID.ingot_magnesium,
        b: NCID.cooler_empty
    });
});
Item.addCreativeGroup("ores", Translation.translate("Ores"), [
    NCItem.createBlock("ore_copper", "Copper Ore", "oreCopper"),
    NCItem.createBlock("ore_tin", "Tin Ore", "oreTin"),
    NCItem.createBlock("ore_lead", "Lead Ore", "oreLead"),
    NCItem.createBlock("ore_thorium", "Thorium Ore", "oreThorium"),
    NCItem.createBlock("ore_uranium", "Uranium Ore", "oreUranium"),
    NCItem.createBlock("ore_boron", "Boron Ore", "oreBoron"),
    NCItem.createBlock("ore_lithium", "Lithium Ore", "oreLithium"),
    NCItem.createBlock("ore_magnesium", "Magnesium Ore", "oreMagnesium")
]);
ToolAPI.registerBlockMaterial(NCID.ore_copper, "stone", 2, true);
ToolAPI.registerBlockMaterial(NCID.ore_tin, "stone", 2, true);
ToolAPI.registerBlockMaterial(NCID.ore_lead, "stone", 2, true);
ToolAPI.registerBlockMaterial(NCID.ore_thorium, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_uranium, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_boron, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_lithium, "stone", 3, true);
ToolAPI.registerBlockMaterial(NCID.ore_magnesium, "stone", 3, true);
Block.setDestroyLevel(NCID.ore_copper, 2);
Block.setDestroyLevel(NCID.ore_tin, 2);
Block.setDestroyLevel(NCID.ore_lead, 2);
Block.setDestroyLevel(NCID.ore_thorium, 3);
Block.setDestroyLevel(NCID.ore_uranium, 3);
Block.setDestroyLevel(NCID.ore_boron, 3);
Block.setDestroyLevel(NCID.ore_lithium, 3);
Block.setDestroyLevel(NCID.ore_magnesium, 3);
//ToolLib.addBlockDropOnExplosion(namedID);
var genetateOre = function (chunkX, chunkZ, random, id, prop) {
    if (prop.enabled) {
        for (var i = 0; i < prop.rate; i++) {
            GenerationUtils.generateOre(chunkX * 16 + random.nextInt(16), random.nextInt(prop.maxY - prop.minY + 1) - prop.minY, chunkZ * 16 + random.nextInt(16), id, 0, prop.size, false, random.nextInt());
        }
    }
};
Callback.addCallback("GenerateChunk", function (chunkX, chunkZ, random) {
    genetateOre(chunkX, chunkZ, random, NCID.ore_copper, NCConfig.ore_copper);
    genetateOre(chunkX, chunkZ, random, NCID.ore_tin, NCConfig.ore_tin);
    genetateOre(chunkX, chunkZ, random, NCID.ore_lead, NCConfig.ore_lead);
    genetateOre(chunkX, chunkZ, random, NCID.ore_thorium, NCConfig.ore_thorium);
    genetateOre(chunkX, chunkZ, random, NCID.ore_uranium, NCConfig.ore_uranium);
    genetateOre(chunkX, chunkZ, random, NCID.ore_boron, NCConfig.ore_boron);
    genetateOre(chunkX, chunkZ, random, NCID.ore_lithium, NCConfig.ore_lithium);
    genetateOre(chunkX, chunkZ, random, NCID.ore_magnesium, NCConfig.ore_magnesium);
});
var ItemFluidCell = /** @class */ (function (_super) {
    __extends(ItemFluidCell, _super);
    function ItemFluidCell(stringID, liquid) {
        var _this = _super.call(this, stringID, LiquidRegistry.getLiquidName(liquid) + " Cell") || this;
        LiquidItemRegistry.registerItem(liquid, ItemID.nc_cell_empty, _this.id, 16000);
        return _this;
    }
    ItemFluidCell.prototype.onNameOverride = function (item, name) {
        return name + "\n§7" + (16000 - item.data) + " mB";
    };
    return ItemFluidCell;
}(NCItem.ItemInstance));
//FluidRegistry.genCellTex("water", LiquidRegistry.getLiquidUIBitmap("water", 16, 16));
//FluidRegistry.genCellTex("lava", LiquidRegistry.getLiquidUIBitmap("lava", 16, 16));
//FluidRegistry.genCellTex("milk", LiquidRegistry.getLiquidUIBitmap("milk", 16, 16));
Item.addCreativeGroup("nc_cell", "NC Cell", [
    NCItem.createItem("cell_empty", "Empty Cell"),
    ItemRegistry.registerItem(new ItemFluidCell("cell_water", "water")).id,
    ItemRegistry.registerItem(new ItemFluidCell("cell_lava", "lava")).id,
    ItemRegistry.registerItem(new ItemFluidCell("cell_milk", "milk")).id
]);
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped({ id: NCID.cell_empty, count: 2 }, "_a_:aba:_a_", {
        a: NCID.bioplastic,
        b: "glass_pane"
    });
});
FluidRegistry.register("oxygen", "Oxygen", "GAS", "#7E8CC8");
FluidRegistry.register("hydrogen", "Hydrogen", "GAS", "#B37AC4");
FluidRegistry.register("deuterium", "Deuterium", "GAS", "#9E6FEF");
FluidRegistry.register("tritium", "Tritium", "GAS", "#5DBBD6");
FluidRegistry.register("helium3", "Helium-3", "GAS", "#CBBB67");
FluidRegistry.register("helium", "Helium", "GAS", "#C57B81");
FluidRegistry.register("molten_boron", "Molten Boron", "MOLTEN", "#7D7D7D");
FluidRegistry.register("molten_boron10", "Molten Boron-10", "MOLTEN", "#7D7D7D");
FluidRegistry.register("molten_boron11", "Molten Boron-11", "MOLTEN", "#7D7D7D");
FluidRegistry.register("molten_lithium", "Molten Lithium", "MOLTEN", "#EFEFEF");
FluidRegistry.register("molten_lithium6", "Molten Lithium-6", "MOLTEN", "#EFEFEF");
FluidRegistry.register("molten_lithium7", "Molten Lithium-7", "MOLTEN", "#EFEFEF");
FluidRegistry.register("molten_steel", "Molten Steel", "MOLTEN", "#7B7B7B");
FluidRegistry.register("molten_ferroboron", "Molten Ferroboron", "MOLTEN", "#4A4A4A");
FluidRegistry.register("molten_tough", "Molten Tough Alloy", "MOLTEN", "#150F21");
FluidRegistry.register("molten_hard_carbon", "Molten Hard Carbon", "MOLTEN", "#195970");
FluidRegistry.register("molten_coal", "Liquefacted Coal", "MOLTEN", "#202020");
FluidRegistry.register("molten_beryllium", "Molten Beryllium", "MOLTEN", "#D4DBC2");
FluidRegistry.register("molten_manganese", "Molten Manganese", "MOLTEN", "#7284CC");
FluidRegistry.register("molten_manganese_dioxide", "Molten Manganese Dioxide", "MOLTEN", "#28211E");
FluidRegistry.register("molten_sulfur", "Molten Sulfur", "MOLTEN", "#DEDE7A");
FluidRegistry.register("molten_arsenic", "Molten Arsenic", "MOLTEN", "#818475");
FluidRegistry.register("liquid_helium", "Liquid Helium");
FluidRegistry.register("liquid_nitrogen", "Liquid Nitrogen", "LIQUID", "#31C23A");
//plasma
//neutron
FluidRegistry.register("ethanol", "Ethanol", "LIQUID", "#655140");
FluidRegistry.register("methanol", "Methanol", "LIQUID", "#71524C");
//radaway
//radaway_slow
FluidRegistry.register("nitrogen", "Nitrogen", "GAS", "#7CC37B");
FluidRegistry.register("fluorine", "Fluorine", "GAS", "#D3C75D");
FluidRegistry.register("carbon_dioxide", "Carbon Dioxide", "GAS", "#5C635A");
FluidRegistry.register("carbon_monoxide", "Carbon Monoxide", "GAS", "#4C5649");
FluidRegistry.register("ethene", "Ethylene", "GAS", "#FFE4A3");
FluidRegistry.register("fluoromethane", "Fluorimethane", "GAS", "#424C05");
FluidRegistry.register("ammonia", "Ammonia", "GAS", "#7AC3A0");
FluidRegistry.register("oxygen_difluoride", "Oxygen Difluoride", "GAS", "#EA1B01");
FluidRegistry.register("diborane", "Diborane", "GAS", "#CC6E8C");
FluidRegistry.register("sulfur_dioxide", "Sulfur Dioxide", "GAS", "#C3BC7A");
FluidRegistry.register("sulfur_trioxide", "Sulfur Trioxide", "GAS", "#D3AE5D");
FluidRegistry.register("hydrofluoric_acid", "Hydrofluoric Acid", "LIQUID", "#004C05");
FluidRegistry.register("boric_acid", "Boric Acid", "LIQUID", "#696939");
FluidRegistry.register("sulfuric_acid", "Sulfuric Acid", "LIQUID", "#454500");
FluidRegistry.register("boron_nitride_solution", "Boron Nitride Solution", "SALT_SOLUTION", "#6F8E5C");
FluidRegistry.register("fluorite_water", "Fluorite Water", "SALT_SOLUTION", "#8AB492");
FluidRegistry.register("calcium_sulfate_solution", "Calcium Sulfate Solution", "SALT_SOLUTION", "#B8B0A6");
FluidRegistry.register("sodium_fluoride_solution", "Sodium Fluoride Solution", "SALT_SOLUTION", "#C2B1A1");
FluidRegistry.register("potassium_fluoride_solution", "Potassium Fluoride Solution", "SALT_SOLUTION", "#C1C99D");
FluidRegistry.register("sodium_hydroxide_solution", "Sodium Hydroxide Solution", "SALT_SOLUTION", "#C2B7BB");
FluidRegistry.register("potassium_hydroxide_solution", "Potassium Hydroxide Solution", "SALT_SOLUTION", "#B8C6B0");
FluidRegistry.register("borax_solution", "Borax Solution", "SALT_SOLUTION", "#EEEEEE");
FluidRegistry.register("molten_LiF", "Molten Lithium Fluoride", "MOLTEN", "#CDCDCB");
FluidRegistry.register("molten_BeF2", "Molten Beryllium Fluoride", "MOLTEN", "#BEC6AA");
FluidRegistry.register("molten_FLiBe", "Molten FLiBe Salt Mixture", "MOLTEN", "#C1C8B0");
FluidRegistry.register("molten_NaOH", "Molten Sodium Hydroxide", "MOLTEN", "#C2B7BB");
FluidRegistry.register("molten_KOH", "Molten Potassium Hydroxide", "MOLTEN", "#B8C6B0");
FluidRegistry.register("molten_sodium", "Molten Sodium", "MOLTEN", "#C1898C");
FluidRegistry.register("molten_potassium", "Molten Potassium", "MOLTEN", "#B8C503");
FluidRegistry.register("coolant_NaK", "Eutectic NaK Alloy", "MOLTEN", "#FFE5BC");
FluidRegistry.register("hotcoolant_NaK", "Hot Eutectic NaK Alloy", "MOLTEN", "#FFD5AC");
FluidRegistry.register("molten_BAs", "Molten Boron Arsenide", "MOLTEN", "#9B9B89");
FluidRegistry.register("SiC_vapor", "Silicon Carbide Vapor", "GAS", "#78746A");
FluidRegistry.register("molten_alugentum", "Molten Alugentum", "MOLTEN", "#B5C9CB");
FluidRegistry.register("molten_alumina", "Molten Alumina", "MOLTEN", "#919880");
FluidRegistry.register("molten_aluminum", "Molten Aluminum", "MOLTEN", "#B5ECD5");
FluidRegistry.register("molten_silver", "Molten Silver", "MOLTEN", "#E2DAF6");
FluidRegistry.register("molten_ender", "Resonant Ender");
var ReactorPartRegistry = /** @class */ (function () {
    function ReactorPartRegistry() {
    }
    ReactorPartRegistry.register = function (id, reactorPart) {
        this.data[id] = reactorPart;
    };
    ReactorPartRegistry.get = function (id) {
        return this.data[id];
    };
    ReactorPartRegistry.data = {};
    return ReactorPartRegistry;
}());
var ReactorPart = /** @class */ (function () {
    function ReactorPart(parent, x, y, z) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = "";
        this.target = [];
    }
    ReactorPart.prototype.vector3 = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    ReactorPart.prototype.getNearParts = function () {
        var parts = ["", "", "", "", "", ""];
        var partType;
        for (var side = 0; side < 6; side++) {
            partType = this.parent.getPartType(this.target, this.vector3().add(Vector3.getDirection(side)));
            if (partType) {
                parts[side] = partType;
            }
        }
        return parts;
    };
    ReactorPart.prototype.isActive = function () {
        return true;
    };
    ReactorPart.prototype.getStatus = function (fuel) {
        return { power: 0, heat: 0 };
    };
    return ReactorPart;
}());
var ReactorCell = /** @class */ (function (_super) {
    __extends(ReactorCell, _super);
    function ReactorCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "cell";
        _this.target = ["cell", "moderator"];
        return _this;
    }
    ReactorCell.prototype.findAdjacentCells = function () {
        var cells = 0;
        var coords;
        var direction;
        var reactorPart;
        for (var side = 0; side < 6; side++) {
            coords = this.vector3();
            direction = Vector3.getDirection(side);
            while (true) {
                coords.add(direction);
                reactorPart = this.parent.getPart(coords);
                if (reactorPart) {
                    if (reactorPart.type === "moderator") {
                        continue;
                    }
                    if (reactorPart.type === "cell") {
                        cells++;
                    }
                }
                break;
            }
        }
        return cells;
    };
    ReactorCell.prototype.getStatus = function (fuel) {
        if (!fuel) {
            return { power: 0, heat: 0 };
        }
        var cells = this.findAdjacentCells();
        var moderators = this.getNearParts().filter(function (part) { return part === "moderator"; }).length;
        var powerMultiplier = cells + 1;
        var heatMultiplier = (cells + 1) * (cells + 2) / 2;
        powerMultiplier += moderators / 6 * (cells + 1);
        heatMultiplier += moderators / 3 * (cells + 1);
        return { power: fuel.power * powerMultiplier, heat: fuel.heat * heatMultiplier };
    };
    return ReactorCell;
}(ReactorPart));
var ReactorModerator = /** @class */ (function (_super) {
    __extends(ReactorModerator, _super);
    function ReactorModerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "moderator";
        _this.target = ["cell"];
        return _this;
    }
    ReactorModerator.prototype.isActive = function () {
        return this.getNearParts().includes("cell");
    };
    return ReactorModerator;
}(ReactorPart));
var ReactorCooler;
(function (ReactorCooler) {
    var Base = /** @class */ (function (_super) {
        __extends(Base, _super);
        function Base() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.target = [];
            return _this;
        }
        Base.prototype.isActive = function () {
            var parts = this.getNearParts();
            for (var i = 0; i < this.target.length; i++) {
                if (!parts.includes(this.target[i])) {
                    return false;
                }
            }
            return true;
        };
        Base.prototype.getStatus = function (fuel) {
            return { power: 0, heat: this.isActive() ? -this.cooling : 0 };
        };
        return Base;
    }(ReactorPart));
    ReactorCooler.Base = Base;
    var Water = /** @class */ (function (_super) {
        __extends(Water, _super);
        function Water() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_water";
            _this.target = ["cell", "moderator"];
            _this.cooling = Water.cooling;
            return _this;
        }
        Water.prototype.isActive = function () {
            var parts = this.getNearParts();
            return parts.includes("cell") || parts.includes("moderator");
        };
        Water.cooling = 60;
        Water.description = "Must be adjacent to at least one Reactor Cell or active moderator block.";
        return Water;
    }(Base));
    ReactorCooler.Water = Water;
    var Redstone = /** @class */ (function (_super) {
        __extends(Redstone, _super);
        function Redstone() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_redstone";
            _this.target = ["cell"];
            _this.cooling = Redstone.cooling;
            return _this;
        }
        Redstone.cooling = 90;
        Redstone.description = "Must be adjacent to at least one Reactor Cell.";
        return Redstone;
    }(Base));
    ReactorCooler.Redstone = Redstone;
    var Quartz = /** @class */ (function (_super) {
        __extends(Quartz, _super);
        function Quartz() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_quartz";
            _this.target = ["moderator"];
            _this.cooling = Quartz.cooling;
            return _this;
        }
        Quartz.cooling = 90;
        Quartz.description = "Must be adjacent to at least one active moderator block.";
        return Quartz;
    }(Base));
    ReactorCooler.Quartz = Quartz;
    var Gold = /** @class */ (function (_super) {
        __extends(Gold, _super);
        function Gold() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_gold";
            _this.target = ["cooler_water", "cooler_redstone"];
            _this.cooling = Gold.cooling;
            return _this;
        }
        Gold.cooling = 120;
        Gold.description = "Must be adjacent to at least one valid Water Cooler and one valid Redstone Cooler.";
        return Gold;
    }(Base));
    ReactorCooler.Gold = Gold;
    var Glowstone = /** @class */ (function (_super) {
        __extends(Glowstone, _super);
        function Glowstone() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_glowstone";
            _this.target = ["moderator"];
            _this.cooling = Glowstone.cooling;
            return _this;
        }
        Glowstone.prototype.isActive = function () {
            return this.getNearParts().filter(function (comp) { return comp === "moderator"; }).length >= 2;
        };
        Glowstone.cooling = 130;
        Glowstone.description = "Must be adjacent to at least two active moderator blocks.";
        return Glowstone;
    }(Base));
    ReactorCooler.Glowstone = Glowstone;
    var Lapis = /** @class */ (function (_super) {
        __extends(Lapis, _super);
        function Lapis() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_lapis";
            _this.target = ["cell", "casing"];
            _this.cooling = Lapis.cooling;
            return _this;
        }
        Lapis.cooling = 120;
        Lapis.description = "Must be adjacent to at least one Reactor Cell and one Reactor Casing.";
        return Lapis;
    }(Base));
    ReactorCooler.Lapis = Lapis;
    var Diamond = /** @class */ (function (_super) {
        __extends(Diamond, _super);
        function Diamond() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_diamond";
            _this.target = ["cooler_water", "cooler_quartz"];
            _this.cooling = Diamond.cooling;
            return _this;
        }
        Diamond.cooling = 150;
        Diamond.description = "Must be adjacent to at least one valid Water Cooler and one valid Quartz Cooler.";
        return Diamond;
    }(Base));
    ReactorCooler.Diamond = Diamond;
    var Helium = /** @class */ (function (_super) {
        __extends(Helium, _super);
        function Helium() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_helium";
            _this.target = ["cooler_redstone", "casing"];
            _this.cooling = Helium.cooling;
            return _this;
        }
        Helium.prototype.isActive = function () {
            var parts = this.getNearParts();
            return parts.filter(function (comp) { return comp === "cooler_redstone"; }).length === 1 && parts.includes("casing");
        };
        Helium.cooling = 140;
        Helium.description = "Must be adjacent to exactly one valid Redstone Cooler and at least one Reactor Casing.";
        return Helium;
    }(Base));
    ReactorCooler.Helium = Helium;
    var Enderium = /** @class */ (function (_super) {
        __extends(Enderium, _super);
        function Enderium() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_enderium";
            _this.target = ["casing"];
            _this.cooling = Enderium.cooling;
            return _this;
        }
        Enderium.prototype.isActive = function () {
            return this.getNearParts().filter(function (comp) { return comp === "casing"; }).length === 3;
        };
        Enderium.cooling = 120;
        Enderium.description = "Must be adjacent to exactly three Reactor Casings at exactly one vertex.";
        return Enderium;
    }(Base));
    ReactorCooler.Enderium = Enderium;
    var Cryotheum = /** @class */ (function (_super) {
        __extends(Cryotheum, _super);
        function Cryotheum() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_cryotheum";
            _this.target = ["cell"];
            _this.cooling = Cryotheum.cooling;
            return _this;
        }
        Cryotheum.prototype.isActive = function () {
            return this.getNearParts().filter(function (comp) { return comp === "cell"; }).length >= 2;
        };
        Cryotheum.cooling = 160;
        Cryotheum.description = "Must be adjacent to at least two Reactor Cells.";
        return Cryotheum;
    }(Base));
    ReactorCooler.Cryotheum = Cryotheum;
    var Iron = /** @class */ (function (_super) {
        __extends(Iron, _super);
        function Iron() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_iron";
            _this.target = ["cooler_gold"];
            _this.cooling = Iron.cooling;
            return _this;
        }
        Iron.cooling = 80;
        Iron.description = "Must be adjacent to at least one valid Gold Cooler.";
        return Iron;
    }(Base));
    ReactorCooler.Iron = Iron;
    var Emerald = /** @class */ (function (_super) {
        __extends(Emerald, _super);
        function Emerald() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_emerald";
            _this.target = ["moderator", "cell"];
            _this.cooling = Emerald.cooling;
            return _this;
        }
        Emerald.cooling = 160;
        Emerald.description = "Must be adjacent to at least one active moderator block and one Reactor Cell.";
        return Emerald;
    }(Base));
    ReactorCooler.Emerald = Emerald;
    var Copper = /** @class */ (function (_super) {
        __extends(Copper, _super);
        function Copper() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_copper";
            _this.target = ["cooler_glowstone"];
            _this.cooling = Copper.cooling;
            return _this;
        }
        Copper.cooling = 80;
        Copper.description = "Must be adjacent to at least one valid Glowstone Cooler.";
        return Copper;
    }(Base));
    ReactorCooler.Copper = Copper;
    var Tin = /** @class */ (function (_super) {
        __extends(Tin, _super);
        function Tin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_tin";
            _this.target = ["cooler_lapis"];
            _this.cooling = Tin.cooling;
            return _this;
        }
        Tin.prototype.isActive = function () {
            var parts = this.getNearParts();
            return parts[0] === "cooler_lapis" && parts[1] === "cooler_lapis" || parts[2] === "cooler_lapis" && parts[3] === "cooler_lapis" || parts[4] === "cooler_lapis" && parts[5] === "cooler_lapis";
        };
        Tin.cooling = 120;
        Tin.description = "Must be adjacent to at least two valid Lapis Coolers along a common axis.";
        return Tin;
    }(Base));
    ReactorCooler.Tin = Tin;
    var Magnesium = /** @class */ (function (_super) {
        __extends(Magnesium, _super);
        function Magnesium() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "cooler_magnesium";
            _this.target = ["casing", "moderator"];
            _this.cooling = Magnesium.cooling;
            return _this;
        }
        Magnesium.cooling = 110;
        Magnesium.description = "Must be adjacent to at least one Reactor Casing and one active moderator block.";
        return Magnesium;
    }(Base));
    ReactorCooler.Magnesium = Magnesium;
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
    var coolerNameOverride = function (item, name) {
        //@ts-ignore
        var coolerData = ReactorPartRegistry.get(item.id);
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
})(ReactorCooler || (ReactorCooler = {}));
var ReactorDesign = /** @class */ (function () {
    function ReactorDesign(region, from, to) {
        this.sizeX = to.x - from.x - 1;
        this.sizeY = to.y - from.y - 1;
        this.sizeZ = to.z - from.z - 1;
        this.design = [];
        var x = 0;
        var y = 0;
        var z = 0;
        var reactorPart;
        for (x = 0; x < this.sizeX; x++) {
            this.design[x] = [];
            for (y = 0; y < this.sizeY; y++) {
                this.design[x][y] = [];
                for (z = 0; z < this.sizeZ; z++) {
                    reactorPart = ReactorPartRegistry.get(region.getBlockId(from.x + x + 1, from.y + y + 1, from.z + z + 1));
                    this.design[x][y][z] = reactorPart ? new reactorPart(this, x, y, z) : null;
                }
            }
        }
    }
    ReactorDesign.prototype.isCasing = function (x, y, z) {
        if (typeof x !== "number") {
            return this.isCasing(x.x, x.y, x.z);
        }
        return x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY || z < 0 || z >= this.sizeZ;
    };
    ReactorDesign.prototype.getPart = function (x, y, z) {
        if (typeof x !== "number") {
            return this.getPart(x.x, x.y, x.z);
        }
        if (this.isCasing(x, y, z)) {
            return null;
        }
        return this.design[x][y][z] || null;
    };
    ReactorDesign.prototype.getPartType = function (target, x, y, z) {
        if (typeof x !== "number") {
            return this.getPartType(target, x.x, x.y, x.z);
        }
        if (this.isCasing(x, y, z)) {
            return "casing";
        }
        var part = this.getPart(x, y, z);
        if (part && target.includes(part.type) && part.isActive()) {
            return part.type;
        }
        return null;
    };
    ReactorDesign.prototype.getStatus = function (fuelID) {
        var status = { cells: 0, power: 0, heat: 0, cooling: 0 };
        var fuel = FissionFuel.getParams(fuelID);
        var part;
        var partStatus;
        var x = 0;
        var y = 0;
        var z = 0;
        for (x = 0; x < this.sizeX; x++) {
            for (y = 0; y < this.sizeY; y++) {
                for (z = 0; z < this.sizeZ; z++) {
                    part = this.getPart(x, y, z);
                    if (part) {
                        partStatus = part.getStatus(fuel);
                        status.power += partStatus.power;
                        if (partStatus.heat > 0) {
                            status.heat += partStatus.heat;
                        }
                        else {
                            status.cooling -= partStatus.heat;
                        }
                        part.type === "cell" && status.cells++;
                    }
                }
            }
        }
        return status;
    };
    return ReactorDesign;
}());
NCItem.createBlock("fission_controller", "Fission Controller", [0, 1, 3, 4, 2, 2]);
TileRenderer.setStandardModelWithRotation(NCID.fission_controller, 2, [0, 1, 3, 4, 2, 2].map(function (meta) { return ["nc_fission_controller", meta]; }));
TileRenderer.registerModelWithRotation(NCID.fission_controller, 2, [0, 1, 3, 5, 2, 2].map(function (meta) { return ["nc_fission_controller", meta]; }));
TileRenderer.setRotationFunction(NCID.fission_controller);
var NCWindow;
(function (NCWindow) {
    var font = { color: Color.rgb(255, 170, 0), size: 6 };
    var winMaker = new NCWindowMaker("Fission Controller", 176, 97, "nc.frame_dark_bold")
        .addSlot("slotSource", 55, 34, 18, "nc.slot_dark")
        .addSlot("slotResult", 111, 30, 26, "nc.slot_dark_large")
        .addDrawing("", { type: "frame", x: 7, y: 5, width: 8, height: 87, bitmap: "nc.frame_dark" })
        .addDrawing("", { type: "frame", x: 17, y: 5, width: 8, height: 87, bitmap: "nc.frame_dark" })
        .addElements("scaleEnergy", { type: "scale", x: 8, y: 6, bitmap: "nc.fission_energy", direction: WindowMaker.SCALE_UP })
        .addElements("scaleHeat", { type: "scale", x: 18, y: 6, bitmap: "nc.fission_heat", direction: WindowMaker.SCALE_UP })
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_fission_bg", "nc.prog_fission")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage("nc_fission");
        }
    })
        .addElements("textTitle", { type: "text", x: 92, y: 3, font: __assign(__assign({}, font), { align: UI.Font.ALIGN_CENTER }) })
        .addElements("textFuel", { type: "text", x: 32, y: 80, multiline: true, font: font })
        .addElements("textStatus", { type: "text", x: 168, y: 80, multiline: true, font: __assign(__assign({}, font), { align: UI.Font.ALIGN_END }) });
    NCWindow.FissionController = winMaker.makeWindow();
})(NCWindow || (NCWindow = {}));
var TileFissionController = /** @class */ (function (_super) {
    __extends(TileFissionController, _super);
    function TileFissionController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            heat: 0,
            fuelID: 0,
            progress: 0,
            isEnabled: false
        };
        return _this;
    }
    TileFissionController.prototype.getScreenByName = function () {
        return NCWindow.FissionController;
    };
    TileFissionController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.updateStatus();
    };
    TileFissionController.prototype.setupContainer = function () {
        StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
            if (name === "slotSource")
                return FissionFuel.isFuel(id) && data === 0;
            return false;
        });
    };
    TileFissionController.prototype.onRedstoneUpdate = function (signal) {
        var enabled = signal > 0;
        if (enabled && !this.data.isEnabled) {
            this.updateStatus();
        }
        this.data.isEnabled = enabled;
    };
    TileFissionController.prototype.getCasingShape = function () {
        var from = { x: this.x, y: this.y, z: this.z };
        var to = { x: this.x, y: this.y, z: this.z };
        var facing = this.networkData.getInt("facing");
        var arrayL = [];
        var arrayR = [];
        var lenL = 0;
        var lenR = 0;
        var height = 0;
        var depth = 0;
        switch (facing) {
            case EBlockSide.NORTH:
            case EBlockSide.SOUTH:
                while (this.region.getBlockId(this.x, this.y + (++height), this.z) === NCID.reactor_casing) {
                    lenL = lenR = 0;
                    while (this.region.getBlockId(this.x - (++lenL), this.y + height, this.z) === NCID.reactor_casing)
                        ;
                    while (this.region.getBlockId(this.x + (++lenR), this.y + height, this.z) === NCID.reactor_casing)
                        ;
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                while (this.region.getBlockId(this.x, this.y, this.z + (facing === EBlockSide.NORTH ? (++depth) : (--depth))) === NCID.reactor_casing) {
                    lenL = lenR = 0;
                    while (this.region.getBlockId(this.x - (++lenL), this.y, this.z + depth) === NCID.reactor_casing)
                        ;
                    while (this.region.getBlockId(this.x + (++lenR), this.y, this.z + depth) === NCID.reactor_casing)
                        ;
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                from.x -= Math.min.apply(Math, arrayL);
                to.x += Math.min.apply(Math, arrayR);
                depth < 0 ? from.z += depth : to.z += depth;
                break;
            case EBlockSide.WEST:
            case EBlockSide.EAST:
                while (this.region.getBlockId(this.x, this.y + (++height), this.z) === NCID.reactor_casing) {
                    lenL = lenR = 0;
                    while (this.region.getBlockId(this.x, this.y + height, this.z - (++lenL)) === NCID.reactor_casing)
                        ;
                    while (this.region.getBlockId(this.x, this.y + height, this.z + (++lenR)) === NCID.reactor_casing)
                        ;
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                while (this.region.getBlockId(this.x + (facing === EBlockSide.WEST ? (++depth) : (--depth)), this.y, this.z) === NCID.reactor_casing) {
                    lenL = lenR = 0;
                    while (this.region.getBlockId(this.x + depth, this.y, this.z - (++lenL)) === NCID.reactor_casing)
                        ;
                    while (this.region.getBlockId(this.x + depth, this.y, this.z + (++lenR)) === NCID.reactor_casing)
                        ;
                    arrayL.push(lenL);
                    arrayR.push(lenR);
                }
                from.z -= Math.min.apply(Math, arrayL);
                to.z += Math.min.apply(Math, arrayR);
                depth < 0 ? from.x += depth : to.x += depth;
                break;
        }
        to.y += height;
        return { from: from, to: to };
    };
    TileFissionController.prototype.isValidStructure = function (from, to) {
        if (to.x - from.x - 1 < 1 || to.y - from.y - 1 < 1 || to.z - from.z - 1 < 1) {
            return false;
        }
        var i = 0;
        var j = 0;
        for (i = from.x; i <= to.x; i++) {
            for (j = from.z; j <= to.z; j++) {
                if (i === from.x || i === to.x || j === from.z || j === to.z) {
                    if (this.region.getBlockId(i, from.y, j) === this.blockID && (i !== this.x || j !== this.z)) {
                        return false;
                    }
                }
                else {
                    if (this.region.getBlockId(i, from.y, j) !== NCID.reactor_casing || this.region.getBlockId(i, to.y, j) !== NCID.reactor_casing) {
                        return false;
                    }
                }
            }
        }
        for (i = from.x + 1; i <= to.x - 1; i++) {
            for (j = from.y + 1; j <= to.y - 1; j++) {
                if (this.region.getBlockId(i, j, from.z) !== NCID.reactor_casing || this.region.getBlockId(i, j, to.z) !== NCID.reactor_casing) {
                    return false;
                }
            }
        }
        for (i = from.y + 1; i <= to.y - 1; i++) {
            for (j = from.z + 1; j <= to.z - 1; j++) {
                if (this.region.getBlockId(from.x, i, j) !== NCID.reactor_casing || this.region.getBlockId(to.x, i, j) !== NCID.reactor_casing) {
                    return false;
                }
            }
        }
        return true;
    };
    TileFissionController.prototype.explodeReactor = function () {
        var shape = this.getCasingShape();
        var x;
        var y;
        var z;
        for (x = shape.from.x + 1; x < shape.to.x - 1; x++) {
            for (y = shape.from.y + 1; y < shape.to.y - 1; y++) {
                for (z = shape.from.z + 1; z < shape.to.z - 1; z++) {
                    if (Math.random() < 0.2) {
                        this.region.setBlock(x, y, z, VanillaBlockID.lava, 0);
                    }
                    else {
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
    };
    TileFissionController.prototype.getReactorCapacity = function () {
        return this.networkData.getInt("statSizeX") * this.networkData.getInt("statSizeY") * this.networkData.getInt("statSizeZ");
    };
    TileFissionController.prototype.getEnergyStorage = function () {
        return this.getReactorCapacity() * 64000 | 0;
    };
    TileFissionController.prototype.getHeatStorage = function () {
        return this.getReactorCapacity() * 25000 | 0;
    };
    TileFissionController.prototype.resetStatus = function () {
        this.networkData.putInt("statSizeX", 0);
        this.networkData.putInt("statSizeY", 0);
        this.networkData.putInt("statSizeZ", 0);
        this.networkData.putInt("statCells", 0);
        this.networkData.putInt("statPower", 0);
        this.networkData.putInt("statHeat", 0);
        this.networkData.putInt("statCooling", 0);
        this.networkData.sendChanges();
    };
    TileFissionController.prototype.updateStatus = function () {
        var shape = this.getCasingShape();
        if (this.isValidStructure(shape.from, shape.to)) {
            var design = new ReactorDesign(this.region, shape.from, shape.to);
            var status = design.getStatus(this.data.fuelID);
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
    };
    TileFissionController.prototype.onTick = function () {
        StorageInterface.checkHoppers(this);
        if (this.data.fuelID === 0) {
            var slotSource = this.container.getSlot("slotSource");
            if (FissionFuel.isFuel(slotSource.id)) {
                this.data.fuelID = slotSource.id;
                slotSource.count--;
                slotSource.markDirty();
                slotSource.validate();
            }
            this.data.progress = 0;
        }
        var status = {
            cells: this.networkData.getInt("statCells"),
            power: this.networkData.getInt("statPower"),
            heat: this.networkData.getInt("statHeat"),
            cooling: this.networkData.getInt("statCooling")
        };
        var energyStorage = this.getEnergyStorage();
        var heatStorage = this.getHeatStorage();
        var fuelData = FissionFuel.getParams(this.data.fuelID);
        var isActive = false;
        if (fuelData) {
            if (this.data.isEnabled) {
                if (this.data.progress === 0) {
                    this.updateStatus();
                    status.cells = this.networkData.getInt("statCells");
                    status.power = this.networkData.getInt("statPower");
                    status.heat = this.networkData.getInt("statHeat");
                    status.cooling = this.networkData.getInt("statCooling");
                    energyStorage = this.getEnergyStorage();
                    heatStorage = this.getHeatStorage();
                }
                if (status.cells > 0) {
                    isActive = true;
                    this.data.energy = Math.min(this.data.energy + status.power, energyStorage);
                    this.data.heat += status.heat;
                    this.data.progress += status.cells;
                    if (this.data.progress >= fuelData.time) {
                        var slotResult = this.container.getSlot("slotResult");
                        if (slotResult.id === 0 || slotResult.id === this.data.fuelID && slotResult.data === 1 && slotResult.count < 64) {
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
        else {
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
    };
    return TileFissionController;
}(GeneratorBase));
MachineRegistry.registerPrototype(NCID.fission_controller, new TileFissionController());
StorageInterface.createInterface(NCID.fission_controller, {
    slots: {
        slotSource: { input: true, isValid: function (item) { return FissionFuel.isFuel(item.id) && item.data === 0; } },
        slotResult: { output: true }
    }
});
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.fission_controller, "aba:cdc:aba", {
        a: NCID.plate_adv,
        b: NCID.wire_MnO2,
        c: NCID.furnace,
        d: NCID.chassis
    });
});
var _a;
NCItem.createBlock("decay_generator", "Decay Generator");
var DecayGenerator = /** @class */ (function (_super) {
    __extends(DecayGenerator, _super);
    function DecayGenerator() {
        return _super.call(this) || this;
    }
    DecayGenerator.prototype.getEnergyStorage = function () {
        return 1600;
    };
    DecayGenerator.prototype.onInit = function () { };
    DecayGenerator.prototype.clientLoad = function () { };
    DecayGenerator.prototype.clientUnload = function () { };
    DecayGenerator.prototype.onTick = function () {
        if (World.getThreadTime() % 20 === 0) {
            var coords = void 0;
            var recipe = void 0;
            var produce = 0;
            for (var side = 0; side < 6; side++) {
                coords = World.getRelativeCoords(this.x, this.y, this.z, side);
                recipe = DecayGenerator.Recipe[this.blockSource.getBlockId(coords.x, coords.y, coords.z)];
                if (recipe) {
                    produce += recipe.power;
                    if (recipe.lifetime * Math.random() < 1) {
                        this.blockSource.setBlock(coords.x, coords.y, coords.z, recipe.become, 0);
                    }
                }
            }
            this.data.energy = Math.min(this.data.energy + produce, this.getEnergyStorage());
        }
    };
    DecayGenerator.prototype.onItemUse = function (coords, item, playerUid) {
        return true;
    };
    DecayGenerator.Recipe = (_a = {},
        _a[NCID.block_thorium] = { become: NCID.block_lead, power: 80, lifetime: 62.4 * 60 },
        _a[NCID.block_uranium] = { become: NCID.block_uranium238, power: 80, lifetime: 20.4 * 60 },
        _a[NCID.block_thorium230] = { become: NCID.block_lead, power: 15, lifetime: 36.6 * 60 },
        _a[NCID.block_uranium238] = { become: NCID.block_thorium230, power: 5, lifetime: 39.6 * 60 },
        _a[NCID.block_neptunium237] = { become: NCID.block_lead, power: 10, lifetime: 35.5 * 60 },
        _a[NCID.block_plutonium242] = { become: NCID.block_uranium238, power: 15, lifetime: 12.8 * 60 },
        _a[NCID.block_americium243] = { become: NCID.block_lead, power: 20, lifetime: 52.8 * 60 },
        _a[NCID.block_curium246] = { become: NCID.block_plutonium242, power: 25, lifetime: 8.5 * 60 },
        _a[NCID.block_berkelium247] = { become: NCID.block_americium243, power: 30, lifetime: 7.2 * 60 },
        _a[NCID.block_californium252] = { become: NCID.block_lead, power: 40, lifetime: 65.2 * 60 },
        _a);
    return DecayGenerator;
}(GeneratorBase));
MachineRegistry.registerPrototype(NCID.decay_generator, new DecayGenerator());
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.decay_generator, "aba:bcb:aba", {
        a: NCID.ingot_lead,
        b: "cobblestone",
        c: "redstone"
    });
});
/*
const testData: {[key: string]: number} = {};
const testArray: number[] = [];
Block.setRandomTickCallback(NCID.block_lead, (x: number, y: number, z: number, id: number, data: number, region: BlockSource) => {
    const key = x + ":" + y + ":" + z;
    const time = Debug.sysTime() / 1000 | 0;
    if(key in testData){
        testArray.push(time - testData[key]);
        const len = testArray.length;
        if(len === 0){
            return;
        }
        let sum = 0;
        for(let i = 0; i < len; i++){
            sum += testArray[i];
        }
        Game.message("min: " + Math.min(...testArray) + "s max: " + Math.max(...testArray) + "s avg: " + (sum / len | 0) + "s (" + len + ")");
    }
    testData[key] = time;
});
*/ 
Item.addCreativeGroup("nc_rtg", "RTG", [
    NCItem.createBlock("rtg_uranium", "Uranium RTG", [0, 0, 1]),
    NCItem.createBlock("rtg_plutonium", "Plutonium RTG", [0, 0, 1]),
    NCItem.createBlock("rtg_americium", "Americium RTG", [0, 0, 1]),
    NCItem.createBlock("rtg_californium", "Californium RTG", [0, 0, 1])
]);
var RTGenerator = /** @class */ (function (_super) {
    __extends(RTGenerator, _super);
    function RTGenerator(produce) {
        var _this = _super.call(this) || this;
        _this.produce = produce;
        return _this;
    }
    RTGenerator.prototype.getEnergyStorage = function () {
        return this.produce * 4;
    };
    RTGenerator.prototype.onInit = function () { };
    RTGenerator.prototype.clientLoad = function () { };
    RTGenerator.prototype.clientUnload = function () { };
    RTGenerator.prototype.onTick = function () {
        this.data.energy = Math.min(this.data.energy + this.produce, this.getEnergyStorage());
    };
    RTGenerator.prototype.onItemUse = function (coords, item, playerUid) {
        return true;
    };
    return RTGenerator;
}(GeneratorBase));
MachineRegistry.registerPrototype(NCID.rtg_uranium, new RTGenerator(4));
MachineRegistry.registerPrototype(NCID.rtg_plutonium, new RTGenerator(100));
MachineRegistry.registerPrototype(NCID.rtg_americium, new RTGenerator(50));
MachineRegistry.registerPrototype(NCID.rtg_californium, new RTGenerator(400));
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.rtg_uranium, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_graphite,
        c: NCID.block_uranium238
    });
    Recipes2.addShaped(NCID.rtg_plutonium, "aba:bcb:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.P238
    });
    Recipes2.addShaped(NCID.rtg_americium, "aba:bcb:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.A241
    });
    Recipes2.addShaped(NCID.rtg_californium, "aba:bcb:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.Cf250
    });
});
Item.addCreativeGroup("nc_solar", "Solar Panel", [
    NCItem.createBlock("solar_basic", "Basic Solar Panel", [1, 0, 1]),
    NCItem.createBlock("solar_adv", "Advanced Solar Panel", [1, 0, 1]),
    NCItem.createBlock("solar_du", "DU Solar Panel", [1, 0, 1]),
    NCItem.createBlock("solar_elite", "Elite Solar Panel", [1, 0, 1])
]);
var SolarPanel = /** @class */ (function (_super) {
    __extends(SolarPanel, _super);
    function SolarPanel(produce) {
        var _this = _super.call(this) || this;
        _this.produce = produce;
        return _this;
    }
    SolarPanel.prototype.getEnergyStorage = function () {
        return this.produce * 4;
    };
    SolarPanel.prototype.getGenerated = function () {
        return this.produce * (this.region.getLightLevel(this.x, this.y + 1, this.z) / 15) | 0;
    };
    SolarPanel.prototype.checkSky = function () {
        this.networkData.putBoolean("canSeeSky", this.region.canSeeSky(this.x, this.y + 1, this.z));
        this.networkData.sendChanges();
    };
    SolarPanel.prototype.onInit = function () {
        this.checkSky();
    };
    SolarPanel.prototype.clientLoad = function () { };
    SolarPanel.prototype.clientUnload = function () { };
    SolarPanel.prototype.onTick = function () {
        if ((World.getThreadTime() & 255) === 0) {
            this.checkSky();
        }
        if (this.networkData.getBoolean("canSeeSky")) {
            this.data.energy = Math.min(this.data.energy + this.getGenerated(), this.getEnergyStorage());
        }
    };
    SolarPanel.prototype.onItemUse = function (coords, item, playerUid) {
        return true;
    };
    return SolarPanel;
}(GeneratorBase));
MachineRegistry.registerPrototype(NCID.solar_basic, new SolarPanel(5));
MachineRegistry.registerPrototype(NCID.solar_adv, new SolarPanel(20));
MachineRegistry.registerPrototype(NCID.solar_du, new SolarPanel(80));
MachineRegistry.registerPrototype(NCID.solar_elite, new SolarPanel(320));
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.solar_basic, "aba:cdc:ece", {
        a: NCID.dust_graphite,
        b: NCID.dust_quartz,
        c: "heavy_weighted_pressure_plate",
        d: "lapis_lazuli",
        e: NCID.wire_copper
    });
    Recipes2.addShaped(NCID.solar_adv, "aba:ccc:ada", {
        a: NCID.plate_adv,
        b: NCID.dust_graphite,
        c: NCID.solar_basic,
        d: NCID.wire_copper
    });
    Recipes2.addShaped(NCID.solar_du, "aba:ccc:ada", {
        a: NCID.plate_du,
        b: NCID.dust_graphite,
        c: NCID.solar_adv,
        d: NCID.wire_MnO2
    });
    Recipes2.addShaped(NCID.solar_elite, "aba:ccc:ada", {
        a: NCID.plate_elite,
        b: NCID.gem_boron_arsenide,
        c: NCID.solar_du,
        d: NCID.wire_MnO2
    });
});
var _a;
NCItem.createBlock("furnace", "Nuclear Furnace", [0, 1, 0, 2, 0, 0]);
TileRenderer.setStandardModelWithRotation(NCID.furnace, 2, [0, 1, 0, 2, 0, 0].map(function (meta) { return ["nc_furnace", meta]; }));
TileRenderer.registerModelWithRotation(NCID.furnace, 2, [0, 1, 0, 3, 0, 0].map(function (meta) { return ["nc_furnace", meta]; }));
TileRenderer.setRotationFunction(NCID.furnace);
var NCWindow;
(function (NCWindow) {
    var winMaker = new NCWindowMaker("Nuclear Furnace", 176, 86, "nc.frame_dark_bold")
        .addSlot("slotFuel", 55, 52, 18, "nc.slot_dark")
        .addSlot("slotSource", 55, 16, 18, "nc.slot_dark")
        .addSlot("slotResult", 111, 30, 26, "nc.slot_dark_large")
        .addScale("scaleFire", 57, 36, "nc.fire_bg", "nc.fire", WindowMaker.SCALE_UP)
        .addProgressBar("scaleProgress", 80, 34, "nc.prog_furnace_bg", "nc.prog_furnace")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(["furnace", "nc_fuel"]);
        }
    });
    NCWindow.Furnace = winMaker.makeWindow();
})(NCWindow || (NCWindow = {}));
var NuclearFurnace = /** @class */ (function (_super) {
    __extends(NuclearFurnace, _super);
    function NuclearFurnace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            time: 0,
            progress: 0
        };
        return _this;
    }
    NuclearFurnace.prototype.getScreenByName = function () {
        return NCWindow.Furnace;
    };
    NuclearFurnace.prototype.setupContainer = function () {
        StorageInterface.setGlobalValidatePolicy(this.container, MachineRegistry.getGlobalValidatePolicy(this.blockID));
    };
    NuclearFurnace.prototype.consumeFuel = function () {
        var slotFuel = this.container.getSlot("slotFuel");
        var time = NuclearFurnace.FuelData[slotFuel.id];
        if (time && slotFuel.data === 0) {
            slotFuel.count--;
            slotFuel.validate();
            slotFuel.markDirty();
            this.data.energy = this.data.time = time;
        }
    };
    NuclearFurnace.prototype.onTick = function () {
        var slotSource = this.container.getSlot("slotSource");
        var slotResult = this.container.getSlot("slotResult");
        var result = Recipes.getFurnaceRecipeResult(slotSource.id, slotSource.data);
        var isBurning = this.data.energy > 0;
        if (result && (slotResult.id === 0 || slotResult.id === result.id && slotResult.data === result.data && slotResult.count < Item.getMaxStack(slotResult.id))) {
            if (!isBurning) {
                this.consumeFuel();
                isBurning = this.data.energy > 0;
            }
            if (isBurning) {
                this.data.progress++;
                if (this.data.progress >= NuclearFurnace.cookTime) {
                    slotSource.count--;
                    slotSource.markDirty();
                    slotSource.validate();
                    slotResult.id = result.id;
                    slotResult.data = result.data;
                    slotResult.count++;
                    slotResult.markDirty();
                    this.data.progress = 0;
                }
            }
            else {
                if (this.data.progress > 0) {
                    this.data.progress = Math.max(0, this.data.progress - 2);
                }
            }
        }
        else {
            this.data.progress = 0;
        }
        if (isBurning) {
            this.data.energy--;
        }
        StorageInterface.checkHoppers(this);
        this.setActive(isBurning);
        this.setUiScale("scaleFire", this.data.energy, this.data.time);
        this.setUiScale("scaleProgress", this.data.progress, NuclearFurnace.cookTime);
        this.container.sendChanges();
    };
    NuclearFurnace.prototype.canReceiveEnergy = function (side, type) {
        return false;
    };
    NuclearFurnace.prototype.canExtractEnergy = function (side, type) {
        return false;
    };
    NuclearFurnace.prototype.getEnergyStorage = function () {
        return 0;
    };
    NuclearFurnace.cookTime = 10;
    NuclearFurnace.FuelData = (_a = {},
        _a[NCID.block_thorium] = 3200,
        _a[NCID.block_uranium] = 3200,
        _a[NCID.ingot_thorium] = 320,
        _a[NCID.ingot_uranium] = 320,
        _a[NCID.dust_thorium] = 320,
        _a[NCID.dust_uranium] = 320,
        _a[NCID.T230] = 320,
        _a[NCID.T232] = 320,
        _a[NCID.U233] = 320,
        _a[NCID.U235] = 320,
        _a[NCID.U238] = 320,
        _a[NCID.T230ox] = 480,
        _a[NCID.T232ox] = 480,
        _a[NCID.U233ox] = 480,
        _a[NCID.U235ox] = 480,
        _a[NCID.U238ox] = 480,
        _a);
    return NuclearFurnace;
}(MachineBase));
Block.setDestroyTime(NCID.furnace, 3);
ToolAPI.registerBlockMaterial(NCID.furnace, "stone");
TileEntity.registerPrototype(NCID.furnace, new NuclearFurnace());
StorageInterface.createInterface(NCID.furnace, {
    slots: {
        slotSource: { input: true, side: "up", isValid: function (item) { return !!Recipes.getFurnaceRecipeResult(item.id, item.data); } },
        slotFuel: { input: true, side: "horizontal", isValid: function (item) { return item.id in NuclearFurnace.FuelData && item.data === 0; } },
        slotResult: { output: true }
    }
});
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.furnace, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.alloy_tough,
        c: "furnace"
    });
});
ProcessorRegistry.createMachine("manufactory", "Manufactory", [1, 0, 1, 0], "REDSTONE", "CRIT", 400, 20);
ProcessorRegistry.createMachine("isotope_separator", "Isotope Separator", [1, 0, 2, 0], "REDSTONE", "SMOKE", 800, 10);
ProcessorRegistry.createMachine("decay_hastener", "Decay Hastener", [1, 0, 1, 0], "REDSTONE", "REDSTONE", 800, 10);
ProcessorRegistry.createMachine("fuel_reprocessor", "Fuel Reprocessor", [1, 0, 4, 0], "REDSTONE", "SMOKE", 400, 20);
ProcessorRegistry.createMachine("alloy_furnace", "Alloy Furnace", [2, 0, 1, 0], "SMOKE", "REDSTONE", 400, 10);
ProcessorRegistry.createMachine("fluid_infuser", "Fluid Infuser", [1, 1, 1, 0], "PORTAL", "REDSTONE", 600, 10);
ProcessorRegistry.createMachine("melter", "Melter", [1, 0, 0, 1], "FLAME", "LAVA", 800, 40);
ProcessorRegistry.createMachine("supercooler", "Supercooler", [0, 1, 0, 1], "SNOWBALLPOOF", "SMOKE", 600, 20);
ProcessorRegistry.createMachine("electrolyzer", "Electrolyzer", [0, 1, 0, 4], "REDSTONE", "SPLASH", 3200, 40);
ProcessorRegistry.createMachine("neutron_irradiator", "Neutron Irradiator", [0, 2, 0, 2], "SMOKE", "CRIT", 600, 10);
ProcessorRegistry.createMachine("ingot_former", "Ingot Former", [0, 1, 1, 0], "SMOKE", "SMOKE", 400, 0);
ProcessorRegistry.createMachine("pressurizer", "Pressurizer", [1, 0, 1, 0], "SMOKE", "SMOKE", 600, 40);
ProcessorRegistry.createMachine("chemical_reactor", "Chemical Reactor", [0, 2, 0, 2], "REDSTONE", "REDSTONE", 800, 10);
ProcessorRegistry.createMachine("salt_mixer", "Salt Mixer", [0, 2, 0, 1], "REDSTONE", "SMOKE2", 600, 20);
ProcessorRegistry.createMachine("crystallizer", "Crystallizer", [0, 1, 1, 0], "SUSPENDED_TOWN", "SUSPENDED_TOWN", 1600, 10);
ProcessorRegistry.createMachine("fluid_enricher", "Fluid Enricher", [1, 1, 0, 1], "SPLASH", "SUSPENDED_TOWN", 600, 10);
ProcessorRegistry.createMachine("fluid_extractor", "Fluid Extractor", [1, 0, 1, 1], "REDSTONE", "SUSPENDED_TOWN", 2400, 10);
ProcessorRegistry.createMachine("centrifuge", "Centrifuge", [0, 1, 0, 4], "SMOKE2", "SUSPENDED_TOWN", 1200, 10);
ProcessorRegistry.createMachine("rock_crusher", "Rock Crusher", [1, 0, 3, 0], "SMOKE", "SMOKE", 400, 20);
var NCWindow;
(function (NCWindow) {
    NCWindow.Manufactory = new ProcessorWindowMaker("Manufactory")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_manufactory_bg", "nc.prog_manufactory")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "manufactory");
        }
    });
    NCWindow.IsotopeSeparator = new ProcessorWindowMaker("Isotope Separator")
        .addProgressBar("scaleProgress", 60, 34, "nc.prog_isotope_separator_bg", "nc.prog_isotope_separator")
        .addSlot("input0", 41, 34, 18, "nc.slot_input")
        .addSlot("output0", 97, 30, 26, "nc.slot_output_large")
        .addSlot("output1", 125, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "isotope_separator");
        }
    });
    NCWindow.DecayHastener = new ProcessorWindowMaker("Decay Hastener")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_decay_hastener_bg", "nc.prog_decay_hastener")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "decay_hastener");
        }
    });
    NCWindow.FuelReprocessor = new ProcessorWindowMaker("Fuel Reprocessor")
        .addProgressBar("scaleProgress", 68, 18, "nc.prog_fuel_reprocessor_bg", "nc.prog_fuel_reprocessor")
        .addSlot("input0", 49, 28, 18, "nc.slot_input")
        .addSlot("output0", 105, 18, 18, "nc.slot_output")
        .addSlot("output1", 125, 18, 18, "nc.slot_output")
        .addSlot("output2", 105, 38, 18, "nc.slot_output")
        .addSlot("output3", 125, 38, 18, "nc.slot_output")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fuel_reprocessor");
        }
    });
    NCWindow.AlloyFurnace = new ProcessorWindowMaker("Alloy Furnace")
        .addProgressBar("scaleProgress", 84, 35, "nc.prog_alloy_furnace_bg", "nc.prog_alloy_furnace")
        .addSlot("input0", 45, 34, 18, "nc.slot_input")
        .addSlot("input1", 65, 34, 18, "nc.slot_input")
        .addSlot("output0", 121, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "alloy_furnace");
        }
    });
    NCWindow.FluidInfuser = new ProcessorWindowMaker("Fluid Infuser")
        .addProgressBar("scaleProgress", 84, 35, "nc.prog_fluid_infuser_bg", "nc.prog_fluid_infuser")
        .addSlot("input0", 45, 34, 18, "nc.slot_input")
        .addTank("inputLiq0", 65, 34, 18, "nc.tank_input")
        .addSlot("output0", 121, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_infuser");
        }
    });
    NCWindow.Melter = new ProcessorWindowMaker("Melter")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_melter_bg", "nc.prog_melter")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addTank("outputLiq0", 111, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "melter");
        }
    });
    NCWindow.Supercooler = new ProcessorWindowMaker("Supercooler")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_supercooler_bg", "nc.prog_supercooler")
        .addTank("inputLiq0", 55, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 111, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "supercooler");
        }
    });
    NCWindow.Electrolyzer = new ProcessorWindowMaker("Electrolyzer")
        .addProgressBar("scaleProgress", 68, 18, "nc.prog_electrolyzer_bg", "nc.prog_electrolyzer")
        .addTank("inputLiq0", 49, 28, 18, "nc.tank_input")
        .addTank("outputLiq0", 105, 18, 18, "nc.tank_output")
        .addTank("outputLiq1", 125, 18, 18, "nc.tank_output")
        .addTank("outputLiq2", 105, 38, 18, "nc.tank_output")
        .addTank("outputLiq3", 125, 38, 18, "nc.tank_output")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "electrolyzer");
        }
    });
    NCWindow.NeutronIrradiator = new ProcessorWindowMaker("Neutron Irradiator")
        .addProgressBar("scaleProgress", 70, 35, "nc.prog_neutron_irradiator_bg", "nc.prog_neutron_irradiator")
        .addTank("inputLiq0", 31, 34, 18, "nc.tank_input")
        .addTank("inputLiq1", 51, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 107, 30, 26, "nc.tank_output_large")
        .addTank("outputLiq1", 135, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "neutron_irradiator");
        }
    });
    NCWindow.IngotFormer = new ProcessorWindowMaker("Ingot Former")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_ingot_former_bg", "nc.prog_ingot_former")
        .addTank("inputLiq0", 55, 34, 18, "nc.tank_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "ingot_former");
        }
    });
    NCWindow.Pressurizer = new ProcessorWindowMaker("Pressurizer")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_pressurizer_bg", "nc.prog_pressurizer")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "pressurizer");
        }
    });
    NCWindow.ChemicalReactor = new ProcessorWindowMaker("Chemical Reactor")
        .addProgressBar("scaleProgress", 70, 34, "nc.prog_chemical_reactor_bg", "nc.prog_chemical_reactor")
        .addTank("inputLiq0", 31, 34, 18, "nc.tank_input")
        .addTank("inputLiq1", 51, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 107, 30, 26, "nc.tank_output_large")
        .addTank("outputLiq1", 135, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "chemical_reactor");
        }
    });
    NCWindow.SaltMixer = new ProcessorWindowMaker("Salt Mixer")
        .addProgressBar("scaleProgress", 84, 34, "nc.prog_salt_mixer_bg", "nc.prog_salt_mixer")
        .addTank("inputLiq0", 45, 34, 18, "nc.tank_input")
        .addTank("inputLiq1", 65, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 121, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "salt_mixer");
        }
    });
    NCWindow.Crystallizer = new ProcessorWindowMaker("Crystallizer")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_crystallizer_bg", "nc.prog_crystallizer")
        .addTank("inputLiq0", 55, 34, 18, "nc.tank_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "crystallizer");
        }
    });
    NCWindow.FluidEnricher = new ProcessorWindowMaker("Fluid Enricher")
        .addProgressBar("scaleProgress", 84, 35, "nc.prog_fluid_enricher_bg", "nc.prog_fluid_enricher")
        .addSlot("input0", 45, 34, 18, "nc.slot_input")
        .addTank("inputLiq0", 65, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 121, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_enricher");
        }
    });
    NCWindow.FluidExtractor = new ProcessorWindowMaker("Fluid Extractor")
        .addProgressBar("scaleProgress", 60, 35, "nc.prog_fluid_extractor_bg", "nc.prog_fluid_extractor")
        .addSlot("input0", 41, 34, 18, "nc.slot_input")
        .addSlot("output0", 97, 30, 26, "nc.slot_output_large")
        .addTank("outputLiq0", 125, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_extractor");
        }
    });
    NCWindow.Centrifuge = new ProcessorWindowMaker("Centrifuge")
        .addProgressBar("scaleProgress", 68, 18, "nc.prog_centrifuge_bg", "nc.prog_centrifuge")
        .addTank("inputLiq0", 49, 28, 18, "nc.tank_input")
        .addTank("outputLiq0", 105, 18, 18, "nc.tank_output")
        .addTank("outputLiq1", 125, 18, 18, "nc.tank_output")
        .addTank("outputLiq2", 105, 38, 18, "nc.tank_output")
        .addTank("outputLiq3", 125, 38, 18, "nc.tank_output")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "centrifuge");
        }
    });
    NCWindow.RockCrusher = new ProcessorWindowMaker("Rock Crusher")
        .addProgressBar("scaleProgress", 56, 35, "nc.prog_rock_crusher_bg", "nc.prog_rock_crusher")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 93, 34, 18, "nc.slot_output")
        .addSlot("output1", 113, 34, 18, "nc.slot_output")
        .addSlot("output2", 133, 34, 18, "nc.slot_output")
        .setClicker("scaleProgress", {
        onClick: function () {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "rock_crusher");
        }
    });
    ProcessorRegistry.registerWindow(NCID.manufactory, NCWindow.Manufactory.makeWindow());
    ProcessorRegistry.registerWindow(NCID.isotope_separator, NCWindow.IsotopeSeparator.makeWindow());
    ProcessorRegistry.registerWindow(NCID.decay_hastener, NCWindow.DecayHastener.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fuel_reprocessor, NCWindow.FuelReprocessor.makeWindow());
    ProcessorRegistry.registerWindow(NCID.alloy_furnace, NCWindow.AlloyFurnace.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fluid_infuser, NCWindow.FluidInfuser.makeWindow());
    ProcessorRegistry.registerWindow(NCID.melter, NCWindow.Melter.makeWindow());
    ProcessorRegistry.registerWindow(NCID.supercooler, NCWindow.Supercooler.makeWindow());
    ProcessorRegistry.registerWindow(NCID.electrolyzer, NCWindow.Electrolyzer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.neutron_irradiator, NCWindow.NeutronIrradiator.makeWindow());
    ProcessorRegistry.registerWindow(NCID.ingot_former, NCWindow.IngotFormer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.pressurizer, NCWindow.Pressurizer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.chemical_reactor, NCWindow.ChemicalReactor.makeWindow());
    ProcessorRegistry.registerWindow(NCID.salt_mixer, NCWindow.SaltMixer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.crystallizer, NCWindow.Crystallizer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fluid_enricher, NCWindow.FluidEnricher.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fluid_extractor, NCWindow.FluidExtractor.makeWindow());
    ProcessorRegistry.registerWindow(NCID.centrifuge, NCWindow.Centrifuge.makeWindow());
    ProcessorRegistry.registerWindow(NCID.rock_crusher, NCWindow.RockCrusher.makeWindow());
})(NCWindow || (NCWindow = {}));
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.manufactory, "aba:cdc:aea", {
        a: NCID.ingot_lead,
        b: "redstone",
        c: "flint",
        d: "piston",
        e: NCID.wire_copper
    });
    Recipes2.addShaped(NCID.isotope_separator, "aba:cdc:aba", {
        a: NCID.plate_basic,
        b: NCID.motor,
        c: "redstone",
        d: NCID.chassis
    });
    Recipes2.addShaped(NCID.decay_hastener, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: "glowstone_dust",
        c: "ender_pearl",
        d: NCID.chassis,
        e: NCID.wire_copper
    });
    Recipes2.addShaped(NCID.fuel_reprocessor, "aba:cdc:aea", {
        a: NCID.plate_basic,
        b: NCID.ingot_boron,
        c: NCID.alloy_tough,
        d: NCID.chassis,
        e: NCID.actuator
    });
    Recipes2.addShaped(NCID.alloy_furnace, "aba:cdc:aea", {
        a: NCID.plate_basic,
        b: "redstone",
        c: "brick",
        d: "furnace",
        e: NCID.wire_copper
    });
    Recipes2.addShaped(NCID.fluid_infuser, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: "bucket",
        c: "gold_ingot",
        d: NCID.chassis,
        e: NCID.servo
    });
    Recipes2.addShaped(NCID.melter, "aba:bcb:ada", {
        a: NCID.plate_adv,
        b: "nether_brick",
        c: NCID.chassis,
        d: NCID.servo
    });
    Recipes2.addShaped(NCID.supercooler, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: NCID.alloy_MgB2,
        c: NCID.alloy_hard_carbon,
        d: NCID.chassis,
        e: NCID.servo
    });
    Recipes2.addShaped(NCID.electrolyzer, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: NCID.ingot_graphite,
        c: NCID.wire_copper,
        d: NCID.chassis,
        e: NCID.motor
    });
    Recipes2.addShaped(NCID.neutron_irradiator, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: "ender_pearl",
        c: NCID.wire_copper,
        d: NCID.chassis,
        e: NCID.servo
    });
    Recipes2.addShaped(NCID.ingot_former, "aba:cdc:aea", {
        a: NCID.plate_basic,
        b: "hopper",
        c: NCID.alloy_ferroboron,
        d: NCID.chassis,
        e: NCID.alloy_tough
    });
    Recipes2.addShaped(NCID.pressurizer, "aba:cdc:aba", {
        a: NCID.plate_adv,
        b: NCID.alloy_tough,
        c: NCID.actuator,
        d: NCID.chassis
    });
    Recipes2.addShaped(NCID.chemical_reactor, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: NCID.motor,
        c: "glowstone_dust",
        d: NCID.chassis,
        e: NCID.servo
    });
    Recipes2.addShaped(NCID.salt_mixer, "aba:cdc:aea", {
        a: NCID.plate_basic,
        b: NCID.alloy_steel,
        c: "bucket",
        d: NCID.chassis,
        e: NCID.motor
    });
    Recipes2.addShaped(NCID.crystallizer, "aba:bcb:ada", {
        a: NCID.plate_adv,
        b: NCID.wire_copper,
        c: NCID.chassis,
        d: "cauldron"
    });
    Recipes2.addShaped(NCID.fluid_enricher, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: "hopper",
        c: "lapis_lazuli",
        d: NCID.chassis,
        e: NCID.motor
    });
    Recipes2.addShaped(NCID.fluid_extractor, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: NCID.ingot_magnesium,
        c: "bucket",
        d: NCID.chassis,
        e: NCID.servo
    });
    Recipes2.addShaped(NCID.centrifuge, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: NCID.alloy_ferroboron,
        c: NCID.motor,
        d: NCID.chassis,
        e: NCID.servo
    });
    Recipes2.addShaped(NCID.rock_crusher, "aba:cdc:aea", {
        a: NCID.plate_adv,
        b: NCID.motor,
        c: NCID.actuator,
        d: NCID.chassis,
        e: NCID.alloy_tough
    });
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.alloy_furnace);
    var addCombineRecipe = function (source1, amount1, source2, amount2, result, timeMultiplier, powerMultiplier) {
        var i = 0;
        var j = 0;
        for (i = 0; i < source1.length; i++) {
            for (j = 0; j < source2.length; j++) {
                handler.add({ id: source1[i], count: amount1 }, { id: source2[j], count: amount2 }, result, timeMultiplier, powerMultiplier);
            }
        }
    };
    addCombineRecipe([NCID.dust_copper, NCID.ingot_copper], 3, [NCID.dust_tin, NCID.ingot_tin], 1, { id: NCID.alloy_bronze, count: 4 });
    addCombineRecipe(["iron_ingot"], 1, [NCID.dust_graphite, NCID.ingot_graphite], 1, NCID.alloy_steel);
    addCombineRecipe(["iron_ingot"], 1, ["coal", NCID.dust_coal], 2, NCID.alloy_steel);
    addCombineRecipe([NCID.alloy_steel], 1, [NCID.dust_boron, NCID.ingot_boron], 1, { id: NCID.alloy_ferroboron, count: 2 }, 1, 1.5);
    addCombineRecipe([NCID.alloy_ferroboron], 1, [NCID.dust_lithium, NCID.ingot_lithium], 1, { id: NCID.alloy_tough, count: 2 }, 1.5, 1.5);
    addCombineRecipe([NCID.dust_graphite, NCID.ingot_graphite], 2, [NCID.dust_diamond, "diamond"], 1, { id: NCID.alloy_hard_carbon, count: 2 }, 1, 2);
    addCombineRecipe([NCID.dust_magnesium, NCID.ingot_magnesium], 1, [NCID.dust_boron, NCID.ingot_boron], 2, { id: NCID.alloy_MgB2, count: 3 });
    addCombineRecipe([NCID.dust_lithium, NCID.ingot_lithium], 1, [NCID.dust_manganese_dioxide, NCID.ingot_manganese_dioxide], 1, { id: NCID.alloy_LiMnO2, count: 2 }, 1.5, 1);
    addCombineRecipe([NCID.dust_copper, NCID.ingot_copper], 3, [NCID.dust_silver, NCID.ingot_silver], 1, { id: NCID.alloy_shibuichi, count: 4 }, 1.5, 0.5);
    addCombineRecipe([NCID.dust_tin, NCID.ingot_tin], 3, [NCID.dust_silver, NCID.ingot_silver], 1, { id: NCID.alloy_tin_silver, count: 4 }, 1.5, 0.5);
    /**/ handler.add({ id: NCID.ingot_lead, count: 3 }, "gold_ingot", { id: NCID.alloy_lead_platinum, count: 4 }, 1.5, 0.5);
    /**/ handler.add({ id: NCID.dust_lead, count: 3, data: 0 }, "gold_ingot", { id: NCID.alloy_lead_platinum, count: 4 }, 1.5, 0.5);
    handler.add(NCID.alloy_tough, NCID.alloy_hard_carbon, NCID.alloy_extreme, 2, 2);
    handler.add(NCID.alloy_extreme, NCID.gem_boron_arsenide, { id: NCID.alloy_thermal, count: 2 }, 1.5, 1.5);
    addCombineRecipe([NCID.dust_zirconium, NCID.ingot_zirconium], 7, [NCID.dust_tin, NCID.ingot_tin], 1, { id: NCID.alloy_zircaloy, count: 8 }, 4, 1);
    addCombineRecipe([NCID.gem_silicon], 1, [NCID.dust_graphite, NCID.ingot_graphite], 1, { id: NCID.alloy_SiC, count: 2 }, 2, 2);
    handler.add({ id: "iron_ingot", count: 15 }, NCID.comp_CMn, { id: NCID.alloy_hsla_steel, count: 16 });
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.centrifuge);
    handler.add(["molten_boron:144"], ["molten_boron11:144"], ["molten_boron10:48"], null, null);
    handler.add(["molten_lithium:144"], ["molten_lithium7:144"], ["molten_lithium6:48"], null, null);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.chemical_reactor);
    //handler.add({liquid: "water", amount: 1000}, {liquid: "lava", amount: 0}, {liquid: "oxygen", amount: 500}, {liquid: "hydrogen", amount: 500}, 0.1, 1);
    //handler.add(["oxygen:500"], ["hydrogen:1000"], ["lava:2000"], null, 1, 1);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.crystallizer);
    handler.add(["boron_nitride_solution:666"], NCID.dust_boron_nitride);
    handler.add(["fluorite_water:666"], NCID.dust_fluorite);
    handler.add(["calcium_sulfate_solution:666"], NCID.comp_CaSO4);
    handler.add(["sodium_fluoride_solution:666"], NCID.comp_NaF);
    handler.add(["potassium_fluoride_solution:666"], NCID.comp_KF);
    handler.add(["sodium_hydroxide_solution:666"], NCID.comp_NaOH, 0.5, 0.5);
    handler.add(["potassium_hydroxide_solution:666"], NCID.comp_KOH, 0.5, 0.5);
    handler.add(["borax_solution:666"], NCID.comp_borax, 0.5, 0.5);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.decay_hastener);
    var addDecayRecipes = function (input, output) {
        handler.add({ id: NCID[input], data: 0 }, { id: NCID[output], data: 0 });
        handler.add({ id: NCID[input], data: 1 }, { id: NCID[output], data: 1 });
        handler.add({ id: NCID[input + "ox"], data: 0 }, { id: NCID[output + "ox"] || NCID[output], data: 0 });
        handler.add({ id: NCID[input + "ox"], data: 1 }, { id: NCID[output + "ox"] || NCID[output], data: 1 });
    };
    addDecayRecipes("T230", "dust_lead");
    addDecayRecipes("T232", "dust_lead");
    addDecayRecipes("U233", "dust_lead");
    addDecayRecipes("U235", "dust_lead");
    addDecayRecipes("U238", "T230");
    addDecayRecipes("N236", "T232");
    addDecayRecipes("N237", "U233");
    addDecayRecipes("P238", "T230");
    addDecayRecipes("P239", "U235");
    addDecayRecipes("P241", "N237");
    addDecayRecipes("P242", "U238");
    addDecayRecipes("A241", "N237");
    addDecayRecipes("A242", "T230");
    addDecayRecipes("A243", "P239");
    addDecayRecipes("Cm243", "P239");
    addDecayRecipes("Cm245", "P241");
    addDecayRecipes("Cm246", "P242");
    addDecayRecipes("Cm247", "A243");
    addDecayRecipes("B247", "A243");
    addDecayRecipes("B248", "T232");
    addDecayRecipes("Cf249", "Cm245");
    addDecayRecipes("Cf250", "Cm246");
    addDecayRecipes("Cf251", "Cm247");
    addDecayRecipes("Cf252", "T232");
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.electrolyzer);
    handler.add(["water:1000"], ["hydrogen:950"], ["deuterium:50"], ["oxygen:500"], null, 1.5, 1.0);
    handler.add(["hydrofluoric_acid:1000"], ["hydrogen:500"], ["fluorine:500"], null, null, 1.0, 0.5);
    handler.add(["molten_NaOH:666"], ["molten_sodium:144"], ["water:1000"], ["oxygen:500"], null, 1.5, 1.5);
    handler.add(["molten_KOH:666"], ["molten_potassium:144"], ["water:1000"], ["oxygen:500"], null, 1.5, 1.5);
    handler.add(["molten_alumina:144"], ["molten_aluminum:288"], ["oxygen:3000"], null, null, 2.0, 1.0);
    //Fluoride Recipes
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.fluid_enricher);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.fluid_extractor);
    handler.add(NCID.cooler_water, NCID.cooler_empty, ["water:1000"]);
    handler.add(NCID.cooler_helium, NCID.cooler_empty, ["liquid_helium:1000"]);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.fluid_infuser);
    handler.add(NCID.ingot_manganese, ["oxygen:1000"], NCID.ingot_manganese_oxide);
    handler.add(NCID.ingot_manganese_oxide, ["oxygen:1000"], NCID.ingot_manganese_dioxide);
    handler.add(NCID.dust_manganese, ["oxygen:1000"], NCID.dust_manganese_oxide);
    handler.add(NCID.dust_manganese_oxide, ["oxygen:1000"], NCID.dust_manganese_dioxide);
    handler.add(NCID.cooler_empty, ["water:1000"], NCID.cooler_water);
    handler.add(NCID.cooler_empty, ["liquid_helium:1000"], NCID.cooler_helium);
    //cooler_cryotheum
    handler.add(NCID.empty_frame, ["water:2000"], NCID.passive_water);
    handler.add(NCID.passive_water, ["lava:1000"], NCID.passive_cobblestone);
    handler.add("sandstone", ["molten_ender:250"], "end_stone");
    handler.add("red_sandstone", ["molten_ender:250"], "end_stone");
    for (var i = 0; i < 16; i++) {
        handler.add({ id: "concrete_powder", data: i }, ["water:1000"], "concrete", 0.5, 0.5);
    }
    handler.add("dirt", ["water:2000"], "clay");
    handler.add("grass", ["water:2000"], "clay_ball");
    handler.add("brick", ["water:2000"], "clay");
    handler.add("hardened_clay", ["water:4000"], "clay", 4, 1);
    handler.add(NCID.alloy_lead_platinum, ["molten_ender:250"], NCID.alloy_enderium);
    var OXIDIZING_VOLUME = 400;
    var addOxidizingRecipes = function (initial) {
        var nums = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            nums[_i - 1] = arguments[_i];
        }
        var key;
        for (var i = 0; i < nums.length; i++) {
            key = initial + nums[i];
            handler.add(NCID[key], { liquid: "oxygen", amount: OXIDIZING_VOLUME }, NCID[key + "ox"], 0.5, 1);
            handler.add({ id: NCID[key], data: 1 }, { liquid: "oxygen", amount: OXIDIZING_VOLUME / 8 }, { id: NCID[key + "ox"], data: 1 }, 1 / 18, 1);
        }
    };
    var addFuelOxidizingRecipes = function (key) {
        handler.add(NCID[key], { liquid: "oxygen", amount: OXIDIZING_VOLUME * 10 }, NCID[key + "ox"], 2, 2);
        handler.add({ id: NCID[key], data: 1 }, { liquid: "oxygen", amount: OXIDIZING_VOLUME * 8 }, { id: NCID[key + "ox"], data: 1 }, 2, 2);
    };
    addOxidizingRecipes("T", 230, 232);
    addOxidizingRecipes("U", 233, 235, 238);
    addOxidizingRecipes("N", 236, 237);
    addOxidizingRecipes("P", 238, 239, 241, 242);
    addOxidizingRecipes("A", 241, 242, 243);
    addOxidizingRecipes("Cm", 243, 245, 246, 247);
    addOxidizingRecipes("B", 247, 248);
    addOxidizingRecipes("Cf", 249, 250, 251, 252);
    addFuelOxidizingRecipes("TBU");
    addFuelOxidizingRecipes("LEU233");
    addFuelOxidizingRecipes("HEU233");
    addFuelOxidizingRecipes("LEU235");
    addFuelOxidizingRecipes("HEU235");
    addFuelOxidizingRecipes("LEN236");
    addFuelOxidizingRecipes("HEN236");
    addFuelOxidizingRecipes("LEP239");
    addFuelOxidizingRecipes("HEP239");
    addFuelOxidizingRecipes("LEP241");
    addFuelOxidizingRecipes("HEP241");
    addFuelOxidizingRecipes("LEA242");
    addFuelOxidizingRecipes("HEA242");
    addFuelOxidizingRecipes("LECm243");
    addFuelOxidizingRecipes("HECm243");
    addFuelOxidizingRecipes("LECm245");
    addFuelOxidizingRecipes("HECm245");
    addFuelOxidizingRecipes("LECm247");
    addFuelOxidizingRecipes("HECm247");
    addFuelOxidizingRecipes("LEB248");
    addFuelOxidizingRecipes("HEB248");
    addFuelOxidizingRecipes("LECf249");
    addFuelOxidizingRecipes("HECf249");
    addFuelOxidizingRecipes("LECf251");
    addFuelOxidizingRecipes("HECf251");
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.fuel_reprocessor);
    var addReprocessingRecipes = function (fuel, out1, n1, out2, n2, out3, n3, out4, n4) {
        handler.add({ id: NCID[fuel], count: 1, data: 1 }, { id: NCID[out1], count: n1, data: 1 }, { id: NCID[out2], count: n2, data: 1 }, { id: NCID[out3], count: n3, data: 1 }, { id: NCID[out4], count: n4, data: 1 });
        handler.add({ id: NCID[fuel + "ox"], data: 1 }, { id: NCID[out1 + "ox"], count: n1, data: 1 }, { id: NCID[out2 + "ox"], count: n2, data: 1 }, { id: NCID[out3 + "ox"], count: n3, data: 1 }, { id: NCID[out4 + "ox"], count: n4, data: 1 });
    };
    addReprocessingRecipes("TBU", "U233", 16, "U235", 8, "N236", 8, "N237", 32);
    addReprocessingRecipes("LEU235", "U238", 40, "N237", 8, "P239", 8, "P241", 8);
    addReprocessingRecipes("HEU235", "U238", 20, "N237", 16, "P239", 4, "P242", 24);
    addReprocessingRecipes("LEU233", "P239", 4, "P241", 4, "P242", 32, "A243", 24);
    addReprocessingRecipes("HEU233", "N236", 32, "N237", 8, "P242", 16, "A243", 8);
    addReprocessingRecipes("LEN236", "N237", 4, "P242", 32, "A242", 8, "A243", 20);
    addReprocessingRecipes("HEN236", "U238", 16, "P238", 8, "P239", 8, "P242", 32);
    addReprocessingRecipes("MOX239", "U238", 40, "P242", 12, "A243", 8, "Cm243", 4);
    addReprocessingRecipes("LEP239", "P239", 8, "P242", 24, "Cm243", 4, "Cm246", 28);
    addReprocessingRecipes("HEP239", "A241", 8, "A242", 24, "Cm245", 8, "Cm246", 24);
    addReprocessingRecipes("LEP241", "P242", 4, "A242", 4, "A243", 8, "Cm246", 48);
    addReprocessingRecipes("HEP241", "A241", 8, "Cm245", 8, "Cm246", 24, "Cm247", 24);
    addReprocessingRecipes("MOX241", "U238", 40, "P241", 8, "P242", 8, "Cm246", 8);
    addReprocessingRecipes("LEA242", "Cm243", 8, "Cm245", 8, "Cm246", 40, "Cm247", 8);
    addReprocessingRecipes("HEA242", "Cm245", 16, "Cm246", 32, "Cm247", 8, "B247", 8);
    addReprocessingRecipes("LECm243", "Cm246", 32, "B247", 16, "B248", 8, "Cf249", 8);
    addReprocessingRecipes("HECm243", "Cm246", 24, "B247", 24, "B248", 8, "Cf249", 8);
    addReprocessingRecipes("LECm245", "B247", 40, "B248", 8, "Cf249", 4, "Cf252", 12);
    addReprocessingRecipes("HECm245", "B247", 48, "B248", 4, "Cf249", 4, "Cf251", 8);
    addReprocessingRecipes("LECm247", "B247", 20, "B248", 4, "Cf251", 8, "Cf252", 32);
    addReprocessingRecipes("HECm247", "B248", 8, "Cf249", 8, "Cf251", 24, "Cf252", 24);
    addReprocessingRecipes("LEB248", "Cf249", 4, "Cf251", 4, "Cf252", 28, "Cf252", 28);
    addReprocessingRecipes("HEB248", "Cf250", 8, "Cf251", 8, "Cf252", 24, "Cf252", 24);
    addReprocessingRecipes("LECf249", "Cf250", 16, "Cf251", 8, "Cf252", 20, "Cf252", 20);
    addReprocessingRecipes("HECf249", "Cf250", 32, "Cf251", 16, "Cf252", 8, "Cf252", 8);
    addReprocessingRecipes("LECf251", "Cf251", 4, "Cf252", 20, "Cf252", 20, "Cf252", 20);
    addReprocessingRecipes("HECf251", "Cf251", 16, "Cf252", 16, "Cf252", 16, "Cf252", 16);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.ingot_former);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.isotope_separator);
    handler.add(NCID.ingot_thorium, NCID.T232, { id: NCID.T230, data: 1 });
    handler.add(NCID.dust_thorium, NCID.T232, { id: NCID.T230, data: 1 });
    handler.add(NCID.ingot_uranium, NCID.U238, { id: NCID.U235, data: 1 });
    handler.add(NCID.dust_uranium, NCID.U238, { id: NCID.U235, data: 1 });
    handler.add(NCID.ingot_boron, NCID.boron11, { id: NCID.boron10, count: 3, data: 1 });
    handler.add(NCID.dust_boron, NCID.boron11, { id: NCID.boron10, count: 3, data: 1 });
    handler.add(NCID.ingot_lithium, NCID.lithium7, { id: NCID.lithium6, count: 3, data: 1 });
    handler.add(NCID.dust_lithium, NCID.lithium7, { id: NCID.lithium6, count: 3, data: 1 });
    handler.add(NCID.TBU, { id: NCID.T232, count: 9 }, null);
    handler.add(NCID.TBUox, { id: NCID.T232ox, count: 9 }, null);
    handler.add(NCID.MOX239, { id: NCID.U238, count: 8 }, NCID.P239ox);
    handler.add(NCID.MOX241, { id: NCID.U238, count: 8 }, NCID.P241ox);
    var addFuelSeparationRecipes = function (symbol, fertile) {
        var fissiles = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fissiles[_i - 2] = arguments[_i];
        }
        fissiles.forEach(function (fissile) {
            handler.add(NCID["LE" + symbol + fissile], { id: NCID[symbol + fertile], count: 8 }, NCID[symbol + fissile]);
            handler.add(NCID["LE" + symbol + fissile + "ox"], { id: NCID[symbol + fertile], count: 8 }, NCID[symbol + fissile + "ox"]);
            handler.add(NCID["HE" + symbol + fissile], { id: NCID[symbol + fertile], count: 5 }, { id: NCID[symbol + fissile], count: 4 });
            handler.add(NCID["HE" + symbol + fissile + "ox"], { id: NCID[symbol + fertile], count: 5 }, { id: NCID[symbol + fissile + "ox"], count: 4 });
        });
    };
    addFuelSeparationRecipes("U", 238, 233, 235);
    addFuelSeparationRecipes("N", 237, 236);
    addFuelSeparationRecipes("P", 242, 239, 241);
    addFuelSeparationRecipes("A", 243, 242);
    addFuelSeparationRecipes("Cm", 246, 243, 245, 247);
    addFuelSeparationRecipes("B", 247, 248);
    addFuelSeparationRecipes("Cf", 252, 249, 251);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.manufactory);
    handler.add({ id: "coal", data: 0 }, NCID.dust_coal, 0.5, 1);
    handler.add(NCID.dust_coal, NCID.dust_graphite, 0.25, 0.5);
    //handler.add("charcoal", dustCharcoal, 0.5, 0.5);
    handler.add("diamond", NCID.dust_diamond, 1.5, 1.5);
    //handler.add("lapis_lazuli", NCID.dust_lapis);
    handler.add(NCID.gem_rhodochrosite, NCID.dust_rhodochrosite, 1.5, 1.5);
    handler.add("quartz", NCID.dust_quartz);
    handler.add("prismarine_shard", "prismarine_crystals");
    handler.add(NCID.gem_boron_nitride, NCID.dust_boron_nitride, 1.5, 1.5);
    handler.add(NCID.gem_fluorite, NCID.dust_fluorite, 1.5, 1.5);
    handler.add(NCID.gem_villiaumite, NCID.dust_villiaumite, 1.5, 1.5);
    handler.add(NCID.gem_carobbiite, NCID.dust_carobbiite, 1.5, 1.5);
    handler.add(NCID.dust_villiaumite, NCID.comp_NaF);
    handler.add(NCID.dust_carobbiite, NCID.comp_KF);
    handler.add("sand", NCID.gem_silicon);
    handler.add("obsidian", { id: NCID.dust_obsidian, count: 4 }, 2, 1);
    handler.add("cobblestone", "sand");
    handler.add("gravel", "flint");
    handler.add("end_stone", NCID.dust_endstone);
    handler.add("blaze_rod", { id: "blaze_powder", count: 4 });
    handler.add({ id: "rotten_flesh", count: 4 }, "leather", 0.5, 1);
    handler.add({ id: "reeds", count: 2 }, NCID.bioplastic, 1, 0.5);
    handler.add("bone", { id: "bone_meal", count: 6 });
    handler.add("planks", { id: "stick", count: 4 }, 0.25, 0.5);
    handler.add({ id: "log", data: 0 }, { id: "planks", count: 6, data: 0 }, 0.5, 0.5);
    handler.add({ id: "log", data: 1 }, { id: "planks", count: 6, data: 1 }, 0.5, 0.5);
    handler.add({ id: "log", data: 2 }, { id: "planks", count: 6, data: 2 }, 0.5, 0.5);
    handler.add({ id: "log", data: 3 }, { id: "planks", count: 6, data: 3 }, 0.5, 0.5);
    handler.add({ id: "log2", data: 0 }, { id: "planks", count: 6, data: 4 }, 0.5, 0.5);
    handler.add({ id: "log2", data: 1 }, { id: "planks", count: 6, data: 5 }, 0.5, 0.5);
    handler.add(NCID.ore_copper, { id: NCID.dust_copper, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_tin, { id: NCID.dust_tin, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_lead, { id: NCID.dust_lead, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_thorium, { id: NCID.dust_thorium, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_uranium, { id: NCID.dust_uranium, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_boron, { id: NCID.dust_boron, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_lithium, { id: NCID.dust_lithium, count: 2 }, 1.25, 1);
    handler.add(NCID.ore_magnesium, { id: NCID.dust_magnesium, count: 2 }, 1.25, 1);
    handler.add(NCID.ingot_copper, NCID.dust_copper);
    handler.add(NCID.ingot_tin, NCID.dust_tin);
    handler.add(NCID.ingot_lead, NCID.dust_lead);
    handler.add(NCID.ingot_thorium, NCID.dust_thorium);
    handler.add(NCID.ingot_uranium, NCID.dust_uranium);
    handler.add(NCID.ingot_boron, NCID.dust_boron);
    handler.add(NCID.ingot_lithium, NCID.dust_lithium);
    handler.add(NCID.ingot_magnesium, NCID.dust_magnesium);
    handler.add(NCID.ingot_graphite, NCID.dust_graphite);
    handler.add(NCID.ingot_beryllium, NCID.dust_beryllium);
    handler.add(NCID.ingot_zirconium, NCID.dust_zirconium);
    handler.add(NCID.ingot_manganese, NCID.dust_manganese);
    handler.add(NCID.ingot_aluminum, NCID.dust_aluminum);
    handler.add(NCID.ingot_silver, NCID.dust_silver);
    handler.add(NCID.ingot_manganese_oxide, NCID.dust_manganese_oxide);
    handler.add(NCID.ingot_manganese_dioxide, NCID.dust_manganese_dioxide);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.melter);
    handler.add(NCID.dust_sulfur, ["molten_sulfur:666"]);
    handler.add(NCID.comp_NaOH, ["molten_NaOH:666"]);
    handler.add(NCID.comp_KOH, ["molten_KOH:666"]);
    handler.add(NCID.dust_arsenic, ["molten_arsenic:666"]);
    handler.add(NCID.gem_boron_arsenide, ["molten_BAs:666"]);
    handler.add("ender_pearl", ["molten_ender:250"], 0.5, 1.5);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.neutron_irradiator);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.pressurizer);
    handler.add(NCID.dust_graphite, "coal");
    handler.add(NCID.dust_diamond, "diamond");
    handler.add(NCID.dust_rhodochrosite, NCID.gem_rhodochrosite);
    handler.add(NCID.dust_quartz, "quartz");
    handler.add({ id: NCID.dust_obsidian, count: 4 }, "obsidian", 1.5, 1.5);
    handler.add(NCID.dust_boron_nitride, NCID.gem_boron_nitride);
    handler.add(NCID.dust_fluorite, NCID.gem_fluorite);
    handler.add(NCID.dust_villiaumite, NCID.gem_villiaumite);
    handler.add(NCID.dust_carobbiite, NCID.gem_carobbiite);
    handler.add({ id: NCID.ingot_graphite, count: 64 }, "diamond", 3, 1.5);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.rock_crusher);
    handler.add({ id: "stone", data: 1 }, { id: NCID.dust_rhodochrosite, count: 2, chance: 0.4 }, { id: NCID.dust_sulfur, count: 2, chance: 0.3 }, { id: NCID.dust_villiaumite, chance: 0.35 });
    handler.add({ id: "stone", data: 2 }, { id: NCID.dust_rhodochrosite, count: 2, chance: 0.4 }, { id: NCID.dust_sulfur, count: 2, chance: 0.3 }, { id: NCID.dust_villiaumite, chance: 0.35 });
    handler.add({ id: "stone", data: 3 }, { id: NCID.dust_fluorite, count: 2, chance: 0.45 }, { id: NCID.dust_carobbiite, count: 2, chance: 0.35 }, { id: NCID.dust_zirconium, chance: 0.4 });
    handler.add({ id: "stone", data: 4 }, { id: NCID.dust_fluorite, count: 2, chance: 0.45 }, { id: NCID.dust_carobbiite, count: 2, chance: 0.35 }, { id: NCID.dust_zirconium, chance: 0.4 });
    handler.add({ id: "stone", data: 5 }, { id: NCID.dust_beryllium, count: 2, chance: 0.5 }, { id: NCID.comp_alugentum, count: 2, chance: 0.25 }, { id: NCID.dust_arsenic, chance: 0.3 });
    handler.add({ id: "stone", data: 6 }, { id: NCID.dust_beryllium, count: 2, chance: 0.5 }, { id: NCID.comp_alugentum, count: 2, chance: 0.25 }, { id: NCID.dust_arsenic, chance: 0.3 });
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.salt_mixer);
});
Callback.addCallback("PreLoaded", function () {
    var handler = ProcessorRegistry.getRecipeHandler(NCID.supercooler);
    handler.add(["helium:8000"], ["liquid_helium:25"]);
    handler.add(["nitrogen:8000"], ["liquid_nitrogen:25"], 0.5, 0.5);
});
var TransferMode = {
    IN: 0,
    OUT: 1,
    NONE: 2
};
var TileBattery = /** @class */ (function (_super) {
    __extends(TileBattery, _super);
    function TileBattery(capacity) {
        var _this = _super.call(this) || this;
        _this.capacity = capacity;
        _this.defaultValues = {
            energy: 0,
            mode: 0
        };
        return _this;
    }
    TileBattery.prototype.onInit = function () {
        this.networkData.putInt("mode", this.data.mode);
        _super.prototype.onInit.call(this);
    };
    TileBattery.prototype.setMode = function (mode) {
        var code = parseInt(mode.join(""), 3);
        this.data.mode = code;
        this.networkData.putInt("mode", code);
    };
    TileBattery.prototype.getMode = function () {
        var mode = ("000000" + this.data.mode.toString(3)).slice(-6);
        return [+mode[0], +mode[1], +mode[2], +mode[3], +mode[4], +mode[5]];
    };
    TileBattery.prototype.canReceiveEnergy = function (side) {
        return this.getMode()[side] === TransferMode.IN;
    };
    TileBattery.prototype.canExtractEnergy = function (side) {
        return this.getMode()[side] === TransferMode.OUT;
    };
    TileBattery.prototype.getEnergyStorage = function () {
        return this.capacity;
    };
    TileBattery.prototype.getMaxTransfer = function () {
        return this.getEnergyStorage() / 20 | 0;
    };
    TileBattery.prototype.energyReceive = function (type, amount, voltage) {
        var add = Math.min(amount, this.getEnergyStorage() - this.data.energy, this.getMaxTransfer());
        this.data.energy += add;
        return add;
    };
    TileBattery.prototype.energyTick = function (type, src) {
        var out = Math.min(this.data.energy, this.getMaxTransfer());
        this.data.energy += src.add(out) - out;
    };
    TileBattery.prototype.renderModel = function () {
        TileRenderer.mapAtCoords(this.x, this.y, this.z, Network.serverToLocalId(this.networkData.getInt("blockId")), this.networkData.getInt("mode"));
    };
    TileBattery.prototype.onItemUse = function (coords, item, playerUid) {
        var client = Network.getClientForPlayer(playerUid);
        if (Entity.getSneaking(playerUid)) {
            var mode = this.getMode();
            mode[coords.side]++;
            mode[coords.side] %= 3;
            this.setMode(mode);
            this.renderModel();
            client.send("nc.clientTipMessage", { msg: "RF: " + ["Input", "Output", "None"][mode[coords.side]] });
        }
        else {
            client.send("nc.watchBattery", { x: this.x, y: this.y, z: this.z });
        }
        return true;
    };
    __decorate([
        ClientSide
    ], TileBattery.prototype, "renderModel", null);
    return TileBattery;
}(MachineBase));
Network.addClientPacket("nc.watchBattery", function (data) {
    if (Threading.getThread("nc_watchBattery")) {
        return;
    }
    Threading.initThread("nc_watchBattery", function () {
        var pointed;
        var battery;
        var energy = 0;
        var storage = 0;
        var scale = 0;
        while (true) {
            pointed = Player.getPointed();
            if (pointed.pos.x != data.x || pointed.pos.y != data.y || pointed.pos.z != data.z) {
                break;
            }
            battery = World.getTileEntity(data.x, data.y, data.z);
            if (!battery) {
                break;
            }
            energy = battery.data.energy;
            storage = battery.getEnergyStorage();
            scale = 0;
            while (energy > 10000) {
                energy = energy / 1000 | 0;
                storage = storage / 1000 | 0;
                scale++;
            }
            Game.tipMessage("Energy Stored: ".concat(energy, " / ").concat(storage, " ").concat(["", "k", "M", "G"][scale], "RF"));
            java.lang.Thread.sleep(500);
        }
        Game.tipMessage("");
    });
});
Item.addCreativeGroup("nc_battery", "Battery", [
    NCItem.createBlock("volpile_basic", "Basic Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("volpile_adv", "Advanced Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("volpile_du", "DU Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("volpile_elite", "Elite Voltaic Pile", [0, 0, 3]),
    NCItem.createBlock("battery_basic", "Basic Lithium Ion Battery", [0, 0, 3]),
    NCItem.createBlock("battery_adv", "Advanced Lithium Ion Battery", [0, 0, 3]),
    NCItem.createBlock("battery_du", "DU Lithium Ion Battery", [0, 0, 3]),
    NCItem.createBlock("battery_elite", "Elite Lithium Ion Battery", [0, 0, 3])
]);
MachineRegistry.registerPrototype(NCID.volpile_basic, new TileBattery(16e5));
MachineRegistry.registerPrototype(NCID.volpile_adv, new TileBattery(64e5));
MachineRegistry.registerPrototype(NCID.volpile_du, new TileBattery(256e5));
MachineRegistry.registerPrototype(NCID.volpile_elite, new TileBattery(1024e5));
MachineRegistry.registerPrototype(NCID.battery_basic, new TileBattery(32e6));
MachineRegistry.registerPrototype(NCID.battery_adv, new TileBattery(128e6));
MachineRegistry.registerPrototype(NCID.battery_du, new TileBattery(512e6));
MachineRegistry.registerPrototype(NCID.battery_elite, new TileBattery(2048e6));
Callback.addCallback("PreLoaded", function () {
    var types = Math.pow(3, 6);
    var registerBatteryModel = function (id, texName) {
        TileRenderer.setStandardModel(id, 0, [[texName, 0], [texName, 0], [texName, 3], [texName, 3], [texName, 3], [texName, 3]]);
        var code;
        for (var meta = 0; meta < types; meta++) {
            code = ("000000" + meta.toString(3)).slice(-6);
            TileRenderer.registerRenderModel(id, meta, [
                [texName, +code[0]],
                [texName, +code[1]],
                [texName, +code[2] + 3],
                [texName, +code[3] + 3],
                [texName, +code[4] + 3],
                [texName, +code[5] + 3]
            ]);
        }
    };
    registerBatteryModel(NCID.volpile_basic, "nc_volpile_basic");
    registerBatteryModel(NCID.volpile_adv, "nc_volpile_adv");
    registerBatteryModel(NCID.volpile_du, "nc_volpile_du");
    registerBatteryModel(NCID.volpile_elite, "nc_volpile_elite");
    registerBatteryModel(NCID.battery_basic, "nc_battery_basic");
    registerBatteryModel(NCID.battery_adv, "nc_battery_adv");
    registerBatteryModel(NCID.battery_du, "nc_battery_du");
    registerBatteryModel(NCID.battery_elite, "nc_battery_elite");
});
Callback.addCallback("PreLoaded", function () {
    Recipes2.addShaped(NCID.volpile_basic, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.wire_copper,
        c: NCID.block_magnesium
    });
    Recipes2.addShaped(NCID.volpile_adv, "aba:ccc:ada", {
        a: NCID.plate_adv,
        b: NCID.ingot_magnesium,
        c: NCID.volpile_basic,
        d: NCID.ingot_copper
    });
    Recipes2.addShaped(NCID.volpile_du, "aba:ccc:ada", {
        a: NCID.plate_du,
        b: NCID.ingot_magnesium,
        c: NCID.volpile_adv,
        d: NCID.ingot_copper
    });
    Recipes2.addShaped(NCID.volpile_elite, "aba:ccc:ada", {
        a: NCID.plate_elite,
        b: NCID.ingot_magnesium,
        c: NCID.volpile_du,
        d: NCID.ingot_copper
    });
    Recipes2.addShaped(NCID.battery_basic, "aba:bcb:aba", {
        a: NCID.plate_elite,
        b: NCID.battery,
        c: NCID.wire_MnO2
    });
    Recipes2.addShaped(NCID.battery_adv, "aba:ccc:ada", {
        a: NCID.plate_adv,
        b: NCID.alloy_LiMnO2,
        c: NCID.battery_basic,
        d: NCID.wire_MnO2
    });
    Recipes2.addShaped(NCID.battery_du, "aba:ccc:ada", {
        a: NCID.plate_du,
        b: NCID.alloy_LiMnO2,
        c: NCID.battery_adv,
        d: NCID.wire_MnO2
    });
    Recipes2.addShaped(NCID.battery_elite, "aba:ccc:ada", {
        a: NCID.plate_elite,
        b: NCID.alloy_LiMnO2,
        c: NCID.battery_du,
        d: NCID.wire_MnO2
    });
});
var TileItemGenerator = /** @class */ (function (_super) {
    __extends(TileItemGenerator, _super);
    function TileItemGenerator(item, countPerSec) {
        var _this = _super.call(this) || this;
        _this.passive_item = typeof item === "number" ? { id: item, data: 0 } : item;
        _this.passive_speed = countPerSec;
        return _this;
    }
    TileItemGenerator.prototype.onInit = function () {
        delete this.liquidStorage;
    };
    TileItemGenerator.prototype.onTick = function () {
        if (World.getThreadTime() % 20 === 0) {
            var amount = this.passive_speed;
            var storage = void 0;
            for (var side = 0; side < 6 && amount > 0; side++) {
                storage = StorageInterface.getNeighbourStorage(this.blockSource, this, side);
                if (storage) {
                    amount = storage.addItem(__assign(__assign({}, this.passive_item), { count: amount }), side ^ 1);
                }
            }
        }
    };
    return TileItemGenerator;
}(TileEntityBase));
var TileFluidGenerator = /** @class */ (function (_super) {
    __extends(TileFluidGenerator, _super);
    function TileFluidGenerator(fluid, mbPerSec) {
        var _this = _super.call(this) || this;
        _this.passive_fluid = fluid;
        _this.passive_speed = mbPerSec;
        return _this;
    }
    TileFluidGenerator.prototype.onInit = function () {
        delete this.liquidStorage;
    };
    TileFluidGenerator.prototype.onTick = function () {
        if (World.getThreadTime() % 20 === 0) {
            var amount = this.passive_speed;
            var storage = void 0;
            var tank = void 0;
            for (var side = 0; side < 6 && amount > 0; side++) {
                storage = StorageInterface.getNeighbourStorage(this.blockSource, this, side);
                if (storage) {
                    tank = storage.getInputTank(side ^ 1);
                    if (tank && storage.canReceiveLiquid(this.passive_fluid, amount) && !tank.isFull(this.passive_fluid)) {
                        amount = tank.addLiquid(this.passive_fluid, amount);
                    }
                }
            }
        }
    };
    return TileFluidGenerator;
}(TileEntityBase));
Item.addCreativeGroup("nc_passive", "Item/Fluid Generator", [
    NCItem.createBlock("passive_cobblestone", "Cobblestone Generator"),
    NCItem.createBlock("passive_cobblestone_compact", "Compact Cobblestone Generator"),
    NCItem.createBlock("passive_cobblestone_dense", "Dense Cobblestone Generator"),
    NCItem.createBlock("passive_water", "Infinite Water Source"),
    NCItem.createBlock("passive_water_compact", "Compact Infinite Water Source"),
    NCItem.createBlock("passive_water_dense", "Dense Infinite Water Source"),
    NCItem.createBlock("passive_helium", "Helium Collector"),
    NCItem.createBlock("passive_helium_compact", "Compact Helium Collector"),
    NCItem.createBlock("passive_helium_dense", "Dense Helium Collector"),
    NCItem.createBlock("passive_nitrogen", "Nitrogen Collector"),
    NCItem.createBlock("passive_nitrogen_compact", "Compact Nitrogen Collector"),
    NCItem.createBlock("passive_nitrogen_dense", "Dense Nitrogen Collector")
]);
Block.setDestroyTime(NCID.passive_cobblestone, 3);
Block.setDestroyTime(NCID.passive_cobblestone_compact, 3);
Block.setDestroyTime(NCID.passive_cobblestone_dense, 3);
Block.setDestroyTime(NCID.passive_water, 3);
Block.setDestroyTime(NCID.passive_water_compact, 3);
Block.setDestroyTime(NCID.passive_water_dense, 3);
Block.setDestroyTime(NCID.passive_helium, 3);
Block.setDestroyTime(NCID.passive_helium_compact, 3);
Block.setDestroyTime(NCID.passive_helium_dense, 3);
Block.setDestroyTime(NCID.passive_nitrogen, 3);
Block.setDestroyTime(NCID.passive_nitrogen_compact, 3);
Block.setDestroyTime(NCID.passive_nitrogen_dense, 3);
ToolAPI.registerBlockMaterial(NCID.passive_cobblestone, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_cobblestone_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_cobblestone_dense, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_water, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_water_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_water_dense, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_helium, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_helium_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_helium_dense, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_nitrogen, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_nitrogen_compact, "stone");
ToolAPI.registerBlockMaterial(NCID.passive_nitrogen_dense, "stone");
TileEntity.registerPrototype(NCID.passive_cobblestone, new TileItemGenerator(VanillaBlockID.cobblestone, 2));
TileEntity.registerPrototype(NCID.passive_cobblestone_compact, new TileItemGenerator(VanillaBlockID.cobblestone, 16));
TileEntity.registerPrototype(NCID.passive_cobblestone_dense, new TileItemGenerator(VanillaBlockID.cobblestone, 128));
TileEntity.registerPrototype(NCID.passive_water, new TileFluidGenerator("water", 200));
TileEntity.registerPrototype(NCID.passive_water_compact, new TileFluidGenerator("water", 1600));
TileEntity.registerPrototype(NCID.passive_water_dense, new TileFluidGenerator("water", 12800));
TileEntity.registerPrototype(NCID.passive_helium, new TileFluidGenerator("helium", 100));
TileEntity.registerPrototype(NCID.passive_helium_compact, new TileFluidGenerator("helium", 800));
TileEntity.registerPrototype(NCID.passive_helium_dense, new TileFluidGenerator("helium", 6400));
TileEntity.registerPrototype(NCID.passive_nitrogen, new TileFluidGenerator("nitrogen", 50));
TileEntity.registerPrototype(NCID.passive_nitrogen_compact, new TileFluidGenerator("nitrogen", 400));
TileEntity.registerPrototype(NCID.passive_nitrogen_dense, new TileFluidGenerator("nitrogen", 3200));
Callback.addCallback("PreLoaded", function () {
    var bucketFunc = function (api, field, slot) {
        var liquid = "";
        var empty;
        for (var i = 0; i < field.length; i++) {
            liquid = LiquidRegistry.getItemLiquid(field[i].id, field[i].data);
            if (liquid === "water" || liquid === "lava") {
                empty = LiquidRegistry.getEmptyItem(field[i].id, field[i].data);
                field[i].id = empty.id;
                field[i].data = empty.data;
            }
            else {
                api.decreaseFieldSlot(i);
            }
        }
    };
    Recipes2.addShaped(NCID.passive_cobblestone, "aba:c_d:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_tin,
        c: "water_bucket",
        d: "lava_bucket"
    }, bucketFunc);
    Recipes2.addShaped(NCID.passive_cobblestone_compact, "aaa:aba:aaa", {
        a: NCID.passive_cobblestone,
        b: NCID.alloy_bronze
    });
    Recipes2.addShaped(NCID.passive_cobblestone_dense, "aaa:aba:aaa", {
        a: NCID.passive_cobblestone_compact,
        b: "gold_ingot"
    });
    Recipes2.addShaped(NCID.passive_water, "aba:c_c:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_tin,
        c: "water_bucket"
    }, bucketFunc);
    Recipes2.addShaped(NCID.passive_water_compact, "aaa:aba:aaa", {
        a: NCID.passive_water,
        b: NCID.alloy_bronze
    });
    Recipes2.addShaped(NCID.passive_water_dense, "aaa:aba:aaa", {
        a: NCID.passive_water_compact,
        b: "gold_ingot"
    });
    Recipes2.addShaped(NCID.passive_helium, "aba:bcb:aba", {
        a: NCID.plate_basic,
        b: NCID.ingot_zirconium,
        c: NCID.block_thorium230
    });
    Recipes2.addShaped(NCID.passive_helium_compact, "aaa:aba:aaa", {
        a: NCID.passive_helium,
        b: NCID.alloy_bronze
    });
    Recipes2.addShaped(NCID.passive_helium_dense, "aaa:aba:aaa", {
        a: NCID.passive_helium_compact,
        b: "gold_ingot"
    });
    Recipes2.addShaped(NCID.passive_nitrogen, "aba:c_c:aba", {
        a: NCID.plate_adv,
        b: NCID.ingot_beryllium,
        c: "bucket"
    });
    Recipes2.addShaped(NCID.passive_nitrogen_compact, "aaa:aba:aaa", {
        a: NCID.passive_nitrogen,
        b: NCID.alloy_bronze
    });
    Recipes2.addShaped(NCID.passive_nitrogen_dense, "aaa:aba:aaa", {
        a: NCID.passive_nitrogen_compact,
        b: "gold_ingot"
    });
});
var RV;
ModAPI.addAPICallback("RecipeViewer", function (api) {
    RV = api;
    var RecipeType = api.RecipeType;
    var ProcessorRecipeType = /** @class */ (function (_super) {
        __extends(ProcessorRecipeType, _super);
        function ProcessorRecipeType(name, blockID, winMaker) {
            var _this = this;
            var recHandler = ProcessorRegistry.getRecipeHandler(blockID);
            var input = [];
            var output = [];
            var inputLiq = [];
            var outputLiq = [];
            for (var i = 0; i < recHandler.inputSlotSize; i++)
                input.push("input" + i);
            for (var i = 0; i < recHandler.outputSlotSize; i++)
                output.push("output" + i);
            for (var i = 0; i < recHandler.inputTankSize; i++)
                inputLiq.push("inputLiq" + i);
            for (var i = 0; i < recHandler.outputTankSize; i++)
                outputLiq.push("outputLiq" + i);
            _this = _super.call(this, name, blockID, winMaker.getContentForRV({
                input: input,
                output: output,
                inputLiq: inputLiq,
                outputLiq: outputLiq
            }, __spreadArray(__spreadArray(__spreadArray([], inputLiq, true), outputLiq, true), ["scaleProgress"], false))) || this;
            _this.blockID = blockID;
            _this.setTankLimit(1000);
            return _this;
        }
        ProcessorRecipeType.prototype.getAllList = function () {
            var handler = ProcessorRegistry.getRecipeHandler(this.blockID);
            if (handler) {
                return handler.getAll();
            }
            return [];
        };
        return ProcessorRecipeType;
    }(RecipeType));
    var register = function (key, name, winMaker) {
        api.RecipeTypeRegistry.register(NCItem.PREFIX + key, new ProcessorRecipeType(name, NCID[key], winMaker));
    };
    register("manufactory", "Manufactory", NCWindow.Manufactory);
    register("isotope_separator", "Isotope Separator", NCWindow.IsotopeSeparator);
    register("decay_hastener", "Decay Hastener", NCWindow.DecayHastener);
    register("fuel_reprocessor", "Fuel Reprocessor", NCWindow.FuelReprocessor);
    register("alloy_furnace", "Alloy Furnace", NCWindow.AlloyFurnace);
    register("fluid_infuser", "Fluid Infuser", NCWindow.FluidInfuser);
    register("melter", "Melter", NCWindow.Melter);
    register("supercooler", "Supercooler", NCWindow.Supercooler);
    register("electrolyzer", "Electrolyzer", NCWindow.Electrolyzer);
    register("neutron_irradiator", "Neutron Irradiator", NCWindow.NeutronIrradiator);
    register("ingot_former", "Ingot Former", NCWindow.IngotFormer);
    register("pressurizer", "Pressurizer", NCWindow.Pressurizer);
    register("chemical_reactor", "Chemical Reactor", NCWindow.ChemicalReactor);
    register("salt_mixer", "Salt Mixer", NCWindow.SaltMixer);
    register("crystallizer", "Crystallizer", NCWindow.Crystallizer);
    register("fluid_enricher", "Fluid Enricher", NCWindow.FluidEnricher);
    register("fluid_extractor", "Fluid Extractor", NCWindow.FluidExtractor);
    register("centrifuge", "Centrifuge", NCWindow.Centrifuge);
    register("rock_crusher", "Rock Crusher", NCWindow.RockCrusher);
    var FissionRecipeType = /** @class */ (function (_super) {
        __extends(FissionRecipeType, _super);
        function FissionRecipeType() {
            var winMaker = new NCWindowMaker("Fission Reactor", 176, 97, "nc.frame_dark_bold")
                .addSlot("input0", 55, 34, 18, "nc.slot_dark")
                .addSlot("output0", 111, 30, 26, "nc.slot_dark_large")
                .addDrawing("scaleProgress", { type: "bitmap", x: 74, y: 35, bitmap: "nc.prog_fission" })
                .addElements("textInfo", { type: "text", x: 37, y: 60, font: { color: Color.WHITE, shadow: 0.5, size: 6 }, multiline: true });
            return _super.call(this, "Fission Reactor", NCID.fission_controller, winMaker.getContentForRV({
                input: ["input0"],
                output: ["output0"]
            }, ["scaleProgress", "textInfo"])) || this;
        }
        FissionRecipeType.prototype.getAllList = function () {
            return FissionFuel.getAllListForRV();
        };
        FissionRecipeType.prototype.onOpen = function (elements, recipe) {
            var params = FissionFuel.getParams(recipe.input[0].id);
            elements.get("textInfo").setBinding("text", "Base depletion time: ".concat(FissionFuel.tickToString(params.time), "\nBase power gen: ").concat(params.power, " RF/t\nBase heat gen: ").concat(params.heat, " H/t"));
        };
        return FissionRecipeType;
    }(RecipeType));
    var DecayGeneratorRecipeType = /** @class */ (function (_super) {
        __extends(DecayGeneratorRecipeType, _super);
        function DecayGeneratorRecipeType() {
            var winMaker = new NCWindowMaker("Decay Generator", 176, 86)
                .addScale("scaleProgress", 74, 35, "nc.prog_decay_hastener_bg", "nc.prog_decay_hastener")
                .addSlot("input0", 55, 34, 18, "nc.slot_input")
                .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
                .addElements("textInfo", { type: "text", x: 55, y: 60, font: { color: Color.WHITE, shadow: 0.5, size: 6 }, multiline: true });
            return _super.call(this, "Decay Generator", NCID.decay_generator, winMaker.getContentForRV({
                input: ["input0"],
                output: ["output0"]
            }, ["scaleProgress", "textInfo"])) || this;
        }
        DecayGeneratorRecipeType.prototype.getAllList = function () {
            var list = [];
            for (var id in DecayGenerator.Recipe) {
                list.push({
                    input: [{ id: +id, count: 1, data: 0 }],
                    output: [{ id: DecayGenerator.Recipe[id].become, count: 1, data: 0 }]
                });
            }
            return list;
        };
        DecayGeneratorRecipeType.prototype.onOpen = function (elements, recipe) {
            var data = DecayGenerator.Recipe[recipe.input[0].id];
            var time = data.lifetime > 60 ? Math.ceil(data.lifetime / 60) + " min" : data.lifetime + " s";
            elements.get("textInfo").setBinding("text", "Mean lifetime: ".concat(time, "\nPower gen: ").concat(data.power, " RF/s"));
        };
        return DecayGeneratorRecipeType;
    }(RecipeType));
    var FurnaceFuelRecipeType = /** @class */ (function (_super) {
        __extends(FurnaceFuelRecipeType, _super);
        function FurnaceFuelRecipeType() {
            var _this = _super.call(this, "Nuclear Furnace Fuel", NCID.furnace, {
                drawing: [
                    { type: "bitmap", x: 290, y: 140, scale: 8, bitmap: "nc.fire" }
                ],
                elements: {
                    input0: { x: 280, y: 260, size: 120 },
                    text: { type: "text", x: 450, y: 220, multiline: true, font: { size: 40, color: Color.WHITE, shadow: 0.5 } }
                }
            }) || this;
            _this.setDescription("Fuel");
            return _this;
        }
        FurnaceFuelRecipeType.prototype.getAllList = function () {
            var list = [];
            for (var id in NuclearFurnace.FuelData) {
                list.push({
                    input: [{ id: +id, count: 1, data: 0 }]
                });
            }
            return list;
        };
        FurnaceFuelRecipeType.prototype.onOpen = function (elements, recipe) {
            var item = recipe.input[0];
            var time = NuclearFurnace.FuelData[item.id];
            elements.get("text").setBinding("text", time + " tick\n(Smelts  " + (time / 10) + "  items)");
        };
        return FurnaceFuelRecipeType;
    }(RecipeType));
    api.RecipeTypeRegistry.register(NCItem.PREFIX + "fission", new FissionRecipeType());
    api.RecipeTypeRegistry.register(NCItem.PREFIX + "decay_generator", new DecayGeneratorRecipeType());
    api.RecipeTypeRegistry.register(NCItem.PREFIX + "fuel", new FurnaceFuelRecipeType());
});
