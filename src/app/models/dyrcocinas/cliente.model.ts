export class Cliente {
    constructor(
        public _id: string,
        public estado : string= "En Espera" ,
        public nombre_proyecto : string,
        public cedula : string,
        public nombres_apellidos : string,
        public telefono : number,
        public celular : number,
        public ciudad : string,
        public sector : string,
        public direccion : string,
        public medidas : string,
        public color_madekor_REL : string,
        public color_combinado_REL : string,
        public precio : number,
        public anticipo_70 : number,
        public resta_cliente : number,
        public fecha_inicio_proyecto : string,
        public fecha_entrega_proyecto : string,
        public fecha_garantia_proyecto : string,
        public desc_garantia : string
    ) { }
}
