var config = {
	db: {
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		database: 'Global',
		port: 27017,
		debug: true,
	 	//socket: '/var/run/mysqld/mysqld.sock', // For linux...
		socket: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock' //For mac...
 	},

	site: {
		url: 'http://localhost:3000',
		title: 'Titulo MX',
		language: 'en',
		html: {
			engine: 'jade',
			minify: true
	 	},
 	},
  application: {
    controllers: {
      default: 'index',
      current: ''
    },
    //es 	Español 
    //en 	Ingles
    //fr 	francés
    //pt 	portugués
    //ru 	ruso
    //de 	alemán
    //zh    chino 	
    //http://utils.mucattu.com/iso_639-1.html
    langs: ['en', 'es', 'fr','pt','ru','de','zh'],
    languages: 'en|es|fr|pt|ru|de|zh'
  },
};
 
module.exports = config;