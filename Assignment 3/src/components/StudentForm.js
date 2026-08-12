import React, { useState } from "react";

function StudentForm() {
  const subjectsList = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
  ];

  const hobbies = [
    "Music",
    "Sports",
    "Reading",
    "Gaming",
    "Travel",
  ];

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    subjects: [],
    hobby: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => {
      const selected = prev.subjects.includes(subject);

      return {
        ...prev,
        subjects: selected
          ? prev.subjects.filter((item) => item !== subject)
          : [...prev.subjects, subject],
      };
    });

    setErrors((prev) => ({
      ...prev,
      subjects: "",
    }));

    setSubmitted(false);
  };

  const handleHobbyChange = (hobby) => {
    setFormData((prev) => ({
      ...prev,
      hobby,
    }));

    setErrors((prev) => ({
      ...prev,
      hobby: "",
    }));

    setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else {
      const age = Number(formData.age);

      if (age < 16 || age > 100) {
        newErrors.age = "Age must be between 16 and 100.";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course.";
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects =
        "Please select at least one subject.";
    }

    if (!formData.hobby) {
      newErrors.hobby = "Please select a hobby.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address =
        "Address must contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setSubmitted(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>S</div>

          <div>
            <h1 style={styles.title}>
              Student Registration
            </h1>

            <p style={styles.subtitle}>
              Complete the form below to register.
            </p>
          </div>
        </div>

        {/* Success */}
        {submitted && (
          <div style={styles.success}>
            <div style={styles.successIcon}>✓</div>

            <div>
              <strong>
                Registration successful!
              </strong>

              <p style={styles.successText}>
                Your student registration has been
                submitted successfully.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>
              Full Name <span style={styles.required}>*</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
            />

            {errors.name && (
              <p style={styles.error}>
                ⚠ {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>
              Email <span style={styles.required}>*</span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
            />

            {errors.email && (
              <p style={styles.error}>
                ⚠ {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div style={styles.field}>
            <label style={styles.label}>
              Phone Number{" "}
              <span style={styles.required}>*</span>
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /\D/g,
                  ""
                );

                setFormData((prev) => ({
                  ...prev,
                  phone: value,
                }));

                setErrors((prev) => ({
                  ...prev,
                  phone: "",
                }));

                setSubmitted(false);
              }}
              placeholder="Enter 10 digit phone number"
              maxLength={10}
              style={{
                ...styles.input,
                ...(errors.phone ? styles.inputError : {}),
              }}
            />

            {errors.phone && (
              <p style={styles.error}>
                ⚠ {errors.phone}
              </p>
            )}
          </div>

          {/* Age */}
          <div style={styles.field}>
            <label style={styles.label}>
              Age <span style={styles.required}>*</span>
            </label>

            <input
              type="number"
              name="age"
              min="16"
              max="100"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              style={{
                ...styles.input,
                ...(errors.age ? styles.inputError : {}),
              }}
            />

            {errors.age && (
              <p style={styles.error}>
                ⚠ {errors.age}
              </p>
            )}
          </div>

          {/* Gender */}
          <div style={styles.field}>
            <label style={styles.label}>
              Gender <span style={styles.required}>*</span>
            </label>

            <div style={styles.optionGroup}>
              {["Male", "Female", "Other"].map(
                (gender) => (
                  <label
                    key={gender}
                    style={{
                      ...styles.radioOption,
                      ...(formData.gender === gender
                        ? styles.selectedOption
                        : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={
                        formData.gender === gender
                      }
                      onChange={handleChange}
                    />

                    <span>{gender}</span>
                  </label>
                )
              )}
            </div>

            {errors.gender && (
              <p style={styles.error}>
                ⚠ {errors.gender}
              </p>
            )}
          </div>

          {/* Course */}
          <div style={styles.field}>
            <label style={styles.label}>
              Course <span style={styles.required}>*</span>
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.course ? styles.inputError : {}),
              }}
            >
              <option value="">
                Select your course
              </option>

              <option value="BCA">
                BCA
              </option>

              <option value="BBA">
                BBA
              </option>

              <option value="BCom">
                B.Com
              </option>

              <option value="BE">
                Engineering
              </option>

              <option value="BSc">
                B.Sc
              </option>
            </select>

            {errors.course && (
              <p style={styles.error}>
                ⚠ {errors.course}
              </p>
            )}
          </div>

          {/* Subjects */}
          <div style={styles.field}>
            <label style={styles.label}>
              Subjects{" "}
              <span style={styles.required}>*</span>
            </label>

            <p style={styles.helper}>
              Select at least one subject.
            </p>

            <div style={styles.optionGrid}>
              {subjectsList.map((subject) => {
                const selected =
                  formData.subjects.includes(subject);

                return (
                  <label
                    key={subject}
                    style={{
                      ...styles.checkboxOption,
                      ...(selected
                        ? styles.selectedOption
                        : {}),
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        handleSubjectChange(
                          subject
                        )
                      }
                    />

                    <span>
                      {subject}
                    </span>
                  </label>
                );
              })}
            </div>

            {errors.subjects && (
              <p style={styles.error}>
                ⚠ {errors.subjects}
              </p>
            )}
          </div>

          {/* Hobby */}
          <div style={styles.field}>
            <label style={styles.label}>
              Hobby <span style={styles.required}>*</span>
            </label>

            <div style={styles.optionGrid}>
              {hobbies.map((hobby) => {
                const selected =
                  formData.hobby === hobby;

                return (
                  <button
                    type="button"
                    key={hobby}
                    onClick={() =>
                      handleHobbyChange(hobby)
                    }
                    style={{
                      ...styles.hobbyButton,
                      ...(selected
                        ? styles.selectedHobby
                        : {}),
                    }}
                  >
                    {selected && "✓ "}
                    {hobby}
                  </button>
                );
              })}
            </div>

            {errors.hobby && (
              <p style={styles.error}>
                ⚠ {errors.hobby}
              </p>
            )}
          </div>

          {/* Address */}
          <div style={styles.field}>
            <label style={styles.label}>
              Address{" "}
              <span style={styles.required}>*</span>
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows={4}
              style={{
                ...styles.input,
                ...(errors.address
                  ? styles.inputError
                  : {}),
                resize: "vertical",
              }}
            />

            {errors.address && (
              <p style={styles.error}>
                ⚠ {errors.address}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div style={styles.buttonContainer}>

            <button
              type="button"
              onClick={clearForm}
              style={styles.clearButton}
            >
              Clear Form
            </button>

            <button
              type="submit"
              style={styles.submitButton}
            >
              Submit Registration
              <span style={styles.arrow}>→</span>
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
    padding: "36px",
    background: "#ffffff",
    borderRadius: "22px",
    boxShadow:
      "0 20px 50px rgba(30, 41, 59, 0.10)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },

  logo: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #7c3aed, #4f46e5)",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "800",
  },

  title: {
    margin: 0,
    color: "#172033",
    fontSize: "30px",
    fontWeight: "750",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  field: {
    marginBottom: "24px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#263247",
    fontSize: "14px",
    fontWeight: "650",
  },

  required: {
    color: "#dc2626",
  },

  helper: {
    margin: "-2px 0 10px",
    color: "#94a3b8",
    fontSize: "12px",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    border: "1px solid #d8dee9",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#172033",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },

  inputError: {
    border: "1px solid #ef4444",
    background: "#fffafa",
  },

  optionGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  radioOption: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "10px 15px",
    border: "1px solid #d8dee9",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#475569",
    fontSize: "14px",
  },

  selectedOption: {
    background: "#f1edff",
    border: "1px solid #7c3aed",
    color: "#5b21b6",
  },

  optionGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  checkboxOption: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 15px",
    border: "1px solid #d8dee9",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#475569",
    fontSize: "14px",
  },

  hobbyButton: {
    padding: "11px 17px",
    border: "1px solid #d8dee9",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#475569",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },

  selectedHobby: {
    background: "#7c3aed",
    borderColor: "#7c3aed",
    color: "#ffffff",
  },

  error: {
    margin: "7px 0 0",
    color: "#dc2626",
    fontSize: "12px",
  },

  success: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    padding: "15px",
    border: "1px solid #bbf7d0",
    borderRadius: "12px",
    background: "#f0fdf4",
    color: "#166534",
  },

  successIcon: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#ffffff",
    fontWeight: "700",
  },

  successText: {
    margin: "3px 0 0",
    color: "#15803d",
    fontSize: "12px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #edf0f5",
  },

  clearButton: {
    padding: "12px 20px",
    border: "1px solid #d8dee9",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#475569",
    cursor: "pointer",
    fontWeight: "600",
  },

  submitButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #7c3aed, #4f46e5)",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "650",
    boxShadow:
      "0 7px 18px rgba(79, 70, 229, 0.22)",
  },

  arrow: {
    fontSize: "17px",
  },
};

export default StudentForm;