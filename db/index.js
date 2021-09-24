const fs = require('fs');
const util = require('util');
const uuid = require('uuid/v1');

const readAsync = util.promisify(fs.readFile);

const writeAsync = util.promisify(fs.writeFile);

class DB {
    read(){
        return readAsync('db/db.json', 'utf8')
    }
    write(data){
        return writeAsync('db/db.json', JSON.stringify(data))
    }
    readNotes(){
        return this.read().then((data) =>{
            let notes;

            try{
                notes = [].concat(JSON.parse(data))
            }catch(err){
                notes = []
            }
            return notes
        });
    }

    //create add note functionality and  call it on  the front. This is where you will need to use uuid
    addNote(note){
        const {title, text} = note;
        if(!title || !text){
            throw new Error("missing title or text")
        }

        const newNote = {
            title, text, id: uuid()
        }

        return this.readNotes().then(data => [...data, newNote]).then((newArray)=> this.write(newArray)).then(()=> newNote)
    }

    //delete note needs the uuid to be able to delete specific note. 
}

module.exports = new DB()