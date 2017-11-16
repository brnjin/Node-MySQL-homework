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
	console.log("Welcome to Bamazon!");
	displayItems();
})

function displayItems(){
	connection.query("SELECT * FROM products", function(err, res) {
		for (var i = 0; i < res.length; i++) {

		console.log(res[i].item_id + "   " + res[i].product_name);

		}
		userQuestions();
		connection.end();
	})
}
function userQuestions() {
	inquirer.prompt([
		{
			type:"input",
			name:"product_id",
			message: "What is the ID of the item you would like to purchase? [Quit with Q]"
		},
		{
			type:"input",
			name:"quantity",
			message:"How many would you like to purchase? [Quit with Q]"
		}
		])
}
/*connection.query("SHOW COLUMNS FROM products", function(err, res)*/