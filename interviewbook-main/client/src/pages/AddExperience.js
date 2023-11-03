import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import './addquestion.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


function Addexperience() {

    const author = localStorage.getItem("name"); 
    const authorID = localStorage.getItem("_id");
   
    const [authorcontact, setAuthorcontact] = useState('');
    const [authoremail, setAuthoremail] = useState('');
    const [authorlinkedin, setAuthorlinkedin] = useState('');
    const [company, setCompany] = useState('');
    const [year, setYear] = useState('');
    const [expname,setExpname]  = useState('');
    const [darkMode, setDarkMode] = useState('light');

    const editor = useRef(null);

    const config = {
        readonly: false,
        height: 400
    };

   
    
    const navigate = useNavigate();

    const [experience, setexperience] = useState(
        {
            query: '',
            author: '',
            authorID: '',
            authorcontact: '',
            authoremail: '',
            authorlinkedin: '',
            company: '',
            year: '',
        }
    );

    useEffect(()=>{
        setDarkMode(localStorage.getItem("darkMode"));
    },[])


    const handleSubmit = (e) => {

       
       
        if(experience.query && author && authorID || experience.authorcontact || experience.authoremail  || experience.authorlinkedin || experience.company ){
            axios.post('/addexperience', {
                query : experience.query,
                author: author,
                authorID: authorID,
                authorcontact: authorcontact,
                authoremail: authoremail,
                authorlinkedin: authorlinkedin,
                company: company,
                year: year,
                expname: expname,
                
            }).then(res => {
                    if(res){
                        toast("experience Added Success!");
                        navigate('/allexperiences')
                    }
                })
                .catch(err => {
                    console.log(err);
            });
        }else{
            toast("Please fill all the fields!");
        }
    }

  

    const handleUpdate = (e) => {
        setexperience({...experience, query: e});
    };
  

    return (
        <div className={`dashboardContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
            <Header/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container">
                <div className="row">
                    <div className="col-sm-2 adminSidebar">
                        <Sidebar/>
                    </div>
                    <div className="col-sm-10 adminContent addexperience">
                        <div className="row">
                            <div className="col-sm-12 mt-3">
                                <h3>Add New Experience</h3>
                            </div>
                            <div className="col-sm-12">
                            <label>Select Category</label>
                           
                            <label>Company</label>
                            <div className="input-tag mb-2">
                            
                            <input type='text'defaultValue={company} onChange={(e)=>setCompany(e.target.value)}placeholder='Company'name='company'/>
                             
                            </div>
                            <div>
                            <label>Enter Question</label>
                            <JoditEditor
                                ref={editor}
                                value={experience.query}
                                config={config}
                                onBlur={handleUpdate}
                            />
                            <input type='hidden' value={experience.query} name='query'/>
                            </div>
                            <br></br>
                            <div className="input-tag mb-2">
                            <input type='text'defaultValue={authorcontact} onChange={(e)=>setAuthorcontact(e.target.value)}placeholder='Contact number'name='authorcontact'/>
                            </div>
                            <div className="input-tag mb-2">
                            <input type='text'defaultValue={authoremail} onChange={(e)=>setAuthoremail(e.target.value)}placeholder='Email Address'name='authoremail'/>
                            </div>
                            <div className="input-tag mb-2">
                            <input type='text'defaultValue={authorlinkedin} onChange={(e)=>setAuthorlinkedin(e.target.value)}placeholder='LinkedIn 'name='authorlinkedin'/>
                            </div>
                            <div className="input-tag mb-2">
                            <input type='text'defaultValue={expname} onChange={(e)=>setExpname(e.target.value)}placeholder='Enter your full name 'name='expname'/>
                            </div>
                            <div className="input-tag mb-2">
                            <input type='text'defaultValue={year} onChange={(e)=>setYear(e.target.value)}placeholder='Batch - "Year of placement" 'name='year'/>
                            </div>
                            <div className="float-end mt-3 mb-5">
                                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button> 
                            </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Addexperience
