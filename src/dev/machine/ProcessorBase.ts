abstract class ProcessorBase extends MachineBase {

    canReceiveEnergy(side: number, type: string): boolean {
        return true;
    }

    canExtractEnergy(side: number, type: string): boolean {
        return false;
    }

    energyReceive(type: string, amount: number, voltage: number): number {
        const add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
        this.data.energy += add;
        return add;
    }

}