import * as React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import * as ROUTES from './constants/routes'
import "tailwindcss/tailwind.css"

const LoginForm = React.lazy(()=> import ('./pages/login'))
const Home = React.lazy(()=> import('./pages/home'))
const DashboardPage = React.lazy(()=> import('./pages/dashboard'))
const FindJob = React.lazy(()=> import('./pages/findjob'))
const PostJob = React.lazy(()=> import('./pages/postjob'))
const UpdateProfile = React.lazy(()=> import('./pages/updateProfile'))

function App() {

  return (
    <Router>
      <React.Suspense fallback ={<p>Loading...</p>}>
    <Routes>
      <Route path = {ROUTES.HOME} element={<Home />} />
      <Route path = {ROUTES.LOGIN} element={<LoginForm />} />
      <Route path = {ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path = {ROUTES.FIND_JOB} element={<FindJob />} />
      <Route path = {ROUTES.POST_JOB} element={<PostJob />} />
      <Route path = {ROUTES.UPDATE_PROFILE} element={<UpdateProfile />} />
    </Routes>
       </React.Suspense>
    </Router>
  );
}

export default App;
