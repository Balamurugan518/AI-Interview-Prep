/* =========================================================
   AI INTERVIEW PREP - INTERVIEW JAVASCRIPT
   ========================================================= */


/* =========================================================
   INTERVIEW QUESTIONS
   ========================================================= */

const interviewQuestions = {

    "Software Developer": [
        "Tell me about yourself.",
        "What programming languages are you comfortable with?",
        "Explain the difference between an array and an object.",
        "How do you debug a programming problem?",
        "Tell me about a software project you have worked on."
    ],

    "Web Developer": [
        "Tell me about yourself.",
        "What is HTML and why is it used?",
        "What is the difference between CSS and JavaScript?",
        "What is responsive web design?",
        "Tell me about a website you have developed."
    ],

    "Java Developer": [
        "Tell me about yourself.",
        "What are the main features of Java?",
        "What is object-oriented programming?",
        "What is the difference between JDK, JRE and JVM?",
        "Explain inheritance in Java."
    ],

    "Python Developer": [
        "Tell me about yourself.",
        "Why do you prefer Python?",
        "What are lists and tuples in Python?",
        "What is a Python dictionary?",
        "Tell me about a Python project you have created."
    ],

    "Data Analyst": [
        "Tell me about yourself.",
        "What is data analysis?",
        "Which tools do you use for data analysis?",
        "What is the difference between mean, median and mode?",
        "Tell me about a data analysis project you have worked on."
    ],

    "Data Scientist": [
        "Tell me about yourself.",
        "What is machine learning?",
        "What is the difference between supervised and unsupervised learning?",
        "What is overfitting?",
        "Tell me about a machine learning project you have worked on."
    ]

};


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let questions = [];

let currentQuestionIndex = 0;

let totalQuestions = 5;

let totalScore = 0;

let communicationTotal = 0;

let knowledgeTotal = 0;

let relevanceTotal = 0;

let interviewStarted = false;

let recognition = null;

let isListening = false;


/* =========================================================
   GET ELEMENT
   ========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* =========================================================
   BEGIN INTERVIEW
   ========================================================= */

