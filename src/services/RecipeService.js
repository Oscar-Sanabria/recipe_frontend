import axios from 'axios';

const API_HOST = "http://localhost:8000";

export async function getAllRecipes() {
    const response = await axios.get(`${API_HOST}/recipes`, {
    });
    console.log("response", response);
    return response.data;
}

export async function getRecipe(id) {
    const response = await axios.get(`${API_HOST}/recipes/${id}`, {
    });
    return response.data;
}

export async function getRecipeImage(id) {
    const response = await axios.get(`${API_HOST}/recipeImage/${id}`, {
        responseType: 'blob' 
    });
    return response.data;
}

export async function sendReview(id, data) {
    const response = await axios.post(`${API_HOST}/recipes/${id}/reviews`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function getDifficultList() {
    const response = await axios.get(`${API_HOST}/categories/difficulty`, {
    });
    return response.data;
}


export async function getRegionList() {
    const response = await axios.get(`${API_HOST}/categories/regions`, {
    });
    return response.data;
}

export async function getIngredientList() {
    const response = await axios.get(`${API_HOST}/categories/ingredients`, {
    });
    return response.data;
}

export async function getRecipesListFiltered(filters) {
    const response = await axios.post(`${API_HOST}/recipes/filters`, filters,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data.data;
}

export async function createRecipe(form, images) {
    console.log("form", form);
    const formData = new FormData();
    
    // Convertir el objeto form a JSON string
    formData.append("recipe_data", JSON.stringify(form));
    
    // Agregar cada imagen (suponiendo que "images" es un array de File)
    images.forEach((image) => {
        formData.append("images", image);  // el campo es 'images' (sin los corchetes)
    });

    const response = await axios.post(`${API_HOST}/recipes`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export async function updateRecipe(id, form, images) {
    console.log("form", form);
    const formData = new FormData();

    // Convertir el objeto form a JSON string
    formData.append("recipe_data", JSON.stringify(form));

    // Agregar cada imagen (suponiendo que "images" es un array de File)
    images.forEach((image) => {
        formData.append("images", image);
    });

    const response = await axios.put(`${API_HOST}/recipes/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}
