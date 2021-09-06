import React from 'react'
import profilePic from './images/profile.png'
import './css/style.css';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';


function ProfileInfo() {
    return (
        <div>
            <Container>
                <Row>
                <img src={profilePic} alt = "profilepicture" className = "profile-pic" /> 
                <h4>Konrad Goldammer</h4>

                </Row>
            </Container>

        </div>
    )
}

export default ProfileInfo
