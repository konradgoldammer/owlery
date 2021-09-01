import react, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'

const SignUp = () => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState()

    const handleSubmit = e => {
        setEmail({value: e.target.value})
        setUsername({value: e.target.value})
        setPassword({value: e.target.value})
        e.preventDefault()
    }

    return(
        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for='email' sm={2}>Email address</Label>
                    <Col sm={10}>
                        <Input type='email' name='email' id='email'/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input type='text' name='user' id='user'/>
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' name='password' id='password'/>
                </FormGroup>
                <FormGroup>
                    <Label for='confirmPassword'>Confirm password</Label>
                    <Input type='password' name='confirmPass' id='confirmPass'/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default SignUp