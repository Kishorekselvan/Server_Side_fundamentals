import { useParams } from 'react-router-dom';
import { concepts } from '../data/concepts';
import PageWrapper from '../components/PageWrapper';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import '../styles/ConceptDetail.css';

const ConceptDetail = () => {
  const { id } = useParams();
  const concept = concepts.find(c => c.id === id);

  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!concept) {
    return (
      <PageWrapper>
        <div className="concept-not-found-container">
          <p>Concept not found.</p>
        </div>
      </PageWrapper>
    );
  }

  const handleQuizSubmit = () => setQuizSubmitted(true);
  const isCorrect = selectedOption === concept.quiz?.correct;

  return (
    <PageWrapper>
      <div className="concept-detail-wrapper">
        <div className="concept-detail-container">
          {/* 🧠 Title */}
          <h1 className="concept-title">{concept.title}</h1>

          {/* 🔖 Tags */}
          {concept.tags && (
            <div className="concept-tags-container">
              {concept.tags.map(tag => (
                <span key={tag} className="concept-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 📘 Explanation */}
          <h2 className="concept-section-title">📘 Explanation</h2>
          <p className="concept-description">{concept.details}</p>

          {/* 💻 Code Snippet */}
          {concept.code && (
            <>
              <h2 className="concept-section-title">💻 Code Example</h2>
              <div className="code-snippet-wrapper">
                <SyntaxHighlighter 
                  language="javascript" 
                  style={oneDark}
                  className="code-snippet"
                >
                  {concept.code}
                </SyntaxHighlighter>
              </div>
            </>
          )}

          {/* 🧩 Use Cases */}
          {concept.useCases && (
            <>
              <h2 className="concept-section-title">🧩 Real-World Uses</h2>
              <ul className="concept-list">
                {concept.useCases.map((use, idx) => (
                  <li key={idx} className="concept-list-item">
                    <span className="concept-list-bullet"></span>
                    {use}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 📚 Resources */}
          {concept.resources && (
            <>
              <h2 className="concept-section-title">📚 Learn More</h2>
              <ul className="concept-list">
                {concept.resources.map((link, i) => (
                  <li key={i} className="concept-list-item">
                    <span className="concept-list-bullet"></span>
                    <a
                      href={link.url}
                      className="resource-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 🧠 Quiz */}
          {concept.quiz && (
            <>
              <h2 className="concept-section-title">🧠 Quick Quiz</h2>
              <p className="quiz-question">{concept.quiz.q}</p>
              <div className="quiz-options">
                {concept.quiz.a.map((option, index) => (
                  <label key={index} className="quiz-option">
                    <input
                      type="radio"
                      name="quiz"
                      value={index}
                      onChange={() => setSelectedOption(index)}
                      disabled={quizSubmitted}
                      className="quiz-radio"
                    />
                    <span className="quiz-option-text">{option}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleQuizSubmit}
                disabled={quizSubmitted || selectedOption === null}
                className="quiz-submit-btn"
              >
                Submit
              </button>
              {quizSubmitted && (
                <p className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? 'Correct ✅' : 'Incorrect ❌'} – {concept.quiz.explanation}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ConceptDetail;