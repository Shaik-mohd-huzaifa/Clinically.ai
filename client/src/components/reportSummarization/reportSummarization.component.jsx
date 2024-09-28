import axios from "axios";
import "./reportSummarization.component.scss";
import { useState } from "react";
import Markdown from "react-markdown"
import {Oval} from "react-loader-spinner"


const languages = ["English", "Hindi", "Kannada", "Marathi", "Urdu", "Chinese"];
const types = ["Short Summary", "Symptoms Prediction", "Nutrition Recommendation"]

export const ReportSummarization = () => {
    const [file, setFile] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [type, setType] = useState(types[0]);
    const [data, setData] = useState('')
    const [audiofileName, setAudioFileName] = useState('')
    const [loading, setloading] = useState(false)

    const handleReportUpload = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!file) {
            console.log("Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("report", file);
        formData.append("language", selectedLanguage);
        formData.append("type", type);

        try {
            setloading(true)
            setData('')
            setAudioFileName('')
            const res = await axios.post("http://127.0.0.1:5000/reportSummarization", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setData(res.data.message)
            setAudioFileName(res.data.audiofile)
            console.log(res.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log("Error uploading file: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="report-container">
            <h2>Clinically.ai</h2>
            <div className="header">
                <h3>Report Summarization</h3>
                <div className="input">
                    <label htmlFor="report">
                        Upload Report
                        <input
                            type="file"
                            className="custom-file-input"
                            name="report"
                            accept=".pdf,.txt" // Specify file types
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                console.log("Selected file:", selectedFile); // Debugging log
                                setFile(selectedFile);
                            }}
                            required
                        />
                    </label>
                    <label htmlFor="language">
                        Language
                        <select
                            name="language"
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option value={lang} key={lang}>{lang}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="type">
                        Summary Type
                        <select
                            name="type"
                            value={selectedLanguage}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {types.map((type) => (
                                <option value={type} key={type}>{type}</option>
                            ))}
                        </select>
                    </label>

                    <button onClick={handleReportUpload}>Summarize</button>
                </div>
            </div>
            <div className="summarized-content">
                <div className="audio-summarization">
                    <p>Audio Summarization</p>
                    {
                    loading && <div className="loading"><Oval width="25" height="25" color="green" /></div>
                    }
                    {
                        audiofileName && <audio controls>
                        <source src={`./audio/${audiofileName}.mp3`} type="audio/mp3" />
                        Your browser does not support the audio tag.
                      </audio>
                    }
                </div>
                <div className="text-summarization">
                    <p className="header">Text Summarization</p>
                    {loading && <div className="loading"><Oval width="25" height="25" color="green" /></div>}
                    {data && <Markdown>{data}</Markdown>}
                </div>
            </div>
        </div>
    );
};