function beginInterview() {

    console.log("Starting interview...");


    const jobRoleElement =
        getElement("jobRole");

    const interviewTypeElement =
        getElement("interviewType");

    const difficultyElement =
        getElement("difficulty");

    const questionCountElement =
        getElement("questionCount");


    const jobRole =
        jobRoleElement
            ? jobRoleElement.value
            : "Software Developer";


    const interviewType =
        interviewTypeElement
            ? interviewTypeElement.value
            : "HR Interview";


    const difficulty =
        difficultyElement
            ? difficultyElement.value
            : "Medium";


    totalQuestions =
        questionCountElement
            ? parseInt(questionCountElement.value)
            : 5;


    if (!totalQuestions || totalQuestions < 1) {

        totalQuestions = 5;

    }


    const roleQuestions =
        interviewQuestions[jobRole]
        || interviewQuestions["Software Developer"];


    questions = [...roleQuestions];


    questions =
        questions.slice(0, totalQuestions);


    currentQuestionIndex = 0;

    totalScore = 0;

    communicationTotal = 0;

    knowledgeTotal = 0;

    relevanceTotal = 0;

    interviewStarted = true;


    localStorage.setItem(
        "interviewRole",
        jobRole
    );

    localStorage.setItem(
        "interviewType",
        interviewType
    );

    localStorage.setItem(
        "interviewDifficulty",
        difficulty
    );


    const setupScreen =
        getElement("setupScreen");


    if (setupScreen) {

        setupScreen.classList.add("hidden");

        setupScreen.style.display = "none";

    }


    const interviewScreen =
        getElement("interviewScreen");


    if (interviewScreen) {

        interviewScreen.classList.remove("hidden");

        interviewScreen.style.display = "block";

        interviewScreen.style.visibility = "visible";

        interviewScreen.style.opacity = "1";

    } else {

        console.error(
            "interviewScreen was not found!"
        );

        alert(
            "Interview screen could not be loaded."
        );

        return;

    }


    const resultScreen =
        getElement("resultScreen");


    if (resultScreen) {

        resultScreen.classList.add("hidden");

        resultScreen.style.display = "none";

    }


    showQuestion();

    setupSpeechRecognition();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showQuestion() {

    if (!questions.length) {

        console.error(
            "No questions available."
        );

        return;

    }


    const question =
        questions[currentQuestionIndex];


    const questionText =
        getElement("questionText");


    if (questionText) {

        questionText.textContent =
            question;

    }


    const currentNumber =
        getElement("currentNumber");


    if (currentNumber) {

        currentNumber.textContent =
            currentQuestionIndex + 1;

    }


    const totalNumber =
        getElement("totalNumber");


    if (totalNumber) {

        totalNumber.textContent =
            questions.length;

    }


    const progress =
        getElement("questionProgress");


    if (progress) {

        const percentage =
            (
                (currentQuestionIndex + 1)
                / questions.length
            ) * 100;


        progress.style.width =
            percentage + "%";

    }


    const interviewRole =
        getElement("interviewRole");


    const savedRole =
        localStorage.getItem(
            "interviewRole"
        );


    if (interviewRole) {

        interviewRole.textContent =
            savedRole || "Software Developer";

    }


    const answer =
        getElement("userAnswer");


    if (answer) {

        answer.value = "";

    }


    updateWordCount();


    const feedback =
        getElement("questionFeedback");


    if (feedback) {

        feedback.innerHTML = "";

    }


    setVoiceStatus(
        "🎤 You can type or speak your answer."
    );

}


/* =========================================================
   SPEAK QUESTION
   ========================================================= */

function speakText(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Your browser does not support text-to-speech."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";

    speech.rate = 0.9;

    speech.pitch = 1;


    window.speechSynthesis.speak(
        speech
    );

}


function speakCurrentQuestion() {

    const question =
        questions[currentQuestionIndex];


    if (question) {

        speakText(question);

        setVoiceStatus(
            "🔊 AI interviewer is speaking..."
        );

    }

}


/* =========================================================
   SPEECH RECOGNITION
   ========================================================= */

function setupSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition
        || window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.log(
            "Speech recognition not supported."
        );

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";


    recognition.onstart = function () {

        isListening = true;

        updateMicButton();

        setVoiceStatus(
            "🎤 Listening... speak your answer."
        );

    };


    recognition.onresult =
        function(event) {

            let finalText = "";

            let interimText = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                const transcript =
                    event.results[i][0].transcript;


                if (
                    event.results[i].isFinal
                ) {

                    finalText +=
                        transcript + " ";

                } else {

                    interimText +=
                        transcript;

                }

            }


            const answer =
                getElement("userAnswer");


            if (answer && finalText) {

                answer.value += finalText;

                updateWordCount();

            }


            if (interimText) {

                setVoiceStatus(
                    "🎤 " + interimText
                );

            }

        };


    recognition.onerror =
        function(event) {

            console.log(
                "Speech recognition error:",
                event.error
            );


            isListening = false;

            updateMicButton();


            if (
                event.error ===
                "not-allowed"
            ) {

                setVoiceStatus(
                    "⚠️ Please allow microphone access."
                );

            } else {

                setVoiceStatus(
                    "⚠️ Voice recognition error."
                );

            }

        };


    recognition.onend =
        function() {

            isListening = false;

            updateMicButton();

            setVoiceStatus(
                "🎤 Voice stopped."
            );

        };

}


/* =========================================================
   TOGGLE MICROPHONE
   ========================================================= */

function toggleListening() {

    if (!recognition) {

        setupSpeechRecognition();

    }


    if (!recognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;

    }


    if (isListening) {

        stopListening();

    } else {

        try {

            recognition.start();

        } catch (error) {

            console.log(error);

        }

    }

}


/* =========================================================
   STOP LISTENING
   ========================================================= */

function stopListening() {

    if (
        recognition &&
        isListening
    ) {

        recognition.stop();

    }

}


/* =========================================================
   UPDATE MIC BUTTON
   ========================================================= */

function updateMicButton() {

    const button =
        getElement("micButton");


    if (!button) {

        return;

    }


    if (isListening) {

        button.textContent =
            "🛑 Stop Speaking";

        button.classList.add(
            "listening"
        );

    } else {

        button.textContent =
            "🎤 Start Speaking";

        button.classList.remove(
            "listening"
        );

    }

}


/* =========================================================
   VOICE STATUS
   ========================================================= */

function setVoiceStatus(message) {

    const status =
        getElement("voiceStatus");


    if (status) {

        status.textContent =
            message;

    }

}


/* =========================================================
   WORD COUNT
   ========================================================= */

