const mongoose = require('mongoose')
const assert = require('assert')

mongoose.Promise = global.Promise //should allow the use fo global promises without error...

mongoose.connect('mongodb://localhost:27017/Contact', {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

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
        db.close();
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
        db.close();
    })
}

// @function [updateContact]
// @returns {String} status
const updateContact = (_id, contact) => {
    Contact.update({_id}, contact)
    .exec((err, status) => {
        assert.equal(null, err);
        console.info('Contact Updated');
        db.close();
    })
}

// @function [deleteContact]
// @returns {String} status
const deleteContact = (_id) => {
    Contact.deleteOne({_id})
    .exec((err, status) => {
        assert.equal(null, err);
        console.info('Contact Deleted');
        db.close();
    })
}

// @function [getContactList]
//@returns [contactList] contacts
const getContactList = () => {
    Contact.find()
    .exec((err, contacts) => {
        assert.equal(null, err);
        console.info(contacts);
        console.info(`${contacts.length} matches`);
        db.close();
    })
}

// export all methods
module.exports = {addContact, getContact, updateContact, deleteContact, getContactList}
