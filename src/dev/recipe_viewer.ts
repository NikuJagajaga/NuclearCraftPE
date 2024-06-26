var RV: RecipeViewerAPI;

ModAPI.addAPICallback("RecipeViewer", (api: RecipeViewerAPI): void => {

    RV = api;

    const RecipeType = api.RecipeType;

    class ProcessorRecipeType extends RecipeType {

        constructor(name: string, private blockID: number, winMaker: ProcessorWindowMaker){
            const recHandler = ProcessorRegistry.getRecipeHandler(blockID);
            const input = [];
            const output = [];
            const inputLiq = [];
            const outputLiq = [];
            for(let i = 0; i < recHandler.inputSlotSize; i++) input.push("input" + i);
            for(let i = 0; i < recHandler.outputSlotSize; i++) output.push("output" + i);
            for(let i = 0; i < recHandler.inputTankSize; i++) inputLiq.push("inputLiq" + i);
            for(let i = 0; i < recHandler.outputTankSize; i++) outputLiq.push("outputLiq" + i);
            super(name, blockID, winMaker.getContentForRV({
                input: input,
                output: output,
                inputLiq: inputLiq,
                outputLiq: outputLiq
            }, [...inputLiq, ...outputLiq, "scaleProgress"]));
            this.setTankLimit(1000);
        }

        getAllList(): RecipePattern[] {
            const handler = ProcessorRegistry.getRecipeHandler(this.blockID);
            if(handler){
                return handler.getAll();
            }
            return [];
        }

    }


    const register = (key: string, name: string, winMaker: ProcessorWindowMaker): void => {
        api.RecipeTypeRegistry.register(NCItem.PREFIX + key, new ProcessorRecipeType(name, NCID[key], winMaker));
    }

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


    class FissionRecipeType extends RecipeType {

        constructor(){
            const winMaker = new NCWindowMaker("Fission Reactor", 176, 97, "nc.frame_dark_bold")
                .addSlot("input0", 55, 34, 18, "nc.slot_dark")
                .addSlot("output0", 111, 30, 26, "nc.slot_dark_large")
                .addDrawing("scaleProgress", {type: "bitmap", x: 74, y: 35, bitmap: "nc.prog_fission"})
                .addElements("textInfo", {type: "text", x: 37, y: 60, font: {color: Color.WHITE, shadow: 0.5, size: 6}, multiline: true});
            super("Fission Reactor", NCID.fission_controller, winMaker.getContentForRV({
                input: ["input0"],
                output: ["output0"]
            }, ["scaleProgress", "textInfo"]));
        }

        getAllList(): RecipePattern[] {
            return FissionFuel.getAllListForRV();
        }

        onOpen(elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern): void {
            const params = FissionFuel.getParams(recipe.input[0].id);
            elements.get("textInfo").setBinding("text", `Base depletion time: ${FissionFuel.tickToString(params.time)}\nBase power gen: ${params.power} RF/t\nBase heat gen: ${params.heat} H/t`);
        }

    }


    class DecayGeneratorRecipeType extends RecipeType {

        constructor(){
            const winMaker = new NCWindowMaker("Decay Generator", 176, 86)
                .addScale("scaleProgress", 74, 35, "nc.prog_decay_hastener_bg", "nc.prog_decay_hastener")
                .addSlot("input0", 55, 34, 18, "nc.slot_input")
                .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
                .addElements("textInfo", {type: "text", x: 55, y: 60, font: {color: Color.WHITE, shadow: 0.5, size: 6}, multiline: true});
            super("Decay Generator", NCID.decay_generator, winMaker.getContentForRV({
                input: ["input0"],
                output: ["output0"]
            }, ["scaleProgress", "textInfo"]));
        }

        getAllList(): RecipePattern[] {
            const list: RecipePattern[] = [];
            for(let id in DecayGenerator.Recipe){
                list.push({
                    input: [{id: +id, count: 1, data: 0}],
                    output: [{id: DecayGenerator.Recipe[id].become, count: 1, data: 0}]
                });
            }
            return list;
        }

        onOpen(elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern): void {
            const data = DecayGenerator.Recipe[recipe.input[0].id];
            const time = data.lifetime > 60 ? Math.ceil(data.lifetime / 60) + " min" : data.lifetime + " s";
            elements.get("textInfo").setBinding("text", `Mean lifetime: ${time}\nPower gen: ${data.power} RF/s`);
        }

    }


    class FurnaceFuelRecipeType extends RecipeType {

        constructor(){
            super("Nuclear Furnace Fuel", NCID.furnace, {
                drawing: [
                    {type: "bitmap", x: 290, y: 140, scale: 8, bitmap: "nc.fire"}
                ],
                elements: {
                    input0: {x: 280, y: 260, size: 120},
                    text: {type: "text", x: 450, y: 220, multiline: true, font: {size: 40, color: Color.WHITE, shadow: 0.5}}
                }
            });
            this.setDescription("Fuel");
        }

        getAllList(): RecipePattern[] {
            const list: RecipePattern[] = [];
            for(let id in NuclearFurnace.FuelData){
                list.push({
                    input: [{id: +id, count: 1, data: 0}]
                });
            }
            return list;
        }

        onOpen(elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern): void {
            const item = recipe.input[0];
            const time = NuclearFurnace.FuelData[item.id];
            elements.get("text").setBinding("text", time + " tick\n(Smelts  " + (time / 10) + "  items)");
        }

    }


    api.RecipeTypeRegistry.register(NCItem.PREFIX + "fission", new FissionRecipeType());
    api.RecipeTypeRegistry.register(NCItem.PREFIX + "decay_generator", new DecayGeneratorRecipeType());
    api.RecipeTypeRegistry.register(NCItem.PREFIX + "fuel", new FurnaceFuelRecipeType());

});