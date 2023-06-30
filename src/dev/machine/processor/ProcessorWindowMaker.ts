class ProcessorWindowMaker extends NCWindowMaker {

    constructor(title: string){

        const width = 176;
        const height = 86;

        super(title, width, height);

        //energy scale
        this.addDrawing("", {type: "frame", x: 7, y: 5, width: 18, height: 76, bitmap: "nc.frame"});
        this.addElements("scaleEnergy", {type: "scale", x: 8, y: 6, bitmap: "nc.energy", direction: WindowMaker.SCALE_UP});
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
        this.addSlot("slotUpgSpeed", 131, 63, 18, "nc.slot_upg_speed");
        this.addSlot("slotUpgEnergy", 151, 63, 18, "nc.slot_upg_energy");

        //this.addElements("buttonRedstone", {type: "button", x: 27, y: 63, bitmap: "nc.button_rs_off", scale: 0.5});

    }

}