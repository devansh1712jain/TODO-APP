const express = require("express");
var cors = require('cors')

const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb+srv://admin:admin@cluster0.ab36zfq.mongodb.net/todoapp");

app.use(express.json());
app.use(cors());

const User = mongoose.model('Task', {
  taskname: String,
})
app.get("/", async function(req,res){
  const data = await User.find({});
  if(data){
    res.send(data)
    return ;
  }
  res.status(400).json({
    "msg": "no work is pending"
  })
})
app.post("/addnewwork",async function(req,res){
  const taskname = req.body.taskname;
  const existingtask = await User.findOne({taskname : taskname});
  if(existingtask){
    res.status(400).send({
      "msg" : "task already present in your todo"
    })
    return;
  }
  const task = new User({
    taskname : taskname
  })
  task.save();
  
  res.json({"msg": "Task Added Successfully"})

})

app.delete("/deletenetwork", async function(req,res){
  const task = req.body.taskname;
  const result = await User.deleteOne({ taskname: task });

  if (result.deletedCount === 1) {
    // Document was deleted successfully
    res.json({ "msg": "Task deleted successfully" });
  } else {
    // No document matched the delete condition
    res.status(404).json({ "msg": "Task not found" });
  }
})
app.listen(5000);