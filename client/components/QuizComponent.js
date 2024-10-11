const QuizComponent = () => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
  
    const handleAnswerChange = (event) => {
      setAnswer(event.target.value);
      // Check answer and update feedback
      if (event.target.value === correctAnswer) {
        setFeedback('Correct!');
      } else {
        setFeedback('Incorrect.');
      }
    };
  
    return (
      <div>
        {/* Quiz question and answer input */}
        <input type="text" value={answer} onChange={handleAnswerChange} />
        <p>{feedback}</p>
      </div>
    );
  };