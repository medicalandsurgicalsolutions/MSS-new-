const ThankYou = () => {

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          backgroundColor: '#f8f8f8',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '700',
              fontSize: '3rem',
              marginBottom: '20px',
              color: '#333',
            }}
          >
            THANK YOU!
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: '300',
              fontSize: '1.2rem',
              marginBottom: '20px',
              color: '#555',
            }}
          >Thank you for shopping with Medical & Surgical Solutions
          </p>
          <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <p
    style={{
      fontFamily: "'Lato', sans-serif",
      fontWeight: '300',
      fontSize: '1.2rem',
      marginBottom: '20px',
      color: 'white',
      backgroundColor: 'green',
      cursor: 'pointer',
      padding: '6px 10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      width: '40%', // Set width to 40%
      textAlign: 'center', // Center text within the element
    }}
    onClick={() => (window.location.href = '/')} // Redirect to home
  >
    Back to home
  </p>
</div>

          <i
            className="fa fa-check"
            style={{
              fontSize: '3rem',
              color: '#4CAF50',
            }}
          ></i>
        </div>
      </div>
    );
  };
  
  export default ThankYou;