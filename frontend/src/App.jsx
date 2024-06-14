import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";
import RightPanel from "./components/common/RightPanel.jsx";
import SideBar from "./components/common/SideBar.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSnipper.jsx";


function App() {
     const {
          data: authUser,
          isLoading,
          error,
          isError,
     } = useQuery({
          queryKey: ["authUser"],
          queryFn: async () => {
               try {
                    const res = await fetch("/api/auth/getme");
                    const data = await res.json();
                    
                    // if(data === undefined) return null;
                    if (!res.ok) {
                         return null;
                    }

                    console.log("authUser is here: ", data);

                    return data;
               } catch (error) {
                    throw new Error(error);
               }
          },
          retry: false,
          
     });

     if(isLoading) {
          return (
               <div className="h-screen w-full flex justify-center items-center">
                    <LoadingSpinner/>
               </div>
          );
     }
     console.log("authUser: ",authUser);

     return (
          <div className="flex justify-between mx-auto w-full ">
               {authUser && <SideBar />}
               <Routes>
                    <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"}/>} />
                    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
                    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
                    <Route
                         path="/profile/:username"
                         element={authUser ? <ProfilePage />: <Navigate to={"/login"}/>}
                    />
               </Routes>
               {authUser && <RightPanel />}
               <Toaster />
          </div>
     );
}

export default App;
