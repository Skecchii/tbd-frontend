import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";

const FooterContainer = styled.footer`
    position: absolute;
    width: 100%;
    background: #0B0C10;
    color: #fff;
`;
const ItemContainer = styled.div`
    margin-left: -3.5rem;
    margin-right: 2rem;
    width: 50%;
    padding-left: 2rem;
`
const FollowHeader = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-left: 3.5rem;
`;
const SocialLinkList = styled.ul`
    display: flex;
    list-style: none;
`;
const SocialLinkListItem = styled.li`
    margin: 0 1rem;
`
const SocialLink = styled.a`
    color: #fff;
    font-size: 1.5rem;
    transition: color 0.2s;

    &:hover {
        color: #66FCF1;
    }
`

const Footer = () => {
    return (
        <FooterContainer>
            <ItemContainer>
                <FollowHeader>Follow Me</FollowHeader>
                <SocialLinkList>
                    <SocialLinkListItem>
                        <SocialLink href="#">
                            <FaTwitter />
                        </SocialLink>
                    </SocialLinkListItem>
                    <SocialLinkListItem>
                        <SocialLink href="#">
                            <FaInstagram />
                        </SocialLink>
                    </SocialLinkListItem>
                    <SocialLinkListItem>
                        <SocialLink href="#">
                            <FaLinkedin />
                        </SocialLink>
                    </SocialLinkListItem>
                </SocialLinkList>
            </ItemContainer>
        </FooterContainer>
    );
};

export default Footer;
