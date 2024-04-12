   // Login Page //

   const formOpenBtn = document.querySelector("#form-open"),
   form__Home = document.querySelector(".form__Home"),
   formContainer = document.querySelector(".form__container"),
   formCloseBtn = document.querySelector("#form_close"),
   signupBtn = document.querySelector("#signup"),
   loginBtn = document.querySelector("#login"),
   pwShowHide = document.querySelectorAll(".pw_hide");
   
   formOpenBtn.addEventListener("click", () => form__Home.classList.add("show") )
   formCloseBtn.addEventListener("click", () => form__Home.classList.remove("show") );

   pwShowHide.forEach(icon => {
    icon.addEventListener("click",(e) => {
        let getPwInput = icon.parentElement.querySelector("input");
        if(getPwInput.type === "password") {
          getPwInput.type = "text"  ;
          icon.classList.replace("fa-eye-slash", "fa-eye" );
        }else{
            getPwInput.type = "password"  ;
          icon.classList.replace("fa-eye", "fa-eye-slash" );
        }
        console.log(getPwInput);
    });
   } );
   
   signupBtn.addEventListener("click",(e) => {
       e.preventDefault();
       formContainer.classList.add("active");
   });
   loginBtn.addEventListener("click",(e) => {
       e.preventDefault();
       formContainer.classList.remove("active");
   });