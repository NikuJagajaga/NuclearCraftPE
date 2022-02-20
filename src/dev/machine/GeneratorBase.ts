abstract class GeneratorBase extends MachineBase {

    canReceiveEnergy(side: number, type: string): boolean {
        return false;
    }

    canExtractEnergy(side: number, type: string): boolean {
        return true;
    }

    energyTick(type: string, src: any): void {
        this.data.energy = src.add(this.data.energy);
    }

}