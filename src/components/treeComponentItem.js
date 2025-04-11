import React, { useEffect, useState } from "react";
import "./treeComponent.css";

const Element = (props) => {

    const selectedElement = (e) => {
        e.stopPropagation();
        props.setSelectedId(props.id);
    }

    const unselectedElement = () => {
        props.setSelectedId(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.row3') && !event.target.closest('.modal')) {
                unselectedElement();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [props]);

    return (
        <div style={{ marginLeft: '50px' }}>
            <div className={props.id === props.selectedId ? "selectedElement" : "unselectedElement"} onClick={selectedElement}>
                <span className="name">{props.name}</span>
            </div>
            {props.children && props.children.length > 0 && (
                <div>
                    {props.children.map(child => (
                        <Element name={child.name} id={child.id} children={child.children} key={child.id} setSelectedId={props.setSelectedId} selectedId={props.selectedId} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Element;