function updateWordCount() {

    const answer =
        getElement("userAnswer");

    const wordCount =
        getElement("wordCount");


    if (!answer || !wordCount) {

        return;

    }


    const text =
        answer.value.trim();


    if (!text) {

        wordCount.textContent =
            "0 words";

        return;

    }


    const words =
        text.split(/\s+/)
            .filter(Boolean);


    wordCount.textContent =
        words.length + " words";

}


/* =========================================================
   CLEAR ANSWER
   ========================================================= */

function clearAnswer() {

    const answer =
        getElement("userAnswer");


    if (answer) {

        answer.value = "";

        answer.focus();

    }


    updateWordCount();

    setVoiceStatus(
        "🗑️ Answer cleared."
    );

}


/* =========================================================
   SAVE INTERVIEW RESULT
   ========================================================= */

function saveInterviewResult(
    finalScore,
    communicationScore,
    knowledgeScore,
    relevanceScore
) {

    const role =
        localStorage.getItem(
            "interviewRole"
        ) || "Software Developer";


    const interviewType =
        localStorage.getItem(
            "interviewType"
        ) || "HR Interview";


    const difficulty =
        localStorage.getItem(
            "interviewDifficulty"
        ) || "Medium";


    const userEmail =
        localStorage.getItem(
            "loggedInEmail"
        ) || "";


    const userName =
        localStorage.getItem(
            "loggedInUserName"
        ) || "User";


    const result = {

        id: Date.now(),

        date: new Date().toISOString(),

        userName: userName,

        email: userEmail,

        role: role,

        interviewType: interviewType,

        difficulty: difficulty,

        totalQuestions:
            questions.length,

        questionsAnswered:
            questions.length,

        score: finalScore,

        communication:
            communicationScore,

        knowledge:
            knowledgeScore,

        relevance:
            relevanceScore

    };


    let history = [];


    try {

        history =
            JSON.parse(
                localStorage.getItem(
                    "interviewHistory"
                )
            ) || [];

    } catch (error) {

        history = [];

    }


    history.push(result);


    localStorage.setItem(
        "interviewHistory",
        JSON.stringify(history)
    );


    localStorage.setItem(
        "lastInterviewResult",
        JSON.stringify(result)
    );


    console.log(
        "Interview result saved:",
        result
    );

}


/* =========================================================
   SUBMIT ANSWER
   ========================================================= */

function submitInterviewAnswer() {

    stopListening();


    const answerElement =
        getElement("userAnswer");


    if (!answerElement) {

        return;

    }


    const answer =
        answerElement.value.trim();


    if (!answer) {

        alert(
            "Please type or speak an answer before submitting."
        );

        answerElement.focus();

        return;

    }


    const words =
        answer
            .split(/\s+/)
            .filter(Boolean);


    const wordCount =
        words.length;


    let score = 0;


    if (wordCount < 5) {

        score = 15;

    } else if (wordCount < 15) {

        score = 35;

    } else if (wordCount < 30) {

        score = 55;

    } else if (wordCount < 50) {

        score = 70;

    } else if (wordCount < 80) {

        score = 82;

    } else {

        score = 90;

    }


    const keywords = [

        "experience",
        "project",
        "developed",
        "worked",
        "team",
        "skill",
        "problem",
        "solution",
        "learned",
        "technology",
        "programming",
        "developer",
        "communication",
        "database",
        "javascript",
        "python",
        "java",
        "html",
        "css"

    ];


    const lowerAnswer =
        answer.toLowerCase();


    let keywordMatches = 0;


    keywords.forEach(
        function(keyword) {

            if (
                lowerAnswer.includes(keyword)
            ) {

                keywordMatches++;

            }

        }
    );


    score +=
        Math.min(
            keywordMatches * 2,
            10
        );


    score =
        Math.min(
            score,
            100
        );


    const communication =
        Math.min(
            100,
            score + 3
        );


    const knowledge =
        Math.min(
            100,
            score
        );


    const relevance =
        Math.min(
            100,
            score + 2
        );


    totalScore += score;

    communicationTotal +=
        communication;

    knowledgeTotal +=
        knowledge;

    relevanceTotal +=
        relevance;


    const feedback =
        getElement("questionFeedback");


    if (feedback) {

        if (score < 40) {

            feedback.innerHTML =
                "<strong>Needs improvement.</strong> " +
                "Try giving a longer answer with specific examples.";

        } else if (score < 70) {

            feedback.innerHTML =
                "<strong>Good start.</strong> " +
                "Try adding more technical details and examples.";

        } else {

            feedback.innerHTML =
                "<strong>Good answer!</strong> " +
                "Your answer contains useful information.";

        }

    }


    setTimeout(
        function() {

            if (
                currentQuestionIndex <
                questions.length - 1
            ) {

                currentQuestionIndex++;

                showQuestion();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            } else {

                showResults();

            }

        },
        800
    );

}


