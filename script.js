// ==========================================
// AUTHENTICATION PROTECTION
// ==========================================

const protectedPages = [

    "dashboard.html",
    "doctors.html",
    "doctor-profile.html",
    "book-appointment.html",
    "appointments.html",
    "appointment-details.html",
    "profile.html",
    "medical-records.html",
    "prescriptions.html"

];


// ==========================================
// GET CURRENT PAGE
// ==========================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


// ==========================================
// CHECK LOGGED-IN USER
// ==========================================

const currentUser =
    localStorage.getItem("currentUser");


// ==========================================
// PROTECT PAGES
// ==========================================

if (
    protectedPages.includes(currentPage) &&
    !currentUser
) {

    window.location.href =
        "login.html";

}

// ==========================================
// REGISTER SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const registerForm =
        document.getElementById("registerForm");


    // ==========================================
    // REGISTER
    // ==========================================

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const password =
                    document.getElementById("password").value;


                // Validation

                if (
                    name === "" ||
                    email === "" ||
                    password === ""
                ) {

                    alert("Please fill in all fields.");

                    return;

                }


                // Check existing user

                const existingUser =
                    localStorage.getItem("medicalUser");


                if (existingUser) {

                    const user =
                        JSON.parse(existingUser);


                    if (user.email === email) {

                        alert(
                            "An account with this email already exists."
                        );

                        return;

                    }

                }


                // Create user

                const userData = {

                    name: name,
                    email: email,
                    password: password

                };


                // Save user

                localStorage.setItem(
                    "medicalUser",
                    JSON.stringify(userData)
                );


                // Success

                alert(
                    "Account created successfully!"
                );


                // Clear form

                registerForm.reset();


            }
        );

    }



    // ==========================================
    // LOGIN SYSTEM
    // ==========================================

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // Get login information

                const email =
                    document
                        .getElementById("loginEmail")
                        .value
                        .trim();


                const password =
                    document
                        .getElementById("loginPassword")
                        .value;


                // Get registered user

                const savedUser =
                    localStorage.getItem("medicalUser");


                // Check if user exists

                if (!savedUser) {

                    alert(
                        "No account found. Please create an account first."
                    );

                    return;

                }


                // Convert JSON to object

                const user =
                    JSON.parse(savedUser);


                // ==========================================
                // VERIFY EMAIL
                // ==========================================

                if (user.email !== email) {

                    alert(
                        "Incorrect email address."
                    );

                    return;

                }


                // ==========================================
                // VERIFY PASSWORD
                // ==========================================

                if (user.password !== password) {

                    alert(
                        "Incorrect password."
                    );

                    return;

                }

                 // ==========================================
                  // LOGIN SUCCESS
                 // ==========================================

          localStorage.setItem(
            "isLoggedIn",
            "true"
           );


               // Save currently logged-in user

            localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
           );


           // Go to dashboard

        window.location.href =
        "dashboard.html";


            }
        );

    }

});

// ==========================================
// DASHBOARD SYSTEM
// ==========================================

const dashboardName =
    document.getElementById("dashboardName");

const dashboardEmail =
    document.getElementById("dashboardEmail");

const userName =
    document.getElementById("userName");


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

if (
    dashboardName ||
    dashboardEmail ||
    userName
) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const savedUser =
        localStorage.getItem("medicalUser");


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (
        isLoggedIn !== "true" ||
        !savedUser
    ) {

        window.location.href = "login.html";

    }


    // ==========================================
    // LOGGED IN
    // ==========================================

    else {

        const user =
            JSON.parse(savedUser);


        if (dashboardName) {

            dashboardName.textContent =
                user.name;

        }


        if (dashboardEmail) {

            dashboardEmail.textContent =
                user.email;

        }


        if (userName) {

            userName.textContent =
                user.name;

        }

    }

}

// ==========================================
// LOGOUT SYSTEM
// ==========================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            // Remove login session
            localStorage.removeItem(
                "currentUser"
            );

            localStorage.removeItem(
                "isLoggedIn"
            );


            // Redirect to login page
            window.location.href =
                "login.html";

        }
    );

}

// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

const registerPasswordToggle =
    document.getElementById(
        "registerPasswordToggle"
    );


const registerPassword =
    document.getElementById(
        "password"
    );


if (
    registerPasswordToggle &&
    registerPassword
) {

    registerPasswordToggle.addEventListener(
        "click",
        function () {

            if (
                registerPassword.type ===
                "password"
            ) {

                registerPassword.type =
                    "text";

                registerPasswordToggle.textContent =
                    "Hide";

            }

            else {

                registerPassword.type =
                    "password";

                registerPasswordToggle.textContent =
                    "Show";

            }

        }
    );

}



// ==========================================
// LOGIN PASSWORD SHOW / HIDE
// ==========================================

const loginPasswordToggle =
    document.getElementById(
        "loginPasswordToggle"
    );


const loginPassword =
    document.getElementById(
        "loginPassword"
    );


if (
    loginPasswordToggle &&
    loginPassword
) {

    loginPasswordToggle.addEventListener(
        "click",
        function () {

            if (
                loginPassword.type ===
                "password"
            ) {

                loginPassword.type =
                    "text";

                loginPasswordToggle.textContent =
                    "Hide";

            }

            else {

                loginPassword.type =
                    "password";

                loginPasswordToggle.textContent =
                    "Show";

            }

        }
    );

}
// ==========================================
// DOCTOR DIRECTORY
// ==========================================

