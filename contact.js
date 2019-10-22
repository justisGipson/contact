#!/usr/bin/env node

const program = require('commander')
const {prompt} = require('inquirer')
const {addContact, getContact} = require('./logic')

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter firstname...'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter lastname...'
    },
    {
        type: 'input',
        name: 'phone number',
        message: 'Enter phone number...'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address...'
    }
];

program
    .version('0.0.1')
    .description('Contact Management System');

program
    .command('addContact')
    .alias('a')
    .description('add contact')
    .action(() => {
        prompt(questions).then(answers => 
            addContact(answers))
    });

program
    .command('getContact <name>')
    .alias('r')
    .description('get contact')
    .action(name => getContact(name))

program.parse(process.argv)
