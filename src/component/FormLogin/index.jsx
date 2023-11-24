import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loginStatus, setLoginStatus] = useState('')

    const navigate = useNavigate()

    function handleUsername(e) {
        setLoginStatus('')
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setLoginStatus('')
        setPassword(e.target.value)
    }

    function handleLogin() {
        if (username === '' || password === '') {
            setLoginStatus('Data payload tidak boleh kosong')
            return
        }
        const bodyPayload = {
            username: username,
            password: password
        }

        setIsLoading(true)
        axios.post(`https://api.mudoapi.tech/login`, bodyPayload)
            .then(res => {
                localStorage.setItem('accessToken', res.data.data.token)
                setLoginStatus(res.data.message)
                navigate('/')
            })
            .catch(err => {
                setLoginStatus(err.response.data.message)
            }).finally(() => setIsLoading(false))
    }

    return (
        <>
            <center>
                <h1>
                    {
                        loginStatus.length ? <p>{loginStatus}</p> : null
                    }
                </h1>
            </center>
            <Form className="col-2 m-auto mt-5">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={handleUsername} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                <Button variant="primary" disabled={isLoading} onClick={handleLogin}>
                    {isLoading ? 'Loading..' : 'Submit'}
                </Button>
            </Form>
        </>
    )
}

export default FormLogin

