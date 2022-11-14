import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:4000";

const getInitialFormData = () => ({
  firstName: "",
  lastName: "",
  supervisor: "",
  email: "",
  phoneNumber: "",
});

function NotificationForm({ showAlert }) {
  const [supervisors, updateSupervisors] = useState([]);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPhoneNumberInput, setPhoneNumberInput] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData());

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    fetch(`${BASE_URL}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          showAlert({ show: true, message: data.message, error: true });
        } else {
          setFormData(getInitialFormData());
          showAlert({ show: true, message: data.message, error: false });
        }
      })
      .catch((err) => {
        console.log(err, "ERROR");
        showAlert({ show: true, message: err.message, error: true });
      });
  };

  const getSupervisors = async () => {
    fetch(`${BASE_URL}/api/supervisors`)
      .then((res) => res.json())
      .then((data) => {
        updateSupervisors(data.data);
      })
      .catch((err) => {
        console.log(err, "ERROR");
      });
  };

  useEffect(() => {
    getSupervisors();
  }, []);

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="field-container column">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field-container column">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="field-container column">
          <div className="a-center">
            <input
              type="checkbox"
              checked={showEmailInput}
              onChange={() => {
                setShowEmailInput(!showEmailInput);
              }}
            />
            <label htmlFor="email">Email</label>
          </div>
          {showEmailInput && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="field-container column">
          <div className="a-center">
            <input
              type="checkbox"
              checked={showPhoneNumberInput}
              onChange={() => {
                setPhoneNumberInput(!showPhoneNumberInput);
              }}
            />
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
          {showPhoneNumberInput && (
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          )}
        </div>
      </div>

      <div className="row j-center">
        <div className="field-container column">
          <label htmlFor="supervisor">Supervisor</label>
          <select
            value={formData.supervisor}
            name="supervisor"
            onChange={handleChange}
            required
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((supervisor) => (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row j-center">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default NotificationForm;
