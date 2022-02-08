import * as api from './api.js';


export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getBooks() {
    return await api.get('/data/books?sortBy=_createdOn%20desc');
}


export async function getBookById(id){
    return await api.get(`/data/books/${id}`);
}

export async function deleteBook(id){
    return await api.del(`/data/books/${id}`)
}

export async function createBook(book){
    return await api.post('/data/books', book);
}

export async function updateBook(id, book){
    return api.put(`/data/books/${id}`, book);
}

export async function getMyBooks(){
    const userId = sessionStorage.getItem('userId');
    return await api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
export async function likeBook(id){
    return await api.post('/data/likes', id);
}

export async function likedBooksCount(id){
    return await api.get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function isLiked(bookId){
    const userId = sessionStorage.getItem('userId');
    return await api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

