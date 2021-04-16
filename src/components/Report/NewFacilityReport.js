import React from 'react';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { displayNewReport } from '../../redux/index'

import { database } from '../../firebase/firebase'
import moment from 'moment';
const time = moment().format('YYYY-MM-DD hh:mm:ss');

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewFacilityReport = (props) => {
  const classes = useStyles();
  const [facility, setFacility] = React.useState('');
  const [text, setText] = React.useState('');

  const { newFacilityReport, reportlatlng } = props

  const handleChange = (event) => {
    setFacility(event.target.value);
  };

  const handleClose = () => {
    props.displayNewReport(false);
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  }

  const submitReport = () => {
    let uploadReport = {
      신고날짜:time,
      시설종류:facility,
      번호:1,
      주소:'',
      위도:reportlatlng.위도,
      경도:reportlatlng.경도,
      신고내역:text
    }
      database.collection('NewFacility').doc(`${uploadReport.위도}`).set(uploadReport)
      .then(res => {
        console.log(res);
        alert('신고완료!')
      })
    props.displayNewReport(false);  
  }

  return (
    <div>

      <Dialog open={newFacilityReport} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">새로운 시설 신고</DialogTitle>
        <DialogContent>
          <DialogContentText>
            신고할 시설 종류와 신고내역을 작성해주세요.
          </DialogContentText>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">시설 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={facility}
              onChange={handleChange}
            >
              <MenuItem value={'자전거 도로'}>자전거 도로</MenuItem>
              <MenuItem value={'공기주입기'}>공기주입기</MenuItem>
              <MenuItem value={'보관소'}>보관소</MenuItem>
              <MenuItem value={'수리센터'}>수리센터</MenuItem>
              <MenuItem value={'대여소'}>대여소</MenuItem>
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="신고내역"
            type="email"
            fullWidth
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={submitReport} color="primary">
            전송
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    newFacilityReport: state.report.newFacilityReport,

    reportlatlng: state.report.reportlatlng

  }
}

const mapDispatchToProps = {
  displayNewReport: displayNewReport

}

export default connect(mapStateToProps, mapDispatchToProps)(NewFacilityReport)