const {Customer, validate} = require('../models/customer');
const fs = require('fs')
const getAllCustomers = async (req, res, next) => {
    const customers = getCustomerData();
    res.render('customerlist', {
        customers: customers
    });
}

const getAddCustomerView = (req, res, next) => {
    res.render('addCustomer');
}

const addCustomer = async (req, res, next) => {
    const existUsers = getCustomerData()
    const {error} = validate(req.body);
    const data = req.body;
    let customer = await new Customer({
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        cnic: data.cnic,
        address: data.address
    });

    //append the user data
    existUsers.push(customer)

    saveCustomerData(existUsers)
    res.redirect('/');
}

const getUpdateCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existUsers = getCustomerData()
        findUser =existUsers.find(e=>e._id === id)
        res.render('updateCustomer', {
            customer: findUser
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCustomer = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    const existUsers = getCustomerData()

    //check if the username exist or not       
    const findExist = existUsers.find(customer => customer._id === id)
    
   
        findExist.firstname= data.firstname,
        findExist.lastname= data.lastname,
        findExist.phonenumber= data.phonenumber,
        findExist.cnic= data.cnic,
        findExist.address= data.address
    
    console.log(existUsers);
    saveCustomerData(existUsers)
    

    res.redirect('/');
}

const getDeleteCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existUsers = getCustomerData()
        findUser =existUsers.find(e=>e._id === id)
        res.render('deleteCustomer', {
            customer: findUser
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existUsers = getCustomerData()
        findUser =existUsers.filter(e=>e._id !== id)
      saveCustomerData(findUser)
        res.redirect('/');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}



 const saveCustomerData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('customer.json', stringifyData)
}

//get the user data from json file
 const getCustomerData = () => {
    const jsonData = fs.readFileSync('customer.json')
    return JSON.parse(jsonData)
}


module.exports = {
    getAllCustomers,
    getAddCustomerView,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer
}