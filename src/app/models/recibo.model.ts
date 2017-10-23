import {Folio} from './folio.model';

export class Recibo{
    constructor(
        public id:number,
        public clave:number,
        public fecha:string,
        public estatus:string,
        public folio:Folio
    ){

    }
}