// global variables

let signUp = document.querySelector(`#signUp`);
let cancel_signUp = document.querySelector(`#cancel_signUp`);
let login = document.querySelector(`#login`);

//////////////////////////////////////////////////////////// FUNCTIONS  ////////////////////////////////////////////////////////////
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
// favorate button
let isFavorite = false;

// function toggleFavorite(id) {
//   const heartIcon = document.getElementById(id);
//   isFavorite = !isFavorite;

//   if (isFavorite) {
//     heartIcon.textContent = "♥";
//   } else {
//     heartIcon.textContent = "♡";
//   }

//   //grabbing signed in user email and uploading to posts collection favorited field
// }

/////// VERSION 1 ///////
///////////////////////////
// function toggleFavorite(postId) {
//   const heartIcon = document.getElementById(postId);
//   isFavorite = !isFavorite;

//   if (isFavorite) {
//     heartIcon.textContent = "♥";
//     // Add user email to the favorites list of the post
//     db.collection("posts")
//       .doc(postId)
//       .update({
//         favorites: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
//       });
//   } else {
//     heartIcon.textContent = "♡";
//     // Remove user email from the favorites list of the post
//     db.collection("posts")
//       .doc(postId)
//       .update({
//         favorites: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
//       });
//   }
// }

// function showFavoritePosts() {
//   let html = "";

//   db.collection("posts")
//     .where("favorites", "array-contains", auth.currentUser.email)
//     .get()
//     .then((response) => {
//       let posts = response.docs;
//       if (posts.length == 0) {
//         content.innerHTML = "No favorite posts currently available";
//         return;
//       }
//       // loop through each favorite post and display them
//       // (you can reuse the code from the 'upload_post' function)
//       // ...
//     });
// }

/////// VERSION 1 ///////
/////////////////////////
// global variables
let favoritePosts = [];

// functions

//To persist the favorite posts data across page navigation, you can use browser storage options like localStorage or sessionStorage.
// In this example, I'll use localStorage which stores data with no expiration time.
// First, you'll need to save the favoritePosts array to the localStorage whenever it gets updated.
// Then, on the initial page load, you should retrieve the saved data from localStorage and update the favoritePosts array.
// Here's how you can modify the updateFavoriteList function and add a function to load the favorites from localStorage:

/*  function saveFavoritesToLocalStorage() {
  localStorage.setItem("favoritePosts", JSON.stringify(favoritePosts));
}

function loadFavoritesFromLocalStorage() {
  const storedFavorites = localStorage.getItem("favoritePosts");

  if (storedFavorites) {
    favoritePosts = JSON.parse(storedFavorites);
    let html = "";
    favoritePosts.forEach((post) => {
      html += `
        <div class="favorite-post">
          <img src="${post.image}" alt="Post Image" />
          <p>${post.item}</p>
        </div>
      `;
    });
    document.querySelector("#favorite_posts").innerHTML = html;
  }
}

function updateFavoriteList(postID, add) {
  const postRef = db.collection("posts").doc(postID);
  postRef.get().then((doc) => {
    if (doc.exists) {
      const postData = doc.data();
      if (add) {
        favoritePosts.push(postData);
      } else {
        favoritePosts = favoritePosts.filter(
          (post) => post.item !== postData.item
        );
      }
      let html = "";
      favoritePosts.forEach((post) => {
        html += `
          <div class="favorite-post">
            <img src="${post.image}" alt="Post Image" />
            <p>${post.item}</p>
          </div>
        `;
      });
      document.querySelector("#favorite_posts").innerHTML = html;
    } else {
      console.log("No such document!");
    }
    saveFavoritesToLocalStorage();
  });
}
let favoriteFieldExists = false;

function updateFavoriteList(postID, user_email, add_del) {
  console.log(user_email)
  const postRef = db.collection("posts").doc(postID);
  console.log(doc.id, " => ", doc.data());
  postRef.get().then((doc) => {
    if (doc.exists) {
      if(add_del){
        if (!favoriteFieldExists) {
          db.collection("posts").doc(postID).set({favorites: user_email}, {merge: true});
        }
        else{
          db.collection("posts").doc(doc.id).updateData({'favorites': FieldValue.arrayUnion([user_email])})
        };
      };
      else {

      }
    }});
  };*/


