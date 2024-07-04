import { Veterinary } from 'src/app/interfaces/veterinary';
import { Pet } from 'src/app/interfaces/pet';

export class Appointment {
    id: number;
    initTime: string;
    endTime: string;
    reason: string;
    diagnosis: string;
    treatment: string;
    veterinary: Veterinary;
    pet: Pet;
}