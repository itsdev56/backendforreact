const express=require('express');
const router=express.Router();
const uuidv4 = require('uuid/v4');
var fs=require('fs');

router.get('/',function(req,res)
{
    fs.readFile("storage.json","utf8",function(error,data)
    {
        tasks= JSON.parse(data);
        res.json(tasks);
    })
})
function Task(id,taskName,isdone)
{
   this.id=uuidv4();
   this.taskName=taskName;
   this.isdone=isdone;
}

router.put("/update/:id",(req,res) => {
    //id = Number(req.params.id);
    id=req.params.id;
    data = fs.readFileSync("storage.json","utf8");
    //data = data.toString();
    tasks = JSON.parse(data);
    ind=tasks.findIndex(x=>x.id===id);
    if(ind >= 0){
        //res.json(tasks[id]);
        //task = new Task(req.body.taskName,true);
        //tasks.push(task);
        tasks[ind].isdone=!tasks[ind].isdone;
        /*if(req.body.isdone==="true")
        {
            tasks[ind].isdone=true;
        }
        else
            tasks[ind].isdone=false;*/
        //console.log(tasks[ind]);
    }

    else{
        res.json({
            error: "Task with id :" + ind.toString() + " doesn't exist"
        })
    }
    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
        if(err) {
            res.json({
                error : err
            })
        } 
        
        else {
            res.json({
                response : "created successfully"
            });
        }
    })
});
router.post("/add/task",(req,res)=> {
    data = fs.readFileSync("storage.json","utf8");
    //data = data.toString();
    tasks = JSON.parse(data);
    task = new Task(-1,req.body.taskName,false);
    tasks.push(task);


    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
        if(err) {
            res.json({
                error : err
            })
        } 
        
        else {
            res.json({
                response : "created successfully",
                task_id:task.id
            });
        }
    })

}

);

router.get("/view/:id",(req,res) => {
    id = Number(req.params.id);
    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();

    tasks = JSON.parse(data);
    if(id >= 0 && id < tasks.length){
        res.json(tasks[id]);
    }
    else{
        res.json({
            error: "Task with id :" + id.toString() + " doesn't exist"
        })
    }
    
});

router.delete("/delete/task/:id",(req,res) =>{
    //id = Number(req.params.id);
    id=req.params.id;
    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();
    tasks = JSON.parse(data);
    ind=tasks.findIndex(x=>x.id===id);
    if(ind >= 0){
        tasks.splice(ind,1);

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
            if(err) {
                res.json({
                    error : err
                })
            } 
            
            else {
                res.json({
                    response : "Deleted succussfully",
                    task_id:id
                });
            }
        })
    }

    else{
        res.json({
            error : "task id: " + id + " not found" 
        })
    }



})
module.exports=router;