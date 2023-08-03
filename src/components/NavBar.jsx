import styled from "styled-components";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import app from "../firebase.js"

const NavBar = () => {

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const [show, setShow] = useState(false)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(!user) {
                navigate("/login")
            } else if (user && pathname === "/login") {
                navigate("/")
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleAuth = () => {
        signInWithPopup(auth, provider).then(res =>  {
            console.log(res)
        }).catch(err => {
            console.err(err)
        })

    }

    const scrollHandler = () => {
        if(window.scrollY > 50) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {

        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <NavWrapper>
            <Logo>
                <Image
                    onClick={() => window.location.href='/'}
                    alt="Poke logo"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" />
            </Logo>

            {
                pathname === '/login' ? <Login onClick={handleAuth}>로그인</Login> : null
            }

        </NavWrapper>
    )
}

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: #fff;
  
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`


const Image = styled.img`
  cursor: pointer;
`

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
  img {
    width: 100%;
  }
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 36px;
  letter-spacing: 16px;
  z-index: 100;
  background-color: ${props => props.show ? "#090b13" : "transparent"}
`

export default NavBar