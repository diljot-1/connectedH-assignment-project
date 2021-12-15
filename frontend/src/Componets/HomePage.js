import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Products from './Products'

export default function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [showProducts, setShowProducts]=useState(false);
  const [alert, showAlert] = useState(false);

 function handleSubmit(e){
   e.preventDefault();
   console.log(emailRef.current.value);
   const obj={"mail": emailRef.current.value}
   axios.get('http://localhost:5000/verify',obj).then(function (response) {
    console.log(response);
    if(response.data.password==passwordRef.current.value) {
      console.log("login successfull")
      setShowProducts(true);
    }
    else{
       showAlert(true);
    }
  })
  .catch(function (error) {
    showAlert(true);
  })
 }
  if(!showProducts){
  return (
  <>
  <Card style={{width:'600px', height: '100px', position:'absolute', left:'30%', top:'17%', backgroundColor:'cyan', color:'black'}}>
    <Card.Body>
       <h2>Login!</h2>
    </Card.Body>
  </Card>

   <Card style={{width:'600px', height: '375px', position:'absolute', left:'30%', top:'25%', backgroundColor:'#E4E6EB', color:'black'}}>
    <Card.Body>
    { alert && <Alert variant='danger'>
       Invalid e-mail or password :(  
    </Alert>}

    <Form>
     <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email address</Form.Label>
     <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
     <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    
  </Form.Group>

  <Button onClick={handleSubmit} variant="primary" type="submit">
    Submit
  </Button>
  </Form>
 </Card.Body>
  </Card></>
  )}
  else{
    return <Products/>
  }
}