const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

const url = `mongodb+srv://babaj301:${password}@cluster0.hyfyhrj.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log(`Added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
