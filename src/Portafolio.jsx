import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Portafolio = ({ fileList, deleteDocument, editDocument }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Documento seleccionado
  const [showModal, setShowModal] = useState(false); // Para mostrar el modal de edición
  const [editId, setEditId] = useState('');
  const [editType, setEditType] = useState('');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleEdit = () => {
    if (selectedFile) {
      setEditId(selectedFile.id);
      setEditType(selectedFile.type);
      setShowModal(true);
    }
  };

  const handleUpdate = () => {
    if (editId && editType) {
      const updatedFile = {
        id: editId,
        type: editType,
        name: selectedFile.name,
        date: selectedFile.date,
      };
      editDocument(updatedFile);
      setShowModal(false);
      Swal.fire('Documento actualizado!', '', 'success');
    }
  };

  const handleDelete = () => {
    if (selectedFile) {
      deleteDocument(selectedFile.id);
      setSelectedFile(null);
      Swal.fire('Documento eliminado!', '', 'success');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Portafolio de Documentos</h2>

      <div className="mb-3">
        <button
          className="btn btn-warning"
          onClick={handleEdit}
          disabled={!selectedFile}
        >
          Editar
        </button>
        <button
          className="btn btn-danger ml-2"
          onClick={handleDelete}
          disabled={!selectedFile}
        >
          Borrar
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>No. del usuario</th>
            <th>Fecha de Registro</th>
            <th>Tipo de Documento</th>
            <th>Nombre de Documento</th>
          </tr>
        </thead>
        <tbody>
          {fileList.length > 0 ? (
            fileList.map((file) => (
              <tr
                key={file.id}
                onClick={() => handleFileSelect(file)}
                style={{ cursor: 'pointer' }}
              >
                <td>{file.id}</td>
                <td>{file.date}</td>
                <td>{file.type}</td>
                <td>{file.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay documentos subidos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Documento</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>ID de Documento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editId}
                    onChange={(e) => setEditId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Documento</label>
                  <select
                    className="form-control"
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                  >
                    <option value="PDF">PDF</option>
                    <option value="Word">Word</option>
                    <option value="Excel">Excel</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portafolio;
