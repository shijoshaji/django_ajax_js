console.log('POST JS loaded');

let myId = document.getElementById('hello-world');
let postsBox = document.getElementById('post-box');
let loadBtn = document.getElementById('load-btn');

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
                <button type="button" class="btn btn-primary">
                <span class="badge badge-success">${element.likes_count}</span>Likes
                
              </button>
                </div>
              </div>        
            </div>
          </div>
          <br>
          `;
        });
      } else {
        postsBox.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Data Fetched Failed!/ No Posts created
        </div>
  `;
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
