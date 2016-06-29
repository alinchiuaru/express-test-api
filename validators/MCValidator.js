function validate( userInputData, questionData ) {

    var questionData = JSON.parse(questionData.replace("\r\n", "\\n")).answers,
        errors = 0;

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