const express = require('express');
const app = express();
const Item = require('./config')

app.use(express.json());

// storing the data into the database
app.post('/addData', async (req,res)=>{
    try {
        const data = req.body;
        console.log(data);
        // adding the data
        await Item.add(data);
        res.send({ message: "Successfully added Data" });    
   
    } catch (error) {
        res.send(error);
    }
})

// fetching all data
app.get('/fetchData', async (req,res)=>{
    try {
        const response = await Item.get();
        let dataArray = [];

        // putting all data to the array using forEach
        response.forEach(data=>{
            dataArray.push(data.data());
        })
        res.send(dataArray);
    
    } catch (error) {
        console.log(error);
    }
})


// updating the data 
app.post('/updateData/:id', async (req,res)=>{
    console.log(req.body);
    try {
        const updatedVehicleData = req.body;
        const response = await Item.doc(req.params.id).update(updatedVehicleData)
        res.send({message:"Item updated successfully"});
    
    } catch (error) {
        console.log("after catching the error: "+error);
        res.send({message:"Field does not found"})
    }
})



// deleting the data
app.delete('/delete/:id', async (req,res)=>{
    const vehicleData = Item.doc(req.params.id)
    try {
        // checking whether Item exist or not
        if((await vehicleData.get()).data()){
            await vehicleData.delete();
            res.send({ message: "Deleted successfully" })
        }else{
            res.send({ message: "Item not found" })
        }
    } catch (error) {
        res.send({ message: "Doucument not Found" })
    }
})

app.listen(3000,(req,res)=>{
    console.log("Server started at : 3000");
})
