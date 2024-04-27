import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

function QuestionMultipleAnswers() {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const correctAnswers = [0, 1, 3]; 
  const [checkClicked, setCheckClicked] = useState(false);

  const handleAnswerSelection = (answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];

    if (newSelectedAnswers.includes(answerIndex)) {
      const index = newSelectedAnswers.indexOf(answerIndex);
      newSelectedAnswers.splice(index, 1);
    } else {
      newSelectedAnswers.push(answerIndex);
    }
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleCheckAnswers = () => {
    if (!checkClicked) {
      return null;
    }
  
    if (selectedAnswers.length === 0) {
      return 'Eksiklerin var';
    }
  
    const incorrectAnswers = selectedAnswers.filter(
      (answer) => !correctAnswers.includes(answer)
    );
  
    if (selectedAnswers.length === correctAnswers.length) {
      if (incorrectAnswers.length === 0) {
        return 'Bravo';
      } else {
        return 'Hatalı';
      }
    } else {
      return 'Eksiklerin var';
    }
  };

  return (
    <QuestionContainer>
      <Question>Aşağıdakilerden hangileri doğru önermedir?</Question>
      <Explanation>Doğru olan şıkları işaretleyin.</Explanation>
      <MultipleAnswer>
        <OptionBar>
          <Option
            onClick={() => handleAnswerSelection(0)}
            selected={selectedAnswers.includes(0)}
          >
            A
          </Option>
          <Text>Seçenek A</Text>
        </OptionBar>
        <OptionBar>
          <Option
            onClick={() => handleAnswerSelection(1)}
            selected={selectedAnswers.includes(1)}
          >
            B
          </Option>
          <Text>Seçenek B</Text>
        </OptionBar>
        <OptionBar>
          <Option
            onClick={() => handleAnswerSelection(2)}
            selected={selectedAnswers.includes(2)}
          >
            C
          </Option>
          <Text>Seçenek C</Text>
        </OptionBar>
        <OptionBar>
          <Option
            onClick={() => handleAnswerSelection(3)}
            selected={selectedAnswers.includes(3)}
          >
            D
          </Option>
          <Text>Seçenek D</Text>
        </OptionBar>
        <Check onClick={() => {
            setCheckClicked(true);
            }}>
            Kontrol Et
          </Check>
          {handleCheckAnswers() && checkClicked && (
            <Result correct={handleCheckAnswers() === 'Bravo'}>
              {handleCheckAnswers()}
            </Result>
          )}
      </MultipleAnswer>
    </QuestionContainer>
  );
}

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  min-height: min-content;
    padding-bottom: 100px; 
`;

const Question = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 2rem;
`;

const Explanation = styled.div`
  font-style: italic;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const MultipleAnswer = styled.div``;

const OptionBar = styled.div`
  display: flex;
`;

const Option = styled.div`
  font-size: 1rem;
  margin: 0px 20px 5px;
  cursor: pointer;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? '#674188' : '#eee')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  width: 30px;
  text-align: center;
  :hover {
    border: 2px solid #674188;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const Check = styled.button`
  border: 3px solid #674188;
  border-radius: 4px;
  background-color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin: 15px 32px;
  font-size: 1.2rem;
  :hover {
    background-color: #674188;
    color: white;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25%, 75% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
`;

const Result = styled.div`
  border: 3px solid ${({ correct }) => (correct ? '#4CAF50' : '#f44336')};
  text-align: center;
  border-radius: 4px;
  background-color: white;
  padding: 5px 25px;
  cursor: pointer;
  font-weight: bold;
  margin: 15px 32px;
  width: 80px;
  animation: ${({ correct }) => (correct ? bounce : shake)} 0.5s;

  :hover {
    animation: none;
  }
`;

export default QuestionMultipleAnswers;
