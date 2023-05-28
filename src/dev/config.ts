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
        enabled: __config__.getBool("ore_copper.enabled"),
        rate: __config__.getNumber("ore_copper.rate").intValue(),
        size: __config__.getNumber("ore_copper.size").intValue(),
        minY: __config__.getNumber("ore_copper.minY").intValue(),
        maxY: __config__.getNumber("ore_copper.maxY").intValue()
    };
    export const ore_tin: OreProperty = {
        enabled: __config__.getBool("ore_tin.enabled"),
        rate: __config__.getNumber("ore_tin.rate").intValue(),
        size: __config__.getNumber("ore_tin.size").intValue(),
        minY: __config__.getNumber("ore_tin.minY").intValue(),
        maxY: __config__.getNumber("ore_tin.maxY").intValue()
    };
    export const ore_lead: OreProperty = {
        enabled: __config__.getBool("ore_lead.enabled"),
        rate: __config__.getNumber("ore_lead.rate").intValue(),
        size: __config__.getNumber("ore_lead.size").intValue(),
        minY: __config__.getNumber("ore_lead.minY").intValue(),
        maxY: __config__.getNumber("ore_lead.maxY").intValue()
    };
    export const ore_thorium: OreProperty = {
        enabled: __config__.getBool("ore_thorium.enabled"),
        rate: __config__.getNumber("ore_thorium.rate").intValue(),
        size: __config__.getNumber("ore_thorium.size").intValue(),
        minY: __config__.getNumber("ore_thorium.minY").intValue(),
        maxY: __config__.getNumber("ore_thorium.maxY").intValue()
    };
    export const ore_uranium: OreProperty = {
        enabled: __config__.getBool("ore_uranium.enabled"),
        rate: __config__.getNumber("ore_uranium.rate").intValue(),
        size: __config__.getNumber("ore_uranium.size").intValue(),
        minY: __config__.getNumber("ore_uranium.minY").intValue(),
        maxY: __config__.getNumber("ore_uranium.maxY").intValue()
    };
    export const ore_boron: OreProperty = {
        enabled: __config__.getBool("ore_boron.enabled"),
        rate: __config__.getNumber("ore_boron.rate").intValue(),
        size: __config__.getNumber("ore_boron.size").intValue(),
        minY: __config__.getNumber("ore_boron.minY").intValue(),
        maxY: __config__.getNumber("ore_boron.maxY").intValue()
    };
    export const ore_lithium: OreProperty = {
        enabled: __config__.getBool("ore_lithium.enabled"),
        rate: __config__.getNumber("ore_lithium.rate").intValue(),
        size: __config__.getNumber("ore_lithium.size").intValue(),
        minY: __config__.getNumber("ore_lithium.minY").intValue(),
        maxY: __config__.getNumber("ore_lithium.maxY").intValue()
    };
    export const ore_magnesium: OreProperty = {
        enabled: __config__.getBool("ore_magnesium.enabled"),
        rate: __config__.getNumber("ore_magnesium.rate").intValue(),
        size: __config__.getNumber("ore_magnesium.size").intValue(),
        minY: __config__.getNumber("ore_magnesium.minY").intValue(),
        maxY: __config__.getNumber("ore_magnesium.maxY").intValue()
    };
};