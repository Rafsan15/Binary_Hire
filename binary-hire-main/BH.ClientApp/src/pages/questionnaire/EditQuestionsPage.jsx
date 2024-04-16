import React, { useState } from "react";
import { TextField, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EditQuestionsPage = ({ questions, setQuestions }) => {
  // Dummy questions data
  const initialQuestions = [
    { id: 1, question: "What is React?", keywords: ["React", "JavaScript"] },
    { id: 2, question: "What is JSX?", keywords: ["JSX", "HTML"] },
    {
      id: 3,
      question: "What is state in React?",
      keywords: ["State", "React"],
    },
    {
      id: 4,
      question: "What are hooks in React?",
      keywords: ["Hooks", "React"],
    },
    {
      id: 5,
      question: "What is the purpose of useEffect?",
      keywords: ["useEffect", "React"],
    },
    {
      id: 6,
      question: "What is the difference between useState and useReducer?",
      keywords: ["useState", "useReducer", "React"],
    },
    {
      id: 7,
      question: "What is component lifecycle in React?",
      keywords: ["Lifecycle", "React"],
    },
    {
      id: 8,
      question: "How do you create a controlled component in React?",
      keywords: ["Controlled Component", "React"],
    },
    {
      id: 9,
      question: "What is the purpose of key prop in React?",
      keywords: ["Key Prop", "React"],
    },
    {
      id: 10,
      question: "What is the Context API in React?",
      keywords: ["Context API", "React"],
    },
  ];

  const [editedQuestions, setEditedQuestions] = useState(initialQuestions);

  const handleQuestionChange = (id, newValue) => {
    setEditedQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, question: newValue } : question
      )
    );
  };

  const handleDeleteQuestion = (id) => {
    setEditedQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleSaveChanges = () => {
    setQuestions([...editedQuestions]);
    alert("Changes saved!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" style={{ color: "#3f51b5" }}>
        Questions Management
      </Typography>
      {editedQuestions.map((question) => (
        <div
          key={question.id}
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            label={`Question ${question.id}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            fullWidth
            margin="normal"
            style={{ marginBottom: "10px" }}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteQuestion(question.id)}
            style={{ marginLeft: "10px", color: "#f44336" }} // Add color property here
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button
        variant="contained"
        onClick={handleSaveChanges}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          float: "right",
          marginTop: "20px",
        }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EditQuestionsPage;
