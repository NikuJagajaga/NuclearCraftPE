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

    export const Manufactory = new ProcessorWindowMaker("Manufactory")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_manufactory_bg", "nc.prog_manufactory")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "manufactory");
            }
        });

    export const IsotopeSeparator = new ProcessorWindowMaker("Isotope Separator")
        .addProgressBar("scaleProgress", 60, 34, "nc.prog_isotope_separator_bg", "nc.prog_isotope_separator")
        .addSlot("input0", 41, 34, 18, "nc.slot_input")
        .addSlot("output0", 97, 30, 26, "nc.slot_output_large")
        .addSlot("output1", 125, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "isotope_separator");
            }
        });

    export const DecayHastener = new ProcessorWindowMaker("Decay Hastener")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_decay_hastener_bg", "nc.prog_decay_hastener")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "decay_hastener");
            }
        });

    export const FuelReprocessor = new ProcessorWindowMaker("Fuel Reprocessor")
        .addProgressBar("scaleProgress", 68, 18, "nc.prog_fuel_reprocessor_bg", "nc.prog_fuel_reprocessor")
        .addSlot("input0", 49, 28, 18, "nc.slot_input")
        .addSlot("output0", 105, 18, 18, "nc.slot_output")
        .addSlot("output1", 125, 18, 18, "nc.slot_output")
        .addSlot("output2", 105, 38, 18, "nc.slot_output")
        .addSlot("output3", 125, 38, 18, "nc.slot_output")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fuel_reprocessor");
            }
        });

    export const AlloyFurnace = new ProcessorWindowMaker("Alloy Furnace")
        .addProgressBar("scaleProgress", 84, 35, "nc.prog_alloy_furnace_bg", "nc.prog_alloy_furnace")
        .addSlot("input0", 45, 34, 18, "nc.slot_input")
        .addSlot("input1", 65, 34, 18, "nc.slot_input")
        .addSlot("output0", 121, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "alloy_furnace");
            }
        });

    export const FluidInfuser = new ProcessorWindowMaker("Fluid Infuser")
        .addProgressBar("scaleProgress", 84, 35, "nc.prog_fluid_infuser_bg", "nc.prog_fluid_infuser")
        .addSlot("input0", 45, 34, 18, "nc.slot_input")
        .addTank("inputLiq0", 65, 34, 18, "nc.tank_input")
        .addSlot("output0", 121, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_infuser");
            }
        });

    export const Melter = new ProcessorWindowMaker("Melter")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_melter_bg", "nc.prog_melter")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addTank("outputLiq0", 111, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "melter");
            }
        });

    export const Supercooler = new ProcessorWindowMaker("Supercooler")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_supercooler_bg", "nc.prog_supercooler")
        .addTank("inputLiq0", 55, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 111, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "supercooler");
            }
        });

    export const Electrolyzer = new ProcessorWindowMaker("Electrolyzer")
        .addProgressBar("scaleProgress", 68, 18, "nc.prog_electrolyzer_bg", "nc.prog_electrolyzer")
        .addTank("inputLiq0", 49, 28, 18, "nc.tank_input")
        .addTank("outputLiq0", 105, 18, 18, "nc.tank_output")
        .addTank("outputLiq1", 125, 18, 18, "nc.tank_output")
        .addTank("outputLiq2", 105, 38, 18, "nc.tank_output")
        .addTank("outputLiq3", 125, 38, 18, "nc.tank_output")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "electrolyzer");
            }
        });

    export const NeutronIrradiator = new ProcessorWindowMaker("Neutron Irradiator")
        .addProgressBar("scaleProgress", 70, 35, "nc.prog_neutron_irradiator_bg", "nc.prog_neutron_irradiator")
        .addTank("inputLiq0", 31, 34, 18, "nc.tank_input")
        .addTank("inputLiq1", 51, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 107, 30, 26, "nc.tank_output_large")
        .addTank("outputLiq1", 135, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "neutron_irradiator");
            }
        });

    export const IngotFormer = new ProcessorWindowMaker("Ingot Former")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_ingot_former_bg", "nc.prog_ingot_former")
        .addTank("inputLiq0", 55, 34, 18, "nc.tank_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "ingot_former");
            }
        });

    export const Pressurizer = new ProcessorWindowMaker("Pressurizer")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_pressurizer_bg", "nc.prog_pressurizer")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "pressurizer");
            }
        });

    export const ChemicalReactor = new ProcessorWindowMaker("Chemical Reactor")
        .addProgressBar("scaleProgress", 70, 34, "nc.prog_chemical_reactor_bg", "nc.prog_chemical_reactor")
        .addTank("inputLiq0", 31, 34, 18, "nc.tank_input")
        .addTank("inputLiq1", 51, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 107, 30, 26, "nc.tank_output_large")
        .addTank("outputLiq1", 135, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "chemical_reactor");
            }
        });

    export const SaltMixer = new ProcessorWindowMaker("Salt Mixer")
        .addProgressBar("scaleProgress", 84, 34, "nc.prog_salt_mixer_bg", "nc.prog_salt_mixer")
        .addTank("inputLiq0", 45, 34, 18, "nc.tank_input")
        .addTank("inputLiq1", 65, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 121, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "salt_mixer");
            }
        });

    export const Crystallizer = new ProcessorWindowMaker("Crystallizer")
        .addProgressBar("scaleProgress", 74, 35, "nc.prog_crystallizer_bg", "nc.prog_crystallizer")
        .addTank("inputLiq0", 55, 34, 18, "nc.tank_input")
        .addSlot("output0", 111, 30, 26, "nc.slot_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "crystallizer");
            }
        });

    export const FluidEnricher = new ProcessorWindowMaker("Fluid Enricher")
        .addProgressBar("scaleProgress", 84, 35, "nc.prog_fluid_enricher_bg", "nc.prog_fluid_enricher")
        .addSlot("input0", 45, 34, 18, "nc.slot_input")
        .addTank("inputLiq0", 65, 34, 18, "nc.tank_input")
        .addTank("outputLiq0", 121, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_enricher");
            }
        });

    export const FluidExtractor = new ProcessorWindowMaker("Fluid Extractor")
        .addProgressBar("scaleProgress", 60, 35, "nc.prog_fluid_extractor_bg", "nc.prog_fluid_extractor")
        .addSlot("input0", 41, 34, 18, "nc.slot_input")
        .addSlot("output0", 97, 30, 26, "nc.slot_output_large")
        .addTank("outputLiq0", 125, 30, 26, "nc.tank_output_large")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "fluid_extractor");
            }
        });

    export const Centrifuge = new ProcessorWindowMaker("Centrifuge")
        .addProgressBar("scaleProgress", 68, 18, "nc.prog_centrifuge_bg", "nc.prog_centrifuge")
        .addTank("inputLiq0", 49, 28, 18, "nc.tank_input")
        .addTank("outputLiq0", 105, 18, 18, "nc.tank_output")
        .addTank("outputLiq1", 125, 18, 18, "nc.tank_output")
        .addTank("outputLiq2", 105, 38, 18, "nc.tank_output")
        .addTank("outputLiq3", 125, 38, 18, "nc.tank_output")
        .setClicker("scaleProgress", {
            onClick: () => {
                RV && RV.RecipeTypeRegistry.openRecipePage(NCItem.PREFIX + "centrifuge");
            }
        });

    export const RockCrusher = new ProcessorWindowMaker("Rock Crusher")
        .addProgressBar("scaleProgress", 56, 35, "nc.prog_rock_crusher_bg", "nc.prog_rock_crusher")
        .addSlot("input0", 55, 34, 18, "nc.slot_input")
        .addSlot("output0", 93, 34, 18, "nc.slot_output")
        .addSlot("output1", 113, 34, 18, "nc.slot_output")
        .addSlot("output2", 133, 34, 18, "nc.slot_output")
        .setClicker("scaleProgress", {
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