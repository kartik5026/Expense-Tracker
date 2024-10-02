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
    origin:'https://expense-tracker-app-ten-ruddy.vercel.app',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", async (req, res) => {

    const token = req.cookies.mytoken;
    if (token) {

        try {

            console.log("Token Found")
            const decode = jwt.verify(token, {key});
            console.log(decode);
            const data = await CashModel.find();
            res.send({data,msg:'granted'});
        } catch (error) {
            res.send('Invalid Token');
        }
    }
    else {
        res.send({msg:"denied"});
    }

})

app.get("/search/:val", async (req, res) => {
    const name = req.params.val;
    console.log(name);
    const data = await CashModel.find({ remarks: name });
    console.log(data);
    if (data.length == 0) {
        res.json({ 'msg': 'Not Found' });
    }
    else {
        res.json(data);
    }
})
app.post("/cash", async (req, res) => {
    console.log(req.body);
    const { inputDate, inputAmount, inputName, inputRemarks, inputCategory, inputMode, cashType } = req.body;
    const data = await CashModel.create({ date: inputDate, amount: inputAmount, name: inputName, remarks: inputRemarks, category: inputCategory, mode: inputMode, cashtype: cashType });
    res.send("Success");
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = await userModel.create({ name: username, pass: hashedPassword });
    res.send("Signed Up!");
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ name: username });
    if (user != null) {
        const hashedPassword = user.pass;
        const isPassMatched = bcrypt.compareSync(password, hashedPassword);
        if (isPassMatched) {

            //create token
            //give it to the client
            //verify and authorze resources
            const token = jwt.sign({ username }, {key} , { expiresIn: '1h' });
          res.cookie('mytoken', token, { maxAge: 24*60*60*1000 , secure:true, sameSite:'None'});
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

app.post("/logout",(req,res)=>{
    res.clearCookie('mytoken');
    res.send("Logged Out");
})

app.delete("/delete",async (req,res)=>{
    const {userRemark} = req.body;
    console.log(userRemark);
    const data = await CashModel.findOneAndDelete({remarks:userRemark});
    res.send(data);
})

app.listen(3000, () => {
    console.log("Server running on 3000");
})
