import React, { useState } from 'react';

const DocumentForm = ({ addDocument }) => {
  const [docId, setDocId] = useState('');
  const [docType, setDocType] = useState('');
  const [docName, setDocName] = useState('');
  const [file, setFile] = useState(null); // Para el archivo seleccionado

  // Manejar el cambio de archivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!docId || !docType || !docName || !file) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const newDocument = {
      id: docId,
      type: docType,
      name: docName,
      date: new Date().toLocaleString(),
    };

    // Agregar documento a la lista usando la función pasada desde App
    addDocument(newDocument);
    setDocId('');
    setDocType('');
    setDocName('');
    setFile(null);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Formulario de Documentos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID de Documento</label>
          <input
            type="text"
            className="form-control"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Documento</label>
          <select
            className="form-control"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="PDF">PDF</option>
            <option value="Word">Word</option>
            <option value="Excel">Excel</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nombre de Documento</label>
          <input
            type="text"
            className="form-control"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Subir Documento</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Documento
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;
