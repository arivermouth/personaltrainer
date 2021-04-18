import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        activity:'',
        duration: '',
        customer: ''
    })

    const handleClickOpen = () => {
        setTraining({
            customer: props.customer.links[0].href
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const handleDateChange = (date) => {
        setTraining({...training, date: date.toISOString() })
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name] : event.target.value})
    }

    return (
        <div>
        <Button color="primary" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <KeyboardDateTimePicker
                        margin="dense"
                        label="Date"
                        name="date"
                        format="dd.MM.yyyy HH:mm"
                        value={training.date}
                        onChange={handleDateChange}
                        fullWidth
                        animateYearScrolling
                    />
                    <TextField
                        margin="dense"
                        label="Duration (min)"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default AddTraining;