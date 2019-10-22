const mongoose = require('mongoose')
const assert = require('assert')

mongoose.Promise = global.Promise //should allow the use fo global promises without error...

const db = mongoose.connect('mongodb://localhost:27017/Contact', {useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to Database"))
.catch(err => console.error("An error has occurred", err));

function toLower(v) {
    return v.toLowerCase()
}

// contact schema
const contactSchema = mongoose.Schema({
    firstname: {type:String, set:toLower},
    lastname: {type:String, set:toLower},
    phone: {type:String, set:toLower},
    email: {type:String, set:toLower}
});

// interface model for db
const Contact = mongoose.model('Contact', contactSchema)

//  @function [addContact]
//  @returns {String} status

const addContact = (contact) => {
    Contact.create(contact, (err) => {
        assert.equal(null, err);
        console.info('New Contact Added');
        db.disconnect();
    })
}

//  @function [getContact]
//  @returns {JSON} contacts

const getContact = (name) => {
    // define search criteria. Search is case-insensitive and inexact
    const search = new RegExp(name, 'i')
    Contact.find({$or: [{firstname: search}, {lastname:search}]})
    .exec((err, contact) => {
        assert.equal(null, err);
        console.info(contact);
        console.info(`${contact.length} matches`);
        db.disconnect();
    })
}

// export all methods
module.exports = {addContact, getContact}