const doctorsGrid =
    document.getElementById(
        "doctorsGrid"
    );


const doctorSearch =
    document.getElementById(
        "doctorSearch"
    );


const specialtyFilter =
    document.getElementById(
        "specialtyFilter"
    );


const doctorCount =
    document.getElementById(
        "doctorCount"
    );


// ==========================================
// DEMO DOCTORS
// ==========================================

const doctors = [

    {
        id: 1,

        name: "Dr. Sarah Mitchell",

        specialty: "Cardiology",

        specialtyKey: "cardiology",

        experience: "15 Years",

        location: "London, United Kingdom",

        rating: "4.9",

        fee: "$120",

        image:
            "https://randomuser.me/api/portraits/women/44.jpg"
    },


    {
        id: 2,

        name: "Dr. James Anderson",

        specialty: "Neurology",

        specialtyKey: "neurology",

        experience: "12 Years",

        location: "New York, USA",

        rating: "4.8",

        fee: "$150",

        image:
            "https://randomuser.me/api/portraits/men/32.jpg"
    },


    {
        id: 3,

        name: "Dr. Emily Carter",

        specialty: "Dermatology",

        specialtyKey: "dermatology",

        experience: "10 Years",

        location: "Toronto, Canada",

        rating: "4.9",

        fee: "$100",

        image:
            "https://randomuser.me/api/portraits/women/68.jpg"
    },


    {
        id: 4,

        name: "Dr. Michael Wilson",

        specialty: "Pediatrics",

        specialtyKey: "pediatrics",

        experience: "14 Years",

        location: "Sydney, Australia",

        rating: "4.8",

        fee: "$110",

        image:
            "https://randomuser.me/api/portraits/men/46.jpg"
    },


    {
        id: 5,

        name: "Dr. Olivia Brown",

        specialty: "Orthopedics",

        specialtyKey: "orthopedics",

        experience: "11 Years",

        location: "Manchester, United Kingdom",

        rating: "4.7",

        fee: "$130",

        image:
            "https://randomuser.me/api/portraits/women/32.jpg"
    },


    {
        id: 6,

        name: "Dr. Daniel Thompson",

        specialty: "Psychiatry",

        specialtyKey: "psychiatry",

        experience: "13 Years",

        location: "Chicago, USA",

        rating: "4.9",

        fee: "$140",

        image:
            "https://randomuser.me/api/portraits/men/64.jpg"
    }

];


// ==========================================
// DISPLAY DOCTORS
// ==========================================

function displayDoctors(
    doctorList
) {

    if (!doctorsGrid) {

        return;

    }


    doctorsGrid.innerHTML = "";


    // Update count

    if (doctorCount) {

        doctorCount.textContent =
            `${doctorList.length} doctors`;

    }


    // No results

    if (doctorList.length === 0) {

        doctorsGrid.innerHTML = `

            <div class="no-doctors">

                <h3>
                    No doctors found
                </h3>

                <p>
                    Try changing your search
                    or specialty filter.
                </p>

            </div>

        `;

        return;

    }


    // Create cards

    doctorList.forEach(
        function (doctor) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "doctor-card";


            card.innerHTML = `

                <div class="doctor-card-top">

                    <img
                        src="${doctor.image}"
                        alt="${doctor.name}"
                        class="doctor-image"
                    >

                    <div class="doctor-main-info">

                        <h3>
                            ${doctor.name}
                        </h3>

                        <div class="doctor-specialty">

                            ${doctor.specialty}

                        </div>

                    </div>

                </div>


                <div class="doctor-card-body">

                    <div class="doctor-meta">

                        <div class="doctor-meta-item">

                            <span>
                                Experience
                            </span>

                            <strong>
                                ${doctor.experience}
                            </strong>

                        </div>


                        <div class="doctor-meta-item">

                            <span>
                                Location
                            </span>

                            <strong>
                                ${doctor.location}
                            </strong>

                        </div>


                        <div class="doctor-meta-item">

                            <span>
                                Rating
                            </span>

                            <strong class="doctor-rating">

                                ⭐ ${doctor.rating}

                            </strong>

                        </div>

                    </div>


                    <div class="doctor-card-footer">

                        <span class="doctor-fee">

                            From ${doctor.fee}

                        </span>


                        <button
                            class="view-doctor-btn"
                            onclick="viewDoctor(${doctor.id})"
                        >

                            View Profile

                        </button>

                    </div>

                </div>

            `;


            doctorsGrid.appendChild(card);

        }
    );

}


// ==========================================
// SEARCH + FILTER
// ==========================================

function filterDoctors() {

    const searchText =
        doctorSearch
            ? doctorSearch.value
                .toLowerCase()
                .trim()
            : "";


    const specialty =
        specialtyFilter
            ? specialtyFilter.value
            : "all";


    const filteredDoctors =
        doctors.filter(
            function (doctor) {

                const matchesSearch =

                    doctor.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    doctor.specialty
                        .toLowerCase()
                        .includes(searchText);


                const matchesSpecialty =

                    specialty === "all"

                    ||

                    doctor.specialtyKey ===
                        specialty;


                return (
                    matchesSearch &&
                    matchesSpecialty
                );

            }
        );


    displayDoctors(
        filteredDoctors
    );

}


// ==========================================
// SEARCH EVENT
// ==========================================

if (doctorSearch) {

    doctorSearch.addEventListener(
        "input",
        filterDoctors
    );

}


