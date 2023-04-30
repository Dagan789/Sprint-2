// global variables

let signUp = document.querySelector(`#signUp`);
let cancel_signUp = document.querySelector(`#cancel_signUp`);
let login = document.querySelector(`#login`);

// functions
function r_e(id) {
  return document.querySelector(`#${id}`);
}
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const millis = date.getMilliseconds().toString().padStart(3, "0");

  return `${year}${month}${day}_${hour}${minute}${second}_${millis}`;
};

// get value from survey
function grabCheckbox() {
  let category = document.getElementsByName("category");
  let category_list = [];
  for (let i = 0; i < category.length; i++) {
    if (category[i].checked) {
      category_list.push(category[i].value);
    }
  }
  return category_list;
}

//function to post outfit
function upload_post(coll, field, val) {
  //html code for each post
  let html = "";

  let certain_posts = "";

  //uploads only posts specified by given fields
  if (field && val) {
    certain_posts = db.collection(coll).where(field, "==", val);
  } else {
    certain_posts = db.collection(coll);
  }

  certain_posts.get().then((response) => {
    let posts = response.docs;
    if (posts.length == 0) {
      content.innerHTML = "No posts currently available";
      return;
    }
    // loop through each post
    posts.forEach((post) => {
      if (auth.currentUser.email == post.data().user_email) {
        html += `
              <div class="box">
                                  <h1 class="has-background-info-light p-1 title">${
                                    post.data().item
                                  } <button class="delete is-medium is-pulled-right is-danger" onclick="del_post('posts', '${
          post.id
        }')">X</button> </h1>
                                  <span class="is-size-5">Style: ${
                                    post.data().style
                                  }</span>
                                  <p class="m-3"> <img height="70" src="${
                                    post.data().image
                                  }" /> </p>
                                  <p class="is-size-7">Price: ${
                                    post.data().price
                                  }</p>
                                  <h2 class = "is-size-4 p-3">${
                                    post.data().description
                                  }</h2>
              </div> `;
      } else {
        html += `
              <div class="box">
                                  <h1 class="has-background-info-light p-1 title">${
                                    post.data().item
                                  }</h1>
                                  <span class="is-size-5">Style: ${
                                    post.data().style
                                  }</span>
                                  <p class="m-3"> <img height="70" src="${
                                    post.data().image
                                  }" /> </p>
                                  <p class="is-size-7">Price: ${
                                    post.data().price
                                  }</p>
                                  <h2 class = "is-size-4 p-3">${
                                    post.data().description
                                  }</h2>
              </div> `;
      }
    });

    //element('posts').classList.remove('is-hidden');

    // show on the content div
    r_e("posts").innerHTML = html;
  });
}

//function to delete posts
function del_post(coll, id) {
  db.collection(coll)
    .doc(id)
    .delete()
    .then(() => {
      // load all posts
      upload_post("posts");
    });
}

// homepage image auto switch
let images = document.getElementsByTagName("img");
let currentIndex = 0;

function prevImage() {
  images[currentIndex].style.display = "none";
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  images[currentIndex].style.display = "block";
}

function nextImage() {
  images[currentIndex].style.display = "none";
  currentIndex++;
  if (currentIndex > images.length - 1) {
    currentIndex = 0;
  }
  images[currentIndex].style.display = "block";
}

// sign up user
r_e("signup_form").addEventListener("submit", (e) => {
  e.preventDefault();
  // grab the email and password combination from the form
  let email = r_e("signup_email").value;
  let password = r_e("signup_password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      r_e("signup_form").reset();
      r_e("mymodal_signUp").classList.remove("is-active");
      location.reload();
    })
    .catch((err) => {
      mymodal_signUp.querySelector(".error").innerHTML = err.message;
    });
});

// Login user
r_e("login_form").addEventListener("submit", (e) => {
  e.preventDefault();
  // grab the email and password combination from the form
  let email = r_e("login_email").value;
  let password = r_e("login_password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // console.log(`${user.user.email} is created!`)

      r_e("login_form").reset();
      r_e("mymodal_login").classList.remove("is-active");
      location.reload();
    })
    .catch((err) => {
      mymodal_login.querySelector(".error").innerHTML = err.message;
    });
});

// track user authentication status with onauthstatechanged

auth.onAuthStateChanged((user) => {
  // check if user signed in or out
  if (user) {
    // show user email in nav bar
    if (auth.currentUser.email == "admin@admin.com") {
      r_e("user_email").innerHTML =
        `<i class="fa-solid fa-user-gear"></i> : ` + auth.currentUser.email;
    } else {
      r_e("user_email").innerHTML =
        `<i class="fa-solid fa-user fa-1x"></i> : ` + auth.currentUser.email;
    }

    r_e("signUp").classList.add("is-hidden");
    r_e("login").classList.add("is-hidden");
    r_e("signout").classList.remove("is-hidden");
  } else {
    // remove user email from nav bar
    r_e("user_email").innerHTML = "";
    r_e("signout").classList.add("is-hidden");
    r_e("signUp").classList.remove("is-hidden");
    r_e("login").classList.remove("is-hidden");
    r_e("user_button").classList.add("is-hidden");
  }
});

