import * as fromHeroes from '../../actions/heroes-actions/heroes.actions';

export interface HeroesState{
    heroes:any[];
    loaded:boolean;
    loading: boolean;
    error:any;

}

const estadoInicial: HeroesState ={ 
    heroes:[],
    loaded:false,
    loading:false,
    error:null
};


    export function heroesReducer(state = estadoInicial, action:fromHeroes.heroesAcciones): HeroesState{
    
        switch (action.type) {

            case fromHeroes.CARGAR_HEROES:
                
                return{
                    ...state,
                    loading:true,
                    error:null 
                };
      
            case fromHeroes.CARGAR_HEROES_SUCCESS:

            return{
                  ...state,
                  loaded:true,
                  loading:false,
                  heroes: [...action.heroes]
            };

            case fromHeroes.CARGAR_HEROES_FAIL:

            return{
                ...state,
                loaded:false,
                loading:false,
                error:{
                    status:action.payload.status,
                    message:action.payload.message,
                    url:action.payload.url
                }
            }
                
        
            default:
                return state;
        }
        

    }

    