import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({children, onClose}) {
    
  useEffect(() => {
    function handleKeyEsc (evt) {

        if (evt.code === 'Escape')
        {
            onClose();
            window.removeEventListener('keydown', handleKeyEsc);
        }
    };
        window.addEventListener('keydown', handleKeyEsc);

    }, [onClose])
    
        function handleOverlayClick  (evt) {

        if (evt.currentTarget === evt.target)
        {
            onClose();
            }
        }

        return createPortal(
            <div className={s.overlay} onClick={handleOverlayClick}>
                <div className={s.modal}>
                    {children}
                </div>
            </div>,
            modalRoot,)

}

// Modal.prototype = {

//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.object.isRequired,
// }

export default Modal;

