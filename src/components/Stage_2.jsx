import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Component.css";

const Stage_2 = ({ userInfo, setUserInfo }) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // regex for validation
    const patterns = {
        departureDate: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
        returnDate: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD
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
        navigate('/stage-3');
    };

    return (
        <div className="stage1-container">
            <div className="form-card">
                <h2 className="form-title">Travel Preferences</h2>
                <form onSubmit={handleNext} className="form-content">

                    {/* Departure Date */}
                    <div className="form-group">
                        <label>Departure Date</label>
                        <input
                            type="date"
                            name="departureDate"
                            value={userInfo.departureDate || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.departureDate && <p className="error-text">{errors.departureDate}</p>}
                    </div>

                    {/* Return Date */}
                    <div className="form-group">
                        <label>Return Date</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={userInfo.returnDate || ""}
                            onChange={handleChange}
                            required
                        />
                        {errors.returnDate && <p className="error-text">{errors.returnDate}</p>}
                    </div>

                    {/* Accommodation Preference */}
                    <div className="form-group">
                        <label>Accommodation Preference</label>
                        <select
                            name="accommodationPreference"
                            value={userInfo.accommodationPreference || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="SpaceHotel">Space Hotel</option>
                            <option value="MartianBase">Martian Base</option>
                        </select>
                    </div>

                    {/* Special Requests or Preferences */}
                    <div className="form-group">
                        <label>Special Requests or Preferences</label>
                        <textarea
                            name="specialRequests"
                            value={userInfo.specialRequests || ""}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/')}>Back</button>
                        <button type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Stage_2;
