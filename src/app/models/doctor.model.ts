export class DoctorModel {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public phone: string,
        public email: string,
        private date: Date
    ) {
    }
}

