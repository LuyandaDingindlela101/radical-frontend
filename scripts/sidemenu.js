// VARIABLE DACLARATIONS
let faqList = document.querySelectorAll(".menu-item");
let view_all_products = document.querySelector(".view-all-product");
let open_add_product_btn = document.querySelector(".open-add-product");
let edit_add_product_btn = document.querySelector(".edit-add-product");


let view_profile = document.querySelector(".view-profile-btn");
let edit_profile = document.querySelector(".edit-profile");


console.log(edit_profile);
let sections = document.querySelectorAll("section");





// EVENT LISTENERS
faqList.forEach(faq => {
	faq.addEventListener("click", addMenuItem);
});

view_all_products.addEventListener("click", () => {
     sections.forEach(section => section.classList.remove("active"));

     document.querySelector(".products-section").classList.add("active");
});

open_add_product_btn.addEventListener("click", () => {
     sections.forEach(section => section.classList.remove("active"));

     document.querySelector(".add-product-secton").classList.add("active");
});

edit_add_product_btn.addEventListener("click", () => {
     sections.forEach(section => section.classList.remove("active"));

     document.querySelector(".edit-product-secton").classList.add("active");
});

view_profile.addEventListener("click", () => {
     sections.forEach(section => section.classList.remove("active"));

     document.querySelector(".view-profile").classList.add("active");
});

edit_profile.addEventListener("click", () => {
     sections.forEach(section => section.classList.remove("active"));

     document.querySelector(".edit-profile-secton").classList.add("active");
});

// FUNCTION DECLARATIONS
function addMenuItem(e) {
     // FIRST WE LOOP THROUGH faqList AND IF THERE IS A faq THAT IS EXPANDED, COLLAPSE IT.
     faqList.forEach(faq => {
          // IF THE faq HAS A CLASS OF active, REMOVE IT
          if(faq.classList.contains("active")) faq.classList.remove("active");
     });

     // THE this KEYWORD REFERES TO THE CURRENT ITEM THAT WAS CLICKED 
     // ONCE ALL THE OTHER active CLASSES HAVE BEEN REMOVED, ADD IT TO THE CURRENT faq
     this.classList.add("active");
}