// sign out
document.querySelector(`#signout`).addEventListener(`click`, () => {
  auth.signOut().then((user) => {
    location.reload();
  });
});

cancel_signUp.addEventListener(`click`, () => {
  document.querySelector("#mymodal_signUp").classList.remove("is-active");
});

signUp.addEventListener(`click`, () => {
  document.querySelector("#mymodal_signUp").classList.add("is-active");
});

cancel_login.addEventListener(`click`, () => {
  document.querySelector("#mymodal_login").classList.remove("is-active");
});

login.addEventListener(`click`, () => {
  document.querySelector("#mymodal_login").classList.add("is-active");
});

// User button
r_e("user_button").addEventListener(`click`, () => {
  r_e("outfits").classList.add("is-hidden");
  r_e("survey_page").classList.add("is-hidden");
  r_e("users_page").classList.remove("is-hidden");
  r_e("outfit_button").classList.remove("is-hidden");
  r_e("posts").classList.remove("is-hidden");
  // r_e("outfits_title").classList.add("is-hidden")
});

//Upload outfit button
r_e("outfit_button").addEventListener("click", () => {
  //console.log("the outfit button works!")
  //r_e("favorites").classList.add("is-hidden");
  r_e("outfit_button").classList.add("is-hidden");
  r_e("posts").classList.add("is-hidden");
  r_e("upload_page").classList.remove("is-hidden");
});

function save_data(coll_name, obj) {
  db.collection(coll_name)
    .add(obj)
    .then(() => {
      // reset the form
      r_e("form_topost").reset();
    });
}

//Share an outfit
r_e("form_topost").addEventListener("submit", (e) => {
  e.preventDefault();

  let file = r_e("outfit_img").files[0];

  //setting distinct name for each image using the date
  let image = formatDate(new Date()) + "_" + file.name;

  const task = ref.child(image).put(file);

  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((file) => {
      //url of the image is ready now
      //wrapping objecting before sending to Firebase
      let userPost = {
        item: r_e("clothing_name").value,
        price: r_e("price").value,
        brand: r_e("brand_name").value,
        category: [
          r_e("gender_sel").value,
          r_e("style_sel").value,
          r_e("color_sel").value,
        ],
        description: r_e("description").value,
        user_email: auth.currentUser.email,
        image: file,
        url: r_e("outfits_url").value,
      };

      //send new object to firebase

      save_data("posts", userPost);

      setTimeout(() => {
        upload_post("posts");
      }, 1500);
    });
});

// Survey button
r_e("survey_button").addEventListener(`click`, () => {
  
  r_e("footer").classList.add("is-hidden");
  r_e("outfits").classList.add("is-hidden");
  r_e("users_page").classList.add("is-hidden");
  r_e("survey_page").classList.remove("is-hidden");
  // r_e("outfits_title").classList.add("is-hidden");
});

function updateBudgetLabel(value) {
  document.getElementById("budget-label").textContent = "$" + value;
}

function includes(arr1, arr2) {
  return arr2.every((val) => val === "null" || arr1.includes(val));
}

/*r_e("favorite_btn").addEventListener("click", () => {
  r_e("favorite_btn").innerHTML = "<button id = " + "favorite_btn" + "style='font-size:20px color: red'> Favorited <i class="+ 'fa fa-heart'+ "> + </i></button>";
});*/

// Survey Submit and Show Results:
r_e("survey_form").addEventListener("submit", (event) => {
  event.preventDefault();
  let html = [];
  let filter = [
    r_e("gender_survey").value,
    r_e("color_survey").value,
    r_e("style_survey").value,
  ];
  let price = r_e("price_survey").value;

  db.collection("posts")
    .get()
    .then((res) => {
      let documents = res.docs;
      documents.forEach((doc) => {
        console.log(includes(doc.data().category, filter));
        if (
          includes(doc.data().category, filter) &&
          parseFloat(doc.data().price) >= price
        ) {
          html += ` <div class="columns">
            <div class ="column is-3" >
            <img
    src='${doc.data().image}'
    style="width: 100%; height: 100%; class="fixed-size-img";"
    alt="Clothing Image">
            </div>
            <div class ="column is-9">
            <p class="title is-4">${doc.data().brand}</p>
    <p class="subtitle is-4">${doc.data().item}</p>
    <p class="is-6 mb-2 is-size-5">${doc.data().price} USD</p>
    <div class="content has-text-left p-0">
      <p>${doc.data().description}</p>
      <button id = "favorite_btn" style="font-size:20px"> Favorite <i class="fa fa-heart"></i></button>
      <a style = "font-size:20px" href='${doc.data().url}'>More Information</a>
    </div>

            </div>
          
            </div> <hr>`;
        }

        if (html.length > 0) {
          r_e("survey_results").innerHTML = html;
        } else {
          r_e(
            "survey_results"
          ).innerHTML = `<p>Unfortunately, we do not have any recommended outfits at this time.</p>`;
        }
      });
    });
});



