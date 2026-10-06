/* ==========================================
   AI INTERVIEW PREP - DASHBOARD
   INTERVIEW ANALYSIS
========================================== */


/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadUserName();

        loadDashboardData();

    }
);


/* ==========================================
   SHOW USER NAME
========================================== */

function loadUserName() {

    let userName =
        localStorage.getItem(
            "loggedInUserName"
        );


    if (!userName) {

        const email =
            localStorage.getItem(
                "loggedInEmail"
            );

        if (email) {

            userName =
                email.split("@")[0];

        }

    }


    if (!userName) {

        userName = "User";

    }


    const elements =
        document.querySelectorAll(
            ".user-name, #userName, #welcomeName"
        );


    elements.forEach(
        function (element) {

            element.textContent =
                userName;

        }
    );


    const allElements =
        document.querySelectorAll("*");


    allElements.forEach(
        function (element) {

            if (
                element.children.length === 0 &&
                element.textContent.trim() === "Hi, User"
            ) {

                element.textContent =
                    "Hi, " + userName;

            }

        }
    );

}


/* ==========================================
   GET INTERVIEW HISTORY
========================================== */

function getInterviewHistory() {

    let history = [];


    try {

        history =
            JSON.parse(
                localStorage.getItem(
                    "interviewHistory"
                )
            ) || [];

    } catch (error) {

        console.log(
            "Could not read interview history."
        );

        history = [];

    }


    return history;

}


/* ==========================================
   LOAD DASHBOARD DATA
========================================== */

function loadDashboardData() {

    const history =
        getInterviewHistory();


    console.log(
        "Dashboard interview history:",
        history
    );


    if (!history.length) {

        showEmptyDashboard();

        return;

    }


    updateStatistics(history);

    updatePerformance(history);

    updateSkills(history);

    updateRecentInterviews(history);

}


/* ==========================================
   UPDATE STATISTICS
========================================== */

function updateStatistics(history) {

    const completed =
        history.length;


    const totalScore =
        history.reduce(
            function (sum, interview) {

                return sum +
                    Number(interview.score || 0);

            },
            0
        );


    const averageScore =
        Math.round(
            totalScore / completed
        );


    const questionsAnswered =
        history.reduce(
            function (sum, interview) {

                return sum +
                    Number(
                        interview.questionsAnswered || 0
                    );

            },
            0
        );


    const streak =
        calculatePracticeStreak(history);


    updateStatCard(
        "Interviews Completed",
        completed
    );


    updateStatCard(
        "Average Score",
        averageScore + "%"
    );


    updateStatCard(
        "Questions Answered",
        questionsAnswered
    );


    updateStatCard(
        "Practice Streak",
        streak + " Days"
    );

}


/* ==========================================
   UPDATE STAT CARD
========================================== */

function updateStatCard(
    title,
    value
) {

    const cards =
        document.querySelectorAll(
            ".stat-card, .stat-item, .stat-box"
        );


    cards.forEach(
        function (card) {

            const text =
                card.textContent
                    .toLowerCase();


            if (
                text.includes(
                    title.toLowerCase()
                )
            ) {

                const numberElements =
                    card.querySelectorAll(
                        "strong, h2, h3, .stat-number, .stat-value, p"
                    );


                if (
                    numberElements.length
                ) {

                    const target =
                        numberElements[
                            numberElements.length - 1
                        ];


                    target.textContent =
                        value;

                }

            }

        }
    );


    /*
       Extra support for IDs if they exist
    */

    const idMap = {

        "Interviews Completed":
            "interviewsCompleted",

        "Average Score":
            "averageScore",

        "Questions Answered":
            "questionsAnswered",

        "Practice Streak":
            "practiceStreak"

    };


    const id =
        idMap[title];


    if (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                value;

        }

    }

}


/* ==========================================
   PERFORMANCE OVERVIEW
========================================== */

