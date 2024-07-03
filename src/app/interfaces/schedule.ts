import { Veterinary } from 'src/app/interfaces/veterinary';
export class Schedule {
    id: number;
    startTime: string;
    stopTime: string;
    veterinary: Veterinary
}