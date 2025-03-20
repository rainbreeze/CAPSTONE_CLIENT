import React, { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, TextField, Grid, Typography } from "@mui/material";
import Music from "./components/music";  // Music 컴포넌트를 import
import './App.css';

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
    fetch('https://capstoneserver-production.up.railway.app/api/musics')  // 음악 관련 API URL
      .then(response => response.json())
      .then(data => setMusics(data))
      .catch(error => console.error('Error fetching musics:', error));
  }, []);

  // 음악 추가
  const handleAddMusic = () => {
    fetch('https://capstoneserver-production.up.railway.app/api/musics', {  // 음악 관련 API URL
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
    fetch(`https://capstoneserver-production.up.railway.app/api/musics/${id}`, { method: 'DELETE' })  // 음악 관련 API URL
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchMusics();  // 데이터 다시 가져오기
      })
      .catch(error => console.error('Error deleting music:', error));
  };

  // 음악 목록 다시 가져오기
  const fetchMusics = () => {
    fetch('https://capstoneserver-production.up.railway.app/api/musics')  // 음악 관련 API URL
      .then(response => response.json())
      .then(data => setMusics(data))
      .catch(error => console.error('Error fetching musics:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'Jua, sans-serif' }}>
        음악 목록
      </Typography>

      {/* 음악 추가 폼 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontFamily: 'Jua, sans-serif' }}>
              음악 추가
            </Typography>
            <TextField
              label="Title"
              fullWidth
              value={newMusic.title}
              onChange={e => setNewMusic({ ...newMusic, title: e.target.value })}
              sx={{
                marginBottom: '10px',
                '& .MuiInputLabel-root': {
                  fontFamily: 'Jua, sans-serif', // 라벨에 Jua 폰트 적용
                },
              }}
            />
            <TextField
              label="Artist"
              fullWidth
              value={newMusic.artist}
              onChange={e => setNewMusic({ ...newMusic, artist: e.target.value })}
              sx={{
                marginBottom: '10px',
                '& .MuiInputLabel-root': {
                  fontFamily: 'Jua, sans-serif', // 라벨에 Jua 폰트 적용
                },
              }}
            />
            <TextField
              label="Album"
              fullWidth
              value={newMusic.album}
              onChange={e => setNewMusic({ ...newMusic, album: e.target.value })}
              sx={{
                marginBottom: '10px',
                '& .MuiInputLabel-root': {
                  fontFamily: 'Jua, sans-serif', // 라벨에 Jua 폰트 적용
                },
              }}
            />
            <TextField
              label="Image URL"
              fullWidth
              value={newMusic.image}
              onChange={e => setNewMusic({ ...newMusic, image: e.target.value })}
              sx={{
                marginBottom: '10px',
                '& .MuiInputLabel-root': {
                  fontFamily: 'Jua, sans-serif', // 라벨에 Jua 폰트 적용
                },
              }}
            />
            <TextField
              label="Price"
              fullWidth
              value={newMusic.price}
              onChange={e => setNewMusic({ ...newMusic, price: e.target.value })}
              sx={{
                marginBottom: '10px',
                '& .MuiInputLabel-root': {
                  fontFamily: 'Jua, sans-serif', // 라벨에 Jua 폰트 적용
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddMusic}
              sx={{
                padding: '6px 12px',
                fontSize: '14px',
                marginTop: '10px',
                fontFamily: 'Jua, sans-serif', // Jua 폰트 적용
              }}
            >
              음악 추가
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* 음악 목록 테이블 */}
      <TableContainer sx={{ width: '100%', marginTop: '30px' }} component={Paper}>
        <Table sx={{ minWidth: '1080px' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}><strong>Title</strong></TableCell>
              <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}><strong>Artist</strong></TableCell>
              <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}><strong>Album</strong></TableCell>
              <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}><strong>Image</strong></TableCell>
              <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}><strong>Price</strong></TableCell>
              <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}><strong>Actions</strong></TableCell>
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
