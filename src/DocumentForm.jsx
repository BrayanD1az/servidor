import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const UploadDocuments = () => {
  const [userName, setUserName] = useState(""); // Nombre del usuario
  const [file, setFile] = useState(null); // Archivo seleccionado
  const [fileName, setFileName] = useState(""); // Nombre del archivo
  const [fileType, setFileType] = useState(""); // Tipo del archivo

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileType(selectedFile.type.split("/")[1]); // Obtener la extensión del archivo
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !file || !fileName || !fileType) {
      Swal.fire("Por favor completa todos los campos", "", "warning");
      return;
    }

    try {
      // Leer el archivo como base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1]; // Eliminar metadatos
        const documentData = {
          documents: [
            {
              nombre_archivo: fileName,
              extension: fileType,
              documento: base64Data,
            },
          ],
        };

        // Enviar datos al backend
        const response = await axios.post(
          `http://127.0.0.1:5000/users/send/${userName}/documents`,
          documentData,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 201) {
          Swal.fire("Documento subido exitosamente", "", "success");
          setFile(null);
          setFileName("");
          setFileType("");
          setUserName("");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error al subir el documento:", error);
      Swal.fire("Error al subir el documento", error.response?.data?.error || "", "error");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Subir Documentos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Nombre del Usuario:</label>
          <input
            type="text"
            id="userName"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ingresa el nombre del usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Seleccionar Archivo:</label>
          <input
            type="file"
            id="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileName">Nombre del Archivo:</label>
          <input
            type="text"
            id="fileName"
            className="form-control"
            value={fileName}
            readOnly
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Subir Documento
        </button>
      </form>
    </div>
  );
};

export default UploadDocuments;