function toggleFavorite(id) {
  const heartIcon = document.getElementById(id);
  isFavorite = !isFavorite;

  if (isFavorite) {
    heartIcon.textContent = "♥";
    //updateFavoriteList(id, r_e("user_email").value, add);
  } else {
    heartIcon.textContent = "♡";
    //updateFavoriteList(id, r_e("user_email").value, delete);
  }
  loadFavoritesFromLocalStorage();
}

//function to post outfit
// function upload_post(coll, field, val) {
//   //html code for each post
//   let html = "";

//   let certain_posts = "";

//   //uploads only posts specified by given fields
//   if (field && val) {
//     certain_posts = db.collection(coll).where(field, "==", val);
//   } else {
//     certain_posts = db.collection(coll);
//   }

// certain_posts.get().then((response) => {
//   let posts = response.docs;
//   if (posts.length == 0) {
//     content.innerHTML = "No posts currently available";
//     return;
//   }
// loop through each post
//     posts.forEach((post) => {
//       if (auth.currentUser.email == post.data().user_email) {
//         html += `
//               <div class="box">
//                                   <h1 class="has-background-info-light p-1 title">${
//                                     post.data().item
//                                   } <button class="delete is-medium is-pulled-right is-danger" onclick="del_post('posts', '${
//           post.id
//         }')">X</button> </h1>
//                                   <span class="is-size-5">Style: ${
//                                     post.data().style
//                                   }</span>
//                                   <p class="m-3"> <img height="70" src="${
//                                     post.data().image
//                                   }" /> </p>
//                                   <p class="is-size-7">Price: ${
//                                     post.data().price
//                                   }</p>
//                                   <h2 class = "is-size-4 p-3">${
//                                     post.data().description
//                                   }</h2>
//               </div> `;
//       } else {
//         html += `
//               <div class="box">
//                                   <h1 class="has-background-info-light p-1 title">${
//                                     post.data().item
//                                   }</h1>
//                                   <span class="is-size-5">Style: ${
//                                     post.data().style
//                                   }</span>
//                                   <p class="m-3"> <img height="70" src="${
//                                     post.data().image
//                                   }" /> </p>
//                                   <p class="is-size-7">Price: ${
//                                     post.data().price
//                                   }</p>
//                                   <h2 class = "is-size-4 p-3">${
//                                     post.data().description
//                                   }</h2>
//               </div> `;
//       }
//     });

//     //element('posts').classList.remove('is-hidden');

//     // show on the content div
//     r_e("posts").innerHTML = html;
//   });
// }

//function to delete posts
function del_post(coll, id) {
  db.collection(coll)
    .doc(id)
    .delete()
    .then(() => {
      // load all posts
      upload_post("posts");
    });
  r_e(id).classList.add("is-hidden");
}

// homepage image auto switch
let images = document.getElementsByTagName("img");
let currentIndex = 0;

function prevImage() {
  images[currentIndex].style.display = "none";
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 4;
  }
  images[currentIndex].style.display = "block";
}

function nextImage() {
  images[currentIndex].style.display = "none";
  currentIndex++;
  if (currentIndex > 4) {
    currentIndex = 0;
  }
  images[currentIndex].style.display = "block";
}

//////////////////////////////////////////////////////////// USER SIGN-UP ////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////// USER AUTHENTIFICATION  ////////////////////////////////////////////////////////////

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
    r_e("content_msg").classList.add("is-hidden");
    r_e("survey_button").classList.remove("is-hidden");
  } else {
    // remove user email from nav bar
    r_e("user_email").innerHTML = "";
    r_e("signout").classList.add("is-hidden");
    r_e("signUp").classList.remove("is-hidden");
    r_e("login").classList.remove("is-hidden");
    r_e("user_button").classList.add("is-hidden");
  }
});

