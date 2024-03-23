console.log('POST JS loaded');

let myId = document.getElementById('hello-world');


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
