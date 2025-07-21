import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import{useParams} from 'react-router-dom'
import { UsersEntity } from "../models/IUser";
import { UserService } from "../services/UserService";

interface Iparams{
    id:string
}
interface IState{
    loading:boolean,
    user:UsersEntity,
    errorMsg:'',
}

const UserDetail:React.FC=()=>{
    const {id}=useParams<Iparams |any>()

    const[state,setState]=useState<IState>({
        loading:false,
        user:{} as UsersEntity,
        errorMsg:''
    })

    useEffect(()=>{
        if(id){
            setState({...state,loading:true})
            UserService.getUser(id)
            .then((res)=>setState({
                ...state,
                loading:false,
                user:res.data
            }))
            .catch((error)=>setState({
                ...state,
                loading:false,
                errorMsg:error.message
            }))
        }
    },[id])

    const{loading,user,errorMsg}=state
    return(
        <>
        <div className="container">
        
            <h1 className="text-center bg-info-subtle">Details page</h1>
            
            <div className="row">
                {loading && <h1>Loading...</h1>}
                {errorMsg && <h1>{errorMsg}</h1>}

                {    
                    Object.keys(user).length>0 &&(
                        <div className="row">
                            <div className="col-4">
                                <img 
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="img-fluid rounded "
                                />
                                <ul className="list-group">
                                    <li className="list-group-item active text-center">
                                        <b>Name : </b> {user.firstName} {user.lastName}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Address</b> :<br></br>
                                            <ul className="list-group border-0 ms-3">
                                                <li className="list-group-item border-0">City : {user.address.city}</li>
                                                <li className="list-group-item border-0">State : {user.address.state}</li>
                                                <li className="list-group-item border-0">Country : {user.address.country}</li>
                                            </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-8"> 
                                <ul className="list-group"> 
                                    <li className="list-group-item ">
                                        <b>Username : </b>{user.username}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Age : </b>{user.age}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Gender : </b>{user.gender}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Phone : </b> {user.phone}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Email : </b> {user.email}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Bank : </b>{user.bank.cardNumber}
                                    </li>
                                    <li className="list-group-item">
                                        <b> Role : </b> {user.role}
                                    </li>                                
                                    <li className="list-group-item">
                                        <b>Company : </b> {user.company.name}
                                    </li>                               
                                    <li className="list-group-item">
                                        <b>University : </b> {user.university}
                                    </li>                               
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="mt-4">
                <Link to={'/'} className="btn btn-info m-4 ">GO BACK</Link>
            </div>
        </div>
        </>
    )
}
export default UserDetail;