/* =========================================================
   SHOW RESULTS
   ========================================================= */

function showResults() {

    interviewStarted = false;


    const interviewScreen =
        getElement("interviewScreen");


    if (interviewScreen) {

        interviewScreen.classList.add(
            "hidden"
        );

        interviewScreen.style.display =
            "none";

    }


    const resultScreen =
        getElement("resultScreen");


    if (!resultScreen) {

        console.error(
            "resultScreen not found."
        );

        return;

    }


    resultScreen.classList.remove(
        "hidden"
    );

    resultScreen.style.display =
        "block";

    resultScreen.style.visibility =
        "visible";

    resultScreen.style.opacity =
        "1";


    const count =
        questions.length || 1;


    const finalScore =
        Math.round(
            totalScore / count
        );


    const communicationScore =
        Math.round(
            communicationTotal / count
        );


    const knowledgeScore =
        Math.round(
            knowledgeTotal / count
        );


    const relevanceScore =
        Math.round(
            relevanceTotal / count
        );


    /* =====================================================
       IMPORTANT:
       SAVE RESULT FOR DASHBOARD
    ===================================================== */

    saveInterviewResult(
        finalScore,
        communicationScore,
        knowledgeScore,
        relevanceScore
    );


    const finalScoreElement =
        getElement("finalScore");


    if (finalScoreElement) {

        finalScoreElement.textContent =
            finalScore;

    }


    const communicationElement =
        getElement("communicationScore");


    if (communicationElement) {

        communicationElement.textContent =
            communicationScore;

    }


    const knowledgeElement =
        getElement("knowledgeScore");


    if (knowledgeElement) {

        knowledgeElement.textContent =
            knowledgeScore;

    }


    const relevanceElement =
        getElement("relevanceScore");


    if (relevanceElement) {

        relevanceElement.textContent =
            relevanceScore;

    }


    const scoreMessage =
        getElement("scoreMessage");


    if (scoreMessage) {

        if (finalScore >= 80) {

            scoreMessage.textContent =
                "Excellent! You are showing strong interview skills. 🎉";

        } else if (finalScore >= 60) {

            scoreMessage.textContent =
                "Good job! Keep practicing to become more confident. 👍";

        } else {

            scoreMessage.textContent =
                "Keep practicing. You can improve with more preparation. 💪";

        }

    }


    const finalFeedback =
        getElement("finalFeedback");


    if (finalFeedback) {

        finalFeedback.innerHTML = `

            <h3>Interview Feedback</h3>

            <p>
                You completed
                ${questions.length}
                interview questions.
            </p>

            <p>
                Focus on giving clear answers,
                using examples, and explaining
                your technical knowledge.
            </p>

        `;

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   RESTART INTERVIEW
   ========================================================= */

function restartInterview() {

    const resultScreen =
        getElement("resultScreen");


    if (resultScreen) {

        resultScreen.classList.add(
            "hidden"
        );

        resultScreen.style.display =
            "none";

    }


    const setupScreen =
        getElement("setupScreen");


    if (setupScreen) {

        setupScreen.classList.remove(
            "hidden"
        );

        setupScreen.style.display =
            "block";

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   GO TO DASHBOARD
   ========================================================= */

function goDashboard() {

    window.location.href =
        "dashboard.html";

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "AI Interview page loaded."
        );


        const setupScreen =
            getElement("setupScreen");


        if (setupScreen) {

            setupScreen.classList.remove(
                "hidden"
            );

            setupScreen.style.display =
                "block";

        }


        const interviewScreen =
            getElement("interviewScreen");


        if (interviewScreen) {

            interviewScreen.classList.add(
                "hidden"
            );

            interviewScreen.style.display =
                "none";

        }


        const resultScreen =
            getElement("resultScreen");


        if (resultScreen) {

            resultScreen.classList.add(
                "hidden"
            );

            resultScreen.style.display =
                "none";

        }


        updateWordCount();

    }
);