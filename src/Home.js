/** Renders home page with Jobly intro */

function Home() {
  const homeStyle = {color: "white", textAlign:"center", top:"45%"}

  return (
    <div style={homeStyle}>
      <h3>Jobly</h3>
      <h6>All the jobs in one, convenient place.</h6>
    </div>
  )
}

export default Home;