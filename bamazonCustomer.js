var mysql = require("mysql");
var inquirer = require("inquirer");
var productID;
var userBought;
var originalQuantity;
var updatedQuantity;
var itemPrice;
var calculatedQuantity;

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

		console.log(res[i].item_id + "   " + res[i].product_name + "   " 
			+ res[i].department_name + "   " + res[i].price + "   " + res[i].stock_quantity);
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
			var query = "SELECT stock_quantity FROM products WHERE ?"
			connection.query(query, {item_id: productID}, function(err, res){
				originalQuantity = res[0].stock_quantity;
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
			userBought = number.quantity;
			if (userBought > originalQuantity) {
				console.log("Insufficient quantity!")
				displayItems();
			}
			else{
				var query = "SELECT price FROM products WHERE ?"
				connection.query(query, {item_id: productID}, function(err, res){
				itemPrice = res[0].price;
				console.log("Your total is " + (parseInt(userBought) * parseInt(itemPrice)) + " dollars.");
				})
				calculatedQuantity = (parseInt(originalQuantity) - parseInt(userBought));
				updateItem();
			}
		}
	connection.end();
	});
};


//Updating once the customer buys 
function updateItem() {
	var query = connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: calculatedQuantity				
			},
			{
				item_id: productID
			}
		],
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
