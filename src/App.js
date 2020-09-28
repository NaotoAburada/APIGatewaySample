import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

function App() {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const operationType = {OperationType: "SCAN"};
  // APIをコール
  useEffect(() => {
    axios.post(process.env.REACT_APP_API_GATEWAY_URL, operationType)
      .then((response) => {
        console.log("aaaa: " + response.data.Items[0].name);
        setIsLoaded(true)
        setItems(response.data.Items)
    });
  }, [])
  console.log("Items " + items.map((item) => {
    return item.name
  }))

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Div_h1>
          <h1>sampleテーブル　データ一覧</h1>
        </Div_h1>
        <Div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">name</TableCell>
                  <TableCell align="center">age</TableCell>
                  <TableCell align="center">sex</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(item => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.sex}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Div>
      </>
    );
  }
}

const Div_h1 = styled.div`
  margin-left: 15px;
`
const Div = styled.div`
  margin-left: 30px;
  width: 750px
`
export default App;