// ==========================================
// FILTER EVENT
// ==========================================

if (specialtyFilter) {

    specialtyFilter.addEventListener(
        "change",
        filterDoctors
    );

}


// ==========================================
// VIEW DOCTOR
// ==========================================

function viewDoctor(
    doctorId
) {

    const doctor =
        doctors.find(
            function (item) {

                return item.id ===
                    doctorId;

            }
        );


    if (!doctor) {

        return;

    }


    window.location.href =
        `doctor-profile.html?id=${doctor.id}`;

}


// ==========================================
// LOAD DOCTORS
// ==========================================

if (doctorsGrid) {

    displayDoctors(
        doctors
    );

}

// ==========================================
// DOCTOR PROFILE PAGE
// ==========================================

const profileName =
    document.getElementById(
        "profileName"
    );


if (profileName) {


    // ==========================================
    // GET DOCTOR ID FROM URL
    // ==========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const doctorId =
        Number(
            urlParams.get("id")
        );


    // ==========================================
    // FIND DOCTOR
    // ==========================================

    const doctor =
        doctors.find(
            function (item) {

                return item.id === doctorId;

            }
        );


    // ==========================================
    // DOCTOR NOT FOUND
    // ==========================================

    if (!doctor) {

        document.querySelector(
            ".doctor-profile-page"
        ).innerHTML = `

            <div class="no-doctors">

                <h2>
                    Doctor not found
                </h2>

                <p>
                    The doctor profile you are
                    looking for does not exist.
                </p>

                <br>

                <a href="doctors.html">
                    Back to Doctors
                </a>

            </div>

        `;

    }


    // ==========================================
    // LOAD DOCTOR PROFILE
    // ==========================================

    else {


        document.getElementById(
            "profileImage"
        ).src =
            doctor.image;


        document.getElementById(
            "profileImage"
        ).alt =
            doctor.name;


        document.getElementById(
            "profileName"
        ).textContent =
            doctor.name;


        document.getElementById(
            "profileSpecialty"
        ).textContent =
            doctor.specialty;


        document.getElementById(
            "profileRating"
        ).textContent =
            doctor.rating;


        document.getElementById(
            "reviewRating"
        ).textContent =
            doctor.rating;


        document.getElementById(
            "profileLocation"
        ).textContent =
            doctor.location;


        document.getElementById(
            "profileFee"
        ).textContent =
            doctor.fee;


        document.getElementById(
            "profileExperience"
        ).textContent =
            doctor.experience;


        // ==========================================
        // ABOUT
        // ==========================================

        document.getElementById(
            "profileAbout"
        ).textContent =

            `${doctor.name} is an experienced ${
                doctor.specialty
            } specialist with ${
                doctor.experience
            } of professional medical experience. ` +

            `The doctor is committed to providing
            high-quality, patient-focused care
            and helping patients make informed
            healthcare decisions.`;



        // ==========================================
        // QUICK INFORMATION
        // ==========================================

        document.getElementById(
            "quickSpecialty"
        ).textContent =
            doctor.specialty;


        document.getElementById(
            "quickExperience"
        ).textContent =
            doctor.experience;


        document.getElementById(
            "quickLocation"
        ).textContent =
            doctor.location;


        document.getElementById(
            "quickFee"
        ).textContent =
            doctor.fee;



        // ==========================================
        // EDUCATION
        // ==========================================

        const education =
            document.getElementById(
                "profileEducation"
            );


        education.innerHTML = `

            <li>
                Doctor of Medicine (MD)
            </li>

            <li>
                Board Certified in ${doctor.specialty}
            </li>

            <li>
                Advanced Clinical Training
            </li>

        `;



        // ==========================================
        // CERTIFICATIONS
        // ==========================================

        const certifications =
            document.getElementById(
                "profileCertifications"
            );


        certifications.innerHTML = `

            <li>
                Board Certified Medical Specialist
            </li>

            <li>
                Advanced Patient Care Certification
            </li>

            <li>
                International Medical Association
            </li>

        `;



        // ==========================================
        // LANGUAGES
        // ==========================================

        const languages =
            document.getElementById(
                "profileLanguages"
            );


        languages.innerHTML = `

            <span class="language-item">
                English
            </span>

            <span class="language-item">
                Spanish
            </span>

        `;



        // ==========================================
        // AVAILABILITY
        // ==========================================

        const availability =
            document.getElementById(
                "availabilityContainer"
            );


        availability.innerHTML = `

            <div class="availability-item">

                <span>
                    Monday
                </span>

                <strong>
                    09:00 AM - 04:00 PM
                </strong>

            </div>


            <div class="availability-item">

                <span>
                    Tuesday
                </span>

                <strong>
                    10:00 AM - 05:00 PM
                </strong>

            </div>


            <div class="availability-item">

                <span>
                    Wednesday
                </span>

                <strong>
                    09:00 AM - 03:00 PM
                </strong>

            </div>


            <div class="availability-item">

                <span>
                    Thursday
                </span>

                <strong>
                    10:00 AM - 05:00 PM
                </strong>

            </div>

        `;



        // ==========================================
        // REVIEWS
        // ==========================================

        const reviews =
            document.getElementById(
                "reviewsContainer"
            );


        reviews.innerHTML = `

            <div class="review-item">

                <div class="review-user">

                    <strong>
                        Emma Wilson
                    </strong>

                    <span>
                        ⭐ 5.0
                    </span>

                </div>

                <p>
                    Excellent doctor. Very professional,
                    knowledgeable and attentive.
                </p>

            </div>


            <div class="review-item">

                <div class="review-user">

                    <strong>
                        Robert Davis
                    </strong>

                    <span>
                        ⭐ 4.9
                    </span>

                </div>

                <p>
                    Great experience. The doctor explained
                    everything clearly and made me feel
                    comfortable.
                </p>

            </div>


            <div class="review-item">

                <div class="review-user">

                    <strong>
                        Sophia Miller
                    </strong>

                    <span>
                        ⭐ 5.0
                    </span>

                </div>

                <p>
                    Highly recommended. Very caring and
                    professional healthcare service.
                </p>

            </div>

        `;


            // ==========================================
            // BOOK APPOINTMENT
           // ==========================================

             const bookButton =
                 document.getElementById(
                 "bookAppointmentBtn"
           );


            if (bookButton) {

             bookButton.addEventListener(
             "click",
              function () {

            window.location.href =
                `book-appointment.html?id=${doctor.id}`;

        }
    );

}


// CLOSE ELSE BLOCK
}


// CLOSE if (profileName)
}

