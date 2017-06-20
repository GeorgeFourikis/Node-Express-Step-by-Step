var myDB = {
	users: [],
	push: function(object){
		this.users.push(object);
	},
	destroy: function(index){
		this.users.splice(index, 1);
	}
};

module.exports = myDB;
