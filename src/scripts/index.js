const postContainer = document.getElementById('postContainer');
const searchForm = document.getElementById('searchForm');
const postIdInput = document.getElementById('postId');

//Сабміт форми з id поста
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const postId = postIdInput.value;
  if (postId >= 1 && postId <= 100) {
    fetchPosts(postId)
  } 
});

//Функція, яка отримує id з форми і отримує json з постом через fetch
function fetchPosts(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else{
        throw new Error(response.status);
      }
    })
    .then(data => {
      postContainer.innerHTML = `
      <div class="post">
        <h2>${data.title}</h2>
        <p>${data.body}</p>
        <div id="commentsContainer">
          <button id="commentsButton" data-post="${data.id}">Load Comments</button>
        </div>
      </div>
      `;
    })
    .catch((error) => {
      console.log(error)
    });
}

//Клік по кнопці завантаження коментарів
postContainer.addEventListener('click', event => {
  const target = event.target;
  if (target.matches('#commentsButton')) {
    const postId = target.dataset.post;
    fetchComments(postId);
  }
});

//Функція, яка отримує id з кнопки і отримує json з коментарями через fetch
function fetchComments(postId) {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else{
        throw new Error(response.status);
      }
    })
    .then(data => {
      const commentsContainer= document.getElementById('commentsContainer');
      commentsContainer.innerHTML = `<h2>Comments</h2>`;
      data.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
        <h3>${comment.name} (${comment.email})</h3>
        <p>${comment.body}</p>
        `;
        commentsContainer.appendChild(commentElement);
      });

    })

}




