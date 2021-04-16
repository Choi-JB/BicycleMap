import React, {useState } from 'react';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 300,
  },
}));

function createData(index, 시설, 주소, 신고내역) {
  return { index, 시설, 주소, 신고내역 };
}

const rows = [
  createData(1,'자전거도로', '대구 북구 침산동 1662-20 ', '공사 중'),
  createData(2,'공기주입기', '대구 남구 봉덕동 1617-1','고장남'),
  createData(3,'수리센터', '대구 달서구 장기동', '영업종료'),
  createData(4,'....', '.....', '....'),
];

const ReportDetail = (props) => {
  const classes = useStyles();
  const [infra, setInfra] = React.useState('');
  const [state, setState] = React.useState('');

  const handleChange1 = (event) => {
    setInfra(event.target.value);
  };
  const handleChange2 = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">시설 선택</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={infra}
          onChange={handleChange1}
        >
          <MenuItem value={10}>자전거 도로</MenuItem>
          <MenuItem value={20}>공기주입기</MenuItem>
          <MenuItem value={30}>보관소</MenuItem>
          <MenuItem value={40}>수리센터</MenuItem>
          <MenuItem value={50}>대여소</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">시</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          onChange={handleChange2}
        >
          <MenuItem value={10}>북구</MenuItem>
          <MenuItem value={20}>동구</MenuItem>
          <MenuItem value={30}>서구</MenuItem>
          <MenuItem value={40}>중구</MenuItem>
        </Select>
      </FormControl>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption> </caption>
        <TableHead>
          <TableRow>
            <TableCell>시설</TableCell>
            <TableCell align="right">주소</TableCell>
            <TableCell align="right">신고내역</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.index}>
              <TableCell component="th" scope="row">
                {row.시설}
              </TableCell>
              <TableCell align="right">{row.주소}</TableCell>
              <TableCell align="right">{row.신고내역}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
     
  }
}

const mapDispatchToProps = {
  

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)