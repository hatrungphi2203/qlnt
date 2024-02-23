const { request } = require("express");
const User=require("../models/User");

const userController={
    //get all user
    getAllUser: async(req,res)=>{
        try {
            
            User.getList(function(data){
                res.status(200).json(data);
            });

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // deleteUser: async(req,res)=>{
    //     try {
    //         var id=req.params.id;
    //         User.delete(id,function(data){
    //             res.status(200).json(data);
    //         })
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
}

module.exports=userController;