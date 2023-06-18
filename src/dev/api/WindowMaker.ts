class NCWindowMaker extends WindowMaker {

    constructor(title: string, width: number, height: number, frame?: string){
        super(title, width, height, frame);
        this.enableTooltip(true);
    }

    addSlot(name: string, x: number, y: number, size: number, bitmap?: string): this {
        super.addSlot(name, x, y, size, bitmap);
        name.startsWith("output") && this.setValidItem(name, () => false);
        return this;
    }

    addTank(name: string, x: number, y: number, size: number, bitmap: string): this {
        this.addDrawing(name, {type: "bitmap", x: x, y: y, width: size, height: size, bitmap: bitmap});
        this.addElements(name, {type: "scale", x: x + 1, y: y + 1, width: size - 2, height: size - 2, direction: WindowMaker.SCALE_UP, pixelate: false});
        this.setClicker(name, {
            onLongClick: (position: Vector, container: ItemContainer, tileEntity: TileEntity) => {
                const tank: BlockEngine.LiquidTank = tileEntity[name];
                tank && tank.setAmount(null, 0);
            }
        });
        this.setTooltipFunc(name, elem => {
            const liquid = getLiquidByTex(elem.getBinding("texture") + "");
            const amount = elem.getBinding("value") * 16000 | 0;
            if(liquid && amount > 0){
                return liquid + "\n" + amount + " mB";
            }
            return "";
        });
        return this;
    }

    addProgressBar(name: string, x: number, y: number, bmpBack: string, bmpFront: string, direction: 0 | 1 | 2 | 3 = 0, thickness: number = 0): this {
        this.addScale(name, x, y, bmpBack, bmpFront, direction, thickness);
        this.setTooltipFunc(name, elem => (elem.getBinding("value") * 100).toFixed(1) + "%");
        return this;
    }

}