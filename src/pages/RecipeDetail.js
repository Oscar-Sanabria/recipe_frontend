import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getRecipe, getRecipeImage } from '../services/RecipeService';
import { sendReview } from '../services/RecipeService';
import { Toast, ToastContainer } from "react-bootstrap";

const RecipeDetail = () => {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [recipe, setRecipe] = useState(null);
    const [dataImage, setDataImage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleCloseToast = () => setMessage({ ...message, show: false });
    const [message, setMessage] = useState({ type: "", text: "" });

    const sendComment = async () => {
        const review = {
            user_name: userName,
            recipe_id: id,
            rating: parseFloat(rating),
            comment: comment,
            created_at: new Date().toISOString(),
        };
        console.log("Enviando reseña:", id);
        try {
            await sendReview(id, review);
            setMessage({ type: "success", text: "Reseña enviada" });
            await getRecipeInfo();
            setComment('');
            setUserName('');   
            setRating(0);
        } catch (err) {
            setMessage({ type: "danger", text: "Error al enviar la reseña" });
            console.log("error al enviar la reseña", err);
        }
    };


    const getRecipeInfo = async () => {
        try {
            const data = await getRecipe(id);
            setRecipe(data.data);
        } catch (error) {
            console.error('Error al obtener la receta:', error);
        }
    };

    useEffect(() => {
        getRecipeInfo();
    }, [id]);

    useEffect(() => {
        setComment();
        setUserName();
        setRating();    
    }, []);

    useEffect(() => {
        const getRecipesImage = async () => {
            try {
                const blob = await getRecipeImage(id);
                const imageUrl = URL.createObjectURL(blob);
                setDataImage(imageUrl);
            } catch (error) {
                console.error('Error al obtener la imagen de la receta:', error);
            }
        };
        getRecipesImage();
    }, [id]);


    if (!recipe) return <div>Cargando receta...</div>;
    return (
        <div className="container rounded shadow p-5 my-5">
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
            <button type="button" className="btn btn-dark fw-bold" onClick={() => navigate('/')}>
                ← Volver
            </button>
            <h2 className="text-center mb-4">Compartir una receta</h2>

            <div className="row border p-4 rounded">
                <div className="col-md-6">
                    <h4><strong>Receta</strong></h4>
                    <p><strong>Título:</strong> {recipe.title}</p>
                    <p><strong>Duración:</strong> {recipe.duration_minutes}</p>
                    <p><strong>Dificultad:</strong> {recipe.difficulty}</p>
                    <p><strong>Región:</strong> {recipe.region}</p>

                    <h5>Ingredientes</h5>
                    <ul>
                        {Array.isArray(recipe.ingredients) ? (
                            recipe.ingredients.map((ing, idx) => (
                                <li key={idx}>
                                    {ing.name} - {ing.quantity} {ing.unit}
                                </li>
                            ))
                        ) : (
                            <li>No hay ingredientes disponibles.</li>
                        )}
                    </ul>

                    <h5>Pasos</h5>
                    <ul>
                        {Array.isArray(recipe.steps) ? (
                            recipe.steps.map((step, idx) => (
                                <li key={idx}>
                                    {step}
                                </li>
                            ))
                        ) : (
                            <li>No hay ingredientes disponibles.</li>
                        )}
                    </ul>
                </div>

                <div className="col-md-6">
                    <h5>Descripción</h5>
                    <p>{recipe.description}</p>
                    <div style={{ width: '300px', height: '300px', overflow: 'hidden' }}>
                        <img
                            src={dataImage}
                            alt="Recipe"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>

            </div>

            <hr className="my-4" />

            <h4>Deja tu reseña</h4>
            <form onSubmit={(e) => {
                e.preventDefault();
                sendComment();
            }}>
                <div className="mb-3">
                    <label htmlFor="comentario" className="form-label">Comentario</label>
                    <textarea id="comentario" rows="3" value={comment} className="form-control" onChange={(e) => setComment(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="autor" className="form-label">Nombre de usuario</label>
                    <input type="text" id="autor" value={userName} className="form-control" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Calificación" className="form-label">Calificación</label>
                    <input type="number" id="Calificación" value={rating} className="form-control" min="0" max="10" step={1} onChange={(e) => setRating(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar Reseña</button>
            </form>

            {recipe.reviews.map((review, idx) => (
                <div className="mb-3">
                    <label className="form-label pt-3">Usuario: {review.user_name} - Calificación: {review.rating}</label>
                    <textarea className="form-control" rows="2" placeholder="Descripción" value={review.comment} readOnly></textarea>
                </div>
            ))}
        </div>
    );
};

export default RecipeDetail;
