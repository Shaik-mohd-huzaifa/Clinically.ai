import { useState } from "react";
import "./appointment.styles.scss";
import axios from "axios";

const options = {
  appointmentTypes: [
    { id: 1, name: "Consulting" },
    { id: 2, name: "Follow-up" },
    { id: 3, name: "Routine Checkup" },
    { id: 4, name: "Emergency" }
  ],
  departments: [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Dermatology" },
    { id: 3, name: "Neurology" },
    { id: 4, name: "Pediatrics" },
    { id: 5, name: "Orthopedics" }
  ]
};

export const Appointments = () => {
  const [modal, setModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [appointment_details, setAppointmentDetails] = useState({
    patient_name: "",
    patient_age: 0,
    patient_bloodGroup: "",
    type: "default",
    department: "default"
  });

  function HandleInputValueChange(e) {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointment_details,
      [name]: value
    });
  }

  async function handleAppointmentSubmission() {
    setCreating(true); // Start the creating state
    try {
      const res = await axios.post("http://127.0.0.1:5000/appointmentCreation", {
        message: appointment_details
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false); // Stop the creating state
    }
    setModal(!modal);
  }

  function HandleAppointmentButton() {
    setModal(!modal);
  }

  return (
    <div className="appointment-container">
      <h2>Clinically.ai</h2>
      <div className="header">
        <h3>Appointments</h3>
        <button onClick={HandleAppointmentButton}>Create Appointment</button>
      </div>
      <div className="appointment-list-container">
        <div className="appointment">
          <p className="patient-name">John F Kennedy</p>
          <p className="appointment-type">Type: Consulting</p>
          <p className="department">Department: Cardiologist</p>
          <div className="appointment-footer">
            <p className="appointment-date">19-02-2004</p>
            <button>Details</button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="book-appointment-container">
          <div className="book-appointment">
            <h2>Create Appointment</h2>
            <div className="input-container">
              <label htmlFor="patient_name">
                Patient Name
                <input
                  type="text"
                  name="patient_name"
                  value={appointment_details.patient_name}
                  onChange={HandleInputValueChange}
                  required
                />
              </label>
              <label htmlFor="patient_bloodGroup">
                Patient Blood Group
                <input
                  type="text"
                  name="patient_bloodGroup"
                  value={appointment_details.patient_bloodGroup}
                  onChange={HandleInputValueChange}
                  required
                />
              </label>
              <label htmlFor="patient_age">
                Patient Age
                <input
                  type="number"
                  name="patient_age"
                  value={appointment_details.patient_age}
                  onChange={HandleInputValueChange}
                  required
                />
              </label>
              <label htmlFor="type">
                Type
                <select
                  name="type"
                  value={appointment_details.type}
                  onChange={HandleInputValueChange}
                  required
                >
                  {options.appointmentTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="department">
                Department
                <select
                  name="department"
                  value={appointment_details.department} // Fix typo here
                  onChange={HandleInputValueChange}
                  required
                >
                  {options.departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="files">
                Upload Files
                <input type="file" multiple />
              </label>
            </div>
            <div className="button-container">
              <button onClick={handleAppointmentSubmission}>
                {creating ? "Creating..." : "Create"}
              </button>
              <button onClick={HandleAppointmentButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
