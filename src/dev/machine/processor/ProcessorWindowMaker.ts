class ProcessorWindowMaker extends NCWindowMaker {

    private readonly contentForRV: UI.WindowContent;

    constructor(title: string){
        const width = 176;
        const height = 86;
        super(title, width, height);
        this.contentForRV = {
            drawing: [
                {type: "frame", x: 0, y: 0, width: 1000, height: height / width * 1000, bitmap: "classic_frame_bg_light", scale: this.ratio}
            ],
            elements: {}
        };
        //energy scale
        this.addDrawing({type: "frame", x: 7, y: 5, width: 18, height: 76, bitmap: "nc.frame"});
        this.addElements("scaleEnergy", {type: "scale", x: 8, y: 6, bitmap: "nc.energy", direction: WindowMaker.SCALE_UP});
        //upgrade slot
        this.addSlot("slotUpgSpeed", 131, 63, 18, "nc.slot_upg_speed");
        this.addSlot("slotUpgEnergy", 151, 63, 18, "nc.slot_upg_energy");
        //this.addElements("buttonRedstone", {type: "button", x: 27, y: 63, bitmap: "nc.button_rs_off", scale: 0.5});
    }

    getContentForRV(): UI.WindowContent {
        return this.contentForRV;
    }

    addDrawingToRV(drawing: UI.DrawingElements): void {
        this.adjustScale(drawing);
        this.contentForRV.drawing.push(drawing);
    }

    addElementsToRV(name: string, elements: UI.Elements): void {
        this.adjustScale(elements);
        this.contentForRV.elements[name] = {...elements, z: this.z};
    }

    addSlot(name: string, x: number, y: number, size: number, bitmap?: string): void {
        if(name.startsWith("input") || name.startsWith("output")){
            this.addElementsToRV(name, {type: "slot", x: x, y: y, size: size, bitmap: bitmap});
        }
        super.addSlot(name, x, y, size, bitmap);
    }

    addTank(name: string, x: number, y: number, size: number, bitmap: string): void {
        if(name.startsWith("inputLiq") || name.startsWith("outputLiq")){
            this.addDrawingToRV({type: "bitmap", x: x, y: y, width: size, height: size, bitmap: bitmap});
            this.addElementsToRV(name, {type: "scale", x: x + 1, y: y + 1, width: size - 2, height: size - 2, direction: WindowMaker.SCALE_UP, pixelate: true});
        }
        super.addTank(name, x, y, size, bitmap);
    }

    addScale(name: string, x: number, y: number, bmpBack: string, bmpFront: string, direction: 0 | 1 | 2 | 3 = 0, thickness: number = 0): void {
        if(name === "scaleProgress"){
            thickness > 0 && this.addDrawingToRV({type: "bitmap", x: x, y: y, bitmap: bmpBack});
            this.addDrawingToRV({type: "bitmap", x: x + thickness, y: y + thickness, bitmap: bmpFront});
        }
        super.addScale(name, x, y, bmpBack, bmpFront, direction, thickness);
    }

}