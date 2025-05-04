export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    email: string;
}

export interface Appointment {
    id: string;
    patientName: string;
    dateTime: string;
    type: 'presential' | 'remote';
    reason: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Activity {
    id: string;
    type: string;
    message: string;
    time: string;
}

export interface Stats {
    appointments: number;
    patients: number;
    prescriptions: number;
}