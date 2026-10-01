export const evaluateEligibility = (serviceData, userAnswers) => {
  let isEligible = true;
  const disqualifications = [];

  serviceData.questions.forEach((q) => {
    const answer = userAnswers[q.id];
    if (answer !== undefined) {
      if (answer !== q.expectedAnswer) {
        isEligible = false;
        if (q.disqualificationMessage) {
          disqualifications.push({
            questionId: q.id,
            message: q.disqualificationMessage
          });
        }
      }
    }
  });

  return {
    isEligible,
    disqualifications,
    allAnswered: Object.keys(userAnswers).length === serviceData.questions.length
  };
};
