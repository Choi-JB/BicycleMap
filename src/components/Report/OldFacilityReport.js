import React from 'react';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { displayOldReport } from '../../redux/index'
import { database } from '../../firebase/firebase'

import { ip } from '../../redux/ip'
import axios from 'axios';

import moment from 'moment';
const time = moment().format('YYYY-MM-DD hh:mm:ss');

const OldFacilityReport = (props) => {
  const { oldFacilityReport, selectedMarker } = props

  const [value, setValue] = React.useState('female');

  const handleClose = () => {
    props.displayOldReport(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const submitReport = () => {
    let uploadReport = {
      신고날짜: time,
      시설종류: selectedMarker.type,
      번호: selectedMarker.번호,
      주소: selectedMarker.위치,
      위도: selectedMarker.위도,
      경도: selectedMarker.경도,
      상태: value
    }

    database.collection('OldFacility').doc(`${uploadReport.위도}`)
      .get().then(function (doc) {
        if (doc.exists) {
          database.collection('OldFacility').doc(`${uploadReport.위도}`).update(uploadReport)
            .then(res => {
              console.log(res);
            })
        }
        else {
          database.collection('OldFacility').doc(`${uploadReport.위도}`).set(uploadReport)
            .then(res => {
              console.log(res);
            })
        }
        alert('신고 완료!')
      }

      )
    //======= backend 로 전송==========
    // axios.post(ip + '/report/old', {message:'test'})
    //   .then(() => {
    //       alert('신고 완료')
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //     alert(err)
    // })
    props.displayOldReport(false);
  }

  return (
    <div>

      <Dialog open={oldFacilityReport} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">시설 신고</DialogTitle>
        <DialogContent>
          <DialogContentText>
            신고할 항목을 선택하세요
          </DialogContentText>
          <FormControl component="fieldset">
            <FormLabel component="legend">항목</FormLabel>
            <RadioGroup aria-label="list" name="list1" value={value} onChange={handleChange}>
              <FormControlLabel value="고장" control={<Radio />} label="고장" />
              <FormControlLabel value="철거" control={<Radio />} label="철거" />
              <FormControlLabel value="수리완료" control={<Radio />} label="수리완료" />
              <FormControlLabel value="etc" disabled control={<Radio />} label="기타" />
            </RadioGroup>
          </FormControl>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={submitReport} color="primary">
            신고하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    oldFacilityReport: state.report.oldFacilityReport,

    selectedMarker: state.facilities.selectedMarker
  }
}

const mapDispatchToProps = {
  displayOldReport: displayOldReport

}

export default connect(mapStateToProps, mapDispatchToProps)(OldFacilityReport)