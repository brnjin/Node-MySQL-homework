var mysql = require("mysql");
var inquirer = require("inquirer");
var productID;
var productQuantity;

var connection = mysql.createConnection({
	host: "localhost",
	root: 3306,
	user: "root",
	password: "a1423567",
	database: "bamazon"
});
connection.connect(function(err) {
	if(err) throw err;
	console.log("Welcome to Bamazon!");
	displayItems();
});

function displayItems(){
	connection.query("SELECT * FROM products", function(err, res) {
		for (var i = 0; i < res.length; i++) {

		console.log(res[i].item_id + "   " + res[i].product_name);

		}
		userQuestion1();
	});
};

function userQuestion1() {
	inquirer.prompt([
		{
			type:"input",
			name:"item_id",
			message: "What is the ID of the item you would like to purchase? [Quit with q]"
		}
	]).then(function(number) {
		if (number.item_id === "q") {
			console.log("Thank you for using Bamazon!")
			connection.end();
		}
		else{
			productID = number.item_id;
			console.log(productID)
			var query = "SELECT stock_quantity FROM products WHERE ?"
			connection.query(query, {item_id: productID}, function(err, res){
				console.log(res);
				userQuestion2();
			})
		};
	});
};

function userQuestion2() {
	inquirer.prompt([
		{
			type:"input",
			name:"quantity",
			message:"How many would you like to purchase? [Quit with q]"
		}
	]).then(function(number) {
		if (number.quantity === "q") {
			console.log("Thank you for using Bamazon!")
			connection.end();
		}
		else{
			productQuantity = number.quantity;
		}
		/*parseInt(number.item_id)*/
		console.log(number.quantity)
		/*	updateItem();*/
	});
};

/*var calculatedQuantity = databaseQuantity-number.quantity*/

function updateItem() {
	var query = connection.query(
		"UPDATE products SET ? WHERE ?", [{
			item_id: productID
		},{
/*			stock_quantity: calculatedQuantity*/
		}],
		function(err, res) {
			if(err) throw err;
		});
};
/*connection.query("SHOW COLUMNS FROM products", function(err, res)*/

//To update the stock quantity: get the number from the table and substract by the 
//how much the user wants to buy. Then get the sum to update the table. 
	//Get the item price and multiply by who many they purchased. 
		//Then show the user how much the total is once they buy it



//******* extras I want to add
//Validation to make sure the user inputs are acceptable inputs (no letters for id or quantity execpt "q")
//Use the item_id to reference on what item is going to be purchased 
	//If product is not available, then say "Insufficient quantity!"




//When asking "How many would you like to purchase" add in item name
