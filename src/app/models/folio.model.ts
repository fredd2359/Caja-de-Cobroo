import {Serie} from './serie.model';

export class Folio {
    constructor(
        public id:number,
        public numeroFolio:number,
        public estadoFolio:string,
        public fechaAlta:string,
        public serie:Serie
    ){

    }
}