const courseList = document.querySelector("#lista-cursos");
const courseCart = document.querySelector("#lista-carrito tbody");
const clearCartBtn = document.querySelector("#vaciar-carrito");

let cartItems = [];

loadEvents();

function loadEvents() {
  courseList.addEventListener("click", addCourse);
  courseCart.addEventListener("click", removeCourse);
  clearCartBtn.addEventListener("click", clearCartAndList);
}

function clearCartAndList(e) {
  e.preventDefault();
  cartItems = [];
  cleanCart();
}

function cleanCart() {
  courseCart.innerHTML = "";
}

function addItemToCart(courses) {
  cleanCart();
  courses.forEach((course) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
      <img src="${course.image}" width=100>
    </td>
    <td>${course.title}</td>  
    <td>${course.price}</td>
    <td>${course.quantity}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
    </td>
    `;
    courseCart.appendChild(row);
  });
}

function getInfoCourse(course) {
  return {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".precio span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
    quantity: 1,
  };
}

function addCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const course = e.target.parentElement.parentElement;
    const dataCourse = getInfoCourse(course);
    const itemExists = cartItems.some((item) => item.id === dataCourse.id);
    if (itemExists) {
      const newCartItems = cartItems.map((item) => {
        if (item.id === dataCourse.id) {
          item.quantity++;
        }
        return item;
      });
      cartItems = [...newCartItems];
    } else {
      cartItems.push(dataCourse);
    }
    addItemToCart(cartItems);
  }
}

function removeCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const courseId = e.target.parentElement
      .querySelector("a")
      .getAttribute("data-id");
    const newCartItems = cartItems.filter((item) => item.id !== courseId);
    cartItems = [...newCartItems];
    addItemToCart(cartItems);
  }
}
