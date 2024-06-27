const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { encrypt, decrypt } = require('../utils/crypto');

dotenv.config();

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.user;
    } catch (err) {
        return null;
    }
};

const createContact = async (req, res) => {
    const { token, name, phone, email, linkedin, twitter } = req.body;

    const user = validateToken(token);

    if (!user) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

    try {
        const newContact = new Contact({
            name: encrypt(name),
            phone: encrypt(phone.toString()), 
            email: email ? encrypt(email) : null,
            linkedin: linkedin ? encrypt(linkedin) : null,
            twitter: twitter ? encrypt(twitter) : null,
        });

        const contact = await newContact.save();
        // console.log('Contact Created:', contact);
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const editContact = async (req, res) => {
    const { token, name, email, linkedin, twitter } = req.body;

    const user = validateToken(token);

    if (!user) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

    try {
        const contacts = await Contact.find();
        const contact = contacts.find(contact => decrypt(contact.name) === name);

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        console.log('Contact Found:', contact);

        if (email) contact.email = encrypt(email);
        if (linkedin) contact.linkedin = encrypt(linkedin);
        if (twitter) contact.twitter = encrypt(twitter);

        await contact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const searchContact = async (req, res) => {
    const { token, search_token } = req.body;

    const user = validateToken(token);

    if (!user) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

    try {
        const contacts = await Contact.find();
        const filteredContacts = contacts.filter(contact => decrypt(contact.name).includes(search_token));
        console.log(filteredContacts)
        res.json(filteredContacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createContact,
    editContact,
    searchContact,
};
