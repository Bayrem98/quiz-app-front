import axios from "axios";
import { useState, useEffect } from "react";

interface Question {
  _id?: string;
  question: string;
  options: string[];
  answer: number;
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  ); // Utilisez cet état pour stocker les réponses de l'utilisateur

  useEffect(() => {
    axios
      .get("http://quiz-app-backend-deploy.adaptable.app/question")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des questions :", error);
      });
  }, []);

  const saveUserResponses = () => {
    axios
      .post("http://quiz-app-backend-deploy.adaptable.app/user-responses", userAnswers)
      .then((response) => {
        console.log("Réponses de l'utilisateur enregistrées avec succès !");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement des réponses de l'utilisateur :",
          error
        );
      });
  };

  const handleAnswerSelection = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  return (
    <div>
      <h1>Liste des questions</h1>
      <div
        className="card"
        style={{
          width: "48rem",
          backgroundColor: "lightgray",
          marginLeft: 40,
          padding: 20,
        }}
      >
        {questions.map((question, questionIndex) => (
          <div key={question._id}>
            <p>
              <strong>Question: {question.question}:</strong>
            </p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li style={{ listStyle: "none" }}>
                  <input
                    key={optionIndex}
                    onClick={() =>
                      handleAnswerSelection(questionIndex, optionIndex)
                    }
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    style={{ cursor: "pointer" }}
                  ></input>
                  {option}
                  {userAnswers[questionIndex] === optionIndex && (
                    <span style={{ color: "blue" }}> (Votre réponse)</span>
                  )}
                </li>
              ))}
            </ul>
            {/* Affiche la réponse correcte après que l'utilisateur ait répondu */}
            {userAnswers[questionIndex] > -1 && (
              <p>Réponse correcte : {question.options[question.answer]}</p>
            )}
          </div>
        ))}
        <button
          onClick={saveUserResponses}
          style={{ float: "right", cursor: "pointer" }}
        >
          Enregistrer vos réponses
        </button>
        <br />
      </div>
    </div>
  );
};

export default QuizPage;
