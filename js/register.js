$(function() {
    // api url
    // header("Access-Control-Allow-Origin: *");
    const api_url = 
        "http://localhost:9040/";

    console.log(api_url);
    // Defining async function
    async function register(name,email,password) {
        // var user=new User(name,email,password)
        
        // Storing response
        // const response = await fetch("http://localhost:9040/user/register",{
        await fetch("http://localhost:9040/user/register",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name":name,
                "email": email,
                "password": password
            })
          }).then((response) => {
            // var data = await response.json();
        
            if (response) {
                if(response.status==201){
                    window.alert("Register Successful")
                    return window.location.href = "login.html";
                }
                
            }
            
            throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("errorText").style.display="block";
            // return window.location.href = "tasklist.html";
          });
        
    }
    window.check = async (e) => {
        console.log("email");
        // const form = new FormData(e.target);
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("pass").value;
        console.log(name);
        console.log(email);
        console.log(pass);
        // return false
        var data=await register(name,email,pass);
        // return data;
    };
    // window.check = async (e) => {
    //     console.log("email");
    //     const form = new FormData(e.target);
    //     const name = form.get("name");
    //     const email = form.get("email");
    //     const pass = form.get("pass");
    //     console.log(name);
    //     console.log(email);
    //     console.log(pass);
    //     // return false
    //     var data=await register(form.get("name"),form.get("email"),form.get("pass"))
    //     // return data;
    // };
});

class User {
    constructor(name, email,password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  }