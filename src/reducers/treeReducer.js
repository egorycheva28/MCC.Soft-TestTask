const ADD_ELEMENT = "ADD_ELEMENT";
const REMOVE_ELEMENT = "REMOVE_ELEMENT";
const EDIT_ELEMENT = "EDIT_ELEMENT";
const GET_TREE = "GET_TREE";
const RESET_TREE = "RESET_TREE";

let initialState = {
    tree: []
}

const treeReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_ELEMENT:
            newState.tree = addElement(newState.tree, action.element, action.parentId);
            return newState;
        case REMOVE_ELEMENT:
            newState.tree = removeElement(newState.tree, action.id);
            return newState;
        case EDIT_ELEMENT:
            newState.tree = newState.tree.map((element) => {
                if (element.id === action.id) {
                    return { ...element, name: action.editElement };
                }
                return element;
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

const addElement = (tree, newElement, parentId) => {
    if (parentId === null) {
        return [...tree, newElement];
    }

    return tree.map(element => {
        if (element.id === parentId) {
            return {
                ...element,
                children: [...(element.children), newElement]
            };
        } else if (element.children) {
            return {
                ...element,
                children: addElement(element.children, newElement, parentId)
            };
        }
        return element;
    });
};

const removeElement = (tree, elementId) => {
    return tree.reduce((accumulator, element) => {
        if (element.id === elementId) {
            return accumulator;
        }
        const children = removeElement(element.children, elementId);
        return [...accumulator, { ...element, children }];
    }, []);
}

export function addElementActionCreator(data, parentId) {
    return { type: ADD_ELEMENT, element: data, parentId: parentId }
}

export function addElementThunkCreator(element, parentId) {
    return (dispatch) => {
        if (!element.name) {
            alert(("Введите название элемента"));
            return;
        }

        dispatch(addElementActionCreator(element, parentId));
    }
}

export function removeElementActionCreator(data) {
    return { type: REMOVE_ELEMENT, id: data }
}

export function removeElementThunkCreator(elementId) {
    return (dispatch) => {
        if (!elementId) {
            alert(("Выберите элемент для удаления"));
            return;
        }
        dispatch(removeElementActionCreator(elementId));
    }
}

export function editElementActionCreator(elementId, elementName) {
    return { type: EDIT_ELEMENT, id: elementId, editElement: elementName }
}

export function editElementThunkCreator(elementId, elementName) {
    return (dispatch) => {
        if (!elementId) {
            alert(("Выберите элемент для редактирования"));
            return;
        }
        if (!elementName) {
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