import {
        auth,
        startLoading,
        finishLoading,
        database
    } from './';

import {SET_HOUSES,ADD_HOUSE, UPDATE_HOUSE,DELETE_HOUSE} from './actionTypes';

const housesRef= database.ref().child('houses');

const setHouses = houses => {
    return {
        type:SET_HOUSES,
        houses
    }
}

const addHouse = house => {
    return {
        type:ADD_HOUSE,
        house
    }
}

const updateNewHouse = house => {
    return {
        type:UPDATE_HOUSE,
        house
    }
}

const removeHouse = key => {
    return {
        type:DELETE_HOUSE,
        key
    }
}


export const shareHouse = house => {
    return dispatch => {
        dispatch(startLoading())
        
        const houseData= {
            ...house,
            owner:auth.currentUser.uid,
            ownerData:{
                name:auth.currentUser.displayName,
                email:auth.currentUser.email
            }
        }
        const newHouseRef=housesRef.push();
        newHouseRef.set(houseData,error=>{
            dispatch(finishLoading());
            if(error){
                alert("failed");
            }
            else{
                dispatch(addHouse({...houseData,key:newHouseRef.key}));
                alert("success");
            }
        })
    }
}



export const getHouses = () => {
    return dispatch => {
        dispatch(startLoading());
        housesRef
            .once("value")
            .then(snapshot=>{
                dispatch(finishLoading());
                const houses = snapshot.val();
                const housesArray = Object.keys(houses)
                    .map(id=> {
                        return {
                            ...houses[id],
                            key:id
                        }
                    });
                dispatch(setHouses(housesArray));
                
            })
            .catch(error=>{
                console.log("Fetch houses error");
                dispatch(finishLoading());
            })
    }
}

export const deleteHouse = ref => {
    return dispatch => {
        dispatch(startLoading());
       return housesRef.child(ref)
            .remove(error=>{
                if(error){
                    alert("Couldn't delete");
                }
                else{
                    dispatch(removeHouse(ref));
                    alert("deleted");
                }
                dispatch(finishLoading());
            });
    }
}

export const updateHouse = (key,newHouse) => {
    return dispatch => {
        dispatch(startLoading());
        const newHouseData= {
            ...newHouse,
            owner:auth.currentUser.uid,
            ownerData:{
                name:auth.currentUser.displayName,
                email:auth.currentUser.email
            }
        }
        housesRef.child(key).set(newHouseData,error=>{
            dispatch(finishLoading())
            if(error){
                alert("update error");
            }
            else{
                dispatch(updateNewHouse({...newHouseData,key}));
                alert("update success");
            }            
        })

    }
}