import { useState } from "react";
import { addquestion } from "../../action/question";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

interface QuestionAddPropsType {
  refresh: () => void;
}
const QuestionAdd = (props: QuestionAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>(String);
  const [options, setOptions] = useState<[string]>([""]);
  const [answer, setAnswer] = useState<number>(1);

  const submit = () => {
    const newQuestion = {
      question,
      options,
      answer,
    };
    console.log(newQuestion);
    addquestion(newQuestion, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setQuestion("");
    setOptions([""]);
    setAnswer(1);
  };
  return (
    <>
      <Button onClick={() => setIsOpened(true)}>Ajouter Question</Button>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalBody>
          Ajouter Question
          <Form>
            <FormGroup floating>
              <Input
                value={question}
                id="question"
                name="question"
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Label for="question">Question</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={options}
                id="options"
                name="options"
                type="radio"
                onChange={(e) => setOptions([e.target.value])}
              />
              <Label for="options">Options</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={answer}
                id="answer"
                name="answer"
                type="number"
                onChange={(e) => setAnswer(Number(e.target.value))}
              />
              <Label for="question">Question</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={submit}>Confirmer</Button>
          <Button onClick={reset}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuestionAdd;
