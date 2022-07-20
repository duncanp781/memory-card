function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="close" onClick = {props.closeModal}>X</div>
        {props.children}
      </div>
    </div>
  );
}


export default Modal