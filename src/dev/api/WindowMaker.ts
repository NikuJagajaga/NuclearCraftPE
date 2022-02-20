class WindowMaker {

    static readonly SCALE_RIGHT = 0;
    static readonly SCALE_UP = 1;
    static readonly SCALE_LEFT = 2;
    static readonly SCALE_DOWN = 3;

    readonly content: UI.WindowContent;
    readonly ratio: number;
    z: number;

    constructor(title: string, private width: number, private height: number, frame?: string){
        this.ratio = 1000 / width;
        this.z = 0;
        this.content = {
            standard: {
                header: {text: {text: title}},
                inventory: {standard: true},
                background: {standard: true}
            },
            drawing: [
                {type: "frame", x: 0, y: 0, width: 1000, height: height / width * 1000, bitmap: frame || "classic_frame_bg_light", scale: this.ratio}
            ],
            elements: {}
        };
    }

    protected adjustScale(elem: UI.DrawingElements | UI.Elements): void {
        if("x" in elem) elem.x *= this.ratio;
        if("y" in elem) elem.y *= this.ratio;
        if("width" in elem) elem.width *= this.ratio;
        if("height" in elem) elem.height *= this.ratio;
        if("size" in elem) elem.size *= this.ratio;
        elem["scale"] = "scale" in elem ? elem["scale"] * this.ratio : this.ratio;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    addDrawing(drawing: UI.DrawingElements): void {
        this.adjustScale(drawing);
        this.content.drawing.push(drawing);
    }

    addElements(name: string, elements: UI.Elements): void {
        this.adjustScale(elements);
        this.content.elements[name] = {...elements, z: this.z};
        this.z++;
    }

    setClicker(name: string, clicker: UI.UIClickEvent): void {
        const elem = this.content.elements[name];
        if(elem){
            elem.clicker = clicker;
        }
    }

    setValidItem(name: string, validFunc: (id: number, count: number, data: number, container: Container, item: ItemInstance) => boolean): void {
        const elem = this.content.elements[name];
        if(elem && elem.type === "slot"){
            elem.isValid = validFunc;
        }
    }

    makeWindow(): UI.StandardWindow {
        return new UI.StandardWindow(this.content);
    }

}


class NCWindowMaker extends WindowMaker {

    constructor(title: string, width: number, height: number, frame?: string){
        super(title, width, height, frame);
    }

    addSlot(name: string, x: number, y: number, size: number, bitmap?: string): void {
        this.addElements(name, {type: "slot", x: x, y: y, size: size, bitmap: bitmap});
        name.startsWith("output") && this.setValidItem(name, () => false);
    }

    addTank(name: string, x: number, y: number, size: number, bitmap: string): void {
        this.addDrawing({type: "bitmap", x: x, y: y, width: size, height: size, bitmap: bitmap});
        this.addElements(name, {type: "scale", x: x + 1, y: y + 1, width: size - 2, height: size - 2, direction: WindowMaker.SCALE_UP, pixelate: false});
        this.setClicker(name, {
            onLongClick: (position: Vector, container: ItemContainer, tileEntity: TileEntity) => {
                const tank: BlockEngine.LiquidTank = tileEntity[name];
                tank && tank.setAmount(null, 0);
            }
        });
    }

    addScale(name: string, x: number, y: number, bmpBack: string, bmpFront: string, direction: 0 | 1 | 2 | 3 = 0, thickness: number = 0): void {
        this.addDrawing({type: "bitmap", x: x, y: y, bitmap: bmpBack});
        this.addElements(name, {type: "scale", x: x + thickness, y: y + thickness, bitmap: bmpFront, direction: direction});
    }

}