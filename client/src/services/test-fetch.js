await fetch('http://localhost:3001/v1/auth/login', {
  method: "POST",
  headers: {"Accept": "*/*", 'Content-Type': 'application/json'},
  body: JSON.stringify(payload) 
});

await fetch('http://localhost:3001/v1/users/658cec6bc586a046a046172b', {
  method: "GET",
  headers: {"Accept": "*/*", 'Content-Type': 'application/json'},
});

const url = "http://localhost:3001/v1/users/658cec6bc586a046a046172b";

const request = new Request(url, { credentials: "include" });

const fetchPromise = fetch(request);
fetchPromise.then((response) => console.log(response));
