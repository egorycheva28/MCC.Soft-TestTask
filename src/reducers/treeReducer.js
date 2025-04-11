const ADD_ELEMENT = "ADD_ELEMENT";
const REMOVE_ELEMENT = "REMOVE_ELEMENT";
const EDIT_ELEMENT = "EDIT_ELEMENT";
const GET_TREE = "GET_TREE";
const RESET_TREE = "RESET_TREE";

let initialState = {
    tree: [],
    id: ''
}

const treeReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_ELEMENT:
            newState.tree = [...newState.tree, action.element];
            return newState;
        case REMOVE_ELEMENT:
            newState.tree = newState.tree.filter(element => element.id !== action.id);
            return newState;
        case EDIT_ELEMENT:
            newState.tree = newState.tree.map((item) => {
                if (item.id === action.id) {
                    return { ...item, name: action.element };
                }
                return item;
            });
            return newState;
        case GET_TREE:
            return newState;
        case RESET_TREE:
            newState.tree = action.tree;
            return newState;
        default:
            return newState;
    }
}

export function addElementActionCreator(data) {
    return { type: ADD_ELEMENT, element: data }
}

export function addElementThunkCreator(element) {
    return (dispatch) => {
        if (element.name == '') {
            alert(("Введите название элемента"));
            return;
        }
        dispatch(addElementActionCreator(element));
    }
}

export function removeElementActionCreator(data) {
    return { type: REMOVE_ELEMENT, id: data }
}

export function removeElementThunkCreator(id) {
    return (dispatch) => {
        if (id == null) {
            alert(("Выберите элемент для удаления"));
            return;
        }
        dispatch(removeElementActionCreator(id));
    }
}

export function editElementActionCreator(elementId, elementName) {
    return { type: EDIT_ELEMENT, id: elementId, element: elementName }
}

export function editElementThunkCreator(elementId, elementName) {
    return (dispatch) => {
        if (elementId == null) {
            alert(("Выберите элемент для редактирования"));
            return;
        }
        if (elementName == '') {
            alert(("Введите название элемента"));
            return;
        }
        dispatch(editElementActionCreator(elementId, elementName));
    }
}

export function getTreeActionCreator() {
    return { type: GET_TREE }
}

export function getTreeThunkCreator() {
    return (dispatch) => {
        dispatch(getTreeActionCreator());
    }
}

export function resetTreeActionCreator() {
    return { type: RESET_TREE, tree: [] }
}

export function resetTreeThunkCreator() {
    return (dispatch) => {
        dispatch(resetTreeActionCreator());
    }
}

export default treeReducer;