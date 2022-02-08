import {html} from '../../node_modules/lit-html/lit-html.js';

import {deleteBook, getBookById, likeBook, likedBooksCount, isLiked} from '../api/data.js';

const detailsTemplate = (book,isOwner,isLoggedIn,likes, onDelete, onLike, count) => html`
<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">


    ${isOwner ? html`<div class="listings-buttons">
    <a class="button" href="/edit/${book._id}">Edit</a>
    <a class="button" @click=${onDelete} href="#">Delete</a>
</div>`: isLoggedIn && (likes == 0)?  html`<a class="button" @click=${onLike}href="#">Like</a><div class="likes">
</div>` : ''}
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
       

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        <!-- ( for Guests and Users )  -->
        <img class="hearts" src="/images/heart.png">
        <span id="total-likes">Likes: ${count}</span>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;


export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    let isLoggedIn = true;

    if(userId == undefined){
        isLoggedIn = false;
    }
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    const isOwner = userId === book._ownerId;
    let likes;
    if(!isOwner){
        likes = 0;
    }
    const count = 0;
    ctx.render(detailsTemplate(book, isOwner, isLoggedIn,likes, onDelete, onLike, count));


    async function onDelete(){
        const confirmed = confirm('Are you sure?');

        if(confirmed){
            await deleteBook(bookId);
            return ctx.page.redirect('/');
        }
    }

    async function onLike(){
        await likeBook(bookId);
        return ctx.page.redirect('/details/' + bookId);
    }
}