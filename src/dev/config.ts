__config__.checkAndRestore({
    SlotsLikeVanilla: false,
    ore_copper:    {enabled: true, rate: 5, size: 6, minY: 0, maxY: 48},
    ore_tin:       {enabled: true, rate: 4, size: 6, minY: 0, maxY: 40},
    ore_lead:      {enabled: true, rate: 6, size: 6, minY: 0, maxY: 36},
    ore_thorium:   {enabled: true, rate: 4, size: 4, minY: 0, maxY: 32},
    ore_uranium:   {enabled: true, rate: 4, size: 4, minY: 0, maxY: 32},
    ore_boron:     {enabled: true, rate: 6, size: 5, minY: 0, maxY: 28},
    ore_lithium:   {enabled: true, rate: 6, size: 5, minY: 0, maxY: 28},
    ore_magnesium: {enabled: true, rate: 4, size: 5, minY: 0, maxY: 24}
});


namespace NCConfig {

    export const SlotsLikeVanilla = __config__.getBool("SlotsLikeVanilla");

    export interface OreProperty {
        enabled: boolean;
        rate: number;
        size: number;
        minY: number;
        maxY: number;
    }

    export const ore_copper: OreProperty = {
        enabled: __config__.getBool("ore.copper.enabled"),
        rate: __config__.getNumber("ore.copper.rate").intValue(),
        size: __config__.getNumber("ore.copper.size").intValue(),
        minY: __config__.getNumber("ore.copper.minY").intValue(),
        maxY: __config__.getNumber("ore.copper.maxY").intValue()
    };
    export const ore_tin: OreProperty = {
        enabled: __config__.getBool("ore.tin.enabled"),
        rate: __config__.getNumber("ore.tin.rate").intValue(),
        size: __config__.getNumber("ore.tin.size").intValue(),
        minY: __config__.getNumber("ore.tin.minY").intValue(),
        maxY: __config__.getNumber("ore.tin.maxY").intValue()
    };
    export const ore_lead: OreProperty = {
        enabled: __config__.getBool("ore.lead.enabled"),
        rate: __config__.getNumber("ore.lead.rate").intValue(),
        size: __config__.getNumber("ore.lead.size").intValue(),
        minY: __config__.getNumber("ore.lead.minY").intValue(),
        maxY: __config__.getNumber("ore.lead.maxY").intValue()
    };
    export const ore_thorium: OreProperty = {
        enabled: __config__.getBool("ore.thorium.enabled"),
        rate: __config__.getNumber("ore.thorium.rate").intValue(),
        size: __config__.getNumber("ore.thorium.size").intValue(),
        minY: __config__.getNumber("ore.thorium.minY").intValue(),
        maxY: __config__.getNumber("ore.thorium.maxY").intValue()
    };
    export const ore_uranium: OreProperty = {
        enabled: __config__.getBool("ore.uranium.enabled"),
        rate: __config__.getNumber("ore.uranium.rate").intValue(),
        size: __config__.getNumber("ore.uranium.size").intValue(),
        minY: __config__.getNumber("ore.uranium.minY").intValue(),
        maxY: __config__.getNumber("ore.uranium.maxY").intValue()
    };
    export const ore_boron: OreProperty = {
        enabled: __config__.getBool("ore.boron.enabled"),
        rate: __config__.getNumber("ore.boron.rate").intValue(),
        size: __config__.getNumber("ore.boron.size").intValue(),
        minY: __config__.getNumber("ore.boron.minY").intValue(),
        maxY: __config__.getNumber("ore.boron.maxY").intValue()
    };
    export const ore_lithium: OreProperty = {
        enabled: __config__.getBool("ore.lithium.enabled"),
        rate: __config__.getNumber("ore.lithium.rate").intValue(),
        size: __config__.getNumber("ore.lithium.size").intValue(),
        minY: __config__.getNumber("ore.lithium.minY").intValue(),
        maxY: __config__.getNumber("ore.lithium.maxY").intValue()
    };
    export const ore_magnesium: OreProperty = {
        enabled: __config__.getBool("ore.magnesium.enabled"),
        rate: __config__.getNumber("ore.magnesium.rate").intValue(),
        size: __config__.getNumber("ore.magnesium.size").intValue(),
        minY: __config__.getNumber("ore.magnesium.minY").intValue(),
        maxY: __config__.getNumber("ore.magnesium.maxY").intValue()
    };
};