// ==========================================
// BOOK APPOINTMENT SYSTEM
// ==========================================

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


if (appointmentForm) {


    // ==========================================
    // GET DOCTOR ID
    // ==========================================

    const bookingParams =
        new URLSearchParams(
            window.location.search
        );


    const bookingDoctorId =
        Number(
            bookingParams.get("id")
        );


    // ==========================================
    // FIND DOCTOR
    // ==========================================

    const bookingDoctor =
        doctors.find(
            function (item) {

                return item.id ===
                    bookingDoctorId;

            }
        );


    // ==========================================
    // DOCTOR NOT FOUND
    // ==========================================

    if (!bookingDoctor) {

        appointmentForm.innerHTML = `

            <div class="no-doctors">

                <h3>
                    Doctor not found
                </h3>

                <p>
                    Please return to the doctor
                    directory and try again.
                </p>

                <br>

                <a href="doctors.html">
                    Back to Doctors
                </a>

            </div>

        `;

    }


    // ==========================================
    // LOAD DOCTOR SUMMARY
    // ==========================================

    else {


        document.getElementById(
            "bookingDoctorImage"
        ).src =
            bookingDoctor.image;


        document.getElementById(
            "bookingDoctorImage"
        ).alt =
            bookingDoctor.name;


        document.getElementById(
            "bookingDoctorName"
        ).textContent =
            bookingDoctor.name;


        document.getElementById(
            "bookingDoctorSpecialty"
        ).textContent =
            bookingDoctor.specialty;


        document.getElementById(
            "bookingDoctorFee"
        ).textContent =
            bookingDoctor.fee;



        // ==========================================
        // DATE - MINIMUM TODAY
        // ==========================================

        const dateInput =
            document.getElementById(
                "appointmentDate"
            );


        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                today.getDate()
            ).padStart(
                2,
                "0"
            );


        const todayString =
            `${year}-${month}-${day}`;


        dateInput.min =
            todayString;



        // ==========================================
        // UPDATE SUMMARY
        // ==========================================

        const timeInput =
            document.getElementById(
                "appointmentTime"
            );


        const summaryDate =
            document.getElementById(
                "summaryDate"
            );


        const summaryTime =
            document.getElementById(
                "summaryTime"
            );


        const summaryType =
            document.getElementById(
                "summaryType"
            );



        dateInput.addEventListener(
            "change",
            function () {

                if (this.value) {

                    const selectedDate =
                        new Date(
                            this.value +
                            "T00:00:00"
                        );


                    summaryDate.textContent =
                        selectedDate.toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        );

                }

            }
        );



        timeInput.addEventListener(
            "change",
            function () {

                summaryTime.textContent =
                    this.value ||
                    "Not selected";

            }
        );



        const appointmentTypeInputs =
            document.querySelectorAll(
                'input[name="appointmentType"]'
            );


        appointmentTypeInputs.forEach(
            function (input) {

                input.addEventListener(
                    "change",
                    function () {

                        summaryType.textContent =
                            this.value;

                    }
                );

            }
        );



        // ==========================================
        // SUBMIT APPOINTMENT
        // ==========================================

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const date =
                    dateInput.value;


                const time =
                    timeInput.value;


                const reason =
                    document.getElementById(
                        "appointmentReason"
                    ).value.trim();


                const selectedType =
                    document.querySelector(
                        'input[name="appointmentType"]:checked'
                    );


                if (!selectedType) {

                    alert(
                        "Please select an appointment type."
                    );

                    return;

                }


                const appointment = {

                    id:
                        Date.now(),

                    doctorId:
                        bookingDoctor.id,

                    doctorName:
                        bookingDoctor.name,

                    specialty:
                        bookingDoctor.specialty,

                    doctorImage:
                        bookingDoctor.image,

                    fee:
                        bookingDoctor.fee,

                    date:
                        date,

                    time:
                        time,

                    type:
                        selectedType.value,

                    reason:
                        reason,

                    status:
                        "Upcoming",

                    createdAt:
                        new Date().toISOString()

                };



                // ==================================
                // GET EXISTING APPOINTMENTS
                // ==================================

                let appointments =
                    JSON.parse(
                        localStorage.getItem(
                            "appointments"
                        )
                    ) || [];



                // ==================================
                // SAVE APPOINTMENT
                // ==================================

                appointments.push(
                    appointment
                );


                localStorage.setItem(
                    "appointments",
                    JSON.stringify(
                        appointments
                    )
                );



                // ==================================
                // SUCCESS
                // ==================================

                alert(
                    "Appointment booked successfully!"
                );


                // Redirect

                window.location.href =
                    "dashboard.html";

            }
        );

    }

}


