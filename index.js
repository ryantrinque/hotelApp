const express = require('express');
const app = express();

const myMotel = require('/Users/starplayer/Documents/Projects/__devx/2023-04/11tuesday/hotel2/motelrooms.js');

app.get('/', (req, res) => {
  //room number form
  let roomNum = req.query.roomNum;
  let rooms = [];
  for (let i = 0; i < myMotel.length; i++) {
    const room = myMotel[i];
    if (room.available == true && room.room_number == roomNum) {
      rooms.push(`Room ${room.room_number} has ${room.num_beds} beds at $${room.room_price} per night.`);
    } else if (room.available == false && room.room_number == roomNum){
      rooms.push(`Room ${room.room_number} is not available.`);
    }
  }
//number of beds form
  let num_beds = req.query.num_beds;
  for (let i = 0; i < myMotel.length; i++) {
    const room = myMotel[i];
    if (room.available == true && room.num_beds == num_beds) {
      rooms.push(`Room ${room.room_number} has ${room.num_beds} beds at $${room.room_price} per night.`);
    } else if (room.available == false && room.num_beds == num_beds){
      rooms.push(`Room ${room.room_number} is not available.`);
    }
  }
  
  const roomNumForm = `
  <form id="myForm">
    <label for="roomNum">Room Number:</label>
    <select id="mySelect" name="roomNum">
      <option value="101">101</option>
      <option value="102">102</option>
      <option value="103">103</option>
      <option value="104">104</option>
      <option value="105">105</option>
      <option value="106">106</option>
      <option value="107">107</option>
      <option value="108">108</option>
      <option value="109">109</option>
      <option value="110">110</option>
    </select>
    <button type="submit">Search</button>
  </form>
`;

const numBedsForm = `
  <form id="myFormTwo">
    <label for="num_beds">Number of Beds:</label>
    <select id="mySelect" name="num_beds">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button type="submit">Search</button>
  </form>
`;
//initiate the submit when user selects value in form
const scriptOne = `
  <script>
    const select = document.querySelector('#mySelect');
    const form = document.querySelector('#myForm');
    select.addEventListener('change', () => {
      form.submit();
    });
  </script>
`;
const scriptTwo = `
<script>
const select = document.querySelector('#mySelect');
const form = document.querySelector('#myFormTwo');
select.addEventListener('change', () => {
  form.submit();
});
</script>
`


res.send(roomNumForm + numBedsForm  + '<br>' + rooms.join('<br>') + scriptOne + scriptTwo);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
