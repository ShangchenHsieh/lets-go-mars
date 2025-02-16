import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Component.css";

const Stage_3 = ({ userInfo, setUserInfo }) => {
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");  // State for success message
    const navigate = useNavigate();

    // Regex for validating phone number and emergency contact fields
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation function
    const validate = () => {
        const newErrors = {};

        if (!userInfo.healthDeclaration) {
            newErrors.healthDeclaration = "This field is required.";
        }

        if (!userInfo.emergencyContact || !phoneRegex.test(userInfo.emergencyContact)) {
            newErrors.emergencyContact = "Valid emergency contact number is required.";
        }

        if (userInfo.email && !emailRegex.test(userInfo.email)) {
            newErrors.email = "Please provide a valid email address.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = () => {
        if (validate()) {

            // log userInfo to console, can be replaced with a POST api call
            console.log(userInfo);
            setSuccessMessage("Application submitted successfully!");

        }
    };

    return (
        <div className="stage1-container">
            <div className="form-card">
                <h2 className="form-title">Health & Safety</h2>
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="healthDeclaration">Health Declaration</label>
                        <select
                            id="healthDeclaration"
                            value={userInfo.healthDeclaration}
                            onChange={(e) => setUserInfo({ ...userInfo, healthDeclaration: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {errors.healthDeclaration && <p className="error-text">{errors.healthDeclaration}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="emergencyContact">Emergency Contact Number</label>
                        <input
                            type="text"
                            id="emergencyContact"
                            value={userInfo.emergencyContact}
                            onChange={(e) => setUserInfo({ ...userInfo, emergencyContact: e.target.value })}
                            placeholder="Enter a valid phone number"
                        />
                        {errors.emergencyContact && <p className="error-text">{errors.emergencyContact}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="medical">Medical Condition (Optional)</label>
                        <input
                            type="medical"
                            id="medical"
                            value={userInfo.medical}
                            onChange={(e) => setUserInfo({ ...userInfo, medical: e.target.value })}
                            placeholder="Enter your medical condition"
                        />
                        {errors.medical && <p className="error-text">{errors.medical}</p>}
                    </div>


                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <div className="form-actions">
                        <button
                            type="button"
                            className="bg-gray-300 text-white-700 px-4 py-2 rounded"
                            onClick={() => navigate('/stage-2')}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 text-white px-4 py-2 rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stage_3;
