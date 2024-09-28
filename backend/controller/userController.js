const express=require('express');
const userModel = require('../model/userModel');
const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

exports.userSignUp =async (req,res)=>{
    try{
            const newUser = await userModel.create(req.body);
            res.status(200).json({
                message:"signUp success"
            })
    }catch(err){
        res.status(501).send({
            message:err.message
        })
    }
}

exports.userSignIn = async (req,res)=>{
    const{username,password}=req.body;
    try{
    const getUserData = await 
                        userModel.findOne({username}).select("+password");
                        console.log("User data fetched: ", getUserData);
    if(getUserData){
        const result = await bcrypt.compare(password,getUserData.password);

        if(result){
            const token = await getUserData.jwtToken();
            const cookieOptions = {
                maxAge:24*60*60*1000,
                httpOnly:true,
                sameSite: 'Strict'
            }

            res.cookie('token',token,cookieOptions);
            res.status(200).json({
                success:true,
                data:getUserData
            });
        }else{
            res.status(404).send({msg:"password is incorrect try again"});
        }
    }else{
        res.status(404).send({msg:"no Account exist on this userName"})
    }
    }catch(error){
        res.status(501).send({msg:error.message})
    }
}

exports.getUserDetails =async (req,res,next)=>{
    const{id,username}=req.user;

    try{
        const userData = await userModel.findOne({username});
        res.status(200).send({
            msg:"success",
            data:userData
        })
    }catch(err){
        res.status(501).send({
            msg:err.message
        })
    }
}

exports.userLogOut = (req , res)=>{


    try{
        const cookieOptions = {
            expires: new Date(),
            htttpOnly:true
        }
        res.cookie("token",null,cookieOptions);
        res.status(200).json({
                success:true,
                message:"Logged out"

        })

    }catch(err){
            res.status(400).json({
                success:false,
                message:e.message
            })
    }
}