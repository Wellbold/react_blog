import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Login';
import AdminIndex from './AdminIndex';
import AddArticle from '../Pages/AddArticle';
import ArticleList from '../Pages/ArticleList';


export default function Main(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/index/*" element={<AdminIndex />}/>


                </Routes>

            </Router>
        </div>

    )
}