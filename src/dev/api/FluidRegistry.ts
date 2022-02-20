class FluidRegistry {

    private static base = {
        LIQUID: FileTools.ReadImage(__dir__ + "tex_base/fluid/liquid.png"),
        GAS: FileTools.ReadImage(__dir__ + "tex_base/fluid/gas.png"),
        MOLTEN: FileTools.ReadImage(__dir__ + "tex_base/fluid/molten.png"),
        SALT_SOLUTION: FileTools.ReadImage(__dir__ + "tex_base/fluid/salt_solution.png")
    };

    private static cell_back = FileTools.ReadImage(__dir__ + "tex_base/cell/back.png");
    private static cell_front = FileTools.ReadImage(__dir__ + "tex_base/cell/front.png");

    static genCellTex(key: string, liq: android.graphics.Bitmap): void {
        const bmp = Bitmap.createBitmap(16, 16, Bitmap.Config.ARGB_8888);
        const cvs = new Canvas(bmp);
        const inside = Bitmap.createBitmap(liq, 6, 1, 5, 14, null, true);
        cvs.drawBitmap(this.cell_back, 0, 0, null);
        cvs.drawBitmap(inside, 6, 1, null);
        cvs.drawBitmap(this.cell_front, 0, 0, null);
        FileTools.WriteImage(__dir__ + `res/items-opaque/cell/nc_cell_${key}.png`, bmp);
    }

    static register(key: string, name: string, texture?: keyof typeof FluidRegistry.base, colorCode?: string): void {
        let uiTexture: string;
        if(colorCode && texture in this.base){
            const bmp = Bitmap.createBitmap(16, 16, Bitmap.Config.ARGB_8888);
            const cvs = new Canvas(bmp);
            const paint = new Paint();
            const color = texture === "SALT_SOLUTION" ? this.waterBlendColor(colorCode) : Color.parseColor(colorCode);
            paint.setColorFilter(new ColorFilter(color, PDMode.MULTIPLY));
            cvs.drawBitmap(this.base[texture], 0, 0, paint);
            uiTexture = "nc.fluid." + key;
            UI.TextureSource.put(uiTexture, bmp);
            //this.genCellTex(key, bmp);
        }
        else{
            uiTexture = "nc.fluid." + key;
            //this.genCellTex(key, UI.TextureSource.get(uiTexture));
        }
        LiquidRegistry.registerLiquid(key, name, [uiTexture]);
        Item.addCreativeGroup("nc_cell", "NC Cell", [ItemRegistry.registerItem(new ItemFluidCell("cell_" + key, key)).id]);
    }

    static waterBlendColor(soluteColor: string, blendRatio: number = 0.5): number {
        const color1 = Color.parseColor("#2F43F4");
        const color2 = Color.parseColor(soluteColor);
        return Color.argb(
            Math.min(Color.alpha(color1), Color.alpha(color2)),
            Color.red(color1) + (Color.red(color2) - Color.red(color1)) * blendRatio,
            Color.green(color1) + (Color.green(color2) - Color.green(color1)) * blendRatio,
            Color.blue(color1) + (Color.blue(color2) - Color.blue(color1)) * blendRatio
        );
    }

}