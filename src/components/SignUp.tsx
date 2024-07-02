import axios from "axios";
import { useCallback, useEffect, useState} from "react";
import { useNavigate } from "react-router";

const SignUp : React.FC = () => {
    const url = process.env.REACT_APP_NODE_URL;
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValidId, setIsValidId] = useState<boolean | null>(null);

    const checkUsername = useCallback(async (username: string) => {
        try {
            await axios.get(url + `/api/check?username=${username}`).then((response) => {
                setIsValidId(response.data);
            })
        } catch(err) {
            console.log(err);
        }
    },[url]);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        if (username && password && isValidId) {
            try {
                await axios.post(url + '/api/signup', {
                    username: username,
                    password: password,
                }).then((response) => {
                    if (response.status === 201){
                        alert('SignUp Success!'); 
                        navigate('/login')
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    useEffect(() => {
        if (username) {
            checkUsername(username);
        } else {
            setIsValidId(null);
        }
    }, [username, checkUsername]); 

    return (
        <div>
            <h1>Sign Up Page</h1>
            <form>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <p>{isValidId ? "It's valid ID" : "It's not valid ID"}</p>
                <br/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;