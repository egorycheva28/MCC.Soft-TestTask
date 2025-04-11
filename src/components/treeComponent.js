import React, { useState, useEffect, Children } from "react";
import "./treeComponent.css";
import Modal from "react-modal";
import Element from "./treeComponentItem";
import { useDispatch, useSelector } from "react-redux";
import { addElementThunkCreator, editElementThunkCreator, getTreeThunkCreator, removeElementThunkCreator, resetTreeThunkCreator } from "../reducers/treeReducer";

Modal.setAppElement('#root');

const Tree = () => {
    const dispatch = useDispatch()

    const [selectedId, setSelectedId] = useState(null);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [currentElementId, setCurrentElementId] = useState(1);
    const [editName, setEditName] = useState("");
    const trees = useSelector(state => state.treeReducer.tree);

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

    const addElement = () => {
        const newElement = {
            id: currentElementId,
            name: name,
            children: []
        };

        dispatch(addElementThunkCreator(newElement, selectedId));
        setCurrentElementId(currentElementId + 1);
        setName('');
        setAddModalIsOpen(false);
        setSelectedId(null);
    };

    const editElement = () => {
        dispatch(editElementThunkCreator(selectedId, editName));
        setEditName('');
        setEditModalIsOpen(false);
        setSelectedId(null);
    };

    const removeElement = () => {
        dispatch(removeElementThunkCreator(selectedId));
        setSelectedId(null);
    };

    const resetTree = () => {
        dispatch(resetTreeThunkCreator());
        setSelectedId(null);
    };

    useEffect(() => {
        dispatch(getTreeThunkCreator());
    }, [dispatch]);

    console.log(selectedId);

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
                                <Element name={value.name} children={value.children} id={value.id} key={value.id} setSelectedId={setSelectedId} selectedId={selectedId} />
                            ))
                        }
                    </div>
                </div>
                <div className="row3">
                    <button onClick={openAddModal} className="textButton">Add</button>
                    <Modal isOpen={addModalIsOpen} onRequestClose={closeAddModal} className="modal">
                        <div className="content">
                            <button onClick={closeAddModal} className="closeButton">&times;{ }</button>
                            <h3>Add element</h3>
                            <label className="text">Name</label>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите название элемента' ></input>
                            <button onClick={addElement}>Add</button>
                        </div>
                    </Modal>
                    <button onClick={removeElement} className="textButton">Remove</button>
                    <button onClick={openEditModal} className="textButton">Edit</button>
                    <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} className="modal">
                        <div className="content">
                            <button onClick={closeEditModal} className="closeButton">&times;{ }</button>
                            <h3>Edit element</h3>
                            <label className="text">Name</label>
                            <input type='text' value={editName} onChange={(e) => setEditName(e.target.value)} placeholder='Введите название элемента'></input>
                            <button onClick={editElement}>Save</button>
                        </div>
                    </Modal>
                    <button onClick={resetTree} className="textButton">Reset</button>
                </div>
            </div>
        </div>
    );
};

export default Tree;