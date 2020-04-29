export class Cliente {
    constructor(
        public _id: string,
        public estado: string,
        public nombre_proyecto: string,
        public cedula: string,
        public nombres_apellidos: string,
        public telefono: number,
        public celular: number,
        public correo: string,
        public ciudad: string,
        public sector: string,
        public direccion: string,
        public medidas: string,
        public color_madekor_REL: any,
        public color_combinado_REL: any,
        public precio: number,
        public fecha_inicio_proyecto: string,
        public fecha_entrega_proyecto: string,
        public fecha_garantia_proyecto: string,
        public desc_garantia: string,
        public coti_ferreteria: any,
        public coti_madecor: any,
        public color_madecor: any,
        public color_combinado: any


    ) { }
}
