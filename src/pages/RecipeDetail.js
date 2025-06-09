import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const recetaMock = {
    id: 'PE-00002',
    titulo: 'Receta 2',
    descripcion: 'Esta es una descripción deliciosa.',
    ingredientes: [
        { nombre: 'Harina', cantidad: '2', unidad: 'tazas' },
        { nombre: 'Huevos', cantidad: '3', unidad: 'unidades' },
    ],
    duracion: '45 min',
    dificultad: 'Media',
    pasos: 'Mezclar todo y hornear.',
    region: 'Latinoamérica',
    imagen: 'https://via.placeholder.com/300',
};

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div className="container rounded shadow p-5 my-5">
            <button type="button" className="btn btn-dark fw-bold" onClick={() => navigate('/')}>
                ← Volver
            </button>
            <h2 className="text-center mb-4">Compartir una receta</h2>

            <div className="row border p-4 rounded">
                <div className="col-md-6">
                    <h4><strong>Receta</strong></h4>
                    <p><strong>Título:</strong> {recetaMock.titulo}</p>
                    <p><strong>Duración:</strong> {recetaMock.duracion}</p>
                    <p><strong>Dificultad:</strong> {recetaMock.dificultad}</p>
                    <p><strong>Región:</strong> {recetaMock.region}</p>

                    <h5>Ingredientes</h5>
                    <ul>
                        {recetaMock.ingredientes.map((ing, idx) => (
                            <li key={idx}>
                                {ing.nombre} - {ing.cantidad} {ing.unidad}
                            </li>
                        ))}
                    </ul>

                    <h5>Pasos</h5>
                    <p>{recetaMock.pasos}</p>
                </div>

                <div className="col-md-6">
                    <h5>Descripción</h5>
                    <p>{recetaMock.descripcion}</p>
                    <img
                        src={recetaMock.imagen}
                        alt="Receta"
                        className="img-fluid rounded shadow-sm"
                    />
                </div>
            </div>

            <hr className="my-4" />

            <h4>Deja tu reseña</h4>
            <form>
                <div className="mb-3">
                    <label htmlFor="comentario" className="form-label">Comentario</label>
                    <textarea id="comentario" rows="3" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="autor" className="form-label">Tu nombre</label>
                    <input type="text" id="autor" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Enviar Reseña</button>
            </form>
        </div>
    );
};

export default RecipeDetail;