// ==========================================
// MY APPOINTMENTS PAGE
// ==========================================

const appointmentsContainer =
    document.getElementById(
        "appointmentsContainer"
    );


if (appointmentsContainer) {


    // ==========================================
    // GET APPOINTMENTS
    // ==========================================

    let appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];



    // ==========================================
    // CURRENT TAB
    // ==========================================

    let currentTab =
        "upcoming";



    // ==========================================
    // RENDER APPOINTMENTS
    // ==========================================

    function renderAppointments() {


        appointmentsContainer.innerHTML = "";


        // ------------------------------------------
        // FILTER APPOINTMENTS
        // ------------------------------------------

        let filteredAppointments =
            appointments.filter(
                function (appointment) {

                    return (
                        appointment.status
                            .toLowerCase() ===
                        currentTab
                    );

                }
            );


        // ------------------------------------------
        // EMPTY STATE
        // ------------------------------------------

        if (
            filteredAppointments.length === 0
        ) {

            appointmentsContainer.innerHTML = `

                <div class="empty-appointments">

                    <h2>
                        No ${currentTab}
                        appointments
                    </h2>

                    <p>
                        You don't have any
                        ${currentTab}
                        appointments at the moment.
                    </p>

                    <a href="doctors.html">
                        Find a Doctor
                    </a>

                </div>

            `;

            return;

        }



        // ------------------------------------------
        // CREATE CARDS
        // ------------------------------------------

        filteredAppointments.forEach(
            function (appointment) {


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "appointment-card";


                // ----------------------------------
                // STATUS CLASS
                // ----------------------------------

                let statusClass =
                    "status-upcoming";


                if (
                    appointment.status ===
                    "Completed"
                ) {

                    statusClass =
                        "status-completed";

                }


                if (
                    appointment.status ===
                    "Cancelled"
                ) {

                    statusClass =
                        "status-cancelled";

                }



                // ----------------------------------
                // FORMAT DATE
                // ----------------------------------

                let formattedDate =
                    appointment.date;


                if (appointment.date) {

                    const date =
                        new Date(
                            appointment.date +
                            "T00:00:00"
                        );


                    formattedDate =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        );

                }



                // ----------------------------------
                // CARD HTML
                // ----------------------------------

                card.innerHTML = `

                    <div class="appointment-card-top">


                        <div class="appointment-doctor">

                            <img
                                src="${appointment.doctorImage}"
                                alt="${appointment.doctorName}"
                            >


                            <div>

                                <h2>
                                    ${appointment.doctorName}
                                </h2>

                                <p>
                                    ${appointment.specialty}
                                </p>

                                <div class="appointment-location">
                                    Medical Specialist
                                </div>

                            </div>

                        </div>


                        <span
                            class="appointment-status ${statusClass}"
                        >
                            ${appointment.status}
                        </span>


                    </div>



                    <div class="appointment-details">


                        <div class="appointment-detail">

                            <span>
                                Date
                            </span>

                            <strong>
                                ${formattedDate}
                            </strong>

                        </div>


                        <div class="appointment-detail">

                            <span>
                                Time
                            </span>

                            <strong>
                                ${appointment.time}
                            </strong>

                        </div>


                        <div class="appointment-detail">

                            <span>
                                Appointment Type
                            </span>

                            <strong>
                                ${appointment.type}
                            </strong>

                        </div>


                        <div class="appointment-detail">

                            <span>
                                Consultation Fee
                            </span>

                            <strong>
                                ${appointment.fee}
                            </strong>

                        </div>


                    </div>



                    <div class="appointment-actions">


                        <button
                            class="appointment-action"
                            data-action="details"
                            data-id="${appointment.id}"
                        >
                            View Details
                        </button>


                        ${
                            appointment.status ===
                            "Upcoming"

                                ? `

                                <button
                                    class="appointment-action cancel-appointment"
                                    data-action="cancel"
                                    data-id="${appointment.id}"
                                >
                                    Cancel Appointment
                                </button>

                                `

                                : ""

                        }


                    </div>

                `;


                appointmentsContainer.appendChild(
                    card
                );

            }
        );

    }



    // ==========================================
    // TAB SYSTEM
    // ==========================================

    const appointmentTabs =
        document.querySelectorAll(
            ".appointment-tab"
        );


    appointmentTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {


                    appointmentTabs.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    currentTab =
                        this.dataset.tab;


                    renderAppointments();

                }
            );

        }
    );



    // ==========================================
    // APPOINTMENT ACTIONS
    // ==========================================

    appointmentsContainer.addEventListener(
        "click",
        function (event) {


            const button =
                event.target.closest(
                    ".appointment-action"
                );


            if (!button) {

                return;

            }


            const appointmentId =
                Number(
                    button.dataset.id
                );


            const action =
                button.dataset.action;



            // ==================================
            // VIEW DETAILS
            // ==================================

            if (
                 action ===
                 "details"

              ) {

              window.location.href =
               `appointment-details.html?id=${appointmentId}`;

         }

            // ==================================
            // CANCEL APPOINTMENT
            // ==================================

            if (
                action ===
                "cancel"
            ) {


                const confirmed =
                    confirm(
                        "Are you sure you want to cancel this appointment?"
                    );


                if (!confirmed) {

                    return;

                }


                appointments =
                    appointments.map(
                        function (item) {


                            if (
                                item.id ===
                                appointmentId
                            ) {

                                return {

                                    ...item,

                                    status:
                                        "Cancelled"

                                };

                            }


                            return item;

                        }
                    );



                // SAVE UPDATED DATA

                localStorage.setItem(
                    "appointments",
                    JSON.stringify(
                        appointments
                    )
                );


                // REFRESH PAGE DATA

                renderAppointments();

            }

        }
    );



    // ==========================================
    // INITIAL RENDER
    // ==========================================

    renderAppointments();

}


