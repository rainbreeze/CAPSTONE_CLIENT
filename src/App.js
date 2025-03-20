import React, { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, TextField } from "@mui/material";
import Car from "./components/car";

// 서버에서 자동차 데이터를 가져오기
function App() {
  const [cars, setCars] = useState([]);  // 자동차 데이터를 저장할 상태 변수
  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    year: '',
    image: '',
    price: '',
  });

  // 자동차 데이터 가져오기
  useEffect(() => {
    fetch('http://capstone_server.railway.internal/api/cars') // Railway 서버 주소로 변경
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  // 자동차 추가
  const handleAddCar = () => {
    fetch('http://capstone_server.railway.internal/api/cars', { // Railway 서버 주소로 변경
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setNewCar({ make: '', model: '', year: '', image: '', price: '' });  // 입력 필드 초기화
        fetchCars();  // 데이터 다시 가져오기
      })
      .catch(error => console.error('Error adding car:', error));
  };

  // 자동차 삭제
  const handleDeleteCar = (id) => {
    fetch(`http://capstone_server.railway.internal/api/cars/${id}`, { method: 'DELETE' })  // Railway 서버 주소로 변경
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchCars();  // 데이터 다시 가져오기
      })
      .catch(error => console.error('Error deleting car:', error));
  };

  // 자동차 목록 다시 가져오기
  const fetchCars = () => {
    fetch('http://capstone_server.railway.internal/api/cars') // Railway 서버 주소로 변경
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  };

  return (
    <div>
      <h1>자동차 목록</h1>
      
      {/* 자동차 추가 폼 */}
      <div>
        <TextField
          label="Make"
          value={newCar.make}
          onChange={e => setNewCar({ ...newCar, make: e.target.value })}
        />
        <TextField
          label="Model"
          value={newCar.model}
          onChange={e => setNewCar({ ...newCar, model: e.target.value })}
        />
        <TextField
          label="Year"
          value={newCar.year}
          onChange={e => setNewCar({ ...newCar, year: e.target.value })}
        />
        <TextField
          label="Image URL"
          value={newCar.image}
          onChange={e => setNewCar({ ...newCar, image: e.target.value })}
        />
        <TextField
          label="Price"
          value={newCar.price}
          onChange={e => setNewCar({ ...newCar, price: e.target.value })}
        />
        <Button onClick={handleAddCar}>자동차 추가</Button>
      </div>

      {/* 자동차 목록 테이블 */}
      <TableContainer sx={{ width: '100%', marginTop: '30px' }} component={Paper}>
        <Table sx={{ minWidth: '1080px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <Car 
                key={car.id} 
                id={car.id} 
                make={car.make} 
                model={car.model} 
                year={car.year} 
                image={car.image} 
                price={car.price}
                onDelete={handleDeleteCar}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
