const ADD_ELEMENT = "ADD_ELEMENT";
const REMOVE_ELEMENT = "REMOVE_ELEMENT";
const GET_TREE = "GET_TREE";

let initialState = {
    treess: [],
    /*element: {
        id: '',
        name: ''
        //children:[], parentId:''
    },*/
    id: ''
}

const treeReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_ELEMENT:
            newState.treess = [...newState.treess, action.element];
            console.log(newState.treess);
            return newState;
        case REMOVE_ELEMENT:
            newState.treess = newState.treess.filter(element => element.id !== action.id);
            return newState;
        case GET_TREE:
            return newState;
        default:
            return newState;
    }
}

export function addElementActionCreator(data) {
    return { type: ADD_ELEMENT, element: data }
}

export function addElementThunkCreator(data) {
    return (dispatch) => {
        if (data == null) {
            alert(("Введите название"));
            return;
        }
        console.log(data);
        dispatch(addElementActionCreator(data));
        return data;
    }
}

export function removeElementActionCreator(data) {
    return { type: REMOVE_ELEMENT, id: data }
}

export function removeElementThunkCreator(id) {
    return (dispatch) => {
        /*if (id == null) {
            alert(("Введите название"));
            return;
        }*/
        console.log(id);
        dispatch(removeElementActionCreator(id));
        return id;
    }
}

export function getTreeActionCreator(data) {
    return { type: GET_TREE }
}

export function getTreeThunkCreator(id) {
    return (dispatch) => {
        
        console.log(id);
        dispatch(getTreeActionCreator(id));
        //return id;
    }
}

export default treeReducer;