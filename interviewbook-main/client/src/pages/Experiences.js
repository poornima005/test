import React,{useState,useEffect,useRef}  from 'react';
import Header from '../components/Header';
import axios from 'axios';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import JoditEditor from "jodit-react";
import moment from 'moment';
import Close from '@material-ui/icons/Close';
import LikesDislikes from '../components/LikesDislikes';

function Experience() {
    const user = localStorage.getItem("name");
    const loggedIn = localStorage.getItem("loggedIn"); 
    const userID = localStorage.getItem("_id");
    const [experience, setExperience] = useState([]);
  
    const [experinceID, setExperienceID] = useState('');
 
    const [darkMode, setDarkMode] = useState('light');
    const navigate = useNavigate();

    const [limit] = useState(5);
    const [skip, setSkip] = useState(0);

    //console.log(questions);

    const previousPage = () => {
      setSkip(skip - limit)
    }

    const nextPage = () => {
      setSkip(skip + limit)
    }

    useEffect(() => {
      getExperience(limit, skip);
      setDarkMode(localStorage.getItem("darkMode"));
    }, [skip, limit])

    const editor = useRef(null);

    const config = {
      readonly: false,
      height: '85vh'
    };

    function onTextChange(e){
      let queryText = e.target.value.toLowerCase();
      console.log(queryText.length)
      if(queryText.length === 0){
        axios.get(`/getallquestions`).then(res => {
          if(res){
            setExperience(res.data);
          }
        }).catch(err => {
            console.log(err);
        });
      }else{
        let resQues = experience.filter((e) => {
        let dataFilter = e.query.toLowerCase()
          return dataFilter.indexOf(queryText) !== -1
        })
        setExperience(resQues);
      }
    }

    // function giveAnswer(query,id){
    //   setShowForm(true);
    //   setQuestionID(id);
    //   setQuery(query);
    // }

    // function hideForm(){
    //   setShowForm(false);
    // }
    
    // function showAnswers(id,query,tags){
    //   axios.get(`/getanswers?id=${id}`).then(res => {
    //       if(res){
    //         setAnswers(res.data);
    //         setQuery(query);
    //         setTags(tags);
    //         setQuestionID(id);
    //       }
    //   }).catch(err => {
    //       console.log(err);
    //   });
    //   setShowAnswer(true);
    // }

    // function hideAnswers(){
    //   if(questionID){
    //     axios.post(`/addview?id=${questionID}`, {
    //       view : 1
    //     }).then(res => {
    //       if(res){
    //         //toast("View Added Success!");
    //         getQuestions();
    //         window.location.reload();
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //   }else{
    //     toast("Something Went Wrong!!");
    //   }
    //   setShowAnswer(false);
    // }

    const getExperience = (limit, skip) => {
      axios.get(`/getallexperiences?limit=${limit}&skip=${skip}`).then(res => {
          if(res){
            setExperience(res.data);
          }
      }).catch(err => {
          console.log(err);
      });
    }

  

  return(
    <div className={`homeContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
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
     
      <div className='container'>
      <div className='searchFilter'> 
        <h4 className={`totalQues  ${darkMode === 'light' ? 'light' : 'dark' }`}>Total Experience: {experience.length}</h4>
        <div className='d-flex justify-content-center'> 
          <button className='btn btn-primary btn-sm mt-2' onClick={previousPage}> Previous Page </button>
          <button className='btn btn-primary btn-sm mt-2 ms-2' onClick={nextPage}> Next Page </button> 
        </div>
       
      </div>
      {experience.length > 0 ? 
      experience.map((experience, index)=>{
        return(
          <div className='homequery shadow-sm' key={index}>
            <h3> {experience.expname}</h3>
            <div dangerouslySetInnerHTML={{__html: experience.query}} /> <br></br>
            <div className='footer'>
            Batch: {experience.year} <br></br>
            LinkedIn: {experience.authorlinkedin}<br></br>
            Email: {experience.authoremail}<br></br>
            Contact: {experience.authorcontact}
            </div>
            <div className='footer'>Shared by <Link className='link' to={`/users/${experience.author.toLowerCase().replace(/\s+/g, '-')}`} state={{authorID:experience.authorID}}>{experience.author}</Link> {moment(experience.createdAt).fromNow()} works in <Link to={`/experience/${experience.company.toLowerCase().replace(/\s+/g, '-')}`} className='link' state={{company:experience.company}}>{experience.company}</Link> <span className='views'>Viewed: {experience.views ? experience.views : 0} times</span></div>
           
          </div>
        )
      })
      :
      <div className='notFound'>No Question Found</div>
      }
      </div>
      
    </div>
  )
}

export default Experience;