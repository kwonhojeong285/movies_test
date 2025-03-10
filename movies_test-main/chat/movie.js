const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('id');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDBkNGZmNDI4Mjg1YjljM2FjNDg2MjlhN2I5MmUyYSIsInN1YiI6IjY0NzVmMWMxMWJmMjY2MDQzZWNkZGVjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77Z9bbZ2GcnUfrheuoGpUoNsHgqTF7l_7GkEI9gDFQY'
    }
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then(response => response.json())
    .then(data => {
        const movieTitle = document.getElementById('movieTitle');
        const movieOverview = document.getElementById('movieOverview');
        const movieRating = document.getElementById('movieRating');
        const posterImg = document.getElementById('posterImg');

        movieTitle.innerText = data.title;
        movieOverview.innerText = data.overview;
        movieRating.innerText = `평점: ${data.vote_average}/10`;
        posterImg.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    })
    .catch(err => console.error(err));

function addComment(event) {
    event.preventDefault();
    
    const commentAuthor = document.getElementById('commentAuthor').value;
    const commentPassword = document.getElementById('commentPassword').value;
    const commentContent = document.getElementById('commentContent').value;

    const comment = {
        author: commentAuthor,
        password: commentPassword,
        content: commentContent
    };

    let comments = [];
    if (localStorage.getItem(movieId)) {
        comments = JSON.parse(localStorage.getItem(movieId));
    }

    comments.push(comment);
    localStorage.setItem(movieId, JSON.stringify(comments));

    displayComments();
}

function deleteComment(index) {
    const commentPassword = prompt('댓글 삭제를 위해 비밀번호를 입력하세요:');
    let comments = JSON.parse(localStorage.getItem(movieId));

    if (commentPassword === comments[index].password) {
        comments.splice(index, 1);
        localStorage.setItem(movieId, JSON.stringify(comments));
        displayComments();
    } else {
        alert('비밀번호가 일치하지 않습니다.');
    }
}

function editComment(index) {
    const commentPassword = prompt('댓글 수정을 위해 비밀번호를 입력해볼까요?:');
    let comments = JSON.parse(localStorage.getItem(movieId));

    if (commentPassword === comments[index].password) {
        const newContent = prompt('수정할 내용을 입력해볼까요?:', comments[index].content);
        comments[index].content = newContent;
        localStorage.setItem(movieId, JSON.stringify(comments));
        displayComments();
    } else {
        alert('비밀번호가 틀린데요??.');
    }
}

function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    let comments = [];
    if (localStorage.getItem(movieId)) {
        comments = JSON.parse(localStorage.getItem(movieId));
    }

    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const authorElement = document.createElement('p');
        authorElement.innerText = `작성자: ${comment.author}`;

        const contentElement = document.createElement('p');
        contentElement.innerText = `내용: ${comment.content}`;

        const editButton = document.createElement('button');
        editButton.innerText = '수정';
        editButton.addEventListener('click', () => editComment(index));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '삭제';
        deleteButton.addEventListener('click', () => deleteComment(index));

        commentElement.appendChild(authorElement);
        commentElement.appendChild(contentElement);
        commentElement.appendChild(editButton);
        commentElement.appendChild(deleteButton);

        commentList.appendChild(commentElement);
    });
}

displayComments();
