

import { UsuariosEffects } from "./usuarios-effects/usuarios.effects"
import { UsuarioEffects } from "./usuario-effects/usuario.effects"
import { HeroesEffects } from "./heroes-effects/heroes.effects"
import { HeroeEffects } from "./heroe-effects/heroe.effects"
import { DeleteHeroeEffects } from './deleteheroe-effects/deleteheroe.effects';



export const effectsArr:any[]= [
    UsuariosEffects,
    UsuarioEffects,
    HeroesEffects,
    HeroeEffects,
    DeleteHeroeEffects
];


export * from './usuarios-effects/usuarios.effects'
export * from './usuario-effects/usuario.effects'
export * from './heroes-effects/heroes.effects'
export * from './heroe-effects/heroe.effects'
export * from './deleteheroe-effects/deleteheroe.effects'

