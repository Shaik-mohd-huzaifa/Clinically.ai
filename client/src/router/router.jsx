import {createBrowserRouter} from "react-router-dom"
import { Appointments } from "../components/Appointments/appointment.component"
import { ReportSummarization } from "../components/reportSummarization/reportSummarization.component"


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <ReportSummarization/>
    }
])