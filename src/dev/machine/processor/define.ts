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


namespace NCWindow {

    export const Manufactory = new ProcessorWindowMaker("Manufactory");
    Manufactory.addScale("scaleProgress", 74, 35, "nc.prog_manufactory_bg", "nc.prog_manufactory");
    Manufactory.addSlot("input0", 55, 34, 18, "nc.slot_input");
    Manufactory.addSlot("output0", 111, 30, 26, "nc.slot_output_large");
    Manufactory.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "manufactory");
        }
    });

    export const IsotopeSeparator = new ProcessorWindowMaker("Isotope Separator");
    IsotopeSeparator.addScale("scaleProgress", 60, 34, "nc.prog_isotope_separator_bg", "nc.prog_isotope_separator");
    IsotopeSeparator.addSlot("input0", 41, 34, 18, "nc.slot_input");
    IsotopeSeparator.addSlot("output0", 97, 30, 26, "nc.slot_output_large");
    IsotopeSeparator.addSlot("output1", 125, 30, 26, "nc.slot_output_large");
    IsotopeSeparator.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "isotope_separator");
        }
    });

    export const DecayHastener = new ProcessorWindowMaker("Decay Hastener");
    DecayHastener.addScale("scaleProgress", 74, 35, "nc.prog_decay_hastener_bg", "nc.prog_decay_hastener");
    DecayHastener.addSlot("input0", 55, 34, 18, "nc.slot_input");
    DecayHastener.addSlot("output0", 111, 30, 26, "nc.slot_output_large");
    DecayHastener.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "decay_hastener");
        }
    });

    export const FuelReprocessor = new ProcessorWindowMaker("Fuel Reprocessor");
    FuelReprocessor.addScale("scaleProgress", 68, 18, "nc.prog_fuel_reprocessor_bg", "nc.prog_fuel_reprocessor");
    FuelReprocessor.addSlot("input0", 49, 28, 18, "nc.slot_input");
    FuelReprocessor.addSlot("output0", 105, 18, 18, "nc.slot_output");
    FuelReprocessor.addSlot("output1", 125, 18, 18, "nc.slot_output");
    FuelReprocessor.addSlot("output2", 105, 38, 18, "nc.slot_output");
    FuelReprocessor.addSlot("output3", 125, 38, 18, "nc.slot_output");
    FuelReprocessor.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fuel_reprocessor");
        }
    });

    export const AlloyFurnace = new ProcessorWindowMaker("Alloy Furnace");
    AlloyFurnace.addScale("scaleProgress", 84, 35, "nc.prog_alloy_furnace_bg", "nc.prog_alloy_furnace");
    AlloyFurnace.addSlot("input0", 45, 34, 18, "nc.slot_input");
    AlloyFurnace.addSlot("input1", 65, 34, 18, "nc.slot_input");
    AlloyFurnace.addSlot("output0", 121, 30, 26, "nc.slot_output_large");
    AlloyFurnace.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "alloy_furnace");
        }
    });

    export const FluidInfuser = new ProcessorWindowMaker("Fluid Infuser");
    FluidInfuser.addScale("scaleProgress", 84, 35, "nc.prog_fluid_infuser_bg", "nc.prog_fluid_infuser");
    FluidInfuser.addSlot("input0", 45, 34, 18, "nc.slot_input");
    FluidInfuser.addTank("inputLiq0", 65, 34, 18, "nc.tank_input");
    FluidInfuser.addSlot("output0", 121, 30, 26, "nc.slot_output_large");
    FluidInfuser.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_infuser");
        }
    });

    export const Melter = new ProcessorWindowMaker("Melter");
    Melter.addScale("scaleProgress", 74, 35, "nc.prog_melter_bg", "nc.prog_melter");
    Melter.addSlot("input0", 55, 34, 18, "nc.slot_input");
    Melter.addTank("outputLiq0", 111, 30, 26, "nc.tank_output_large");
    Melter.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "melter");
        }
    });

    export const Supercooler = new ProcessorWindowMaker("Supercooler");
    Supercooler.addScale("scaleProgress", 74, 35, "nc.prog_supercooler_bg", "nc.prog_supercooler");
    Supercooler.addTank("inputLiq0", 55, 34, 18, "nc.tank_input");
    Supercooler.addTank("outputLiq0", 111, 30, 26, "nc.tank_output_large");
    Supercooler.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "supercooler");
        }
    });

    export const Electrolyzer = new ProcessorWindowMaker("Electrolyzer");
    Electrolyzer.addScale("scaleProgress", 68, 18, "nc.prog_electrolyzer_bg", "nc.prog_electrolyzer");
    Electrolyzer.addTank("inputLiq0", 49, 28, 18, "nc.tank_input");
    Electrolyzer.addTank("outputLiq0", 105, 18, 18, "nc.tank_output");
    Electrolyzer.addTank("outputLiq1", 125, 18, 18, "nc.tank_output");
    Electrolyzer.addTank("outputLiq2", 105, 38, 18, "nc.tank_output");
    Electrolyzer.addTank("outputLiq3", 125, 38, 18, "nc.tank_output");
    Electrolyzer.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "electrolyzer");
        }
    });

    export const NeutronIrradiator = new ProcessorWindowMaker("Neutron Irradiator");
    NeutronIrradiator.addScale("scaleProgress", 70, 35, "nc.prog_neutron_irradiator_bg", "nc.prog_neutron_irradiator");
    NeutronIrradiator.addTank("inputLiq0", 31, 34, 18, "nc.tank_input");
    NeutronIrradiator.addTank("inputLiq1", 51, 34, 18, "nc.tank_input");
    NeutronIrradiator.addTank("outputLiq0", 107, 30, 26, "nc.tank_output_large");
    NeutronIrradiator.addTank("outputLiq1", 135, 30, 26, "nc.tank_output_large");
    NeutronIrradiator.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "neutron_irradiator");
        }
    });

    export const IngotFormer = new ProcessorWindowMaker("Ingot Former");
    IngotFormer.addScale("scaleProgress", 74, 35, "nc.prog_ingot_former_bg", "nc.prog_ingot_former");
    IngotFormer.addTank("inputLiq0", 55, 34, 18, "nc.tank_input");
    IngotFormer.addSlot("output0", 111, 30, 26, "nc.slot_output_large");
    IngotFormer.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "ingot_former");
        }
    });

    export const Pressurizer = new ProcessorWindowMaker("Pressurizer");
    Pressurizer.addScale("scaleProgress", 74, 35, "nc.prog_pressurizer_bg", "nc.prog_pressurizer");
    Pressurizer.addSlot("input0", 55, 34, 18, "nc.slot_input");
    Pressurizer.addSlot("output0", 111, 30, 26, "nc.slot_output_large");
    Pressurizer.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "pressurizer");
        }
    });

    export const ChemicalReactor = new ProcessorWindowMaker("Chemical Reactor");
    ChemicalReactor.addScale("scaleProgress", 70, 34, "nc.prog_chemical_reactor_bg", "nc.prog_chemical_reactor");
    ChemicalReactor.addTank("inputLiq0", 31, 34, 18, "nc.tank_input");
    ChemicalReactor.addTank("inputLiq1", 51, 34, 18, "nc.tank_input");
    ChemicalReactor.addTank("outputLiq0", 107, 30, 26, "nc.tank_output_large");
    ChemicalReactor.addTank("outputLiq1", 135, 30, 26, "nc.tank_output_large");
    ChemicalReactor.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "chemical_reactor");
        }
    });

    export const SaltMixer = new ProcessorWindowMaker("Salt Mixer");
    SaltMixer.addScale("scaleProgress", 84, 34, "nc.prog_salt_mixer_bg", "nc.prog_salt_mixer");
    SaltMixer.addTank("inputLiq0", 45, 34, 18, "nc.tank_input");
    SaltMixer.addTank("inputLiq1", 65, 34, 18, "nc.tank_input");
    SaltMixer.addTank("outputLiq0", 121, 30, 26, "nc.tank_output_large");
    SaltMixer.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "salt_mixer");
        }
    });

    export const Crystallizer = new ProcessorWindowMaker("Crystallizer");
    Crystallizer.addScale("scaleProgress", 74, 35, "nc.prog_crystallizer_bg", "nc.prog_crystallizer");
    Crystallizer.addTank("inputLiq0", 55, 34, 18, "nc.tank_input");
    Crystallizer.addSlot("output0", 111, 30, 26, "nc.slot_output_large");
    Crystallizer.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "crystallizer");
        }
    });

    export const FluidEnricher = new ProcessorWindowMaker("Fluid Enricher");
    FluidEnricher.addScale("scaleProgress", 84, 35, "nc.prog_fluid_enricher_bg", "nc.prog_fluid_enricher");
    FluidEnricher.addSlot("input0", 45, 34, 18, "nc.slot_input");
    FluidEnricher.addTank("inputLiq0", 65, 34, 18, "nc.tank_input");
    FluidEnricher.addTank("outputLiq0", 121, 30, 26, "nc.tank_output_large");
    FluidEnricher.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_enricher");
        }
    });

    export const FluidExtractor = new ProcessorWindowMaker("Fluid Extractor");
    FluidExtractor.addScale("scaleProgress", 60, 35, "nc.prog_fluid_extractor_bg", "nc.prog_fluid_extractor");
    FluidExtractor.addSlot("input0", 41, 34, 18, "nc.slot_input");
    FluidExtractor.addSlot("output0", 97, 30, 26, "nc.slot_output_large");
    FluidExtractor.addTank("outputLiq0", 125, 30, 26, "nc.tank_output_large");
    FluidExtractor.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_extractor");
        }
    });

    export const Centrifuge = new ProcessorWindowMaker("Centrifuge");
    Centrifuge.addScale("scaleProgress", 68, 18, "nc.prog_centrifuge_bg", "nc.prog_centrifuge");
    Centrifuge.addTank("inputLiq0", 49, 28, 18, "nc.tank_input");
    Centrifuge.addTank("outputLiq0", 105, 18, 18, "nc.tank_output");
    Centrifuge.addTank("outputLiq1", 125, 18, 18, "nc.tank_output");
    Centrifuge.addTank("outputLiq2", 105, 38, 18, "nc.tank_output");
    Centrifuge.addTank("outputLiq3", 125, 38, 18, "nc.tank_output");
    Centrifuge.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "centrifuge");
        }
    });

    export const RockCrusher = new ProcessorWindowMaker("Rock Crusher");
    RockCrusher.addScale("scaleProgress", 56, 35, "nc.prog_rock_crusher_bg", "nc.prog_rock_crusher");
    RockCrusher.addSlot("input0", 55, 34, 18, "nc.slot_input");
    RockCrusher.addSlot("output0", 93, 34, 18, "nc.slot_output");
    RockCrusher.addSlot("output1", 113, 34, 18, "nc.slot_output");
    RockCrusher.addSlot("output2", 133, 34, 18, "nc.slot_output");
    RockCrusher.setClicker("scaleProgress", {
        onClick: () => {
            RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "rock_crusher");
        }
    });

    ProcessorRegistry.registerWindow(NCID.manufactory, Manufactory.makeWindow());
    ProcessorRegistry.registerWindow(NCID.isotope_separator, IsotopeSeparator.makeWindow());
    ProcessorRegistry.registerWindow(NCID.decay_hastener, DecayHastener.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fuel_reprocessor, FuelReprocessor.makeWindow());
    ProcessorRegistry.registerWindow(NCID.alloy_furnace, AlloyFurnace.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fluid_infuser, FluidInfuser.makeWindow());
    ProcessorRegistry.registerWindow(NCID.melter, Melter.makeWindow());
    ProcessorRegistry.registerWindow(NCID.supercooler, Supercooler.makeWindow());
    ProcessorRegistry.registerWindow(NCID.electrolyzer, Electrolyzer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.neutron_irradiator, NeutronIrradiator.makeWindow());
    ProcessorRegistry.registerWindow(NCID.ingot_former, IngotFormer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.pressurizer, Pressurizer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.chemical_reactor, ChemicalReactor.makeWindow());
    ProcessorRegistry.registerWindow(NCID.salt_mixer, SaltMixer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.crystallizer, Crystallizer.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fluid_enricher, FluidEnricher.makeWindow());
    ProcessorRegistry.registerWindow(NCID.fluid_extractor, FluidExtractor.makeWindow());
    ProcessorRegistry.registerWindow(NCID.centrifuge, Centrifuge.makeWindow());
    ProcessorRegistry.registerWindow(NCID.rock_crusher, RockCrusher.makeWindow());

}


Callback.addCallback("PreLoaded", () => {

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