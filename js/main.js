

let fName = $('#fName'),
  age = $('#age'),
  email = $('#email'),
  phoneNumber = $('#phoneNumber'),
  regBtn = $('#regBtn'),
  productIndex,
  products = [],
  globalIpAddress = "http://159.65.21.42:9000";


 loadUserData();

function loadUserData() {
  $.ajax({
    type: 'GET',
    url: `${globalIpAddress}/products`,
    success: function (response) {
      products = response;
      let rows = '';
      for (let index = 0; index < products.length; index++){

        if(products[index]['category']== "jaySection"  ||
        products[index]['category']== "jayShop"  ||
        products[index]["description"]==["Nissan Gtr"]
        ){
          rows +=`
          <div class="products">
            <div class="prdct">
              <img src="${globalIpAddress}${products[index]['image']}" alt="" />
            </div>
            <div class="cols">
              <h3>Name: ${products[index]['name']}</h3>
              <h3>Price: ${products[index]['price']}</h3>
              <h3>Quantiy: ${products[index]['quantity']}</h3>
              <h3><a href="">Edit</a> || <a href="">Delete</a></h3>
            </div>
          </div>`;
        }
      }
      $('#allproducts').html(rows);
      
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function clearForm() {
  fName.val('');
  age.val('');
  email.val('');
  phoneNumber.val('');
}