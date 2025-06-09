import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const RecipeForm = () => {
  const [ingredient, setIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    if (ingredient.name && ingredient.quantity && ingredient.unit) {
      setIngredients([...ingredients, ingredient]);
      setIngredient({ name: '', quantity: '', unit: '' });
    }
  };
  const navigate = useNavigate();
  return (

    <div className="container my-5 bg-white p-4 rounded shadow">
      <button type="button" className="btn btn-dark fw-bold" onClick={() => navigate('/')}>
        ← Volver
      </button>
      <h2 className="text-center my-4 fw-bold">Compartir una receta</h2>
      <h5 className="mt-4">Receta</h5>
      <div className="border border-dark p-4 mb-4 rounded">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" className="form-control" placeholder="Título" />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredientes</label>
          <div className="row g-2">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={ingredient.name}
                onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Cantidad"
                value={ingredient.quantity}
                onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })}
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                value={ingredient.unit}
                onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}
              >
                <option value="">-- Unidad --</option>
                <option value="g">Gramos</option>
                <option value="ml">Mililitros</option>
                <option value="cucharadita">Cucharadita</option>
                <option value="cucharada">Cucharada</option>
              </select>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-dark fw-bold" onClick={handleAddIngredient}>
                Agregar
              </button>
            </div>
          </div>
          {ingredients.length > 0 && (
            <ul className="mt-3">
              {ingredients.map((ing, index) => (
                <li key={index}>
                  {ing.name} - {ing.quantity} {ing.unit}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" rows="2" placeholder="Descripción"></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Duración en minutos</label>
          <select
            className="form-select"
          >
            <option value="">-- Duración --</option>
            <option value="g">0 - 15</option>
            <option value="c">15 - 30</option>
            <option value="g">30 - 45</option>
            <option value="c">45 - 60</option>
            <option value="g">60 - 75</option>
            <option value="c">75 - 90</option>
            <option value="c">90 - 105</option>
            <option value="g">105 - 120</option>
            <option value="c">120 - 135</option>
            <option value="c">135 - 150</option>
            <option value="c">150 - 165</option>
            <option value="g">165 - 180</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Dificultad</label>
          <select
            className="form-select"
          >
            <option value="">-- Dificultad --</option>
            <option value="g">Fácil</option>
            <option value="c">Intermedio</option>
            <option value="g">Díficil</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Insertar Imagen</label>
          <input type="file" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Pasos</label>
          <input type="text" className="form-control" placeholder="Pasos" />
        </div>

        <div className="mb-3">
          <label className="form-label">Región</label>
          <select
            className="form-select"
          >
            <option value="">-- Región --</option>
            <option value="g">Andina</option>
            <option value="c">Caribe</option>
          </select>
        </div>
      </div>
      <h5>Usuario</h5>
      <div className="border border-dark p-4 mb-4 rounded">

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Nombre" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Ciudad de residencia</label>
            <input type="text" className="form-control" placeholder="Ciudad de residencia" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Departamento de residencia</label>
            <input type="text" className="form-control" placeholder="Departamento de residencia" />
          </div>
        </div>
      </div>

      {/* Botón de enviar */}
      <div className="text-center">
        <button type="submit" className="btn btn-success fw-bold px-5">Compartir</button>
      </div>
    </div>
  );
};

export default RecipeForm;
