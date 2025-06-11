import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { createRecipe } from '../services/RecipeService';

const RecipeForm = () => {
  const [ingredient, setIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [region, setRegion] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState(null);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (ingredient.name && ingredient.quantity && ingredient.unit) {
      setIngredients([...ingredients, ingredient]);
      setIngredient({ name: '', quantity: '', unit: '' });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    if (!steps.trim()) {
      alert('Por favor, ingresa los pasos de la receta.');
      return;
    }

    const form = {
      title,
      description,
      duration_minutes: parseInt(duration),
      difficulty,
      region,
      steps: [steps],
      ingredients,
      created_at: null,
      images: image ? [image] : [],
      reviews: [],
      user: {
        name,
        email,
        location: {
          city,
          department
        }
      }
    };

    try {
      await createRecipe(form, [image]);
      alert("Receta guardada correctamente");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Error al guardar la receta");
    }
  };

  return (
    <div className="container my-5 bg-white p-4 rounded shadow">
      <button type="button" className="btn btn-dark fw-bold" onClick={() => navigate('/')}>
        ← Volver
      </button>
      <h2 className="text-center my-4 fw-bold">Compartir una receta</h2>
      <form onSubmit={handleSubmit}>
        <h5 className="mt-4">Receta</h5>
        <div className="border border-dark p-4 mb-4 rounded">
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input type="text" className="form-control" placeholder="Título"
              value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredientes (Opcional)</label>
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
                  <option value="unidades">Unidades</option>
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
            <textarea className="form-control" rows="2" placeholder="Descripción"
              value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Duración en minutos</label>
            <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Dificultad</label>
            <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
              <option value="">-- Dificultad --</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Insertar Imagen</label>
            <input type="file" className="form-control" onChange={handleImageChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Pasos</label>
            <textarea className="form-control" placeholder="Pasos"
              value={steps} onChange={(e) => setSteps(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Región</label>
            <select className="form-select" value={region} onChange={(e) => setRegion(e.target.value)} required>
              <option value="">-- Departamento --</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Antioquia">Antioquia</option>
              <option value="Arauca">Arauca</option>
              <option value="Atlántico">Atlántico</option>
              <option value="Bogotá D.C.">Bogotá D.C.</option>
              <option value="Bolívar">Bolívar</option>
              <option value="Boyacá">Boyacá</option>
              <option value="Caldas">Caldas</option>
              <option value="Caquetá">Caquetá</option>
              <option value="Casanare">Casanare</option>
              <option value="Cauca">Cauca</option>
              <option value="Cesar">Cesar</option>
              <option value="Chocó">Chocó</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Cundinamarca">Cundinamarca</option>
              <option value="Guainía">Guainía</option>
              <option value="Guaviare">Guaviare</option>
              <option value="Huila">Huila</option>
              <option value="La Guajira">La Guajira</option>
              <option value="Magdalena">Magdalena</option>
              <option value="Meta">Meta</option>
              <option value="Nariño">Nariño</option>
              <option value="Norte de Santander">Norte de Santander</option>
              <option value="Putumayo">Putumayo</option>
              <option value="Quindío">Quindío</option>
              <option value="Risaralda">Risaralda</option>
              <option value="San Andrés y Providencia">San Andrés y Providencia</option>
              <option value="Santander">Santander</option>
              <option value="Sucre">Sucre</option>
              <option value="Tolima">Tolima</option>
              <option value="Valle del Cauca">Valle del Cauca</option>
              <option value="Vaupés">Vaupés</option>
              <option value="Vichada">Vichada</option>
            </select>
          </div>
        </div>

        <h5>Usuario</h5>
        <div className="border border-dark p-4 mb-4 rounded">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" placeholder="Nombre"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Ciudad de residencia</label>
              <input type="text" className="form-control" placeholder="Ciudad de residencia"
                value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Departamento de residencia</label>
              <input type="text" className="form-control" placeholder="Departamento de residencia"
                value={department} onChange={(e) => setDepartment(e.target.value)} required />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success fw-bold px-5">Compartir</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
