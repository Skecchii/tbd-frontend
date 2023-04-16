import { useState, useEffect } from 'react'
import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const fadeInOut = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
`;
const LoadingText = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    animation: ${fadeInOut} 1.25s linear infinite;
    transition: opacity 0.2s ease-in-out;
    z-index: 1;
    @media screen and (max-width: 600px) {
        font-size: 1.5rem;
    }
`;
const LoadingBar = styled.div`
    width: ${({ progress }) => progress}%;
    height: 0.125rem;
    background-color: #66fcf1;
    transition: width 0.2s ease-in-out;
    @media screen and (max-width: 600px) {
        height: 0.175rem;
    }
`;

const LoadingComponent = ({ handleLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress(progress => {
                if (progress === 100) {
                    clearInterval(intervalId);
                }
                return progress + 10;
            });
        }, 250);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            handleLoading()
        }
    })

    return (
        <LoaderContainer>
            <LoadingText>Loading...</LoadingText>
            <LoadingBar progress={progress} />
        </LoaderContainer>
    )
}

export default LoadingComponent