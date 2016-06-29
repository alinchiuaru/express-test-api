function validate( userInputData, questionData ) {

    var questionData = JSON.parse(questionData.replace("\r\n", "\\n")).answers,
        errors = 0;

    function sortByAnswerLabel(a, b) {
        if ( a.answer > b.answer ) {
            return 1;
        }

        if ( a.answer < b.answer ) {
            return -1;
        }

        if ( a.answer == b.answer ) {
            return 0;
        }
    }

    userInputData.sort(sortByAnswerLabel);
    questionData.sort(sortByAnswerLabel);

    userInputData.forEach(function(answer, index) {
        if ( answer.correct !== questionData[index].correct ) {
            errors++;
        }
    });

    if ( errors > 0 ) {
        return false;
    } else {
        return true;
    }
};

module.exports = { validate };