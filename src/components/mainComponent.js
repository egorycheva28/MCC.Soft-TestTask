import React, { useState, useEffect } from "react";
import "./mainComponent.css";
import Modal from "react-modal";
import Element from "./componentItem";
import store from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addElementThunkCreator, getTreeThunkCreator, removeElementThunkCreator } from "../reducers/treeReducer";

Modal.setAppElement('#root');

const Tree = ({ treeReducers }) => {
    const dispatch = useDispatch()

    const [selectedId, setSelectedId] = useState(null);
    const [tree, setTree] = useState();
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [currentElement, setCurrentElement] = useState(1);
    const [parent, setParent] = useState("");
    const trees = useSelector(state => state.treeReducers.treess);

    const openAddModal = () => {
        setAddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setAddModalIsOpen(false);
    };

    const openEditModal = () => {
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const addElement = async () => {
        const newElement = {
            id: currentElement,
            name: name
        };
        await dispatch(addElementThunkCreator(newElement));
        setCurrentElement(currentElement+1);
        //setTree();
        setTree(name);
    };

    const editElement = () => {

    };

    const removeElement = async () => {
        dispatch(removeElementThunkCreator(selectedId));
        const da = await dispatch(getTreeThunkCreator());
        setTree(da);
    };

    const resetTree = () => {
        setTree();
    };

    useEffect(() => {
       
        const fetchData = async () => {

            //setTree("Hello");
            /*let data = {
                id: 1,
                name: "qwe"
            };
            await dispatch(addElementThunkCreator(data));*/
           

            dispatch(getTreeThunkCreator());
            setTree(store.getState());
            //console.log(da);
            console.log(store.getState().treeReducers.treess);
            //console.log(store.getState().treeReducer.element);
            //console.log(trees);

        };
        /*{
                                    treeReducer.element.map((value) => {
                                        <Element name={value.name} id={value.id} key={value.id} />
                                    })
                                } */
        fetchData();
    }, [dispatch]);
    console.log(trees);
    console.log(selectedId);
    console.log(store.getState());
    //console.log(treeReducer.treess);
    return (
        <div className="container">
            <div className="box">
                <div className="row1">
                    <span className="header">Tree</span>
                </div>
                <div className="row2">
                    <div className="elements">
                        {
                            trees.map((value) => (
                                <Element name={value.name} id={value.id} key={value.id} setSelectedId={setSelectedId}/>
                            ))
                        }

                    </div>
                </div>
                <div className="row3">
                    <button onClick={openAddModal} className="text">Add</button>
                    <Modal isOpen={addModalIsOpen} onRequestClose={closeAddModal} className="modal-content">
                        <div className="content">
                            <button onClick={closeAddModal} className="closeButton">&times;{ }</button>
                            <h3>Add element</h3>
                            <label>Название</label>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите название элемента' ></input>
                            <label>родительский элемент</label>
                            <input type='text' value={parent} onChange={(e) => setParent(e.target.value)}></input>
                            <button onClick={addElement}>Add</button>
                        </div>
                    </Modal>
                    <button onClick={removeElement} className="text">Remove</button>

                    <button onClick={openEditModal} className="text">Edit</button>
                    <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} className="modal-content">
                        <div className="content">
                            <button onClick={closeEditModal} className="closeButton">&times;{ }</button>
                            <h3>Edit element</h3>
                            <label>Название</label>
                            <input></input>
                            <button onClick={editElement}>Save</button>
                        </div>
                    </Modal>
                    <button onClick={resetTree} className="text">Reset</button>
                </div>
            </div>
        </div>
    );
};

export default Tree;