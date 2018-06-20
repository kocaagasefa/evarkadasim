import {START_LOADING,FINISH_LOADING} from './actionTypes';

export const startLoading = () => {
    return {
        type:START_LOADING
    }
}

export const finishLoading = () => {
    return {
        type:FINISH_LOADING
    }
}