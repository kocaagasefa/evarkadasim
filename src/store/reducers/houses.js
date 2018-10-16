import {SET_HOUSES,ADD_HOUSE,UPDATE_HOUSE,DELETE_HOUSE} from '../actions/actionTypes';

const initialState = {
    houses:[]
}

const housesReducer = (state=initialState,action) => {
    
    switch(action.type){
        case SET_HOUSES:
        return {
            ...state,
            houses:[...action.houses]
        }
        case ADD_HOUSE:
        return {
            ...state,
            houses:[action.house,...state.houses]
        }
        case UPDATE_HOUSE:
        return {
            ...state,
            houses:state.houses.map(house=>house.key===action.house.key?action.house:house)
        }
        case DELETE_HOUSE:
        console.log("deleting")
        return {
            ...state,
            houses:state.houses.filter(house=>house.key!==action.key)
        }
        default:
        return state;
    }
}

export default housesReducer;