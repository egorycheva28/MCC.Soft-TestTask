import React, { useEffect, useState } from "react";
import "./mainComponent.css";

const Element = (props) => {
    const [color, setColor] = useState("unselectedElement");

    const selectedElement = (e) => {
        //props.setSelectedId(null);
        console.log("asd");
        e.stopPropagation();
        props.setSelectedId(props.id);
        setColor("selectedElement");
    }

    const unselectedElement = () => {
        setColor("unselectedElement");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.row3') === null && event.target.closest('.modal-content') === null) {
                unselectedElement();
                props.setSelectedId(null);
            }
        };
        console.log("asasasasas");

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [props]);

    return (
        <div className={color} onClick={selectedElement}>
            <span className="name" >{props.name}</span>
        </div>
    );
};

export default Element;