// ==========================================
// APPOINTMENT DETAILS PAGE
// ==========================================

const appointmentStatus =
    document.getElementById(
        "appointmentStatus"
    );


if (appointmentStatus) {


    // ==========================================
    // GET APPOINTMENT ID
    // ==========================================

    const detailsParams =
        new URLSearchParams(
            window.location.search
        );


    const appointmentId =
        Number(
            detailsParams.get("id")
        );


    // ==========================================
    // GET APPOINTMENTS
    // ==========================================

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    // ==========================================
    // FIND APPOINTMENT
    // ==========================================

    const appointment =
        appointments.find(
            function (item) {

                return (
                    item.id ===
                    appointmentId
                );

            }
        );


    // ==========================================
    // APPOINTMENT NOT FOUND
    // ==========================================

    if (!appointment) {


        document.querySelector(
            ".appointment-details-main"
        ).innerHTML = `

            <div class="details-card">

                <h2>
                    Appointment Not Found
                </h2>

                <p>
                    The appointment you are looking
                    for could not be found.
                </p>

                <br>

                <a href="appointments.html">
                    Back to Appointments
                </a>

            </div>

        `;


        document.querySelector(
            ".appointment-details-sidebar"
        ).style.display =
            "none";


    }


    // ==========================================
    // LOAD APPOINTMENT
    // ==========================================

    else {


        // ======================================
        // DOCTOR
        // ======================================

        document.getElementById(
            "detailsDoctorImage"
        ).src =
            appointment.doctorImage;


        document.getElementById(
            "detailsDoctorImage"
        ).alt =
            appointment.doctorName;


        document.getElementById(
            "detailsDoctorName"
        ).textContent =
            appointment.doctorName;


        document.getElementById(
            "detailsDoctorSpecialty"
        ).textContent =
            appointment.specialty;



        // ======================================
        // DATE
        // ======================================

        let formattedDate =
            appointment.date;


        if (appointment.date) {

            const date =
                new Date(
                    appointment.date +
                    "T00:00:00"
                );


            formattedDate =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                );

        }


        document.getElementById(
            "detailsDate"
        ).textContent =
            formattedDate;



        // ======================================
        // TIME
        // ======================================

        document.getElementById(
            "detailsTime"
        ).textContent =
            appointment.time;



        // ======================================
        // TYPE
        // ======================================

        document.getElementById(
            "detailsType"
        ).textContent =
            appointment.type;



        // ======================================
        // FEE
        // ======================================

        document.getElementById(
            "detailsFee"
        ).textContent =
            appointment.fee;



        // ======================================
        // REASON
        // ======================================

        document.getElementById(
            "detailsReason"
        ).textContent =
            appointment.reason;



        // ======================================
        // STATUS
        // ======================================

        const statusElements = [

            document.getElementById(
                "appointmentStatus"
            ),

            document.getElementById(
                "detailsStatus"
            )

        ];


        statusElements.forEach(
            function (element) {

                element.textContent =
                    appointment.status;


                element.classList.remove(
                    "status-upcoming",
                    "status-completed",
                    "status-cancelled"
                );


                if (
                    appointment.status ===
                    "Upcoming"
                ) {

                    element.classList.add(
                        "status-upcoming"
                    );

                }


                else if (
                    appointment.status ===
                    "Completed"
                ) {

                    element.classList.add(
                        "status-completed"
                    );

                }


                else if (
                    appointment.status ===
                    "Cancelled"
                ) {

                    element.classList.add(
                        "status-cancelled"
                    );

                }

            }
        );



        // ======================================
        // CANCEL BUTTON
        // ======================================

        const cancelButton =
            document.getElementById(
                "cancelAppointmentBtn"
            );


        if (
            appointment.status !==
            "Upcoming"
        ) {

            cancelButton.style.display =
                "none";

        }


        else {


            cancelButton.addEventListener(
                "click",
                function () {


                    const confirmed =
                        confirm(
                            "Are you sure you want to cancel this appointment?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    // UPDATE STATUS

                    const updatedAppointments =
                        appointments.map(
                            function (item) {

                                if (
                                    item.id ===
                                    appointment.id
                                ) {

                                    return {

                                        ...item,

                                        status:
                                            "Cancelled"

                                    };

                                }


                                return item;

                            }
                        );


                    // SAVE

                    localStorage.setItem(
                        "appointments",
                        JSON.stringify(
                            updatedAppointments
                        )
                    );


                    // RELOAD PAGE

                    window.location.reload();

                }
            );

        }

    }

}

// ==========================================
// DASHBOARD UPCOMING APPOINTMENTS
// ==========================================

