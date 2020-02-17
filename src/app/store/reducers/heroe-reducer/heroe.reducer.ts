import * as fromHeroe from '../../actions/heroe-actions/heroe.actions';
import { HeroeModel } from '../../../models/heroe.model';

export interface HeroeState{
    heroe:HeroeModel;
    loaded:boolean;
    loading: boolean;
    error:any;

}

const estadoInicial: HeroeState ={ 
    heroe:null,
    loaded:false,
    loading:false,
    error:null
};


    export function heroeReducer(state = estadoInicial, action:fromHeroe.heroeAcciones): HeroeState{
    
        switch (action.type) {

            case fromHeroe.CARGAR_HEROE:
                
                return{
                    ...state,
                    loading:true,
                    error:null 
                };

            case fromHeroe.ELIMINAR_HEROE:
            
                return{
                    ...state,
                    error:null
                };

                case fromHeroe.ELIMINAR_HEROE_FAIL:
            
                    return{
                        ...state,
                        loaded:false,
                        loading:false,
                        error:{
                            status:action.payload.status,
                            message:action.payload.message,
                            url:action.payload.url
                        }
                    };
      
            case fromHeroe.CARGAR_HEROE_SUCCESS:

            return{
                  ...state,
                  loaded:true,
                  loading:false,
                  heroe: {...action.heroe}
            };

            case fromHeroe.CARGAR_HEROE_FAIL:

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

    