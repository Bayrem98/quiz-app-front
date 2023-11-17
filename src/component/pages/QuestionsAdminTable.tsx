import { useEffect, useState } from "react";
import Question from "../../@types/question";
import { getQuestions } from "../../action/question";
import QuestionAdd from "./QuestionAdd";
import { Table } from "reactstrap";

const QuestionsAdminTable = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestions(null, setQuestions);
  }, []);
  return (
    <>
      <p>Tableau des questions de l'admin</p>
      <QuestionAdd refresh={() => getQuestions(null, setQuestions)} />
      <div style={{ margin: 50 }}>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(questions) && questions.length ? (
              questions.map((question) => (
                <tr key={question._id}>
                  <td>{question.question}</td>
                  <td>{question.options}</td>
                  <td>{question.answer}</td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-5"
                  style={{ color: "#0e0e0ee7" }}
                >
                  pas de données...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default QuestionsAdminTable;
