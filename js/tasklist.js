(  function($) {
    'use strict';
    $( function() {
      var todoListItem = $('.todo-list');
      var todoListInput = $('.todo-list-input');
      $('.todo-list-add-btn').on("click", async function(event) {
        event.preventDefault();
  
        var item = $(this).prevAll('.todo-list-input').val();
  
        if (item) {
          let userId =  await sessionStorage.getItem("userId");
          console.log('userIdInsert');
          console.log(userId);
          await fetch("http://localhost:9040/user/taskinsert",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "taskName": item,
              "taskDescription": "-",
              "taskCondition": "Not Done",
              "userId": userId
            })
          }).then(async(response) => {
            var data = await response.json();
        
            if (response) {
                if(response.status==201){
                  console.log("data[0]");
                  console.log(data);
                  window.alert("Insert Task Successful")
                  todoListItem.append("<li id='li"+data['id']+"'><div class='form-check'><label class='form-check-label' id='label"+data['id']+"'><input class='checkbox' type='checkbox' id='"+data['id']+"'/>" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline' id='"+data['id']+"'></i><input type='image' id='"+data['id']+"' class='edit' style='height:20px;width:16.6px;' src='images/icons8-edit-24.png' /></li>");
                  todoListInput.val("");
                  window.location.href = "tasklist.html";
                }
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
            // document.getElementById("errorText").style.display="block";
            // return window.location.href = "tasklist.html";
          });
          
        }
  
      });
  
      todoListItem.on('change', '.checkbox', async function() {
        let userId =  await sessionStorage.getItem("userId");
        console.log('userIdPut');
        console.log(userId);
        var text = $("#label"+$(this).attr('id')).contents().filter(function() {
          return this.nodeType == Node.TEXT_NODE;
        }).text();
        console.log(text);

        if ($(this).attr('checked')) {
          await fetch("http://localhost:9040/taskupdate",{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id":this.id,
              "taskName": text,
              "taskDescription": "-",
              "taskCondition": "Not Done",
              "userId": userId
            })
          }).then((response) => {
            // var data = await response.json();
        
            if (response) {
                if(response.status==200){
                    window.alert("Update Task Successful")
                    $(this).removeAttr('checked');
                }
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
          });
          // $(this).removeAttr('checked');
        } else {
          await fetch("http://localhost:9040/taskupdate",{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id":this.id,
              "taskName": text,
              "taskDescription": "-",
              "taskCondition": "Done",
              "userId": userId
            })
          }).then((response) => {
            // var data = await response.json();
        
            if (response) {
                if(response.status==200){
                    window.alert("Update Task Successful")
                    $(this).attr('checked', 'checked');
                }
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
          });
          // $(this).attr('checked', 'checked');
        }
  
        $(this).closest("li").toggleClass('completed');
  
      });
  
      todoListItem.on('click', '.remove', async function() {
        console.log('taskId');
        console.log(this.id);
        await fetch("http://localhost:9040/taskdelete/"+this.id,{
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
        }).then((response) => {
          // var data = await response.json();
      
          if (response) {
              if(response.status==200){
                  window.alert("Delete Task Successful")
                  $(this).parent().remove();
              }
              
          }
          
          // throw new Error('Something went wrong');
        })
        .catch((error) => {
          console.log(error);
        });
        
        
      });
  
    });
  })(jQuery);