function updatePerformance(history) {

    const performanceSection =
        findSectionByHeading(
            "Performance Overview"
        );


    if (!performanceSection) {

        return;

    }


    const sorted =
        [...history].sort(
            function (a, b) {

                return new Date(a.date) -
                    new Date(b.date);

            }
        );


    const recent =
        sorted.slice(-7);


    const existingEmpty =
        performanceSection.querySelector(
            ".empty-state"
        );


    if (existingEmpty) {

        existingEmpty.remove();

    }


    let chart =
        performanceSection.querySelector(
            ".dashboard-performance-data"
        );


    if (!chart) {

        chart =
            document.createElement(
                "div"
            );

        chart.className =
            "dashboard-performance-data";

        chart.style.marginTop =
            "25px";

        performanceSection.appendChild(
            chart
        );

    }


    chart.innerHTML = "";


    recent.forEach(
        function (interview) {

            const row =
                document.createElement(
                    "div"
                );


            row.style.display =
                "flex";

            row.style.justifyContent =
                "space-between";

            row.style.alignItems =
                "center";

            row.style.padding =
                "12px 0";

            row.style.borderBottom =
                "1px solid #eeeeee";


            const role =
                document.createElement(
                    "span"
                );


            role.textContent =
                interview.role ||
                "Interview";


            const score =
                document.createElement(
                    "strong"
                );


            score.textContent =
                Number(
                    interview.score || 0
                ) + "%";


            row.appendChild(role);

            row.appendChild(score);

            chart.appendChild(row);

        }
    );

}


/* ==========================================
   SKILLS
========================================== */

function updateSkills(history) {

    const skillsSection =
        findSectionByHeading(
            "Skills"
        );


    if (!skillsSection) {

        return;

    }


    const existingEmpty =
        skillsSection.querySelector(
            ".empty-state"
        );


    if (existingEmpty) {

        existingEmpty.remove();

    }


    let skillData =
        skillsSection.querySelector(
            ".dashboard-skill-data"
        );


    if (!skillData) {

        skillData =
            document.createElement(
                "div"
            );

        skillData.className =
            "dashboard-skill-data";

        skillData.style.marginTop =
            "25px";

        skillsSection.appendChild(
            skillData
        );

    }


    const averages = {

        Communication: 0,

        Knowledge: 0,

        Relevance: 0

    };


    history.forEach(
        function (interview) {

            averages.Communication +=
                Number(
                    interview.communication || 0
                );

            averages.Knowledge +=
                Number(
                    interview.knowledge || 0
                );

            averages.Relevance +=
                Number(
                    interview.relevance || 0
                );

        }
    );


    const count =
        history.length;


    skillData.innerHTML = `

        <div style="
            display:flex;
            justify-content:space-between;
            padding:12px 0;
            border-bottom:1px solid #eeeeee;
        ">
            <span>Communication</span>
            <strong>
                ${Math.round(
                    averages.Communication / count
                )}%
            </strong>
        </div>

        <div style="
            display:flex;
            justify-content:space-between;
            padding:12px 0;
            border-bottom:1px solid #eeeeee;
        ">
            <span>Knowledge</span>
            <strong>
                ${Math.round(
                    averages.Knowledge / count
                )}%
            </strong>
        </div>

        <div style="
            display:flex;
            justify-content:space-between;
            padding:12px 0;
        ">
            <span>Relevance</span>
            <strong>
                ${Math.round(
                    averages.Relevance / count
                )}%
            </strong>
        </div>

    `;

}


/* ==========================================
   RECENT INTERVIEWS
========================================== */

