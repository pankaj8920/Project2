import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CourseList from './pages/student/CoursesList'
import CourseDetail from './pages/student/CourseDetail'
import MyEnrollment from './pages/student/MyEnrollment'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
// import Pdf from './pages/pdf/Pdf'
// import Ee from './pages/pdf/Ee'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";

const App = () => {

const isEducatorRoute = useMatch('/educator/*')



  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/course-list' element={<CourseList/>} />
        <Route path='/course-list/:input' element={<CourseList/>} />
        <Route path='/course/:id' element={<CourseDetail/>} />
        <Route path='/my-enrollments' element={<MyEnrollment/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        <Route path='/educator' element={<Educator/>}>
            <Route path= '/educator' element={<Dashboard/>}/>
            <Route path= 'add-course' element={<AddCourse/>}/>
            <Route path= 'my-courses' element={<MyCourses/>}/>
            <Route path= 'student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
        {/* <Route path='/pdf' element={<Pdf/>}>
            <Route path= 'Ee' element={<Ee/>}/>
            
        </Route> */}
        
      </Routes>
    </div>
  )
}

export default App