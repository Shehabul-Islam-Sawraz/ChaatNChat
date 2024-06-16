import React from "react";
import './Modal.scss'

const Modal = (props) => {

    const findByKey = (keyname) =>
        props.children.map(child => {
            if (child.key === keyname) return child
        })

    const closeModal = (e) => {
        e.stopPropagation()

        if (e.target.classList.contains('modal-close')) {
            return props.click()
        }
    }

    return (
        <div className="modal-mask modal-close" onClick={closeModal}>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-header">
                        {findByKey('header')}
                    </div>

                    <div className="modal-body">
                        {findByKey('body')}
                    </div>

                    <div className="modal-footer">
                        <button className="modal-close" onClick={closeModal}>CLOSE</button>
                        {findByKey('footer')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal