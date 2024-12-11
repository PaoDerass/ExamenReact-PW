import React from 'react';
import PropTypes from 'prop-types';

function CampoEntrada({ etiqueta, nombre, valor, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{etiqueta}</label>
      <input
        type="text"
        className="form-control"
        name={nombre}
        value={valor}
        onChange={onChange}
      />
    </div>
  );
}

CampoEntrada.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  valor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CampoEntrada;
