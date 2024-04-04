console.log('POST JS loaded');

let myId = document.getElementById('hello-world');
let postsBox = document.getElementById('post-box');
let loadBtn = document.getElementById('load-btn');

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
const csrftoken = getCookie('csrftoken');

const likeUnlikeForm = () => {
  console.log('click action');
  // const formArray = Array.from(document.getElementsByClassName('like_unlike_form'));
  const formArray = [...document.getElementsByClassName('like_unlike_form')];
  formArray.forEach((form) =>
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const clickedId = e.target.getAttribute('data-form-id');
      console.log('clickedId', clickedId);
      const clickedBtn = document.getElementById(`like-unlike-${clickedId}`);

      $.ajax({
        type: 'POST',
        url: 'like_unlike/',
        data: {
          csrfmiddlewaretoken: csrftoken,
          pk: clickedId,
        },
        success: function (response) {
          console.log('res', response);
          clickedBtn.textContent = response.liked ? ` ${response.count} Unlike` : `${response.count} Like`;
          if (response.liked) {
            clickedBtn.classList.add('btn-danger');
          } else {
            clickedBtn.classList.add('btn-primary');
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
    })
  );
};

$.ajax({
  type: 'GET',
  url: 'hello/',
  success: function (response) {
    console.log('RES', response);
    myId.textContent = JSON.stringify(response);
  },
  error: function (error) {
    console.log(error);
  },
});

let visible = 2;
const getData = () => {
  $.ajax({
    type: 'GET',
    url: `load_post/${visible}`,
    success: function (response) {
      if (response.size == visible) {
        loadBtn.style.display = 'none';
        myId.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>All Records Fetched!</strong> No posts to load.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
      }
      if (response.data) {
        let { data } = response;
        data.forEach((element) => {
          console.log(element);
          // postsBox.innerHTML += JSON.stringify(element);
          postsBox.innerHTML += `
          <div class="card" style="width: 18rem;">
            <div class="card-header">
              ${element.author}
            </div>
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.body}.</p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-sm-6">
                  <a href="# " class="btn btn-primary">Details </a>
                </div>
                <div class="col-sm-6 ">
                  <form class="like_unlike_form" data-form-id="${element.id}">   
                                
                    <button  class="btn btn-primary" id="like-unlike-${element.id}">
                      <span class="badge badge-success">${element.likes_count}</span>Like              
                    </button>
                  </form>
                </div>
              </div>        
            </div>
          </div>
          <br>
          `;
        });
        likeUnlikeForm();
      } else {
        postsBox.innerHTML = `<div class="alert alert-danger" role="alert">Data Fetched Failed!/ No Posts created</div> `;
      }
    },
    error: function (error) {
      console.log('err', error);
    },
  });
};

loadBtn.addEventListener('click', () => {
  visible += 2;
  getData();
});

getData();

let scrollLimit = 50; // Amount after which ajax() call initializes
let limit = 3; // item count
let offset = 6; // offset
$(window).on('scroll', function () {
  scrollPosition = $(this).scrollTop();
  if (scrollPosition >= scrollLimit) {
    console.log('scroll');
    visible += 2;
    getData(); // loadContent method in which ajax() call is defined

    // Update values on each scroll
    scrollLimit += 500;
  }
});
