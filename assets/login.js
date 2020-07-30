$(document).ready(function () {

  $("#login").on("click", function (e) {
    e.preventDefault()
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();

    $.ajax({
      method: "POST",
      url: "src/library/loginController.php",
      data: {
        email: email,
        password: password
      },
      success: (data) => {
        console.log(data)
        if (data == "true") {
          window.location.replace("src/dashboard.php");
        } else {
          $("#error_message").text(data);
          $("#error_message").addClass("text-danger mb-3");
          $("#error_message").removeClass("invisible");

        }
      }
    })
  })

  $("#logout").on("click", function () {
    $.get("http://localhost/php-employee-management-v1/src/library/sessionHelper.php", {
      action: "logout"
    }, function (data) {

      if (data == "success") window.location.replace("http://localhost/php-employee-management-v1/index.php");
    })
  })




  $.ajax({
    method: 'POST',
    url: 'http://localhost/php-employee-management-v1/src/library/employeeController.php',
    data: {
      action: "select",

    },
    success: function (data) {

      let employees = JSON.parse(data)

      $("#jsGrid").jsGrid({
        height: "auto",
        width: "100%",
        filtering: false,
        inserting: true,
        editing: false,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete this employee?",
        controller: {
          insertItem: function (newEmployee) {
            console.log(newEmployee)
            return $.ajax({
              type: "POST",
              url: "http://localhost/php-employee-management-v1/src/library/employeeController.php",
              data: {
                action: "addemployee",
                newEmployee: newEmployee
              }
            }).done(function (response) {
              console.log(response)
              //alert("Employee named " + newEmployee.name + " inserted successfully!");
            });
          },
          deleteItem: function (employee) {
            return $.ajax({
              type: "DELETE",
              url: "http://localhost/php-employee-management-v1/src/library/employeeController.php",
              data: {
                "deleteId": employee.id
              },
            }).done(function (response) {
              alert(response);
            });
          }
        },
        rowClick: function (row) {
            window.location.replace(`http://localhost/php-employee-management-v1/src/employee.php?employee_id=${row.item.id}`);
          
        },
        onItemInserting: function(args) {
          if(args.item.id === undefined) {
            $.ajax({
              url: "http://localhost/php-employee-management-v1/src/library/employeeController.php",
              method: "POST",
              data: {action: "getId"},
              success: function(data) {
                console.log(data)
                args.item.id = data
              }
            })
          }
        },

        data: employees,

        fields: [{
            name: "id",
            title: "Id",
            visible: false,
            width: 0
          },
          {
            name: "name",
            title: "Name",
            type: "text",
            width: 100
          },
          {
            name: "email",
            title: "Email",
            type: "text",
            width: 200
          },
          {
            name: "age",
            title: "Age",
            type: "number",
            width: 75
          },
          {
            name: "streetAddress",
            title: "Street No.",
            type: "text",
            width: 100
          },
          {
            name: "city",
            title: "City",
            type: "text",
            width: 120
          },
          {
            name: "state",
            title: "State",
            type: "text",
            width: 70
          },
          {
            name: "postalCode",
            title: "Postal Code",
            type: "text",
            width: 100
          },
          {
            name: "phoneNumber",
            title: "Phone Number",
            type: "text",
            width: 140
          },
          {
            type: "control",
            editButton: false,
            width: 50
          }
        ]
      });




    }
  })





})