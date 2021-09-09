import { useEffect } from 'react';
export default function Modal({ children, bodyStyle, onClose }) {
  useEffect(() => { }, []);
  return (
    <div className="modal d-block " tabIndex="-1" role="dialog">

      <div className="modal-dialog" role="document">
        <div className="modal-content ">

          <div className={`${bodyStyle} modal-body position-relative`}><div className={`position-absolute top-0 end-0 pt-1 pe-3 text-white`} onClick={onClose}>x</div>{children}</div>
        </div>
      </div>
    </div>
  );
}