//////////////////////////////////////////////////////////// USER SIGN-OUT  ////////////////////////////////////////////////////////////

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
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("posts")
        .get()
        .then((res) => {
          let documents = res.docs;
          let html = `<h1 class="has-text-centered has-text-grey-dark has-text-weight-bold is-size-2">My Posts</h1>`;
          documents.forEach((doc) => {
            if (auth.currentUser.email == doc.data().user_email) {
              html += `
                            <div class="box" id = "${doc.id}">
                                                <h1 class="has-background-info-light p-1 title">${
                                                  doc.data().item
                                                } <button class="delete is-medium is-pulled-right is-danger" onclick="del_post('posts', '${
                doc.id
              }')">X</button> </h1>
                                                <span class="is-size-5">Style: ${
                                                  doc.data().style
                                                }</span>
                                                <p class="m-3"> <img height="70" src="${
                                                  doc.data().image
                                                }" /> </p>
                                                <p class="is-size-7">Price: ${
                                                  doc.data().price
                                                }</p>
                                                <h2 class = "is-size-4 p-3">${
                                                  doc.data().description
                                                }</h2>
                            </div> `;
            }
          });
          r_e("posts").innerHTML = html;
        });
    }
  });

  r_e("outfits").classList.add("is-hidden");
  // r_e("footer").classList.add("is-hidden");
  // r_e("page-container").classList.add("is-hidden");
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

//////////////////////////////////////////////////////////// SHARE OUTFIT ////////////////////////////////////////////////////////////

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

  //r_e("form_topost").classList.add("is-hidden");
  r_e("posts").classList.remove("is-hidden");
});

// Survey button
r_e("survey_button").addEventListener(`click`, () => {
  // r_e("footer").classList.add("is-hidden");
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

//////////////////////////////////////////////////////////// SURVEY + RESULTS  ////////////////////////////////////////////////////////////

r_e("survey_form").addEventListener("submit", (event) => {
  event.preventDefault();
  let html = [];
  let filter = [
    r_e("gender_survey").value,
    r_e("color_survey").value,
    r_e("style_survey").value,
  ];
  let price = r_e("price_survey").value;
  auth.onAuthStateChanged((user)=>{
    if (user){
      if (auth.currentUser.email == "admin@admin.com"){
        db.collection("posts")
        .get()
        .then((res) => {
          let documents = res.docs;
          documents.forEach((doc) => {
            //console.log(includes(doc.data().category, filter));
            if (
              includes(doc.data().category, filter) &&
              parseFloat(doc.data().price) <= price
            ) {
              html += ` <div class="columns p-3">
                <div class ="column is-3" id = "${doc.data().item}" >
                <img
        src='${doc.data().image}'
        style="width: 100%; height: 100%; class="fixed-size-img";"
        alt="Clothing Image">
                </div>
                <div class ="column is-9">
                <p class="title is-4">${doc.data().brand}  <button class="delete is-medium is-pulled-right is-danger" onclick="del_post('posts', '${
                  doc.data().item
                }')">X</button></p>
        <p class="subtitle is-4">${doc.data().item} </p>
        <p class="is-6 mb-2 is-size-5">${doc.data().price} USD</p>
        <div class="content has-text-left p-0">
          <p>${doc.data().description}</p>
          <button id="${doc.id}" onclick="toggleFavorite('${doc.id}')">
          <span id="heartIcon" class="icon-heart">♡</span> 
      </button>
    
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
      } else {
        db.collection("posts")
        .get()
        .then((res) => {
          let documents = res.docs;
          documents.forEach((doc) => {
            //console.log(includes(doc.data().category, filter));
            if (
              includes(doc.data().category, filter) &&
              parseFloat(doc.data().price) <= price
            ) {
              html += ` <div class="columns p-3">
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
          <button id="${doc.id}" onclick="toggleFavorite('${doc.id}')">
          <span id="heartIcon" class="icon-heart">♡</span> 
      </button>
    
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
      }
    }
  })

});


