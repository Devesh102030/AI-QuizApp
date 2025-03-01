import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import  zod  from "zod";
import User from "../db.js"; // Add `.js` extension to imports
import jwt from "jsonwebtoken";
import JWT_SECRET  from "../config.js";
import middleware from "../middleware.js";

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8)
});

router.post("/signup",async (req,res) => {
    console.log(req.body);
    
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(404).json({
            message: "Invalid Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(404).json({
            message: "username already exits"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

const siginBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin",async (req,res)=>{
    const {success} = siginBody.safeParse(req.body);
    
    if(!success){
        return res.status(404).json({
            message: "User doesn't exist"
        })
    }
    
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    
    if(!user){
        return res.status(404).json({
            message: "User doesn't exist"
        })
    }

    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    return res.status(200).json({
        token
    });
})


function getPrompt(topic,numques,difficulty){
    const prompt = `Create a quiz with ${numques} questions on the topic of ${topic}, each question having 4 options, with ${difficulty} difficulty. Return the response in the following format:

    {
      "title": "Quiz Title",
      "instructions": "Quiz Instructions",
      "questions": [
        {
          "questionNumber": 1,
          "question": "The question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Correct Option"
        },
        ...
      ]
    }`;

    return prompt;
}

router.post("/genratequiz", middleware,async (req, res) => {
    
    
    const genAI = new GoogleGenerativeAI("AIzaSyAU5dtpb83lzs8qeg5PKlarEzJFlqamMY0");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const { topic, numques, difficulty } = req.body;

        if (!topic || !numques || !difficulty) {
            return res.status(400).json({ error: "Missing required fields: topic, numques, or difficulty." });
        }

        const prompt = getPrompt(topic,numques,difficulty);

        const result = await model.generateContent(prompt);
        
        const rawquiz = result.response.text();

        const cleanquiz = rawquiz.replace("```json\n", "").replace("\n```", "");
        
        const parsedquiz = JSON.parse(cleanquiz);

        res.json({ quiz: parsedquiz }); 
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
});

export default router;