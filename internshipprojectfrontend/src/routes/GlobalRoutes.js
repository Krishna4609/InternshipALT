import React from 'react'
import UserRegistration from '../components/UserRegistration';
import { Route, Routes } from 'react-router-dom';
import Test from '../components/Test'
import Home from '../components/Home';
import NewPost from '../components/NewPost';
import MyProfile from '../components/MyProfile';
import Address from '../components/Address';
import Skill from '../components/Skill';
import SkillForm from '../components/SkillForm';
import EditSkill from '../components/EditSkill';
import EducationDetailsPage from '../components/EducationDetails';
import EducationPage from '../components/EducationPage';
import AddCourse from '../components/AddCourse'
import MyCourses from '../components/MyCourses'
import MyDetails from '../components/MyDetails';
import Marks from '../components/Marks';
import EditEducation from '../components/EditEducation';
import OtherProfile from '../components/OtherProfile';
import AddressDetails from '../components/AddressDetails';
import EditAddress from '../components/EditAddress';
import AdditionalAddress from '../components/AdditionalAddress';
import MyConnections from '../components/MyConnections';

function GlobalRoutes() {
    const handleOut = () =>{
        localStorage.removeItem("sesionToken")
    }

    return ( 
        <Routes>
                <Route path='/' element={<UserRegistration/>} action={handleOut}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/home/newPost' element={<NewPost/>}/>
                <Route path='/home/myprofile' element={<MyProfile/>}/>
                <Route path='/home/myconnections' element={<MyConnections/>}/>
                <Route path='/home/profile/:user_id' element={<OtherProfile/>}/>
                <Route path='/home/mydetails' element={<MyDetails/>}/>
                <Route path='/home/test' element={<Test/>}/>
                <Route path='/home/address' element={<AddressDetails/>}/>
                <Route path='/home/address/addAddress' element={<Address/>}/>
                <Route path='/home/address/update/:address_id' element={<EditAddress/>}/>
                <Route path='/home/address/addAdditionalAddress' element={<AdditionalAddress/>}/>
                <Route path='/home/education' element={<EducationDetailsPage/>}/>
                <Route path='/home/education/editEducation/:education_id' element={<EditEducation/>}/>
                <Route path='/home/education/addcourse' element={<AddCourse/>}/>
                <Route path='/home/education/mycourses' element={<MyCourses/>}/>
                <Route path='/home/education/mycourses/:course_id/marks' element={<Marks    />}/>
                <Route path='/home/education/addEducation' element={<EducationPage/>}/>
                <Route path='/home/skills' element={<Skill/>}/>
                <Route path='/home/skills/skillform' element={<SkillForm/>}/>
                <Route path='/home/skills/editskill/:skill_id' element={<EditSkill/>}/>
                
        </Routes>
     );
}

export default GlobalRoutes;