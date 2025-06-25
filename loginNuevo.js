const getPersonal = async () => {
  const response = await fetch('http://localhost:8081/api/personal');
  const data = await response.json();

  console.log(data);
    
}

getPersonal();