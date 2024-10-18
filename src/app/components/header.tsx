"use client";
import Container from 'react-bootstrap/Container';
import Image from "next/image";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";

const Header: React.FC = () =>  {

  // const [spaceButton, setSpaceButton] = useState<boolean>(false);
  const [notShowActive, setNotShowActive] = useState<boolean>(false);

  const pathName = usePathname()

  useEffect(() => {
    const updateButtonSpacing = () => {
      // setSpaceButton(window.innerWidth <= 991);
      setNotShowActive(window.innerWidth <= 991);
    };

    
    updateButtonSpacing();

    
    window.addEventListener("resize", updateButtonSpacing);

    
    return () => window.removeEventListener("resize", updateButtonSpacing);
  }, []);

  useEffect(() => {

    console.log(pathName)

  }, [pathName])

  return (
    <Navbar expand="lg" className="bg-warning">
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
          <Image src="/futschool.png" width={200} height={65} alt="Logo da FutSchol" />
          <\Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
  
            <Link href="/" passHref legacyBehavior>
              <Nav.Link style={pathName === "/" && !notShowActive ? {borderBottom: "2px solid #fff", transition: "0.3s ease-in-out"} : {}}  className='me-4'>Home</Nav.Link>
            </Link>
            <Link href="/price" passHref legacyBehavior>
              <Nav.Link style={pathName === "/price" && !notShowActive  ? {borderBottom: "2px solid #fff"} : {}} className='me-5'>Preços</Nav.Link>
            </Link>
            {/* <Button className='me-3' variant='outline-primary'>ENTRAR</Button>
            <Button className={spaceButton ? "me-3 mt-2" : "me-3"} variant='outline-primary'>CADASTRAR-SE</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
