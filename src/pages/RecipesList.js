import { Button, Form, Table, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const recetas = [
    { id: 'PE-00002', titulo: 'Receta 2' },
    { id: 'PE-00003', titulo: 'Receta 3' },
    { id: '10023302324', titulo: 'Receta 4' },
    { id: '10023302324', titulo: 'Receta 5' },
    { id: '10023302324', titulo: 'Receta 5' },
];

const RecipesPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-5 p-5 rounded shadow">
            <h2 className="text-center fw-bold mb-4">Recetas</h2>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success fw-bold" onClick={() => navigate('/crearReceta')}>Crear Receta</Button>
            </div>

            <InputGroup className="mb-4">
                <FormControl placeholder="Buscar por título" />
                <Button variant="outline-secondary">
                    <FaSearch />
                </Button>
            </InputGroup>

            <div className="row mb-4">
                {['Ingredientes', 'Región', 'Duración', 'Dificultad'].map((label, idx) => (
                    <div className="col-md-3 mb-2" key={idx}>
                        <Form.Select>
                            <option>Ordenar por: {label}</option>
                        </Form.Select>
                    </div>
                ))}
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
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
                    {recetas.map((receta, idx) => (
                        <tr key={idx}>
                            <td>{receta.id}</td>
                            <td>{receta.titulo}</td>
                            <td>Descripción</td>
                            <td>Región</td>
                            <td>Dificultad</td>
                            <td>Autor</td>
                            <td>Duración</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => navigate('/detalleReceta')}>
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
