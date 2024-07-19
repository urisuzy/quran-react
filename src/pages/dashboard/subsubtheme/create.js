import React from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import Header from "../../../components/Dashboard/Header";
import CreateContentSubsubTheme from "../../../components/Dashboard/Content/ContentSubsubTheme/create";

function App() {
    return (
        <>
            <div className="flex bg-gray-100 font-family-karla">
                <Sidebar/>
                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                    <Header/>
                    <CreateContentSubsubTheme/>
                </div>
            </div>
            
        </>
    )
}

export default App;