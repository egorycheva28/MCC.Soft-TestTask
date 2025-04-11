import React, { useEffect, useState } from "react";
import "./mainComponent.css";

const Element = (props) => {
    const [color, setColor] = useState("selectedElement");

    const selectedElement = (e) => {
        //props.setSelectedId(null);
        console.log("asd");
        e.stopPropagation();
        props.setSelectedId(props.id);
        setColor("unselectedElement");
    }

    const unselectedElement = () => {
        setColor("selectedElement");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.row3') === null) {
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
        <div className={color}>
            <span className="name" onClick={selectedElement}>{props.name}</span>
        </div>
    );
};

export default Element;