const dashboardAppointments =
    document.getElementById(
        "dashboardAppointments"
    );


if (dashboardAppointments) {


    // ==========================================
    // GET APPOINTMENTS FROM LOCAL STORAGE
    // ==========================================

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    // ==========================================
    // GET UPCOMING APPOINTMENTS
    // ==========================================

    const upcomingAppointments =
        appointments.filter(
            function (appointment) {

                return (
                    appointment.status ===
                    "Upcoming"
                );

            }
        );


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (
        upcomingAppointments.length === 0
    ) {

        dashboardAppointments.innerHTML = `

            <div class="dashboard-no-appointments">

                <div class="empty-icon">
                    📅
                </div>

                <h3>
                    No upcoming appointments
                </h3>

                <p>
                    You don't have any
                    appointments scheduled.
                </p>

                <a href="doctors.html">
                    Book an Appointment
                </a>

            </div>

        `;

    }


    // ==========================================
    // SHOW UPCOMING APPOINTMENTS
    // ==========================================

    else {


        upcomingAppointments.forEach(
            function (appointment) {


                // ==================================
                // FORMAT DATE
                // ==================================

                let formattedDate =
                    appointment.date;


                if (appointment.date) {

                    const date =
                        new Date(
                            appointment.date +
                            "T00:00:00"
                        );


                    formattedDate =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        );

                }


                // ==================================
                // CREATE CARD
                // ==================================

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "dashboard-appointment-card";


                card.innerHTML = `

                    <div class="dashboard-appointment-doctor">

                        <img
                            src="${appointment.doctorImage}"
                            alt="${appointment.doctorName}"
                        >

                        <div>

                            <h3>
                                ${appointment.doctorName}
                            </h3>

                            <p>
                                ${appointment.specialty}
                            </p>

                        </div>

                    </div>



                    <div class="dashboard-appointment-info">


                        <div
                            class="dashboard-appointment-info-item"
                        >

                            <span>
                                Date
                            </span>

                            <strong>
                                ${formattedDate}
                            </strong>

                        </div>


                        <div
                            class="dashboard-appointment-info-item"
                        >

                            <span>
                                Time
                            </span>

                            <strong>
                                ${appointment.time}
                            </strong>

                        </div>


                        <div
                            class="dashboard-appointment-info-item"
                        >

                            <span>
                                Type
                            </span>

                            <strong>
                                ${appointment.type}
                            </strong>

                        </div>


                        <span
                            class="dashboard-appointment-status status-upcoming"
                        >
                            Upcoming
                        </span>


                        <a
                            href="appointment-details.html?id=${appointment.id}"
                            class="dashboard-appointment-view"
                        >
                            View
                        </a>


                    </div>

                `;


                dashboardAppointments.appendChild(
                    card
                );

            }
        );

    }

}

// ==========================================
// PROFILE PAGE - LOAD USER DATA
// ==========================================

const profileForm =
    document.getElementById("profileForm");


if (profileForm) {

    // ==========================================
    // GET CURRENT USER
    // ==========================================

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    // ==========================================
    // USER NOT LOGGED IN
    // ==========================================

    if (!currentUser) {

        window.location.href =
            "login.html";

    }


    // ==========================================
    // LOAD USER DATA
    // ==========================================

    else {

        const fullName =
            currentUser.name || "";


        const email =
            currentUser.email || "";


        const phone =
            currentUser.phone || "";


        const dob =
            currentUser.dob || "";


        const gender =
            currentUser.gender || "";


        const address =
            currentUser.address || "";


        // ======================================
        // PROFILE SUMMARY
        // ======================================

        document.getElementById(
            "profileDisplayName"
        ).textContent =
            fullName || "User";


        document.getElementById(
            "profileDisplayEmail"
        ).textContent =
            email || "No email";


        // ======================================
        // AVATAR LETTER
        // ======================================

        document.getElementById(
            "profileAvatarLetter"
        ).textContent =
            fullName
                ? fullName
                    .charAt(0)
                    .toUpperCase()
                : "U";


        // ======================================
        // FORM VALUES
        // ======================================

        document.getElementById(
            "profileFullName"
        ).value =
            fullName;


        document.getElementById(
            "profileEmail"
        ).value =
            email;


        document.getElementById(
            "profilePhone"
        ).value =
            phone;


        document.getElementById(
            "profileDob"
        ).value =
            dob;


        document.getElementById(
            "profileGender"
        ).value =
            gender;


        document.getElementById(
            "profileAddress"
        ).value =
            address;

    }

}