function updateRecentInterviews(history) {

    const section =
        findSectionByHeading(
            "Recent Interviews"
        );


    if (!section) {

        return;

    }


    let container =
        section.querySelector(
            ".dashboard-recent-data"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "dashboard-recent-data";

        container.style.marginTop =
            "20px";

        section.appendChild(
            container
        );

    }


    const recent =
        [...history]
            .reverse()
            .slice(0, 5);


    container.innerHTML = "";


    recent.forEach(
        function (interview) {

            const item =
                document.createElement(
                    "div"
                );


            item.style.display =
                "flex";

            item.style.justifyContent =
                "space-between";

            item.style.alignItems =
                "center";

            item.style.padding =
                "15px";

            item.style.marginBottom =
                "10px";

            item.style.border =
                "1px solid #e5e7eb";

            item.style.borderRadius =
                "12px";


            const date =
                new Date(
                    interview.date
                );


            const dateText =
                date.toLocaleDateString();


            item.innerHTML = `

                <div>

                    <strong>
                        ${escapeHtml(
                            interview.role ||
                            "Interview"
                        )}
                    </strong>

                    <div style="
                        font-size:13px;
                        color:#718096;
                        margin-top:4px;
                    ">

                        ${dateText}

                    </div>

                </div>

                <strong>
                    ${Number(
                        interview.score || 0
                    )}%
                </strong>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* ==========================================
   FIND DASHBOARD SECTION
========================================== */

function findSectionByHeading(
    headingText
) {

    const headings =
        document.querySelectorAll(
            "h1, h2, h3, h4"
        );


    for (
        let i = 0;
        i < headings.length;
        i++
    ) {

        if (
            headings[i]
                .textContent
                .trim()
                .toLowerCase()
                .includes(
                    headingText.toLowerCase()
                )
        ) {

            return (
                headings[i]
                    .parentElement
                    || headings[i]
            );

        }

    }


    return null;

}


/* ==========================================
   EMPTY DASHBOARD
========================================== */

function showEmptyDashboard() {

    updateStatCard(
        "Interviews Completed",
        "0"
    );


    updateStatCard(
        "Average Score",
        "—"
    );


    updateStatCard(
        "Questions Answered",
        "0"
    );


    updateStatCard(
        "Practice Streak",
        "0 Days"
    );

}


/* ==========================================
   PRACTICE STREAK
========================================== */

function calculatePracticeStreak(
    history
) {

    if (!history.length) {

        return 0;

    }


    const dates = [];


    history.forEach(
        function (interview) {

            const date =
                new Date(
                    interview.date
                );


            const dateString =
                date.toISOString()
                    .split("T")[0];


            if (
                !dates.includes(
                    dateString
                )
            ) {

                dates.push(
                    dateString
                );

            }

        }
    );


    dates.sort().reverse();


    let streak = 0;


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    for (
        let i = 0;
        i < dates.length;
        i++
    ) {

        const expected =
            new Date(today);


        expected.setDate(
            today.getDate() - i
        );


        const expectedString =
            expected.toISOString()
                .split("T")[0];


        if (
            dates[i] ===
            expectedString
        ) {

            streak++;

        } else {

            break;

        }

    }


    return streak;

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHtml(text) {

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* ==========================================
   START AI INTERVIEW
========================================== */

function startMockInterview() {

    window.location.href =
        "interview.html";

}


function startInterview() {

    window.location.href =
        "interview.html";

}


function openInterview() {

    window.location.href =
        "interview.html";

}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "userLoggedIn"
    );

    localStorage.removeItem(
        "loggedInEmail"
    );

    localStorage.removeItem(
        "loggedInUserName"
    );


    sessionStorage.removeItem(
        "isLoggedIn"
    );

    sessionStorage.removeItem(
        "loggedIn"
    );

    sessionStorage.removeItem(
        "userLoggedIn"
    );

    sessionStorage.removeItem(
        "loggedInEmail"
    );

    sessionStorage.removeItem(
        "loggedInUserName"
    );


    window.location.href =
        "login.html";

}


/* ==========================================
   PROFILE
========================================== */

function openProfile() {

    alert(
        "Profile page will be added next."
    );

}


/* ==========================================
   PROGRESS
========================================== */

function viewProgress() {

    alert(
        "Your interview progress is shown on this dashboard."
    );

}


/* ==========================================
   TIPS
========================================== */

function viewTips() {

    alert(
        "Interview tips will be added here."
    );

}