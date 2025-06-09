import axios from 'axios';

const API_HOST = "http://localhost:8000";

export async function getAllRecipes() {
    const response = await axios.get(`${API_HOST}/recipes`, {
    });
    return response.data;
}

export async function getRecipe(id) {
    const response = await axios.get(`${API_HOST}/recipes/${id}`, {
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