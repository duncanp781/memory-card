import closeIcon from './close.svg'

function Modal(props) {
  const close = (e) => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  };

  close.src = closeIcon;
  return (
    <div className="modal" onClick={(e) => close(e)} name="modal">
      <div className="modal-container">
        <div className="close" onClick={props.closeModal}>
            <img src = {closeIcon} alt = 'close modal'/>
        </div>
        <div className="modal-content">{props.children}</div>
        <button onClick={props.closeModal}>Ok</button>
      </div>
    </div>
  );
}

export default Modal;
