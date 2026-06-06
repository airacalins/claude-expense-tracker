const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal">
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onCancel}>Cancel</button>
        <button className="delete-btn" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog
