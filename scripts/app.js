// VARIABLE DACLARATIONS
let faqList = document.querySelectorAll(".menu-item");

// EVENT LISTENERS
faqList.forEach(faq => {
	faq.addEventListener("click", toggleMenuItem);
});

// FUNCTION DECLARATIONS
function toggleMenuItem(e) {
     // FIRST WE LOOP THROUGH faqList AND IF THERE IS A faq THAT IS EXPANDED, COLLAPSE IT.
     faqList.forEach(faq => {
          // IF THE faq HAS A CLASS OF active, REMOVE IT
          if(faq.classList.contains("active")) faq.classList.remove("active");
     });

     // THE this KEYWORD REFERES TO THE CURRENT ITEM THAT WAS CLICKED 
     // ONCE ALL THE OTHER active CLASSES HAVE BEEN REMOVED, ADD IT TO THE CURRENT faq
     this.classList.toggle("active");
}
