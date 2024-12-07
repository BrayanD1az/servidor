import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Portafolio = () => {
  const [fileList, setFileList] = useState([]); // Lista de documentos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [userName, setUserName] = useState("usuario1"); // Usuario seleccionado
  const [searchQuery, setSearchQuery] = useState(""); // Filtro de búsqueda

  // Cargar documentos al montar el componente
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/users/${userName}/documents`
        );
        setFileList(response.data.documents);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los documentos:', error);
        Swal.fire('Error al cargar los documentos', '', 'error');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [userName]);

  const handleDownload = async (url, fileName) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      Swal.fire('Error al descargar el archivo', '', 'error');
    }
  };

  // Filtrar documentos por nombre
  const filteredDocuments = fileList.filter((file) =>
    file.nombre_archivo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-contentPage">
      <h2 className="text-center mb-4">Portafolio de Documentos</h2>

      {/* Botones de usuario */}
      <div className="mb-3">
        <button
          className={`btn user-button ${userName === "usuario1" ? "active" : ""}`}
          onClick={() => setUserName("usuario1")}
        >
          Usuario 1
        </button>
        <button
          className={`btn user-button ${userName === "usuario2" ? "active" : ""}`}
          onClick={() => setUserName("usuario2")}
        >
          Usuario 2
        </button>
      </div>

      {/* Buscador de documentos */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar documento por nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabla de documentos */}
      {loading ? (
        <div className="text-center">Cargando documentos...</div>
      ) : (
        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No. del Documento</th>
                <th>Fecha de Registro</th>
                <th>Tipo de Documento</th>
                <th>Nombre de Documento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((file) => (
                  <tr key={file.id}>
                    <td>{file.id}</td>
                    <td>{new Date(file.fecha_adicion).toLocaleString()}</td>
                    <td>{file.extension}</td>
                    <td>{file.nombre_archivo}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDownload(file.download_url, file.nombre_archivo)}
                      >
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay documentos subidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Portafolio;
