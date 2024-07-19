import React from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import Header from "../../../components/Dashboard/Header";
import EditContentContentTheme from "../../../components/Dashboard/Content/ContentContentTheme/edit";

function App() {
    return (
        <>
            <div className="flex bg-gray-100 font-family-karla">
                <Sidebar/>
                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                    <Header/>
                    <EditContentContentTheme/>
                </div>
            </div>
            
        </>
    )
}

export default App;