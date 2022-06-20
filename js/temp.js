$(  function() {
    // api url
    // header("Access-Control-Allow-Origin: *");
    const api_url = 
        "http://localhost:9040/";

    console.log(api_url);
    // Defining async function
    // let userId =  await sessionStorage.getItem("userId");
    // console.log('userId');
    // console.log(userId);
    
    async function getapi() {
        let userId =  await sessionStorage.getItem("userId");
        console.log('userId');
        console.log(userId);
        await fetch("http://localhost:9040/user/"+userId+"/task",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            }).then(async(response) => {
            var data = await response.json();
            console.log(data);
            if (response) {
                if(response.status==200){
                    console.log(data[0]['id']);
                    document.getElementById("divUl").style.display="block";
                    document.getElementById("noData").style.display="none";
                    var ul = document.getElementById("listStart");
                    data.forEach(element => {
                        console.log(typeof(element['taskName']));
                        console.log(element['taskName']);
                        var li = document.createElement("li");
                        li.setAttribute('id','li'+element['id']);
                        var div1 = document.createElement("div");
                        div1.classList.add("form-check");
                        

                        var label1 = document.createElement("label");
                        label1.classList.add("form-check-label");
                        label1.setAttribute('id','label'+element['id']);
            
                        var input1 = document.createElement("input");
                        input1.classList.add("checkbox");
                        input1.type = "checkbox";
                        input1.setAttribute('id',element['id']);
                        if(element['taskCondition']=="Done"){
                            input1.checked=true;
                            li.classList.add("completed");
                        }
            
                        
                        var temp = document.createTextNode(element['taskName']);
            
                        var i1 = document.createElement("i");
                        i1.classList.add("input-helper");
            
                        var itag = document.createElement("i");
                        itag.classList.add("remove");
                        itag.classList.add("mdi");
                        itag.classList.add("mdi-close-circle-outline");
                        itag.setAttribute('id',element['id']);

                        //<input type='image' id='' style='height:20px;width:16.6px;' src='images/icons8-edit-24.png' />
                        var input2 = document.createElement("input");
                        input2.type="image";
                        input2.setAttribute('id',element['id']);
                        input2.style.cssText="height:20px;width:16.6px;";
                        input2.src="images/icons8-edit-24.png";
                        input2.classList.add("edit");
                        
            
                        div1.appendChild(label1);
                        label1.appendChild(input1);
                        label1.appendChild(temp);
                        label1.appendChild(i1);
                        li.appendChild(div1);
                        li.appendChild(itag);
                        li.appendChild(input2);
            
                    
                        ul.appendChild(li);
                    });
                    return data;
                }
                
            }
            
            throw new Error('Something went wrong');
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
                document.getElementById("divUl").style.display="none";
                document.getElementById("noData").style.display="block";
            // return window.location.href = "tasklist.html";
            });
    }
    // Calling that async function
    
    // getapi();
    hideloader();
    // Function to hide the loader
    async function hideloader() {
        console.log("typeof data");
        var data=await getapi();
        console.log(typeof(data));

        
    }
    // Function to define innerHTML for HTML table
    function show(data) {
        let tab = 
            `<tr>
            <th>Name</th>
            <th>Office</th>
            <th>Position</th>
            <th>Salary</th>
            </tr>`;
        
        // Loop to access all rows 
        for (let r of data.list) {
            tab += `<tr> 
        <td>${r.name} </td>
        <td>${r.office}</td>
        <td>${r.position}</td> 
        <td>${r.salary}</td>          
    </tr>`;
        }
        // Setting innerHTML as tab variable
        document.getElementById("employees").innerHTML = tab;
    }

    window.addButton=async function (){
        console.log("Yes");
    }
});