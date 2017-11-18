var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	root: 3306,
	user: "root",
	password: "a1423567",
	database: "bamazon"
});
connection.connect(function(err) {
	if(err) throw err;
	console.log("Manager's only!");
	menuOptions();
});

function menuOptions() {
  inquirer.prompt({
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory"/*,
        "Add New Product"*/
      ]
    })
    .then(function(answer) {
      switch (answer.options) {
        case "View Products for Sale":
          displayItems();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          restockItem();
          break;

/*        case "Add New Product":
          songSearch();
          break;*/
      }
    });
}

function displayItems(){
	connection.query("SELECT * FROM products", function(err, res) {
		for (var i = 0; i < res.length; i++) {

		console.log(res[i].item_id + "   " + res[i].product_name + "   " 
			+ res[i].department_name + "   " + res[i].price + "   " + res[i].stock_quantity);
		}
	menuOptions();
	});
};

function lowInventory(){
	connection.query("SELECT * FROM products", function(err, res) {
		for (var i = 0; i < res.length; i++) {
			if(res[i].stock_quantity <= 5){
				console.log(res[i].product_name);
			}
		}
	menuOptions();
	});
};

// function addNewItem(){
// 	var query = connection.query(
// 	    "INSERT INTO products SET ?", {
// 	      product_name: "pen",
// 	      department_name: "office_supplies",
// 	      price: 4,
// 	      stock: 300
// 	    }, 
// 	function(err,res) {
// 	      if (err) throw err;
//     })
//     menuOptions()}
// }

//Updating once the customer buys 
function restockItem() {
	inquirer.prompt([{
      name: "itemName",
      type: "input",
      message: "What item do you want to restock?"
    },
    {
      name: "amount",
      type: "input",
      message: "How many would you like to add into inventory?"
    }])
    .then(function(answer) {
		var query = connection.query(
			"UPDATE products SET ? WHERE ?", 
			[
				{
					stock_quantity: parseInt(answer.amount)				
				},
				{
					product_name: answer.itemName
				}
			],
			function(err, res) {
				if(err) throw err;
			});
		displayItems();
	})
};


