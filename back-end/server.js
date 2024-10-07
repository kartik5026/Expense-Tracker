const express = require('express');
const mongoose = require('mongoose');
const CashModel = require('./Models/Cash');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

require('dotenv').config();
const uri = process.env.uri;
const key = process.env.key;
const app = express();
const cors = require('cors');
const userModel = require('./Models/Users');

mongoose.connect(uri).then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.log(err);
})

app.use(cors({
    origin: ['http://localhost:5173', 'https://expense-tracker-beige-chi.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", async (req, res) => {

    const token = req.cookies.mytoken;
    if (token) {

        try {

            console.log("Token Found")
            const decode = await jwt.verify(token, key);

            const userId = decode.id;
            const userName = decode.username;
            const user = await userModel.findOne({ _id: userId });
            const data = user.userResources;
            res.send({ data, msg: 'granted' });
        } catch (error) {
            res.send('Invalid Token');
        }
    }
    else {
        res.send({ msg: "denied" });
    }

})

app.get("/search/:val", async (req, res) => {

    const token = req.cookies.mytoken;
    if (token) {

        try {

            console.log("Token Found")
            const decode = await jwt.verify(token, key);

            const userId = decode.id;
            const userName = decode.username;
            const user = await userModel.findOne({ _id: userId });
            const name = req.params.val;
            console.log(name);
            const data = await user.userResources.filter((data) => {
                return data.remarks === name;
            });
            console.log(data);
            if (data.length == 0) {
                res.json({ 'msg': 'Not Found' });
            }
            else {
                res.json(data);
            }
        } catch (error) {
            res.send(error);
        }
    }
    else {
        res.send({ msg: "denied" });
    }


})
app.post("/cash", async (req, res) => {

    const token = req.cookies.mytoken;
    if (token) {

        try {

            console.log("Token Found")
            const decode = await jwt.verify(token, key);

            const userId = decode.id;
            const userName = decode.username;
            const user = await userModel.findOne({ _id: userId });
            console.log(req.body);
            const { inputDate, inputAmount, inputName, inputRemarks, inputCategory, inputMode, cashType } = req.body;

            await user.userResources.push({ date: inputDate, amount: inputAmount, name: inputName, remarks: inputRemarks, category: inputCategory, mode: inputMode, cashtype: cashType });
            await user.save();
            res.send("Success");
        } catch (error) {
            res.send('Invalid Token');
        }
    }
    else {
        res.send({ msg: "denied" });
    }

})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({ name: username });
    if (user == null) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const data = await userModel.create({ name: username, pass: hashedPassword });
        res.send("Signed Up!");
    }
    else {
        res.send("User Already Registered Please Login");
    }

})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ name: username });

    if (user != null) {
        const id = user._id;
        console.log(id);
        const hashedPassword = user.pass;
        const isPassMatched = bcrypt.compareSync(password, hashedPassword);
        if (isPassMatched) {

            //create token
            //give it to the client
            //verify and authorze resources
            const token = jwt.sign({ id, username }, key, { expiresIn: '1h' });
            res.cookie('mytoken', token, { maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: 'None' });
            res.send("Logged In");

        }
        else {
            res.send("Invalid Password");
        }
    }
    else {
        res.send("User Not Found Please Signup First");
    }
})

app.post("/logout", (req, res) => {
    res.clearCookie('mytoken');
    res.send("Logged Out");
})

app.delete("/delete", async (req, res) => {

    
    const token = req.cookies.mytoken;
    
    if (token) {

        try {

            console.log("Inside Delete")
            const decode = await jwt.verify(token, key);

            const userId = decode.id;
            const userName = decode.username;
            const user = await userModel.findOne({ _id: userId });
            const dataArr = user.userResources;
            
            const { userRemark } = req.body;
            console.log(userRemark);
            const index = await dataArr.findIndex((user)=>{
                return user.remarks === userRemark;
            })
            console.log(index);
            dataArr.splice(index,1);
            await user.save();
            res.send({ msg: 'granted' });
        } catch (error) {
            res.send(error);
        }
    }
    else {
        console.log("Denied");
        res.send({ msg: "denied" });
    }


})

app.listen(3000, () => {
    console.log("Server running on 3000");
})
