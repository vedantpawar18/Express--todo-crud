const express= require("express");
const fs= require("fs");
const app= express();
app.use(express.json());


app.post("/", (req,res)=>{
    // res.send("welcome")
    const payload=(req.body)
    const data= fs.readFileSync("./db.json", {encoding:"utf-8"})
    
    const parseData=JSON.parse(data);
    console.log(parseData)
    // const todos= parseData.todos
    const newTodos=[...parseData, payload]

    // parseData= newTodos;
    const latest_data= JSON.stringify(newTodos)
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send("todos added") 

})

app.get("/", (req,res)=>{
    const data=fs.readFileSync("./db.json", {encoding:"utf-8"})
    const parsedData= JSON.parse(data)
    console.log(parsedData)
    // const todos= parsedData.todos
    res.send(parsedData)
})

app.put("/", (req,res)=>{
    const data=fs.readFileSync("./db.json", {encoding:"utf-8"})
    const parsedData = JSON.parse(data)
    const todos= parsedData.todos
    const todo = todos.find(item => item.id === req.body.id);
    const index = todos.indexOf(todo);
    todos[index] = req.body;
    const latest_data= JSON.stringify(todos)
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send("todos updated")
    // console.log(index)
})

app.delete("/",(req,res)=>{
    const data=fs.readFileSync("./db.json", {encoding:"utf-8"})
    const parsedData = JSON.parse(data)
    const todo = parsedData.find(item => item.id === req.body.id);
    const index = parsedData.indexOf(todo);
    parsedData.splice(index, 1);
    const latest_data= JSON.stringify(parsedData)
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send("todos updated")
    // console.log(index)
})

app.listen(7000, ()=>{
    console.log("listening on port 7000")
})