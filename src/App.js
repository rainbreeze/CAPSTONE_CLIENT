import React, { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, TextField } from "@mui/material";
import Music from "./components/music";  // Music 컴포넌트를 import

function App() {
  const [musics, setMusics] = useState([]);  // 음악 데이터를 저장할 상태 변수
  const [newMusic, setNewMusic] = useState({
    title: '',
    artist: '',
    album: '',
    image: '',
    price: '',
  });

  // 음악 데이터 가져오기
  useEffect(() => {
    fetch('https://capstoneserver-production.up.railway.app/api/music')  // 음악 관련 API URL
      .then(response => response.json())
      .then(data => setMusics(data))
      .catch(error => console.error('Error fetching musics:', error));
  }, []);

  // 음악 추가
  const handleAddMusic = () => {
    fetch('https://capstoneserver-production.up.railway.app/api/music', {  // 음악 관련 API URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMusic),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setNewMusic({ title: '', artist: '', album: '', image: '', price: '' });  // 입력 필드 초기화
        fetchMusics();  // 데이터 다시 가져오기
      })
      .catch(error => console.error('Error adding music:', error));
  };

  // 음악 삭제
  const handleDeleteMusic = (id) => {
    fetch(`https://capstoneserver-production.up.railway.app/api/music/${id}`, { method: 'DELETE' })  // 음악 관련 API URL
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchMusics();  // 데이터 다시 가져오기
      })
      .catch(error => console.error('Error deleting music:', error));
  };

  // 음악 목록 다시 가져오기
  const fetchMusics = () => {
    fetch('https://capstoneserver-production.up.railway.app/api/music')  // 음악 관련 API URL
      .then(response => response.json())
      .then(data => setMusics(data))
      .catch(error => console.error('Error fetching musics:', error));
  };

  return (
    <div>
      <h1>음악 목록</h1>
      
      {/* 음악 추가 폼 */}
      <div>
        <TextField
          label="Title"
          value={newMusic.title}
          onChange={e => setNewMusic({ ...newMusic, title: e.target.value })}
        />
        <TextField
          label="Artist"
          value={newMusic.artist}
          onChange={e => setNewMusic({ ...newMusic, artist: e.target.value })}
        />
        <TextField
          label="Album"
          value={newMusic.album}
          onChange={e => setNewMusic({ ...newMusic, album: e.target.value })}
        />
        <TextField
          label="Image URL"
          value={newMusic.image}
          onChange={e => setNewMusic({ ...newMusic, image: e.target.value })}
        />
        <TextField
          label="Price"
          value={newMusic.price}
          onChange={e => setNewMusic({ ...newMusic, price: e.target.value })}
        />
        <Button onClick={handleAddMusic}>음악 추가</Button>
      </div>

      {/* 음악 목록 테이블 */}
      <TableContainer sx={{ width: '100%', marginTop: '30px' }} component={Paper}>
        <Table sx={{ minWidth: '1080px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {musics.map((music) => (
              <Music 
                key={music.id} 
                id={music.id} 
                title={music.title} 
                artist={music.artist} 
                album={music.album} 
                image={music.image} 
                price={music.price}
                onDelete={handleDeleteMusic}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
