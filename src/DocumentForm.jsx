import React, { useState } from "react";

const DocumentForm = () => {
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState(""); // Nombre del usuario

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        alert(
          "El tipo de archivo no es válido. Solo se permiten PDF, PNG o JPEG."
        );
        setFile(null);
        return;
      }

      if (selectedFile.size > maxSize) {
        alert("El archivo supera el tamaño máximo permitido (5 MB).");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extrae solo la parte Base64
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userName || !docName || !file) {
      alert('Por favor, complete todos los campos');
      return;
    }
  
    // Convertir el archivo a Base64
    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Quitar el encabezado "data:*/*;base64,"
        reader.onerror = (error) => reject(error);
      });
    };
  
    try {
      const base64File = await toBase64(file);
  
      // Crear el objeto con los datos
      const payload = {
        documents: [
          {
            documento: base64File,
            extension: file.type,
            nombre_archivo: docName,
          },
        ],
      };
  
      // Hacer la solicitud POST al backend
      const response = await fetch(`http://localhost:5000/users/send/${userName}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Enviar como JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Documento agregado con éxito');
        console.log('Respuesta del servidor:', result);
  
        // Limpiar el formulario después del envío
        setDocName('');
        setFile(null);
        setUserName('');
      } else {
        const error = await response.json();
        alert(error.error || 'Ocurrió un error');
        console.error('Error en la solicitud:', error);
      }
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      alert('Error al procesar el archivo');
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
        <button type="submit" className="btn btn-primary mt-3">
          Subir Documento
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;
