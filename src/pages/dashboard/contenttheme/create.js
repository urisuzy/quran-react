import React from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import Header from "../../../components/Dashboard/Header";
import CreateContentContentTheme from "../../../components/Dashboard/Content/ContentContentTheme/create";

function App() {
    return (
        <>
            <div className="flex bg-gray-100 font-family-karla">
                <Sidebar/>
                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                    <Header/>
                    <CreateContentContentTheme/>
                </div>
            </div>
            
        </>
    )
}

export default App;