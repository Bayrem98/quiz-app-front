import axios from "axios";
import Question from "../@types/question";

// Données de la question à envoyer
export const newQuestionData = {
  question: "Votre question ici",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  answer: 1,
};

export function getQuestions(
  query: { question?: string; answer?: number } | null,
  callback: (data: Question[]) => void
) {
  axios
    .get("http://quiz-app-backend-deploy.adaptable.app/question")
    .then(({ data }) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des questions :", error);
    });
}

export function getQuestion(id: string, callback: (data: Question) => void) {
  axios
    .get("http://quiz-app-backend-deploy.adaptable.app/question/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((e) => {
      console.error(e);
    });
}

export function addquestion(question: Question, callback: () => void) {
  axios
    .post("http://quiz-app-backend-deploy.adaptable.app/question", question)
    .then((response) => {
      callback();
      console.log("Nouvelle question ajoutée:", response.data);
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de la question :", error);
    });
}

export function deleteQuestions(question: Question, callback: () => void) {
  axios
    .delete(
      "http://quiz-app-backend-deploy.adaptable.app/question/book/" +
        question._id
    )
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}
