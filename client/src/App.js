import React, {useEffect, useState} from 'react'


function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(()=> {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)  // We set the backendData state to be the response from the API call.
      })
  },[])
  return (
    <div className="container mt-4">
      {(backendData.some(data => Object.values(data).includes(undefined))) ? ( /*If somehow the API call gives us 0 results, we display a loading.*/
                <p>Loading...</p>
       ):(
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Organisasjons nummer:</th>
              <th>Organisasjons navn:</th>
              <th>Organisasjons beskrivelse:</th>
              <th>Organisasjons registreringsdato:</th>
            </tr>
          </thead>
          <tbody>
          {backendData.sort((a, b) => a.navn.localeCompare(b.navn)) // Here we are sorting the data based on the organization name.
              .map((data, index) => ( /* The localeCompare() method takes into consideration our language and cultural conventions such as 'æ', 'ø' and 'å' when comparing.*/
                <tr key={index}> {/* We then map each object in the array to a table row, using the properties of the object as the table data. */}
                  <td>{data.organisasjonsnummer}</td>
                  <td>{data.navn}</td>
                  <td>{data.orgbeskrivelse}</td>
                  <td>{new Date(data.registreringsdato).toLocaleDateString("nb-NO", {day: "2-digit", month: "2-digit", year: "numeric"})}</td> 
                   {/* By making the date into a Date object, we can use localeDateString method and pass in nb-NO to convert it to Norwegian format. DD.MM.YYYY*/}
                </tr>
              ))
            }

          </tbody>
        </table>
      )}
    </div>
  )
}


export default App