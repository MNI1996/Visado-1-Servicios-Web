const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic(neo4j, root));
 
class DaoUser{
    constructor(){
        this.driver = driver;
    }

    guardarUsuario(name, eMail){
        const session = this.driver.session();
        const query = 'create(u:User{eMail:$email, name:$user}) return u';
        session.run(query, {email:eMail, user:name});
        session.close();
    }
}
module.exports = DaoUser;