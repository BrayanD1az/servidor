import React, { useState } from 'react';

const DocumentForm = () => {
  const [docName, setDocName] = useState('');
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState(''); // Nombre del usuario

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !docName || !file) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const formData = new FormData();
    formData.append('documento', file); // El archivo
    formData.append('extension', file.type); // Tipo de archivo (ej: application/pdf)
    formData.append('nombre_archivo', docName); // Nombre del archivo
    formData.append('fecha_adicion', new Date().toISOString()); // Fecha actual

    try {
      const response = await fetch(`http://100.80.83.116:5000/users/bjohnson/documents`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Documento agregado con éxito');
        console.log('Respuesta del servidor:', result);

        // Limpia el formulario después de la subida
        setDocName('');
        setFile(null);
        setUserName('');
      } else {
        const error = await response.json();
        alert(error.error || 'Ocurrió un error');
        console.error('Error en la solicitud:', error);
      }
    } catch (error) {
      console.error('Error de conexión con el servidor:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Formulario de Documentos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ingresa el nombre de usuario"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de Documento</label>
          <input
            type="text"
            className="form-control"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="Ingresa el nombre del documento"
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
          Subir Documento
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;
