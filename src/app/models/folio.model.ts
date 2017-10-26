import {Serie} from './serie.model';
import {Cajero} from './Cajero.model' ;
 
export class Folio {
    constructor(
        public id:number,
        public numeroFolio:number,
        public estadoFolio:string,
        public fechaAlta:string,
        public cajero:Cajero,
        public serie:Serie
    ){

    }
}