import React, {useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {
  FormControl,
  InputGroup,
  Container
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
import 'bootstrap/dist/css/bootstrap.min.css';


export const CreatePage = () => {
  const {request} = useHttp()
  const logining = useContext(LoginContext);
  const [collectionName, setCollection] = useState('')
  const history = useNavigate();
 
  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/collection/generate', 'POST', {collectionName}, {
          Authorization: `Bearer ${logining.token}`
        })
        console.log(data)
        history(`/detail/${data.collection._id}`)
      } catch (e) {}
    }
  }

  return (
    <Container className="mt-3 w-50">
      <h2 className="mb-3 text-center">Create your Collection</h2>
       <InputGroup className="mb-3">
          <FormControl
            placeholder="Collection Name"
            id="collectionName"
            type="text"
            name="collectionName"
            value = {collectionName}
            onChange = {e=>setCollection(e.target.value)}
            onKeyPress = {pressHandler}
          />
        </InputGroup>
    </Container>
  )
}