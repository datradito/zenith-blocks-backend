import React from 'react'
import GoBack from '../Components/atoms/GoBack/GoBack'
import Container from '../Components/atoms/Container/Container'
import Label from '../Components/atoms/Label/Label'

function NotFound() {
  return (
    <Container
      style={{
        width: "40%",
        margin: "0 auto",
        paddingTop: "1rem",
        borderRadius: "10px",
        marginTop: "5%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
      }}
    >
      <Label
        style={{
          textAlign: "center",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <GoBack
          style={{
            color: "white",
            backgroundColor: "red",
          }}
        />
        Page Not Found 😕
      </Label>
    </Container>
  );
}

export default NotFound