import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/action';
import { setLoading } from '../Redux/loading/loadingAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 180,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({id}) {

    const [inputValue, setInputValue] = React.useState({
        city : "",
        country : "",
        population : ""
    })

  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
      setOpen(true);
    //   console.log("hello")

      fetch(`https://my-cityapp.herokuapp.com/cities/${id}`)
      .then(res=>res.json())
      .then(res=>{setInputValue({
          ...inputValue,
          city : res.city,
          country : res.country,
          population : res.population
      })})
};
  const handleClose = () => setOpen(false);
//   console.log(id)
   


   const dispatch = useDispatch()
   const [timeOutId, setTimeOutId] = React.useState("")

   const handleChange = (e) => {
       setInputValue({
           ...inputValue,
           [e.target.className]: e.target.value
       })
   }

   const handleEdit = (id)=> {
    setOpen(false);
       clearTimeout(timeOutId);
       dispatch(setLoading(true))
       setTimeOutId(setTimeout(() => {
        fetch(`https://my-cityapp.herokuapp.com/cities/${id}`, {
            method : "PATCH",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(inputValue)
        })
        .then(res=>res.json())
        .then(res=>{
            
            fetch('https://my-cityapp.herokuapp.com/cities')
            .then(res=>res.json())
            .then(res=>dispatch(addData(res)))
            dispatch(setLoading(false))
        })
       }, 1000));
       
   }

   const {city, country, population} = inputValue;

  return (
    <div>
      <Button onClick={()=>handleOpen(id)}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit City Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <input type="text" placeholder='Enter City' className='city' onChange={handleChange} value={city}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <input type="text" placeholder='Enter Country' className='country' onChange={handleChange} value={country}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <input type="text" placeholder='Enter Population' className='population' onChange={handleChange} value={population}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <button onClick={()=>handleEdit(id)}>Confirm</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
