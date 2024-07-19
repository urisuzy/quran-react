import React from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import Header from "../../../components/Dashboard/Header";
import CreateContentSubTheme from "../../../components/Dashboard/Content/ContentSubTheme/create";

function App() {
    return (
        <>
            <div className="flex bg-gray-100 font-family-karla">
                <Sidebar/>
                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                    <Header/>
                    <CreateContentSubTheme/>
                </div>
            </div>
            
        </>
    )
}

export default App;