import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import {useAuth,useUser} from "@clerk/clerk-react"


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY || "$"; 
    const navigate = useNavigate()

    const {getToken} = useAuth()
    const {user} = useUser()
    
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses,setEnrolledCourses] = useState([]);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    const calculateRating = (course)=>{
        if(course.courseRatings.length === 0){
            return 0;
        }
        let totalRating =0
        course.courseRatings.forEach(rating =>{
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length

    }
    // functiomn to calculate chapter time
    const calculateChapterTime=(chapter)=>{
        let time=0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time* 60*1000,{units:["h","m"]})
    }
    // calculate course duration 
    const calculateCourseDuration = (course)=>{
        let time=0
        course.courseContent.map((chapter)=> chapter.chapterContent.map(
            (lecture)=> time += lecture.lectureDuration
            
        ))
        return humanizeDuration(time* 60*1000,{units:["h","m"]})

    }
    // function calculate  to no of lecture in the course
    const calculateNoOfLectures = (course)=>{
        let totalLecture = 0
        course.courseContent.forEach(chapter =>{
            if(Array.isArray(chapter.chapterContent)){
                totalLecture  += chapter.chapterContent.length 
            }
        });
        return totalLecture;
    }
    // fetch user Enrolled Courses
    const fetchUserEnrolledCourses =async ()=>{
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses()
    }, []);

    const logToken = async ()=>{
        console.log(await getToken());
    }

    useEffect(()=>{
        if(user){
            logToken()

        }
    })

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,isEducator,setIsEducator,
        calculateNoOfLectures,calculateCourseDuration,calculateChapterTime,
        enrolledCourses,setEnrolledCourses,fetchUserEnrolledCourses

    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
