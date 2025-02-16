import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Component.css";

const Stage_1 = ({ userInfo = {}, setUserInfo }) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // regex pattern for validation
    const patterns = {
        fullName: /^[a-zA-Z\s]{3,}$/,       // 3 characters, only letters and spaces
        dateOfBirth: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD 
        nationality: /^[a-zA-Z\s]{2,}$/,    // 2 characters, only letters
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email format
        phone: /^\+?[0-9]{7,15}$/          // 7 to 15 digits, optional leading +
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));

        // input validation
        if (patterns[name] && !patterns[name].test(value)) {
            setErrors((prev) => ({ ...prev, [name]: `Invalid ${name}` }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        const validationErrors = {};

        Object.keys(patterns).forEach((key) => {
            if (!patterns[key].test(userInfo[key] || "")) {
                validationErrors[key] = `Invalid ${key}`;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/stage-2");
    };

    return (
        <div className="stage1-container">
            <div className="form-card">
                <h2 className="form-title">Personal Information</h2>
                <form onSubmit={handleNext} className="form-content">
                    {/* Full Name */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={userInfo.fullName || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                    </div>

                    {/* DOB */}
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={userInfo.dateOfBirth || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
                    </div>

                    {/* Nationality */}
                    <div className="form-group">
                        <label>Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            value={userInfo.nationality || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.nationality && <p className="error-text">{errors.nationality}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userInfo.phone || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="form-actions">
                        <button type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Stage_1;
