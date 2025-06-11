import { Button, Form, Table, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllRecipes, getDifficultList, getIngredientList, getRegionList, getRecipesListFiltered } from '../services/RecipeService';
import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from "react-bootstrap";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [difficults, setDifficult] = useState([]);
    const [regions, setRegion] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDifficult, setSelectedDifficult] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');

    const handleCloseToast = () => setMessage({ ...message, show: false });
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        try {
            const data = await getAllRecipes();
            setRecipes(data);
        } catch (error) {
            console.error('Error al obtener las recetas:', error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        const fetchDifficultList = async () => {
            try {
                const data = await getDifficultList();
                setDifficult(data.data);
            } catch (error) {
                console.error('Error al obtener las dificultades:', error);
            }
        };
        fetchDifficultList();
    }, []);

    useEffect(() => {
        const fetchRegionList = async () => {
            try {
                const data = await getRegionList();
                setRegion(data.data);
            } catch (error) {
                console.error('Error al obtener las regiones:', error);
            }
        };
        fetchRegionList();
    }, []);

    useEffect(() => {
        const fetchIngredientsList = async () => {
            try {
                const data = await getIngredientList();
                setIngredients(data.data);
            } catch (error) {
                console.error('Error al obtener los ingredientes:', error);
            }
        };
        fetchIngredientsList();
    }, []);

    const handleIngredientSelect = (e) => {
        const selected = e.target.value;
        if (selected && !selectedIngredients.includes(selected)) {
            setSelectedIngredients([...selectedIngredients, selected]);
        }
    };

    const handleRemoveIngredient = (ingredientToRemove) => {
        setSelectedIngredients(prev =>
            prev.filter(ing => ing !== ingredientToRemove)
        );
    };

    const handleSearchClick = async () => {
        let min = null;
        let max = null;
        if (selectedDuration) {
            const [minStr, maxStr] = selectedDuration.split('-');
            min = parseInt(minStr, 10);
            max = parseInt(maxStr, 10);
        }

        const duration = (min !== null || max !== null)
            ? {
                ...(min !== null && { min }),
                ...(max !== null && { max })
            }
            : undefined;

        const searchPayload = {
            region: selectedRegion || undefined,
            difficulty: selectedDifficult || undefined,
            duration: duration,
            ingredients: selectedIngredients.length > 0 ? selectedIngredients : undefined,
            text: searchText || undefined
        };

        console.log("Payload de búsqueda:", searchPayload);

        try {
            const data = await getRecipesListFiltered(searchPayload);
            setRecipes(data);
        } catch (error) {
            setMessage({ type: "danger", text: "No se encontraron recetas" });
            console.error('Error al buscar recetas:', error);
        }
    };

    return (
        <div className="container mt-5 p-5 rounded shadow">
            {message.text && (
                <ToastContainer position="bottom-end" className="p-3">
                    <Toast
                        show={message.show}
                        onClose={handleCloseToast}
                        delay={3000}
                        autohide
                        className={`border-0 shadow-lg rounded-3 bg-${message.type} position-relative`}
                        style={{
                            minHeight: "80px",
                        }}
                    >
                        <Toast.Body className="text-white px-4 py-3 fs-6 w-100" style={{ fontSize: "1rem" }}>
                            {message.text}
                        </Toast.Body>
                    </Toast>
                    <style>{`@media (min-width: 768px) {.toast {max-width: 400px;}.toast-body {font-size: 1.25rem;}}`}</style>
                </ToastContainer>
            )}
            <h2 className="text-center fw-bold mb-4">Recetas</h2>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success fw-bold m-2" onClick={() => navigate('/crearReceta')}>
                    Crear Receta
                </Button>
                <Button variant="success fw-bold m-2" onClick={() => fetchRecipes()}>
                    Ver Todas Las Recetas
                </Button>
            </div>

            <InputGroup className="mb-4">
                <FormControl
                    placeholder="Buscar por título"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={handleSearchClick}>
                    <FaSearch />
                </Button>
            </InputGroup>

            <div className="row mb-4">
                <div className="col-md-3 mb-2">
                    <Form.Select
                        value={selectedDifficult}
                        onChange={(e) => setSelectedDifficult(e.target.value)}
                    >
                        <option value="">Dificultad</option>
                        {difficults.map((difficult, idx) => (
                            <option key={idx}>{difficult}</option>
                        ))}
                    </Form.Select>
                </div>

                <div className="col-md-3 mb-2">
                    <Form.Select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="">Región</option>
                        {regions.map((region, idx) => (
                            <option key={idx}>{region}</option>
                        ))}
                    </Form.Select>
                </div>

                <div className="col-md-3 mb-2">
                    <Form.Select onChange={handleIngredientSelect} defaultValue="">
                        <option value="" disabled>Seleccionar ingrediente</option>
                        {ingredients.map((ingredient, idx) => (
                            <option key={idx} value={ingredient}>{ingredient}</option>
                        ))}
                    </Form.Select>
                </div>

                <div className="col-md-3 mb-2">
                    <Form.Select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                    >
                        <option value="">Duración en minutos</option>
                        <option value="0-15">0 - 15</option>
                        <option value="15-30">15 - 30</option>
                        <option value="30-45">30 - 45</option>
                        <option value="45-60">45 - 60</option>
                        <option value="60-75">60 - 75</option>
                        <option value="75-90">75 - 90</option>
                        <option value="90-105">90 - 105</option>
                        <option value="105-120">105 - 120</option>
                        <option value="120-135">120 - 135</option>
                        <option value="135-150">135 - 150</option>
                        <option value="150-165">150 - 165</option>
                        <option value="165-180">165 - 180</option>
                    </Form.Select>
                </div>
            </div>

            {selectedIngredients.length > 0 && (
                <div className="mb-4">
                    <h5>Ingredientes seleccionados:</h5>
                    <ul className="list-group">
                        {selectedIngredients.map((ingredient, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                {ingredient}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => handleRemoveIngredient(ingredient)}
                                >
                                    ❌
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Región</th>
                        <th>Dificultad</th>
                        <th>Autor</th>
                        <th>Duración</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((receta, idx) => (
                        <tr key={idx}>
                            <td>{receta.title}</td>
                            <td>{receta.description}</td>
                            <td>{receta.region}</td>
                            <td>{receta.difficulty}</td>
                            <td>{receta.user.name}</td>
                            <td>{receta.duration_minutes}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => navigate(`/detalleReceta/${receta.id}`)}>
                                    <FaPlus />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default RecipesPage;
