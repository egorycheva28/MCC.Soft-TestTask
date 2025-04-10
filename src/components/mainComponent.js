import React, { useState, useEffect } from "react";
import "./mainComponent.css";
import Modal from "react-modal";
import Element from "./componentItem";

Modal.setAppElement('#root');

const Tree = () => {
    const [tree, setTree] = useState("");
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [currentElement, setCurrentElement] = useState();

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
        setTree(name);
    };

    const editElement = () => {

    };

    const removeElement = () => {

    };

    const resetTree = () => {
        setTree("");
    };

    useEffect(() => {
        setTree("Hello");
    }, []);

    return (
        <div className="container">
            <div className="box">
                <div className="row1">
                    <span className="header">Tree</span>
                </div>
                <div className="row2">
                    <div className="elements">
                        <Element />
                        <Element />
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
                            <input></input>
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