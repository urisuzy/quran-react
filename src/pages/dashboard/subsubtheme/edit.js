import React from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import Header from "../../../components/Dashboard/Header";
import EditContentSubsubTheme from "../../../components/Dashboard/Content/ContentSubsubTheme/edit";

function App() {
    return (
        <>
            <div className="flex bg-gray-100 font-family-karla">
                <Sidebar/>
                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                    <Header/>
                    <EditContentSubsubTheme/>
                </div>
            </div>
            
        </>
    )
}

export default App;