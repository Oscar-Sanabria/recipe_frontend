import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { updateRecipe } from '../services/RecipeService';
import { getRecipe } from '../services/RecipeService';
import { useParams } from 'react-router-dom';
import { getRecipeImage } from '../services/RecipeService';

const UpdateRecipeForm = () => {
    const { id } = useParams();
    const [ingredient, setIngredient] = useState({ name: '', quantity: '', unit: '' });
    const [ingredients, setIngredients] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [region, setRegion] = useState('');
    const [steps, setSteps] = useState([]);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [recipe, setRecipe] = useState(null);
    const [dataImage, setDataImage] = useState(null);
    const [imageUpdated, setImageUpdated] = useState(false);


    const navigate = useNavigate();

    const handleDeleteIngredient = (indexToRemove) => {
        const updatedIngredients = ingredients.filter((_, index) => index !== indexToRemove);
        setIngredients(updatedIngredients);
    };

    useEffect(() => {
        const getRecipesImage = async () => {
            try {
                const blob = await getRecipeImage(id);
                const imageUrl = URL.createObjectURL(blob);
                setDataImage(imageUrl);
                setImage(blob);
            } catch (error) {
                console.error('Error al obtener la imagen de la receta:', error);
            }
        };
        getRecipesImage();
    }, [id]);

    useEffect(() => {
        const getRecipeInfo = async () => {
            try {
                const data = await getRecipe(id);
                console.log("Recipe data:", data);
                setRecipe(data.data);
            } catch (error) {
                console.error('Error al obtener la receta:', error);
            }
        };
        getRecipeInfo();
    }, [id]);

    useEffect(() => {
        if (recipe) {
            setTitle(recipe.title);
            setDescription(recipe.description);
            setDuration(recipe.duration_minutes);
            setDifficulty(recipe.difficulty);
            setRegion(recipe.region);
            setSteps(recipe.steps ? recipe.steps : '');
            setIngredients(recipe.ingredients || []);
            setName(recipe.user?.name || '');
            setEmail(recipe.user?.email || '');
            setCity(recipe.user?.location?.city || '');
            setDepartment(recipe.user?.location?.department || '');
        }
    }, [recipe]);

    const handleAddIngredient = () => {
        if (ingredient.name && ingredient.quantity && ingredient.unit) {
            setIngredients([...ingredients, ingredient]);
            setIngredient({ name: '', quantity: '', unit: '' });
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setImageUpdated(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedForm = {
            title,
            description,
            duration_minutes: parseInt(duration),
            difficulty,
            region,
            steps: [steps],
            ingredients,
            created_at: null,
            images: imageUpdated ? [image] : recipe.images,
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
            console.log("Updated Form Data:", updatedForm);
            await updateRecipe(recipe.id, updatedForm, image ? [image] : []);
            alert("Receta actualizada correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la receta");
        }
    };

    return (
        <div className="container my-5 bg-white p-4 rounded shadow">
            <button type="button" className="btn btn-dark fw-bold" onClick={() => navigate(`/detalleReceta/${id}`)}>
                ← Volver
            </button>
            <h2 className="text-center my-4 fw-bold">Actualizar receta</h2>
            <form onSubmit={handleSubmit}>
                <h5 className="mt-4">Receta</h5>
                <div className="border border-dark p-4 mb-4 rounded">
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" placeholder="Título"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ingredientes</label>
                        <div className="row g-2">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Nombre"
                                    value={ingredient.name}
                                    onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Cantidad"
                                    value={ingredient.quantity}
                                    onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <select className="form-select"
                                    value={ingredient.unit}
                                    onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}>
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
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Unidad</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingredients.map((ing, index) => (
                                            <tr key={index}>
                                                <td>{ing.name}</td>
                                                <td>{ing.quantity}</td>
                                                <td>{ing.unit}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteIngredient(index)}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" rows="2" placeholder="Descripción"
                            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Duración en minutos</label>
                        <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dificultad</label>
                        <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="">-- Dificultad --</option>
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Actualizar Imagen (opcional)</label>
                        <input type="file" className="form-control" onChange={handleImageChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Pasos</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Steps (uno por línea)"
                            value={steps.join('\n')}
                            onChange={(e) => setSteps(e.target.value.split('\n'))}
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Región</label>
                        <select className="form-select" value={region} onChange={(e) => setRegion(e.target.value)}>
                            <option value="">-- Departamento --</option>
                            <option value="Amazonas">Amazonas</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Arauca">Arauca</option>
                            <option value="Atlántico">Atlántico</option>
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
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ciudad de residencia</label>
                            <input type="text" className="form-control" placeholder="Ciudad de residencia"
                                value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Departamento de residencia</label>
                            <input type="text" className="form-control" placeholder="Departamento de residencia"
                                value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success fw-bold px-5">Actualizar</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateRecipeForm;
