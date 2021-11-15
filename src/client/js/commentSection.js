import "regenerator-runtime/runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtn = document.querySelectorAll(".deleteCommentBtn");

const addComment = (text, id, owner_name) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  icon.innerText = ` ${owner_name} `;
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.classList = "deleteCommentBtn";
  span2.addEventListener("click", deleteComment);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("input");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, owner_name } = await response.json();
    console.log(owner_name);
    addComment(text, newCommentId, owner_name);
  }
};

const deleteComment = async (event) => {
  event.preventDefault();
  const videoId = videoContainer.dataset.id;
  const comment = event.target.parentNode;
  const commentId = comment.dataset.id;
  console.log(commentId);
  const response = await fetch(`/api/videos/${videoId}/commentDelete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId, commentId }),
  });
  console.log(response);
  if (response.status === 200) {
    window.location.reload();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteCommentBtn) {
  for (let i = 0; i < deleteCommentBtn.length; i++) {
    deleteCommentBtn[i].addEventListener("click", deleteComment);
  }
}
