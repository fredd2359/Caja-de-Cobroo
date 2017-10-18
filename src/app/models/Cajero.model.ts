import {Caja} from './caja.model'
export class Cajero{
    constructor(
        
    public idCajero:number,
    public nombre:string,
    public apellidos:string,
    public fondo:number,
    public id:number,
    public cajas:Caja
    ){

    }
}