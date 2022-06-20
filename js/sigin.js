$(function() {
    // api url
    // header("Access-Control-Allow-Origin: *");
    const api_url = 
        "http://localhost:9040/";

    console.log(api_url);
    // Defining async function
    async function login(email,password) {
        // var user=new User(name,email,password)
        
        // Storing response
        // const response = await fetch("http://localhost:9040/user/register",{
        await fetch("http://localhost:9040/user/signin",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
          }).then(async(response) => {
            var data = await response.json();
        
            if (response) {
                if(response.status==200){
                    console.log(data[0]['id']);
                    window.alert("Login Successful")
                    sessionStorage.setItem("userId", data[0]['id']);
                    // let userId = sessionStorage.getItem("userId");
                    return window.location.href = "tasklist.html";
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
    window.sigin = async (e) => {
        
        const email = document.getElementById("your_email").value;
        const pass = document.getElementById("your_pass").value;
        console.log(email);
        console.log(pass);
        // return false
        var data=await login(email,pass);
        // return data;
    };
});

class User {
    constructor(name, email,password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  }