// ==========================================
// PROFILE PAGE - SAVE CHANGES
// ==========================================

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ==========================================
            // GET CURRENT USER
            // ==========================================

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "currentUser"
                    )
                );


            if (!currentUser) {

                window.location.href =
                    "login.html";

                return;

            }


            // ==========================================
            // GET FORM VALUES
            // ==========================================

            const updatedName =
                document.getElementById(
                    "profileFullName"
                ).value.trim();


            const updatedEmail =
                document.getElementById(
                    "profileEmail"
                ).value.trim();


            const updatedPhone =
                document.getElementById(
                    "profilePhone"
                ).value.trim();


            const updatedDob =
                document.getElementById(
                    "profileDob"
                ).value;


            const updatedGender =
                document.getElementById(
                    "profileGender"
                ).value;


            const updatedAddress =
                document.getElementById(
                    "profileAddress"
                ).value.trim();


            // ==========================================
            // VALIDATION
            // ==========================================

            if (!updatedName) {

                alert(
                    "Please enter your full name."
                );

                return;

            }


            if (!updatedEmail) {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            // ==========================================
            // UPDATE CURRENT USER
            // ==========================================

            currentUser.name =
                updatedName;

            currentUser.email =
                updatedEmail;

            currentUser.phone =
                updatedPhone;

            currentUser.dob =
                updatedDob;

            currentUser.gender =
                updatedGender;

            currentUser.address =
                updatedAddress;


            // ==========================================
            // SAVE CURRENT USER
            // ==========================================

            localStorage.setItem(
                "currentUser",
                JSON.stringify(
                    currentUser
                )
            );


            // ==========================================
            // UPDATE REGISTERED USERS
            // ==========================================

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "users"
                    )
                ) || [];


            const updatedUsers =
                users.map(
                    function (user) {

                        if (
                            user.email ===
                            currentUser.email
                        ) {

                            return currentUser;

                        }


                        return user;

                    }
                );


            localStorage.setItem(
                "users",
                JSON.stringify(
                    updatedUsers
                )
            );


            // ==========================================
            // UPDATE PROFILE SUMMARY
            // ==========================================

            document.getElementById(
                "profileDisplayName"
            ).textContent =
                updatedName;


            document.getElementById(
                "profileDisplayEmail"
            ).textContent =
                updatedEmail;


            document.getElementById(
                "profileAvatarLetter"
            ).textContent =
                updatedName
                    .charAt(0)
                    .toUpperCase();


            // ==========================================
            // SUCCESS MESSAGE
            // ==========================================

            alert(
                "Profile updated successfully."
            );

        }
    );


    // ==========================================
    // CANCEL BUTTON
    // ==========================================

    const profileCancelBtn =
        document.getElementById(
            "profileCancelBtn"
        );


    if (profileCancelBtn) {

        profileCancelBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );

    }

}

// ==========================================
// DASHBOARD USER INFORMATION
// ==========================================

const userNameElement =
    document.getElementById("userName");

const avatarLetterElement =
    document.getElementById("avatarLetter");

const dashboardNameElement =
    document.getElementById("dashboardName");

const dashboardEmailElement =
    document.getElementById("dashboardEmail");


// ==========================================
// GET CURRENT USER
// ==========================================

const dashboardUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


// ==========================================
// DISPLAY USER INFORMATION
// ==========================================

if (dashboardUser) {

    const name =
        dashboardUser.name || "User";

    const email =
        dashboardUser.email || "No email";


    // ======================================
    // WELCOME NAME
    // ======================================

    if (userNameElement) {

        userNameElement.textContent =
            name;

    }


    // ======================================
    // AVATAR LETTER
    // ======================================

    if (avatarLetterElement) {

        avatarLetterElement.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }


    // ======================================
    // ACCOUNT NAME
    // ======================================

    if (dashboardNameElement) {

        dashboardNameElement.textContent =
            name;

    }


    // ======================================
    // ACCOUNT EMAIL
    // ======================================

    if (dashboardEmailElement) {

        dashboardEmailElement.textContent =
            email;

    }

}

// ==========================================
// MEDICAL RECORDS SYSTEM
// ==========================================

const medicalRecordsList =
    document.querySelector(
        ".medical-records-list"
    );


if (medicalRecordsList) {

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    // ==========================================
    // CHECK CURRENT USER
    // ==========================================

    if (!currentUser) {

        window.location.href =
            "login.html";

    } else {

        // ==========================================
        // SAMPLE MEDICAL RECORDS
        // ==========================================

        const medicalRecords = [

            {
                type: "Diagnosis",
                icon: "🩺",
                title:
                    "General Medical Consultation",
                description:
                    "Routine health consultation and medical assessment.",
                date:
                    "August 10, 2026",
                status:
                    "Completed"
            },

            {
                type: "Laboratory",
                icon: "🧪",
                title:
                    "Blood Test",
                description:
                    "Routine blood examination and laboratory analysis.",
                date:
                    "August 8, 2026",
                status:
                    "Completed"
            },

            {
                type: "Prescription",
                icon: "💊",
                title:
                    "Medication Prescription",
                description:
                    "Prescription issued following doctor consultation.",
                date:
                    "August 5, 2026",
                status:
                    "Active"
            },

            {
                type: "Visit",
                icon: "📅",
                title:
                    "Doctor Visit",
                description:
                    "Previous doctor appointment and consultation history.",
                date:
                    "August 2, 2026",
                status:
                    "Completed"
            }

        ];


        // ==========================================
        // DISPLAY MEDICAL RECORDS
        // ==========================================

        medicalRecordsList.innerHTML = "";


        medicalRecords.forEach(
            function (record) {

                const recordCard =
                    document.createElement(
                        "div"
                    );

                recordCard.className =
                    "medical-record-card";


                recordCard.innerHTML = `

    <div class="medical-record-icon">
        ${record.icon}
    </div>

    <div class="medical-record-info">

        <h3>
            ${record.title}
        </h3>

        <p>
            ${record.description}
        </p>

        <span>
            Date: ${record.date}
        </span>

    </div>

    <div class="medical-record-status">
        ${record.status}
    </div>

<a
    href="medical-record-details.html?type=${record.type}"
    class="medical-record-view-btn"
>
    View Details
</a>

`;


                medicalRecordsList.appendChild(
                    recordCard
                );

            }
        );

    }

}