import "react"
import {useState} from "react"

export function MCQChallenge({ challenge, showExplanation = false }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)

    const option = typeof challenge.option === "string" ? JSON.parse(challenge.option) : challenge.option

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }

    const getOptionClass = (index) => {
        if (selectedOption === null) return "option";
        if (index === challenge.correct_answer_id) return "option correct";
        if (index === selectedOption && index !== challenge.correct_answer_id) return "option incorrect";
        return "option";
    }

    return <div className="challenge-display">
        <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
        <p className="challenge-title">{challenge.title}</p>
        <div className="options">
            {option.map((option, index) => (
                <div
                    key={index}
                    className={getOptionClass(index)}
                    onClick={() => handleOptionSelect(index)}
                >
                    {option}
                </div>
            ))}
        </div>
        {shouldShowExplanation && selectedOption !== null && (
            <div className="explanation">
                <h4>Explanation:</h4>
                <p>{challenge.explanation}</p>
            </div>
        )}
    </div>
}